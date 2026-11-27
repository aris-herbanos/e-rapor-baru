
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Users,
  X,
  School,
  Info,
} from 'lucide-react';

type Teacher = {
  id: number;
  fullname: string;
  identity_number?: string | null;
  status?: string | null;
};

type Subject = {
  id: number;
  name: string;
  level?: string | null;
};

type Assignment = {
  id: number;
  teacherId?: number;
  subjectId?: number;
  className?: string | null;
  teacher?: { id?: number; fullname?: string | null } | null;
  subject?: { id?: number; name?: string | null } | null;
};

const availableClasses = [
  '7A', '7B',
  '8A', '8B',
  '9A', '9B',
  '10A', '10B',
  '11A', '11B',
  '12A', '12B',
];

/* =========================================================
   HELPER
========================================================= */

function normalizeArray<T>(
  data: unknown,
  possibleKeys: string[] = []
): T[] {
  if (Array.isArray(data)) return data as T[];

  if (data && typeof data === 'object') {
    const objectData = data as Record<string, unknown>;

    for (const key of possibleKeys) {
      if (Array.isArray(objectData[key])) {
        return objectData[key] as T[];
      }
    }

    if (Array.isArray(objectData.data)) {
      return objectData.data as T[];
    }
  }

  return [];
}

function normalizeSubjectName(name: string): string {
  return String(name || '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('id-ID');
}

function getLevelFromClass(classValue: string): 'SMP' | 'SMA' {
  const match = String(classValue || '').match(/\d+/);
  const grade = match ? Number(match[0]) : 7;

  return grade >= 10 ? 'SMA' : 'SMP';
}

function getClassLabel(classValue: string): string {
  return /^kelas\s/i.test(classValue)
    ? classValue
    : `Kelas ${classValue}`;
}

async function getApiError(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = await response.json();
    return data?.message || data?.error || fallback;
  } catch {
    return fallback;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [teacherId, setTeacherId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [className, setClassName] = useState('7A');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const [loading, setLoading] = useState(true);
  const [subjectLoading, setSubjectLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const activeLevel = getLevelFromClass(className);

  /* =======================================================
     LOAD SUBJECTS SESUAI JENJANG KELAS
  ======================================================= */

  const fetchSubjects = useCallback(async (level: 'SMP' | 'SMA') => {
    try {
      setSubjectLoading(true);
      setSubjectId('');

      const response = await fetch(
        `/api/subjects?level=${level}`,
        { cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error(
          await getApiError(
            response,
            `Gagal memuat mata pelajaran ${level}.`
          )
        );
      }

      const result = await response.json();

      const subjectData = normalizeArray<Subject>(
        result,
        ['subjects', 'subject']
      );

      // Filter tambahan untuk memastikan jenjang sesuai.
      const correctLevel = subjectData.filter((subject) => {
        if (!subject.level) return true;

        return String(subject.level).toUpperCase() === level;
      });

      // Hilangkan nama mapel yang sama dalam jenjang yang sama.
      // ID pertama dipertahankan agar relasi penugasan tetap valid.
      const uniqueSubjects = new Map<string, Subject>();

      for (const subject of correctLevel) {
        const name = String(subject.name || '').trim();

        if (!name) continue;

        const key = normalizeSubjectName(name);

        if (!uniqueSubjects.has(key)) {
          uniqueSubjects.set(key, {
            ...subject,
            name,
          });
        }
      }

      const finalSubjects = Array.from(uniqueSubjects.values())
        .sort((a, b) => a.name.localeCompare(b.name, 'id'));

      setSubjects(finalSubjects);
    } catch (error) {
      console.error('FETCH SUBJECTS ERROR:', error);
      setSubjects([]);
      setMessageType('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat mata pelajaran.'
      );
    } finally {
      setSubjectLoading(false);
    }
  }, []);

  /* =======================================================
     LOAD ASSIGNMENTS & TEACHERS
  ======================================================= */

  const fetchMainData = useCallback(async () => {
    try {
      setLoading(true);
      setMessage('');

      const [resAssignments, resTeachers] = await Promise.all([
        fetch('/api/assignments', { cache: 'no-store' }),
        fetch('/api/teachers', { cache: 'no-store' }),
      ]);

      if (!resAssignments.ok) {
        throw new Error(
          await getApiError(
            resAssignments,
            'Gagal memuat data pembagian tugas.'
          )
        );
      }

      if (!resTeachers.ok) {
        throw new Error(
          await getApiError(
            resTeachers,
            'Gagal memuat data guru.'
          )
        );
      }

      const assignmentsData = await resAssignments.json();
      const teachersData = await resTeachers.json();

      setAssignments(
        normalizeArray<Assignment>(
          assignmentsData,
          ['assignments']
        )
      );

      setTeachers(
        normalizeArray<Teacher>(
          teachersData,
          ['teachers', 'teacher']
        )
      );
    } catch (error) {
      console.error('FETCH MAIN DATA ERROR:', error);

      setMessageType('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat data.'
      );

      setAssignments([]);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchMainData();
  }, [fetchMainData]);

  /* =======================================================
     LOAD ULANG MAPEL KETIKA KELAS BERUBAH
  ======================================================= */

  useEffect(() => {
    fetchSubjects(activeLevel);
  }, [activeLevel, fetchSubjects]);

  /* =======================================================
     REFRESH SEMUA DATA
  ======================================================= */

  const handleRefresh = async () => {
    await Promise.all([
      fetchMainData(),
      fetchSubjects(activeLevel),
    ]);
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setTeacherId('');
    setSubjectId('');
    setClassName('7A');
  };

  /* =======================================================
     CHANGE CLASS
  ======================================================= */

  const handleClassChange = (value: string) => {
    const oldLevel = getLevelFromClass(className);
    const newLevel = getLevelFromClass(value);

    setClassName(value);
    setSubjectId('');

    if (oldLevel !== newLevel) {
      setSubjects([]);
    }
  };

  /* =======================================================
     SAVE ASSIGNMENT
  ======================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setMessage('');

    if (!teacherId || !subjectId || !className) {
      setMessageType('error');
      setMessage(
        'Mohon lengkapi Guru, Mata Pelajaran, dan Kelas.'
      );
      return;
    }

    const selectedSubject = subjects.find(
      (subject) => String(subject.id) === subjectId
    );

    if (!selectedSubject) {
      setMessageType('error');
      setMessage(
        'Mata pelajaran tidak valid. Silakan pilih kembali.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId: Number(teacherId),
          subjectId: Number(subjectId),
          className,
        }),
      });

      if (!response.ok) {
        throw new Error(
          await getApiError(
            response,
            'Gagal menyimpan pembagian tugas.'
          )
        );
      }

      setMessageType('success');
      setMessage(
        'Pembagian tugas mengajar berhasil ditambahkan.'
      );

      resetForm();
      await fetchMainData();
    } catch (error) {
      setMessageType('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan pembagian tugas.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredAssignments = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase('id-ID');

    if (!keyword) return assignments;

    return assignments.filter((assignment) => {
      const teacherName = assignment.teacher?.fullname || '';
      const subjectName = assignment.subject?.name || '';
      const classValue = assignment.className || '';

      return (
        teacherName.toLocaleLowerCase('id-ID').includes(keyword) ||
        subjectName.toLocaleLowerCase('id-ID').includes(keyword) ||
        classValue.toLocaleLowerCase('id-ID').includes(keyword)
      );
    });
  }, [assignments, search]);

  /* =======================================================
     SUMMARY
  ======================================================= */

  const totalClasses = useMemo(() => {
    return new Set(
      assignments
        .map((assignment) => assignment.className)
        .filter(Boolean)
    ).size;
  }, [assignments]);

  const selectedTeacher = teachers.find(
    (teacher) => String(teacher.id) === teacherId
  );

  const selectedSubject = subjects.find(
    (subject) => String(subject.id) === subjectId
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="space-y-5">

      {/* PAGE TITLE */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[23px] font-normal text-[#1d2327]">
            Pembagian Tugas Mengajar
          </h1>

          <p className="mt-1 text-[13px] text-[#646970]">
            Atur guru yang mengajar setiap mata pelajaran di masing-masing kelas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading || subjectLoading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#1d2327] hover:bg-[#f6f7f7] disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading || subjectLoading ? 'animate-spin' : ''}
          />
          Perbarui Data
        </button>
      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={`flex items-start gap-3 rounded-[3px] border-l-4 bg-white px-4 py-3 text-[13px] ${
            messageType === 'success'
              ? 'border-[#00a32a]'
              : 'border-[#d63638]'
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-[#00a32a]"
            />
          ) : (
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-[#d63638]"
            />
          )}

          <span className="flex-1 text-[#1d2327]">
            {message}
          </span>

          <button
            type="button"
            onClick={() => setMessage('')}
            className="text-[#646970] hover:text-[#1d2327]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* INFO WIDGET */}

      <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">
        <div className="border-b border-[#c3c4c7] bg-[#1d2327] px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} />
            <h2 className="text-[16px] font-medium">
              Panduan Pembagian Tugas
            </h2>
          </div>

          <p className="mt-1 text-[13px] text-[#c3c4c7]">
            Gunakan halaman ini untuk menentukan siapa yang mengajar mata pelajaran di setiap kelas.
          </p>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-3">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2271b1] text-[13px] font-semibold text-white">
              1
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-[#1d2327]">
                Pilih Guru
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#646970]">
                Tentukan guru atau ustadz yang akan mengajar.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2271b1] text-[13px] font-semibold text-white">
              2
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-[#1d2327]">
                Pilih Mata Pelajaran
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#646970]">
                Pilih mapel sesuai jenjang kelas yang dipilih.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2271b1] text-[13px] font-semibold text-white">
              3
            </div>
            <div>
              <h3 className="text-[13px] font-medium text-[#1d2327]">
                Pilih Kelas & Simpan
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#646970]">
                Tentukan kelas yang diajar, lalu tekan tombol Simpan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 border-t border-[#e2e4e7] bg-[#f6f7f7] px-4 py-3">
          <Info
            size={16}
            className="mt-0.5 shrink-0 text-[#2271b1]"
          />
          <p className="text-[12px] leading-relaxed text-[#646970]">
            <strong className="text-[#1d2327]">Informasi:</strong>{' '}
            Kelas 7–9 otomatis menggunakan daftar mapel SMP, sedangkan kelas 10–12 menggunakan daftar mapel SMA.
          </p>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          icon={BookOpen}
          label="Total Tugas Mengajar"
          value={assignments.length}
          description="Jumlah pembagian tugas"
        />

        <StatCard
          icon={Users}
          label="Jumlah Guru"
          value={teachers.length}
          description="Guru terdaftar"
        />

        <StatCard
          icon={School}
          label="Kelas Terisi"
          value={totalClasses}
          description="Kelas dengan pengampu"
        />
      </div>

      {/* MAIN CONTENT */}

      <div className="grid items-start gap-5 xl:grid-cols-[330px_minmax(0,1fr)]">

        {/* FORM */}

        <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">
          <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">
            <h2 className="text-[14px] font-medium text-[#1d2327]">
              Tambah Tugas Mengajar
            </h2>
            <p className="mt-1 text-[12px] text-[#646970]">
              Isi data berikut untuk membuat penugasan baru.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-4">

            {/* TEACHER */}

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
                Guru / Ustadz
                <span className="ml-1 text-[#d63638]">*</span>
              </label>

              <div className="relative">
                <select
                  value={teacherId}
                  onChange={(event) => setTeacherId(event.target.value)}
                  required
                  disabled={loading || teachers.length === 0}
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >
                  <option value="">
                    {loading
                      ? 'Sedang memuat guru...'
                      : teachers.length === 0
                        ? 'Belum ada data guru'
                        : '— Pilih Guru / Ustadz —'}
                  </option>

                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.fullname}
                      {teacher.status === 'Nonaktif'
                        ? ' (Nonaktif)'
                        : ''}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />
              </div>

              <p className="mt-1 text-[11px] text-[#646970]">
                Pilih nama guru yang bertanggung jawab mengajar.
              </p>
            </div>

            {/* CLASS */}

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
                Kelas yang Diajar
                <span className="ml-1 text-[#d63638]">*</span>
              </label>

              <div className="relative">
                <select
                  value={className}
                  onChange={(event) => handleClassChange(event.target.value)}
                  required
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                >
                  {availableClasses.map((classValue) => (
                    <option key={classValue} value={classValue}>
                      {getClassLabel(classValue)}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />
              </div>

              <p className="mt-1 text-[11px] text-[#646970]">
                Pilih kelas terlebih dahulu. Jenjang mapel akan menyesuaikan otomatis.
              </p>
            </div>

            {/* SUBJECT */}

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label className="block text-[13px] font-medium text-[#1d2327]">
                  Mata Pelajaran
                  <span className="ml-1 text-[#d63638]">*</span>
                </label>

                <span className="rounded-[3px] bg-[#eaf3fb] px-2 py-1 text-[10px] font-semibold text-[#2271b1]">
                  Jenjang {activeLevel}
                </span>
              </div>

              <div className="relative">
                <select
                  value={subjectId}
                  onChange={(event) => setSubjectId(event.target.value)}
                  required
                  disabled={subjectLoading || subjects.length === 0}
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >
                  <option value="">
                    {subjectLoading
                      ? `Memuat mapel ${activeLevel}...`
                      : subjects.length === 0
                        ? `Belum ada mapel ${activeLevel}`
                        : '— Pilih Mata Pelajaran —'}
                  </option>

                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />
              </div>

              <p className="mt-1 text-[11px] text-[#646970]">
                {subjectLoading
                  ? 'Sedang mengambil daftar mata pelajaran...'
                  : `${subjects.length} mata pelajaran tersedia untuk jenjang ${activeLevel}.`}
              </p>
            </div>

            {/* PREVIEW */}

            {teacherId && subjectId && className && (
              <div className="rounded-[3px] border border-[#c3c4c7] bg-[#f6f7f7] p-3">
                <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#646970]">
                  Ringkasan Penugasan
                </div>

                <div className="space-y-1 text-[12px] text-[#1d2327]">
                  <div>
                    <span className="text-[#646970]">Guru: </span>
                    <strong>{selectedTeacher?.fullname || '-'}</strong>
                  </div>

                  <div>
                    <span className="text-[#646970]">Mapel: </span>
                    <strong>{selectedSubject?.name || '-'}</strong>
                  </div>

                  <div>
                    <span className="text-[#646970]">Kelas: </span>
                    <strong>{className}</strong>
                  </div>

                  <div>
                    <span className="text-[#646970]">Jenjang: </span>
                    <strong>{activeLevel}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={
                submitting ||
                loading ||
                subjectLoading ||
                teachers.length === 0 ||
                subjects.length === 0
              }
              className="flex w-full items-center justify-center gap-2 rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Simpan Tugas Mengajar
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={submitting}
              className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-4 py-2 text-[13px] text-[#1d2327] hover:bg-[#f6f7f7] disabled:opacity-50"
            >
              Kosongkan Form
            </button>
          </form>
        </div>

        {/* ASSIGNMENT LIST */}

        <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

          <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[14px] font-medium text-[#1d2327]">
                  Daftar Tugas Mengajar
                </h2>

                <p className="mt-1 text-[12px] text-[#646970]">
                  {filteredAssignments.length === assignments.length
                    ? `${assignments.length} tugas mengajar terdaftar`
                    : `Menampilkan ${filteredAssignments.length} dari ${assignments.length} tugas`}
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari guru, mapel, kelas..."
                  className="w-full rounded-[3px] border border-[#8c8f94] bg-white py-2 pl-9 pr-3 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center text-[13px] text-[#646970]">
              <Loader2 size={18} className="mr-2 animate-spin" />
              Sedang memuat data tugas mengajar...
            </div>
          ) : assignments.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f0f1]">
                <BookOpen size={24} className="text-[#646970]" />
              </div>

              <h3 className="text-[14px] font-medium text-[#1d2327]">
                Belum Ada Tugas Mengajar
              </h3>

              <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-[#646970]">
                Silakan tambahkan pembagian tugas mengajar melalui formulir di sebelah kiri.
              </p>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
              <Search size={30} className="mb-3 text-[#c3c4c7]" />

              <h3 className="text-[14px] font-medium text-[#1d2327]">
                Data Tidak Ditemukan
              </h3>

              <p className="mt-2 text-[12px] text-[#646970]">
                Coba gunakan kata kunci lain.
              </p>

              <button
                type="button"
                onClick={() => setSearch('')}
                className="mt-3 text-[13px] text-[#2271b1] hover:underline"
              >
                Hapus pencarian
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-[#c3c4c7] bg-[#f0f0f1] text-left text-[#1d2327]">
                    <th className="w-12 px-3 py-3 text-center font-medium">
                      No.
                    </th>
                    <th className="px-4 py-3 font-medium">
                      Guru / Ustadz
                    </th>
                    <th className="px-4 py-3 font-medium">
                      Mata Pelajaran
                    </th>
                    <th className="w-28 px-4 py-3 text-center font-medium">
                      Kelas
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAssignments.map((assignment, index) => (
                    <tr
                      key={assignment.id}
                      className="border-b border-[#e2e4e7] last:border-b-0 hover:bg-[#f6f7f7]"
                    >
                      <td className="px-3 py-3 text-center text-[#646970]">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f1] text-[#2271b1]">
                            <GraduationCap size={16} />
                          </div>

                          <span className="font-medium text-[#1d2327]">
                            {assignment.teacher?.fullname ||
                              'Nama guru belum tersedia'}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-[#1d2327]">
                        {assignment.subject?.name ||
                          'Mata pelajaran belum tersedia'}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex rounded-[3px] border border-[#c3c4c7] bg-[#f6f7f7] px-2.5 py-1 text-[12px] font-medium text-[#1d2327]">
                          {assignment.className || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && assignments.length > 0 && (
            <div className="border-t border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">
              <p className="text-[12px] text-[#646970]">
                Data ini menjadi acuan guru untuk mengisi kehadiran, asesmen, dan rapor pada kelas serta mata pelajaran yang ditugaskan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-[#f0f0f1] text-[#2271b1]">
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <div className="text-[12px] text-[#646970]">
            {label}
          </div>

          <div className="mt-0.5 text-[23px] font-semibold leading-none text-[#1d2327]">
            {value}
          </div>

          <div className="mt-1 text-[11px] text-[#646970]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
