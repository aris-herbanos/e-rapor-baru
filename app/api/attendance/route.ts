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
    console.error(
      'Error fetching attendance:',
      error
    );

    return NextResponse.json(
      {
        message:
          'Gagal memuat data kehadiran.',
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
| Menambahkan / memperbarui kehadiran santri berdasarkan tanggal.
|
| Jika santri sudah memiliki catatan pada tanggal tersebut,
| maka status akan diperbarui.
|
| Jika belum ada, maka dibuat catatan baru.
*/
export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const studentId = Number(
      body?.studentId
    );

    const status = String(
      body?.status || ''
    )
      .trim()
      .toUpperCase();

    // Menerima tanggal dari body request frontend, jika kosong fallback ke hari ini
    const rawDate = body?.date ? new Date(body.date) : new Date();


    /*
    |--------------------------------------------------------------------------
    | VALIDASI STUDENT ID
    |--------------------------------------------------------------------------
    */

    if (
      !studentId ||
      Number.isNaN(studentId)
    ) {
      return NextResponse.json(
        {
          message:
            'ID santri wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI STATUS
    |--------------------------------------------------------------------------
    */

    const validStatuses = [
      'HADIR',
      'SAKIT',
      'IZIN',
      'ALPA',
    ];

    if (
      !validStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          message:
            'Status kehadiran tidak valid.',
        },
        {
          status: 400,
        }
      );
    }


    /*
    |--------------------------------------------------------------------------
    | CEK SANTRI
    |--------------------------------------------------------------------------
    */

    const student =
      await prisma.student.findUnique({
        where: {
          id: studentId,
        },
      });

    if (!student) {
      return NextResponse.json(
        {
          message:
            'Data santri tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }


    /*
    |--------------------------------------------------------------------------
    | RENTANG WAKTU TANGGAL YANG DIPILIH
    |--------------------------------------------------------------------------
    */

    const targetDateStart =
      new Date(rawDate);

    targetDateStart.setHours(
      0,
      0,
      0,
      0
    );

    const targetDateEnd =
      new Date(targetDateStart);

    targetDateEnd.setDate(
      targetDateEnd.getDate() + 1
    );


    /*
    |--------------------------------------------------------------------------
    | CEK ABSENSI PADA TANGGAL TERSEBUT
    |--------------------------------------------------------------------------
    */

    const existingAttendance =
      await prisma.attendance.findFirst({
        where: {
          studentId,
          date: {
            gte: targetDateStart,
            lt: targetDateEnd,
          },
        },
        orderBy: {
          date: 'desc',
        },
      });


    /*
    |--------------------------------------------------------------------------
    | UPDATE JIKA SUDAH ADA
    |--------------------------------------------------------------------------
    */

    if (existingAttendance) {
      const updatedAttendance =
        await prisma.attendance.update({
          where: {
            id: existingAttendance.id,
          },

          data: {
            status,
            date: targetDateStart,
          },

          include: {
            student: true,
          },
        });

      return NextResponse.json(
        {
          message:
            'Kehadiran pada tanggal tersebut berhasil diperbarui.',
          data: updatedAttendance,
        },
        {
          status: 200,
        }
      );
    }


    /*
    |--------------------------------------------------------------------------
    | CREATE JIKA BELUM ADA
    |--------------------------------------------------------------------------
    */

    const newAttendance =
      await prisma.attendance.create({
        data: {
          studentId,
          status,
          date: targetDateStart,
          className: student.class_name || '',
          day: '',
        },

        include: {
          student: true,
        },
      });


    return NextResponse.json(
      {
        message:
          'Kehadiran berhasil dicatat.',
        data: newAttendance,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(
      'Error creating attendance:',
      error
    );

    return NextResponse.json(
      {
        message:
          'Gagal menyimpan kehadiran.',
      },
      {
        status: 500,
      }
    );
  }
}