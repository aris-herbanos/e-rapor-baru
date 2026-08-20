import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data guru yang dipilih.' }, { status: 400 });
    }

    await prisma.teacher.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: `Berhasil menghapus ${ids.length} data guru.` }, { status: 200 });
  } catch (error) {
    console.error('Error bulk deleting teachers:', error);
    return NextResponse.json({ message: 'Gagal melakukan hapus massal guru.' }, { status: 500 });
  }
}