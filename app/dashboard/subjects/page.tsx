
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode, ChangeEvent } from 'react';

type Subject = {
  id: number;
  name: string;
  level?: string;
};

const SUBJECTS_BY_LEVEL: Record<'SMP' | 'SMA', string[]> = {
  SMP: [
    'Bahasa Arab',
    'Fiqih',
    'Hadis',
    'Imla dan Khot',
    'Mahfudzot',
    "Muroja'ah",
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
    "Muroja'ah Lanjutan",
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

export default function SubjectsPage() {
  const [activeTabLevel, setActiveTabLevel] =
    useState<'SMP' | 'SMA'>('SMP');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectOption, setSelectedSubjectOption] = useState('');
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const defaultSubjects = SUBJECTS_BY_LEVEL[activeTabLevel];

  const availableDefaultSubjects = useMemo(() => {
    const registeredNames = new Set(
      subjects.map((subject) => normalizeText(subject.name))
    );

    const currentEditingSubject = subjects.find(
      (subject) => subject.id === editingId
    );

    return defaultSubjects.filter((name) => {
      if (
        currentEditingSubject &&
        normalizeText(currentEditingSubject.name) === normalizeText(name)
      ) {
        return true;
      }

      return !registeredNames.has(normalizeText(name));
    });
  }, [defaultSubjects, subjects, editingId]);

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

        const filteredSubjects: Subject[] = subjectData.filter(
          (subject: Subject) => {
            if (!subject || typeof subject.id !== 'number') return false;
            if (!subject.name) return false;

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

    return () => controller.abort();
  }, [fetchSubjects]);

  const resetForm = () => {
    setEditingId(null);
    setSelectedSubjectOption('');
    setCustomSubjectName('');
    setIsCustomMode(false);
  };

  const handleChangeLevel = (level: 'SMP' | 'SMA') => {
    if (level === activeTabLevel) return;

    setActiveTabLevel(level);
    setSelectedIds([]);
    setMessage('');
    resetForm();
  };

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
      setIsCustomMode(true);
      setCustomSubjectName(subject.name);
      setSelectedSubjectOption('');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
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

  const totalSubjects = subjects.length;
  const allSelected =
    subjects.length > 0 && selectedIds.length === subjects.length;

  const isSuccessMessage = message.startsWith('Sukses');

  return (
    <main className="min-h-screen bg-[#f0f0f1] px-3 py-5 text-[#1d2327] sm:px-5">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[21px] font-normal leading-tight text-[#1d2327]">
              Mata Pelajaran
            </h1>
            <div className="mt-1 text-xs text-[#646970]">
              Dashboard <span className="mx-1">›</span> Akademik
              <span className="mx-1">›</span> Mata Pelajaran
            </div>
          </div>

          <div className="text-xs text-[#646970]">
            Sistem Akademik · Ulul Albab
          </div>
        </div>

        {/* LEVEL TABS */}
        <div className="mb-4 flex items-center gap-1 border-b border-[#c3c4c7]">
          <button
            type="button"
            onClick={() => handleChangeLevel('SMP')}
            className={`border border-b-0 px-4 py-2 text-xs font-medium ${
              activeTabLevel === 'SMP'
                ? 'border-[#c3c4c7] bg-white text-[#1d2327]'
                : 'border-transparent bg-transparent text-[#50575e] hover:text-[#2271b1]'
            }`}
          >
            Jenjang SMP
          </button>

          <button
            type="button"
            onClick={() => handleChangeLevel('SMA')}
            className={`border border-b-0 px-4 py-2 text-xs font-medium ${
              activeTabLevel === 'SMA'
                ? 'border-[#c3c4c7] bg-white text-[#1d2327]'
                : 'border-transparent bg-transparent text-[#50575e] hover:text-[#2271b1]'
            }`}
          >
            Jenjang SMA
          </button>
        </div>

        {/* INFO */}
        <div className="mb-3 border-l-4 border-[#2271b1] bg-white px-3 py-2 text-xs text-[#50575e] shadow-sm">
          Anda sedang mengelola mata pelajaran jenjang{' '}
          <strong className="text-[#1d2327]">{activeTabLevel}</strong>.
          <span className="ml-2 text-[#646970]">
            {defaultSubjects.length} pilihan mapel standar.
          </span>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-3 border-l-4 bg-white px-3 py-2.5 text-xs shadow-sm ${
              isSuccessMessage
                ? 'border-[#00a32a] text-[#008a20]'
                : 'border-[#d63638] text-[#b32d2e]'
            }`}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <span>{message}</span>
              <button
                type="button"
                onClick={() => setMessage('')}
                className="text-base leading-none text-[#787c82] hover:text-[#1d2327]"
                aria-label="Tutup pesan"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="border border-[#dcdcde] bg-white px-4 py-3 shadow-sm">
            <div className="text-[11px] text-[#646970]">
              Total Mata Pelajaran
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#1d2327]">
              {totalSubjects}
            </div>
            <div className="mt-0.5 text-[10px] text-[#787c82]">
              Jenjang {activeTabLevel}
            </div>
          </div>

          <div className="border border-[#dcdcde] bg-white px-4 py-3 shadow-sm">
            <div className="text-[11px] text-[#646970]">
              Pilihan Mapel Standar
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#1d2327]">
              {defaultSubjects.length}
            </div>
            <div className="mt-0.5 text-[10px] text-[#787c82]">
              Daftar kurikulum
            </div>
          </div>

          <div className="col-span-2 border border-[#dcdcde] bg-white px-4 py-3 shadow-sm sm:col-span-1">
            <div className="text-[11px] text-[#646970]">
              Belum Terdaftar
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#2271b1]">
              {availableDefaultSubjects.length}
            </div>
            <div className="mt-0.5 text-[10px] text-[#787c82]">
              Pilihan standar tersedia
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[310px_minmax(0,1fr)]">

          {/* FORM */}
          <section className="border border-[#c3c4c7] bg-white shadow-sm">
            <div className="border-b border-[#dcdcde] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#1d2327]">
                {editingId ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
              </h2>
              <p className="mt-1 text-[11px] text-[#646970]">
                {editingId
                  ? 'Perbarui informasi mata pelajaran.'
                  : `Tambahkan mapel untuk jenjang ${activeTabLevel}.`}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1d2327]">
                  Jenjang
                </label>
                <div className="flex h-[34px] items-center border border-[#8c8f94] bg-[#f6f7f7] px-2.5 text-xs text-[#50575e]">
                  {activeTabLevel}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1d2327]">
                  Nama Mata Pelajaran
                </label>

                {!isCustomMode ? (
                  <div className="space-y-2">
                    <select
                      value={selectedSubjectOption}
                      onChange={(e) =>
                        setSelectedSubjectOption(e.target.value)
                      }
                      required
                      className="h-[36px] w-full rounded-sm border border-[#8c8f94] bg-white px-2 text-xs text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
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
                      <p className="text-[11px] leading-4 text-[#996800]">
                        Semua pilihan standar sudah terdaftar. Anda masih
                        dapat menambahkan mapel khusus.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(true);
                        setSelectedSubjectOption('');
                      }}
                      className="text-xs text-[#2271b1] hover:text-[#135e96] hover:underline"
                    >
                      + Tambah mapel lain (ketik sendiri)
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
                      placeholder="Ketik nama mata pelajaran..."
                      className="h-[36px] w-full rounded-sm border border-[#8c8f94] bg-white px-2.5 text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(false);
                        setCustomSubjectName('');
                      }}
                      className="text-xs text-[#2271b1] hover:underline"
                    >
                      ← Kembali ke pilihan standar
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-[#dcdcde] bg-[#f6f7f7] p-3">
                <div className="text-[11px] font-semibold text-[#1d2327]">
                  Informasi penyimpanan
                </div>
                <p className="mt-1 text-[11px] leading-4 text-[#646970]">
                  Mata pelajaran akan disimpan pada jenjang{' '}
                  <strong>{activeTabLevel}</strong> dan digunakan dalam
                  proses input penilaian serta laporan rapor.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 border-t border-[#dcdcde] pt-3">
                <button
                  type="submit"
                  disabled={
                    loading ||
                    (!isCustomMode &&
                      availableDefaultSubjects.length === 0 &&
                      !selectedSubjectOption)
                  }
                  className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-xs font-medium text-white hover:border-[#135e96] hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <SpinnerIcon /> : <PlusIcon />}
                  {loading
                    ? 'Menyimpan...'
                    : editingId
                      ? 'Simpan Perubahan'
                      : 'Tambah Mapel'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="h-[34px] rounded-sm border border-[#8c8f94] bg-[#f6f7f7] px-3 text-xs text-[#2c3338] hover:bg-[#f0f0f1]"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* TABLE */}
          <section className="min-w-0 border border-[#c3c4c7] bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dcdcde] px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold text-[#1d2327]">
                  Daftar Mata Pelajaran
                </h2>
                <p className="mt-1 text-[11px] text-[#646970]">
                  Data mapel jenjang {activeTabLevel}.
                </p>
              </div>

              <span className="inline-flex h-6 items-center border border-[#dcdcde] bg-[#f6f7f7] px-2 text-[11px] font-medium text-[#50575e]">
                {totalSubjects} mapel
              </span>
            </div>

            {/* BULK ACTION */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dcdcde] bg-[#f6f7f7] px-3 py-2">
              <div className="flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-[#50575e]">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    disabled={subjects.length === 0 || loadingSubjects}
                    className="h-3.5 w-3.5 accent-[#2271b1]"
                  />
                  Pilih semua
                </label>

                {selectedIds.length > 0 && (
                  <span className="text-[11px] text-[#646970]">
                    {selectedIds.length} dipilih
                  </span>
                )}
              </div>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  disabled={deletingBulk}
                  className="inline-flex h-[29px] items-center gap-1 rounded-sm border border-[#d63638] bg-white px-2.5 text-[11px] font-medium text-[#d63638] hover:bg-[#fcf0f1] disabled:opacity-60"
                >
                  <TrashIcon />
                  {deletingBulk
                    ? 'Menghapus...'
                    : `Hapus ${selectedIds.length} Terpilih`}
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              {loadingSubjects ? (
                <div className="p-4">
                  <LoadingState />
                </div>
              ) : subjects.length === 0 ? (
                <div className="p-4">
                  <EmptyState level={activeTabLevel} />
                </div>
              ) : (
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#f6f7f7] text-[11px] font-semibold text-[#50575e]">
                      <th className="w-10 border-b border-[#c3c4c7] px-3 py-2.5 text-center">
                        No.
                      </th>
                      <th className="w-10 border-b border-[#c3c4c7] px-2 py-2.5 text-center">
                        <span className="sr-only">Pilih</span>
                        ✓
                      </th>
                      <th className="border-b border-[#c3c4c7] px-3 py-2.5">
                        Nama Mata Pelajaran
                      </th>
                      <th className="w-24 border-b border-[#c3c4c7] px-3 py-2.5">
                        Jenjang
                      </th>
                      <th className="w-28 border-b border-[#c3c4c7] px-3 py-2.5 text-right">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjects.map((subject, index) => {
                      const isChecked = selectedIds.includes(subject.id);

                      return (
                        <tr
                          key={subject.id}
                          className={`group ${
                            isChecked ? 'bg-[#f0f6fc]' : 'hover:bg-[#f6f7f7]'
                          }`}
                        >
                          <td className="border-b border-[#f0f0f1] px-3 py-2.5 text-center text-[11px] text-[#646970]">
                            {index + 1}
                          </td>

                          <td className="border-b border-[#f0f0f1] px-2 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleSelectOne(subject.id)}
                              className="h-3.5 w-3.5 accent-[#2271b1]"
                              aria-label={`Pilih ${subject.name}`}
                            />
                          </td>

                          <td className="border-b border-[#f0f0f1] px-3 py-2.5">
                            <div className="text-xs font-medium text-[#2271b1]">
                              {subject.name}
                            </div>
                            <div className="mt-0.5 text-[10px] text-[#8c8f94]">
                              ID: {subject.id}
                            </div>
                          </td>

                          <td className="border-b border-[#f0f0f1] px-3 py-2.5">
                            <span className="inline-flex border border-[#dcdcde] bg-[#f6f7f7] px-2 py-0.5 text-[10px] text-[#50575e]">
                              {subject.level || activeTabLevel}
                            </span>
                          </td>

                          <td className="border-b border-[#f0f0f1] px-3 py-2.5">
                            <div className="flex items-center justify-end gap-3 text-[11px]">
                              <button
                                type="button"
                                onClick={() => handleEdit(subject)}
                                className="text-[#2271b1] hover:text-[#135e96] hover:underline"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(subject.id)}
                                className="text-[#d63638] hover:text-[#b32d2e] hover:underline"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {!loadingSubjects && subjects.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-3 py-2 text-[10px] text-[#646970]">
                <span>
                  Menampilkan {subjects.length} mata pelajaran jenjang{' '}
                  {activeTabLevel}
                </span>
                {selectedIds.length > 0 && (
                  <span>{selectedIds.length} data dipilih</span>
                )}
              </div>
            )}
          </section>
        </div>

        {/* FOOTER */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#c3c4c7] pt-3 text-[10px] text-[#787c82]">
          <span>
            Sistem Akademik · Pondok Pesantren Terpadu Ulul Albab
          </span>
          <span>العلم نور</span>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   LOADING
===================================================== */

function LoadingState() {
  return (
    <div className="space-y-3 py-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-3">
          <div className="h-3 w-3 bg-[#dcdcde]" />
          <div className="h-3 w-1/3 bg-[#dcdcde]" />
          <div className="ml-auto h-3 w-16 bg-[#dcdcde]" />
        </div>
      ))}
    </div>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

function EmptyState({ level }: { level: string }) {
  return (
    <div className="border border-dashed border-[#c3c4c7] bg-[#f6f7f7] px-4 py-10 text-center">
      <div className="mb-2 text-2xl text-[#a7aaad]">▤</div>
      <h3 className="text-sm font-medium text-[#1d2327]">
        Belum ada mata pelajaran {level}
      </h3>
      <p className="mt-1 text-xs text-[#646970]">
        Tambahkan mata pelajaran melalui formulir di sebelah kiri.
      </p>
    </div>
  );
}

/* =====================================================
   ICONS
===================================================== */

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
