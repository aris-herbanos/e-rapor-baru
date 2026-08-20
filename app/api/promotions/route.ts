import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET
 * Menampilkan daftar siswa berdasarkan kelas.
 *
 * Contoh:
 * /api/promotions?className=7A
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json(
        {
          message: 'Parameter className wajib diisi.',
        },
        { status: 400 }
      );
    }

    const students = await prisma.student.findMany({
      where: {
        class_name: className,
      },
      orderBy: {
        fullname: 'asc',
      },
      select: {
        id: true,
        nisn: true,
        fullname: true,
        gender: true,
        class_name: true,
      },
    });

    return NextResponse.json({
      data: students,
    });
  } catch (error) {
    console.error('Error GET promotions:', error);

    return NextResponse.json(
      {
        message: 'Gagal mengambil data siswa.',
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 * Memproses kenaikan kelas secara massal.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const studentIds = Array.isArray(body.studentIds)
      ? body.studentIds.map((id: unknown) => Number(id))
      : [];

    const toClass =
      typeof body.toClass === 'string'
        ? body.toClass.trim()
        : '';

    const status =
      typeof body.status === 'string'
        ? body.status.trim().toUpperCase()
        : 'NAIK';

    const academicYear =
      typeof body.academicYear === 'string'
        ? body.academicYear.trim()
        : '2026/2027';

    const note =
      typeof body.note === 'string'
        ? body.note.trim()
        : '';

    if (studentIds.length === 0) {
      return NextResponse.json(
        {
          message: 'Pilih minimal satu siswa.',
        },
        { status: 400 }
      );
    }

    if (!toClass) {
      return NextResponse.json(
        {
          message: 'Kelas tujuan wajib dipilih.',
        },
        { status: 400 }
      );
    }

    if (!['NAIK', 'TINGGAL'].includes(status)) {
      return NextResponse.json(
        {
          message: 'Status kenaikan kelas tidak valid.',
        },
        { status: 400 }
      );
    }

    const students = await prisma.student.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
      select: {
        id: true,
        fullname: true,
        class_name: true,
      },
    });

    if (students.length === 0) {
      return NextResponse.json(
        {
          message: 'Data siswa tidak ditemukan.',
        },
        { status: 404 }
      );
    }

    /*
     * Semua proses dilakukan dalam satu transaction.
     *
     * Jika salah satu gagal, seluruh perubahan dibatalkan.
     */
    const result = await prisma.$transaction(async (tx) => {
      const promotions = [];

      for (const student of students) {
        const fromClass = student.class_name;

        /*
         * Kalau TINGGAL KELAS:
         * siswa tetap berada di kelas asal.
         *
         * Kalau NAIK:
         * class_name dipindahkan ke kelas tujuan.
         */
        if (status === 'NAIK') {
          await tx.student.update({
            where: {
              id: student.id,
            },
            data: {
              class_name: toClass,
            },
          });
        }

        /*
         * Simpan riwayat kenaikan kelas.
         */
        const promotion = await tx.studentPromotion.upsert({
          where: {
            studentId_academicYear: {
              studentId: student.id,
              academicYear,
            },
          },
          update: {
            fromClass,
            toClass:
              status === 'NAIK'
                ? toClass
                : fromClass,
            status,
            note: note || null,
            promotedAt: new Date(),
          },
          create: {
            studentId: student.id,
            academicYear,
            fromClass,
            toClass:
              status === 'NAIK'
                ? toClass
                : fromClass,
            status,
            note: note || null,
          },
        });

        promotions.push(promotion);
      }

      return promotions;
    });

    return NextResponse.json({
      message:
        status === 'NAIK'
          ? `${result.length} siswa berhasil dinaikkan ke kelas ${toClass}.`
          : `${result.length} siswa ditetapkan tetap di kelas masing-masing.`,
      data: result,
    });
  } catch (error) {
    console.error('Error POST promotions:', error);

    return NextResponse.json(
      {
        message: 'Gagal memproses kenaikan kelas.',
      },
      { status: 500 }
    );
  }
}