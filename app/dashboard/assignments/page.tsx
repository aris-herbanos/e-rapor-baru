
'use client';

import { useEffect, useMemo, useState } from 'react';
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
};

type Assignment = {
  id: number;
  teacherId?: number;
  subjectId?: number;
  className?: string | null;
  teacher?: { id?: number; fullname?: string | null } | null;
  subject?: { id?: number; name?: string | null } | null;
};

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

async function getApiError(
  response: Response,
  fallback: string
) {
  try {
    const data = await response.json();
    return data?.message || data?.error || fallback;
  } catch {
    return fallback;
  }
}

const availableClasses = [
  '7A', '7B',
  '8A', '8B',
  '9A', '9B',
  '10A', '10B',
  '11A', '11B',
  '12A', '12B',
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [teacherId, setTeacherId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [className, setClassName] = useState('7A');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<
    'success' | 'error'
  >('success');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  // =========================================================
  // LOAD DATA
  // =========================================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setMessage('');

      const [resAssig, resTeach, resSubj] = await Promise.all([
        fetch('/api/assignments', { cache: 'no-store' }),
        fetch('/api/teachers', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
      ]);

      if (!resAssig.ok) {
        throw new Error(
          await getApiError(
            resAssig,
            'Gagal memuat data pembagian tugas.'
          )
        );
      }

      const dataAssig = await resAssig.json();

      setAssignments(
        normalizeArray<Assignment>(
          dataAssig,
          ['assignments']
        )
      );

      if (resTeach.ok) {
        const dataTeach = await resTeach.json();

        setTeachers(
          normalizeArray<Teacher>(
            dataTeach,
            ['teachers', 'teacher']
          )
        );
      } else {
        setTeachers([]);
      }

      if (resSubj.ok) {
        const dataSubj = await resSubj.json();

        setSubjects(
          normalizeArray<Subject>(
            dataSubj,
            ['subjects', 'subject']
          )
        );
      } else {
        setSubjects([]);
      }
    } catch (error: any) {
      setMessageType('error');
      setMessage(
        error?.message || 'Gagal memuat data.'
      );

      setAssignments([]);
      setTeachers([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setTeacherId('');
    setSubjectId('');
    setClassName('7A');
  };

  // =========================================================
  // SAVE ASSIGNMENT
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage('');

    if (!teacherId || !subjectId || !className) {
      setMessageType('error');
      setMessage(
        'Mohon lengkapi Guru, Mata Pelajaran, dan Kelas.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId,
          subjectId,
          className,
        }),
      });

      if (!res.ok) {
        throw new Error(
          await getApiError(
            res,
            'Gagal menyimpan pembagian tugas.'
          )
        );
      }

      await res.json();

      setMessageType('success');
      setMessage(
        'Pembagian tugas mengajar berhasil ditambahkan.'
      );

      resetForm();

      await fetchData();
    } catch (error: any) {
      setMessageType('error');
      setMessage(
        error?.message ||
          'Terjadi kesalahan saat menyimpan pembagian tugas.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredAssignments = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return assignments;

    return assignments.filter((a) => {
      const teacherName = a.teacher?.fullname || '';
      const subjectName = a.subject?.name || '';
      const classNameValue = a.className || '';

      return (
        teacherName.toLowerCase().includes(keyword) ||
        subjectName.toLowerCase().includes(keyword) ||
        classNameValue.toLowerCase().includes(keyword)
      );
    });
  }, [assignments, search]);

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalClasses = useMemo(() => {
    return new Set(
      assignments
        .map((a) => a.className)
        .filter(Boolean)
    ).size;
  }, [assignments]);

  const selectedTeacher = teachers.find(
    (t) => String(t.id) === teacherId
  );

  const selectedSubject = subjects.find(
    (s) => String(s.id) === subjectId
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-5">

      {/* =====================================================
          PAGE TITLE
      ====================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-[23px] font-normal text-[#1d2327]">
            Pembagian Tugas Mengajar
          </h1>

          <p className="mt-1 text-[13px] text-[#646970]">
            Atur guru yang mengajar setiap mata pelajaran
            di masing-masing kelas.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#1d2327] hover:bg-[#f6f7f7] disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? 'animate-spin' : ''}
          />
          Perbarui Data
        </button>

      </div>

      {/* =====================================================
          MESSAGE
      ====================================================== */}

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
            onClick={() => setMessage('')}
            className="text-[#646970] hover:text-[#1d2327]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* =====================================================
          INFO WIDGET
      ====================================================== */}

      <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

        <div className="border-b border-[#c3c4c7] bg-[#1d2327] px-5 py-4 text-white">

          <div className="flex items-center gap-2">
            <GraduationCap size={20} />

            <h2 className="text-[16px] font-medium">
              Panduan Pembagian Tugas
            </h2>
          </div>

          <p className="mt-1 text-[13px] text-[#c3c4c7]">
            Gunakan halaman ini untuk menentukan siapa yang
            mengajar mata pelajaran di setiap kelas.
          </p>

        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-3">

          {/* STEP 1 */}

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

          {/* STEP 2 */}

          <div className="flex gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2271b1] text-[13px] font-semibold text-white">
              2
            </div>

            <div>
              <h3 className="text-[13px] font-medium text-[#1d2327]">
                Pilih Mata Pelajaran
              </h3>

              <p className="mt-1 text-[12px] leading-relaxed text-[#646970]">
                Pilih mata pelajaran yang menjadi tanggung
                jawab guru tersebut.
              </p>
            </div>

          </div>

          {/* STEP 3 */}

          <div className="flex gap-3">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2271b1] text-[13px] font-semibold text-white">
              3
            </div>

            <div>
              <h3 className="text-[13px] font-medium text-[#1d2327]">
                Pilih Kelas & Simpan
              </h3>

              <p className="mt-1 text-[12px] leading-relaxed text-[#646970]">
                Tentukan kelas yang diajar, lalu tekan
                tombol Simpan.
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
            <strong className="text-[#1d2327]">
              Contoh:
            </strong>{' '}
            Ustadz Ahmad mengajar Bahasa Arab di kelas 7A.
            Artinya, buat satu penugasan dengan Guru:
            Ustadz Ahmad, Mata Pelajaran: Bahasa Arab,
            Kelas: 7A.
          </p>

        </div>

      </div>

      {/* =====================================================
          SUMMARY
      ====================================================== */}

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

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid items-start gap-5 xl:grid-cols-[330px_minmax(0,1fr)]">

        {/* ===================================================
            FORM
        ==================================================== */}

        <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

          {/* FORM HEADER */}

          <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">

            <h2 className="text-[14px] font-medium text-[#1d2327]">
              Tambah Tugas Mengajar
            </h2>

            <p className="mt-1 text-[12px] text-[#646970]">
              Isi data berikut untuk membuat penugasan baru.
            </p>

          </div>

          {/* FORM BODY */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4"
          >

            {/* TEACHER */}

            <div>

              <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
                Guru / Ustadz
                <span className="ml-1 text-[#d63638]">*</span>
              </label>

              <div className="relative">

                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
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

                  {teachers.map((t) => (
                    <option
                      key={t.id}
                      value={t.id}
                    >
                      {t.fullname}
                      {t.status === 'Nonaktif'
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
                Pilih nama guru yang bertanggung jawab
                mengajar.
              </p>

            </div>

            {/* SUBJECT */}

            <div>

              <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
                Mata Pelajaran
                <span className="ml-1 text-[#d63638]">*</span>
              </label>

              <div className="relative">

                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  required
                  disabled={loading || subjects.length === 0}
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >

                  <option value="">
                    {loading
                      ? 'Sedang memuat mata pelajaran...'
                      : subjects.length === 0
                        ? 'Belum ada mata pelajaran'
                        : '— Pilih Mata Pelajaran —'}
                  </option>

                  {subjects.map((s) => (
                    <option
                      key={s.id}
                      value={s.id}
                    >
                      {s.name}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

              </div>

              <p className="mt-1 text-[11px] text-[#646970]">
                Pilih mapel yang akan diajarkan oleh guru.
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
                  onChange={(e) => setClassName(e.target.value)}
                  required
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2.5 pr-9 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                >

                  {availableClasses.map((c) => (
                    <option
                      key={c}
                      value={c}
                    >
                      Kelas {c}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

              </div>

              <p className="mt-1 text-[11px] text-[#646970]">
                Tentukan kelas tempat guru mengajar.
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
                    <span className="text-[#646970]">
                      Guru:{' '}
                    </span>

                    <strong>
                      {selectedTeacher?.fullname || '-'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[#646970]">
                      Mapel:{' '}
                    </span>

                    <strong>
                      {selectedSubject?.name || '-'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[#646970]">
                      Kelas:{' '}
                    </span>

                    <strong>
                      {className}
                    </strong>
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
                teachers.length === 0 ||
                subjects.length === 0
              }
              className="flex w-full items-center justify-center gap-2 rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
            >

              {submitting ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Simpan Tugas Mengajar
                </>
              )}

            </button>

            {/* RESET */}

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

        {/* ===================================================
            ASSIGNMENT LIST
        ==================================================== */}

        <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

          {/* LIST HEADER */}

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

              {/* SEARCH */}

              <div className="relative w-full sm:w-64">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari guru, mapel, kelas..."
                  className="w-full rounded-[3px] border border-[#8c8f94] bg-white py-2 pl-9 pr-3 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                />

              </div>

            </div>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="flex min-h-[260px] items-center justify-center text-[13px] text-[#646970]">

              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />

              Sedang memuat data tugas mengajar...

            </div>

          ) : assignments.length === 0 ? (

            /* EMPTY */

            <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f0f1]">
                <BookOpen
                  size={24}
                  className="text-[#646970]"
                />
              </div>

              <h3 className="text-[14px] font-medium text-[#1d2327]">
                Belum Ada Tugas Mengajar
              </h3>

              <p className="mt-2 max-w-sm text-[12px] leading-relaxed text-[#646970]">
                Silakan tambahkan pembagian tugas mengajar
                melalui formulir di sebelah kiri.
              </p>

            </div>

          ) : filteredAssignments.length === 0 ? (

            /* SEARCH EMPTY */

            <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">

              <Search
                size={30}
                className="mb-3 text-[#c3c4c7]"
              />

              <h3 className="text-[14px] font-medium text-[#1d2327]">
                Data Tidak Ditemukan
              </h3>

              <p className="mt-2 text-[12px] text-[#646970]">
                Coba gunakan kata kunci lain.
              </p>

              <button
                onClick={() => setSearch('')}
                className="mt-3 text-[13px] text-[#2271b1] hover:underline"
              >
                Hapus pencarian
              </button>

            </div>

          ) : (

            /* TABLE */

            <div className="overflow-x-auto">

              <table className="w-full min-w-[520px] border-collapse text-[13px]">

                {/* TABLE HEAD */}

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

                {/* TABLE BODY */}

                <tbody>

                  {filteredAssignments.map((a, idx) => (

                    <tr
                      key={a.id}
                      className="border-b border-[#e2e4e7] last:border-b-0 hover:bg-[#f6f7f7]"
                    >

                      {/* NUMBER */}

                      <td className="px-3 py-3 text-center text-[#646970]">
                        {idx + 1}
                      </td>

                      {/* TEACHER */}

                      <td className="px-4 py-3">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f1] text-[#2271b1]">
                            <GraduationCap size={16} />
                          </div>

                          <span className="font-medium text-[#1d2327]">
                            {a.teacher?.fullname || 'Nama guru belum tersedia'}
                          </span>

                        </div>

                      </td>

                      {/* SUBJECT */}

                      <td className="px-4 py-3 text-[#1d2327]">
                        {a.subject?.name || 'Mata pelajaran belum tersedia'}
                      </td>

                      {/* CLASS */}

                      <td className="px-4 py-3 text-center">

                        <span className="inline-flex rounded-[3px] border border-[#c3c4c7] bg-[#f6f7f7] px-2.5 py-1 text-[12px] font-medium text-[#1d2327]">
                          {a.className || '-'}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {/* FOOTER */}

          {!loading && assignments.length > 0 && (

            <div className="border-t border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">

              <p className="text-[12px] text-[#646970]">
                Data ini menjadi acuan guru untuk mengisi
                kehadiran, asesmen, dan rapor pada kelas
                serta mata pelajaran yang ditugaskan.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

// ===========================================================
// STAT CARD
// ===========================================================

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: any;
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
