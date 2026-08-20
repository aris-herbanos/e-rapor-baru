'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  ChevronDown,
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
  ArrowUpCircle,
  History,
} from 'lucide-react';

/* ============================================================
   TYPES
============================================================ */

type MenuItem = {
  title: string;
  href: string;
  icon: any;
  category: string;
};

type Category = {
  title: string;
  icon: any;
  description: string;
};

/* ============================================================
   MENU
============================================================ */

const menus: MenuItem[] = [
  /* ==========================================================
     DATA MASTER
  ========================================================== */

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
    title: 'Kenaikan Kelas',
    href: '/dashboard/promotions',
    icon: ArrowUpCircle,
    category: 'Data Master',
  },
  {
    title: 'Riwayat Kenaikan',
    href: '/dashboard/promotions/history',
    icon: History,
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

  /* ==========================================================
     AKADEMIK
  ========================================================== */

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

  /* ==========================================================
     RAPOR
  ========================================================== */

  {
    title: 'Rapor Santri',
    href: '/dashboard/report',
    icon: BarChart3,
    category: 'Rapor',
  },
];

/* ============================================================
   CATEGORIES
============================================================ */

const categories: Category[] = [
  {
    title: 'Data Master',
    icon: School,
    description: 'Kelola data utama',
  },
  {
    title: 'Akademik',
    icon: BookOpen,
    description: 'Kegiatan pembelajaran',
  },
  {
    title: 'Rapor',
    icon: BarChart3,
    description: 'Penilaian & rapor',
  },
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

  /*
   * State dropdown.
   *
   * Default semua tertutup.
   * Nanti grup yang sesuai halaman aktif akan otomatis terbuka.
   */
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  /* ==========================================================
     ACTIVE MENU
  ========================================================== */

  const isActive = (href: string) => {
    /*
     * Dashboard harus benar-benar /dashboard.
     */
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }

    /*
     * Riwayat Kenaikan harus berdiri sendiri.
     */
    if (href === '/dashboard/promotions/history') {
      return pathname.startsWith('/dashboard/promotions/history');
    }

    /*
     * Kenaikan Kelas jangan ikut aktif saat berada
     * di halaman Riwayat Kenaikan.
     */
    if (href === '/dashboard/promotions') {
      return (
        pathname === '/dashboard/promotions' ||
        (
          pathname.startsWith('/dashboard/promotions/') &&
          !pathname.startsWith('/dashboard/promotions/history')
        )
      );
    }

    return pathname.startsWith(href);
  };

  /* ==========================================================
     ACTIVE CATEGORY
  ========================================================== */

  const getActiveCategory = () => {
    const activeMenu = menus.find((menu) =>
      isActive(menu.href)
    );

    return activeMenu?.category || null;
  };

  /* ==========================================================
     AUTO OPEN ACTIVE CATEGORY
  ========================================================== */

  useEffect(() => {
    const activeCategory = getActiveCategory();

    if (activeCategory) {
      setOpenCategory(activeCategory);
    }
  }, [pathname]);

  /* ==========================================================
     CURRENT PAGE
  ========================================================== */

  const currentMenu =
    menus.find((menu) => isActive(menu.href))?.title ||
    (pathname.startsWith('/dashboard/settings')
      ? 'Pengaturan'
      : 'Dashboard');

  /* ==========================================================
     TOGGLE CATEGORY
  ========================================================== */

  const toggleCategory = (category: string) => {
    setOpenCategory((current) =>
      current === category ? null : category
    );
  };

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

      alert(
        'Gagal keluar dari sistem. Silakan coba lagi.'
      );
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
          aria-label={
            mobileOpen
              ? 'Tutup menu'
              : 'Buka menu'
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
        >
          {mobileOpen ? (
            <X
              size={19}
              strokeWidth={1.8}
            />
          ) : (
            <Menu
              size={19}
              strokeWidth={1.8}
            />
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
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full',
        ].join(' ')}
      >

        {/* ====================================================
            DECORATION
        ===================================================== */}

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

              <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-emerald-200/60">
                Sistem Akademik
              </div>

            </div>

          </div>

          {/* BASMALAH */}

          <div className="mt-5 flex items-center gap-3">

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent" />

            <div
              dir="rtl"
              className="font-serif text-[11px] text-amber-200/75"
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>

            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent" />

          </div>

          {/* SCHOOL */}

          <div className="mt-3 flex items-center gap-2 text-[9px] text-emerald-100/50">

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

        <nav className="sidebar-scroll relative flex-1 overflow-y-auto px-3 py-4">

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          <div className="mb-3">

            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={[
                'group relative flex min-h-[44px] items-center gap-3',
                'rounded-xl px-2.5',
                'text-[12.5px]',
                'transition-all duration-200',

                isActive('/dashboard')
                  ? 'bg-white/[0.09] text-white shadow-[0_4px_18px_rgba(0,0,0,0.08)]'
                  : 'text-white/70 hover:bg-white/[0.045] hover:text-white',
              ].join(' ')}
            >

              {isActive('/dashboard') && (
                <span className="absolute bottom-2.5 left-0 top-2.5 w-[2px] rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500" />
              )}

              <span
                className={[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  'transition-all duration-200',

                  isActive('/dashboard')
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-white/[0.035] text-emerald-200/65 group-hover:bg-emerald-400/[0.06] group-hover:text-emerald-200',
                ].join(' ')}
              >
                <LayoutDashboard
                  size={16}
                  strokeWidth={1.7}
                />
              </span>

              <span
                className={[
                  'flex-1',
                  isActive('/dashboard')
                    ? 'font-semibold'
                    : 'font-medium',
                ].join(' ')}
              >
                Dashboard
              </span>

              {isActive('/dashboard') && (
                <ChevronRight
                  size={13}
                  strokeWidth={1.5}
                  className="mr-0.5 text-emerald-300/70"
                />
              )}

            </Link>

          </div>

          {/* ==================================================
              GROUPED MENUS
          ================================================== */}

          <div className="space-y-2">

            {categories.map((category) => {

              const categoryMenus = menus.filter(
                (menu) => menu.category === category.title
              );

              if (!categoryMenus.length) {
                return null;
              }

              const categoryOpen =
                openCategory === category.title;

              const categoryActive =
                categoryMenus.some((menu) =>
                  isActive(menu.href)
                );

              const CategoryIcon = category.icon;

              return (
                <div key={category.title}>

                  {/* ========================================
                      CATEGORY BUTTON
                  ======================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleCategory(category.title)
                    }
                    className={[
                      'group relative flex w-full items-center gap-3',
                      'rounded-xl px-2.5 py-2.5',
                      'text-left',
                      'transition-all duration-200',

                      categoryOpen || categoryActive
                        ? 'bg-white/[0.055]'
                        : 'hover:bg-white/[0.035]',
                    ].join(' ')}
                  >

                    {/* ACTIVE LINE */}

                    {categoryActive && (
                      <span className="absolute bottom-2.5 left-0 top-2.5 w-[2px] rounded-full bg-emerald-400" />
                    )}

                    {/* ICON */}

                    <span
                      className={[
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        'transition-all duration-200',

                        categoryActive || categoryOpen
                          ? 'bg-emerald-400/10 text-emerald-300'
                          : 'bg-white/[0.035] text-emerald-200/65 group-hover:bg-white/[0.05] group-hover:text-emerald-200',
                      ].join(' ')}
                    >
                      <CategoryIcon
                        size={16}
                        strokeWidth={1.7}
                      />
                    </span>

                    {/* TEXT */}

                    <span className="min-w-0 flex-1">

                      <span
                        className={[
                          'block text-[12px]',
                          categoryActive || categoryOpen
                            ? 'font-semibold text-white'
                            : 'font-semibold text-white/75 group-hover:text-white',
                        ].join(' ')}
                      >
                        {category.title}
                      </span>

                      <span className="mt-0.5 block text-[8px] text-white/35">
                        {category.description}
                      </span>

                    </span>

                    {/* COUNT */}

                    <span
                      className={[
                        'mr-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5',
                        'text-[8px] font-bold',
                        categoryActive || categoryOpen
                          ? 'bg-emerald-400/10 text-emerald-300/80'
                          : 'bg-white/[0.045] text-white/35',
                      ].join(' ')}
                    >
                      {categoryMenus.length}
                    </span>

                    {/* CHEVRON */}

                    <ChevronDown
                      size={14}
                      strokeWidth={1.7}
                      className={[
                        'shrink-0 transition-transform duration-300',
                        categoryOpen
                          ? 'rotate-180 text-emerald-300'
                          : 'text-white/35 group-hover:text-white/60',
                      ].join(' ')}
                    />

                  </button>

                  {/* ========================================
                      DROPDOWN CONTENT
                  ======================================== */}

                  <div
                    className={[
                      'grid transition-all duration-300 ease-out',
                      categoryOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0',
                    ].join(' ')}
                  >

                    <div className="overflow-hidden">

                      <div className="relative ml-[18px] border-l border-white/[0.07] py-1 pl-3">

                        {categoryMenus.map((menu) => {

                          const Icon = menu.icon;
                          const active = isActive(menu.href);

                          return (
                            <Link
                              key={menu.href}
                              href={menu.href}
                              onClick={() =>
                                setMobileOpen(false)
                              }
                              className={[
                                'group relative flex min-h-[38px] items-center gap-2.5',
                                'rounded-lg px-2',
                                'text-[11.5px]',
                                'transition-all duration-200',

                                active
                                  ? 'bg-emerald-400/[0.09] text-white'
                                  : 'text-white/65 hover:bg-white/[0.035] hover:text-white/90',
                              ].join(' ')}
                            >

                              {/* ACTIVE DOT */}

                              {active && (
                                <span className="absolute -left-[17px] h-1.5 w-1.5 rounded-full bg-emerald-400 ring-4 ring-[#052f27]" />
                              )}

                              {/* ICON */}

                              <span
                                className={[
                                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-md',
                                  active
                                    ? 'text-emerald-300'
                                    : 'text-emerald-200/55 group-hover:text-emerald-200',
                                ].join(' ')}
                              >
                                <Icon
                                  size={14}
                                  strokeWidth={1.7}
                                />
                              </span>

                              {/* TITLE */}

                              <span
                                className={[
                                  'min-w-0 flex-1 truncate',
                                  active
                                    ? 'font-semibold'
                                    : 'font-medium',
                                ].join(' ')}
                              >
                                {menu.title}
                              </span>

                              {active && (
                                <ChevronRight
                                  size={12}
                                  strokeWidth={1.5}
                                  className="text-emerald-300/60"
                                />
                              )}

                            </Link>
                          );
                        })}

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* ==================================================
              SYSTEM
          =================================================== */}

          <div className="mt-4 border-t border-white/[0.055] pt-4">

            <div className="mb-2 px-2">

              <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-200/40">
                Sistem
              </span>

            </div>

            <Link
              href="/dashboard/settings"
              onClick={() => setMobileOpen(false)}
              className={[
                'group relative flex min-h-[42px] items-center gap-3',
                'rounded-xl px-2.5',
                'text-[12px]',
                'transition-all duration-200',

                isActive('/dashboard/settings')
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/70 hover:bg-white/[0.04] hover:text-white',
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
                    : 'bg-white/[0.035] text-emerald-200/60 group-hover:text-emerald-200',
                ].join(' ')}
              >
                <Settings
                  size={16}
                  strokeWidth={1.7}
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

              {isActive('/dashboard/settings') && (
                <ChevronRight
                  size={13}
                  strokeWidth={1.5}
                  className="ml-auto text-emerald-300/60"
                />
              )}

            </Link>

          </div>

        </nav>

        {/* ====================================================
            SIDEBAR FOOTER
        ===================================================== */}

        <div className="relative shrink-0 border-t border-white/[0.07] p-3">

          {/* STATUS */}

          <div className="mb-2.5 rounded-xl border border-emerald-200/[0.07] bg-white/[0.04] p-3">

            <div className="flex items-center gap-2.5">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.08]">

                <ShieldCheck
                  size={15}
                  strokeWidth={1.6}
                  className="text-emerald-300/80"
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/40">
                  Status Sistem
                </div>

                <div className="mt-1 flex items-center gap-1.5">

                  <span className="relative flex h-1.5 w-1.5">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />

                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/75" />

                  </span>

                  <span className="text-[10px] font-medium text-emerald-100/75">
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

              <div className="truncate text-[11px] font-semibold text-white/90">
                Administrator
              </div>

              <div className="mt-0.5 truncate text-[8px] text-white/40">
                Pengelola Sistem
              </div>

            </div>

            {/* LOGOUT */}

            <button
              type="button"
              title="Keluar"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/45 transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
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

        {/* ====================================================
            PAGE
        ===================================================== */}

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
          scrollbar-color: rgba(167, 243, 208, 0.12) transparent;
        }

        .sidebar-scroll::-webkit-scrollbar {
          width: 3px;
        }

        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(167, 243, 208, 0.12);
          border-radius: 999px;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(167, 243, 208, 0.22);
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