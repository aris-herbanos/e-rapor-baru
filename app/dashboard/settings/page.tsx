'use client';

import { useState, useEffect } from 'react';

import {
  Settings,
  School,
  CalendarDays,
  UserRound,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('Ganjil');
  const [principalName, setPrincipalName] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSchoolName(data.schoolName || '');
          setAcademicYear(data.academicYear || '');
          setSemester(data.semester || 'Ganjil');
          setPrincipalName(data.principalName || '');
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Gagal memuat pengaturan sistem.');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName,
          academicYear,
          semester,
          principalName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan pengaturan'
        );
      }

      setMessage(
        'Sukses! Pengaturan sistem berhasil diperbarui.'
      );
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.includes('Sukses');

  return (
    <div className="min-h-screen bg-[#f5f8f6]">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            PAGE HEADER
        ==================================================== */}

        <div className="mb-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              {/* ICON */}

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07543f] shadow-lg shadow-emerald-900/10">

                  <Settings
                    size={25}
                    strokeWidth={1.7}
                    className="text-emerald-100"
                  />

                </div>

                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#f5f8f6] bg-amber-400">

                  <Sparkles
                    size={10}
                    className="text-white"
                    strokeWidth={2}
                  />

                </div>

              </div>


              {/* TITLE */}

              <div>

                <div className="mb-1 flex items-center gap-2">

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700/60">
                    Sistem
                  </span>

                  <span className="h-1 w-1 rounded-full bg-amber-400" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                    Konfigurasi
                  </span>

                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-[27px]">
                  Pengaturan Sistem
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Kelola identitas lembaga dan konfigurasi akademik.
                </p>

              </div>

            </div>


            {/* STATUS */}

            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 shadow-sm sm:flex">

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">

                <ShieldCheck
                  size={14}
                  className="text-emerald-600"
                  strokeWidth={1.8}
                />

              </span>

              <div>

                <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </div>

                <div className="text-[11px] font-semibold text-emerald-700">
                  Sistem Aktif
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            BISMILLAH CARD
        ==================================================== */}

        <div className="relative mb-6 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-[#063c30] to-[#07543f] px-5 py-5 shadow-sm sm:px-6">

          {/* Decorative circles */}

          <div className="pointer-events-none absolute -right-8 -top-16 h-40 w-40 rounded-full border border-white/5" />

          <div className="pointer-events-none absolute -right-2 -top-10 h-28 w-28 rounded-full border border-amber-200/5" />

          <div className="relative flex items-center justify-between gap-5">

            <div>

              <div
                dir="rtl"
                className="font-serif text-lg leading-relaxed text-amber-100/90"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </div>

              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-100/40">
                Pondok Pesantren Terpadu Ulul Albab
              </p>

            </div>

            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:flex">

              <BookOpen
                size={20}
                strokeWidth={1.5}
                className="text-amber-200/70"
              />

            </div>

          </div>

        </div>


        {/* ===================================================
            MESSAGE
        ==================================================== */}

        {message && (
          <div
            className={[
              'mb-6 flex items-start gap-3 rounded-xl border px-4 py-3.5',
              isSuccess
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >

            <div className="mt-0.5 shrink-0">

              {isSuccess ? (
                <CheckCircle2
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <AlertCircle
                  size={17}
                  strokeWidth={1.8}
                />
              )}

            </div>

            <div className="text-sm font-medium">
              {message}
            </div>

          </div>
        )}


        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_290px]">


            {/* =================================================
                LEFT — FORM
            ================================================== */}

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

              {/* FORM HEADER */}

              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">

                    <School
                      size={19}
                      strokeWidth={1.7}
                      className="text-emerald-700"
                    />

                  </div>

                  <div>

                    <h2 className="text-sm font-bold text-slate-800">
                      Identitas Lembaga
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Informasi utama lembaga pendidikan.
                    </p>

                  </div>

                </div>

              </div>


              {/* FORM BODY */}

              <div className="space-y-5 p-5 sm:p-6">

                {/* SCHOOL NAME */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Nama Lembaga / Pondok Pesantren
                  </label>

                  <div className="relative">

                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">

                      <School
                        size={16}
                        strokeWidth={1.7}
                        className="text-slate-400"
                      />

                    </div>

                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) =>
                        setSchoolName(e.target.value)
                      }
                      required
                      placeholder="Contoh: Pondok Pesantren Terpadu Ulul Albab"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Nama ini akan digunakan pada halaman dan dokumen rapor.
                  </p>

                </div>


                {/* ACADEMIC */}

                <div className="border-t border-slate-100 pt-5">

                  <div className="mb-4 flex items-center gap-2">

                    <CalendarDays
                      size={16}
                      strokeWidth={1.7}
                      className="text-emerald-600"
                    />

                    <span className="text-xs font-bold text-slate-700">
                      Konfigurasi Akademik
                    </span>

                  </div>


                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    {/* YEAR */}

                    <div>

                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Tahun Ajaran Aktif
                      </label>

                      <div className="relative">

                        <CalendarDays
                          size={15}
                          strokeWidth={1.7}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          value={academicYear}
                          onChange={(e) =>
                            setAcademicYear(e.target.value)
                          }
                          required
                          placeholder="2026/2027"
                          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />

                      </div>

                    </div>


                    {/* SEMESTER */}

                    <div>

                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Semester
                      </label>

                      <div className="relative">

                        <BookOpen
                          size={15}
                          strokeWidth={1.7}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          value={semester}
                          onChange={(e) =>
                            setSemester(e.target.value)
                          }
                          className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-9 text-sm text-slate-800 outline-none transition hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        >
                          <option value="Ganjil">
                            Semester Ganjil
                          </option>

                          <option value="Genap">
                            Semester Genap
                          </option>

                        </select>

                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>

                      </div>

                    </div>

                  </div>

                </div>


                {/* PRINCIPAL */}

                <div className="border-t border-slate-100 pt-5">

                  <div className="mb-4 flex items-center gap-2">

                    <UserRound
                      size={16}
                      strokeWidth={1.7}
                      className="text-emerald-600"
                    />

                    <span className="text-xs font-bold text-slate-700">
                      Pimpinan Lembaga
                    </span>

                  </div>


                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Nama Pimpinan / Mudir Pesantren
                  </label>

                  <div className="relative">

                    <UserRound
                      size={16}
                      strokeWidth={1.7}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={principalName}
                      onChange={(e) =>
                        setPrincipalName(e.target.value)
                      }
                      required
                      placeholder="Masukkan nama pimpinan"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 hover:border-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                </div>

              </div>


              {/* FORM FOOTER */}

              <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={15}
                    strokeWidth={1.7}
                    className="text-emerald-600"
                  />

                  <span className="text-[10px] text-slate-400">
                    Data pengaturan tersimpan di sistem.
                  </span>

                </div>


                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#07543f] px-5 text-xs font-semibold text-white shadow-sm shadow-emerald-900/10 transition hover:bg-[#064534] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save
                        size={15}
                        strokeWidth={1.8}
                      />

                      Simpan Pengaturan
                    </>
                  )}

                </button>

              </div>

            </div>


            {/* =================================================
                RIGHT — INFO CARD
            ================================================== */}

            <div className="space-y-5">


              {/* PREVIEW */}

              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

                <div className="bg-[#07543f] px-5 py-5">

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">

                    <School
                      size={20}
                      strokeWidth={1.6}
                      className="text-emerald-100"
                    />

                  </div>

                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-200/50">
                    Identitas Lembaga
                  </div>

                  <div className="mt-1 line-clamp-2 text-sm font-semibold leading-relaxed text-white">
                    {schoolName || 'Nama Lembaga'}
                  </div>

                </div>


                <div className="space-y-4 p-5">

                  <div>

                    <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      Tahun Ajaran
                    </div>

                    <div className="mt-1 text-xs font-semibold text-slate-700">
                      {academicYear || 'Belum diatur'}
                    </div>

                  </div>


                  <div className="h-px bg-slate-100" />


                  <div>

                    <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      Semester
                    </div>

                    <div className="mt-1 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      {semester}
                    </div>

                  </div>


                  <div className="h-px bg-slate-100" />


                  <div>

                    <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      Pimpinan / Mudir
                    </div>

                    <div className="mt-1 line-clamp-2 text-xs font-semibold text-slate-700">
                      {principalName || 'Belum diatur'}
                    </div>

                  </div>

                </div>

              </div>


              {/* TIP */}

              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">

                    <Sparkles
                      size={16}
                      strokeWidth={1.7}
                      className="text-amber-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-xs font-bold text-slate-700">
                      Catatan
                    </h3>

                    <p className="mt-1.5 text-[10px] leading-relaxed text-slate-500">
                      Pastikan tahun ajaran, semester, dan nama
                      pimpinan sudah sesuai sebelum digunakan untuk
                      pencetakan rapor santri.
                    </p>

                  </div>

                </div>

              </div>


              {/* ISLAMIC DETAIL */}

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-center">

                <div
                  dir="rtl"
                  className="font-serif text-base text-emerald-800/70"
                >
                  وَقُلْ رَبِّ زِدْنِي عِلْمًا
                </div>

                <div className="mt-1 text-[9px] font-medium text-emerald-700/50">
                  “Ya Tuhanku, tambahkanlah kepadaku ilmu.”
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-wide text-slate-400">
                  QS. Taha: 114
                </div>

              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}