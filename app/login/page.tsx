'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const [identityNumber, setIdentityNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity_number: identityNumber.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal masuk ke sistem.');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f8f6]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Soft green glow */}
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[550px] w-[550px] rounded-full bg-emerald-100/40 blur-3xl" />

        {/* Gold accent */}
        <div className="absolute right-[15%] top-[10%] h-32 w-32 rounded-full bg-amber-100/30 blur-3xl" />

        {/* Islamic geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(150deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(30deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(150deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(60deg, #064e3b 25%, transparent 25.5%, transparent 75%, #064e3b 75%)
            `,
            backgroundSize:
              '80px 140px, 80px 140px, 80px 140px, 80px 140px, 80px 140px',
            backgroundPosition:
              '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
          }}
        />

      </div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(6,78,59,0.12)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">


          {/* =================================================
              LEFT BRANDING
          ================================================== */}

          <section className="relative hidden overflow-hidden bg-[#063d31] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circles */}
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full border border-emerald-300/10" />

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-emerald-300/[0.08]" />

            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-400/[0.06] blur-3xl" />

            {/* Small decorative stars */}
            <Sparkles
              className="absolute right-20 top-32 text-amber-200/30"
              size={18}
            />

            <Sparkles
              className="absolute bottom-28 right-24 text-emerald-200/20"
              size={14}
            />


            {/* BRAND */}

            <div className="relative">

              <div className="flex items-center gap-4">

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200/10 bg-white/[0.07] shadow-inner">

                  <div className="absolute inset-2 rounded-xl border border-amber-200/10" />

                  <GraduationCap
                    size={27}
                    strokeWidth={1.6}
                    className="relative text-emerald-200"
                  />

                </div>

                <div>

                  <h1 className="text-xl font-bold tracking-tight">
                    E-Rapor
                  </h1>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-emerald-200/50">
                    Sistem Akademik
                  </p>

                </div>

              </div>


              {/* Arabic */}

              <div className="mt-8 flex items-center gap-3">

                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-200/15" />

                <span
                  dir="rtl"
                  className="font-serif text-sm text-amber-100/70"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </span>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-200/15" />

              </div>

            </div>


            {/* CENTER MESSAGE */}

            <div className="relative my-auto py-16">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/10 bg-white/[0.055] px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-100/60">
                  Portal Akademik Pesantren
                </span>

              </div>


              <h2 className="max-w-md text-4xl font-bold leading-[1.12] tracking-tight">
                Kelola pendidikan
                <span className="block text-emerald-200">
                  dengan amanah.
                </span>
              </h2>


              <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/50">
                Sistem terpadu untuk membantu pengelolaan data akademik,
                penilaian, kehadiran, dan rapor santri secara lebih
                tertib, profesional, dan efisien.
              </p>


              {/* Features */}

              <div className="mt-8 grid max-w-md grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">

                  <ShieldCheck
                    size={18}
                    className="text-emerald-300/70"
                    strokeWidth={1.6}
                  />

                  <p className="mt-3 text-[11px] font-semibold text-white/75">
                    Data Terlindungi
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-emerald-100/30">
                    Akses sistem terkontrol
                  </p>

                </div>


                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">

                  <GraduationCap
                    size={18}
                    className="text-amber-200/70"
                    strokeWidth={1.6}
                  />

                  <p className="mt-3 text-[11px] font-semibold text-white/75">
                    Akademik Terpadu
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-emerald-100/30">
                    Kelola data lebih mudah
                  </p>

                </div>

              </div>

            </div>


            {/* FOOTER */}

            <div className="relative flex items-center justify-between border-t border-white/[0.06] pt-5">

              <div>

                <p className="text-[10px] font-semibold text-white/60">
                  Pondok Pesantren Terpadu Ulil Albab
                </p>

                <p className="mt-1 text-[8px] text-emerald-100/25">
                  Sistem Informasi Akademik
                </p>

              </div>

              <div className="text-right">

                <p className="text-[8px] uppercase tracking-[0.18em] text-emerald-100/25">
                  E-Rapor
                </p>

                <p className="mt-1 text-[9px] font-semibold text-emerald-200/40">
                  2026
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              RIGHT LOGIN
          ================================================== */}

          <section className="flex min-h-[650px] flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-12">

            <div className="mx-auto w-full max-w-sm">


              {/* MOBILE BRAND */}

              <div className="mb-9 flex flex-col items-center text-center lg:hidden">

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#063d31] text-white shadow-lg shadow-emerald-900/10">

                  <div className="absolute inset-2 rounded-xl border border-emerald-200/10" />

                  <GraduationCap
                    size={29}
                    strokeWidth={1.6}
                  />

                </div>

                <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-800">
                  E-Rapor
                </h1>

                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Sistem Akademik Ulil Albab
                </p>

                <p
                  dir="rtl"
                  className="mt-4 font-serif text-sm text-emerald-800/60"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>

              </div>


              {/* LOGIN HEADER */}

              <div className="mb-8">

                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">

                  <LockKeyhole
                    size={18}
                    strokeWidth={1.7}
                  />

                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-800">
                  Selamat Datang
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Silakan masuk untuk mengakses sistem akademik pesantren.
                </p>

              </div>


              {/* ERROR */}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3.5">

                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">
                    !
                  </div>

                  <p className="text-xs leading-5 text-red-600">
                    {error}
                  </p>

                </div>
              )}


              {/* FORM */}

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

                {/* IDENTITY */}

                <div>

                  <label
                    htmlFor="identityNumber"
                    className="mb-2 block text-[11px] font-semibold text-slate-600"
                  >
                    NIP / Nomor Identitas
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400">

                      <UserRound
                        size={16}
                        strokeWidth={1.7}
                      />

                    </div>

                    <input
                      id="identityNumber"
                      type="text"
                      value={identityNumber}
                      onChange={(e) =>
                        setIdentityNumber(
                          e.target.value,
                        )
                      }
                      required
                      autoComplete="username"
                      placeholder="Masukkan NIP / nomor identitas"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-[11px] font-semibold text-slate-600"
                    >
                      Password
                    </label>

                  </div>

                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400">

                      <LockKeyhole
                        size={16}
                        strokeWidth={1.7}
                      />

                    </div>

                    <input
                      id="password"
                      type={
                        showPassword
                          ? 'text'
                          : 'password'
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value,
                        )
                      }
                      required
                      autoComplete="current-password"
                      placeholder="Masukkan password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword,
                        )
                      }
                      aria-label={
                        showPassword
                          ? 'Sembunyikan password'
                          : 'Tampilkan password'
                      }
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-emerald-700"
                    >

                      {showPassword ? (
                        <EyeOff
                          size={16}
                          strokeWidth={1.7}
                        />
                      ) : (
                        <Eye
                          size={16}
                          strokeWidth={1.7}
                        />
                      )}

                    </button>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#07543f] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(7,84,63,0.18)] transition-all duration-200 hover:bg-[#064735] hover:shadow-[0_10px_25px_rgba(7,84,63,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>
                        Memproses...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Masuk ke Sistem
                      </span>

                      <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}

                </button>

              </form>


              {/* SECURITY */}

              <div className="mt-8 flex items-center justify-center gap-2 text-center">

                <ShieldCheck
                  size={13}
                  strokeWidth={1.7}
                  className="text-emerald-600/60"
                />

                <span className="text-[9px] text-slate-400">
                  Akses aman dan terlindungi
                </span>

              </div>


              {/* BOTTOM */}

              <div className="mt-8 border-t border-slate-100 pt-5 text-center">

                <p className="text-[9px] leading-5 text-slate-300">
                  © 2026 Pondok Pesantren Terpadu Ulil Albab Al Islami
                  <br />
                  Sistem Informasi Akademik
                </p>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}