'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Menu,
  X,
  School,
  UserCheck,
  CalendarCheck,
  Heart,
  MessageSquare,
  Award,
  Sparkles,
} from 'lucide-react';

/* ============================================================
   MENU
============================================================ */

const menus = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    category: 'Utama',
  },

  {
    title: 'Guru & Ustadz',
    href: '/dashboard/teachers',
    icon: Users,
    category: 'Data Master',
  },
  {
    title: 'Santri',
    href: '/dashboard/students',
    icon: GraduationCap,
    category: 'Data Master',
  },
  {
    title: 'Kelas',
    href: '/dashboard/classes',
    icon: School,
    category: 'Data Master',
  },
  {
    title: 'Mata Pelajaran',
    href: '/dashboard/subjects',
    icon: BookOpen,
    category: 'Data Master',
  },
  {
    title: 'Penugasan Guru',
    href: '/dashboard/assignments',
    icon: UserCheck,
    category: 'Data Master',
  },
  {
    title: 'Kurikulum (CP & TP)',
    href: '/dashboard/curriculum',
    icon: FileText,
    category: 'Data Master',
  },

  {
    title: 'Kehadiran',
    href: '/dashboard/attendance',
    icon: CalendarCheck,
    category: 'Akademik',
  },
  {
    title: 'Input Asesmen',
    href: '/dashboard/assessment',
    icon: ClipboardCheck,
    category: 'Akademik',
  },
  {
    title: 'Nilai',
    href: '/dashboard/nilai',
    icon: Award,
    category: 'Akademik',
  },
  {
    title: 'Kepribadian',
    href: '/dashboard/personality',
    icon: Heart,
    category: 'Akademik',
  },
  {
    title: 'Catatan Wali Kelas',
    href: '/dashboard/notes',
    icon: MessageSquare,
    category: 'Akademik',
  },

  {
    title: 'Rapor Santri',
    href: '/dashboard/report',
    icon: BarChart3,
    category: 'Rapor',
  },
];

const categories = [
  'Utama',
  'Data Master',
  'Akademik',
  'Rapor',
];

