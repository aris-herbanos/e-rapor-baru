
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

type JwtPayload = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

/* ============================================================
   HELPER: NORMALISASI TEKS
============================================================ */

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/* ============================================================
   HELPER: NORMALISASI JENJANG

   SMP : kelas 7, 8, 9
   SMA : kelas 10, 11, 12
============================================================ */

function normalizeLevel(value: unknown): 'SMP' | 'SMA' | null {
  const text = normalizeText(value);

  if (!text) return null;

  if (
    text === 'smp' ||
    text.includes('smp') ||
    text.includes('mts')
  ) {
    return 'SMP';
  }

  if (
    text === 'sma' ||
    text.includes('sma') ||
    text.includes('smk') ||
    text.includes('ma')
  ) {
    return 'SMA';
  }

  // Mengambil angka dari nama kelas, misalnya:
  // "Kelas 7", "VII", "Kelas 10", dan sebagainya.
  const numberMatch = text.match(/\d+/);

  if (numberMatch) {
    const grade = Number(numberMatch[0]);

    if (grade >= 7 && grade <= 9) return 'SMP';
    if (grade >= 10 && grade <= 12) return 'SMA';
  }

  const romanClasses: Record<string, 'SMP' | 'SMA'> = {
    vii: 'SMP',
    viii: 'SMP',
    ix: 'SMP',
    x: 'SMA',
    xi: 'SMA',
    xii: 'SMA',
  };

  const romanMatch = text.match(/\b(vii|viii|ix|xii|xi|x)\b/);

  if (romanMatch) {
    return romanClasses[romanMatch[0]] ?? null;
  }

  return null;
}

/* ============================================================
   HELPER: VERIFIKASI LOGIN
============================================================ */

function verifyAuth(request: Request) {
  if (!JWT_SECRET) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: 'Konfigurasi server belum lengkap.',
        },
        { status: 500 }
      ),
    };
  }

  const cookieHeader = request.headers.get('cookie') || '';
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  const token = tokenMatch
    ? decodeURIComponent(tokenMatch[1])
    : null;

  if (!token) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: 'Anda belum login. Silakan login terlebih dahulu.',
        },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const role = String(decoded.role || '').toUpperCase();

    if (!['ADMIN', 'TEACHER'].includes(role)) {
      return {
        success: false as const,
        response: NextResponse.json(
          {
            success: false,
            message: 'Akses ditolak.',
          },
          { status: 403 }
        ),
      };
    }

    return {
      success: true as const,
      user: decoded,
    };
  } catch {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: 'Sesi login tidak valid.',
        },
        { status: 401 }
      ),
    };
  }
}

/* ============================================================
   GET /api/subjects

   Contoh:
   /api/subjects?level=SMP
   /api/subjects?level=SMA
   /api/subjects?grade=7
   /api/subjects?grade=10
   /api/subjects?className=Kelas%207

   Tanpa parameter jenjang:
   /api/subjects
   Mengembalikan semua mapel.
============================================================ */

export async function GET(request: Request) {
  const auth = verifyAuth(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const url = new URL(request.url);

    const levelParam = url.searchParams.get('level');
    const gradeParam = url.searchParams.get('grade');
    const classNameParam = url.searchParams.get('className');

    // Tentukan jenjang berdasarkan parameter yang tersedia.
    const requestedLevel =
      normalizeLevel(levelParam) ||
      normalizeLevel(gradeParam) ||
      normalizeLevel(classNameParam);

    // Jika parameter jenjang dikirim tetapi tidak dikenali,
    // jangan mengembalikan seluruh daftar mapel.
    const hasLevelParameter =
      Boolean(levelParam || gradeParam || classNameParam);

    if (hasLevelParameter && !requestedLevel) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Jenjang tidak dikenali. Gunakan SMP, SMA, atau kelas 7 sampai 12.',
          data: [],
        },
        { status: 400 }
      );
    }

    // Ambil data mapel dari database.
    const allSubjects = await prisma.subject.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Filter berdasarkan jenjang yang sudah dinormalisasi.
    const subjects = requestedLevel
      ? allSubjects.filter(
          (subject) =>
            normalizeLevel(subject.level) === requestedLevel
        )
      : allSubjects;

    return NextResponse.json(
      {
        success: true,
        level: requestedLevel,
        total: subjects.length,
        data: subjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/subjects ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal memuat mata pelajaran.',
        data: [],
      },
      { status: 500 }
    );
  }
}

/* ============================================================
   POST /api/subjects

   Hanya ADMIN yang boleh menambahkan mapel.
============================================================ */

export async function POST(request: Request) {
  const auth = verifyAuth(request);

  if (!auth.success) {
    return auth.response;
  }

  if (String(auth.user.role).toUpperCase() !== 'ADMIN') {
    return NextResponse.json(
      {
        success: false,
        message:
          'Hanya Administrator yang dapat menambahkan mata pelajaran.',
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const name = String(body.name ?? '')
      .trim()
      .replace(/\s+/g, ' ');

    const level = normalizeLevel(body.level);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama mata pelajaran wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!level) {
      return NextResponse.json(
        {
          success: false,
          message: 'Jenjang wajib dipilih: SMP atau SMA.',
        },
        { status: 400 }
      );
    }

    // Cek nama mapel tanpa membedakan huruf besar-kecil.
    const existingSubjects = await prisma.subject.findMany({
      where: {
        level,
      },
      select: {
        id: true,
        name: true,
        level: true,
      },
    });

    const duplicate = existingSubjects.find(
      (subject) =>
        normalizeText(subject.name) === normalizeText(name)
    );

    if (duplicate) {
      return NextResponse.json(
        {
          success: false,
          message: `Mata pelajaran "${duplicate.name}" untuk jenjang ${level} sudah terdaftar.`,
          data: duplicate,
        },
        { status: 409 }
      );
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        level,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mata pelajaran berhasil ditambahkan.',
        data: newSubject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/subjects ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menyimpan mata pelajaran.',
      },
      { status: 500 }
    );
  }
}
