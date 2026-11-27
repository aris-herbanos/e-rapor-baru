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
  { title: 'Guru & Ustadz', href: '/dashboard/teachers', icon: Users, category: 'Data Master' },
  { title: 'Santri', href: '/dashboard/students', icon: GraduationCap, category: 'Data Master' },
  { title: 'Kenaikan Kelas', href: '/dashboard/promotions', icon: ArrowUpCircle, category: 'Data Master' },
  { title: 'Riwayat Kenaikan', href: '/dashboard/promotions/history', icon: History, category: 'Data Master' },
  { title: 'Kelas', href: '/dashboard/classes', icon: School, category: 'Data Master' },
  { title: 'Mata Pelajaran', href: '/dashboard/subjects', icon: BookOpen, category: 'Data Master' },
  { title: 'Penugasan Guru', href: '/dashboard/assignments', icon: UserCheck, category: 'Data Master' },
  { title: 'Kurikulum (CP & TP)', href: '/dashboard/curriculum', icon: FileText, category: 'Data Master' },
  { title: 'Kehadiran', href: '/dashboard/attendance', icon: CalendarCheck, category: 'Akademik' },
  { title: 'Input Asesmen', href: '/dashboard/assessment', icon: ClipboardCheck, category: 'Akademik' },
  { title: 'Kepribadian', href: '/dashboard/personality', icon: Heart, category: 'Akademik' },
  { title: 'Catatan Wali Kelas', href: '/dashboard/notes', icon: MessageSquare, category: 'Akademik' },
  { title: 'Rapor Santri', href: '/dashboard/report', icon: BarChart3, category: 'Rapor' },
];

const categories: Category[] = [
  { title: 'Data Master', icon: School },
  { title: 'Akademik', icon: BookOpen },
  { title: 'Rapor', icon: BarChart3 },
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

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    if (href === '/dashboard/promotions/history') return pathname.startsWith('/dashboard/promotions/history');
    if (href === '/dashboard/promotions') {
      return pathname === '/dashboard/promotions' ||
        (pathname.startsWith('/dashboard/promotions/') && !pathname.startsWith('/dashboard/promotions/history'));
    }
    return pathname.startsWith(href);
  };

  const getActiveCategory = () => {
    const activeMenu = menus.find((menu) => isActive(menu.href));
    return activeMenu?.category || null;
  };

  useEffect(() => {
    const activeCategory = getActiveCategory();
    if (activeCategory) setOpenCategory(activeCategory);
  }, [pathname]);

  const toggleCategory = (category: string) => {
    setOpenCategory((current) => (current === category ? null : category));
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Gagal logout');
      router.replace('/login');
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
      alert('Gagal keluar. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327]">
      {/* Admin Bar */}
      <header className="fixed inset-x-0 top-0 z-[70] flex h-12 items-center justify-between bg-[#1d2327] px-4 text-white lg:pl-[220px]">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 font-semibold">
            <GraduationCap size={18} />
            <span>E-Rapor Ulil Albab</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden md:inline">Howdy, Administrator</span>
          <button onClick={handleLogout} disabled={loggingOut} className="flex items-center gap-1 hover:text-gray-300">
            <LogOut size={16} />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[220px] flex-col bg-[#1d2327] text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-12 items-center gap-2 border-b border-white/10 px-4 font-semibold">
          <GraduationCap size={20} />
          <span>E-Rapor</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 text-[13px]">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={`relative flex items-center gap-3 px-4 py-2.5 hover:bg-[#2c3338] ${
              isActive('/dashboard') ? 'bg-[#2271b1] hover:bg-[#2271b1]' : ''
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
            {isActive('/dashboard') && (
              <span className="absolute -right-[8px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]" />
            )}
          </Link>

          {/* Categories */}
          {categories.map((category) => {
            const categoryMenus = menus.filter((m) => m.category === category.title);
            if (!categoryMenus.length) return null;

            const isOpen = openCategory === category.title;
            const isCategoryActive = categoryMenus.some((m) => isActive(m.href));

            return (
              <div key={category.title}>
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[#2c3338] ${
                    isCategoryActive ? 'bg-[#2c3338]' : ''
                  }`}
                >
                  <category.icon size={18} />
                  <span className="flex-1">{category.title}</span>
                  <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="bg-black/20">
                    {categoryMenus.map((menu) => {
                      const active = isActive(menu.href);
                      return (
                        <Link
                          key={menu.href}
                          href={menu.href}
                          onClick={() => setMobileOpen(false)}
                          className={`relative flex items-center gap-3 py-2 pl-12 pr-4 hover:bg-[#2c3338] ${
                            active ? 'bg-[#2271b1] text-white' : 'text-gray-300'
                          }`}
                        >
                          <menu.icon size={16} />
                          <span>{menu.title}</span>
                          {active && (
                            <span className="absolute -right-[8px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className={`relative flex items-center gap-3 px-4 py-2.5 hover:bg-[#2c3338] ${
              pathname.startsWith('/dashboard/settings') ? 'bg-[#2271b1]' : ''
            }`}
          >
            <Settings size={18} />
            <span>Pengaturan</span>
            {pathname.startsWith('/dashboard/settings') && (
              <span className="absolute -right-[8px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[10px] border-l-[10px] border-y-transparent border-l-[#2271b1]" />
            )}
          </Link>
        </nav>

        <div className="border-t border-white/10 p-3 text-xs text-gray-400">
          <div>Administrator</div>
          <div className="mt-1">E-Rapor v1.0</div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="pt-12 lg:pl-[220px]">
        <main className="min-h-screen p-6">{children}</main>
      </div>
    </div>
  );
}