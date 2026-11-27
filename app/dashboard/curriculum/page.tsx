
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  BookOpen,
  ArrowLeft,
  Trash2,
  Edit3,
  GraduationCap,
  School,
  Search,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Layers,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type TP = {
  id: number;
  code: string;
  description: string;
};

type CP = {
  id: number;
  code: string;
  description: string;
  subjectId?: number;
  grade?: number;
  semester?: number;
  subject?: {
    name: string;
  };
  tps: TP[];
};

type Subject = {
  id: number;
  name: string;
  level?: 'SMP' | 'SMA';
};

type MessageType = 'success' | 'error' | '';

const SUBJECTS_SMP: Subject[] = [
  { id: 1, name: 'Tajwid', level: 'SMP' },
  { id: 2, name: 'Tahfidz / Tahsin', level: 'SMP' },
  { id: 3, name: "Muroja'ah", level: 'SMP' },
  { id: 4, name: 'Fiqih', level: 'SMP' },
  { id: 5, name: 'Bahasa Arab', level: 'SMP' },
  { id: 6, name: 'Pidato', level: 'SMP' },
  { id: 7, name: 'Hadis', level: 'SMP' },
  { id: 8, name: 'Pendidikan Agama Islam', level: 'SMP' },
  { id: 9, name: 'Tsaqofah Islamiyah', level: 'SMP' },
  { id: 10, name: 'Nahwu / Sorof', level: 'SMP' },
  { id: 11, name: 'Mahfudzot', level: 'SMP' },
  { id: 12, name: 'Siroh Nabawiyah', level: 'SMP' },
  { id: 13, name: 'Imla dan Khot', level: 'SMP' },
];

const SUBJECTS_SMA: Subject[] = [
  { id: 101, name: 'Tajwid', level: 'SMA' },
  { id: 102, name: 'Tahfidz / Tahsin', level: 'SMA' },
  { id: 103, name: 'Muroja’ah Lanjutan', level: 'SMA' },
  { id: 104, name: 'Fiqih Muqoron', level: 'SMA' },
  { id: 105, name: 'Muhadatsah', level: 'SMA' },
  { id: 106, name: 'Pidato & Debat', level: 'SMA' },
  { id: 107, name: 'Ulumul Quran', level: 'SMA' },
  { id: 108, name: 'Mustholah Hadis', level: 'SMA' },
  { id: 109, name: 'Ushul Fiqih', level: 'SMA' },
  { id: 110, name: 'Tarikh Islam', level: 'SMA' },
  { id: 111, name: 'Balaghoh & Adab', level: 'SMA' },
  { id: 112, name: 'Nahwu & Sorof Lanjutan', level: 'SMA' },
  { id: 113, name: 'Tauhid & Aqidah', level: 'SMA' },
];

// ============================================================================
// PAGE
// ============================================================================