/* ============================================================
   COMPONENT
============================================================ */

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  /* ==========================================================
     ACTIVE MENU
  ========================================================== */

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }

    return pathname.startsWith(href);
  };

  /* ==========================================================
     CURRENT PAGE
  ========================================================== */

  const currentMenu =
    menus.find((menu) => isActive(menu.href))?.title ||
    (pathname.startsWith('/dashboard/settings')
      ? 'Pengaturan'
      : 'Dashboard');

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Gagal keluar dari sistem');
      }

      router.replace('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
      alert('Gagal keluar dari sistem. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-slate-800">

      {/* ======================================================
          MOBILE HEADER
      ======================================================= */}

      <header className="fixed inset-x-0 top-0 z-[60] flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 shadow-sm backdrop-blur-xl lg:hidden">

        <div className="flex items-center gap-3">

          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#063d31] text-white shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent" />

            <GraduationCap
              size={20}
              strokeWidth={1.7}
              className="relative"
            />
          </div>

          <div>
            <div className="text-sm font-bold tracking-tight text-slate-800">
              E-Rapor
            </div>

            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-700/60">
              Ulil Albab
            </div>
          </div>

        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          {mobileOpen ? (
            <X size={19} strokeWidth={1.8} />
          ) : (
            <Menu size={19} strokeWidth={1.8} />
          )}
        </button>

      </header>

      {/* ======================================================
          MOBILE OVERLAY
      ======================================================= */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ======================================================
          SIDEBAR
      ======================================================= */}

      <aside
        className={[
          'fixed left-0 top-0 z-50',
          'flex h-screen w-[258px] flex-col',
          'overflow-hidden',
          'bg-[#052f27]',
          'text-white',
          'shadow-[8px_0_30px_rgba(15,23,42,0.10)]',
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >

        {/* DECORATION */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.045] blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-300/[0.03] blur-3xl" />

          <div className="absolute left-1/2 top-[38%] h-48 w-48 -translate-x-1/2 rounded-full border border-white/[0.015]" />

        </div>

        {/* ====================================================
            BRAND
        ===================================================== */}

        <div className="relative shrink-0 border-b border-white/[0.07] px-5 pb-5 pt-5">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/10 bg-white/[0.055] shadow-inner">

              <div className="absolute inset-[5px] rounded-xl border border-amber-200/10" />

              <GraduationCap
                size={22}
                strokeWidth={1.6}
                className="relative text-emerald-200"
              />

            </div>

            <div className="min-w-0">

              <div className="text-[15px] font-semibold tracking-tight text-white">
                E-Rapor
              </div>

              <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-emerald-200/45">
                Sistem Akademik
              </div>

            </div>

          </div>

          {/* BASMALAH */}

          <div className="mt-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent" />

            <div
              dir="rtl"
              className="font-serif text-[11px] text-amber-200/65"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent" />

          </div>

          {/* SCHOOL */}

          <div className="mt-3 flex items-center gap-2 text-[9px] text-emerald-100/35">

            <Sparkles
              size={11}
              strokeWidth={1.6}
            />

            <span>
              Pondok Pesantren Terpadu Ulil Albab
            </span>

          </div>

        </div>

        {/* ====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="sidebar-scroll relative flex-1 overflow-y-auto px-3 py-5">

          {categories.map((category) => {

            const categoryMenus = menus.filter(
              (menu) => menu.category === category
            );

            if (categoryMenus.length === 0) {
              return null;
            }

            return (
              <div
                key={category}
                className="mb-6 last:mb-1"
              >

                {/* CATEGORY */}

                <div className="mb-2 flex items-center gap-2 px-2">

                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-200/30">
                    {category}
                  </span>

                  <div className="h-px flex-1 bg-white/[0.035]" />

                </div>

                {/* ITEMS */}

                <div className="space-y-1">

                  {categoryMenus.map((menu) => {

                    const Icon = menu.icon;
                    const active = isActive(menu.href);

                    return (
                      <Link
                        key={menu.href}
                        href={menu.href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          'group relative flex min-h-[42px] items-center gap-3',
                          'rounded-xl px-2.5',
                          'text-[12.5px]',
                          'transition-all duration-200',
                          active
                            ? 'bg-white/[0.075] text-white shadow-[0_4px_18px_rgba(0,0,0,0.08)]'
                            : 'text-emerald-50/50 hover:bg-white/[0.04] hover:text-emerald-50/80',
                        ].join(' ')}
                      >

                        {active && (
                          <span className="absolute bottom-2.5 left-0 top-2.5 w-[2px] rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500" />
                        )}

                        <span
                          className={[
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                            'transition-all duration-200',
                            active
                              ? 'bg-emerald-400/10 text-emerald-300'
                              : 'bg-white/[0.025] text-emerald-200/40 group-hover:bg-emerald-400/[0.06] group-hover:text-emerald-200/70',
                          ].join(' ')}
                        >
                          <Icon
                            size={16}
                            strokeWidth={1.65}
                          />
                        </span>

                        <span
                          className={[
                            'flex-1 truncate',
                            active
                              ? 'font-semibold'
                              : 'font-medium',
                          ].join(' ')}
                        >
                          {menu.title}
                        </span>

                        {active && (
                          <ChevronRight
                            size={13}
                            strokeWidth={1.5}
                            className="mr-0.5 text-emerald-300/50"
                          />
                        )}

                      </Link>
                    );
                  })}

                </div>

              </div>
            );
          })}

          {/* ==================================================
              SYSTEM
          =================================================== */}

          <div className="mt-7">

            <div className="mb-2 flex items-center gap-2 px-2">

              <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-200/30">
                Sistem
              </span>

              <div className="h-px flex-1 bg-white/[0.035]" />

            </div>

            <Link
              href="/dashboard/settings"
              onClick={() => setMobileOpen(false)}
              className={[
                'group relative flex min-h-[42px] items-center gap-3',
                'rounded-xl px-2.5',
                'text-[12.5px]',
                'transition-all duration-200',
                isActive('/dashboard/settings')
                  ? 'bg-white/[0.075] text-white'
                  : 'text-emerald-50/50 hover:bg-white/[0.04] hover:text-emerald-50/80',
              ].join(' ')}
            >

              {isActive('/dashboard/settings') && (
                <span className="absolute bottom-2.5 left-0 top-2.5 w-[2px] rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500" />
              )}

              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-lg',
                  isActive('/dashboard/settings')
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-white/[0.025] text-emerald-200/40',
                ].join(' ')}
              >
                <Settings
                  size={16}
                  strokeWidth={1.65}
                />
              </span>

              <span
                className={
                  isActive('/dashboard/settings')
                    ? 'font-semibold'
                    : 'font-medium'
                }
              >
                Pengaturan
              </span>

            </Link>

          </div>

        </nav>

        {/* ====================================================
            SIDEBAR FOOTER
        ===================================================== */}

        <div className="relative shrink-0 border-t border-white/[0.07] p-3">

          {/* STATUS */}

          <div className="mb-2.5 rounded-xl border border-emerald-200/[0.06] bg-white/[0.035] p-3">

            <div className="flex items-center gap-2.5">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.07]">

                <ShieldCheck
                  size={15}
                  strokeWidth={1.6}
                  className="text-emerald-300/70"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-emerald-100/25">
                  Status Sistem
                </div>

                <div className="mt-1 flex items-center gap-1.5">

                  <span className="relative flex h-1.5 w-1.5">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/75" />

                  </span>

                  <span className="text-[10px] font-medium text-emerald-100/65">
                    Sistem Aktif
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* USER */}

          <div className="flex items-center gap-2.5 rounded-xl px-1.5 py-2">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10">
              A
            </div>

            <div className="min-w-0 flex-1">

              <div className="truncate text-[11px] font-semibold text-white/85">
                Administrator
              </div>

              <div className="mt-0.5 truncate text-[8px] text-emerald-100/30">
                Pengelola Sistem
              </div>

            </div>

            {/* LOGOUT */}

            <button
              type="button"
              title="Keluar"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-emerald-100/35 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LogOut
                size={16}
                strokeWidth={1.65}
              />
            </button>

          </div>

        </div>

      </aside>

      {/* ======================================================
          MAIN
      ======================================================= */}

      <div className="lg:pl-[258px]">

        <div className="h-16 lg:hidden" />

        {/* ====================================================
            TOPBAR
        ===================================================== */}

        <header className="sticky top-0 z-30 hidden h-[58px] items-center border-b border-slate-200/70 bg-white/90 px-7 backdrop-blur-xl lg:flex">

          <div className="flex items-center gap-2.5">

            <div className="flex items-center gap-2">

              <span className="relative flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>

              <span className="text-[11px] font-medium text-slate-400">
                Sistem E-Rapor
              </span>

            </div>

            <ChevronRight
              size={13}
              strokeWidth={1.5}
              className="text-slate-300"
            />

            <span className="text-[11px] font-semibold text-slate-700">
              {currentMenu}
            </span>

          </div>

          <div className="ml-auto flex items-center gap-3">

            <div className="hidden text-right xl:block">

              <div className="text-[10px] font-semibold text-slate-700">
                Administrator
              </div>

              <div className="mt-0.5 text-[8px] text-slate-400">
                Pengelola Sistem
              </div>

            </div>

            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#07543f] text-[10px] font-bold text-white shadow-sm">

              A

              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />

            </div>

          </div>

        </header>

        {/* PAGE */}

        <main>
          {children}
        </main>

      </div>

      {/* ======================================================
          GLOBAL STYLE
      ======================================================= */}

      <style jsx global>{`
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(167, 243, 208, 0.1) transparent;
        }

        .sidebar-scroll::-webkit-scrollbar {
          width: 3px;
        }

        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(167, 243, 208, 0.1);
          border-radius: 999px;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(167, 243, 208, 0.18);
        }

        ::selection {
          background: rgba(16, 185, 129, 0.18);
          color: #064e3b;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

    </div>
  );
}