import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat

// GET: Mengambil daftar CP beserta TP-nya
export async function GET() {
  try {
    const cps = await prisma.cP.findMany({
      include: {
        subject: true,
        tps: { orderBy: { id: 'asc' } },
      },
      orderBy: { id: 'desc' },
    });
    return NextResponse.json({ success: true, data: cps }, { status: 200 });
  } catch (error) {
    console.error('Curriculum GET Error:', error);
    return NextResponse.json({ success: false, message: 'Gagal memuat data' }, { status: 500 });
  }
}

// POST, PATCH, DELETE: Menangani manipulasi data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, subjectId, cpId, description, type } = body;

    // 1. CREATE CP DENGAN KODE OTOMATIS
    if (action === 'CREATE_CP') {
      if (!subjectId || !description) {
        return NextResponse.json({ success: false, message: 'Mata pelajaran dan deskripsi wajib diisi' }, { status: 400 });
      }

      // Ambil nama mapel untuk kode singkatan (misal: Bahasa Arab -> BAH)
      const subject = await prisma.subject.findUnique({ where: { id: Number(subjectId) } });
      const subjCode = subject 
        ? subject.name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() 
        : 'MPL';

      // Hitung jumlah CP yang sudah ada pada mapel ini
      const count = await prisma.cP.count({ where: { subjectId: Number(subjectId) } });
      const generatedCode = `CP-${subjCode}-${String(count + 1).padStart(2, '0')}`;

      const newCP = await prisma.cP.create({ 
        data: { 
          code: generatedCode, 
          description: description.trim(), 
          subjectId: Number(subjectId) 
        } 
      });

      return NextResponse.json({ success: true, data: newCP }, { status: 201 });
    }

    // 2. CREATE TP DENGAN KODE OTOMATIS
    if (action === 'CREATE_TP') {
      if (!cpId || !description) {
        return NextResponse.json({ success: false, message: 'CP Induk dan deskripsi wajib diisi' }, { status: 400 });
      }

      // Cari CP Induk untuk mengambil kodenya
      const parentCP = await prisma.cP.findUnique({ where: { id: Number(cpId) } });
      if (!parentCP) {
        return NextResponse.json({ success: false, message: 'Capaian Pembelajaran induk tidak ditemukan' }, { status: 404 });
      }

      // Hitung jumlah TP yang sudah ada pada CP ini
      const tpCount = await prisma.tP.count({ where: { cpId: Number(cpId) } });
      const generatedTPCode = `TP-${parentCP.code}-${String(tpCount + 1).padStart(2, '0')}`;

      const newTP = await prisma.tP.create({ 
        data: { 
          code: generatedTPCode, 
          description: description.trim(), 
          cpId: Number(cpId) 
        } 
      });

      return NextResponse.json({ success: true, data: newTP }, { status: 201 });
    }

    // UPDATE
    if (action === 'UPDATE') {
      if (type === 'CP') {
        const updated = await prisma.cP.update({ 
          where: { id: Number(id) }, 
          data: { description: description?.trim() } 
        });
        return NextResponse.json({ success: true, data: updated });
      } else {
        const updated = await prisma.tP.update({ 
          where: { id: Number(id) }, 
          data: { description: description?.trim() } 
        });
        return NextResponse.json({ success: true, data: updated });
      }
    }

    // DELETE
    if (action === 'DELETE') {
      if (type === 'CP') {
        // Hapus TP terkait terlebih dahulu untuk menghindari pelanggaran foreign key
        await prisma.tP.deleteMany({ where: { cpId: Number(id) } });
        await prisma.cP.delete({ where: { id: Number(id) } });
      } else {
        await prisma.tP.delete({ where: { id: Number(id) } });
      }
      return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Curriculum API Error:', error);
    return NextResponse.json({ success: false, message: 'Gagal memproses data' }, { status: 500 });
  }
}