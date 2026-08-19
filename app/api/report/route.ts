import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentIdParam = searchParams.get('studentId');

    if (!studentIdParam) {
      return NextResponse.json({ message: 'ID Santri wajib disertakan' }, { status: 400 });
    }

    const studentId = Number(studentIdParam);

    // Ambil data santri beserta relasi lengkapnya
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        scoreRecords: {
          include: { subject: true },
        },
        personality: true,
        homeroomNote: true,
        attendances: true,
      },
    });

    if (!student) {
      return NextResponse.json({ message: 'Santri tidak ditemukan' }, { status: 404 });
    }

    // Hitung rekap kehadiran dari tabel Attendance
    let sakit = 0, izin = 0, alpa = 0;
    student.attendances.forEach(att => {
      if (att.status === 'SAKIT') sakit++;
      else if (att.status === 'IZIN') izin++;
      else if (att.status === 'ALPA') alpa++;
    });

    // Hitung rata-rata nilai angka untuk ringkasan
    let totalScore = 0;
    let countScore = 0;
    student.scoreRecords.forEach(sc => {
      if (sc.scoreNumber > 0) {
        totalScore += sc.scoreNumber;
        countScore++;
      }
    });
    const averageScore = countScore > 0 ? Number((totalScore / countScore).toFixed(1)) : 0;

    // Hitung jumlah total santri di kelas yang sama untuk ranking/jumlah siswa
    const totalStudentsInClass = await prisma.student.count({
      where: { class_name: student.class_name },
    });

    const reportData = {
      ...student,
      scoreRecords: student.scoreRecords,
      personality: student.personality ? [
        { arabic: 'السلوك', name: 'Kelakuan / Perilaku', value: student.personality.suluk },
        { arabic: 'المواظبة', name: 'Kerajinan / Kehadiran', value: student.personality.muwadhotah },
        { arabic: 'النظافة', name: 'Kebersihan', value: student.personality.nadzofah },
        { arabic: 'الانضباط', name: 'Disiplin', value: student.personality.indhiplat },
      ] : [],
      homeroomNote: student.homeroomNote?.note || '',
      attendance: { sakit, izin, alpa },
      averageScore,
      totalStudents: totalStudentsInClass,
      rank: 1, // Bisa disesuaikan dengan logic ranking jika sudah ada
    };

    return NextResponse.json({ report: reportData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ message: 'Gagal memuat data rapor' }, { status: 500 });
  }
}