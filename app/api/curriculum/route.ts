import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* =========================================================
   KONFIGURASI
========================================================= */

const VALID_GRADES = [7, 8, 9, 10, 11, 12];
const VALID_SEMESTERS = [1, 2];

/* =========================================================
   HELPER
========================================================= */

function normalizeDescription(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function toNumber(value: unknown): number | null {
  const num = Number(value);

  if (!Number.isInteger(num)) {
    return null;
  }

  return num;
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

/**
 * Membuat kode singkatan mata pelajaran.
 *
 * Bahasa Arab -> BAH
 * Fiqih       -> FIQ
 * Tajwid      -> TAJ
 */
function createSubjectCode(subjectName: string) {
  const cleanName = subjectName
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();

  return cleanName.substring(0, 3) || 'MPL';
}

/**
 * Mencari nomor urut CP berikutnya.
 *
 * Contoh:
 * CP-FIQ-K7-S1-01
 * CP-FIQ-K7-S1-02
 *
 * Tidak memakai count() agar kode tidak bentrok
 * ketika ada CP lama yang pernah dihapus.
 */
async function generateCPCode(
  subjectId: number,
  subjectCode: string,
  grade: number,
  semester: number
) {
  const prefix = `CP-${subjectCode}-K${grade}-S${semester}-`;

  const existingCPs = await prisma.cP.findMany({
    where: {
      subjectId,
      grade,
      semester,
      code: {
        startsWith: prefix,
      },
    },
    select: {
      code: true,
    },
  });

  let highestSequence = 0;

  for (const cp of existingCPs) {
    const sequenceString = cp.code.slice(prefix.length);
    const sequence = Number(sequenceString);

    if (
      Number.isInteger(sequence) &&
      sequence > highestSequence
    ) {
      highestSequence = sequence;
    }
  }

  const nextSequence = highestSequence + 1;

  return `${prefix}${String(nextSequence).padStart(2, '0')}`;
}

/**
 * Membuat kode TP berikutnya berdasarkan CP induknya.
 *
 * Contoh:
 * TP-CP-FIQ-K7-S1-01-01
 * TP-CP-FIQ-K7-S1-01-02
 */
async function generateTPCode(
  cpId: number,
  parentCPCode: string
) {
  const prefix = `TP-${parentCPCode}-`;

  const existingTPs = await prisma.tP.findMany({
    where: {
      cpId,
      code: {
        startsWith: prefix,
      },
    },
    select: {
      code: true,
    },
  });

  let highestSequence = 0;

  for (const tp of existingTPs) {
    const sequenceString = tp.code.slice(prefix.length);
    const sequence = Number(sequenceString);

    if (
      Number.isInteger(sequence) &&
      sequence > highestSequence
    ) {
      highestSequence = sequence;
    }
  }

  const nextSequence = highestSequence + 1;

  return `${prefix}${String(nextSequence).padStart(2, '0')}`;
}

/* =========================================================
   GET
   Mengambil seluruh CP beserta:
   - Mata pelajaran
   - Tingkat kelas
   - Semester
   - TP
========================================================= */

export async function GET() {
  try {
    const cps = await prisma.cP.findMany({
      include: {
        subject: true,

        tps: {
          orderBy: {
            id: 'asc',
          },
        },
      },

      orderBy: [
        {
          grade: 'asc',
        },
        {
          semester: 'asc',
        },
        {
          id: 'desc',
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        data: cps,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('🔥 Curriculum GET Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal memuat data kurikulum.',
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
   Menangani:
   - CREATE_CP
   - CREATE_TP
   - UPDATE
   - DELETE
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      action,
      id,
      subjectId,
      cpId,
      description,
      grade,
      semester,
      type,
    } = body;

    /* =====================================================
       1. CREATE CP
    ===================================================== */

    if (action === 'CREATE_CP') {
      const numericSubjectId = toNumber(subjectId);
      const numericGrade = toNumber(grade);

      // Data lama/default menggunakan Semester 1
      const numericSemester =
        semester === undefined || semester === null
          ? 1
          : toNumber(semester);

      const cleanDescription =
        normalizeDescription(description);

      /* ---------------------------------------------------
         VALIDASI
      --------------------------------------------------- */

      if (!numericSubjectId) {
        return errorResponse(
          'Mata pelajaran wajib dipilih.'
        );
      }

      if (!cleanDescription) {
        return errorResponse(
          'Deskripsi Capaian Pembelajaran wajib diisi.'
        );
      }

      if (
        numericGrade === null ||
        !VALID_GRADES.includes(numericGrade)
      ) {
        return errorResponse(
          'Tingkat kelas tidak valid. Pilih kelas 7 sampai 12.'
        );
      }

      if (
        numericSemester === null ||
        !VALID_SEMESTERS.includes(numericSemester)
      ) {
        return errorResponse(
          'Semester tidak valid. Pilih Semester 1 atau Semester 2.'
        );
      }

      /* ---------------------------------------------------
         CEK MATA PELAJARAN
      --------------------------------------------------- */

      const subject = await prisma.subject.findUnique({
        where: {
          id: numericSubjectId,
        },
      });

      if (!subject) {
        return errorResponse(
          'Mata pelajaran tidak ditemukan.',
          404
        );
      }

      /* ---------------------------------------------------
         GENERATE KODE CP
      --------------------------------------------------- */

      const subjectCode = createSubjectCode(
        subject.name
      );

      const generatedCode =
        await generateCPCode(
          numericSubjectId,
          subjectCode,
          numericGrade,
          numericSemester
        );

      /* ---------------------------------------------------
         SIMPAN CP
      --------------------------------------------------- */

      const newCP = await prisma.cP.create({
        data: {
          code: generatedCode,

          description: cleanDescription,

          subjectId: numericSubjectId,

          grade: numericGrade,

          semester: numericSemester,
        },

        include: {
          subject: true,

          tps: true,
        },
      });

      return NextResponse.json(
        {
          success: true,

          message:
            `CP Kelas ${numericGrade} Semester ${numericSemester} berhasil ditambahkan.`,

          data: newCP,
        },
        {
          status: 201,
        }
      );
    }

    /* =====================================================
       2. CREATE TP
    ===================================================== */

    if (action === 'CREATE_TP') {
      const numericCPId = toNumber(cpId);

      const cleanDescription =
        normalizeDescription(description);

      if (!numericCPId) {
        return errorResponse(
          'Capaian Pembelajaran induk wajib dipilih.'
        );
      }

      if (!cleanDescription) {
        return errorResponse(
          'Deskripsi Tujuan Pembelajaran wajib diisi.'
        );
      }

      /* ---------------------------------------------------
         CARI CP INDUK
      --------------------------------------------------- */

      const parentCP = await prisma.cP.findUnique({
        where: {
          id: numericCPId,
        },
      });

      if (!parentCP) {
        return errorResponse(
          'Capaian Pembelajaran induk tidak ditemukan.',
          404
        );
      }

      /* ---------------------------------------------------
         GENERATE KODE TP
      --------------------------------------------------- */

      const generatedTPCode =
        await generateTPCode(
          numericCPId,
          parentCP.code
        );

      /* ---------------------------------------------------
         SIMPAN TP
      --------------------------------------------------- */

      const newTP = await prisma.tP.create({
        data: {
          code: generatedTPCode,

          description: cleanDescription,

          cpId: numericCPId,
        },
      });

      return NextResponse.json(
        {
          success: true,

          message:
            'Tujuan Pembelajaran (TP) berhasil ditambahkan.',

          data: newTP,
        },
        {
          status: 201,
        }
      );
    }

    /* =====================================================
       3. UPDATE CP / TP
    ===================================================== */

    if (action === 'UPDATE') {
      const numericId = toNumber(id);

      const cleanDescription =
        normalizeDescription(description);

      if (!numericId) {
        return errorResponse(
          'ID data tidak valid.'
        );
      }

      if (!cleanDescription) {
        return errorResponse(
          'Deskripsi tidak boleh kosong.'
        );
      }

      /* ---------------------------------------------------
         UPDATE CP
      --------------------------------------------------- */

      if (type === 'CP') {
        const existingCP =
          await prisma.cP.findUnique({
            where: {
              id: numericId,
            },
          });

        if (!existingCP) {
          return errorResponse(
            'Capaian Pembelajaran tidak ditemukan.',
            404
          );
        }

        const updated =
          await prisma.cP.update({
            where: {
              id: numericId,
            },

            data: {
              description:
                cleanDescription,
            },

            include: {
              subject: true,

              tps: {
                orderBy: {
                  id: 'asc',
                },
              },
            },
          });

        return NextResponse.json({
          success: true,

          message:
            'Capaian Pembelajaran berhasil diperbarui.',

          data: updated,
        });
      }

      /* ---------------------------------------------------
         UPDATE TP
      --------------------------------------------------- */

      if (type === 'TP') {
        const existingTP =
          await prisma.tP.findUnique({
            where: {
              id: numericId,
            },
          });

        if (!existingTP) {
          return errorResponse(
            'Tujuan Pembelajaran tidak ditemukan.',
            404
          );
        }

        const updated =
          await prisma.tP.update({
            where: {
              id: numericId,
            },

            data: {
              description:
                cleanDescription,
            },
          });

        return NextResponse.json({
          success: true,

          message:
            'Tujuan Pembelajaran berhasil diperbarui.',

          data: updated,
        });
      }

      return errorResponse(
        'Tipe data UPDATE tidak valid.'
      );
    }

    /* =====================================================
       4. DELETE CP / TP
    ===================================================== */

    if (action === 'DELETE') {
      const numericId = toNumber(id);

      if (!numericId) {
        return errorResponse(
          'ID data tidak valid.'
        );
      }

      /* ---------------------------------------------------
         HAPUS CP
      --------------------------------------------------- */

      if (type === 'CP') {
        const existingCP =
          await prisma.cP.findUnique({
            where: {
              id: numericId,
            },
          });

        if (!existingCP) {
          return errorResponse(
            'Capaian Pembelajaran tidak ditemukan.',
            404
          );
        }

        /**
         * Transaction:
         * 1. Hapus seluruh TP milik CP.
         * 2. Hapus CP.
         */
        await prisma.$transaction([
          prisma.tP.deleteMany({
            where: {
              cpId: numericId,
            },
          }),

          prisma.cP.delete({
            where: {
              id: numericId,
            },
          }),
        ]);

        return NextResponse.json({
          success: true,

          message:
            'Capaian Pembelajaran beserta seluruh TP berhasil dihapus.',
        });
      }

      /* ---------------------------------------------------
         HAPUS TP
      --------------------------------------------------- */

      if (type === 'TP') {
        const existingTP =
          await prisma.tP.findUnique({
            where: {
              id: numericId,
            },
          });

        if (!existingTP) {
          return errorResponse(
            'Tujuan Pembelajaran tidak ditemukan.',
            404
          );
        }

        await prisma.tP.delete({
          where: {
            id: numericId,
          },
        });

        return NextResponse.json({
          success: true,

          message:
            'Tujuan Pembelajaran berhasil dihapus.',
        });
      }

      return errorResponse(
        'Tipe data DELETE tidak valid.'
      );
    }

    /* =====================================================
       ACTION TIDAK DIKENAL
    ===================================================== */

    return errorResponse(
      'Aksi tidak valid.'
    );
  } catch (error) {
    console.error(
      '🔥 Curriculum API Error:',
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          'Terjadi kesalahan saat memproses data kurikulum.',
      },
      {
        status: 500,
      }
    );
  }
}