import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

// GET: Ambil data kepribadian berdasarkan kelas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ message: 'Kelas wajib diisi' }, { status: 400 });
    }

    const personalities = await prisma.personality.findMany({
      where: { className },
    });

    return NextResponse.json(personalities, { status: 200 });
  } catch (error) {
    console.error('Error fetching personalities:', error);
    return NextResponse.json({ message: 'Gagal memuat data kepribadian' }, { status: 500 });
  }
}

// POST: Simpan / Update kepribadian massal
export async function POST(request: Request) {
  try {
    const { className, records } = await request.json();
    // records berupa array: [{ studentId, suluk, muwadhotah, nadzofah, indhiplat }]

    if (!className || !Array.isArray(records)) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    // Menggunakan transaction untuk performa tinggi pada operasi massal
    const transaction = records.map((item: any) =>
      prisma.personality.upsert({
        where: { studentId: Number(item.studentId) },
        update: {
          suluk: item.suluk || '-',
          muwadhotah: item.muwadhotah || '-',
          nadzofah: item.nadzofah || '-',
          indhiplat: item.indhiplat || '-',
        },
        create: {
          studentId: Number(item.studentId),
          className,
          suluk: item.suluk || '-',
          muwadhotah: item.muwadhotah || '-',
          nadzofah: item.nadzofah || '-',
          indhiplat: item.indhiplat || '-',
        },
      })
    );

    await prisma.$transaction(transaction);

    return NextResponse.json({ message: 'Kepribadian santri berhasil disimpan!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving personality:', error);
    return NextResponse.json({ message: 'Gagal menyimpan kepribadian' }, { status: 500 });
  }
}