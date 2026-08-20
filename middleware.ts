import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/*
|--------------------------------------------------------------------------
| JWT SECRET
|--------------------------------------------------------------------------
*/

const JWT_SECRET = process.env.JWT_SECRET;

/*
|--------------------------------------------------------------------------
| HALAMAN YANG HANYA BOLEH DIAKSES ADMIN
|--------------------------------------------------------------------------
*/

const ADMIN_ONLY_ROUTES = [
  '/dashboard/teachers',
  '/dashboard/assignments',
  '/dashboard/settings',
  '/dashboard/subjects',
  '/dashboard/classes',
  '/dashboard/promotions',
];

/*
|--------------------------------------------------------------------------
| CEK ROUTE ADMIN
|--------------------------------------------------------------------------
*/

function isAdminOnlyRoute(pathname: string): boolean {
  return ADMIN_ONLY_ROUTES.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
}

/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

export async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  /*
  |--------------------------------------------------------------------------
  | Hanya proteksi area dashboard
  |--------------------------------------------------------------------------
  */

  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  /*
  |--------------------------------------------------------------------------
  | Ambil JWT dari cookie
  |--------------------------------------------------------------------------
  */

  const token =
    request.cookies.get('token')?.value;

  /*
  |--------------------------------------------------------------------------
  | BELUM LOGIN
  |--------------------------------------------------------------------------
  */

  if (!token) {
    const loginUrl = new URL(
      '/login',
      request.url
    );

    loginUrl.searchParams.set(
      'callbackUrl',
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  /*
  |--------------------------------------------------------------------------
  | JWT SECRET
  |--------------------------------------------------------------------------
  */

  if (!JWT_SECRET) {
    console.error(
      'JWT_SECRET belum tersedia di environment.'
    );

    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  try {
    /*
    |--------------------------------------------------------------------------
    | VERIFIKASI JWT
    |--------------------------------------------------------------------------
    */

    const secret = new TextEncoder().encode(
      JWT_SECRET
    );

    const { payload } =
      await jwtVerify(token, secret);

    /*
    |--------------------------------------------------------------------------
    | AMBIL ROLE
    |--------------------------------------------------------------------------
    |
    | Database:
    |
    | ADMIN
    | TEACHER
    |
    */

    const role = String(
      payload.role ?? ''
    )
      .trim()
      .toUpperCase();

    /*
    |--------------------------------------------------------------------------
    | VALIDASI ROLE
    |--------------------------------------------------------------------------
    */

    const isAdmin = role === 'ADMIN';
    const isTeacher = role === 'TEACHER';

    /*
    |--------------------------------------------------------------------------
    | ROLE TIDAK DIKENAL
    |--------------------------------------------------------------------------
    */

    if (!isAdmin && !isTeacher) {
      console.warn(
        `Role tidak dikenal: ${role}`
      );

      const dashboardUrl =
        new URL(
          '/dashboard',
          request.url
        );

      dashboardUrl.searchParams.set(
        'error',
        'invalid-role'
      );

      return NextResponse.redirect(
        dashboardUrl
      );
    }

    /*
    |--------------------------------------------------------------------------
    | PROTEKSI HALAMAN ADMIN
    |--------------------------------------------------------------------------
    */

    if (
      isAdminOnlyRoute(pathname) &&
      !isAdmin
    ) {
      /*
      |--------------------------------------------------------------------------
      | TEACHER MENCOBA MASUK KE HALAMAN ADMIN
      |--------------------------------------------------------------------------
      */

      const dashboardUrl =
        new URL(
          '/dashboard',
          request.url
        );

      dashboardUrl.searchParams.set(
        'error',
        'forbidden'
      );

      return NextResponse.redirect(
        dashboardUrl
      );
    }

    /*
    |--------------------------------------------------------------------------
    | SEMUA AMAN
    |--------------------------------------------------------------------------
    */

    return NextResponse.next();

  } catch (error) {
    /*
    |--------------------------------------------------------------------------
    | TOKEN INVALID / EXPIRED
    |--------------------------------------------------------------------------
    */

    console.error(
      'JWT verification error:',
      error
    );

    const loginUrl =
      new URL(
        '/login',
        request.url
      );

    loginUrl.searchParams.set(
      'error',
      'session-expired'
    );

    const response =
      NextResponse.redirect(
        loginUrl
      );

    /*
    |--------------------------------------------------------------------------
    | HAPUS TOKEN YANG TIDAK VALID
    |--------------------------------------------------------------------------
    */

    response.cookies.delete('token');

    return response;
  }
}

/*
|--------------------------------------------------------------------------
| MATCHER
|--------------------------------------------------------------------------
|
| Middleware hanya berjalan untuk /dashboard
|
*/

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};