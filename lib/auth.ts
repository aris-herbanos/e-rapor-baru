import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export type AuthUser = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    if (!JWT_SECRET) {
      console.error('JWT_SECRET belum tersedia.');
      return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (
      !decoded ||
      !decoded.id ||
      !decoded.role
    ) {
      return null;
    }

    return {
      id: Number(decoded.id),
      identity_number: String(
        decoded.identity_number ?? ''
      ),
      fullname: String(
        decoded.fullname ?? ''
      ),
      role: String(
        decoded.role
      ).toUpperCase(),
    };
  } catch (error) {
    console.error('AUTH ERROR:', error);
    return null;
  }
}

/**
 * Memastikan user sudah login.
 */
export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    return {
      authorized: false as const,
      user: null,
      status: 401,
      message: 'Anda belum login atau sesi telah berakhir.',
    };
  }

  return {
    authorized: true as const,
    user,
    status: 200,
    message: 'Authorized',
  };
}

/**
 * Memastikan user adalah ADMIN.
 */
export async function requireAdmin() {
  const user = await getAuthUser();

  if (!user) {
    return {
      authorized: false as const,
      user: null,
      status: 401,
      message: 'Anda belum login atau sesi telah berakhir.',
    };
  }

  if (user.role !== 'ADMIN') {
    return {
      authorized: false as const,
      user,
      status: 403,
      message: 'Akses ditolak. Halaman ini hanya dapat diakses oleh Administrator.',
    };
  }

  return {
    authorized: true as const,
    user,
    status: 200,
    message: 'Authorized',
  };
}