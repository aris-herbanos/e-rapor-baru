import Link from 'next/link';
import {
  BookOpenCheck,
  GraduationCap,
  ShieldCheck,
  FileText,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MoonStar,
  Layers3,
  BarChart3,
  Smartphone,
  Download,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7fbf8] text-slate-800 selection:bg-emerald-600 selection:text-white">

      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-40 top-[18%] h-[450px] w-[450px] rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute bottom-[-220px] left-[30%] h-[500px] w-[500px] rounded-full bg-teal-100/40 blur-3xl" />
        
        {/* Islamic geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #047857 12%, transparent 12.5%, transparent 87%, #047857 87.5%, #047857),
              linear-gradient(150deg, #047857 12%, transparent 12.5%, transparent 87%, #047857 87.5%, #047857),
              linear-gradient(30deg, #047857 12%, transparent 12.5%, transparent 87%, #047857 87.5%, #047857),
              linear-gradient(150deg, #047857 12%, transparent 12.5%, transparent 87%, #047857 87.5%, #047857),
              linear-gradient(60deg, #04785777 25%, transparent 25.5%, transparent 75%, #04785777 75%)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
          }}
        />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <header className="relative z-20 border-b border-emerald-100/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/5">
              <img
                src="/logo.png"
                alt="Logo Pondok Pesantren Terpadu Ulul Albab"
                className="h-full w-full object-contain p-1.5"
              />
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-wide text-emerald-950 sm:text-base">
                E-RAPOR
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600 sm:text-xs">
                Ulul Albab
              </div>
            </div>
          </Link>

          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl sm:px-5"
          >
            <span>Login Ustadz / Admin</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================== */}
      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
          
          <div className="mx-auto max-w-5xl text-center">
            
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              </span>
              <span>Sistem Akademik & Rapor Digital Pesantren</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-emerald-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Membangun Generasi
              <span className="block bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Berilmu & Berakhlak
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              Platform digital terpadu untuk mengelola akademik, penilaian, tahfidz Al-Qur'an, kehadiran, akhlak, hingga pencetakan rapor santri secara modern, terstruktur, dan profesional.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-2xl"
              >
                <BookOpenCheck className="h-5 w-5" />
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#fitur"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white/80 px-7 py-4 text-sm font-bold text-emerald-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <Layers3 className="h-5 w-5" />
                Pelajari Fitur
              </a>
            </div>

          </div>

          {/* TRUST / MINI STATS */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 overflow-hidden rounded-3xl border border-emerald-100 bg-white/80 shadow-xl shadow-emerald-950/5 backdrop-blur-xl md:grid-cols-4">
            <div className="border-b border-emerald-100 p-5 text-center md:border-b-0 md:border-r">
              <div className="mb-1 text-xl font-black text-emerald-700">Akademik</div>
              <div className="text-xs text-slate-500">Terintegrasi</div>
            </div>
            <div className="border-b border-emerald-100 p-5 text-center md:border-b-0 md:border-r">
              <div className="mb-1 text-xl font-black text-emerald-700">Tahfidz</div>
              <div className="text-xs text-slate-500">Al-Qur'an</div>
            </div>
            <div className="p-5 text-center md:border-r md:border-emerald-100">
              <div className="mb-1 text-xl font-black text-emerald-700">Akhlak</div>
              <div className="text-xs text-slate-500">& Kepribadian</div>
            </div>
            <div className="p-5 text-center">
              <div className="mb-1 text-xl font-black text-emerald-700">Digital</div>
              <div className="text-xs text-slate-500">& Profesional</div>
            </div>
          </div>

        </section>

        {/* =======================================================
            FEATURES
        ======================================================== */}
        <section id="fitur" className="relative border-y border-emerald-100 bg-white/70 py-20 backdrop-blur-sm lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Sistem Terintegrasi
              </div>
              <h2 className="text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">
                Semua kebutuhan rapor,
                <span className="text-emerald-600"> dalam satu platform.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                Dirancang untuk membantu ustadz dan admin mengelola data pendidikan santri dengan lebih cepat, rapi, dan akurat.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-950/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-extrabold text-emerald-950">Penilaian Komprehensif</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Kelola asesmen formatif dan sumatif, nilai akademik, tahfidz, serta ujian lisan dan tertulis khas pesantren.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" /> Terstruktur & Terintegrasi
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-7 shadow-lg shadow-amber-950/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-extrabold text-emerald-950">Akhlak & Kepribadian</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Pencatatan Suluk, Muwadhotah, Nadzofah, dan Indhiplat untuk memberikan gambaran perkembangan karakter santri.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-amber-600">
                  <CheckCircle2 className="h-4 w-4" /> Karakter & Adab Santri
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-teal-100 bg-white p-7 shadow-lg shadow-teal-950/[0.04] transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-extrabold text-emerald-950">Cetak Rapor Profesional</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Hasilkan rapor dengan format profesional yang memuat nilai, absensi, tahfidz, kepribadian, dan catatan wali kelas.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-teal-600">
                  <CheckCircle2 className="h-4 w-4" /> Siap Cetak
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* =========================================================
          FOOTER & PWA INSTALL BANNER
      ========================================================== */}
      <footer className="border-t border-emerald-100 bg-white pt-12 pb-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          
          {/* PWA INSTALL BANNER (Sesuai Referensi Gambar) */}
          <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-teal-950 p-8 sm:p-10 text-white shadow-2xl">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-4 text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/80 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-700/50">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  PWA READY ECOSYSTEM
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Instal Aplikasi E-Rapor Ulil Albab
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Nikmati akses instan, performa super cepat, dan pengalaman lintas perangkat layaknya aplikasi native langsung dari genggaman Anda.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-emerald-300 pt-2">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> FAST ACCESS</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> SECURE</span>
                  <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4 text-amber-400" /> MOBILE READY</span>
                </div>
              </div>

              {/* QR Code Card Box */}
              <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-emerald-900/40 p-4 border border-emerald-700/40 backdrop-blur-md shadow-inner">
                <div className="bg-white p-2.5 rounded-xl shadow-md">
                  <img
                    src="/qrcode.png"
                    alt="Scan QR Code untuk Install Aplikasi"
                    className="h-28 w-28 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
                  <span className="text-xs font-medium text-emerald-300">+ Scan untuk install</span>
                  <a
                    href="https://ymjhybmleqlpuwwroiod.supabase.co/storage/v1/object/public/download/e-rapor.apk"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download APK</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Copyright & Bottom Nav */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-xs font-semibold text-emerald-900">
                © {new Date().getFullYear()} Pondok Pesantren Terpadu Ulul Albab. Hak Cipta Dilindungi.
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                E-Rapor • Sistem Akademik & Penilaian Santri Berbasis Digital
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold text-emerald-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Aman
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Terintegrasi
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Modern
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}