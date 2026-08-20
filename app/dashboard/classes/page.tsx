'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Plus,
  School,
  Users,
  Layers3,
  ChevronDown,
} from 'lucide-react';

type ClassRoom = {
  id: number;
  name: string;
  level: string;
  grade: number;
  status?: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);

  const [name, setName] = useState('');
  const [level, setLevel] = useState('SMP');
  const [grade, setGrade] = useState('7');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  /* ============================================================
     FETCH DATA
  ============================================================ */

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal memuat kelas');
      }

      if (Array.isArray(data)) {
        setClasses(data);
      }
    } catch (error) {
      console.error('FETCH CLASSES ERROR:', error);
      setMessage('Gagal memuat daftar kelas.');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage('Nama kelas wajib diisi.');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim().toUpperCase(),
          level,
          grade: Number(grade),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal menyimpan kelas');
      }

      setMessage('Kelas berhasil ditambahkan.');

      setName('');
      setLevel('SMP');
      setGrade('7');

      await fetchClasses();
    } catch (error: any) {
      setMessage(error.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     SORT & GROUP
  ============================================================ */

  const groupedClasses = useMemo(() => {
    return {
      SMP: [...classes]
        .filter((item) => item.level === 'SMP')
        .sort(
          (a, b) =>
            a.grade - b.grade ||
            a.name.localeCompare(b.name)
        ),

      SMA: [...classes]
        .filter((item) => item.level === 'SMA')
        .sort(
          (a, b) =>
            a.grade - b.grade ||
            a.name.localeCompare(b.name)
        ),
    };
  }, [classes]);

  const activeClasses = classes.filter(
    (item) => item.status !== 'Tidak Aktif'
  ).length;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-slate-800">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="border-b border-slate-200/70 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">

                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50">
                  <School size={13} strokeWidth={1.8} />
                </span>

                <span>Data Master</span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
                Manajemen Kelas
              </h1>

              <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Kelola struktur kelas santri berdasarkan jenjang dan
                tingkat pendidikan.
              </p>

            </div>

            {/* SUMMARY */}

            <div className="flex items-center gap-5 border-t border-slate-100 pt-4 sm:border-0 sm:pt-0">

              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Layers3 size={15} />
                </div>

                <div>
                  <div className="text-base font-semibold text-slate-800">
                    {classes.length}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">
                    Total Kelas
                  </div>
                </div>

              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <CheckCircle2 size={15} />
                </div>

                <div>
                  <div className="text-base font-semibold text-slate-800">
                    {activeClasses}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">
                    Kelas Aktif
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ======================================================
            MESSAGE
        ======================================================= */}

        {message && (
          <div
            className={[
              'mb-5 flex items-center gap-2.5 border-b px-1 pb-3 text-xs',
              message.includes('berhasil')
                ? 'border-emerald-200 text-emerald-700'
                : 'border-red-200 text-red-600',
            ].join(' ')}
          >

            {message.includes('berhasil') && (
              <CheckCircle2 size={15} />
            )}

            <span>{message}</span>

          </div>
        )}

        {/* ======================================================
            CONTENT
        ======================================================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* ====================================================
              FORM
          ==================================================== */}

          <section className="lg:border-r lg:border-slate-200 lg:pr-7">

            <div className="mb-5">

              <div className="flex items-center gap-2">

                <Plus
                  size={17}
                  strokeWidth={1.8}
                  className="text-emerald-700"
                />

                <h2 className="text-sm font-semibold text-slate-900">
                  Tambah Kelas
                </h2>

              </div>

              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                Buat struktur kelas baru untuk tahun pelajaran berjalan.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAMA */}

              <div>

                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Nama Kelas
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: 7A"
                  className="h-10 w-full border-b border-slate-200 bg-transparent px-0 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-600"
                />

              </div>

              {/* JENJANG */}

              <div>

                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Jenjang
                </label>

                <div className="relative">

                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="h-10 w-full appearance-none border-b border-slate-200 bg-transparent px-0 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-600"
                  >
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-0 top-3 text-slate-400"
                  />

                </div>

              </div>

              {/* TINGKAT */}

              <div>

                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Tingkat
                </label>

                <div className="relative">

                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="h-10 w-full appearance-none border-b border-slate-200 bg-transparent px-0 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-600"
                  >
                    {['7', '8', '9', '10', '11', '12'].map(
                      (item) => (
                        <option key={item} value={item}>
                          Tingkat {item}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-0 top-3 text-slate-400"
                  />

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#07543f] text-xs font-semibold text-white shadow-sm transition hover:bg-[#064633] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Plus size={15} strokeWidth={2} />

                {loading ? 'Menyimpan...' : 'Simpan Kelas'}

              </button>

            </form>

            {/* INFO */}

            <div className="mt-7 border-t border-slate-100 pt-5">

              <div className="flex gap-2.5">

                <BookOpen
                  size={14}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-[10px] leading-5 text-slate-400">
                  Pastikan nama kelas dibuat konsisten karena akan
                  digunakan pada penilaian, rapor, wali kelas,
                  dan proses kenaikan kelas.
                </p>

              </div>

            </div>

          </section>

          {/* ====================================================
              LIST
          ==================================================== */}

          <section className="min-w-0">

            {/* LIST HEADER */}

            <div className="mb-5 flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <GraduationCap
                    size={17}
                    strokeWidth={1.8}
                    className="text-emerald-700"
                  />

                  <h2 className="text-sm font-semibold text-slate-900">
                    Daftar Kelas
                  </h2>

                </div>

                <p className="mt-1 text-[11px] text-slate-400">
                  {classes.length} kelas terdaftar dalam sistem
                </p>

              </div>

            </div>

            {/* EMPTY */}

            {classes.length === 0 ? (

              <div className="border-y border-dashed border-slate-200 py-14 text-center">

                <School
                  size={30}
                  strokeWidth={1.3}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="text-sm font-medium text-slate-500">
                  Belum ada kelas
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Tambahkan kelas menggunakan formulir di sebelah kiri.
                </p>

              </div>

            ) : (

              <div className="space-y-8">

                {(['SMP', 'SMA'] as const).map(
                  (levelName) => {

                    const levelClasses =
                      groupedClasses[levelName];

                    if (levelClasses.length === 0) {
                      return null;
                    }

                    return (

                      <section key={levelName}>

                        {/* LEVEL HEADER */}

                        <div className="mb-2 flex items-center gap-3">

                          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                            {levelName}
                          </span>

                          <div className="h-px flex-1 bg-gradient-to-r from-emerald-200/70 via-slate-200 to-transparent" />

                          <span className="text-[10px] text-slate-400">
                            {levelClasses.length} kelas
                          </span>

                        </div>

                        {/* TABLE HEADER */}

                        <div className="hidden grid-cols-[70px_1fr_130px_100px] gap-4 border-b border-slate-200 px-3 py-2.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:grid">

                          <span>Tingkat</span>

                          <span>Nama Kelas</span>

                          <span>Status</span>

                          <span className="text-right">
                            Santri
                          </span>

                        </div>

                        {/* ROWS */}

                        <div>

                          {levelClasses.map((cls, index) => {

                            const active =
                              cls.status !== 'Tidak Aktif';

                            return (

                              <div
                                key={cls.id}
                                className="group grid grid-cols-1 gap-3 border-b border-slate-100 px-3 py-3.5 transition hover:bg-emerald-50/40 sm:grid-cols-[70px_1fr_130px_100px] sm:items-center sm:gap-4"
                              >

                                {/* GRADE */}

                                <div className="flex items-center gap-2 sm:block">

                                  <span className="text-[10px] text-slate-400 sm:hidden">
                                    Tingkat
                                  </span>

                                  <span className="text-xs font-semibold text-slate-600">
                                    {cls.grade}
                                  </span>

                                </div>

                                {/* NAME */}

                                <div className="flex min-w-0 items-center gap-3">

                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">

                                    <School
                                      size={14}
                                      strokeWidth={1.7}
                                    />

                                  </div>

                                  <div className="min-w-0">

                                    <div className="truncate text-sm font-semibold text-slate-800">
                                      {cls.name}
                                    </div>

                                    <div className="mt-0.5 text-[9px] text-slate-400">
                                      {levelName} · Tingkat {cls.grade}
                                    </div>

                                  </div>

                                </div>

                                {/* STATUS */}

                                <div className="flex items-center gap-2">

                                  <span
                                    className={[
                                      'h-1.5 w-1.5 rounded-full',
                                      active
                                        ? 'bg-emerald-500'
                                        : 'bg-slate-300',
                                    ].join(' ')}
                                  />

                                  <span
                                    className={[
                                      'text-[10px] font-medium',
                                      active
                                        ? 'text-emerald-700'
                                        : 'text-slate-400',
                                    ].join(' ')}
                                  >
                                    {active
                                      ? 'Aktif'
                                      : 'Tidak Aktif'}
                                  </span>

                                </div>

                                {/* STUDENT */}

                                <div className="hidden items-center justify-end gap-1.5 text-[10px] text-slate-400 sm:flex">

                                  <Users size={13} />

                                  <span>
                                    Belum ditentukan
                                  </span>

                                </div>

                              </div>

                            );
                          })}

                        </div>

                      </section>

                    );
                  }
                )}

              </div>

            )}

          </section>

        </div>

      </main>

      {/* ========================================================
          DECORATIVE ISLAMIC ACCENT
      ======================================================== */}

      <div className="pointer-events-none fixed bottom-0 right-0 -z-0 hidden h-64 w-64 overflow-hidden opacity-[0.035] lg:block">

        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border-[18px] border-emerald-700" />

        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full border-[10px] border-emerald-700" />

      </div>

    </div>
  );
}