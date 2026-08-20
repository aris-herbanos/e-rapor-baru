import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/* ============================================================
   KONFIGURASI JWT
============================================================ */

const JWT_SECRET = process.env.JWT_SECRET;

/* ============================================================
   TYPE JWT PAYLOAD
============================================================ */

type JwtPayload = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

/* ============================================================
   HELPER: AMBIL TOKEN DARI COOKIE
============================================================ */

function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie') || '';

  const tokenMatch = cookieHeader.match(
    /(?:^|;\s*)token=([^;]+)/
  );

  if (!tokenMatch) {
    return null;
  }

  return decodeURIComponent(tokenMatch[1]);
}

/* ============================================================
   HELPER: VERIFIKASI LOGIN
   ADMIN + TEACHER BOLEH
============================================================ */

function verifyUser(request: Request) {
  if (!JWT_SECRET) {
    console.error(
      'JWT_SECRET belum tersedia di environment.'
    );

    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message: 'Konfigurasi server belum lengkap.',
        },
        {
          status: 500,
        }
      ),
    };
  }

  const token = getTokenFromRequest(request);

  if (!token) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Anda belum login. Silakan login terlebih dahulu.',
        },
        {
          status: 401,
        }
      ),
    };
  }

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    const role = String(
      decoded?.role || ''
    ).toUpperCase();

    if (
      role !== 'ADMIN' &&
      role !== 'TEACHER'
    ) {
      return {
        success: false as const,
        response: NextResponse.json(
          {
            success: false,
            message:
              'Akses ditolak. Anda tidak memiliki izin untuk mengakses data kelas.',
          },
          {
            status: 403,
          }
        ),
      };
    }

    return {
      success: true as const,
      user: {
        ...decoded,
        role,
      },
    };
  } catch (error) {
    console.error(
      'JWT verification error:',
      error
    );

    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Sesi login tidak valid atau sudah kedaluwarsa. Silakan login kembali.',
        },
        {
          status: 401,
        }
      ),
    };
  }
}

/* ============================================================
   HELPER: VERIFIKASI KHUSUS ADMIN
============================================================ */

function verifyAdmin(request: Request) {
  const auth = verifyUser(request);

  if (!auth.success) {
    return auth;
  }

  if (auth.user.role !== 'ADMIN') {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Akses ditolak. Fitur ini hanya dapat digunakan oleh Administrator.',
        },
        {
          status: 403,
        }
      ),
    };
  }

  return auth;
}

/* ============================================================
   GET /api/classes
============================================================ */

export async function GET(
  request: Request
) {
  const auth = verifyUser(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const classes =
      await prisma.classRoom.findMany({
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

    // Mengembalikan kedua format (array langsung & objek bersarang) 
    // agar kompatibel dengan semua jenis pemanggilan frontend.
    return NextResponse.json(
      classes,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      'GET /api/classes ERROR:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal memuat data kelas.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST /api/classes
============================================================ */

export async function POST(
  request: Request
) {
  const auth = verifyAdmin(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const body =
      await request.json();

    const name = String(
      body.name ?? ''
    )
      .trim()
      .toUpperCase();

    const level = String(
      body.level ?? ''
    )
      .trim()
      .toUpperCase();

    const grade = Number(
      body.grade
    );

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Nama kelas wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    if (
      !['SMP', 'SMA'].includes(level)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Jenjang hanya boleh SMP atau SMA.',
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isInteger(grade)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Tingkat kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    if (
      level === 'SMP' &&
      ![7, 8, 9].includes(grade)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Jenjang SMP hanya dapat menggunakan tingkat 7, 8, atau 9.',
        },
        {
          status: 400,
        }
      );
    }

    if (
      level === 'SMA' &&
      ![10, 11, 12].includes(grade)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Jenjang SMA hanya dapat menggunakan tingkat 10, 11, atau 12.',
        },
        {
          status: 400,
        }
      );
    }

    const existingClass =
      await prisma.classRoom.findFirst({
        where: {
          name,
        },
      });

    if (existingClass) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Kelas ${name} sudah terdaftar.`,
        },
        {
          status: 409,
        }
      );
    }

    const newClass =
      await prisma.classRoom.create({
        data: {
          name,
          level,
          grade,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          'Kelas berhasil ditambahkan.',
        data: newClass,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      'POST /api/classes ERROR:',
      error
    );

    if (
      error?.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Kelas tersebut sudah terdaftar.',
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal menyimpan kelas.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   DELETE /api/classes
============================================================ */

export async function DELETE(
  request: Request
) {
  const auth = verifyAdmin(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const body =
      await request
        .json()
        .catch(() => null);

    if (
      body?.confirm !==
      'DELETE_ALL_CLASSES'
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Penghapusan seluruh kelas membutuhkan konfirmasi.',
        },
        {
          status: 400,
        }
      );
    }

    const total =
      await prisma.classRoom.count();

    if (total === 0) {
      return NextResponse.json(
        {
          success: true,
          message:
            'Tidak ada data kelas yang perlu dihapus.',
          deleted: 0,
        },
        {
          status: 200,
        }
      );
    }

    const result =
      await prisma.classRoom.deleteMany({});

    return NextResponse.json(
      {
        success: true,
        message:
          `${result.count} kelas berhasil dihapus.`,
        deleted:
          result.count,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      'DELETE /api/classes ERROR:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal menghapus seluruh data kelas.',
      },
      {
        status: 500,
      }
    );
  }
}