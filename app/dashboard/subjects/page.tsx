
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode, ChangeEvent } from 'react';

type Subject = {
  id: number;
  name: string;
  level?: string;
};

/* ============================================================
   DAFTAR MAPEL STANDAR

   Nama dibuat sama dengan nama mapel yang digunakan
   pada halaman input penilaian dan laporan rapor.

   Jangan menambahkan keterangan bahasa Arab dalam kurung
   agar pencocokan nama mapel tetap konsisten.
============================================================ */

const SUBJECTS_BY_LEVEL: Record<'SMP' | 'SMA', string[]> = {
  SMP: [
    'Bahasa Arab',
    'Fiqih',
    'Hadis',
    'Imla dan Khot',
    'Mahfudzot',
    'Muroja\'ah',
    'Nahwu / Sorof',
    'Pendidikan Agama Islam',
    'Pidato',
    'Siroh Nabawiyah',
    'Tahfidz / Tahsin',
    'Tajwid',
    'Tsaqofah Islamiyah',
  ],

  SMA: [
    'Balaghoh & Adab',
    'Fiqih Muqoron',
    'Muhadatsah',
    'Muroja\'ah Lanjutan',
    'Mustholah Hadis',
    'Nahwu & Sorof Lanjutan',
    'Pidato & Debat',
    'Tahfidz / Tahsin',
    'Tajwid',
    'Tarikh Islam',
    'Tauhid & Aqidah',
    'Ulumul Quran',
    'Ushul Fiqih',
  ],
};

/* ============================================================
   HELPER
============================================================ */

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

