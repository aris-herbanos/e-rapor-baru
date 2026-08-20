import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

// GET: Mengambil daftar CP beserta TP-nya
export async function GET() {
  try {
    const cps = await prisma.cP.findMany({
      include: {
        subject: true,
        tps: true,
      },
    });
    return NextResponse.json(cps, { status: 200 });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json({ message: 'Gagal memuat data kurikulum' }, { status: 500 });
  }
}

// POST: Menambah CP atau TP baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, subjectId, code, description, cpId } = body;

    if (action === 'CREATE_CP') {
      if (!subjectId || !code || !description) {
        return NextResponse.json({ message: 'Data CP tidak lengkap' }, { status: 400 });
      }
      const newCP = await prisma.cP.create({
        data: {
          code,
          description,
          subjectId: Number(subjectId),
        },
      });
      return NextResponse.json({ message: 'CP berhasil ditambahkan', data: newCP }, { status: 201 });
    }

    if (action === 'CREATE_TP') {
      if (!cpId || !code || !description) {
        return NextResponse.json({ message: 'Data TP tidak lengkap' }, { status: 400 });
      }
      const newTP = await prisma.tP.create({
        data: {
          code,
          description,
          cpId: Number(cpId),
        },
      });
      return NextResponse.json({ message: 'TP berhasil ditambahkan', data: newTP }, { status: 201 });
    }

    return NextResponse.json({ message: 'Aksi tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Error saving curriculum:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data' }, { status: 500 });
  }
}