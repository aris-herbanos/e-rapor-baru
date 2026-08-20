import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Menggunakan instance prisma terpusat
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    // =========================================================
    // CEK JWT SECRET
    // =========================================================

    if (!JWT_SECRET) {
      console.error('JWT_SECRET belum diset di environment.');

      return NextResponse.json(
        {
          message: 'Konfigurasi server belum lengkap: JWT_SECRET belum tersedia.',
        },
        { status: 500 }
      );
    }

    // =========================================================
    // AMBIL DATA REQUEST
    // =========================================================

    const body = await request.json();

    const identity_number = String(
      body.identity_number ?? ''
    ).trim();

    const password = String(
      body.password ?? ''
    );

    if (!identity_number || !password) {
      return NextResponse.json(
        {
          message: 'NIP dan Password wajib diisi!',
        },
        { status: 400 }
      );
    }

    // =========================================================
    // CARI USER
    // =========================================================

    const user = await prisma.teacher.findUnique({
      where: {
        identity_number,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'NIP / Nomor identitas tidak ditemukan.',
        },
        { status: 401 }
      );
    }

    // =========================================================
    // CEK PASSWORD
    // =========================================================

    if (!user.password) {
      console.error(
        `User ${identity_number} tidak memiliki password.`
      );

      return NextResponse.json(
        {
          message: 'Akun belum memiliki password.',
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: 'Password yang Anda masukkan salah.',
        },
        { status: 401 }
      );
    }

    // =========================================================
    // BUAT JWT
    // =========================================================

    const token = jwt.sign(
      {
        id: user.id,
        identity_number: user.identity_number,
        role: user.role,
        fullname: user.fullname,
      },
      JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    // =========================================================
    // RESPONSE
    // =========================================================

    const response = NextResponse.json(
      {
        message: 'Login berhasil.',
        role: user.role,
        user: {
          id: user.id,
          fullname: user.fullname,
          identity_number: user.identity_number,
          role: user.role,
        },
      },
      {
        status: 200,
      }
    );

    // =========================================================
    // COOKIE
    // =========================================================

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error) {
    console.error('LOGIN ERROR:', error);

    return NextResponse.json(
      {
        message: 'Terjadi kesalahan pada server saat login.',
      },
      {
        status: 500,
      }
    );
  }
}