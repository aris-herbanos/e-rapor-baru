import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
  schoolName: 'Pondok Pesantren Terpadu Ulul Albab',
  academicYear: '2026/2027',
  semester: 'Ganjil',
  principalName: 'Pimpinan Pesantren',
};

/* =========================================================
   TYPE NILAI
========================================================= */

type CategoryScore = {
  tpScores: number[];
  sts: number;
  sas: number;
  hasSts: boolean;
  hasSas: boolean;
};

type SubjectScore = {
  ORAL: CategoryScore;
  WRITTEN: CategoryScore;
};

/* =========================================================
   HELPER
========================================================= */

function createEmptyCategory(): CategoryScore {
  return {
    tpScores: [],
    sts: 0,
    sas: 0,
    hasSts: false,
    hasSas: false,
  };
}

function calculateFinalScore(data: CategoryScore) {
  const tpScores = data.tpScores;

  if (
    tpScores.length === 0 &&
    !data.hasSts &&
    !data.hasSas
  ) {
    return null;
  }

  const totalTP = tpScores.reduce(
    (total, score) => total + score,
    0
  );

  const averageTP =
    tpScores.length > 0
      ? totalTP / tpScores.length
      : 0;

  /*
   * Bila STS / SAS belum ada,
   * gunakan rata-rata TP agar nilai tidak langsung menjadi 0.
   */
  const sts = data.hasSts
    ? data.sts
    : averageTP;

  const sas = data.hasSas
    ? data.sas
    : averageTP;

  /*
   * Bobot (Kurikulum Merdeka / Kemenag):
   * TP  = 2
   * STS = 1
   * SAS = 1
   */
  const finalScore =
    (2 * averageTP + sts + sas) / 4;

  return Math.round(finalScore);
}

/* =========================================================
   GET REPORT
========================================================= */

