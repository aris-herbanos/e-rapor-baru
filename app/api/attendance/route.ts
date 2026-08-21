import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
| Mengambil seluruh riwayat kehadiran.
| Data diurutkan dari yang terbaru.
*/
export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        student: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(attendances, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);

    return NextResponse.json(
      {
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
| Menambahkan / memperbarui kehadiran santri.
| Mendukung penyimpanan tunggal maupun massal (sekaligus satu kelas).
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Cek apakah request berupa penyimpanan massal (array) atau tunggal
    const items = Array.isArray(body) ? body : [body];
    const results = [];

    for (const item of items) {
      const studentId = Number(item?.studentId);
      const status = String(item?.status || '').trim().toUpperCase();
      const rawDate = item?.date ? new Date(item.date) : new Date();

      if (!studentId || Number.isNaN(studentId)) {
        continue; // Lewati jika ID tidak valid
      }

      const validStatuses = ['HADIR', 'SAKIT', 'IZIN', 'ALPA'];
      if (!validStatuses.includes(status)) {
        continue; // Lewati jika status tidak valid
      }

      const student = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!student) {
        continue; // Lewati jika santri tidak ditemukan
      }

      // Rentang waktu tanggal absensi
      const targetDateStart = new Date(rawDate);
      targetDateStart.setHours(0, 0, 0, 0);

      const targetDateEnd = new Date(targetDateStart);
      targetDateEnd.setDate(targetDateEnd.getDate() + 1);

      // Cek apakah sudah ada catatan di tanggal tersebut
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
        // Update jika sudah ada
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
        // Create jika belum ada
        attendanceRecord = await prisma.attendance.create({
          data: {
            studentId,
            status,
            date: targetDateStart,
            className: student.class_name || '',
            day: '',
          },
          include: { student: true },
        });
      }

      results.push(attendanceRecord);
    }

    return NextResponse.json(
      {
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
        message: 'Gagal menyimpan kehadiran.',
      },
      {
        status: 500,
      }
    );
  }
}