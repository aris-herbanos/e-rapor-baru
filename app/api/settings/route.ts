import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// ============================================================
// DATABASE
// ============================================================

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

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
// HELPER
// ============================================================

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// ============================================================
// GET
// Ambil pengaturan sistem
// ============================================================

export async function GET() {
  try {
    let setting = await prisma.systemSetting.findFirst({
      orderBy: {
        id: 'asc',
      },
    });

    // --------------------------------------------------------
    // Jika belum ada pengaturan, buat default
    // --------------------------------------------------------

    if (!setting) {
      setting = await prisma.systemSetting.create({
        data: DEFAULT_SETTINGS,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaturan berhasil dimuat.',
        data: setting,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('[SETTINGS_GET_ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal memuat pengaturan sistem.',
      },
      {
        status: 500,
      }
    );
  }
}

// ============================================================
// POST
// Simpan / perbarui pengaturan sistem
// ============================================================

export async function POST(request: Request) {
  try {
    // --------------------------------------------------------
    // Ambil body
    // --------------------------------------------------------

    let body: any;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Format data yang dikirim tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Normalisasi input
    // --------------------------------------------------------

    const schoolName = cleanString(body.schoolName);
    const academicYear = cleanString(body.academicYear);
    const semester = cleanString(body.semester);
    const principalName = cleanString(body.principalName);

    // --------------------------------------------------------
    // Validasi
    // --------------------------------------------------------

    if (!schoolName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama lembaga wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    if (!academicYear) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tahun ajaran wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    if (!principalName) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nama pimpinan / mudir wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Validasi semester
    // --------------------------------------------------------

    if (!['Ganjil', 'Genap'].includes(semester)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semester harus Ganjil atau Genap.',
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------------------
    // Cari konfigurasi yang sudah ada
    // --------------------------------------------------------

    const existing = await prisma.systemSetting.findFirst({
      orderBy: {
        id: 'asc',
      },
    });

    let setting;

    // --------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------

    if (existing) {
      setting = await prisma.systemSetting.update({
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
    }

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    else {
      setting = await prisma.systemSetting.create({
        data: {
          schoolName,
          academicYear,
          semester,
          principalName,
        },
      });
    }

    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaturan sistem berhasil diperbarui.',
        data: setting,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('[SETTINGS_POST_ERROR]', error);

    // --------------------------------------------------------
    // Prisma error
    // --------------------------------------------------------

    if (error?.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          message: 'Pengaturan sistem sudah terdaftar.',
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menyimpan pengaturan sistem.',
      },
      {
        status: 500,
      }
    );
  }
}