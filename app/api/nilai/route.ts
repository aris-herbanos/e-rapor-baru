import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET: Ambil nilai berdasarkan kelas, mapel, dan tipe ujian
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const subjectId = searchParams.get('subjectId');
    const type = searchParams.get('type');

    if (!className || !subjectId || !type) {
      return NextResponse.json({ message: 'Parameter tidak lengkap' }, { status: 400 });
    }

    const scores = await prisma.scoreRecord.findMany({
      where: {
        className,
        subjectId: Number(subjectId),
        type,
      },
    });

    return NextResponse.json(scores, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memuat data nilai' }, { status: 500 });
  }
}

// POST: Simpan / Update nilai massal santri
export async function POST(request: Request) {
  try {
    const { className, subjectId, type, scores } = await request.json();
    // scores berupa array: [{ studentId, scoreNumber, scoreText }]

    if (!className || !subjectId || !type || !scores) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    for (const item of scores) {
      await prisma.scoreRecord.upsert({
        where: {
          studentId_subjectId_type: {
            studentId: Number(item.studentId),
            subjectId: Number(subjectId),
            type,
          },
        },
        update: {
          scoreNumber: Number(item.scoreNumber) || 0,
          scoreText: item.scoreText || '',
        },
        create: {
          studentId: Number(item.studentId),
          subjectId: Number(subjectId),
          className,
          type,
          scoreNumber: Number(item.scoreNumber) || 0,
          scoreText: item.scoreText || '',
        },
      });
    }

    return NextResponse.json({ message: 'Nilai berhasil disimpan!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving scores:', error);
    return NextResponse.json({ message: 'Gagal menyimpan nilai' }, { status: 500 });
  }
}