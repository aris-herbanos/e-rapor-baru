import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        teacher: true,
        subject: true,
      },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(assignments, { status: 200 });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json({ message: 'Gagal memuat data penugasan' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { teacherId, subjectId, className } = await request.json();

    if (!teacherId || !subjectId || !className) {
      return NextResponse.json({ message: 'Guru, Mata Pelajaran, dan Kelas wajib dipilih!' }, { status: 400 });
    }

    const newAssignment = await prisma.assignment.create({
      data: {
        teacherId: Number(teacherId),
        subjectId: Number(subjectId),
        className,
      },
    });

    return NextResponse.json({ message: 'Penugasan berhasil disimpan', data: newAssignment }, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json({ message: 'Gagal menyimpan penugasan guru' }, { status: 500 });
  }
}