export async function GET(
  request: Request
) {
  try {
    /* =====================================================
       AMBIL PARAMETER STUDENT ID
    ===================================================== */

    const { searchParams } =
      new URL(request.url);

    const studentIdParam =
      searchParams.get('studentId');

    if (!studentIdParam) {
      return NextResponse.json(
        {
          success: false,
          message:
            'ID Santri wajib disertakan.',
        },
        {
          status: 400,
        }
      );
    }

    const studentId =
      Number(studentIdParam);

    if (
      !Number.isInteger(studentId) ||
      studentId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'ID Santri tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       AMBIL DATA SANTRI + PENGATURAN SISTEM
    ===================================================== */

    const [student, systemSetting] =
      await Promise.all([
        prisma.student.findUnique({
          where: {
            id: studentId,
          },

          include: {
            assessments: {
              include: {
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
            },

            personality: true,

            homeroomNote: true,

            attendances: true,
          },
        }),

        prisma.systemSetting.findFirst({
          orderBy: {
            id: 'asc',
          },
        }),
      ]);

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Santri tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       SETTINGS AKTIF
    ===================================================== */

    const settings = {
      schoolName:
        systemSetting?.schoolName ||
        DEFAULT_SETTINGS.schoolName,

      academicYear:
        systemSetting?.academicYear ||
        DEFAULT_SETTINGS.academicYear,

      semester:
        systemSetting?.semester ||
        DEFAULT_SETTINGS.semester,

      principalName:
        systemSetting?.principalName ||
        DEFAULT_SETTINGS.principalName,
    };

    /* =====================================================
       1. REKAP KEHADIRAN
    ===================================================== */

    let sakit = 0;
    let izin = 0;
    let alpa = 0;

    if (
      Array.isArray(student.attendances)
    ) {
      student.attendances.forEach(
        (attendance: any) => {
          const status = String(
            attendance.status || ''
          )
            .trim()
            .toUpperCase();

          switch (status) {
            case 'SAKIT':
              sakit++;
              break;

            case 'IZIN':
              izin++;
              break;

            case 'ALPA':
              alpa++;
              break;

            default:
              break;
          }
        }
      );
    }

    /* =====================================================
       2. KELOMPOKKAN NILAI
    ===================================================== */

    const subjectMap:
      Record<string, SubjectScore> = {};

    if (
      Array.isArray(student.assessments)
    ) {
      student.assessments.forEach(
        (assessment: any) => {
          const subjectName =
            assessment.tp?.cp?.subject
              ?.name ||
            assessment.subject?.name ||
            'Mata Pelajaran Umum';

          const type = String(
            assessment.type || ''
          )
            .trim()
            .toUpperCase();

          const rawScore =
            Number(assessment.score);

          const score =
            Number.isFinite(rawScore)
              ? rawScore
              : 0;

          if (!subjectMap[subjectName]) {
            subjectMap[subjectName] = {
              ORAL:
                createEmptyCategory(),

              WRITTEN:
                createEmptyCategory(),
            };
          }

          const subject =
            subjectMap[subjectName];

          // NILAI TP LISAN
          if (
            type === 'ORAL' ||
            type === 'TP_ORAL'
          ) {
            if (assessment.tpId) {
              subject.ORAL.tpScores.push(
                score
              );
            }
          }

          // NILAI TP TERTULIS
          if (
            type === 'WRITTEN' ||
            type === 'TP_WRITTEN'
          ) {
            if (assessment.tpId) {
              subject.WRITTEN.tpScores.push(
                score
              );
            }
          }

          // STS LISAN
          if (type === 'STS_ORAL') {
            subject.ORAL.sts = score;
            subject.ORAL.hasSts = true;
          }

          // STS TERTULIS
          if (
            type === 'STS_WRITTEN'
          ) {
            subject.WRITTEN.sts =
              score;

            subject.WRITTEN.hasSts =
              true;
          }

          // STS UMUM
          if (type === 'STS') {
            subject.ORAL.sts = score;
            subject.ORAL.hasSts = true;

            subject.WRITTEN.sts =
              score;

            subject.WRITTEN.hasSts =
              true;
          }

          // SAS LISAN
          if (type === 'SAS_ORAL') {
            subject.ORAL.sas = score;
            subject.ORAL.hasSas = true;
          }

          // SAS TERTULIS
          if (
            type === 'SAS_WRITTEN'
          ) {
            subject.WRITTEN.sas =
              score;

            subject.WRITTEN.hasSas =
              true;
          }

          // SAS UMUM
          if (type === 'SAS') {
            subject.ORAL.sas = score;
            subject.ORAL.hasSas = true;

            subject.WRITTEN.sas =
              score;

            subject.WRITTEN.hasSas =
              true;
          }
        }
      );
    }

    /* =====================================================
       3. HITUNG NILAI RAPOR
    ===================================================== */

    const scoreRecords: Array<{
      subjectName: string;
      type: 'ORAL' | 'WRITTEN';
      score: number;
    }> = [];

    Object.entries(
      subjectMap
    ).forEach(
      ([subjectName, categories]) => {
        const oralScore =
          calculateFinalScore(
            categories.ORAL
          );

        const writtenScore =
          calculateFinalScore(
            categories.WRITTEN
          );

        if (oralScore !== null) {
          scoreRecords.push({
            subjectName,
            type: 'ORAL',
            score: oralScore,
          });
        }

        if (
          writtenScore !== null
        ) {
          scoreRecords.push({
            subjectName,
            type: 'WRITTEN',
            score: writtenScore,
          });
        }
      }
    );

    /* =====================================================
       4. RATA-RATA KESELURUHAN
    ===================================================== */

    const totalScore =
      scoreRecords.reduce(
        (total, record) =>
          total + record.score,
        0
      );

    const averageScore =
      scoreRecords.length > 0
        ? Number(
            (
              totalScore /
              scoreRecords.length
            ).toFixed(1)
          )
        : 0;

    /* =====================================================
       5. JUMLAH SANTRI DALAM KELAS
    ===================================================== */

    let totalStudents = 1;

    try {
      totalStudents =
        await prisma.student.count({
          where: {
            class_name:
              student.class_name,
          },
        });
    } catch (error) {
      console.warn(
        '[REPORT_TOTAL_STUDENTS]',
        error
      );

      totalStudents = 1;
    }

    /* =====================================================
       6. KEPRIBADIAN
    ===================================================== */

    const personality =
      student.personality
        ? [
            {
              arabic: 'السلوك',
              name:
                'Kelakuan / Perilaku',
              value:
                (
                  student.personality as any
                ).suluk ?? '-',
            },
            {
              arabic: 'المواظبة',
              name:
                'Kerajinan / Kehadiran',
              value:
                (
                  student.personality as any
                ).muwadhotah ?? '-',
            },
            {
              arabic: 'النظافة',
              name: 'Kebersihan',
              value:
                (
                  student.personality as any
                ).nadzofah ?? '-',
            },
            {
              arabic: 'الانضباط',
              name: 'Disiplin',
              value:
                (
                  student.personality as any
                ).indhiplat ?? '-',
            },
          ]
        : [];

    /* =====================================================
       7. DATA RAPOR FINAL
    ===================================================== */

    const reportData = {
      ...student,

      schoolName:
        settings.schoolName,

      academicYear:
        settings.academicYear,

      semester:
        settings.semester,

      principalName:
        settings.principalName,

      settings,

      scoreRecords,

      personality,

      homeroomNote:
        (
          student.homeroomNote as any
        )?.note || '',

      attendance: {
        sakit,
        izin,
        alpa,
      },

      averageScore,

      totalStudents,

      rank: null,
    };

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        report: reportData,
      },
      {
        status: 200,

        headers: {
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',

          Pragma: 'no-cache',

          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error(
      '🔥 Error fetching report:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal memuat data rapor dari server.',
      },
      {
        status: 500,
      }
    );
  }
}