import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const classrooms = await prisma.classRoom.findMany({
      where: {
        status: 'Aktif',
      },
      orderBy: [
        {
          level: 'asc',
        },
        {
          grade: 'asc',
        },
        {
          name: 'asc',
        },
      ],
      select: {
        id: true,
        name: true,
        level: true,
        grade: true,
        status: true,
      },
    });

    return NextResponse.json({
      data: classrooms,
    });
  } catch (error) {
    console.error('Error GET classrooms:', error);

    return NextResponse.json(
      {
        message: 'Gagal mengambil daftar kelas.',
      },
      { status: 500 }
    );
  }
}