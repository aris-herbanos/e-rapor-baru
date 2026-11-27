
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
  ChevronUp,
  ChevronDown,
  Activity,
  CalendarCheck,
  School,
  Heart,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

const menus = [
  {
    title: 'Data Guru & Ustadz',
    description: 'Kelola data pengajar dan akun pengguna.',
    href: '/dashboard/teachers',
    icon: Users,
  },
  {
    title: 'Data Santri',
    description: 'Kelola data santri dan identitas.',
    href: '/dashboard/students',
    icon: GraduationCap,
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
    title: 'Kehadiran',
    description: 'Rekap kehadiran santri.',
    href: '/dashboard/attendance',
    icon: CalendarCheck,
  },
  {
    title: 'Input Asesmen',
    description: 'Masukkan nilai formatif dan sumatif.',
    href: '/dashboard/assessment',
    icon: ClipboardCheck,
  },
  {
    title: 'Kepribadian',
    description: 'Penilaian karakter dan kepribadian.',
    href: '/dashboard/personality',
    icon: Heart,
  },
  {
    title: 'Catatan Wali Kelas',
    description: 'Catatan perkembangan santri.',
    href: '/dashboard/notes',
    icon: MessageSquare,
  },
  {
    title: 'Rapor Santri',
    description: 'Lihat dan kelola rapor santri.',
    href: '/dashboard/report',
    icon: BarChart3,
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showForbidden, setShowForbidden] = useState(false);
  const [dismissWelcome, setDismissWelcome] = useState(false);

  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [glanceOpen, setGlanceOpen] = useState(true);
  const [quickAccessOpen, setQuickAccessOpen] = useState(true);
  const [systemOpen, setSystemOpen] = useState(true);

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
    <div className="space-y-5">

      {/* =====================================================
          PAGE TITLE
      ====================================================== */}

      <div className="flex items-center justify-between">
        <h1 className="text-[23px] font-normal text-[#1d2327]">
          Dashboard
        </h1>
      </div>

      {/* =====================================================
          WELCOME PANEL
      ====================================================== */}

      {!dismissWelcome && (
        <div className="overflow-hidden rounded-[6px] border border-[#c3c4c7] bg-white">

          {/* WELCOME HEADER */}

          <div className="relative min-h-[225px] bg-[#151518] px-6 py-8 text-white sm:px-10 sm:py-12">

            {/* DISMISS */}

            <button
              onClick={() => setDismissWelcome(true)}
              className="absolute right-4 top-4 flex items-center gap-1 text-xs text-white hover:text-[#c3c4c7]"
            >
              <X size={16} strokeWidth={3} />
              <span>Dismiss</span>
            </button>

            {/* TITLE */}

            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-[42px]">
                Selamat Datang di E-Rapor!
              </h2>

              <p className="mt-3 text-base text-[#dcdcde] sm:text-lg">
                Pondok Pesantren Terpadu Ulil Albab
              </p>

              <p className="mt-2 text-sm text-[#c3c4c7]">
                Sistem pengelolaan akademik, penilaian, dan rapor santri.
              </p>
            </div>

            {/* DECORATIVE BACKGROUND */}

            <div className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[45%] overflow-hidden opacity-[0.12] md:block">
              <div className="absolute bottom-0 right-[10%] h-[180px] w-[1px] bg-white" />
              <div className="absolute bottom-0 right-[30%] h-[180px] w-[1px] bg-white" />
              <div className="absolute bottom-0 right-[50%] h-[180px] w-[1px] bg-white" />
              <div className="absolute bottom-0 right-[70%] h-[180px] w-[1px] bg-white" />
            </div>

          </div>

          {/* WELCOME CONTENT */}

          {welcomeOpen && (
            <div className="grid grid-cols-1 divide-y divide-[#e2e4e7] md:grid-cols-3 md:divide-x md:divide-y-0">

              {/* COLUMN 1 */}

              <div className="px-5 py-6 sm:px-6">

                <h3 className="text-[19px] font-normal text-[#1d2327]">
                  Kelola Data Akademik
                </h3>

                <p className="mt-3 text-[13px] leading-[1.6] text-[#50575e]">
                  Kelola data guru, santri, kurikulum, asesmen,
                  kehadiran, dan rapor dalam satu sistem.
                </p>

                <Link
                  href="/dashboard/teachers"
                  className="mt-4 inline-flex items-center gap-1 text-[13px] text-[#2271b1] hover:underline"
                >
                  Mulai dari sini
                  <ArrowRight size={14} />
                </Link>

              </div>

              {/* COLUMN 2 */}

              <div className="px-5 py-6 sm:px-6">

                <h3 className="text-[19px] font-normal text-[#1d2327]">
                  Akses Cepat
                </h3>

                <ul className="mt-3 space-y-2 text-[13px]">

                  <li>
                    <Link
                      href="/dashboard/students"
                      className="text-[#2271b1] hover:underline"
                    >
                      Data Santri
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dashboard/attendance"
                      className="text-[#2271b1] hover:underline"
                    >
                      Kehadiran
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dashboard/assessment"
                      className="text-[#2271b1] hover:underline"
                    >
                      Input Asesmen
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dashboard/report"
                      className="text-[#2271b1] hover:underline"
                    >
                      Rapor Santri
                    </Link>
                  </li>

                </ul>

              </div>

              {/* COLUMN 3 */}

              <div className="px-5 py-6 sm:px-6">

                <h3 className="text-[19px] font-normal text-[#1d2327]">
                  Status Sistem
                </h3>

                <div className="mt-4 flex items-center gap-2">

                  <div className="flex h-5 w-5 items-center justify-center">
                    <div className="h-4 w-4 rounded-full border border-[#00a32a]" />
                  </div>

                  <span className="text-[13px] font-medium text-[#1d2327]">
                    Sistem Aktif
                  </span>

                </div>

                <p className="mt-3 text-[13px] leading-[1.6] text-[#50575e]">
                  Sistem E-Rapor siap digunakan untuk mengelola
                  kegiatan akademik.
                </p>

                <Link
                  href="/dashboard/settings"
                  className="mt-3 inline-block text-[13px] text-[#2271b1] hover:underline"
                >
                  Pengaturan sistem
                </Link>

              </div>

            </div>
          )}

          {/* WELCOME FOOTER */}

          <div className="flex items-center justify-between border-t border-[#e2e4e7] bg-[#f6f7f7] px-4 py-2">

            <button
              onClick={() => setWelcomeOpen(!welcomeOpen)}
              className="flex items-center gap-1 text-xs text-[#50575e] hover:text-[#1d2327]"
            >
              {welcomeOpen ? (
                <>
                  <ChevronUp size={15} />
                  Sembunyikan
                </>
              ) : (
                <>
                  <ChevronDown size={15} />
                  Tampilkan
                </>
              )}
            </button>

            <button
              onClick={() => setDismissWelcome(true)}
              className="text-xs text-[#2271b1] hover:underline"
            >
              Tutup panel
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          DASHBOARD WIDGETS
      ====================================================== */}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        {/* ===================================================
            AT A GLANCE
        ==================================================== */}

        <div className="overflow-hidden rounded-[6px] border border-[#c3c4c7] bg-white">

          {/* WIDGET HEADER */}

          <div className="flex h-[44px] items-center justify-between border-b border-[#c3c4c7] px-4">

            <h2 className="text-[14px] font-medium text-[#1d2327]">
              At a Glance
            </h2>

            <div className="flex items-center gap-1">

              <button
                onClick={() => setGlanceOpen(!glanceOpen)}
                className="p-1 text-[#646970] hover:text-[#1d2327]"
                title={glanceOpen ? 'Tutup widget' : 'Buka widget'}
              >
                {glanceOpen ? (
                  <ChevronUp size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>

            </div>

          </div>

          {/* WIDGET CONTENT */}

          {glanceOpen && (
            <div className="p-4">

              <div className="grid grid-cols-2 gap-y-5">

                {/* GURU */}

                <Link
                  href="/dashboard/teachers"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <Users size={17} className="text-[#646970]" />
                  <span>Data Guru & Ustadz</span>
                </Link>

                {/* SANTRI */}

                <Link
                  href="/dashboard/students"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <GraduationCap size={17} className="text-[#646970]" />
                  <span>Data Santri</span>
                </Link>

                {/* KELAS */}

                <Link
                  href="/dashboard/classes"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <School size={17} className="text-[#646970]" />
                  <span>Data Kelas</span>
                </Link>

                {/* SUBJECT */}

                <Link
                  href="/dashboard/subjects"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <BookOpen size={17} className="text-[#646970]" />
                  <span>Mata Pelajaran</span>
                </Link>

                {/* ASSESSMENT */}

                <Link
                  href="/dashboard/assessment"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <ClipboardCheck size={17} className="text-[#646970]" />
                  <span>Input Asesmen</span>
                </Link>

                {/* REPORT */}

                <Link
                  href="/dashboard/report"
                  className="flex items-center gap-2 text-[13px] text-[#2271b1] hover:underline"
                >
                  <BarChart3 size={17} className="text-[#646970]" />
                  <span>Rapor Santri</span>
                </Link>

              </div>

              <div className="mt-5 border-t border-[#e2e4e7] pt-3 text-xs text-[#646970]">
                Sistem E-Rapor Ulil Albab
              </div>

            </div>
          )}

        </div>

        {/* ===================================================
            SYSTEM STATUS
        ==================================================== */}

        <div className="overflow-hidden rounded-[6px] border border-[#c3c4c7] bg-white">

          {/* WIDGET HEADER */}

          <div className="flex h-[44px] items-center justify-between border-b border-[#c3c4c7] px-4">

            <h2 className="text-[14px] font-medium text-[#1d2327]">
              Site Health Status
            </h2>

            <button
              onClick={() => setSystemOpen(!systemOpen)}
              className="p-1 text-[#646970] hover:text-[#1d2327]"
            >
              {systemOpen ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

          </div>

          {/* CONTENT */}

          {systemOpen && (
            <div className="p-4">

              <div className="grid grid-cols-[100px_1fr] items-center gap-4">

                {/* STATUS ICON */}

                <div className="flex flex-col items-center justify-center">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00a32a]">
                    <Activity
                      size={22}
                      className="text-[#00a32a]"
                    />
                  </div>

                  <span className="mt-2 text-[13px] font-medium text-[#1d2327]">
                    Good
                  </span>

                </div>

                {/* STATUS DESCRIPTION */}

                <div>

                  <p className="text-[13px] leading-[1.6] text-[#50575e]">
                    Sistem E-Rapor siap digunakan. Kelola data
                    akademik dan penilaian santri melalui dashboard.
                  </p>

                  <p className="mt-3 text-[13px] leading-[1.6] text-[#50575e]">
                    Silakan gunakan menu di sebelah kiri untuk
                    mengakses fitur yang tersedia.
                  </p>

                  <Link
                    href="/dashboard/settings"
                    className="mt-2 inline-block text-[13px] text-[#2271b1] hover:underline"
                  >
                    Lihat pengaturan sistem
                  </Link>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* ===================================================
            QUICK ACCESS
        ==================================================== */}

        <div className="overflow-hidden rounded-[6px] border border-[#c3c4c7] bg-white xl:col-span-2">

          {/* HEADER */}

          <div className="flex h-[44px] items-center justify-between border-b border-[#c3c4c7] px-4">

            <h2 className="text-[14px] font-medium text-[#1d2327]">
              Akses Cepat
            </h2>

            <button
              onClick={() => setQuickAccessOpen(!quickAccessOpen)}
              className="p-1 text-[#646970] hover:text-[#1d2327]"
            >
              {quickAccessOpen ? (
                <ChevronUp size={17} />
              ) : (
                <ChevronDown size={17} />
              )}
            </button>

          </div>

          {/* QUICK ACCESS LINKS */}

          {quickAccessOpen && (
            <div className="grid grid-cols-1 divide-y divide-[#e2e4e7] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">

              {menus.slice(0, 4).map((menu) => {
                const Icon = menu.icon;

                return (
                  <div
                    key={menu.title}
                    className="p-4"
                  >

                    <div className="flex items-center gap-2">

                      <Icon
                        size={18}
                        className="text-[#646970]"
                      />

                      <Link
                        href={menu.href}
                        className="text-[13px] font-medium text-[#2271b1] hover:underline"
                      >
                        {menu.title}
                      </Link>

                    </div>

                    <p className="mt-2 text-[12px] leading-[1.6] text-[#646970]">
                      {menu.description}
                    </p>

                    <Link
                      href={menu.href}
                      className="mt-3 inline-flex items-center gap-1 text-[12px] text-[#2271b1] hover:underline"
                    >
                      Buka
                      <ArrowRight size={13} />
                    </Link>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* ===================================================
            AKADEMIK
        ==================================================== */}

        <div className="overflow-hidden rounded-[6px] border border-[#c3c4c7] bg-white xl:col-span-2">

          {/* HEADER */}

          <div className="flex h-[44px] items-center justify-between border-b border-[#c3c4c7] px-4">

            <h2 className="text-[14px] font-medium text-[#1d2327]">
              Akademik
            </h2>

            <span className="text-xs text-[#646970]">
              E-Rapor Ulil Albab
            </span>

          </div>

          {/* CONTENT */}

          <div className="grid grid-cols-1 sm:grid-cols-3">

            {/* KEHADIRAN */}

            <Link
              href="/dashboard/attendance"
              className="flex items-start gap-3 border-b border-[#e2e4e7] p-4 hover:bg-[#f6f7f7] sm:border-b-0 sm:border-r"
            >

              <CalendarCheck
                size={20}
                className="mt-0.5 text-[#646970]"
              />

              <div>

                <div className="text-[13px] font-medium text-[#2271b1]">
                  Kehadiran
                </div>

                <p className="mt-1 text-xs leading-relaxed text-[#646970]">
                  Pengelolaan dan rekap presensi santri.
                </p>

              </div>

            </Link>

            {/* PENILAIAN */}

            <Link
              href="/dashboard/assessment"
              className="flex items-start gap-3 border-b border-[#e2e4e7] p-4 hover:bg-[#f6f7f7] sm:border-b-0 sm:border-r"
            >

              <ClipboardCheck
                size={20}
                className="mt-0.5 text-[#646970]"
              />

              <div>

                <div className="text-[13px] font-medium text-[#2271b1]">
                  Input Asesmen
                </div>

                <p className="mt-1 text-xs leading-relaxed text-[#646970]">
                  Input dan pengelolaan hasil asesmen.
                </p>

              </div>

            </Link>

            {/* RAPOR */}

            <Link
              href="/dashboard/report"
              className="flex items-start gap-3 p-4 hover:bg-[#f6f7f7]"
            >

              <BarChart3
                size={20}
                className="mt-0.5 text-[#646970]"
              />

              <div>

                <div className="text-[13px] font-medium text-[#2271b1]">
                  Rapor Santri
                </div>

                <p className="mt-1 text-xs leading-relaxed text-[#646970]">
                  Penyusunan dan pencetakan rapor.
                </p>

              </div>

            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          POPUP FORBIDDEN
      ====================================================== */}

      {showForbidden && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white shadow-xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#c3c4c7] px-5 py-4">

              <h3 className="text-[15px] font-medium text-[#1d2327]">
                Akses Ditolak
              </h3>

              <button
                onClick={closeForbidden}
                className="text-[#646970] hover:text-[#1d2327]"
              >
                <X size={20} />
              </button>

            </div>

            {/* CONTENT */}

            <div className="px-6 py-7 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fbeaea]">
                <LockKeyhole
                  size={28}
                  className="text-[#d63638]"
                />
              </div>

              <p className="text-[13px] leading-relaxed text-[#50575e]">
                Maaf, Anda tidak memiliki izin untuk mengakses
                halaman tersebut.
              </p>

              <p className="mt-2 text-xs text-[#646970]">
                Halaman ini hanya dapat diakses oleh Administrator.
              </p>

            </div>

            {/* FOOTER */}

            <div className="border-t border-[#c3c4c7] bg-[#f6f7f7] px-5 py-4 text-right">

              <button
                onClick={closeForbidden}
                className="rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-4 py-2 text-[13px] text-white hover:bg-[#135e96]"
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

// ===========================================================
// MAIN PAGE
// ===========================================================

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-5 text-sm text-[#646970]">
          Memuat dashboard...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
