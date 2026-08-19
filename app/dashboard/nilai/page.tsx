'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Loader2,
  Save,
  School,
  Users,
  AlertCircle,
} from 'lucide-react';

type ClassRoom = {
  id: number;
  name: string;
  level: string;
  grade: number;
};

type Subject = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  fullname: string;
  class_name?: string | null;
};

type ScoreInput = {
  number: string;
  text: string;
};

export default function NilaiPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('Lisan');

  const [scoreInputs, setScoreInputs] = useState<
    Record<number, ScoreInput>
  >({});

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingScores, setLoadingScores] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  /*
  |--------------------------------------------------------------------------
  | LOAD KELAS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadClasses = async () => {
      try {
        setLoadingClasses(true);
        setError('');

        const response = await fetch('/api/classes', {
          method: 'GET',
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || 'Gagal memuat data kelas.'
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            'Format data kelas dari API tidak valid.'
          );
        }

        if (mounted) {
          setClasses(data);
        }
      } catch (err: any) {
        console.error('Load classes error:', err);

        if (mounted) {
          setClasses([]);
          setError(
            err?.message ||
              'Tidak dapat memuat daftar kelas.'
          );
        }
      } finally {
        if (mounted) {
          setLoadingClasses(false);
        }
      }
    };

    loadClasses();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOAD MATA PELAJARAN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadSubjects = async () => {
      try {
        setLoadingSubjects(true);

        const response = await fetch('/api/subjects', {
          method: 'GET',
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Gagal memuat mata pelajaran.'
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            'Format data mata pelajaran tidak valid.'
          );
        }

        if (mounted) {
          setSubjects(data);
        }
      } catch (err: any) {
        console.error('Load subjects error:', err);

        if (mounted) {
          setSubjects([]);
        }
      } finally {
        if (mounted) {
          setLoadingSubjects(false);
        }
      }
    };

    loadSubjects();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | KELAS YANG DIPILIH
  |--------------------------------------------------------------------------
  */

  const selectedClassData = useMemo(() => {
    return classes.find(
      (item) => String(item.id) === selectedClass
    );
  }, [classes, selectedClass]);

  const selectedClassName =
    selectedClassData?.name || '';

  /*
  |--------------------------------------------------------------------------
  | LOAD SANTRI
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadStudents = async () => {
      if (!selectedClassData) {
        setStudents([]);
        setScoreInputs({});
        return;
      }

      try {
        setLoadingStudents(true);
        setMessage('');

        const response = await fetch('/api/students', {
          method: 'GET',
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Gagal memuat data santri.'
          );
        }

        if (!Array.isArray(data)) {
          throw new Error(
            'Format data santri tidak valid.'
          );
        }

        /*
         * Data student pada sistem sebelumnya menggunakan
         * field class_name.
         */
        const filtered = data.filter(
          (student: Student) =>
            String(student.class_name ?? '').trim() ===
            String(selectedClassData.name).trim()
        );

        if (mounted) {
          setStudents(filtered);
          setScoreInputs({});
        }
      } catch (err: any) {
        console.error('Load students error:', err);

        if (mounted) {
          setStudents([]);
          setMessage(
            err?.message ||
              'Gagal memuat data santri.'
          );
        }
      } finally {
        if (mounted) {
          setLoadingStudents(false);
        }
      }
    };

    loadStudents();

    return () => {
      mounted = false;
    };
  }, [selectedClassData]);

  /*
  |--------------------------------------------------------------------------
  | LOAD NILAI YANG SUDAH ADA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadScores = async () => {
      if (
        !selectedClassName ||
        !selectedSubject ||
        !selectedType
      ) {
        return;
      }

      try {
        setLoadingScores(true);

        const params = new URLSearchParams({
          className: selectedClassName,
          subjectId: selectedSubject,
          type: selectedType,
        });

        const response = await fetch(
          `/api/nilai?${params.toString()}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              'Gagal memuat nilai.'
          );
        }

        const map: Record<number, ScoreInput> = {};

        if (Array.isArray(data)) {
          data.forEach((score: any) => {
            if (!score?.studentId) return;

            map[Number(score.studentId)] = {
              number:
                score.scoreNumber !== null &&
                score.scoreNumber !== undefined
                  ? String(score.scoreNumber)
                  : '',
              text:
                score.scoreText !== null &&
                score.scoreText !== undefined
                  ? String(score.scoreText)
                  : '',
            };
          });
        }

        if (mounted) {
          setScoreInputs(map);
        }
      } catch (err) {
        console.error('Load scores error:', err);

        if (mounted) {
          setScoreInputs({});
        }
      } finally {
        if (mounted) {
          setLoadingScores(false);
        }
      }
    };

    loadScores();

    return () => {
      mounted = false;
    };
  }, [
    selectedClassName,
    selectedSubject,
    selectedType,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CHANGE NILAI
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (
    studentId: number,
    field: 'number' | 'text',
    value: string
  ) => {
    setScoreInputs((prev) => ({
      ...prev,
      [studentId]: {
        number:
          field === 'number'
            ? value
            : prev[studentId]?.number || '',
        text:
          field === 'text'
            ? value
            : prev[studentId]?.text || '',
      },
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | SIMPAN NILAI
  |--------------------------------------------------------------------------
  */

  const handleSave = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setMessage('');

    if (!selectedClassData) {
      setMessage('Silakan pilih kelas terlebih dahulu.');
      return;
    }

    if (!selectedSubject) {
      setMessage(
        'Silakan pilih mata pelajaran terlebih dahulu.'
      );
      return;
    }

    if (students.length === 0) {
      setMessage(
        'Tidak terdapat santri pada kelas yang dipilih.'
      );
      return;
    }

    try {
      setSaving(true);

      const scoresArray = students.map((student) => ({
        studentId: student.id,
        scoreNumber: Number(
          scoreInputs[student.id]?.number || 0
        ),
        scoreText:
          scoreInputs[student.id]?.text || '',
      }));

      const response = await fetch('/api/nilai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: selectedClassData.name,
          subjectId: selectedSubject,
          type: selectedType,
          scores: scoresArray,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Gagal menyimpan nilai.'
        );
      }

      setMessage(
        'Nilai seluruh santri berhasil disimpan.'
      );
    } catch (err: any) {
      console.error('Save scores error:', err);

      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menyimpan nilai.'
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const handleClassChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;

    setSelectedClass(value);
    setMessage('');
    setScoreInputs({});
  };

  const handleSubjectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubject(event.target.value);
    setMessage('');
    setScoreInputs({});
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f5f8f6]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-7">

          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
              <Award
                size={15}
                strokeWidth={1.8}
              />
            </span>

            Akademik

            <span className="text-slate-300">
              /
            </span>

            Nilai Santri
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
                Nilai Santri
              </h1>

              <p className="mt-1.5 text-sm text-slate-500">
                Kelola dan input nilai akademik santri
                berdasarkan kelas dan mata pelajaran.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2.5 shadow-sm sm:flex">
              <GraduationCap
                size={18}
                className="text-emerald-700"
                strokeWidth={1.7}
              />

              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">
                  Sistem Akademik
                </div>

                <div className="text-xs font-semibold text-slate-700">
                  E-Rapor Ulul Albab
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* =====================================================
            ERROR API
        ====================================================== */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <div className="font-semibold">
                Gagal memuat data
              </div>

              <div className="mt-0.5 text-xs text-red-600">
                {error}
              </div>
            </div>

          </div>
        )}


        {/* =====================================================
            FILTER CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]">

          {/* Header */}

          <div className="border-b border-slate-100 bg-gradient-to-r from-[#063c30] to-[#07543f] px-5 py-4 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-emerald-100">
                <ClipboardList
                  size={18}
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <div className="text-sm font-semibold text-white">
                  Parameter Penilaian
                </div>

                <div className="text-[11px] text-emerald-100/60">
                  Tentukan kelas, mata pelajaran, dan tipe ujian
                </div>
              </div>

            </div>

          </div>


          {/* Filter */}

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3 md:p-6">

            {/* KELAS */}

            <div>
              <label
                htmlFor="class"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Kelas
              </label>

              <div className="relative">

                <select
                  id="class"
                  value={selectedClass}
                  onChange={handleClassChange}
                  disabled={loadingClasses}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-wait disabled:bg-slate-50"
                >

                  <option value="">
                    {loadingClasses
                      ? 'Memuat kelas...'
                      : classes.length === 0
                        ? 'Tidak ada data kelas'
                        : 'Pilih Kelas'}
                  </option>

                  {classes.map((cls) => (
                    <option
                      key={cls.id}
                      value={String(cls.id)}
                    >
                      Kelas {cls.name}
                      {cls.level
                        ? ` — ${cls.level}`
                        : ''}
                    </option>
                  ))}

                </select>

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">

                  {loadingClasses ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                    />
                  )}

                </div>

              </div>

              <div className="mt-1.5 text-[10px] text-slate-400">
                {classes.length > 0
                  ? `${classes.length} kelas tersedia`
                  : 'Belum ada data kelas'}
              </div>
            </div>


            {/* MAPEL */}

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Mata Pelajaran
              </label>

              <div className="relative">

                <select
                  id="subject"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  disabled={loadingSubjects}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-wait disabled:bg-slate-50"
                >

                  <option value="">
                    {loadingSubjects
                      ? 'Memuat mata pelajaran...'
                      : subjects.length === 0
                        ? 'Tidak ada mata pelajaran'
                        : 'Pilih Mata Pelajaran'}
                  </option>

                  {subjects.map((subject) => (
                    <option
                      key={subject.id}
                      value={String(subject.id)}
                    >
                      {subject.name}
                    </option>
                  ))}

                </select>

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">

                  {loadingSubjects ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <ChevronDown
                      size={17}
                      strokeWidth={1.8}
                    />
                  )}

                </div>

              </div>
            </div>


            {/* TIPE */}

            <div>
              <label
                htmlFor="type"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Tipe Ujian
              </label>

              <div className="relative">

                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                >

                  <option value="Lisan">
                    Lisan & Praktik — الامتحان الشفوي والتطبيقي
                  </option>

                  <option value="Tertulis">
                    Ujian Tertulis — الامتحان التحريري
                  </option>

                </select>

                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">

                  <ChevronDown
                    size={17}
                    strokeWidth={1.8}
                  />

                </div>

              </div>
            </div>

          </div>
        </div>


        {/* =====================================================
            MESSAGE
        ====================================================== */}

        {message && (
          <div
            className={[
              'mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
              message.toLowerCase().includes('berhasil') ||
              message.toLowerCase().includes('sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >

            {message.toLowerCase().includes('berhasil') ||
            message.toLowerCase().includes('sukses') ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}

            {message}

          </div>
        )}


        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!selectedClass || !selectedSubject ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Award
                size={26}
                strokeWidth={1.5}
              />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-700">
              Siap Menginput Nilai
            </h2>

            <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-slate-400">
              Silakan pilih kelas dan mata pelajaran
              terlebih dahulu. Daftar santri akan
              muncul secara otomatis.
            </p>

          </div>
        ) : (

          /* ===================================================
             TABLE
          ==================================================== */

          <form
            onSubmit={handleSave}
            className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
          >

            {/* TABLE HEADER */}

            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Users
                    size={19}
                    strokeWidth={1.7}
                  />
                </div>

                <div>

                  <h2 className="text-sm font-semibold text-slate-800">
                    Daftar Santri
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Kelas {selectedClassName}
                    {selectedClassData?.level
                      ? ` • ${selectedClassData.level}`
                      : ''}
                  </p>

                </div>

              </div>


              <button
                type="submit"
                disabled={
                  saving ||
                  loadingStudents ||
                  students.length === 0
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#07543f] px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#064735] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Simpan Semua Nilai
                  </>
                )}

              </button>

            </div>


            {/* INFO */}

            <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/70 sm:grid-cols-4">

              <div className="border-r border-slate-100 px-5 py-3">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">
                  Kelas
                </div>
                <div className="mt-0.5 text-xs font-semibold text-slate-700">
                  {selectedClassName}
                </div>
              </div>

              <div className="border-r border-slate-100 px-5 py-3">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">
                  Santri
                </div>
                <div className="mt-0.5 text-xs font-semibold text-slate-700">
                  {students.length} Santri
                </div>
              </div>

              <div className="border-r border-slate-100 px-5 py-3">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">
                  Tipe
                </div>
                <div className="mt-0.5 text-xs font-semibold text-slate-700">
                  {selectedType}
                </div>
              </div>

              <div className="px-5 py-3">
                <div className="text-[9px] uppercase tracking-wider text-slate-400">
                  Status
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Aktif
                </div>
              </div>

            </div>


            {/* TABLE */}

            <div className="relative overflow-x-auto">

              {(loadingStudents ||
                loadingScores) && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">

                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 shadow-lg">

                    <Loader2
                      size={16}
                      className="animate-spin text-emerald-600"
                    />

                    {loadingStudents
                      ? 'Memuat daftar santri...'
                      : 'Memuat nilai...'}
                  </div>

                </div>
              )}

              <table className="w-full min-w-[720px] border-collapse text-sm">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">

                    <th className="w-16 px-4 py-3 text-center font-semibold">
                      No
                    </th>

                    <th className="px-4 py-3 text-left font-semibold">
                      Nama Santri
                    </th>

                    <th className="w-40 px-4 py-3 text-center font-semibold">
                      Nilai Angka
                    </th>

                    <th className="w-72 px-4 py-3 text-left font-semibold">
                      Predikat / Nilai Huruf
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {students.length === 0 ? (

                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-14 text-center"
                      >

                        <School
                          size={28}
                          className="mx-auto text-slate-300"
                          strokeWidth={1.5}
                        />

                        <div className="mt-3 text-sm font-medium text-slate-600">
                          Tidak ada santri
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          Belum terdapat santri pada kelas{' '}
                          {selectedClassName}.
                        </div>

                      </td>
                    </tr>

                  ) : (

                    students.map(
                      (student, index) => (
                        <tr
                          key={student.id}
                          className="border-b border-slate-100 transition hover:bg-emerald-50/30"
                        >

                          <td className="px-4 py-3 text-center text-xs font-medium text-slate-400">
                            {index + 1}
                          </td>

                          <td className="px-4 py-3">

                            <div className="flex items-center gap-3">

                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                                {student.fullname
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>

                              <div className="font-medium text-slate-700">
                                {student.fullname}
                              </div>

                            </div>

                          </td>

                          <td className="px-4 py-2 text-center">

                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="1"
                              value={
                                scoreInputs[
                                  student.id
                                ]?.number || ''
                              }
                              onChange={(event) =>
                                handleInputChange(
                                  student.id,
                                  'number',
                                  event.target.value
                                )
                              }
                              placeholder="0–100"
                              className="h-9 w-24 rounded-lg border border-slate-200 bg-white px-2 text-center text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            />

                          </td>

                          <td className="px-4 py-2">

                            <input
                              type="text"
                              value={
                                scoreInputs[
                                  student.id
                                ]?.text || ''
                              }
                              onChange={(event) =>
                                handleInputChange(
                                  student.id,
                                  'text',
                                  event.target.value
                                )
                              }
                              placeholder="Contoh: Mumtaz"
                              className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            />

                          </td>

                        </tr>
                      )
                    )

                  )}

                </tbody>

              </table>

            </div>


            {/* FOOTER */}

            {students.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">

                <div className="text-[11px] text-slate-400">
                  Pastikan nilai sudah benar sebelum
                  disimpan.
                </div>

                <button
                  type="submit"
                  disabled={saving || students.length === 0}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#07543f] px-4 text-xs font-semibold text-white transition hover:bg-[#064735] disabled:opacity-50"
                >
                  <Save size={14} />
                  {saving
                    ? 'Menyimpan...'
                    : 'Simpan Nilai'}
                </button>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}