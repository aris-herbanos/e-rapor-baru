import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

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
// GET: Ambil pengaturan sistem
// ============================================================

export async function GET() {
  try {
    let setting = await prisma.systemSetting.findFirst({
      orderBy: { id: 'asc' },
    });

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
      { status: 200 }
    );
  } catch (error) {
    console.error('[SETTINGS_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memuat pengaturan sistem.' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST: Simpan / perbarui pengaturan sistem
// ============================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const schoolName = cleanString(body.schoolName);
    const academicYear = cleanString(body.academicYear);
    const semester = cleanString(body.semester);
    const principalName = cleanString(body.principalName);

    // Validasi Dasar
    if (!schoolName || !academicYear || !principalName) {
      return NextResponse.json(
        { success: false, message: 'Nama lembaga, tahun ajaran, dan nama pimpinan wajib diisi.' },
        { status: 400 }
      );
    }

    if (!['Ganjil', 'Genap'].includes(semester)) {
      return NextResponse.json(
        { success: false, message: 'Semester harus Ganjil atau Genap.' },
        { status: 400 }
      );
    }

    const existing = await prisma.systemSetting.findFirst({
      orderBy: { id: 'asc' },
    });

    let setting;

    if (existing) {
      setting = await prisma.systemSetting.update({
        where: { id: existing.id },
        data: { schoolName, academicYear, semester, principalName },
      });
    } else {
      setting = await prisma.systemSetting.create({
        data: { schoolName, academicYear, semester, principalName },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaturan sistem berhasil diperbarui.',
        data: setting,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[SETTINGS_POST_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan pengaturan sistem.' },
      { status: 500 }
    );
  }
}