'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  Loader2,
  Save,
  Sparkles,
  Users,
} from 'lucide-react';

type Student = {
  id: number;
  fullname: string;
  nisn?: string;
  gender?: string;
  class_name: string;
};

type ClassRoom = {
  id: number;
  name: string;
  level?: string;
  grade?: number;
};

type PersonalityValue = {
  suluk: string;
  muwadhotah: string;
  nadzofah: string;
  indhiplat: string;
};

const predikats = [
  '-',
  'Mumtaz (ممتاز)',
  'Jeid Jiddan (جيد جداً)',
  'Jeid (جيد)',
  'Maqbul (مقبول)',
];

const personalityFields = [
  {
    key: 'suluk',
    title: 'As-Suluk',
    arabic: 'السلوك',
    description: 'Perilaku & akhlak',
  },
  {
    key: 'muwadhotah',
    title: 'Al-Muwadhotah',
    arabic: 'المواظبة',
    description: 'Konsistensi & ketekunan',
  },
  {
    key: 'nadzofah',
    title: 'An-Nadzofah',
    arabic: 'النظافة',
    description: 'Kebersihan & kerapian',
  },
  {
    key: 'indhiplat',
    title: 'Al-Indhiplat',
    arabic: 'الانضباط',
    description: 'Disiplin & tanggung jawab',
  },
] as const;

