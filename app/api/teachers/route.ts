import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

// POST: Tambah Guru Baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identity_number, fullname, password, birth_date, education, address, status } = body;

    if (!identity_number || !fullname || !password) {
      return NextResponse.json(
        { message: 'NIK, Nama Lengkap, dan Password wajib diisi!' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await prisma.teacher.create({
      data: {
        identity_number: String(identity_number).trim(),
        fullname: String(fullname).trim(),
        password: hashedPassword,
        birth_date: birth_date ? String(birth_date).trim() : null,
        education: education ? String(education).trim() : null,
        address: address ? String(address).trim() : null,
        status: status ? String(status).trim() : 'Aktif',
        role: 'TEACHER',
      },
    });

    return NextResponse.json(
      { message: 'Ustadz/Guru berhasil ditambahkan', data: newTeacher },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating teacher:', error);

    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'NIK / Nomor identitas sudah terdaftar dalam sistem.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Gagal mendaftarkan guru' },
      { status: 500 }
    );
  }
}

// GET: Ambil Daftar Guru (Disesuaikan agar mendukung pembungkusan objek data)
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { id: 'desc' },
    });

    // Mengembalikan format objek { data: [...] } agar aman dibaca frontend
    return NextResponse.json({ data: teachers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { message: 'Gagal memuat daftar guru' },
      { status: 500 }
    );
  }
}