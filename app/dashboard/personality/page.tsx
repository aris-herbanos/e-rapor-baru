
'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Loader2,
  Save,
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

type PersonalityRecord = {
  studentId: number;
  suluk?: string | null;
  muwadhotah?: string | null;
  nadzofah?: string | null;
  indhiplat?: string | null;
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

const defaultPersonality: PersonalityValue = {
  suluk: '-',
  muwadhotah: '-',
  nadzofah: '-',
  indhiplat: '-',
};

export default function PersonalityPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState('');

  const [personalityData, setPersonalityData] = useState<
    Record<number, PersonalityValue>
  >({});

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [message, setMessage] = useState('');

  // =========================================================
  // LOAD KELAS
  // =========================================================

  useEffect(() => {
    let active = true;

    const loadClasses = async () => {
      try {
        setLoadingClasses(true);

        const res = await fetch('/api/classes', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Gagal mengambil data kelas.');
        }

        const data = await res.json();

        let classList: ClassRoom[] = Array.isArray(data)
          ? data
          : data?.data || [];

        // FALLBACK: AMBIL KELAS DARI DATA SANTRI

        if (classList.length === 0) {
          const studentRes = await fetch('/api/students', {
            cache: 'no-store',
          });

          if (!studentRes.ok) {
            throw new Error('Gagal mengambil data santri.');
          }

          const studentData = await studentRes.json();

          const studentsArr = Array.isArray(studentData)
            ? studentData
            : studentData?.students || studentData?.data || [];

          const uniqueClasses = Array.from(
            new Set(
              studentsArr
                .map((student: Student) =>
                  String(student.class_name ?? '').trim(),
                )
                .filter(Boolean),
            ),
          ).sort((a, b) =>
            a.localeCompare(b, undefined, {
              numeric: true,
            }),
          );

          classList = uniqueClasses.map((className, index) => ({
            id: index + 1,
            name: className,
            level: '-',
            grade: 1,
          }));
        }

        if (active) {
          setClasses(classList);
        }
      } catch (error) {
        console.error('Error loading classes:', error);

        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : 'Gagal memuat daftar kelas.',
          );
        }
      } finally {
        if (active) {
          setLoadingClasses(false);
        }
      }
    };

    loadClasses();

    return () => {
      active = false;
    };
  }, []);

  // =========================================================
  // LOAD SANTRI + PERSONALITY
  // =========================================================

  useEffect(() => {
    let active = true;

    if (!selectedClass) {
      setStudents([]);
      setPersonalityData({});
      setMessage('');
      return;
    }

    const loadData = async () => {
      setLoadingData(true);
      setMessage('');
      setStudents([]);
      setPersonalityData({});

      try {
        const [studentsRes, personalityRes] = await Promise.all([
          fetch('/api/students', {
            cache: 'no-store',
          }),
          fetch(
            `/api/personality?className=${encodeURIComponent(selectedClass)}`,
            {
              cache: 'no-store',
            },
          ),
        ]);

        if (!studentsRes.ok) {
          throw new Error('Gagal memuat data santri.');
        }

        if (!personalityRes.ok) {
          throw new Error('Gagal memuat data kepribadian.');
        }

        const [allStudentsData, persData] = await Promise.all([
          studentsRes.json(),
          personalityRes.json(),
        ]);

        const allStudents = Array.isArray(allStudentsData)
          ? allStudentsData
          : allStudentsData?.students || allStudentsData?.data || [];

        const filtered: Student[] = Array.isArray(allStudents)
          ? allStudents.filter(
              (student: Student) =>
                student.class_name === selectedClass,
            )
          : [];

        const persList = Array.isArray(persData)
          ? persData
          : persData?.data || [];

        const map: Record<number, PersonalityValue> = {};

        if (Array.isArray(persList)) {
          persList.forEach((item: PersonalityRecord) => {
            map[item.studentId] = {
              suluk: item.suluk || '-',
              muwadhotah: item.muwadhotah || '-',
              nadzofah: item.nadzofah || '-',
              indhiplat: item.indhiplat || '-',
            };
          });
        }

        if (active) {
          setStudents(filtered);
          setPersonalityData(map);
        }
      } catch (error) {
        console.error('Error loading personality data:', error);

        if (active) {
          setStudents([]);
          setPersonalityData({});

          setMessage(
            error instanceof Error
              ? error.message
              : 'Gagal memuat data kepribadian.',
          );
        }
      } finally {
        if (active) {
          setLoadingData(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [selectedClass]);

  // =========================================================
  // CHANGE VALUE
  // =========================================================

  const handleChange = (
    studentId: number,
    field: keyof PersonalityValue,
    value: string,
  ) => {
    setPersonalityData((prev) => ({
      ...prev,
      [studentId]: {
        ...defaultPersonality,
        ...prev[studentId],
        [field]: value,
      },
    }));

    if (message) {
      setMessage('');
    }
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedClass || students.length === 0 || loading) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const records = students.map((student) => ({
        studentId: student.id,
        suluk: personalityData[student.id]?.suluk || '-',
        muwadhotah:
          personalityData[student.id]?.muwadhotah || '-',
        nadzofah: personalityData[student.id]?.nadzofah || '-',
        indhiplat:
          personalityData[student.id]?.indhiplat || '-',
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
          data?.message || 'Gagal menyimpan penilaian.',
        );
      }

      setMessage(
        'success:Penilaian kepribadian berhasil disimpan.',
      );
    } catch (error) {
      console.error('Save personality error:', error);

      setMessage(
        `error:${
          error instanceof Error
            ? error.message
            : 'Terjadi kesalahan saat menyimpan data.'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SELECTED CLASS
  // =========================================================

  const selectedClassData = useMemo(
    () => classes.find((item) => item.name === selectedClass),
    [classes, selectedClass],
  );

  // =========================================================
  // STATISTIK
  // =========================================================

  const evaluatedStudents = useMemo(() => {
    return students.filter((student) => {
      const values = personalityData[student.id];

      return (
        values &&
        values.suluk !== '-' &&
        values.muwadhotah !== '-' &&
        values.nadzofah !== '-' &&
        values.indhiplat !== '-'
      );
    }).length;
  }, [students, personalityData]);

  const totalAssessments = students.length * personalityFields.length;

  const filledAssessments = useMemo(() => {
    return students.reduce((total, student) => {
      const values = personalityData[student.id];

      if (!values) return total;

      return (
        total +
        personalityFields.filter(
          (field) => values[field.key] && values[field.key] !== '-',
        ).length
      );
    }, 0);
  }, [students, personalityData]);

  // =========================================================
  // HELPERS
  // =========================================================

  const getInitial = (name: string) => {
    return name?.charAt(0)?.toUpperCase() || 'S';
  };

  const getPredicateStyle = (value: string) => {
    if (value.includes('Mumtaz')) {
      return 'bg-green-50 text-green-800 border-green-200';
    }

    if (value.includes('Jiddan')) {
      return 'bg-blue-50 text-blue-800 border-blue-200';
    }

    if (value.includes('Jeid')) {
      return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    }

    if (value.includes('Maqbul')) {
      return 'bg-orange-50 text-orange-800 border-orange-200';
    }

    return 'bg-[#f6f7f7] text-[#646970] border-[#dcdcde]';
  };

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success:|error:)/, '');

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f0f0f1] p-4 sm:p-5">

      {/* HEADER */}

      <div className="mb-5">
        <h1 className="text-[23px] font-normal leading-tight text-[#1d2327]">
          Kepribadian & Akhlak Santri
        </h1>

        <p className="mt-1 text-[13px] text-[#646970]">
          Kelola penilaian perilaku, ketekunan, kebersihan, dan kedisiplinan santri.
        </p>
      </div>

      {/* NOTIFIKASI */}

      {message && (
        <div
          className={`mb-4 flex items-start gap-2 border-l-4 bg-white px-4 py-3 text-[13px] shadow-sm ${
            isSuccess
              ? 'border-green-600 text-[#1d2327]'
              : 'border-red-600 text-[#1d2327]'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-green-700"
            />
          ) : (
            <ClipboardCheck
              size={16}
              className="mt-0.5 shrink-0 text-red-600"
            />
          )}

          <span>{displayMessage}</span>
        </div>
      )}

      {/* FILTER KELAS */}

      <section className="mb-4 border border-[#dcdcde] bg-white shadow-sm">

        <div className="border-b border-[#dcdcde] px-4 py-3">
          <h2 className="text-[14px] font-semibold text-[#1d2327]">
            Pilih Kelas
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">

          <div>
            <label
              htmlFor="personality-class"
              className="mb-1.5 block text-[13px] font-medium text-[#1d2327]"
            >
              Kelas yang Dinilai
            </label>

            <select
              id="personality-class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={loadingClasses}
              className="h-9 w-full rounded-sm border border-[#8c8f94] bg-white px-2.5 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {loadingClasses ? 'Memuat kelas...' : '-- Pilih Kelas --'}
              </option>

              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  Kelas {cls.name}
                  {cls.level && cls.level !== '-' ? ` • ${cls.level}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <p className="pb-2 text-[12px] text-[#646970]">
              Pilih kelas untuk menampilkan daftar santri dan mengisi penilaian kepribadian.
            </p>
          </div>

        </div>
      </section>

      {/* RINGKASAN */}

      {selectedClass && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-blue-50 text-[#2271b1]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Jumlah Santri
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {students.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-green-50 text-green-700">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Santri Dinilai Lengkap
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {evaluatedStudents}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-orange-50 text-orange-700">
              <ClipboardCheck size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Aspek Terisi
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {filledAssessments}
                <span className="ml-1 text-[12px] font-normal text-[#646970]">
                  / {totalAssessments}
                </span>
              </p>
            </div>
          </div>

        </div>
      )}

      {/* LOADING */}

      {selectedClass && loadingData && (
        <div className="border border-[#dcdcde] bg-white px-4 py-14 text-center shadow-sm">
          <Loader2
            size={24}
            className="mx-auto animate-spin text-[#2271b1]"
          />

          <p className="mt-3 text-[13px] text-[#646970]">
            Memuat data santri dan penilaian kepribadian...
          </p>
        </div>
      )}

      {/* BELUM MEMILIH KELAS */}

      {!selectedClass && (
        <div className="border border-[#dcdcde] bg-white px-4 py-16 text-center shadow-sm">
          <Award
            size={32}
            className="mx-auto text-[#a7aaad]"
          />

          <h2 className="mt-3 text-[15px] font-medium text-[#1d2327]">
            Pilih Kelas Terlebih Dahulu
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-[#646970]">
            Silakan pilih kelas untuk menampilkan daftar santri dan mulai mengisi penilaian kepribadian.
          </p>
        </div>
      )}

      {/* TABEL PENILAIAN */}

      {selectedClass && !loadingData && (
        <form
          onSubmit={handleSave}
          className="border border-[#dcdcde] bg-white shadow-sm"
        >

          {/* HEADER TABEL */}

          <div className="flex flex-col gap-3 border-b border-[#dcdcde] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-[14px] font-semibold text-[#1d2327]">
                Daftar Penilaian Kepribadian
              </h2>

              <p className="mt-1 text-[12px] text-[#646970]">
                Kelas {selectedClassData?.name || selectedClass}
                {selectedClassData?.level &&
                  selectedClassData.level !== '-' &&
                  ` • ${selectedClassData.level}`}
                {' '}• {students.length} santri
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || students.length === 0}
              className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Simpan Penilaian
                </>
              )}
            </button>

          </div>

          {/* TABEL */}

          {students.length === 0 ? (
            <div className="px-4 py-14 text-center">
              <Users
                size={30}
                className="mx-auto text-[#a7aaad]"
              />

              <p className="mt-3 text-[13px] font-medium text-[#1d2327]">
                Belum ada santri
              </p>

              <p className="mt-1 text-[12px] text-[#646970]">
                Tidak ditemukan data santri pada kelas yang dipilih.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse text-left text-[13px]">

                <thead>
                  <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[12px] font-semibold text-[#2c3338]">

                    <th className="w-14 px-3 py-3 text-center">
                      No.
                    </th>

                    <th className="sticky left-0 z-10 min-w-[230px] bg-[#f6f7f7] px-3 py-3">
                      Nama Santri
                    </th>

                    {personalityFields.map((field) => (
                      <th
                        key={field.key}
                        className="min-w-[185px] px-3 py-3 text-center"
                      >
                        <div className="font-semibold text-[#2c3338]">
                          {field.title}
                        </div>

                        <div
                          dir="rtl"
                          className="mt-0.5 font-serif text-[12px] font-normal text-[#646970]"
                        >
                          {field.arabic}
                        </div>

                        <div className="mt-1 text-[10px] font-normal text-[#646970]">
                          {field.description}
                        </div>
                      </th>
                    ))}

                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => {
                    const values =
                      personalityData[student.id] || defaultPersonality;

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-[#f0f0f1] hover:bg-[#f6f7f7]"
                      >

                        <td className="px-3 py-3 text-center text-[#646970]">
                          {index + 1}
                        </td>

                        <td className="sticky left-0 z-10 bg-white px-3 py-3">
                          <div className="flex items-center gap-2.5">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f6fc] text-[12px] font-semibold text-[#2271b1]">
                              {getInitial(student.fullname)}
                            </div>

                            <div className="min-w-0">
                              <div className="truncate font-medium text-[#2271b1]">
                                {student.fullname}
                              </div>

                              {student.nisn && (
                                <div className="mt-0.5 text-[11px] text-[#646970]">
                                  NISN: {student.nisn}
                                </div>
                              )}
                            </div>

                          </div>
                        </td>

                        {personalityFields.map((field) => {
                          const value = values[field.key] || '-';

                          return (
                            <td
                              key={field.key}
                              className="px-3 py-3"
                            >
                              <div className="relative">

                                <select
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(
                                      student.id,
                                      field.key,
                                      e.target.value,
                                    )
                                  }
                                  className={`h-9 w-full appearance-none rounded-sm border px-2.5 pr-8 text-[11px] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] ${getPredicateStyle(value)}`}
                                >
                                  {predikats.map((predicate) => (
                                    <option
                                      key={predicate}
                                      value={predicate}
                                    >
                                      {predicate}
                                    </option>
                                  ))}
                                </select>

                                <ChevronDown
                                  size={13}
                                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-current opacity-50"
                                />

                              </div>
                            </td>
                          );
                        })}

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          )}

          {/* FOOTER */}

          {students.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="text-[12px] text-[#646970]">
                <strong className="text-[#1d2327]">
                  {filledAssessments}
                </strong>
                {' '}dari{' '}
                <strong className="text-[#1d2327]">
                  {totalAssessments}
                </strong>
                {' '}aspek penilaian telah diisi.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Simpan Perubahan
                  </>
                )}
              </button>

            </div>
          )}

        </form>
      )}

    </main>
  );
}
