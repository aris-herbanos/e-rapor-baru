import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil data nilai/asesmen berdasarkan kelas atau mata pelajaran
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const tpId = searchParams.get('tpId');

    // Mengambil data asesmen beserta relasi data siswanya
    const assessments = await prisma.assessment.findMany({
      where: {
        ...(tpId ? { tpId: Number(tpId) } : {}),
        ...(className
          ? {
              student: {
                class_name: className,
              },
            }
          : {}),
      },
      include: {
        student: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    console.error('Error fetching scores from assessment:', error);
    return NextResponse.json({ message: 'Gagal memuat data nilai' }, { status: 500 });
  }
}