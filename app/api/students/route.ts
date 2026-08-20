import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

// GET: Ambil semua data santri
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ message: 'Gagal memuat data santri' }, { status: 500 });
  }
}

// POST: Tambah santri baru
export async function POST(request: Request) {
  try {
    const { nisn, fullname, gender, class_name } = await request.json();

    if (!nisn || !fullname || !gender || !class_name) {
      return NextResponse.json({ message: 'Semua kolom wajib diisi!' }, { status: 400 });
    }

    const newStudent = await prisma.student.create({
      data: {
        nisn,
        fullname,
        gender,
        class_name,
      },
    });

    return NextResponse.json(
      { message: 'Santri berhasil ditambahkan', data: newStudent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating student:', error);
    
    // Penanganan error jika NISN sudah ada (Unique Constraint Violation)
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'NISN / ID Santri sudah terdaftar di sistem!' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ message: 'Gagal menyimpan data santri' }, { status: 500 });
  }
}