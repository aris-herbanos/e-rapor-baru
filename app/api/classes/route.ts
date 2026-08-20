import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/* ============================================================
   GET /api/classes
   Ambil seluruh data kelas
============================================================ */

export async function GET() {
  try {
    const classes = await prisma.classRoom.findMany({
      orderBy: [
        { level: 'asc' },
        { grade: 'asc' },
        { name: 'asc' },
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
   POST /api/classes
   Tambah kelas baru
============================================================ */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? '')
      .trim()
      .toUpperCase();

    const level = String(body.level ?? '')
      .trim()
      .toUpperCase();

    const grade = Number(body.grade);

    /* --------------------------------------------------------
       VALIDASI
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

    if (!['SMP', 'SMA'].includes(level)) {
      return NextResponse.json(
        {
          message: 'Jenjang hanya boleh SMP atau SMA.',
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isInteger(grade)) {
      return NextResponse.json(
        {
          message: 'Tingkat kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       VALIDASI JENJANG & TINGKAT
       
       SMP = 7, 8, 9
       SMA = 10, 11, 12
    -------------------------------------------------------- */

    if (
      (level === 'SMP' && ![7, 8, 9].includes(grade)) ||
      (level === 'SMA' && ![10, 11, 12].includes(grade))
    ) {
      return NextResponse.json(
        {
          message:
            level === 'SMP'
              ? 'Jenjang SMP hanya dapat menggunakan tingkat 7, 8, atau 9.'
              : 'Jenjang SMA hanya dapat menggunakan tingkat 10, 11, atau 12.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK DUPLIKAT
    -------------------------------------------------------- */

    const existingClass = await prisma.classRoom.findFirst({
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
       CREATE
    -------------------------------------------------------- */

    const newClass = await prisma.classRoom.create({
      data: {
        name,
        level,
        grade,
      },
    });

    return NextResponse.json(
      {
        message: 'Kelas berhasil ditambahkan.',
        data: newClass,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('POST /api/classes ERROR:', error);

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

/* ============================================================
   DELETE /api/classes
   Hapus seluruh kelas
============================================================ */

export async function DELETE(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    /*
      Proteksi tambahan.
      Client harus mengirim:
      {
        "confirm": "DELETE_ALL_CLASSES"
      }
    */

    if (body?.confirm !== 'DELETE_ALL_CLASSES') {
      return NextResponse.json(
        {
          message:
            'Penghapusan seluruh kelas membutuhkan konfirmasi.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK JUMLAH DATA
    -------------------------------------------------------- */

    const total = await prisma.classRoom.count();

    if (total === 0) {
      return NextResponse.json(
        {
          message: 'Tidak ada data kelas yang perlu dihapus.',
          deleted: 0,
        },
        {
          status: 200,
        }
      );
    }

    /* --------------------------------------------------------
       DELETE ALL
    -------------------------------------------------------- */

    const result = await prisma.classRoom.deleteMany({});

    return NextResponse.json(
      {
        message: `${result.count} kelas berhasil dihapus.`,
        deleted: result.count,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('DELETE /api/classes ERROR:', error);

    return NextResponse.json(
      {
        message:
          'Gagal menghapus seluruh data kelas.',
      },
      {
        status: 500,
      }
    );
  }
}