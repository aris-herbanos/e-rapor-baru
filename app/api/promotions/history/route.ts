import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const promotions = await prisma.studentPromotion.findMany({
      orderBy: {
        promotedAt: 'desc',
      },
      include: {
        student: {
          select: {
            id: true,
            nisn: true,
            fullname: true,
            gender: true,
            class_name: true,
          },
        },
      },
    });

    return NextResponse.json({
      data: promotions,
    });
  } catch (error) {
    console.error(
      'GET /api/promotions/history error:',
      error
    );

    return NextResponse.json(
      {
        message:
          'Gagal mengambil riwayat kenaikan kelas.',
      },
      {
        status: 500,
      }
    );
  }
}