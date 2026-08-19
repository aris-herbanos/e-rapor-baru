import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const { studentId, tpId, score, type } = await request.json();

    if (!studentId || !tpId || score === undefined || !type) {
      return NextResponse.json({ message: 'Semua kolom wajib diisi!' }, { status: 400 });
    }

    // Simpan atau update nilai asesmen siswa berdasarkan TP dan tipenya
    const assessment = await prisma.assessment.create({
      data: {
        studentId: Number(studentId),
        tpId: Number(tpId),
        score: Number(score),
        type, // 'FORMATIVE' atau 'SUMMATIVE'
      },
    });

    return NextResponse.json({ message: 'Nilai berhasil disimpan', assessment }, { status: 201 });
  } catch (error) {
    console.error('Error saving assessment:', error);
    return NextResponse.json({ message: 'Gagal menyimpan nilai' }, { status: 500 });
  }
}