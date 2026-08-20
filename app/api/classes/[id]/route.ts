import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/* ============================================================
   TYPE PARAMS
============================================================ */

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* ============================================================
   HELPER
============================================================ */

async function getClassId(context: RouteContext) {
  const { id } = await context.params;

  const classId = Number(id);

  if (!Number.isInteger(classId) || classId <= 0) {
    return null;
  }

  return classId;
}

/* ============================================================
   GET /api/classes/[id]
   Ambil satu kelas
============================================================ */

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const classId = await getClassId(context);

    if (!classId) {
      return NextResponse.json(
        {
          message: 'ID kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    const classRoom = await prisma.classRoom.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classRoom) {
      return NextResponse.json(
        {
          message: 'Kelas tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(classRoom, {
      status: 200,
    });
  } catch (error) {
    console.error('GET /api/classes/[id] ERROR:', error);

    return NextResponse.json(
      {
        message: 'Gagal memuat data kelas.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   PUT /api/classes/[id]
   Edit kelas
============================================================ */

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const classId = await getClassId(context);

    if (!classId) {
      return NextResponse.json(
        {
          message: 'ID kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK KELAS
    -------------------------------------------------------- */

    const existingClass = await prisma.classRoom.findUnique({
      where: {
        id: classId,
      },
    });

    if (!existingClass) {
      return NextResponse.json(
        {
          message: 'Kelas tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? '')
      .trim()
      .toUpperCase();

    const level = String(body.level ?? '')
      .trim()
      .toUpperCase();

    const grade = Number(body.grade);

    /* --------------------------------------------------------
       VALIDASI
    -------------------------------------------------------- */

    if (!name) {
      return NextResponse.json(
        {
          message: 'Nama kelas wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    if (!['SMP', 'SMA'].includes(level)) {
      return NextResponse.json(
        {
          message: 'Jenjang hanya boleh SMP atau SMA.',
        },
        {
          status: 400,
        }
      );
    }

    if (!Number.isInteger(grade)) {
      return NextResponse.json(
        {
          message: 'Tingkat kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       VALIDASI JENJANG
       
       SMP = 7, 8, 9
       SMA = 10, 11, 12
    -------------------------------------------------------- */

    if (
      (level === 'SMP' && ![7, 8, 9].includes(grade)) ||
      (level === 'SMA' && ![10, 11, 12].includes(grade))
    ) {
      return NextResponse.json(
        {
          message:
            level === 'SMP'
              ? 'Jenjang SMP hanya dapat menggunakan tingkat 7, 8, atau 9.'
              : 'Jenjang SMA hanya dapat menggunakan tingkat 10, 11, atau 12.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK DUPLIKAT NAMA

       Abaikan kelas yang sedang diedit.
    -------------------------------------------------------- */

    const duplicate = await prisma.classRoom.findFirst({
      where: {
        name,
        NOT: {
          id: classId,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        {
          message: `Kelas ${name} sudah digunakan.`,
        },
        {
          status: 409,
        }
      );
    }

    /* --------------------------------------------------------
       UPDATE
    -------------------------------------------------------- */

    const updatedClass = await prisma.classRoom.update({
      where: {
        id: classId,
      },
      data: {
        name,
        level,
        grade,
      },
    });

    return NextResponse.json(
      {
        message: 'Kelas berhasil diperbarui.',
        data: updatedClass,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('PUT /api/classes/[id] ERROR:', error);

    return NextResponse.json(
      {
        message: 'Gagal memperbarui kelas.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   DELETE /api/classes/[id]
   Hapus satu kelas
============================================================ */

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const classId = await getClassId(context);

    if (!classId) {
      return NextResponse.json(
        {
          message: 'ID kelas tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       CEK KELAS
    -------------------------------------------------------- */

    const existingClass = await prisma.classRoom.findUnique({
      where: {
        id: classId,
      },
    });

    if (!existingClass) {
      return NextResponse.json(
        {
          message: 'Kelas tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    /* --------------------------------------------------------
       DELETE
    -------------------------------------------------------- */

    await prisma.classRoom.delete({
      where: {
        id: classId,
      },
    });

    return NextResponse.json(
      {
        message: `Kelas ${existingClass.name} berhasil dihapus.`,
        deleted: existingClass,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('DELETE /api/classes/[id] ERROR:', error);

    /*
      Jika kelas masih dipakai tabel lain dan FK tidak
      menggunakan Cascade, jangan biarkan server crash.
    */

    if (error?.code === 'P2003') {
      return NextResponse.json(
        {
          message:
            'Kelas tidak dapat dihapus karena masih digunakan oleh data lain.',
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Gagal menghapus kelas.',
      },
      {
        status: 500,
      }
    );
  }
}