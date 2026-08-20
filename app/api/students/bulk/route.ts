import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Impor massal santri
export async function POST(request: Request) {
  try {
    const { students } = await request.json();

    if (!Array.isArray(students) || students.length === 0) {
      return NextResponse.json({ message: 'Data santri kosong atau tidak valid.' }, { status: 400 });
    }

    let successCount = 0;
    let duplicateCount = 0;

    for (const item of students) {
      if (!item.nisn || !item.fullname) continue;

      try {
        await prisma.student.upsert({
          where: { nisn: String(item.nisn).trim() },
          update: {
            fullname: String(item.fullname).trim(),
            birth_info: String(item.birth_info || '-').trim(),
            class_name: String(item.class_name || '-').trim(),
            gender: String(item.gender || 'L').trim(),
            address: String(item.address || '-').trim(),
          },
          create: {
            nisn: String(item.nisn).trim(),
            fullname: String(item.fullname).trim(),
            birth_info: String(item.birth_info || '-').trim(),
            class_name: String(item.class_name || '-').trim(),
            gender: String(item.gender || 'L').trim(),
            address: String(item.address || '-').trim(),
          },
        });
        successCount++;
      } catch (err) {
        duplicateCount++;
      }
    }

    return NextResponse.json({
      message: `Berhasil mengimpor ${successCount} data santri. (${duplicateCount} dilewati/diperbarui karena NISN kembar)`,
    }, { status: 200 });
  } catch (error) {
    console.error('Error importing students:', error);
    return NextResponse.json({ message: 'Gagal memproses impor data santri.' }, { status: 500 });
  }
}

// DELETE: Hapus massal santri
export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'Tidak ada santri yang dipilih.' }, { status: 400 });
    }

    await prisma.student.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: `Berhasil menghapus ${ids.length} data santri.` }, { status: 200 });
  } catch (error) {
    console.error('Error bulk deleting students:', error);
    return NextResponse.json({ message: 'Gagal melakukan hapus massal santri.' }, { status: 500 });
  }
}