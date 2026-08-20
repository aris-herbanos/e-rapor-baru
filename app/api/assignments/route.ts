import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// ============================================================
// GET
// Ambil semua data penugasan
// HANYA ADMIN
// ============================================================

export async function GET() {
  try {
    // --------------------------------------------------------
    // CEK AUTHORIZATION
    // --------------------------------------------------------

    const auth = await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          message: auth.message,
        },
        {
          status: auth.status,
        }
      );
    }

    // --------------------------------------------------------
    // AMBIL DATA
    // --------------------------------------------------------

    const assignments =
      await prisma.assignment.findMany({
        include: {
          teacher: {
            select: {
              id: true,
              identity_number: true,
              fullname: true,
              birth_date: true,
              education: true,
              address: true,
              role: true,
              status: true,
            },
          },

          subject: true,
        },

        orderBy: {
          id: 'desc',
        },
      });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        data: assignments,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      'GET ASSIGNMENTS ERROR:',
      error
    );

    return NextResponse.json(
      {
        message:
          'Gagal memuat data penugasan.',
      },
      {
        status: 500,
      }
    );
  }
}


// ============================================================
// POST
// Tambah penugasan guru
// HANYA ADMIN
// ============================================================

export async function POST(
  request: Request
) {
  try {
    // --------------------------------------------------------
    // CEK AUTHORIZATION
    // --------------------------------------------------------

    const auth = await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          message: auth.message,
        },
        {
          status: auth.status,
        }
      );
    }

    // --------------------------------------------------------
    // AMBIL BODY
    // --------------------------------------------------------

    const body = await request.json();

    const teacherId = Number(
      body.teacherId
    );

    const subjectId = Number(
      body.subjectId
    );

    const className = String(
      body.className ?? ''
    ).trim();

    // --------------------------------------------------------
    // VALIDASI
    // --------------------------------------------------------

    if (
      !teacherId ||
      !subjectId ||
      !className
    ) {
      return NextResponse.json(
        {
          message:
            'Guru, Mata Pelajaran, dan Kelas wajib dipilih!',
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(teacherId) ||
      !Number.isInteger(subjectId)
    ) {
      return NextResponse.json(
        {
          message:
            'ID Guru atau ID Mata Pelajaran tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // CEK GURU
    // --------------------------------------------------------

    const teacher =
      await prisma.teacher.findUnique({
        where: {
          id: teacherId,
        },

        select: {
          id: true,
          fullname: true,
          role: true,
          status: true,
        },
      });

    if (!teacher) {
      return NextResponse.json(
        {
          message:
            'Data guru tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------------
    // PASTIKAN YANG DITUGASKAN MEMANG GURU
    // --------------------------------------------------------

    if (
      String(teacher.role).toUpperCase() !==
      'TEACHER'
    ) {
      return NextResponse.json(
        {
          message:
            'Akun yang dipilih bukan akun guru.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // CEK STATUS GURU
    // --------------------------------------------------------

    if (
      String(teacher.status).toLowerCase() ===
      'nonaktif'
    ) {
      return NextResponse.json(
        {
          message:
            'Guru tersebut sedang berstatus Nonaktif.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // CEK MATA PELAJARAN
    // --------------------------------------------------------

    const subject =
      await prisma.subject.findUnique({
        where: {
          id: subjectId,
        },

        select: {
          id: true,
          name: true,
        },
      });

    if (!subject) {
      return NextResponse.json(
        {
          message:
            'Mata pelajaran tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    // --------------------------------------------------------
    // CEK DUPLIKAT PENUGASAN
    //
    // Guru + Mapel + Kelas yang sama
    // tidak boleh dibuat dua kali.
    //
    // Catatan:
    // Pemeriksaan ini tetap aman meskipun
    // database belum memiliki unique constraint.
    // --------------------------------------------------------

    const existingAssignment =
      await prisma.assignment.findFirst({
        where: {
          teacherId,
          subjectId,
          className,
        },

        select: {
          id: true,
        },
      });

    if (existingAssignment) {
      return NextResponse.json(
        {
          message:
            'Penugasan guru untuk mata pelajaran dan kelas tersebut sudah ada.',
        },
        {
          status: 409,
        }
      );
    }

    // --------------------------------------------------------
    // CREATE ASSIGNMENT
    // --------------------------------------------------------

    const newAssignment =
      await prisma.assignment.create({
        data: {
          teacherId,
          subjectId,
          className,
        },

        include: {
          teacher: {
            select: {
              id: true,
              identity_number: true,
              fullname: true,
              birth_date: true,
              education: true,
              address: true,
              role: true,
              status: true,
            },
          },

          subject: true,
        },
      });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        message:
          'Penugasan berhasil disimpan.',

        data: newAssignment,
      },
      {
        status: 201,
      }
    );

  } catch (error: any) {
    console.error(
      'CREATE ASSIGNMENT ERROR:',
      error
    );

    // --------------------------------------------------------
    // PRISMA ERROR
    // --------------------------------------------------------

    if (
      error?.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message:
            'Penugasan tersebut sudah terdaftar.',
        },
        {
          status: 409,
        }
      );
    }

    if (
      error?.code === 'P2003'
    ) {
      return NextResponse.json(
        {
          message:
            'Guru atau Mata Pelajaran yang dipilih tidak ditemukan.',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          'Gagal menyimpan penugasan guru.',
      },
      {
        status: 500,
      }
    );
  }
}