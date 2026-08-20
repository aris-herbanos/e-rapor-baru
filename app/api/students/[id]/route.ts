import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    const updated = await prisma.student.update({
      where: { id },
      data: {
        nisn: body.nisn,
        fullname: body.fullname,
        birth_info: body.birth_info,
        class_name: body.class_name,
        gender: body.gender,
        address: body.address,
      },
    });

    return NextResponse.json({ message: 'Data santri berhasil diperbarui', data: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ message: 'Gagal memperbarui data santri' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Data santri berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ message: 'Gagal menghapus data santri' }, { status: 500 });
  }
}