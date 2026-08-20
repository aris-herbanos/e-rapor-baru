'use client';

import { useEffect, useMemo, useState } from 'react';

type Subject = {
  id: number;
  name: string;
};

// Daftar referensi mapel standar pesantren
const DEFAULT_SUBJECTS = [
  'Bahasa Arab (اللغة العربية)',
  'Hadist (الحديث)',
  'Imla dan Khot (الإملاء والخط)',
  'Mahfudzot (المحفوظات)',
  "Muroja'ah (المراجعة)",
  'Nahwu / Sorof (النحو و الصرف)',
  'Pendidikan Agama Islam',
  'Pidato (الخطابة)',
  'Siroh Nabawiyah (السيرة النبوية)',
  'Tahfidz / Tahsin (تحفيظ القرآن)',
  'Tajwid (تجويد)',
  'Tsaqofah Islamiyah (الثقافة الإسلامية)',
];

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  // State form mapel dengan opsi dropdown & custom
  const [selectedSubjectOption, setSelectedSubjectOption] = useState('');
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const fetchSubjects = async () => {
    try {
      setLoadingSubjects(true);

      const res = await fetch('/api/subjects', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal memuat mata pelajaran.'
        );
      }

      setSubjects(Array.isArray(data) ? data : data?.data || []);
      setSelectedIds([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const finalName = isCustomMode ? customSubjectName.trim() : selectedSubjectOption;

    if (!finalName) {
      setMessage('Nama mata pelajaran wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      const url = editingId
        ? `/api/subjects/${editingId}`
        : '/api/subjects';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan mata pelajaran.'
        );
      }

      setMessage(
        editingId
          ? 'Sukses! Mata pelajaran berhasil diperbarui.'
          : 'Sukses! Mata pelajaran berhasil ditambahkan.'
      );

      setSelectedSubjectOption('');
      setCustomSubjectName('');
      setIsCustomMode(false);
      setEditingId(null);

      await fetchSubjects();
    } catch (err: any) {
      setMessage(
        err?.message || 'Terjadi kesalahan saat menyimpan.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingId(subject.id);
    
    if (DEFAULT_SUBJECTS.includes(subject.name)) {
      setSelectedSubjectOption(subject.name);
      setIsCustomMode(false);
      setCustomSubjectName('');
    } else {
      setIsCustomMode(true);
      setCustomSubjectName(subject.name);
      setSelectedSubjectOption('');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSelectedSubjectOption('');
    setCustomSubjectName('');
    setIsCustomMode(false);
  };

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        'Apakah Anda yakin ingin menghapus mata pelajaran ini?'
      )
    ) {
      return;
    }

    try {
      setMessage('');

      const res = await fetch(`/api/subjects/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menghapus mata pelajaran.'
        );
      }

      setMessage(
        'Sukses! Mata pelajaran berhasil dihapus.'
      );

      await fetchSubjects();
    } catch (err: any) {
      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menghapus.'
      );
    }
  };

  const handleSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedIds(subjects.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus ${selectedIds.length} mata pelajaran yang dipilih?`
      )
    ) {
      return;
    }

    try {
      setDeletingBulk(true);
      setMessage('');

      const res = await fetch(
        '/api/subjects/bulk-delete',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Gagal menghapus data terpilih.'
        );
      }

      setMessage(
        `Sukses! ${selectedIds.length} mata pelajaran berhasil dihapus.`
      );

      setSelectedIds([]);

      await fetchSubjects();
    } catch (err: any) {
      setMessage(
        err?.message ||
          'Terjadi kesalahan saat hapus massal.'
      );
    } finally {
      setDeletingBulk(false);
    }
  };

  const totalSubjects = subjects.length;
  const allSelected =
    subjects.length > 0 &&
    selectedIds.length === subjects.length;

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <header className="mb-5 flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <BookIcon />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  Mata Pelajaran
                </h1>

                <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                  Akademik
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Kelola daftar master mata pelajaran pesantren.
              </p>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Ulul Albab
            </div>
            <div className="mt-0.5 font-serif text-sm text-emerald-700">
              العلم نور
            </div>
          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        <div className="mb-5 flex flex-wrap items-center divide-x divide-slate-200 rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
          <MiniStat
            label="Total Mata Pelajaran"
            value={totalSubjects}
            icon={<BookIcon />}
          />

          <div className="flex min-w-[150px] flex-1 items-center gap-2 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckIcon />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-800">
                  Aktif
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>

              <div className="text-[9px] font-medium text-slate-400">
                Status sistem
              </div>
            </div>
          </div>
        </div>

        {/* ================= MESSAGE ================= */}
        {message && (
          <div
            className={`mb-5 flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs ${
              message.startsWith('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message.startsWith('Sukses') ? (
              <CheckIcon />
            ) : (
              <AlertIcon />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* ================= MAIN ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">

          {/* ================= FORM ================= */}
          <section className="h-fit rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.035)]">

            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  {editingId
                    ? 'Edit Mata Pelajaran'
                    : 'Tambah Mata Pelajaran'}
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  {editingId
                    ? 'Perbarui data yang dipilih.'
                    : 'Pilih atau ketik mata pelajaran.'}
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-[10px] font-semibold text-red-600 hover:text-red-700"
                >
                  Batal
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-4"
            >
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Nama Mata Pelajaran
                </label>

                {!isCustomMode ? (
                  <div className="space-y-2">
                    <select
                      value={selectedSubjectOption}
                      onChange={(e) =>
                        setSelectedSubjectOption(e.target.value)
                      }
                      required={!isCustomMode}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                    >
                      <option value="">-- Pilih Mata Pelajaran --</option>
                      {DEFAULT_SUBJECTS.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(true);
                        setSelectedSubjectOption('');
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      + Tambah Mapel Lain (Ketik Sendiri)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customSubjectName}
                      onChange={(e) =>
                        setCustomSubjectName(e.target.value)
                      }
                      required={isCustomMode}
                      placeholder="Ketik nama mapel baru..."
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(false);
                        setCustomSubjectName('');
                      }}
                      className="text-[11px] font-semibold text-slate-500 hover:underline"
                    >
                      ← Kembali ke pilihan standar
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <SpinnerIcon />
                ) : (
                  <PlusIcon />
                )}

                {editingId
                  ? 'Simpan Perubahan'
                  : 'Tambah Mata Pelajaran'}
              </button>
            </form>
          </section>

          {/* ================= LIST ================= */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.035)]">

            {/* LIST HEADER */}
            <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold text-slate-800">
                    Daftar Mata Pelajaran
                  </h2>

                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                    {totalSubjects}
                  </span>
                </div>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Data mata pelajaran yang tersedia.
                </p>
              </div>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  disabled={deletingBulk}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  <TrashIcon />

                  {deletingBulk
                    ? 'Menghapus...'
                    : `Hapus ${selectedIds.length} Terpilih`}
                </button>
              )}
            </div>

            {/* SELECT ALL */}
            {subjects.length > 0 && (
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">

                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (allSelected) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(
                        subjects.map((s) => s.id)
                      );
                    }
                  }}
                  className="text-[10px] font-semibold text-slate-500 hover:text-emerald-700"
                >
                  {allSelected
                    ? 'Batalkan Semua'
                    : `Pilih Semua (${subjects.length})`}
                </button>

                {selectedIds.length > 0 && (
                  <span className="ml-auto text-[9px] font-medium text-emerald-600">
                    {selectedIds.length} dipilih
                  </span>
                )}
              </div>
            )}

            {/* CONTENT */}
            <div className="p-3">

              {loadingSubjects ? (
                <LoadingState />
              ) : subjects.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">

                  {/* TABLE HEADER */}
                  <div className="hidden grid-cols-[40px_minmax(0,1fr)_90px] items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:grid">
                    <span>No</span>
                    <span>Mata Pelajaran</span>
                    <span className="text-right">
                      Aksi
                    </span>
                  </div>

                  {/* ROWS */}
                  <div className="divide-y divide-slate-100">
                    {subjects.map((subject, index) => {
                      const isChecked =
                        selectedIds.includes(
                          subject.id
                        );

                      return (
                        <div
                          key={subject.id}
                          className={`group grid grid-cols-1 gap-2 px-3 py-3 transition sm:grid-cols-[40px_minmax(0,1fr)_90px] sm:items-center sm:gap-3 ${
                            isChecked
                              ? 'bg-emerald-50/60'
                              : 'bg-white hover:bg-slate-50/70'
                          }`}
                        >

                          {/* NUMBER + CHECKBOX */}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleSelectOne(
                                  subject.id
                                )
                              }
                              className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />

                            <span className="text-[9px] font-bold text-slate-400">
                              {String(
                                index + 1
                              ).padStart(2, '0')}
                            </span>
                          </div>

                          {/* SUBJECT */}
                          <div className="min-w-0 pl-5 sm:pl-0">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate text-xs font-bold text-slate-800">
                                {subject.name}
                              </h3>

                              <span className="hidden shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold text-slate-400 sm:inline-block">
                                ID {subject.id}
                              </span>
                            </div>
                          </div>

                          {/* ACTION */}
                          <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(subject)
                              }
                              title="Edit"
                              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  subject.id
                                )
                              }
                              title="Hapus"
                              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-3 text-[9px] text-slate-400">
          <span>
            Sistem Akademik · Pondok Pesantren Terpadu Ulil Albab
          </span>

          <span className="hidden font-serif text-slate-500 sm:block">
            العلم نور
          </span>
        </footer>
      </div>
    </main>
  );
}

/* =====================================================
   MINI STAT
===================================================== */

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex min-w-[140px] flex-1 items-center gap-2.5 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </div>

      <div>
        <div className="text-sm font-bold leading-none text-slate-800">
          {value}
        </div>

        <div className="mt-1 text-[9px] font-medium text-slate-400">
          {label}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   LOADING
===================================================== */

function LoadingState() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="flex h-[54px] animate-pulse items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-3 last:border-0"
        >
          <div className="h-3 w-3 rounded bg-slate-200" />
          <div className="h-3 w-1/3 rounded bg-slate-200" />
          <div className="ml-auto h-3 w-24 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

/* =====================================================
   EMPTY
===================================================== */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <BookIcon />
      </div>

      <h3 className="text-xs font-bold text-slate-700">
        Belum ada mata pelajaran
      </h3>

      <p className="mt-1 max-w-xs text-[10px] leading-4 text-slate-400">
        Tambahkan mata pelajaran menggunakan
        formulir di sebelah kiri.
      </p>
    </div>
  );
}

/* =====================================================
   ICONS
===================================================== */

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7h8M8 10h6"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path strokeLinecap="round" d="M12 5v14" />
      <path strokeLinecap="round" d="M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12 4 4L19 6"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4M12 17h.01"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.3 3.8 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20h9"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />

      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}