'use client';

import { useEffect, useMemo, useState } from 'react';

type Subject = {
  id: number;
  name: string;
  teacherId?: number | null;
  teacher?: {
    id?: number;
    fullname?: string | null;
  } | null;
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  // State untuk Bulk Select (Hapus Massal)
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);
      const res = await fetch('/api/subjects', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal memuat mata pelajaran.');
      setSubjects(Array.isArray(data) ? data : []);
      setSelectedIds([]); // Reset pilihan saat data dimuat ulang
    } catch (err) {
      console.error(err);
      setMessage('Gagal memuat daftar mata pelajaran.');
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle Tambah atau Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!name.trim()) {
      setMessage('Nama mata pelajaran wajib diisi.');
      return;
    }
    if (!teacherId) {
      setMessage('ID pengajar wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      const url = editingId ? `/api/subjects/${editingId}` : '/api/subjects';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), teacherId: Number(teacherId) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan mata pelajaran.');

      setMessage(
        editingId
          ? 'Sukses! Mata pelajaran berhasil diperbarui.'
          : 'Sukses! Mata pelajaran berhasil ditambahkan.'
      );

      setName('');
      setTeacherId('');
      setEditingId(null);
      await fetchSubjects();
    } catch (err: any) {
      setMessage(err?.message || 'Terjadi kesalahan saat menyimpan.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingId(subject.id);
    setName(subject.name);
    setTeacherId(subject.teacherId ? String(subject.teacherId) : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setTeacherId('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) return;

    try {
      setMessage('');
      const res = await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus mata pelajaran.');

      setMessage('Sukses! Mata pelajaran berhasil dihapus.');
      await fetchSubjects();
    } catch (err: any) {
      setMessage(err?.message || 'Terjadi kesalahan saat menghapus.');
    }
  };

  // --- LOGIKA BULK SELECT & DELETE ---
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(subjects.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} mata pelajaran yang dipilih?`)) return;

    try {
      setDeletingBulk(true);
      setMessage('');
      const res = await fetch('/api/subjects/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus data terpilih.');

      setMessage(`Sukses! ${selectedIds.length} mata pelajaran berhasil dihapus.`);
      setSelectedIds([]);
      await fetchSubjects();
    } catch (err: any) {
      setMessage(err?.message || 'Terjadi kesalahan saat hapus massal.');
    } finally {
      setDeletingBulk(false);
    }
  };

  const totalSubjects = subjects.length;
  const totalTeachers = useMemo(() => {
    const ids = subjects
      .map((subject) => subject.teacherId)
      .filter((id): id is number => id !== null && id !== undefined);
    return new Set(ids).size;
  }, [subjects]);

  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute -left-40 top-[45%] h-[360px] w-[360px] rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <header className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-[0_12px_35px_rgba(6,95,70,0.18)] sm:px-8">
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                <BookIcon />
              </div>
              <div>
                <span className="rounded-full border border-emerald-300/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                  Akademik
                </span>
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl mt-1">
                  Mata Pelajaran
                </h1>
                <p className="mt-1 max-w-xl text-xs leading-5 text-emerald-50/80 sm:text-sm">
                  Kelola mata pelajaran dan pengajar dalam sistem akademik Pondok Pesantren Terpadu Ulul Albab.
                </p>
              </div>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">Ulul Albab</div>
              <div className="mt-1 font-serif text-lg text-white/90">العلم نور</div>
            </div>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Total Mapel" value={totalSubjects} icon={<BookIcon />} />
          <StatCard label="Pengajar" value={totalTeachers} icon={<TeacherIcon />} />
          <div className="col-span-2 sm:col-span-1">
            <StatCard label="Status Sistem" value="Aktif" icon={<CheckIcon />} green />
          </div>
        </section>

        {/* MESSAGE */}
        {message && (
          <div className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm ${
            message.startsWith('Sukses') ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'
          }`}>
            <div className="mt-0.5 shrink-0">{message.startsWith('Sukses') ? <CheckIcon /> : <AlertIcon />}</div>
            <div>
              <div className="font-semibold">{message.startsWith('Sukses') ? 'Berhasil' : 'Perhatian'}</div>
              <div className="mt-0.5 text-xs opacity-80">{message}</div>
            </div>
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          
          {/* FORM */}
          <section className="h-fit overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_25px_rgba(15,23,42,0.05)]">
            <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 to-white px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <PlusIcon />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      {editingId ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {editingId ? 'Perbarui data mapel terpilih.' : 'Tambahkan mapel baru ke sistem.'}
                    </p>
                  </div>
                </div>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} className="text-[11px] font-semibold text-red-600 hover:underline">
                    Batal
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Fiqih"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">ID Pengajar</label>
                <input
                  type="number"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                  placeholder="Contoh: 1"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />
                <p className="mt-1.5 text-[10px] text-slate-400">Masukkan ID guru/pengajar yang terdaftar.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60"
              >
                {loading ? <SpinnerIcon /> : <PlusIcon />}
                {editingId ? 'Simpan Perubahan' : 'Simpan Mata Pelajaran'}
              </button>
            </form>
          </section>

          {/* LIST DENGAN FITUR CENTANG & HAPUS MASSAL */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_25px_rgba(15,23,42,0.05)]">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">Daftar Mata Pelajaran</h2>
                    <p className="text-[11px] text-slate-400">{totalSubjects} mapel terdaftar</p>
                  </div>
                </div>

                {/* TOMBOL AKSI MASSAL (MUNCUL JIKA ADA YANG DICENTANG) */}
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={deletingBulk}
                    className="flex items-center gap-1.5 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 disabled:opacity-60"
                  >
                    <TrashIcon />
                    <span>Hapus Terpilih ({selectedIds.length})</span>
                  </button>
                )}
              </div>

              {/* BARIS PILIH SEMUA */}
              {subjects.length > 0 && (
                <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === subjects.length && subjects.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-600 cursor-pointer" onClick={() => {
                    if (selectedIds.length === subjects.length) setSelectedIds([]);
                    else setSelectedIds(subjects.map(s => s.id));
                  }}>
                    Pilih Semua ({subjects.length})
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5">
              {loadingSubjects ? (
                <LoadingState />
              ) : subjects.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  {subjects.map((subject, index) => {
                    const isChecked = selectedIds.includes(subject.id);
                    return (
                      <div
                        key={subject.id}
                        className={`group relative overflow-hidden rounded-xl border p-4 transition duration-200 ${
                          isChecked ? 'border-emerald-500 bg-emerald-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-200'
                        }`}
                      >
                        <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 opacity-70" />

                        <div className="flex items-start gap-3">
                          {/* CHECKBOX CENTANG */}
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(subject.id)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400">#{String(index + 1).padStart(2, '0')}</span>
                              <span className="rounded-lg bg-slate-50 px-2 py-0.5 text-[9px] font-bold text-slate-500 ring-1 ring-slate-100">
                                ID {subject.id}
                              </span>
                            </div>
                            <h3 className="truncate text-sm font-bold text-slate-800 mt-0.5">{subject.name}</h3>
                            <div className="mt-1 text-[10px] text-slate-500">
                              Pengampu: <span className="font-semibold text-emerald-700">{subject.teacher?.fullname || `Guru #${subject.teacherId}`}</span>
                            </div>
                          </div>
                        </div>

                        {/* TOMBOL EDIT & HAPUS SATUAN */}
                        <div className="mt-3 flex items-center justify-end gap-1.5 border-t border-slate-100 pt-2.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(subject)}
                            className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700 transition hover:bg-amber-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(subject.id)}
                            className="rounded-lg bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-200/70 pt-4 text-[10px] text-slate-400 sm:flex-row">
          <span>Sistem Akademik · Pondok Pesantren Terpadu Ulul Albab</span>
          <span className="font-serif text-slate-500">العلم نور</span>
        </footer>
      </div>
    </main>
  );
}

// Komponen Pendukung (StatCard, Loading, Empty, Icons) tetap sama seperti sebelumnya...
function StatCard({ label, value, icon, green = false }: { label: string; value: number | string; icon: React.ReactNode; green?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${green ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
          {icon}
        </div>
        {green && <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Online</span>}
      </div>
      <div className="mt-3">
        <div className="text-xl font-bold tracking-tight text-slate-800">{value}</div>
        <div className="mt-0.5 text-[10px] font-medium text-slate-400">{label}</div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="animate-pulse rounded-xl border border-slate-200 p-4 h-24 bg-slate-50" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center">
      <h3 className="text-sm font-bold text-slate-700">Belum ada mata pelajaran</h3>
      <p className="mt-1 text-[11px] text-slate-400">Tambahkan mata pelajaran menggunakan formulir di sebelah kiri.</p>
    </div>
  );
}

function BookIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 10h6"/></svg>; }
function TeacherIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><circle cx="12" cy="8" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 20a7 7 0 0 1 14 0"/></svg>; }
function PlusIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>; }
function CheckIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6"/></svg>; }
function AlertIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01"/><path strokeLinecap="round" strokeLinejoin="round" d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"/></svg>; }
function TrashIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>; }
function SpinnerIcon() { return <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>; }