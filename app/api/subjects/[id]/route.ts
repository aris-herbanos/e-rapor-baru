import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT: Update Mata Pelajaran
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const { name, teacherId } = await request.json();

    if (!name || !teacherId) {
      return NextResponse.json({ message: 'Nama mapel dan ID Pengajar wajib diisi!' }, { status: 400 });
    }

    const updatedSubject = await prisma.subject.update({
      where: { id },
      data: {
        name,
        teacherId: parseInt(teacherId),
      },
    });

    return NextResponse.json({ message: 'Mata pelajaran berhasil diperbarui', data: updatedSubject }, { status: 200 });
  } catch (error) {
    console.error('Error updating subject:', error);
    return NextResponse.json({ message: 'Gagal memperbarui mata pelajaran' }, { status: 500 });
  }
}

// DELETE: Hapus Mata Pelajaran
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.subject.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Mata pelajaran berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting subject:', error);
    return NextResponse.json({ message: 'Gagal menghapus mata pelajaran' }, { status: 500 });
  }
}