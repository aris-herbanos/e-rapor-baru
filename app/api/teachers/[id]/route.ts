import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { message: 'ID guru tidak valid' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updated = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        identity_number:
          body.identity_number !== undefined
            ? String(body.identity_number)
            : undefined,

        fullname:
          body.fullname !== undefined
            ? String(body.fullname)
            : undefined,

        birth_date:
          body.birth_date !== undefined && body.birth_date !== null
            ? String(body.birth_date)
            : null,

        education:
          body.education !== undefined && body.education !== null
            ? String(body.education)
            : null,

        address:
          body.address !== undefined && body.address !== null
            ? String(body.address)
            : null,

        status:
          body.status !== undefined && body.status !== null
            ? String(body.status)
            : undefined,
      },
    });

    return NextResponse.json(
      {
        message: 'Data guru berhasil diperbarui',
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating teacher:', error);

    if (error?.code === 'P2025') {
      return NextResponse.json(
        { message: 'Data guru tidak ditemukan' },
        { status: 404 }
      );
    }

    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Nomor identitas guru sudah digunakan' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Gagal memperbarui data guru' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { message: 'ID guru tidak valid' },
        { status: 400 }
      );
    }

    await prisma.teacher.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: 'Data guru berhasil dihapus',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting teacher:', error);

    if (error?.code === 'P2025') {
      return NextResponse.json(
        { message: 'Data guru tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Gagal menghapus data guru' },
      { status: 500 }
    );
  }
}