import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

// GET: Ambil catatan berdasarkan kelas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ message: 'Kelas wajib diisi' }, { status: 400 });
    }

    const notes = await prisma.homeroomNote.findMany({
      where: { className },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error('Error fetching homeroom notes:', error);
    return NextResponse.json({ message: 'Gagal memuat catatan wali kelas' }, { status: 500 });
  }
}

// POST: Simpan / Update catatan massal
export async function POST(request: Request) {
  try {
    const { className, records } = await request.json();
    // records berupa array: [{ studentId, note }]

    if (!className || !Array.isArray(records)) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    // Menggunakan transaction agar lebih efisien (satu request ke DB)
    const transaction = records.map((item: any) =>
      prisma.homeroomNote.upsert({
        where: { studentId: Number(item.studentId) },
        update: {
          note: item.note || '',
        },
        create: {
          studentId: Number(item.studentId),
          className,
          note: item.note || '',
        },
      })
    );

    await prisma.$transaction(transaction);

    return NextResponse.json({ message: 'Catatan wali kelas berhasil disimpan!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving homeroom notes:', error);
    return NextResponse.json({ message: 'Gagal menyimpan catatan' }, { status: 500 });
  }
}