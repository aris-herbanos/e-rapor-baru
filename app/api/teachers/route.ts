import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat
import * as bcrypt from 'bcrypt';

// GET: Ambil semua daftar guru
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        identity_number: true,
        fullname: true,
        role: true,
      },
    });
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ message: 'Gagal memuat data guru' }, { status: 500 });
  }
}

// POST: Tambah guru baru
export async function POST(request: Request) {
  try {
    const { identity_number, fullname, password, role } = await request.json();

    if (!identity_number || !fullname || !password) {
      return NextResponse.json({ message: 'NIP/NIK, Nama Lengkap, dan Password wajib diisi!' }, { status: 400 });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await prisma.teacher.create({
      data: {
        identity_number,
        fullname,
        password: hashedPassword,
        role: role || 'TEACHER', // ADMIN atau TEACHER
      },
    });

    return NextResponse.json({ 
      message: 'Guru berhasil didaftarkan', 
      data: { id: newTeacher.id, fullname: newTeacher.fullname } 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating teacher:', error);
    
    // Penanganan error duplikasi NIP/NIK (Unique Constraint Violation)
    if (error?.code === 'P2002') {
      return NextResponse.json({ message: 'NIP/NIK sudah terdaftar di sistem!' }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'Gagal mendaftarkan guru' }, { status: 500 });
  }
}