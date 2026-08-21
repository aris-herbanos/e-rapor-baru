import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/* =========================================================
   GET: MENGAMBIL SELURUH DATA ASESMEN
========================================================= */
export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        student: true,
        tp: {
          include: {
            cp: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { message: 'Gagal memuat data asesmen.' },
      { status: 500 }
    );
  }
}

/* =========================================================
   POST: MENYIMPAN ATAU MEMPERBARUI NILAI ASESMEN (Mendukung TP, STS, SAS)
========================================================= */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const studentId = Number(body?.studentId);
    const tpId = body?.tpId ? Number(body?.tpId) : null;
    const score = Number(body?.score);
    const type = String(body?.type || '').trim(); // Contoh: 'ORAL', 'WRITTEN', 'STS_ORAL', 'STS_WRITTEN', 'SAS_ORAL', 'SAS_WRITTEN'

    if (!studentId || Number.isNaN(score) || !type) {
      return NextResponse.json(
        { message: 'Data santri, nilai, dan jenis ujian wajib diisi dengan benar!' },
        { status: 400 }
      );
    }

    // Cari apakah nilai untuk siswa, tipe ujian, dan tpId ini sudah pernah ada
    const existingAssessment = await prisma.assessment.findFirst({
      where: {
        studentId,
        tpId: tpId ?? null,
        type,
      },
    });

    let assessment;

    if (existingAssessment) {
      // Jika sudah ada, update nilainya
      assessment = await prisma.assessment.update({
        where: { id: existingAssessment.id },
        data: { score },
        include: { 
          student: true, 
          tp: { include: { cp: { include: { subject: true } } } },
        },
      });
    } else {
      // Jika belum ada, buat baru
      const createData: any = {
        studentId,
        score,
        type,
      };
      if (tpId) {
        createData.tpId = tpId;
      }

      assessment = await prisma.assessment.create({
        data: createData,
        include: { 
          student: true, 
          tp: { include: { cp: { include: { subject: true } } } },
        },
      });
    }

    return NextResponse.json(
      { message: 'Nilai asesmen berhasil disimpan', assessment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving assessment:', error);
    return NextResponse.json(
      { message: 'Gagal menyimpan nilai asesmen.' },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE: MENGHAPUS NILAI ASESMEN
========================================================= */
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body?.id);

    if (!id) {
      return NextResponse.json(
        { message: 'ID Asesmen wajib disertakan!' },
        { status: 400 }
      );
    }

    await prisma.assessment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Nilai asesmen berhasil dihapus.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting assessment:', error);
    return NextResponse.json(
      { message: 'Gagal menghapus nilai asesmen.' },
      { status: 500 }
    );
  }
}