'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Plus,
  School,
  Users,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      setMessage('Sukses! Kelas berhasil ditambahkan.');

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

  const groupedClasses = {
    SMP: classes.filter((item) => item.level === 'SMP'),
    SMA: classes.filter((item) => item.level === 'SMA'),
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* HEADER */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
            <School size={15} />
            <span>Data Master</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
            Manajemen Kelas
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola data kelas santri Pondok Pesantren Terpadu Ulul Albab.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={[
              'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
              message.includes('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >
            {message.includes('Sukses') && (
              <CheckCircle2 size={16} />
            )}

            <span>{message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">

          {/* FORM */}
          <div className="h-fit rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Plus size={19} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Tambah Kelas
                </h2>

                <p className="text-xs text-slate-400">
                  Tambahkan kelas baru
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Nama Kelas
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: 7A"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Jenjang
                </label>

                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                >
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Tingkat
                </label>

                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                >
                  {['7', '8', '9', '10', '11', '12'].map((item) => (
                    <option key={item} value={item}>
                      Tingkat {item}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#07543f] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#064633] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={16} />

                {loading ? 'Menyimpan...' : 'Simpan Kelas'}
              </button>

            </form>
          </div>

          {/* LIST KELAS */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  Daftar Kelas
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {classes.length} kelas terdaftar
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <GraduationCap size={17} />
              </div>

            </div>

            {classes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
                <School
                  size={30}
                  className="mx-auto mb-3 text-slate-300"
                />

                <p className="text-sm font-medium text-slate-500">
                  Belum ada data kelas
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Tambahkan kelas melalui formulir di sebelah kiri.
                </p>
              </div>
            ) : (
              <div className="space-y-7">

                {(['SMP', 'SMA'] as const).map((levelName) => {

                  const levelClasses = groupedClasses[levelName];

                  if (levelClasses.length === 0) {
                    return null;
                  }

                  return (
                    <div key={levelName}>

                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {levelName}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

                        {levelClasses
                          .sort((a, b) => a.grade - b.grade || a.name.localeCompare(b.name))
                          .map((cls) => (

                            <div
                              key={cls.id}
                              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
                            >

                              <div className="flex items-start justify-between">

                                <div>

                                  <div className="text-lg font-semibold tracking-tight text-slate-800">
                                    {cls.name}
                                  </div>

                                  <div className="mt-1 text-[11px] text-slate-400">
                                    Tingkat {cls.grade}
                                  </div>

                                </div>

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                                  <Users size={15} />
                                </div>

                              </div>

                              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                                <span className="text-[11px] text-slate-400">
                                  Wali: Belum ditentukan
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                                  <CheckCircle2 size={11} />
                                  Aktif
                                </span>

                              </div>

                            </div>

                          ))}

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}