import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/* ============================================================
   KONFIGURASI JENJANG
============================================================ */

const VALID_GRADES = {
  SMP: [7, 8, 9],
  SMA: [10, 11, 12],
} as const;

type Level = keyof typeof VALID_GRADES;

/* ============================================================
   HELPER VALIDASI JENJANG & TINGKAT
============================================================ */

function validateLevelAndGrade(
  level: string,
  grade: number
): string | null {
  if (!['SMP', 'SMA'].includes(level)) {
    return 'Jenjang hanya boleh SMP atau SMA.';
  }

  if (!Number.isInteger(grade)) {
    return 'Tingkat kelas harus berupa angka bulat.';
  }

  const validGrades = VALID_GRADES[level as Level];

  if (!validGrades.includes(grade as never)) {
    if (level === 'SMP') {
      return 'Kelas SMP hanya diperbolehkan untuk tingkat 7, 8, dan 9.';
    }

    return 'Kelas SMA hanya diperbolehkan untuk tingkat 10, 11, dan 12.';
  }

  return null;
}

/* ============================================================
   GET
   Ambil seluruh daftar kelas
============================================================ */

export async function GET() {
  try {
    const classes = await prisma.classRoom.findMany({
      orderBy: [
        {
          level: 'asc',
        },
        {
          grade: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });

    return NextResponse.json(classes, {
      status: 200,
    });
  } catch (error) {
    console.error('GET /api/classes ERROR:', error);

    return NextResponse.json(
      {
        message: 'Gagal memuat data kelas.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST
   Tambah kelas baru
============================================================ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* --------------------------------------------------------
       NORMALISASI DATA
    -------------------------------------------------------- */

    const name = String(body.name ?? '')
      .trim()
      .toUpperCase();

    const level = String(body.level ?? '')
      .trim()
      .toUpperCase();

    const grade = Number(body.grade);

    /* --------------------------------------------------------
       VALIDASI FIELD WAJIB
    -------------------------------------------------------- */

    if (!name) {
      return NextResponse.json(
        {
          message: 'Nama kelas wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    if (!level) {
      return NextResponse.json(
        {
          message: 'Jenjang kelas wajib dipilih.',
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isFinite(grade)) {
      return NextResponse.json(
        {
          message: 'Tingkat kelas wajib diisi dengan angka.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       VALIDASI JENJANG & TINGKAT
       
       SMP → 7, 8, 9
       SMA → 10, 11, 12
    -------------------------------------------------------- */

    const validationError = validateLevelAndGrade(
      level,
      grade
    );

    if (validationError) {
      return NextResponse.json(
        {
          message: validationError,
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       VALIDASI NAMA KELAS
       
       Contoh yang diterima:
       7A
       7B
       8A
       9B
       10A
       11B
       12A
       
       Tidak memaksa pola tertentu agar tetap fleksibel.
    -------------------------------------------------------- */

    if (name.length > 50) {
      return NextResponse.json(
        {
          message: 'Nama kelas maksimal 50 karakter.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK DUPLIKAT NAMA KELAS
    -------------------------------------------------------- */

    const existingClass = await prisma.classRoom.findUnique({
      where: {
        name,
      },
    });

    if (existingClass) {
      return NextResponse.json(
        {
          message: `Kelas ${name} sudah terdaftar.`,
        },
        {
          status: 409,
        }
      );
    }

    /* --------------------------------------------------------
       SIMPAN KELAS
    -------------------------------------------------------- */

    const newClass = await prisma.classRoom.create({
      data: {
        name,
        level,
        grade,
        status: 'Aktif',
      },
    });

    /* --------------------------------------------------------
       RESPONSE
    -------------------------------------------------------- */

    return NextResponse.json(
      {
        message: 'Kelas berhasil ditambahkan.',
        data: newClass,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    console.error('POST /api/classes ERROR:', error);

    /* --------------------------------------------------------
       PRISMA DUPLICATE
    -------------------------------------------------------- */

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message: 'Nama kelas sudah terdaftar.',
        },
        {
          status: 409,
        }
      );
    }

    /* --------------------------------------------------------
       ERROR UMUM
    -------------------------------------------------------- */

    return NextResponse.json(
      {
        message: 'Gagal menyimpan kelas.',
      },
      {
        status: 500,
      }
    );
  }
}