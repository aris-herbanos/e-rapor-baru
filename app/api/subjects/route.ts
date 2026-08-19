import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// GET: Ambil semua daftar mata pelajaran
export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        teacher: true,
      },
    });
    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ message: 'Gagal memuat mata pelajaran' }, { status: 500 });
  }
}

// POST: Tambah mata pelajaran baru
export async function POST(request: Request) {
  try {
    const { name, teacherId } = await request.json();

    if (!name || !teacherId) {
      return NextResponse.json({ message: 'Nama mapel dan ID Pengajar wajib diisi!' }, { status: 400 });
    }

    const newSubject = await prisma.subject.create({
      data: {
        name,
        teacherId: Number(teacherId),
      },
    });

    return NextResponse.json({ message: 'Mata pelajaran berhasil ditambahkan', data: newSubject }, { status: 201 });
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ message: 'Gagal menyimpan mata pelajaran' }, { status: 500 });
  }
}