import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { requireAdmin } from '@/lib/auth';

// ============================================================
// POST
// Tambah Guru Baru
// HANYA ADMIN
// ============================================================

export async function POST(request: Request) {
  try {
    // --------------------------------------------------------
    // CEK ADMIN
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

    const identity_number = String(
      body.identity_number ?? ''
    ).trim();

    const fullname = String(
      body.fullname ?? ''
    ).trim();

    const password = String(
      body.password ?? ''
    );

    const birth_date =
      body.birth_date !== null &&
      body.birth_date !== undefined
        ? String(body.birth_date).trim()
        : '';

    const education =
      body.education !== null &&
      body.education !== undefined
        ? String(body.education).trim()
        : '';

    const address =
      body.address !== null &&
      body.address !== undefined
        ? String(body.address).trim()
        : '';

    const status =
      body.status !== null &&
      body.status !== undefined &&
      String(body.status).trim() !== ''
        ? String(body.status).trim()
        : 'Aktif';

    // --------------------------------------------------------
    // VALIDASI
    // --------------------------------------------------------

    if (
      !identity_number ||
      !fullname ||
      !password
    ) {
      return NextResponse.json(
        {
          message:
            'NIK, Nama Lengkap, dan Password wajib diisi!',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // VALIDASI STATUS
    // --------------------------------------------------------

    const allowedStatuses = [
      'Aktif',
      'Nonaktif',
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          message:
            'Status akun tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // CEK DUPLIKAT IDENTITY NUMBER
    // --------------------------------------------------------

    const existingTeacher =
      await prisma.teacher.findUnique({
        where: {
          identity_number,
        },
        select: {
          id: true,
        },
      });

    if (existingTeacher) {
      return NextResponse.json(
        {
          message:
            'NIK / Nomor identitas sudah terdaftar dalam sistem.',
        },
        {
          status: 409,
        }
      );
    }

    // --------------------------------------------------------
    // HASH PASSWORD
    // --------------------------------------------------------

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // --------------------------------------------------------
    // CREATE TEACHER
    // --------------------------------------------------------

    const newTeacher =
      await prisma.teacher.create({
        data: {
          identity_number,
          fullname,

          password:
            hashedPassword,

          birth_date:
            birth_date || null,

          education:
            education || null,

          address:
            address || null,

          status,

          // Semua guru yang dibuat
          // melalui halaman admin
          // otomatis memiliki role TEACHER.
          role: 'TEACHER',
        },

        // ----------------------------------------------------
        // JANGAN KIRIM PASSWORD KE FRONTEND
        // ----------------------------------------------------

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
      });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        message:
          'Ustadz/Guru berhasil ditambahkan.',

        data: newTeacher,
      },
      {
        status: 201,
      }
    );

  } catch (error: any) {
    console.error(
      'CREATE TEACHER ERROR:',
      error
    );

    // Prisma duplicate
    if (
      error?.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message:
            'NIK / Nomor identitas sudah terdaftar dalam sistem.',
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          'Gagal mendaftarkan guru.',
      },
      {
        status: 500,
      }
    );
  }
}


// ============================================================
// GET
// Ambil Daftar Guru
// HANYA ADMIN
// ============================================================

export async function GET() {
  try {
    // --------------------------------------------------------
    // CEK ADMIN
    // --------------------------------------------------------

    const auth =
      await requireAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          message:
            auth.message,
        },
        {
          status:
            auth.status,
        }
      );
    }

    // --------------------------------------------------------
    // AMBIL DATA GURU
    // --------------------------------------------------------

    const teachers =
      await prisma.teacher.findMany({
        orderBy: {
          id: 'desc',
        },

        // ----------------------------------------------------
        // PENTING:
        // PASSWORD TIDAK BOLEH DIKIRIM
        // ----------------------------------------------------

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
      });

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        data: teachers,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      'GET TEACHERS ERROR:',
      error
    );

    return NextResponse.json(
      {
        message:
          'Gagal memuat daftar guru.',
      },
      {
        status: 500,
      }
    );
  }
}