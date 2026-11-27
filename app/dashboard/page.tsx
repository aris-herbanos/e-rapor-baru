'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Users,
  FileText,
  ArrowRight,
  X,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

const menus = [
  {
    title: 'Data Guru & Ustadz',
    description: 'Kelola data pengajar dan akun pengguna.',
    href: '/dashboard/teachers',
    icon: Users,
  },
  {
    title: 'Mata Pelajaran',
    description: 'Kelola mata pelajaran dan pengampu.',
    href: '/dashboard/subjects',
    icon: BookOpen,
  },
  {
    title: 'Kurikulum',
    description: 'Kelola CP dan TP pembelajaran.',
    href: '/dashboard/curriculum',
    icon: FileText,
  },
  {
    title: 'Input Asesmen',
    description: 'Masukkan nilai formatif dan sumatif.',
    href: '/dashboard/assessment',
    icon: ClipboardCheck,
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForbidden, setShowForbidden] = useState(false);
  const [dismissWelcome, setDismissWelcome] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'forbidden') {
      setShowForbidden(true);
    }
  }, [searchParams]);

  const closeForbidden = () => {
    setShowForbidden(false);
    router.replace('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* ==================== WELCOME PANEL (WordPress Style) ==================== */}
      {!dismissWelcome && (
        <div className="relative overflow-hidden rounded-lg border border-[#c3c4c7] bg-white shadow-sm">
          <div className="bg-[#1d2327] px-6 py-8 text-white">
            <button
              onClick={() => setDismissWelcome(true)}
              className="absolute right-4 top-4 rounded p-1 hover:bg-white/10"
            >
              <X size={18} />
            </button>

            <h1 className="text-2xl font-semibold">Selamat Datang di E-Rapor!</h1>
            <p className="mt-2 text-sm text-gray-300">
              Pondok Pesantren Terpadu Ulil Albab
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-[#1d2327]">Kelola Data Akademik</h3>
              <p className="mt-1 text-sm text-[#646970]">
                Gunakan menu di bawah untuk mengelola guru, kurikulum, asesmen, dan rapor santri.
              </p>
              <Link
                href="/dashboard/teachers"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2271b1] hover:underline"
              >
                Mulai dari sini
                <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-[#1d2327]">Akses Cepat</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#2271b1]">
                <li><Link href="/dashboard/students" className="hover:underline">Data Santri</Link></li>
                <li><Link href="/dashboard/attendance" className="hover:underline">Kehadiran</Link></li>
                <li><Link href="/dashboard/report" className="hover:underline">Rapor Santri</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#1d2327]">Status Sistem</h3>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Sistem Aktif</span>
              </div>
              <p className="mt-2 text-xs text-[#646970]">
                Semua layanan berjalan normal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================== AT A GLANCE (Opsional) ==================== */}
      <div className="rounded-lg border border-[#c3c4c7] bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#1d2327]">At a Glance</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1d2327]">—</div>
            <div className="text-xs text-[#646970]">Guru</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1d2327]">—</div>
            <div className="text-xs text-[#646970]">Santri</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1d2327]">—</div>
            <div className="text-xs text-[#646970]">Kelas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1d2327]">—</div>
            <div className="text-xs text-[#646970]">Mata Pelajaran</div>
          </div>
        </div>
      </div>

      {/* ==================== AKSES CEPAT ==================== */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#1d2327]">Akses Cepat</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.title}
                href={menu.href}
                className="group rounded-lg border border-[#c3c4c7] bg-white p-5 shadow-sm transition hover:border-[#2271b1] hover:shadow"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-[#f0f0f1] text-[#2271b1]">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-[#1d2327] group-hover:text-[#2271b1]">
                  {menu.title}
                </h3>
                <p className="mt-1 text-sm text-[#646970]">{menu.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#2271b1]">
                  Buka
                  <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ==================== POPUP FORBIDDEN ==================== */}
      {showForbidden && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-[#c3c4c7] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#c3c4c7] px-6 py-4">
              <h3 className="font-semibold text-[#1d2327]">Akses Ditolak</h3>
              <button onClick={closeForbidden} className="text-[#646970] hover:text-[#1d2327]">
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <LockKeyhole size={28} className="text-red-600" />
              </div>
              <p className="text-sm text-[#646970]">
                Maaf, Anda tidak memiliki izin untuk mengakses halaman tersebut.
              </p>
              <p className="mt-2 text-xs text-[#646970]">
                Halaman ini hanya dapat diakses oleh Administrator.
              </p>
            </div>

            <div className="border-t border-[#c3c4c7] px-6 py-4 text-right">
              <button
                onClick={closeForbidden}
                className="rounded bg-[#2271b1] px-4 py-2 text-sm font-medium text-white hover:bg-[#135e96]"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6">Memuat dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}