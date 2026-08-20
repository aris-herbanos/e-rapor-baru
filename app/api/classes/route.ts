import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Ambil daftar kelas
export async function GET() {
  try {
    const classes = await prisma.classRoom.findMany({
      orderBy: [
        { level: 'asc' },
        { grade: 'asc' },
        { name: 'asc' },
      ],
    });

    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error('GET /api/classes ERROR:', error);
    return NextResponse.json(
      { message: 'Gagal memuat data kelas' },
      { status: 500 }
    );
  }
}

// POST: Tambah kelas baru
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || '').trim().toUpperCase();
    const level = String(body.level || '').trim().toUpperCase();
    const grade = Number(body.grade);

    if (!name || !level || isNaN(grade)) {
      return NextResponse.json(
        { message: 'Nama kelas, jenjang, dan tingkat wajib diisi!' },
        { status: 400 }
      );
    }

    const newClass = await prisma.classRoom.create({
      data: {
        name,
        level,
        grade,
      },
    });

    return NextResponse.json(
      { message: 'Kelas berhasil ditambahkan', data: newClass },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/classes ERROR:', error);

    // Penanganan error jika nama kelas duplikat
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Nama kelas sudah terdaftar!' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Gagal menyimpan kelas' },
      { status: 500 }
    );
  }
}