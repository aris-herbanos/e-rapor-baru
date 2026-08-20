import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

// ============================================================
// JWT SECRET
// ============================================================

const JWT_SECRET = process.env.JWT_SECRET;

// ============================================================
// DEFAULT SETTINGS
// ============================================================

const DEFAULT_SETTINGS = {
  schoolName: 'Pondok Pesantren Terpadu Ulul Albab',
  academicYear: '2026/2027',
  semester: 'Ganjil',
  principalName: 'Pimpinan Pesantren',
};

// ============================================================
// TYPE JWT PAYLOAD
// ============================================================

type JwtPayload = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

// ============================================================
// HELPER: CLEAN STRING
// ============================================================

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// ============================================================
// HELPER: CEK ADMIN
// ============================================================

function verifyAdmin(request: NextRequest) {
  // ----------------------------------------------------------
  // Pastikan JWT_SECRET tersedia
  // ----------------------------------------------------------

  if (!JWT_SECRET) {
    console.error(
      '[SETTINGS_AUTH] JWT_SECRET belum tersedia.'
    );

    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Konfigurasi server belum lengkap.',
        },
        { status: 500 }
      ),
    };
  }

  // ----------------------------------------------------------
  // Ambil token dari cookie
  // ----------------------------------------------------------

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Anda harus login terlebih dahulu.',
        },
        { status: 401 }
      ),
    };
  }

  // ----------------------------------------------------------
  // Verifikasi JWT
  // ----------------------------------------------------------

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;

    // --------------------------------------------------------
    // Pastikan role ADMIN
    // --------------------------------------------------------

    if (decoded.role !== 'ADMIN') {
      console.warn(
        `[SETTINGS_AUTH] Akses ditolak. User ${
          decoded.identity_number || decoded.id
        } memiliki role ${decoded.role}.`
      );

      return {
        authorized: false,
        response: NextResponse.json(
          {
            success: false,
            message:
              'Akses ditolak. Halaman pengaturan hanya dapat diakses oleh Administrator.',
          },
          { status: 403 }
        ),
      };
    }

    // --------------------------------------------------------
    // ADMIN VALID
    // --------------------------------------------------------

    return {
      authorized: true,
      user: decoded,
    };

  } catch (error) {
    console.error(
      '[SETTINGS_AUTH] JWT verification error:',
      error
    );

    return {
      authorized: false,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Sesi login tidak valid atau telah kedaluwarsa. Silakan login kembali.',
        },
        { status: 401 }
      ),
    };
  }
}

// ============================================================
// GET: AMBIL PENGATURAN SISTEM
// ============================================================

export async function GET(
  request: NextRequest
) {
  // ==========================================================
  // AUTHORIZATION
  // ==========================================================

  const auth = verifyAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  // ==========================================================
  // AMBIL DATA
  // ==========================================================

  try {
    let setting =
      await prisma.systemSetting.findFirst({
        orderBy: {
          id: 'asc',
        },
      });

    // --------------------------------------------------------
    // Jika belum ada setting, buat default
    // --------------------------------------------------------

    if (!setting) {
      setting =
        await prisma.systemSetting.create({
          data: DEFAULT_SETTINGS,
        });
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json(
      {
        success: true,
        message:
          'Pengaturan berhasil dimuat.',
        data: setting,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      '[SETTINGS_GET_ERROR]',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal memuat pengaturan sistem.',
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// POST: SIMPAN / PERBARUI PENGATURAN
// ============================================================

export async function POST(
  request: NextRequest
) {
  // ==========================================================
  // AUTHORIZATION
  // ==========================================================

  const auth = verifyAdmin(request);

  if (!auth.authorized) {
    return auth.response;
  }

  // ==========================================================
  // PROSES DATA
  // ==========================================================

  try {
    const body = await request.json();

    // --------------------------------------------------------
    // Bersihkan data
    // --------------------------------------------------------

    const schoolName = cleanString(
      body.schoolName
    );

    const academicYear = cleanString(
      body.academicYear
    );

    const semester = cleanString(
      body.semester
    );

    const principalName = cleanString(
      body.principalName
    );

    // ========================================================
    // VALIDASI
    // ========================================================

    if (
      !schoolName ||
      !academicYear ||
      !principalName
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Nama lembaga, tahun ajaran, dan nama pimpinan wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Validasi semester
    // --------------------------------------------------------

    if (
      !['Ganjil', 'Genap'].includes(
        semester
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Semester harus Ganjil atau Genap.',
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // CARI SETTING LAMA
    // ========================================================

    const existing =
      await prisma.systemSetting.findFirst({
        orderBy: {
          id: 'asc',
        },
      });

    let setting;

    // ========================================================
    // UPDATE
    // ========================================================

    if (existing) {
      setting =
        await prisma.systemSetting.update({
          where: {
            id: existing.id,
          },
          data: {
            schoolName,
            academicYear,
            semester,
            principalName,
          },
        });

    // ========================================================
    // CREATE
    // ========================================================

    } else {
      setting =
        await prisma.systemSetting.create({
          data: {
            schoolName,
            academicYear,
            semester,
            principalName,
          },
        });
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return NextResponse.json(
      {
        success: true,
        message:
          'Pengaturan sistem berhasil diperbarui.',
        data: setting,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      '[SETTINGS_POST_ERROR]',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal menyimpan pengaturan sistem.',
      },
      {
        status: 500,
      }
    );
  }
}