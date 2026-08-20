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
   HELPER: VERIFIKASI LOGIN
   ADMIN + TEACHER DIPERBOLEHKAN
============================================================ */

function verifyAuth(request: Request) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET belum tersedia.');

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

  const tokenMatch = cookieHeader.match(
    /(?:^|;\s*)token=([^;]+)/
  );

  const token = tokenMatch
    ? decodeURIComponent(tokenMatch[1])
    : null;

  if (!token) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Anda belum login. Silakan login terlebih dahulu.',
        },
        { status: 401 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    const role = String(decoded.role || '').toUpperCase();

    /* --------------------------------------------------------
       NILAI BOLEH DIAKSES:
       ADMIN
       TEACHER
    -------------------------------------------------------- */

    if (!['ADMIN', 'TEACHER'].includes(role)) {
      return {
        success: false as const,
        response: NextResponse.json(
          {
            success: false,
            message:
              'Akses ditolak. Anda tidak memiliki izin untuk mengakses data ini.',
          },
          { status: 403 }
        ),
      };
    }

    return {
      success: true as const,
      user: decoded,
    };
  } catch (error) {
    console.error('JWT verification error:', error);

    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Sesi login tidak valid atau sudah kedaluwarsa. Silakan login kembali.',
        },
        { status: 401 }
      ),
    };
  }
}

/* ============================================================
   GET /api/subjects
   ADMIN + TEACHER
============================================================ */

export async function GET(request: Request) {
  const auth = verifyAuth(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            fullname: true,
            identity_number: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(
      {
        success: true,
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
      },
      { status: 500 }
    );
  }
}

/* ============================================================
   POST /api/subjects
   HANYA ADMIN
============================================================ */

export async function POST(request: Request) {
  const auth = verifyAuth(request);

  if (!auth.success) {
    return auth.response;
  }

  /* TEACHER TIDAK BOLEH MENAMBAH MAPEL */

  if (
    String(auth.user.role).toUpperCase() !== 'ADMIN'
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Akses ditolak. Hanya Administrator yang dapat menambahkan mata pelajaran.',
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const name = String(body.name ?? '').trim();
    const teacherId = Number(body.teacherId);

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama mata pelajaran wajib diisi.',
        },
        { status: 400 }
      );
    }

    if (!teacherId || !Number.isInteger(teacherId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Guru pengampu wajib dipilih.',
        },
        { status: 400 }
      );
    }

    /* --------------------------------------------------------
       CEK GURU
    -------------------------------------------------------- */

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: 'Guru pengampu tidak ditemukan.',
        },
        { status: 404 }
      );
    }

    /* --------------------------------------------------------
       CEK DUPLIKAT MAPEL
    -------------------------------------------------------- */

    const existingSubject =
      await prisma.subject.findFirst({
        where: {
          name,
        },
      });

    if (existingSubject) {
      return NextResponse.json(
        {
          success: false,
          message: `Mata pelajaran "${name}" sudah terdaftar.`,
        },
        { status: 409 }
      );
    }

    /* --------------------------------------------------------
       CREATE
    -------------------------------------------------------- */

    const newSubject =
      await prisma.subject.create({
        data: {
          name,
          teacherId,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          'Mata pelajaran berhasil ditambahkan.',
        data: newSubject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      'POST /api/subjects ERROR:',
      error
    );

    if (error?.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          message:
            'Mata pelajaran tersebut sudah terdaftar.',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal menyimpan mata pelajaran.',
      },
      { status: 500 }
    );
  }
}