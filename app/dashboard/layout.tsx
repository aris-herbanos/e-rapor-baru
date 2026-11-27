
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
  ChevronDown,
  GraduationCap,
  Menu,
  X,
  School,
  UserCheck,
  CalendarCheck,
  Heart,
  MessageSquare,
  ArrowUpCircle,
  History,
  Home,
  Plus,
  Search,
  RefreshCw,
} from 'lucide-react';

type MenuItem = {
  title: string;
  href: string;
  icon: any;
  category: string;
};

type Category = {
  title: string;
  icon: any;
};

const menus: MenuItem[] = [
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

const categories: Category[] = [
  {
    title: 'Data Master',
    icon: School,
  },
  {
    title: 'Akademik',
    icon: BookOpen,
  },
  {
    title: 'Rapor',
    icon: BarChart3,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // =========================================================
  // ACTIVE MENU
  // =========================================================

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }

    if (href === '/dashboard/promotions/history') {
      return pathname.startsWith('/dashboard/promotions/history');
    }

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

  // =========================================================
  // AUTO OPEN ACTIVE CATEGORY
  // =========================================================

  useEffect(() => {
    const activeMenu = menus.find((menu) => isActive(menu.href));

    if (activeMenu?.category) {
      setOpenCategory(activeMenu.category);
    }
  }, [pathname]);

  // =========================================================
  // TOGGLE CATEGORY
  // =========================================================

  const toggleCategory = (category: string) => {
    setOpenCategory((current) =>
      current === category ? null : category
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Gagal logout');
      }

      router.replace('/login');
      router.refresh();
    } catch (error) {
      console.error(error);

      setLoggingOut(false);

      alert('Gagal keluar. Silakan coba lagi.');
    }
  };

  // =========================================================
  // ADMIN BAR
  // =========================================================

  return (
    <div
      className="min-h-screen bg-[#f0f0f1] text-[#1d2327]"
      style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {/* =====================================================
          WORDPRESS STYLE ADMIN BAR
      ====================================================== */}

      <header className="fixed inset-x-0 top-0 z-[100] flex h-8 items-center justify-between bg-[#1d2327] px-3 text-white">
        {/* LEFT ADMIN BAR */}

        <div className="flex h-full items-center gap-1">

          {/* MOBILE MENU */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center hover:bg-[#3c434a] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

          {/* SITE ICON */}

          <Link
            href="/dashboard"
            className="flex h-8 items-center justify-center px-2 hover:bg-[#3c434a]"
            title="Dashboard"
          >
            <GraduationCap size={18} />
          </Link>

          {/* SITE NAME */}

          <Link
            href="/dashboard"
            className="hidden h-8 items-center gap-2 px-2 text-[13px] hover:bg-[#3c434a] sm:flex"
          >
            <span>E-Rapor Ulil Albab</span>
          </Link>

          {/* VIEW SITE */}

          <Link
            href="/dashboard"
            className="flex h-8 items-center justify-center gap-1 px-2 text-[13px] hover:bg-[#3c434a]"
            title="Dashboard"
          >
            <Home size={15} />
          </Link>

          {/* REFRESH / STATUS */}

          <button
            type="button"
            className="hidden h-8 items-center gap-1 px-2 text-[13px] hover:bg-[#3c434a] sm:flex"
            title="Sistem E-Rapor"
          >
            <RefreshCw size={15} />
          </button>

          {/* SEARCH */}

          <button
            type="button"
            className="hidden h-8 items-center justify-center px-2 hover:bg-[#3c434a] md:flex"
            title="Pencarian"
          >
            <Search size={16} />
          </button>

          {/* QUICK ADD */}

          <Link
            href="/dashboard/students"
            className="hidden h-8 items-center gap-1 px-2 text-[13px] hover:bg-[#3c434a] sm:flex"
            title="Tambah data"
          >
            <Plus size={17} />
            <span>Tambah</span>
          </Link>
        </div>

        {/* RIGHT ADMIN BAR */}

        <div className="flex h-full items-center gap-1">

          {/* USER */}

          <div className="flex h-8 items-center gap-2 px-2 text-[13px]">
            <span className="hidden sm:inline">
              Selamat datang, Administrator
            </span>

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a7aaad] text-white">
              <Users size={14} />
            </div>
          </div>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex h-8 items-center gap-1 px-2 text-[13px] hover:bg-[#3c434a] disabled:opacity-50"
            title="Keluar"
          >
            <LogOut size={15} />

            <span className="hidden md:inline">
              {loggingOut ? 'Keluar...' : 'Log Out'}
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed left-0 top-8 z-[80] flex h-[calc(100vh-32px)] w-[180px] flex-col bg-[#1d2327] text-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        {/* SIDEBAR NAVIGATION */}

        <nav className="flex-1 overflow-y-auto overflow-x-hidden">

          {/* DASHBOARD */}

          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={`relative flex h-[36px] items-center gap-2 px-3 text-[13px] transition-colors hover:bg-[#2c3338] ${
              pathname === '/dashboard'
                ? 'bg-[#2271b1] text-white'
                : 'text-[#f0f0f1]'
            }`}
          >
            <LayoutDashboard size={16} />

            <span>Dashboard</span>

            {pathname === '/dashboard' && (
              <span
                className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-[10px] border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]"
              />
            )}
          </Link>

          {/* DASHBOARD SUBMENU */}

          {pathname === '/dashboard' && (
            <div className="bg-[#1d2327] py-1">

              <div className="px-3 py-2 text-[12px] font-semibold text-white">
                Home
              </div>

              <div className="px-3 py-2 text-[12px] text-[#a7aaad]">
                Overview
              </div>
            </div>
          )}

          {/* CATEGORY MENUS */}

          {categories.map((category) => {
            const categoryMenus = menus.filter(
              (menu) => menu.category === category.title
            );

            if (!categoryMenus.length) return null;

            const isOpen = openCategory === category.title;

            const isCategoryActive = categoryMenus.some(
              (menu) => isActive(menu.href)
            );

            return (
              <div key={category.title}>

                {/* CATEGORY HEADER */}

                <button
                  onClick={() => toggleCategory(category.title)}
                  className={`flex w-full items-center gap-2 px-3 py-[9px] text-left text-[13px] transition-colors hover:bg-[#2c3338] ${
                    isCategoryActive
                      ? 'bg-[#2c3338] text-white'
                      : 'text-[#f0f0f1]'
                  }`}
                >
                  <category.icon size={16} />

                  <span className="flex-1">
                    {category.title}
                  </span>

                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* CATEGORY ITEMS */}

                {isOpen && (
                  <div className="bg-[#191e23]">

                    {categoryMenus.map((menu) => {
                      const active = isActive(menu.href);

                      return (
                        <Link
                          key={menu.href}
                          href={menu.href}
                          onClick={() => setMobileOpen(false)}
                          className={`relative flex min-h-[34px] items-center gap-2 py-2 pl-8 pr-3 text-[12.5px] transition-colors hover:bg-[#2c3338] ${
                            active
                              ? 'bg-[#2271b1] text-white'
                              : 'text-[#c3c4c7]'
                          }`}
                        >
                          <menu.icon size={15} />

                          <span>{menu.title}</span>

                          {active && (
                            <span
                              className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-[10px] border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]"
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* SETTINGS */}

          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className={`relative flex h-[36px] items-center gap-2 px-3 text-[13px] transition-colors hover:bg-[#2c3338] ${
              pathname.startsWith('/dashboard/settings')
                ? 'bg-[#2271b1] text-white'
                : 'text-[#f0f0f1]'
            }`}
          >
            <Settings size={16} />

            <span>Pengaturan</span>

            {pathname.startsWith('/dashboard/settings') && (
              <span
                className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-[10px] border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]"
              />
            )}
          </Link>

        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="border-t border-[#3c434a] px-3 py-3 text-[11px] text-[#a7aaad]">
          <div className="font-medium text-[#c3c4c7]">
            Administrator
          </div>

          <div className="mt-1">
            E-Rapor v1.0
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          className="fixed inset-0 top-8 z-[60] bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="pt-8 lg:pl-[180px]">

        <main className="min-h-[calc(100vh-32px)] px-4 py-5 sm:px-5 lg:px-6">

          {/* PAGE CONTENT */}

          {children}

        </main>
      </div>
    </div>
  );
}
