import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| Mengambil data kehadiran dengan opsi filter kelas, tanggal mulai, & tanggal selesai.
*/
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Membangun kondisi where dinamis
    const whereCondition: any = {};

    if (className && className !== 'SEMUA') {
      whereCondition.className = className;
    }

    // Filter berdasarkan rentang tanggal jika ada
    if (startDate || endDate) {
      whereCondition.date = {};
      if (startDate) {
        whereCondition.date.gte = new Date(startDate);
      }
      if (endDate) {
        // Set ke akhir hari agar mencakup data di tanggal tersebut
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereCondition.date.lte = end;
      }
    }

    const attendances = await prisma.attendance.findMany({
      where: whereCondition,
      include: {
        student: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: attendances }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal memuat data kehadiran.',
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
| Menambahkan / memperbarui kehadiran santri (tunggal atau massal).
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const items = Array.isArray(body) ? body : [body];
    const results = [];

    for (const item of items) {
      const studentId = Number(item?.studentId);
      const status = String(item?.status || '').trim().toUpperCase();
      const rawDate = item?.date ? new Date(item.date) : new Date();

      if (!studentId || Number.isNaN(studentId)) {
        continue;
      }

      const validStatuses = ['HADIR', 'SAKIT', 'IZIN', 'ALPA'];
      if (!validStatuses.includes(status)) {
        continue;
      }

      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        continue;
      }

      // Normalisasi tanggal untuk pencarian (mulai hari)
      const targetDateStart = new Date(rawDate);
      targetDateStart.setHours(0, 0, 0, 0);

      const targetDateEnd = new Date(targetDateStart);
      targetDateEnd.setDate(targetDateEnd.getDate() + 1);

      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          studentId,
          date: {
            gte: targetDateStart,
            lt: targetDateEnd,
          },
        },
      });

      let attendanceRecord;

      if (existingAttendance) {
        attendanceRecord = await prisma.attendance.update({
          where: { id: existingAttendance.id },
          data: {
            status,
            date: targetDateStart,
            className: student.class_name || '',
          },
          include: { student: true },
        });
      } else {
        attendanceRecord = await prisma.attendance.create({
          data: {
            studentId,
            status,
            date: targetDateStart,
            className: student.class_name || '',
            day: '', // Bisa diisi dengan logic hari jika diperlukan
          },
          include: { student: true },
        });
      }

      results.push(attendanceRecord);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Kehadiran berhasil disimpan.',
        data: results,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error('Error saving attendance:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menyimpan kehadiran.',
      },
      {
        status: 500,
      }
    );
  }
}