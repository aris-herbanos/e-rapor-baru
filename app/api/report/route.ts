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
   * Bobot:
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
       Berdasarkan:
       - Mata pelajaran
       - Lisan
       - Tertulis
       - STS
       - SAS
    ===================================================== */

    const subjectMap:
      Record<string, SubjectScore> = {};

    if (
      Array.isArray(student.assessments)
    ) {
      student.assessments.forEach(
        (assessment: any) => {
          /* ---------------------------------------------
             NAMA MATA PELAJARAN
          --------------------------------------------- */

          const subjectName =
            assessment.tp?.cp?.subject
              ?.name ||
            assessment.subject?.name ||
            'Mata Pelajaran Umum';

          /* ---------------------------------------------
             TIPE NILAI
          --------------------------------------------- */

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

          /* ---------------------------------------------
             INITIALIZE MAPEL
          --------------------------------------------- */

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

          /* =================================================
             NILAI TP LISAN
          ================================================= */

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

          /* =================================================
             NILAI TP TERTULIS
          ================================================= */

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

          /* =================================================
             STS LISAN
          ================================================= */

          if (type === 'STS_ORAL') {
            subject.ORAL.sts = score;
            subject.ORAL.hasSts = true;
          }

          /* =================================================
             STS TERTULIS
          ================================================= */

          if (
            type === 'STS_WRITTEN'
          ) {
            subject.WRITTEN.sts =
              score;

            subject.WRITTEN.hasSts =
              true;
          }

          /* =================================================
             STS UMUM
             Jika data lama hanya "STS",
             masukkan ke Lisan + Tertulis
          ================================================= */

          if (type === 'STS') {
            subject.ORAL.sts = score;
            subject.ORAL.hasSts = true;

            subject.WRITTEN.sts =
              score;

            subject.WRITTEN.hasSts =
              true;
          }

          /* =================================================
             SAS LISAN
          ================================================= */

          if (type === 'SAS_ORAL') {
            subject.ORAL.sas = score;
            subject.ORAL.hasSas = true;
          }

          /* =================================================
             SAS TERTULIS
          ================================================= */

          if (
            type === 'SAS_WRITTEN'
          ) {
            subject.WRITTEN.sas =
              score;

            subject.WRITTEN.hasSas =
              true;
          }

          /* =================================================
             SAS UMUM
          ================================================= */

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

        /* -----------------------------------------------
           LISAN
        ----------------------------------------------- */

        if (oralScore !== null) {
          scoreRecords.push({
            subjectName,
            type: 'ORAL',
            score: oralScore,
          });
        }

        /* -----------------------------------------------
           TERTULIS
        ----------------------------------------------- */

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

      /*
       * Identitas lembaga SELALU mengambil
       * dari SystemSetting terbaru.
       */
      schoolName:
        settings.schoolName,

      academicYear:
        settings.academicYear,

      semester:
        settings.semester,

      principalName:
        settings.principalName,

      /*
       * Tetap sertakan object setting lengkap
       * agar frontend lebih fleksibel.
       */
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

      /*
       * Jangan pakai rank: 1 secara paksa.
       * Ranking harus dihitung dari seluruh
       * nilai santri satu kelas.
       */
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
=======
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentIdParam = searchParams.get('studentId');

    if (!studentIdParam) {
      return NextResponse.json({ message: 'ID Santri wajib disertakan' }, { status: 400 });
    }

    const studentId = Number(studentIdParam);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        assessments: {
          include: {
            tp: { include: { cp: { include: { subject: true } } } },
          },
        },
        personality: true,
        homeroomNote: true,
        attendances: true,
      },
    });

    if (!student) {
      return NextResponse.json({ message: 'Santri tidak ditemukan' }, { status: 404 });
    }

    // 1. Rekap Kehadiran
    let sakit = 0, izin = 0, alpa = 0;
    if (Array.isArray(student.attendances)) {
      student.attendances.forEach((att: any) => {
        const status = String(att.status || '').trim().toUpperCase();
        if (status === 'SAKIT') sakit++;
        else if (status === 'IZIN') izin++;
        else if (status === 'ALPA') alpa++;
      });
    }

    // 2. KELOMPOKKAN NILAI BERDASARKAN MAPEL & KATEGORI (ORAL / WRITTEN / STS / SAS)
    const subjectMap: Record<string, any> = {};

    if (Array.isArray(student.assessments)) {
      student.assessments.forEach((ass: any) => {
        const subjName = ass.tp?.cp?.subject?.name || ass.subject?.name || 'Mata Pelajaran Umum';
        const type = String(ass.type || '').trim().toUpperCase(); 
        const scoreVal = Number(ass.score) || 0;

        if (!subjectMap[subjName]) {
          subjectMap[subjName] = {
            ORAL: { tpScores: [], sts: 0, sas: 0, hasSts: false, hasSas: false },
            WRITTEN: { tpScores: [], sts: 0, sas: 0, hasSts: false, hasSas: false },
          };
        }

        // Penanganan TP Lisan dan Tertulis
        if (type === 'ORAL' || type === 'TP_ORAL') {
          if (ass.tpId) subjectMap[subjName].ORAL.tpScores.push(scoreVal);
        } else if (type === 'WRITTEN' || type === 'TP_WRITTEN') {
          if (ass.tpId) subjectMap[subjName].WRITTEN.tpScores.push(scoreVal);
        } else if (type === 'ORAL' || type === 'WRITTEN') { // General fallback
          if (ass.tpId) {
            subjectMap[subjName][type].tpScores.push(scoreVal);
          }
        }

        // Penanganan Ujian Tengah Semester (STS)
        if (['STS', 'STS_WRITTEN', 'STS_ORAL'].includes(type)) {
          if (type.includes('ORAL')) {
            subjectMap[subjName].ORAL.sts = scoreVal;
            subjectMap[subjName].ORAL.hasSts = true;
          } else if (type.includes('WRITTEN')) {
            subjectMap[subjName].WRITTEN.sts = scoreVal;
            subjectMap[subjName].WRITTEN.hasSts = true;
          } else {
            subjectMap[subjName].WRITTEN.sts = scoreVal;
            subjectMap[subjName].WRITTEN.hasSts = true;
            subjectMap[subjName].ORAL.sts = scoreVal;
            subjectMap[subjName].ORAL.hasSts = true;
          }
        }

        // Penanganan Ujian Akhir Semester (SAS)
        if (['SAS', 'SAS_WRITTEN', 'SAS_ORAL'].includes(type)) {
          if (type.includes('ORAL')) {
            subjectMap[subjName].ORAL.sas = scoreVal;
            subjectMap[subjName].ORAL.hasSas = true;
          } else if (type.includes('WRITTEN')) {
            subjectMap[subjName].WRITTEN.sas = scoreVal;
            subjectMap[subjName].WRITTEN.hasSas = true;
          } else {
            subjectMap[subjName].WRITTEN.sas = scoreVal;
            subjectMap[subjName].WRITTEN.hasSas = true;
            subjectMap[subjName].ORAL.sas = scoreVal;
            subjectMap[subjName].ORAL.hasSas = true;
          }
        }
      });
    }

    // 3. HITUNG NILAI AKHIR RAPOR SESUAI RUMUS KEMENDIKBUD (Bobot 2 : 1 : 1)
    const scoreRecords: any[] = [];

    Object.keys(subjectMap).forEach((subjectName) => {
      ['ORAL', 'WRITTEN'].forEach((catType) => {
        const data = subjectMap[subjectName][catType];
        const tpScores = data.tpScores;

        if (tpScores.length > 0 || data.hasSts || data.hasSas) {
          const sumTp = tpScores.reduce((a: number, b: number) => a + b, 0);
          const avgTp = tpScores.length > 0 ? sumTp / tpScores.length : 0;

          const sts = data.hasSts ? data.sts : avgTp;
          const sas = data.hasSas ? data.sas : avgTp;

          // Rumus Kemendikbud (2 : 1 : 1)
          const finalScore = (2 * avgTp + 1 * sts + 1 * sas) / 4;

          scoreRecords.push({
            subjectName,
            type: catType,
            score: Math.round(finalScore),
          });
        }
      });
    });

    // Hitung rata-rata keseluruhan untuk nilai rapor utama
    let totalScore = 0;
    scoreRecords.forEach(r => totalScore += r.score);
    const averageScore = scoreRecords.length > 0 ? Number((totalScore / scoreRecords.length).toFixed(1)) : 0;

    const totalStudents = await prisma.student.count({ 
      where: { class_name: student.class_name } 
    }).catch(() => 1);

    const reportData = {
      ...student,
      scoreRecords,
      personality: student.personality ? [
        { arabic: 'السلوك', name: 'Kelakuan / Perilaku', value: (student.personality as any).suluk ?? '-' },
        { arabic: 'المواظبة', name: 'Kerajinan / Kehadiran', value: (student.personality as any).muwadhotah ?? '-' },
        { arabic: 'النظافة', name: 'Kebersihan', value: (student.personality as any).nadzofah ?? '-' },
        { arabic: 'الانضباط', name: 'Disiplin', value: (student.personality as any).indhiplat ?? '-' },
      ] : [],
      homeroomNote: (student.homeroomNote as any)?.note || '',
      attendance: { sakit, izin, alpa },
      averageScore,
      totalStudents,
      rank: 1,
    };

    return NextResponse.json({ report: reportData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ message: 'Gagal memuat data rapor dari server' }, { status: 500 });
  }
84260afdc3a0fed449a3e6a2d590b9872eb609f2
}