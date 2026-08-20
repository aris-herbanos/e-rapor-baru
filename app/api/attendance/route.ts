import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil daftar riwayat kehadiran
export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        student: true,
      },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ message: 'Gagal memuat data kehadiran' }, { status: 500 });
  }
}

// POST: Tambah catatan kehadiran baru
export async function POST(request: Request) {
  try {
    const { studentId, status } = await request.json();

    if (!studentId || !status) {
      return NextResponse.json({ message: 'ID Santri dan Status wajib diisi!' }, { status: 400 });
    }

    const newAttendance = await prisma.attendance.create({
      data: {
        studentId: Number(studentId),
        status, // Status: HADIR / SAKIT / IZIN / ALPA
      },
    });

    return NextResponse.json({ message: 'Kehadiran berhasil dicatat', data: newAttendance }, { status: 201 });
  } catch (error) {
    console.error('Error creating attendance:', error);
    return NextResponse.json({ message: 'Gagal menyimpan kehadiran' }, { status: 500 });
  }
}