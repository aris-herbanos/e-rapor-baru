'use client';

import Link from 'next/link';

import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Users,
  ArrowRight,
  FileText,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

const menus = [
  {
    title: 'Data Guru & Ustadz',
    description: 'Kelola data pengajar dan akun pengguna.',
    href: '/dashboard/teachers',
    icon: Users,
    color: 'emerald',
  },
  {
    title: 'Mata Pelajaran',
    description: 'Kelola mata pelajaran dan pengampu.',
    href: '/dashboard/subjects',
    icon: BookOpen,
    color: 'blue',
  },
  {
    title: 'Kurikulum',
    description: 'Kelola CP dan TP pembelajaran.',
    href: '/dashboard/curriculum',
    icon: FileText,
    color: 'amber',
  },
  {
    title: 'Input Asesmen',
    description: 'Masukkan nilai formatif dan sumatif.',
    href: '/dashboard/assessment',
    icon: ClipboardCheck,
    color: 'violet',
  },
];

const colorMap: Record<string, string> = {
  emerald:
    'bg-emerald-50 text-emerald-700 ring-emerald-100',
  blue:
    'bg-blue-50 text-blue-700 ring-blue-100',
  amber:
    'bg-amber-50 text-amber-700 ring-amber-100',
  violet:
    'bg-violet-50 text-violet-700 ring-violet-100',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f5]">
      {/* =========================================================
          HEADER / HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#064e3b]">
        {/* Dekorasi Islami */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border-[32px] border-white" />
          <div className="absolute -right-8 top-8 h-64 w-64 rounded-full border-[18px] border-white" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[30px] border-emerald-200" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            {/* BRAND */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                <GraduationCap
                  size={28}
                  strokeWidth={1.8}
                  className="text-emerald-100"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                    Sistem Informasi Akademik
                  </span>

                  <Sparkles
                    size={13}
                    className="text-amber-300"
                  />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  E-Rapor
                </h1>

                <p className="mt-1 text-sm text-emerald-100/80">
                  Pondok Pesantren Terpadu Ulil Albab
                </p>
              </div>
            </div>

            {/* ARABIC */}
            <div className="hidden text-right lg:block">
              <div
                dir="rtl"
                className="font-serif text-xl font-semibold text-amber-200"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </div>

              <p className="mt-1 text-xs text-emerald-100/70">
                Berilmu, Berakhlak, dan Berprestasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <section className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:py-9">
        {/* WELCOME */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />

              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Dashboard
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-800">
              Selamat Datang 👋
            </h2>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
              Kelola data akademik, kurikulum, asesmen, dan
              rapor santri dalam satu sistem yang terintegrasi.
            </p>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3.5 py-2.5 shadow-sm">
            <ShieldCheck
              size={17}
              className="text-emerald-600"
            />

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Status Sistem
              </p>

              <p className="text-xs font-semibold text-emerald-700">
                Sistem Aktif
              </p>
            </div>

            <span className="ml-1 h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* =======================================================
            QUICK INTRO
        ======================================================== */}
        <div className="mb-7 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <GraduationCap size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  Pusat Pengelolaan Akademik
                </h3>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                  Gunakan menu di bawah untuk mengelola data
                  guru, mata pelajaran, kurikulum, hingga
                  penilaian santri.
                </p>
              </div>
            </div>

            <div
              dir="rtl"
              className="font-serif text-lg font-semibold text-emerald-700"
            >
              وَقُلْ رَبِّ زِدْنِي عِلْمًا
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-emerald-700 via-emerald-500 to-amber-400" />
        </div>

        {/* =======================================================
            AKSES CEPAT
        ======================================================== */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">
            Akses Cepat
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Pilih modul yang ingin Anda kelola.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.title}
                href={menu.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                {/* Accent */}
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-emerald-600 to-amber-400 opacity-0 transition group-hover:opacity-100" />

                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${colorMap[menu.color]}`}
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.8}
                    />
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600"
                  />
                </div>

                <h4 className="text-sm font-bold text-slate-800">
                  {menu.title}
                </h4>

                <p className="mt-1.5 min-h-[40px] text-xs leading-5 text-slate-500">
                  {menu.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  Buka Modul
                  <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* =======================================================
            FOOTER INFO
        ======================================================== */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600">
              Pondok Pesantren Terpadu Ulil Albab
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Sistem E-Rapor & Manajemen Akademik
            </p>
          </div>

          <div
            dir="rtl"
            className="font-serif text-sm text-slate-400"
          >
            رَبِّ زِدْنِي عِلْمًا
          </div>
        </div>
      </section>
    </main>
  );
}