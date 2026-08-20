import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'Tidak ada mata pelajaran yang dipilih.' }, { status: 400 });
    }

    // Hapus data berdasarkan array ID
    await prisma.subject.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: `Berhasil menghapus ${ids.length} mata pelajaran.` }, { status: 200 });
  } catch (error) {
    console.error('Error bulk deleting subjects:', error);
    return NextResponse.json({ message: 'Gagal melakukan hapus massal mata pelajaran.' }, { status: 500 });
  }
}