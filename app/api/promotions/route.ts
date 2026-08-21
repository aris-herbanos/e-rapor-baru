import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

/* ============================================================
   KONFIGURASI JWT
============================================================ */

const JWT_SECRET = process.env.JWT_SECRET;

/* ============================================================
   TYPE JWT PAYLOAD
============================================================ */

type JwtPayload = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

/* ============================================================
   HELPER: VERIFIKASI ADMIN
============================================================ */

function verifyAdmin(request: Request) {
  if (!JWT_SECRET) {
    console.error(
      'JWT_SECRET belum tersedia di environment.'
    );

    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Konfigurasi server belum lengkap.',
        },
        {
          status: 500,
        }
      ),
    };
  }

  const cookieHeader =
    request.headers.get('cookie') || '';

  const tokenMatch = cookieHeader.match(
    /(?:^|;\s*)token=([^;]+)/
  );

  const token = tokenMatch
    ? decodeURIComponent(tokenMatch[1])
    : null;

  if (!token) {
    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Anda belum login. Silakan login terlebih dahulu.',
        },
        {
          status: 401,
        }
      ),
    };
  }

  try {
    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      ) as JwtPayload;

    if (
      !decoded ||
      String(decoded.role).toUpperCase() !==
        'ADMIN'
    ) {
      return {
        success: false as const,
        response: NextResponse.json(
          {
            success: false,
            message:
              'Akses ditolak. Fitur kenaikan kelas hanya dapat digunakan oleh Administrator.',
          },
          {
            status: 403,
          }
        ),
      };
    }

    return {
      success: true as const,
      user: decoded,
    };
  } catch (error) {
    console.error(
      'JWT verification error:',
      error
    );

    return {
      success: false as const,
      response: NextResponse.json(
        {
          success: false,
          message:
            'Sesi login tidak valid atau sudah kedaluwarsa. Silakan login kembali.',
        },
        {
          status: 401,
        }
      ),
    };
  }
}

/* ============================================================
   GET /api/promotions
   Menampilkan daftar siswa berdasarkan kelas.
============================================================ */

export async function GET(
  request: Request
) {
  const auth = verifyAdmin(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const { searchParams } =
      new URL(request.url);

    const className =
      searchParams
        .get('className')
        ?.trim() || '';

    if (!className) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Parameter className wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    const students =
      await prisma.student.findMany({
        where: {
          class_name: className,
        },

        orderBy: {
          fullname: 'asc',
        },

        select: {
          id: true,
          nisn: true,
          fullname: true,
          gender: true,
          class_name: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: students,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      'GET /api/promotions ERROR:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal mengambil data siswa.',
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST /api/promotions
   Memproses kenaikan, tinggal kelas, atau kelulusan secara massal.
============================================================ */

export async function POST(
  request: Request
) {
  const auth = verifyAdmin(request);

  if (!auth.success) {
    return auth.response;
  }

  try {
    const body = await request.json();

    const studentIds =
      Array.isArray(body.studentIds)
        ? body.studentIds
            .map((id: unknown) =>
              Number(id)
            )
            .filter((id: number) =>
              Number.isInteger(id) &&
              id > 0
            )
        : [];

    const toClass =
      typeof body.toClass === 'string'
        ? body.toClass
            .trim()
            .toUpperCase()
        : '';

    const status =
      typeof body.status === 'string'
        ? body.status
            .trim()
            .toUpperCase()
        : 'NAIK';

    const academicYear =
      typeof body.academicYear === 'string'
        ? body.academicYear.trim()
        : '2026/2027';

    const note =
      typeof body.note === 'string'
        ? body.note.trim()
        : '';

    if (studentIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Pilih minimal satu siswa.',
        },
        {
          status: 400,
        }
      );
    }

    // Jika status NAIK atau LULUS dan memilih lanjut ke kelas baru, toClass wajib diisi
    if ((status === 'NAIK' || status === 'LULUS') && !toClass) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Kelas tujuan wajib dipilih.',
        },
        {
          status: 400,
        }
      );
    }

    if (
      !['NAIK', 'TINGGAL', 'LULUS'].includes(
        status
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Status keputusan tidak valid.',
        },
        {
          status: 400,
        }
      );
    }

    if (!academicYear) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Tahun ajaran wajib diisi.',
        },
        {
          status: 400,
        }
      );
    }

    // Cek keberadaan kelas tujuan jika NAIK atau LULUS ke kelas baru
    if ((status === 'NAIK' || status === 'LULUS') && toClass) {
      const targetClass =
        await prisma.classRoom.findFirst({
          where: {
            name: toClass,
          },
        });

      if (!targetClass) {
        return NextResponse.json(
          {
            success: false,
            message:
              `Kelas tujuan ${toClass} tidak ditemukan dalam data kelas.`,
          },
          {
            status: 404,
          }
        );
      }
    }

    const students =
      await prisma.student.findMany({
        where: {
          id: {
            in: studentIds,
          },
        },

        select: {
          id: true,
          fullname: true,
          class_name: true,
        },
      });

    if (students.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Data siswa tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    if (
      students.length !==
      studentIds.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Sebagian data siswa tidak ditemukan. Silakan muat ulang halaman dan coba lagi.',
        },
        {
          status: 404,
        }
      );
    }

    /* ========================================================
       TRANSACTION
    ======================================================== */

    const result =
      await prisma.$transaction(
        async (tx) => {
          const promotions = [];

          for (
            const student of students
          ) {
            const fromClass =
              student.class_name;

            // Tentukan kelas akhir berdasarkan status
            let finalToClass = fromClass;
            if (status === 'NAIK') {
              finalToClass = toClass;
            } else if (status === 'LULUS') {
              // Jika lulus dan memilih kelas tujuan (misal lanjut ke SMA), update kelasnya
              finalToClass = toClass || 'LULUS';
            }

            // Update data kelas siswa jika NAIK atau LULUS ke kelas baru
            if (
              status === 'NAIK' ||
              (status === 'LULUS' && toClass)
            ) {
              await tx.student.update({
                where: {
                  id: student.id,
                },

                data: {
                  class_name: finalToClass,
                },
              });
            }

            const promotion =
              await tx.studentPromotion.upsert(
                {
                  where: {
                    studentId_academicYear:
                      {
                        studentId:
                          student.id,

                        academicYear,
                      },
                  },

                  update: {
                    fromClass,

                    toClass:
                      finalToClass,

                    status,

                    note:
                      note || null,

                    promotedAt:
                      new Date(),
                  },

                  create: {
                    studentId:
                      student.id,

                    academicYear,

                    fromClass,

                    toClass:
                      finalToClass,

                    status,

                    note:
                      note || null,
                  },
                }
              );

            promotions.push(
              promotion
            );
          }

          return promotions;
        }
      );

    return NextResponse.json(
      {
        success: true,

        message:
          status === 'NAIK'
            ? `${result.length} siswa berhasil dinaikkan ke kelas ${toClass}.`
            : status === 'LULUS'
            ? `${result.length} siswa berhasil diluluskan${toClass ? ` dan dipindahkan ke kelas ${toClass}` : ''}.`
            : `${result.length} siswa ditetapkan tetap di kelas masing-masing.`,

        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      'POST /api/promotions ERROR:',
      error
    );

    if (
      error?.code === 'P2025'
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Data siswa atau data kelulusan tidak ditemukan.',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'Gagal memproses data.',
      },
      {
        status: 500,
      }
    );
  }
}