export default function CurriculumPage() {
  const [activeTabLevel, setActiveTabLevel] =
    useState<'SMP' | 'SMA'>('SMP');

  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cps, setCps] = useState<CP[]>([]);

  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);

  const [cpDesc, setCpDesc] = useState('');
  const [activeCpIdForTp, setActiveCpIdForTp] =
    useState<number | null>(null);
  const [tpDesc, setTpDesc] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('');

  const [subjectSearch, setSubjectSearch] = useState('');

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  const normalizeText = (value: unknown) => {
    return String(value || '').trim().toLowerCase();
  };

  const showMessage = (
    text: string,
    type: MessageType = 'success'
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  const getGradeOptions = () => {
    return activeTabLevel === 'SMP'
      ? [7, 8, 9]
      : [10, 11, 12];
  };

  // ==========================================================================
  // RESET SAAT PINDAH JENJANG
  // ==========================================================================

  useEffect(() => {
    setSelectedGrade(activeTabLevel === 'SMP' ? 7 : 10);
    setSelectedSemester(1);
    setActiveCpIdForTp(null);
    setTpDesc('');
    setCpDesc('');
    setSubjectSearch('');
  }, [activeTabLevel]);

  // ==========================================================================
  // FETCH DATA
  // ==========================================================================

  const fetchData = async () => {
    try {
      setLoadingData(true);

      const [currRes, subjRes] = await Promise.all([
        fetch('/api/curriculum', {
          cache: 'no-store',
        }),
        fetch('/api/subjects', {
          cache: 'no-store',
        }),
      ]);

      const currData = await currRes.json();
      const subjData = await subjRes.json();

      if (!currRes.ok) {
        throw new Error(
          currData?.message || 'Gagal memuat data kurikulum.'
        );
      }

      const curriculumList = Array.isArray(currData)
        ? currData
        : currData?.data || [];

      setCps(
        Array.isArray(curriculumList)
          ? curriculumList
          : []
      );

      if (subjRes.ok) {
        const list = Array.isArray(subjData)
          ? subjData
          : subjData?.data ||
            subjData?.subjects ||
            [];

        if (Array.isArray(list) && list.length > 0) {
          setSubjects(list);
        } else {
          setSubjects([
            ...SUBJECTS_SMP,
            ...SUBJECTS_SMA,
          ]);
        }
      } else {
        setSubjects([
          ...SUBJECTS_SMP,
          ...SUBJECTS_SMA,
        ]);
      }
    } catch (error) {
      console.error('FETCH CURRICULUM ERROR:', error);

      setSubjects([
        ...SUBJECTS_SMP,
        ...SUBJECTS_SMA,
      ]);

      showMessage(
        'Gagal mengambil data kurikulum dari server.',
        'error'
      );
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================================================
  // FILTER MATA PELAJARAN
  // ==========================================================================

  const filteredSubjectsByLevel = useMemo(() => {
    return subjects.filter(subj => {
      if (subj.level) {
        return subj.level === activeTabLevel;
      }

      if (activeTabLevel === 'SMA') {
        return (
          subj.name.includes('Lanjutan') ||
          subj.name.includes('Muqoron') ||
          subj.name.includes('Ulumul') ||
          subj.name.includes('Mustholah') ||
          subj.name.includes('Ushul') ||
          subj.name.includes('Tarikh') ||
          subj.name.includes('Balaghoh') ||
          subj.name.includes('Tauhid')
        );
      }

      return (
        !subj.name.includes('Lanjutan') &&
        !subj.name.includes('Muqoron') &&
        !subj.name.includes('Ulumul') &&
        !subj.name.includes('Mustholah') &&
        !subj.name.includes('Ushul') &&
        !subj.name.includes('Tarikh') &&
        !subj.name.includes('Balaghoh') &&
        !subj.name.includes('Tauhid')
      );
    });
  }, [subjects, activeTabLevel]);

  const visibleSubjects = useMemo(() => {
    return filteredSubjectsByLevel.filter(subj =>
      subj.name.toLowerCase().includes(subjectSearch.toLowerCase())
    );
  }, [filteredSubjectsByLevel, subjectSearch]);

  // ==========================================================================
  // FILTER CP BERDASARKAN MAPEL, KELAS, SEMESTER
  // ==========================================================================

  const currentSubjectCPs = useMemo(() => {
    if (!selectedSubject) return [];

    return cps.filter(cp => {
      const matchSubject =
        cp.subjectId === selectedSubject.id ||
        normalizeText(cp.subject?.name) ===
          normalizeText(selectedSubject.name);

      const matchGrade =
        cp.grade === undefined ||
        cp.grade === null ||
        Number(cp.grade) === Number(selectedGrade);

      const cpSemester =
        cp.semester === undefined || cp.semester === null
          ? 1
          : Number(cp.semester);

      const matchSemester =
        cpSemester === Number(selectedSemester);

      return matchSubject && matchGrade && matchSemester;
    });
  }, [
    cps,
    selectedSubject,
    selectedGrade,
    selectedSemester,
  ]);

  // ==========================================================================
  // SIMPAN CP
  // ==========================================================================

  const handleSaveCP = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedSubject) {
      showMessage(
        'Silakan pilih mata pelajaran terlebih dahulu.',
        'error'
      );
      return;
    }

    if (!cpDesc.trim()) {
      showMessage(
        'Deskripsi Capaian Pembelajaran belum diisi.',
        'error'
      );
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'CREATE_CP',
          subjectId: selectedSubject.id,
          grade: Number(selectedGrade),
          semester: Number(selectedSemester),
          description: cpDesc.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menyimpan CP.');
      }

      showMessage(
        `Capaian Pembelajaran Kelas ${selectedGrade} Semester ${selectedSemester} berhasil ditambahkan.`,
        'success'
      );

      setCpDesc('');
      await fetchData();
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan CP.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // SIMPAN TP
  // ==========================================================================

  const handleSaveTP = async (cpId: number) => {
    if (!tpDesc.trim()) {
      showMessage(
        'Deskripsi Tujuan Pembelajaran belum diisi.',
        'error'
      );
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'CREATE_TP',
          cpId,
          description: tpDesc.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menyimpan TP.');
      }

      showMessage(
        'Tujuan Pembelajaran (TP) berhasil ditambahkan.',
        'success'
      );

      setTpDesc('');
      setActiveCpIdForTp(null);
      await fetchData();
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan TP.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // HAPUS CP / TP
  // ==========================================================================

  const handleDelete = async (
    id: number,
    type: 'CP' | 'TP'
  ) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus ${type} ini?`
    );

    if (!confirmed) return;

    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'DELETE',
          type,
          id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || `Gagal menghapus ${type}.`
        );
      }

      showMessage(`${type} berhasil dihapus.`, 'success');

      if (type === 'CP' && activeCpIdForTp === id) {
        setActiveCpIdForTp(null);
        setTpDesc('');
      }

      await fetchData();
    } catch (error) {
      showMessage(
        error instanceof Error
          ? error.message
          : `Terjadi kesalahan saat menghapus ${type}.`,
        'error'
      );
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327]">

      {/* HEADER */}

      <div className="border-b border-[#dcdcde] bg-white">
        <div className="px-4 py-4 sm:px-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-[#646970]">
                <span>Akademik</span>
                <span>/</span>
                <span>Kurikulum</span>
              </div>

              <h1 className="text-xl font-semibold tracking-tight">
                Kurikulum (CP & TP)
              </h1>

              <p className="mt-1 text-xs text-[#646970]">
                Kelola Capaian Pembelajaran dan Tujuan Pembelajaran.
              </p>
            </div>

            {selectedSubject && (
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject(null);
                  setMessage('');
                  setMessageType('');
                  setCpDesc('');
                  setTpDesc('');
                  setActiveCpIdForTp(null);
                  setSelectedSemester(1);
                }}
                className="inline-flex h-9 items-center gap-2 rounded border border-[#c3c4c7] bg-white px-3 text-xs font-medium text-[#2c3338] hover:bg-[#f6f7f7]"
              >
                <ArrowLeft size={14} />
                Kembali ke Mata Pelajaran
              </button>
            )}

          </div>
        </div>
      </div>

      {/* MAIN */}

      <main className="space-y-4 p-4 sm:p-6">

        {/* NOTIFICATION */}

        {message && (
          <div
            className={`flex items-center justify-between gap-3 rounded border px-4 py-3 text-xs ${
              messageType === 'success'
                ? 'border-[#c3e6cb] bg-[#edfaef] text-[#176b32]'
                : 'border-[#f0c5c5] bg-[#fcf0f1] text-[#b32d2e]'
            }`}
          >
            <div className="flex items-center gap-2">
              {messageType === 'success' ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
              <span>{message}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessage('');
                setMessageType('');
              }}
              aria-label="Tutup notifikasi"
              className="opacity-70 hover:opacity-100"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {!selectedSubject ? (
          /* ============================================================ */
          /* PILIH MAPEL */
          /* ============================================================ */

          <section className="overflow-hidden rounded border border-[#dcdcde] bg-white">

            <div className="border-b border-[#dcdcde] p-4">
              <h2 className="text-sm font-semibold">
                Pilih Jenjang dan Mata Pelajaran
              </h2>
              <p className="mt-1 text-[11px] text-[#646970]">
                Pilih jenjang pendidikan terlebih dahulu, kemudian pilih mata pelajaran.
              </p>
            </div>

            {/* LEVEL TABS */}

            <div className="flex flex-wrap items-center gap-2 border-b border-[#dcdcde] bg-[#f6f7f7] px-4 py-3">

              <button
                type="button"
                onClick={() => setActiveTabLevel('SMP')}
                className={`inline-flex h-9 items-center gap-2 rounded border px-4 text-xs font-medium ${
                  activeTabLevel === 'SMP'
                    ? 'border-[#2271b1] bg-white text-[#135e96] shadow-sm'
                    : 'border-[#c3c4c7] bg-transparent text-[#50575e] hover:bg-white'
                }`}
              >
                <School size={15} />
                Jenjang SMP
              </button>

              <button
                type="button"
                onClick={() => setActiveTabLevel('SMA')}
                className={`inline-flex h-9 items-center gap-2 rounded border px-4 text-xs font-medium ${
                  activeTabLevel === 'SMA'
                    ? 'border-[#2271b1] bg-white text-[#135e96] shadow-sm'
                    : 'border-[#c3c4c7] bg-transparent text-[#50575e] hover:bg-white'
                }`}
              >
                <GraduationCap size={15} />
                Jenjang SMA
              </button>

              <div className="ml-auto text-[11px] text-[#646970]">
                {filteredSubjectsByLevel.length} mata pelajaran
              </div>
            </div>

            {/* SUBJECT SEARCH */}

            <div className="border-b border-[#dcdcde] bg-white p-3">
              <div className="relative max-w-md">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />
                <input
                  type="search"
                  value={subjectSearch}
                  onChange={e => setSubjectSearch(e.target.value)}
                  placeholder="Cari mata pelajaran..."
                  className="h-9 w-full rounded border border-[#c3c4c7] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>
            </div>

            {/* SUBJECT LIST */}

            <div className="p-4">

              {loadingData ? (
                <div className="flex items-center justify-center gap-2 py-12 text-xs text-[#646970]">
                  <RefreshCw size={15} className="animate-spin" />
                  Memuat mata pelajaran...
                </div>
              ) : visibleSubjects.length === 0 ? (
                <div className="py-12 text-center">
                  <BookOpen
                    size={28}
                    className="mx-auto mb-2 text-[#a7aaad]"
                  />
                  <p className="text-sm font-medium text-[#50575e]">
                    Mata pelajaran tidak ditemukan
                  </p>
                  <p className="mt-1 text-xs text-[#646970]">
                    Coba kata kunci pencarian yang lain.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

                  {visibleSubjects.map(subj => (
                    <button
                      key={`${subj.level || activeTabLevel}-${subj.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedSubject(subj);
                        setSelectedSemester(1);
                        setMessage('');
                        setMessageType('');
                        setCpDesc('');
                        setTpDesc('');
                        setActiveCpIdForTp(null);
                      }}
                      className="group flex min-w-0 items-center justify-between gap-3 rounded border border-[#dcdcde] bg-white px-3 py-3 text-left transition hover:border-[#2271b1] hover:bg-[#f0f6fc]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#f0f6fc] text-[#2271b1]">
                          <BookOpen size={16} />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-[#2c3338] group-hover:text-[#135e96]">
                            {subj.name}
                          </div>
                          <div className="mt-1 text-[10px] text-[#646970]">
                            Kelola CP dan TP
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        size={15}
                        className="shrink-0 text-[#a7aaad] group-hover:text-[#2271b1]"
                      />
                    </button>
                  ))}

                </div>
              )}
            </div>

          </section>
        ) : (
          /* ============================================================ */
          /* KELOLA CP & TP */
          /* ============================================================ */

          <div className="space-y-4">

            {/* SUBJECT INFORMATION */}

            <section className="rounded border border-[#dcdcde] bg-white">

              <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#f0f6fc] text-[#2271b1]">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-[#646970]">
                      Mata Pelajaran
                    </div>

                    <h2 className="mt-0.5 text-base font-semibold">
                      {selectedSubject.name}
                    </h2>

                    <p className="mt-1 text-[11px] text-[#646970]">
                      Jenjang {activeTabLevel}
                    </p>
                  </div>
                </div>

                {/* GRADE + SEMESTER */}

                <div className="flex flex-wrap gap-3">

                  <div>
                    <label
                      htmlFor="selected-grade"
                      className="mb-1 block text-[10px] font-medium text-[#646970]"
                    >
                      Tingkat Kelas
                    </label>

                    <select
                      id="selected-grade"
                      value={selectedGrade}
                      onChange={e => {
                        setSelectedGrade(Number(e.target.value));
                        setActiveCpIdForTp(null);
                        setTpDesc('');
                        setMessage('');
                        setMessageType('');
                      }}
                      className="h-9 min-w-28 rounded border border-[#8c8f94] bg-white px-3 text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                    >
                      {getGradeOptions().map(item => (
                        <option key={item} value={item}>
                          Kelas {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="selected-semester"
                      className="mb-1 block text-[10px] font-medium text-[#646970]"
                    >
                      Semester
                    </label>

                    <select
                      id="selected-semester"
                      value={selectedSemester}
                      onChange={e => {
                        setSelectedSemester(Number(e.target.value));
                        setActiveCpIdForTp(null);
                        setTpDesc('');
                        setMessage('');
                        setMessageType('');
                      }}
                      className="h-9 min-w-32 rounded border border-[#8c8f94] bg-white px-3 text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                    >
                      <option value={1}>Semester 1</option>
                      <option value={2}>Semester 2</option>
                    </select>
                  </div>

                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-2.5 text-[11px] text-[#646970]">
                <span className="font-semibold text-[#2c3338]">
                  {selectedSubject.name}
                </span>
                <span>·</span>
                <span>Kelas {selectedGrade}</span>
                <span>·</span>
                <span>Semester {selectedSemester}</span>
              </div>

            </section>

            {/* ADD CP */}

            <section className="overflow-hidden rounded border border-[#dcdcde] bg-white">

              <div className="border-b border-[#dcdcde] px-4 py-3">
                <h3 className="text-sm font-semibold">
                  Tambah Capaian Pembelajaran (CP)
                </h3>
                <p className="mt-1 text-[11px] text-[#646970]">
                  Masukkan deskripsi CP untuk mata pelajaran, kelas, dan semester yang dipilih.
                </p>
              </div>

              <form
                onSubmit={handleSaveCP}
                className="space-y-3 p-4"
              >
                <textarea
                  value={cpDesc}
                  onChange={e => setCpDesc(e.target.value)}
                  placeholder={`Tuliskan deskripsi CP ${selectedSubject.name} untuk Kelas ${selectedGrade} Semester ${selectedSemester}...`}
                  rows={3}
                  required
                  className="w-full rounded border border-[#8c8f94] bg-white p-3 text-xs leading-5 outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-[#646970]">
                    Pastikan deskripsi CP sudah sesuai.
                  </span>

                  <button
                    type="submit"
                    disabled={loading || !cpDesc.trim()}
                    className="inline-flex h-9 items-center gap-2 rounded bg-[#2271b1] px-4 text-xs font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                    {loading ? 'Menyimpan...' : 'Simpan CP'}
                  </button>
                </div>
              </form>

            </section>

            {/* CP LIST */}

            <section className="overflow-hidden rounded border border-[#dcdcde] bg-white">

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dcdcde] px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold">
                    Daftar Capaian Pembelajaran
                  </h3>
                  <p className="mt-1 text-[11px] text-[#646970]">
                    {selectedSubject.name} · Kelas {selectedGrade} · Semester {selectedSemester}
                  </p>
                </div>

                <span className="rounded bg-[#f0f0f1] px-2.5 py-1 text-[10px] font-medium text-[#50575e]">
                  {currentSubjectCPs.length} CP
                </span>
              </div>

              <div className="p-4">

                {loadingData ? (
                  <div className="flex items-center justify-center gap-2 py-12 text-xs text-[#646970]">
                    <RefreshCw size={15} className="animate-spin" />
                    Memuat data kurikulum...
                  </div>
                ) : currentSubjectCPs.length === 0 ? (
                  <div className="rounded border border-dashed border-[#c3c4c7] bg-[#f6f7f7] px-4 py-12 text-center">
                    <Layers
                      size={28}
                      className="mx-auto mb-2 text-[#a7aaad]"
                    />

                    <p className="text-sm font-medium text-[#50575e]">
                      Belum ada Capaian Pembelajaran
                    </p>

                    <p className="mt-1 text-xs text-[#646970]">
                      Silakan tambahkan CP melalui formulir di atas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">

                    {currentSubjectCPs.map(cp => {
                      const cpSemester =
                        cp.semester === undefined ||
                        cp.semester === null
                          ? 1
                          : Number(cp.semester);

                      const isTpFormOpen =
                        activeCpIdForTp === cp.id;

                      return (
                        <article
                          key={cp.id}
                          className="overflow-hidden rounded border border-[#dcdcde]"
                        >

                          {/* CP HEADER */}

                          <div className="flex flex-col gap-3 bg-[#f6f7f7] p-3 sm:flex-row sm:items-start sm:justify-between">

                            <div className="min-w-0 flex-1">

                              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                                <span className="rounded bg-[#e5f5ec] px-2 py-1 text-[10px] font-semibold text-[#176b32]">
                                  CP: {cp.code}
                                </span>

                                <span className="rounded bg-[#f0f0f1] px-2 py-1 text-[10px] font-medium text-[#50575e]">
                                  Kelas {cp.grade || selectedGrade}
                                </span>

                                <span className="rounded bg-[#eaf3f9] px-2 py-1 text-[10px] font-medium text-[#135e96]">
                                  Semester {cpSemester}
                                </span>
                              </div>

                              <p className="whitespace-pre-wrap text-xs leading-5 text-[#2c3338]">
                                {cp.description}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDelete(cp.id, 'CP')}
                              className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 self-start rounded border border-[#d63638] px-2.5 text-[10px] font-medium text-[#d63638] hover:bg-[#fcf0f1]"
                              title="Hapus CP"
                            >
                              <Trash2 size={13} />
                              Hapus CP
                            </button>

                          </div>

                          {/* TP SECTION */}

                          <div className="border-t border-[#dcdcde] p-3">

                            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                              <div className="flex items-center gap-2">
                                <div className="h-4 w-1 rounded bg-[#dba617]" />
                                <h4 className="text-xs font-semibold text-[#2c3338]">
                                  Tujuan Pembelajaran (TP)
                                </h4>
                                <span className="text-[10px] text-[#646970]">
                                  ({cp.tps?.length || 0})
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveCpIdForTp(
                                    isTpFormOpen ? null : cp.id
                                  );
                                  setTpDesc('');
                                }}
                                className="inline-flex h-8 items-center gap-1.5 rounded border border-[#c3c4c7] bg-white px-2.5 text-[10px] font-medium text-[#2c3338] hover:bg-[#f6f7f7]"
                              >
                                {isTpFormOpen ? (
                                  <X size={13} />
                                ) : (
                                  <Plus size={13} />
                                )}
                                {isTpFormOpen ? 'Tutup Form' : 'Tambah TP'}
                              </button>

                            </div>

                            {/* FORM TP */}

                            {isTpFormOpen && (
                              <div className="mb-3 rounded border border-[#dba617] bg-[#fffaf0] p-3">

                                <label
                                  htmlFor={`tp-description-${cp.id}`}
                                  className="mb-1.5 block text-[11px] font-semibold text-[#2c3338]"
                                >
                                  Deskripsi Tujuan Pembelajaran
                                </label>

                                <textarea
                                  id={`tp-description-${cp.id}`}
                                  value={tpDesc}
                                  onChange={e => setTpDesc(e.target.value)}
                                  placeholder="Tuliskan deskripsi Tujuan Pembelajaran..."
                                  rows={2}
                                  autoFocus
                                  onKeyDown={e => {
                                    if (
                                      e.key === 'Enter' &&
                                      (e.ctrlKey || e.metaKey)
                                    ) {
                                      e.preventDefault();

                                      if (tpDesc.trim() && !loading) {
                                        handleSaveTP(cp.id);
                                      }
                                    }
                                  }}
                                  className="w-full rounded border border-[#c3c4c7] bg-white p-2.5 text-xs leading-5 outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                                />

                                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-[10px] text-[#646970]">
                                    Gunakan Ctrl + Enter untuk menyimpan.
                                  </span>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveCpIdForTp(null);
                                        setTpDesc('');
                                      }}
                                      className="h-8 rounded border border-[#c3c4c7] bg-white px-3 text-[10px] font-medium text-[#50575e] hover:bg-[#f6f7f7]"
                                    >
                                      Batal
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleSaveTP(cp.id)}
                                      disabled={loading || !tpDesc.trim()}
                                      className="inline-flex h-8 items-center gap-1.5 rounded bg-[#2271b1] px-3 text-[10px] font-medium text-white hover:bg-[#135e96] disabled:opacity-50"
                                    >
                                      {loading && (
                                        <RefreshCw
                                          size={12}
                                          className="animate-spin"
                                        />
                                      )}
                                      Simpan TP
                                    </button>
                                  </div>
                                </div>

                              </div>
                            )}

                            {/* TP LIST */}

                            {!cp.tps || cp.tps.length === 0 ? (
                              <div className="rounded border border-dashed border-[#dcdcde] bg-[#f9f9f9] px-3 py-4 text-center text-[11px] text-[#646970]">
                                Belum ada Tujuan Pembelajaran untuk CP ini.
                              </div>
                            ) : (
                              <div className="divide-y divide-[#f0f0f1] rounded border border-[#dcdcde]">

                                {cp.tps.map(tp => (
                                  <div
                                    key={tp.id}
                                    className="flex items-start justify-between gap-3 px-3 py-2.5 hover:bg-[#f6f7f7]"
                                  >
                                    <div className="flex min-w-0 items-start gap-2">
                                      <span className="mt-0.5 shrink-0 rounded bg-[#fff5d6] px-2 py-1 text-[9px] font-semibold text-[#8a5d00]">
                                        {tp.code}
                                      </span>

                                      <p className="whitespace-pre-wrap text-[11px] leading-5 text-[#50575e]">
                                        {tp.description}
                                      </p>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleDelete(tp.id, 'TP')}
                                      title="Hapus TP"
                                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#a7aaad] hover:bg-[#fcf0f1] hover:text-[#d63638]"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                ))}

                              </div>
                            )}

                          </div>

                        </article>
                      );
                    })}

                  </div>
                )}

              </div>

              {/* FOOTER */}

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-2.5 text-[10px] text-[#646970]">
                <span>
                  {currentSubjectCPs.length} Capaian Pembelajaran
                </span>
                <span>
                  Kelas {selectedGrade} · Semester {selectedSemester}
                </span>
              </div>

            </section>

          </div>
        )}

      </main>
    </div>
  );
}