async function readResponse(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function SubjectsPage() {
  const [activeTabLevel, setActiveTabLevel] =
    useState<'SMP' | 'SMA'>('SMP');

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedSubjectOption, setSelectedSubjectOption] =
    useState('');

  const [customSubjectName, setCustomSubjectName] =
    useState('');

  const [isCustomMode, setIsCustomMode] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  /* ============================================================
     PILIHAN MAPEL BERDASARKAN JENJANG

     Mapel yang sudah terdaftar tidak ditampilkan lagi
     sebagai pilihan tambah baru.
  ============================================================ */

  const defaultSubjects = SUBJECTS_BY_LEVEL[activeTabLevel];

  const availableDefaultSubjects = useMemo(() => {
    const registeredNames = new Set(
      subjects.map((subject) => normalizeText(subject.name))
    );

    return defaultSubjects.filter((name) => {
      // Saat edit, tetap izinkan nama mapel yang sedang diedit.
      const currentEditingSubject = subjects.find(
        (subject) => subject.id === editingId
      );

      if (
        currentEditingSubject &&
        normalizeText(currentEditingSubject.name) === normalizeText(name)
      ) {
        return true;
      }

      return !registeredNames.has(normalizeText(name));
    });
  }, [defaultSubjects, subjects, editingId]);

  /* ============================================================
     LOAD DATA MAPEL

     API:
     GET /api/subjects?level=SMP
     GET /api/subjects?level=SMA

     Mendukung response:
     { success: true, data: [...] }
     maupun response array langsung.
  ============================================================ */

  const fetchSubjects = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoadingSubjects(true);

        const res = await fetch(
          `/api/subjects?level=${activeTabLevel}`,
          {
            method: 'GET',
            cache: 'no-store',
            signal,
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const data = await readResponse(res);

        if (!res.ok || data.success === false) {
          throw new Error(
            data.message || 'Gagal memuat mata pelajaran.'
          );
        }

        const subjectData = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : [];

        // Pastikan data yang ditampilkan sesuai jenjang aktif.
        const filteredSubjects: Subject[] = subjectData.filter(
          (subject: Subject) => {
            if (!subject || typeof subject.id !== 'number') {
              return false;
            }

            if (!subject.name) {
              return false;
            }

            return (
              normalizeText(subject.level) ===
              normalizeText(activeTabLevel)
            );
          }
        );

        setSubjects(filteredSubjects);
        setSelectedIds((previous) =>
          previous.filter((id) =>
            filteredSubjects.some((subject) => subject.id === id)
          )
        );
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        console.error('FETCH SUBJECTS ERROR:', error);
        setSubjects([]);
        setMessage(
          error instanceof Error
            ? error.message
            : 'Gagal memuat daftar mata pelajaran.'
        );
      } finally {
        if (!signal?.aborted) {
          setLoadingSubjects(false);
        }
      }
    },
    [activeTabLevel]
  );

  useEffect(() => {
    const controller = new AbortController();

    setSelectedIds([]);
    setEditingId(null);
    setSelectedSubjectOption('');
    setCustomSubjectName('');
    setIsCustomMode(false);
    setMessage('');

    fetchSubjects(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchSubjects]);

  /* ============================================================
     RESET FORM
  ============================================================ */

  const resetForm = () => {
    setEditingId(null);
    setSelectedSubjectOption('');
    setCustomSubjectName('');
    setIsCustomMode(false);
  };

  /* ============================================================
     GANTI JENJANG
  ============================================================ */

  const handleChangeLevel = (level: 'SMP' | 'SMA') => {
    if (level === activeTabLevel) return;

    setActiveTabLevel(level);
    setSelectedIds([]);
    setMessage('');
    resetForm();
  };

  /* ============================================================
     SIMPAN / UPDATE MAPEL
  ============================================================ */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    const finalName = (
      isCustomMode ? customSubjectName : selectedSubjectOption
    )
      .trim()
      .replace(/\s+/g, ' ');

    if (!finalName) {
      setMessage('Nama mata pelajaran wajib diisi.');
      return;
    }

    if (finalName.length > 100) {
      setMessage('Nama mata pelajaran maksimal 100 karakter.');
      return;
    }

    // Cek duplikat di sisi frontend.
    const duplicate = subjects.find(
      (subject) =>
        normalizeText(subject.name) === normalizeText(finalName) &&
        subject.id !== editingId
    );

    if (duplicate) {
      setMessage(
        `Mata pelajaran "${duplicate.name}" sudah terdaftar pada jenjang ${activeTabLevel}.`
      );
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
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: finalName,
          level: activeTabLevel,
        }),
      });

      const data = await readResponse(res);

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message || 'Gagal menyimpan mata pelajaran.'
        );
      }

      setMessage(
        editingId
          ? 'Sukses! Mata pelajaran berhasil diperbarui.'
          : 'Sukses! Mata pelajaran berhasil ditambahkan.'
      );

      resetForm();
      await fetchSubjects();
    } catch (error) {
      console.error('SAVE SUBJECT ERROR:', error);

      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     EDIT MAPEL
  ============================================================ */

  const handleEdit = (subject: Subject) => {
    setEditingId(subject.id);
    setMessage('');

    const matchingDefault = defaultSubjects.find(
      (name) => normalizeText(name) === normalizeText(subject.name)
    );

    if (matchingDefault) {
      setSelectedSubjectOption(matchingDefault);
      setCustomSubjectName('');
      setIsCustomMode(false);
    } else {
      // Data lama atau nama khusus tetap bisa diedit.
      setIsCustomMode(true);
      setCustomSubjectName(subject.name);
      setSelectedSubjectOption('');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* ============================================================
     HAPUS SATU MAPEL
  ============================================================ */

  const handleDelete = async (id: number) => {
    const subject = subjects.find((item) => item.id === id);

    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus mata pelajaran "${subject?.name ?? ''}"?`
      )
    ) {
      return;
    }

    try {
      setMessage('');

      const res = await fetch(`/api/subjects/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await readResponse(res);

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message || 'Gagal menghapus mata pelajaran.'
        );
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage('Sukses! Mata pelajaran berhasil dihapus.');

      await fetchSubjects();
    } catch (error) {
      console.error('DELETE SUBJECT ERROR:', error);

      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menghapus.'
      );
    }
  };

  /* ============================================================
     PILIH DATA
  ============================================================ */

  const handleSelectAll = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedIds(subjects.map((subject) => subject.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  /* ============================================================
     HAPUS MASSAL
  ============================================================ */

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

      const res = await fetch('/api/subjects/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });

      const data = await readResponse(res);

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message || 'Gagal menghapus data terpilih.'
        );
      }

      const deletedCount = selectedIds.length;

      setSelectedIds([]);
      setMessage(
        `Sukses! ${deletedCount} mata pelajaran berhasil dihapus.`
      );

      await fetchSubjects();
    } catch (error) {
      console.error('BULK DELETE ERROR:', error);

      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat hapus massal.'
      );
    } finally {
      setDeletingBulk(false);
    }
  };

  /* ============================================================
     SUMMARY
  ============================================================ */

  const totalSubjects = subjects.length;

  const allSelected =
    subjects.length > 0 &&
    selectedIds.length === subjects.length;

  const isSuccessMessage = message.startsWith('Sukses');

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <header className="mb-5 flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <BookIcon />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  Mata Pelajaran ({activeTabLevel})
                </h1>

                <span className="hidden rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                  Akademik
                </span>
              </div>

              <p className="mt-0.5 text-[11px] text-slate-500">
                Kelola daftar master mata pelajaran berdasarkan jenjang.
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

        {/* TAB JENJANG */}
        <div className="mb-5 flex max-w-xs rounded-2xl bg-slate-200/70 p-1.5 shadow-inner">
          <button
            type="button"
            onClick={() => handleChangeLevel('SMP')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
              activeTabLevel === 'SMP'
                ? 'bg-[#064e3b] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 Jenjang SMP
          </button>

          <button
            type="button"
            onClick={() => handleChangeLevel('SMA')}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
              activeTabLevel === 'SMA'
                ? 'bg-[#064e3b] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 Jenjang SMA
          </button>
        </div>

        {/* INFO JENJANG */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <CheckIcon />
            <p className="text-[11px] font-medium text-emerald-800">
              Anda sedang mengelola mata pelajaran jenjang {activeTabLevel}.
            </p>
          </div>

          <span className="text-[10px] font-semibold text-emerald-700">
            {defaultSubjects.length} pilihan standar
          </span>
        </div>

        {/* SUMMARY */}
        <div className="mb-5 flex flex-wrap items-center divide-x divide-slate-200 rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]">
          <MiniStat
            label={`Total Mapel (${activeTabLevel})`}
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

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-5 flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs ${
              isSuccessMessage
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {isSuccessMessage ? <CheckIcon /> : <AlertIcon />}
            <span>{message}</span>
          </div>
        )}

        {/* MAIN */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">

          {/* FORM */}
          <section className="h-fit rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.035)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  {editingId
                    ? 'Edit Mata Pelajaran'
                    : `Tambah Mapel (${activeTabLevel})`}
                </h2>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  {editingId
                    ? 'Perbarui data mata pelajaran.'
                    : 'Pilih mapel sesuai jenjang.'}
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[10px] font-semibold text-red-600 hover:text-red-700"
                >
                  Batal
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Nama Mata Pelajaran ({activeTabLevel})
                </label>

                {!isCustomMode ? (
                  <div className="space-y-2">
                    <select
                      value={selectedSubjectOption}
                      onChange={(e) =>
                        setSelectedSubjectOption(e.target.value)
                      }
                      required
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-3 focus:ring-emerald-500/10"
                    >
                      <option value="">
                        -- Pilih Mapel {activeTabLevel} --
                      </option>

                      {availableDefaultSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>

                    {availableDefaultSubjects.length === 0 && (
                      <p className="text-[10px] text-amber-600">
                        Semua pilihan mapel standar sudah terdaftar.
                        Gunakan pilihan tambah mapel khusus jika diperlukan.
                      </p>
                    )}

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
                      required
                      maxLength={100}
                      placeholder="Ketik nama mapel..."
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

              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-[10px] leading-4 text-slate-500">
                  Jenjang penyimpanan:
                  <strong className="ml-1 text-emerald-700">
                    {activeTabLevel}
                  </strong>
                </p>
                <p className="mt-0.5 text-[9px] leading-4 text-slate-400">
                  Mapel yang disimpan di sini akan digunakan pada input penilaian
                  untuk jenjang yang sama.
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  (!isCustomMode && availableDefaultSubjects.length === 0 &&
                    !selectedSubjectOption)
                }
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <SpinnerIcon /> : <PlusIcon />}

                {loading
                  ? 'Menyimpan...'
                  : editingId
                    ? 'Simpan Perubahan'
                    : 'Tambah Mata Pelajaran'}
              </button>
            </form>
          </section>

          {/* LIST */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_3px_16px_rgba(15,23,42,0.035)]">

            {/* LIST HEADER */}
            <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold text-slate-800">
                    Daftar Mata Pelajaran ({activeTabLevel})
                  </h2>

                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                    {totalSubjects}
                  </span>
                </div>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Hanya menampilkan mapel jenjang {activeTabLevel}.
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
            {subjects.length > 0 && !loadingSubjects && (
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
                    setSelectedIds(
                      allSelected
                        ? []
                        : subjects.map((subject) => subject.id)
                    );
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
                <EmptyState level={activeTabLevel} />
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200">

                  {/* TABLE HEADER */}
                  <div className="hidden grid-cols-[40px_minmax(0,1fr)_90px] items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:grid">
                    <span>No</span>
                    <span>Mata Pelajaran</span>
                    <span className="text-right">Aksi</span>
                  </div>

                  {/* ROWS */}
                  <div className="divide-y divide-slate-100">
                    {subjects.map((subject, index) => {
                      const isChecked = selectedIds.includes(subject.id);

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
                              onChange={() => handleSelectOne(subject.id)}
                              className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                            />

                            <span className="text-[9px] font-bold text-slate-400">
                              {String(index + 1).padStart(2, '0')}
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

                            <p className="mt-0.5 text-[9px] text-slate-400">
                              Jenjang {subject.level || activeTabLevel}
                            </p>
                          </div>

                          {/* ACTION */}
                          <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-2 sm:border-0 sm:pt-0">
                            <button
                              type="button"
                              onClick={() => handleEdit(subject)}
                              title="Edit"
                              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(subject.id)}
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

        {/* FOOTER */}
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
  icon: ReactNode;
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

function EmptyState({ level }: { level: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <BookIcon />
      </div>

      <h3 className="text-xs font-bold text-slate-700">
        Belum ada mata pelajaran {level}
      </h3>

      <p className="mt-1 max-w-xs text-[10px] leading-4 text-slate-400">
        Tambahkan mata pelajaran menggunakan formulir di sebelah kiri.
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
