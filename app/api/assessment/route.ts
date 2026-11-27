import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const assessmentInclude = {
  student: true,
  subject: true,
  tp: {
    include: {
      cp: {
        include: {
          subject: true,
        },
      },
    },
  },
};

const allowedTypes = [
  'ORAL',
  'WRITTEN',
  'STS_ORAL',
  'STS_WRITTEN',
  'SAS_ORAL',
  'SAS_WRITTEN',
] as const;

type AssessmentType = (typeof allowedTypes)[number];

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function isPrismaErrorCode(error: unknown, code: string) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === code
  );
}

/* =========================================================
   GET: AMBIL SELURUH ASESMEN
========================================================= */
export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      include: assessmentInclude,
      orderBy: { id: 'desc' },
    });

    return NextResponse.json(assessments, {
      status: 200,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    console.error('GET /api/assessment:', error);
    return jsonError('Gagal memuat data asesmen.', 500);
  }
}

/* =========================================================
   POST: SIMPAN / PERBARUI NILAI
   Semua nilai baru menyimpan subjectId.
   TP: tpId wajib.
   STS/SAS: tpId null, subjectId wajib.
========================================================= */
export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    const parsed: unknown = await request.json();

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return jsonError('Format data tidak valid.', 400);
    }

    body = parsed as Record<string, unknown>;
  } catch {
    return jsonError('Format JSON tidak valid.', 400);
  }

  const studentId = Number(body.studentId);
  const subjectId = Number(body.subjectId);
  const score = Number(body.score);
  const type = String(body.type ?? '').trim().toUpperCase();

  const tpId =
    body.tpId === null || body.tpId === undefined || body.tpId === ''
      ? null
      : Number(body.tpId);

  if (!Number.isSafeInteger(studentId) || studentId <= 0) {
    return jsonError('ID santri tidak valid.', 400);
  }

  if (!Number.isSafeInteger(subjectId) || subjectId <= 0) {
    return jsonError('Mata pelajaran wajib dipilih.', 400);
  }

  if (
    body.score === null ||
    body.score === undefined ||
    body.score === '' ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > 100
  ) {
    return jsonError('Nilai harus berupa bilangan bulat antara 0 sampai 100.', 400);
  }

  if (!allowedTypes.includes(type as AssessmentType)) {
    return jsonError('Jenis asesmen tidak valid.', 400);
  }

  if (tpId !== null && (!Number.isSafeInteger(tpId) || tpId <= 0)) {
    return jsonError('ID tujuan pembelajaran tidak valid.', 400);
  }

  const isTP = type === 'ORAL' || type === 'WRITTEN';

  if (isTP && tpId === null) {
    return jsonError('Tujuan Pembelajaran wajib dipilih untuk nilai TP.', 400);
  }

  if (!isTP && tpId !== null) {
    return jsonError('STS dan SAS tidak menggunakan TP.', 400);
  }

  try {
    // Pastikan mata pelajaran benar-benar ada.
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { id: true },
    });

    if (!subject) {
      return jsonError('Mata pelajaran tidak ditemukan.', 404);
    }

    // Untuk nilai TP, pastikan TP yang dipilih memang milik mapel tersebut.
    if (isTP && tpId !== null) {
      const tp = await prisma.tP.findUnique({
        where: { id: tpId },
        select: {
          id: true,
          cp: { select: { subjectId: true } },
        },
      });

      if (!tp || tp.cp.subjectId !== subjectId) {
        return jsonError(
          'Tujuan Pembelajaran tidak sesuai dengan mata pelajaran yang dipilih.',
          400
        );
      }
    }

    // TP dicari berdasarkan studentId + tpId + type.
    // STS/SAS dicari berdasarkan studentId + subjectId + type.
    const where = isTP
      ? { studentId, tpId, type }
      : { studentId, subjectId, tpId: null, type };

    const existing = await prisma.assessment.findFirst({
      where,
      select: { id: true },
    });

    const data = {
      studentId,
      subjectId,
      tpId,
      score,
      type,
    };

    const assessment = existing
      ? await prisma.assessment.update({
          where: { id: existing.id },
          data,
          include: assessmentInclude,
        })
      : await prisma.assessment.create({
          data,
          include: assessmentInclude,
        });

    return NextResponse.json(
      {
        success: true,
        message: existing
          ? 'Nilai asesmen berhasil diperbarui.'
          : 'Nilai asesmen berhasil disimpan.',
        assessment,
      },
      { status: existing ? 200 : 201 }
    );
  } catch (error) {
    // Jika dua request STS/SAS bersamaan membuat baris yang sama,
    // indeks unik parsial akan menolak duplikasi. Ambil baris lalu update.
    if (isPrismaErrorCode(error, 'P2002')) {
      try {
        const isTP = type === 'ORAL' || type === 'WRITTEN';
        const existing = await prisma.assessment.findFirst({
          where: isTP
            ? { studentId, tpId, type }
            : { studentId, subjectId, tpId: null, type },
          select: { id: true },
        });

        if (existing) {
          const assessment = await prisma.assessment.update({
            where: { id: existing.id },
            data: { subjectId, tpId, score, type },
            include: assessmentInclude,
          });

          return NextResponse.json({
            success: true,
            message: 'Nilai asesmen berhasil diperbarui.',
            assessment,
          });
        }
      } catch (retryError) {
        console.error('POST /api/assessment retry:', retryError);
      }
    }

    console.error('POST /api/assessment:', error);

    if (isPrismaErrorCode(error, 'P2003')) {
      return jsonError('Santri, mata pelajaran, atau TP tidak ditemukan.', 400);
    }

    return jsonError('Gagal menyimpan nilai asesmen.', 500);
  }
}

/* =========================================================
   DELETE: HAPUS NILAI ASESMEN
========================================================= */
export async function DELETE(request: Request) {
  let body: Record<string, unknown>;

  try {
    const parsed: unknown = await request.json();

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return jsonError('Format data tidak valid.', 400);
    }

    body = parsed as Record<string, unknown>;
  } catch {
    return jsonError('Format JSON tidak valid.', 400);
  }

  const id = Number(body.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return jsonError('ID asesmen tidak valid.', 400);
  }

  try {
    await prisma.assessment.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: 'Nilai asesmen berhasil dihapus.',
    });
  } catch (error) {
    console.error('DELETE /api/assessment:', error);

    if (isPrismaErrorCode(error, 'P2025')) {
      return jsonError('Data asesmen tidak ditemukan.', 404);
    }

    return jsonError('Gagal menghapus nilai asesmen.', 500);
  }
}
