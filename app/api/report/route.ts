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

    // 1. Kehadiran
    let sakit = 0, izin = 0, alpa = 0;
    student.attendances.forEach((att: any) => {
      const status = String(att.status || '').trim().toUpperCase();
      if (status === 'SAKIT') sakit++;
      else if (status === 'IZIN') izin++;
      else if (status === 'ALPA') alpa++;
    });

    // 2. KELOMPOKKAN NILAI BERDASARKAN MAPEL & KATEGORI (ORAL / WRITTEN / STS / SAS)
    const subjectMap: Record<string, any> = {};

    student.assessments.forEach((ass: any) => {
      const subjName = ass.tp?.cp?.subject?.name || ass.subject?.name || 'Mata Pelajaran Umum';
      const type = String(ass.type || '').trim().toUpperCase(); // 'ORAL', 'WRITTEN', 'STS', 'SAS'

      if (!subjectMap[subjName]) {
        subjectMap[subjName] = {
          ORAL: { tpScores: [], sts: 0, sas: 0, hasSts: false, hasSas: false },
          WRITTEN: { tpScores: [], sts: 0, sas: 0, hasSts: false, hasSas: false },
        };
      }

      if (type === 'ORAL' || type === 'WRITTEN') {
        if (ass.tpId) {
          subjectMap[subjName][type].tpScores.push(Number(ass.score) || 0);
        }
      } else if (type === 'STS') {
        subjectMap[subjName].WRITTEN.sts = Number(ass.score) || 0;
        subjectMap[subjName].WRITTEN.hasSts = true;
        subjectMap[subjName].ORAL.sts = Number(ass.score) || 0;
        subjectMap[subjName].ORAL.hasSts = true;
      } else if (type === 'SAS') {
        subjectMap[subjName].WRITTEN.sas = Number(ass.score) || 0;
        subjectMap[subjName].WRITTEN.hasSas = true;
        subjectMap[subjName].ORAL.sas = Number(ass.score) || 0;
        subjectMap[subjName].ORAL.hasSas = true;
      }
    });

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

    const reportData = {
      ...student,
      scoreRecords,
      personality: student.personality ? [
        { arabic: 'السلوك', name: 'Kelakuan / Perilaku', value: student.personality.suluk },
        { arabic: 'المواظبة', name: 'Kerajinan / Kehadiran', value: student.personality.muwadhotah },
        { arabic: 'النظافة', name: 'Kebersihan', value: student.personality.nadzofah },
        { arabic: 'الانضباط', name: 'Disiplin', value: student.personality.indhiplat },
      ] : [],
      homeroomNote: student.homeroomNote?.note || '',
      attendance: { sakit, izin, alpa },
      averageScore,
      totalStudents: await prisma.student.count({ where: { class_name: student.class_name } }),
      rank: 1,
    };

    return NextResponse.json({ report: reportData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ message: 'Gagal memuat data rapor' }, { status: 500 });
  }
}