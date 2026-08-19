import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET: Ambil catatan berdasarkan kelas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ message: 'Kelas wajib diisi' }, { status: 400 });
    }

    const notes = await prisma.homeroomNote.findMany({
      where: { className },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memuat catatan wali kelas' }, { status: 500 });
  }
}

// POST: Simpan / Update catatan massal
export async function POST(request: Request) {
  try {
    const { className, records } = await request.json();
    // records berupa array: [{ studentId, note }]

    if (!className || !records) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
    }

    for (const item of records) {
      await prisma.homeroomNote.upsert({
        where: { studentId: Number(item.studentId) },
        update: {
          note: item.note || '',
        },
        create: {
          studentId: Number(item.studentId),
          className,
          note: item.note || '',
        },
      });
    }

    return NextResponse.json({ message: 'Catatan wali kelas berhasil disimpan!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving homeroom notes:', error);
    return NextResponse.json({ message: 'Gagal menyimpan catatan' }, { status: 500 });
  }
}