export default function PersonalityPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState('');

  const [personalityData, setPersonalityData] = useState<
    Record<number, PersonalityValue>
  >({});

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState('');

  /* ============================================================
     LOAD KELAS (DENGAN FALLBACK AMAN)
  ============================================================ */

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await fetch('/api/classes', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data kelas.');
        }

        const data = await res.json();
        let classList = Array.isArray(data) ? data : data?.data || [];

        if (classList.length === 0) {
          const studentRes = await fetch('/api/students', { cache: 'no-store' });
          const studentData = await studentRes.json();
          const studentsArr = Array.isArray(studentData) ? studentData : studentData?.students || studentData?.data || [];
          
          const uniqueClasses = Array.from(
            new Set(
              studentsArr
                .map((s: any) => String(s.class_name ?? '').trim())
                .filter(Boolean)
            )
          ).sort((a: any, b: any) => a.localeCompare(b, undefined, { numeric: true }));

          classList = uniqueClasses.map((className: any, index: number) => ({
            id: index + 1,
            name: className,
            level: '-',
            grade: 1,
          }));
        }

        setClasses(classList);
      } catch (error) {
        console.error('Error loading classes:', error);
        setMessage('Gagal memuat daftar kelas.');
      }
    };

    loadClasses();
  }, []);

  /* ============================================================
     LOAD SANTRI + PERSONALITY
  ============================================================ */

  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setPersonalityData({});
      setMessage('');
      return;
    }

    const loadData = async () => {
      setLoadingData(true);
      setMessage('');

      try {
        const [studentsRes, personalityRes] = await Promise.all([
          fetch('/api/students', {
            cache: 'no-store',
          }),
          fetch(
            `/api/personality?className=${encodeURIComponent(
              selectedClass,
            )}`,
            {
              cache: 'no-store',
            },
          ),
        ]);

        if (!studentsRes.ok) {
          throw new Error('Gagal memuat data santri.');
        }

        const allStudentsData = await studentsRes.json();
        const allStudents = Array.isArray(allStudentsData) 
          ? allStudentsData 
          : allStudentsData?.students || allStudentsData?.data || [];

        const filtered = Array.isArray(allStudents)
          ? allStudents.filter(
              (student: Student) =>
                student.class_name === selectedClass,
            )
          : [];

        setStudents(filtered);

        const persData = await personalityRes.json();
        const persList = Array.isArray(persData) ? persData : persData?.data || [];

        const map: Record<number, PersonalityValue> = {};

        if (Array.isArray(persList)) {
          persList.forEach((item: any) => {
            map[item.studentId] = {
              suluk: item.suluk || '-',
              muwadhotah: item.muwadhotah || '-',
              nadzofah: item.nadzofah || '-',
              indhiplat: item.indhiplat || '-',
            };
          });
        }

        setPersonalityData(map);
      } catch (error: any) {
        console.error('Error loading personality data:', error);

        setStudents([]);
        setPersonalityData({});
        setMessage(
          error?.message ||
            'Gagal memuat data kepribadian.',
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [selectedClass]);

  /* ============================================================
     CHANGE VALUE
  ============================================================ */

  const handleChange = (
    studentId: number,
    field: keyof PersonalityValue,
    value: string,
  ) => {
    setPersonalityData((prev) => ({
      ...prev,
      [studentId]: {
        suluk: prev[studentId]?.suluk || '-',
        muwadhotah: prev[studentId]?.muwadhotah || '-',
        nadzofah: prev[studentId]?.nadzofah || '-',
        indhiplat: prev[studentId]?.indhiplat || '-',
        [field]: value,
      },
    }));

    if (message) {
      setMessage('');
    }
  };

  /* ============================================================
     SAVE
  ============================================================ */

  const handleSave = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!selectedClass || students.length === 0) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const records = students.map((student) => ({
        studentId: student.id,
        suluk:
          personalityData[student.id]?.suluk || '-',
        muwadhotah:
          personalityData[student.id]?.muwadhotah ||
          '-',
        nadzofah:
          personalityData[student.id]?.nadzofah || '-',
        indhiplat:
          personalityData[student.id]?.indhiplat ||
          '-',
      }));

      const res = await fetch('/api/personality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: selectedClass,
          records,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal menyimpan penilaian.',
        );
      }

      setMessage(
        'Penilaian kepribadian berhasil disimpan.',
      );
    } catch (error: any) {
      console.error('Save personality error:', error);

      setMessage(
        error?.message ||
          'Terjadi kesalahan saat menyimpan data.',
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     SELECTED CLASS
  ============================================================ */

  const selectedClassData = useMemo(
    () =>
      classes.find(
        (item) => item.name === selectedClass,
      ),
    [classes, selectedClass],
  );

  /* ============================================================
     HELPERS
  ============================================================ */

  const getInitial = (name: string) => {
    return name?.charAt(0)?.toUpperCase() || 'S';
  };

  const getPredicateStyle = (value: string) => {
    if (value.includes('Mumtaz')) {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }

    if (value.includes('Jiddan')) {
      return 'border-teal-200 bg-teal-50 text-teal-700';
    }

    if (value.includes('Jeid')) {
      return 'border-sky-200 bg-sky-50 text-sky-700';
    }

    if (value.includes('Maqbul')) {
      return 'border-amber-200 bg-amber-50 text-amber-700';
    }

    return 'border-slate-200 bg-slate-50 text-slate-500';
  };

  return (
    <div className="min-h-screen bg-[#f5f8f6]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#063d31] shadow-[0_12px_40px_rgba(6,61,49,0.10)]">

          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-emerald-300/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-amber-300/[0.035] blur-3xl" />

          <div className="relative flex flex-col gap-5 px-5 py-6 sm:px-7 sm:py-7 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/10 bg-white/[0.07] shadow-inner">
                <Award
                  size={23}
                  strokeWidth={1.6}
                  className="text-emerald-200"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Sparkles
                    size={12}
                    className="text-amber-200/70"
                  />

                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">
                    Penilaian Karakter Santri
                  </span>
                </div>

                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Kepribadian & Akhlak Santri
                </h1>

                <p className="mt-1.5 max-w-2xl text-[11px] leading-relaxed text-emerald-50/50 sm:text-xs">
                  Penilaian sikap, akhlak, kebersihan,
                  ketekunan, dan kedisiplinan santri
                  sebagai bagian dari pembinaan karakter.
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 lg:flex">

              <GraduationCap
                size={18}
                className="text-emerald-200/60"
                strokeWidth={1.5}
              />

              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-100/30">
                  Institusi
                </div>

                <div className="mt-0.5 text-[11px] font-medium text-white/70">
                  Pondok Pesantren Terpadu Ulul Albab
                </div>
              </div>
            </div>

          </div>

          <div className="relative border-t border-white/[0.06] px-5 py-2.5 sm:px-7">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-300/10" />

              <span
                dir="rtl"
                className="font-serif text-[10px] text-amber-100/40"
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </span>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-300/10" />
            </div>
          </div>
        </section>

        {/* =====================================================
            FILTER CARD
        ====================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.035)] sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div className="w-full max-w-md">

              <label className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <Users
                    size={11}
                    strokeWidth={1.8}
                  />
                </span>
                Pilih Kelas
              </label>

              <div className="relative">

                <select
                  value={selectedClass}
                  onChange={(e) =>
                    setSelectedClass(
                      e.target.value,
                    )
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 pr-10 text-xs font-medium text-slate-700 outline-none transition-all hover:border-emerald-200 hover:bg-white focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="">
                    -- Pilih Kelas --
                  </option>

                  {classes.map((cls) => (
                    <option
                      key={cls.id}
                      value={cls.name}
                    >
                      Kelas {cls.name}
                      {cls.level
                        ? ` • ${cls.level}`
                        : ''}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>
            </div>

            {selectedClass && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                  <Users
                    size={15}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-600/60">
                    Data Kelas
                  </div>

                  <div className="mt-0.5 text-[11px] font-semibold text-emerald-900">
                    Kelas {selectedClass}
                    {selectedClassData?.grade
                      ? ` • Tingkat ${selectedClassData.grade}`
                      : ''}
                  </div>
                </div>

                <div className="ml-2 border-l border-emerald-200 pl-3">
                  <div className="text-sm font-bold text-emerald-800">
                    {students.length}
                  </div>
                  <div className="text-[8px] text-emerald-600/60">
                    Santri
                  </div>
                </div>

              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            MESSAGE
        ====================================================== */}

        {message && (
          <div
            className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-xs ${
              message.toLowerCase().includes('berhasil')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0"
            />

            <span className="font-medium">
              {message}
            </span>
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {!selectedClass && (
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">

            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">

              <div className="relative mb-5">

                <div className="absolute inset-0 scale-150 rounded-full bg-emerald-50 blur-xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                  <ClipboardCheck
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

              </div>

              <h2 className="text-sm font-semibold text-slate-700">
                Belum ada kelas yang dipilih
              </h2>

              <p className="mt-2 max-w-md text-[11px] leading-relaxed text-slate-400">
                Pilih kelas terlebih dahulu untuk
                menampilkan daftar santri dan mulai
                memberikan penilaian kepribadian.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-[9px] font-medium text-amber-700">
                <Sparkles size={11} />
                Pembinaan karakter adalah bagian penting
                dari pendidikan pesantren
              </div>

            </div>
          </section>
        )}

        {/* =====================================================
            LOADING
        ====================================================== */}

        {selectedClass && loadingData && (
          <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.035)]">

            <div className="flex min-h-[320px] flex-col items-center justify-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Loader2
                  size={22}
                  className="animate-spin"
                />
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-600">
                Memuat data santri...
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Menyiapkan penilaian kelas {selectedClass}
              </p>

            </div>
          </section>
        )}

        {/* =====================================================
            MAIN TABLE
        ====================================================== */}

        {selectedClass && !loadingData && (
          <form
            onSubmit={handleSave}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
          >

            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Award
                      size={15}
                      strokeWidth={1.7}
                    />
                  </div>

                  <h2 className="text-sm font-semibold text-slate-800">
                    Penilaian Kepribadian
                  </h2>

                </div>

                <p className="mt-2 pl-10 text-[10px] text-slate-400">
                  Kelas {selectedClass} • {students.length}{' '}
                  santri
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  students.length === 0
                }
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#07543f] px-5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(7,84,63,0.15)] transition-all hover:bg-[#064735] hover:shadow-[0_8px_20px_rgba(7,84,63,0.20)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save
                      size={15}
                      strokeWidth={1.8}
                    />
                    Simpan Penilaian
                  </>
                )}
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px] border-collapse">

                <thead>

                  <tr className="border-b border-slate-200 bg-[#f8faf9]">

                    <th className="w-14 px-4 py-4 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      No
                    </th>

                    <th className="sticky left-0 z-10 min-w-[260px] bg-[#f8faf9] px-4 py-4 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      Nama Santri
                    </th>

                    {personalityFields.map(
                      (field) => (
                        <th
                          key={field.key}
                          className="w-[190px] px-3 py-3 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <span className="text-[10px] font-bold text-slate-700">
                              {field.title}
                            </span>

                            <span
                              dir="rtl"
                              className="mt-0.5 font-serif text-[12px] font-medium text-emerald-700/70"
                            >
                              {field.arabic}
                            </span>

                            <span className="mt-1 text-[8px] font-normal text-slate-400">
                              {field.description}
                            </span>

                          </div>

                        </th>
                      ),
                    )}

                  </tr>

                </thead>

                <tbody>

                  {students.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex max-w-sm flex-col items-center">

                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <Users size={21} />
                          </div>

                          <p className="mt-3 text-xs font-semibold text-slate-600">
                            Tidak ada santri
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            Belum terdapat data santri
                            pada kelas ini.
                          </p>

                        </div>
                      </td>
                    </tr>
                  ) : (
                    students.map(
                      (student, index) => {
                        const studentValues =
                          personalityData[
                            student.id
                          ];

                        return (
                          <tr
                            key={student.id}
                            className="group border-b border-slate-100 transition-colors last:border-b-0 hover:bg-emerald-50/[0.28]"
                          >

                            <td className="px-4 py-4 text-center align-middle">

                              <span className="text-[10px] font-semibold text-slate-400">
                                {String(
                                  index + 1,
                                ).padStart(
                                  2,
                                  '0',
                                )}
                              </span>

                            </td>

                            <td className="sticky left-0 z-10 bg-white px-4 py-3 align-middle transition-colors group-hover:bg-[#fbfdfc]">

                              <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200/60">
                                  {getInitial(
                                    student.fullname,
                                  )}
                                </div>

                                <div className="min-w-0">

                                  <div className="truncate text-[11px] font-semibold text-slate-700">
                                    {
                                      student.fullname
                                    }
                                  </div>

                                  <div className="mt-0.5 flex items-center gap-1.5 text-[8px] text-slate-400">

                                    {student.nisn && (
                                      <>
                                        <span>
                                          NISN
                                        </span>

                                        <span className="text-slate-300">
                                          •
                                        </span>

                                        <span>
                                          {
                                            student.nisn
                                          }
                                        </span>
                                      </>
                                    )}

                                    {!student.nisn && (
                                      <span>
                                        Santri
                                      </span>
                                    )}

                                  </div>

                                </div>

                              </div>

                            </td>

                            {personalityFields.map(
                              (field) => {
                                const value =
                                  studentValues?.[
                                    field.key
                                  ] || '-';

                                return (
                                  <td
                                    key={
                                      field.key
                                    }
                                    className="px-3 py-3 align-middle"
                                  >

                                    <div className="relative">

                                      <select
                                        value={
                                          value
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          handleChange(
                                            student.id,
                                            field.key,
                                            e
                                              .target
                                              .value,
                                          )
                                        }
                                        className={`h-10 w-full appearance-none rounded-xl border px-3 pr-8 text-[10px] font-medium outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 ${getPredicateStyle(
                                          value,
                                        )}`}
                                      >

                                        {predikats.map(
                                          (
                                            predicate,
                                          ) => (
                                            <option
                                              key={
                                                predicate
                                              }
                                              value={
                                                predicate
                                              }
                                            >
                                              {
                                                predicate
                                              }
                                            </option>
                                          ),
                                        )}

                                      </select>

                                      <ChevronDown
                                        size={13}
                                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-current opacity-50"
                                      />

                                    </div>

                                  </td>
                                );
                              },
                            )}

                          </tr>
                        );
                      },
                    )
                  )}

                </tbody>

              </table>

            </div>

            {students.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-slate-100 bg-[#fbfcfb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div className="flex items-center gap-2 text-[9px] text-slate-400">

                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={12} />
                  </div>

                  <span>
                    Pastikan seluruh aspek kepribadian
                    telah dinilai sebelum menyimpan.
                  </span>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#07543f] px-4 text-[10px] font-semibold text-white transition hover:bg-[#064735] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      Simpan Perubahan
                    </>
                  )}
                </button>

              </div>
            )}

          </form>
        )}

      </div>
    </div>
  );
}