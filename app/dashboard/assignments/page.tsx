'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

/* ============================================================
   TYPES
============================================================ */

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

  teacher?: {
    id?: number;
    fullname?: string | null;
  } | null;

  subject?: {
    id?: number;
    name?: string | null;
  } | null;
};

/* ============================================================
   HELPERS
============================================================ */

/**
 * Memastikan response API selalu menjadi array.
 *
 * Bisa menangani:
 *
 * [
 *   {...}
 * ]
 *
 * atau:
 *
 * {
 *   data: [...]
 * }
 *
 * atau:
 *
 * {
 *   teachers: [...]
 * }
 *
 * atau:
 *
 * {
 *   subjects: [...]
 * }
 *
 * atau:
 *
 * {
 *   assignments: [...]
 * }
 */
function normalizeArray<T>(
  data: unknown,
  possibleKeys: string[] = []
): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (
    data &&
    typeof data === 'object'
  ) {
    const objectData =
      data as Record<string, unknown>;

    for (const key of possibleKeys) {
      if (
        Array.isArray(
          objectData[key]
        )
      ) {
        return objectData[key] as T[];
      }
    }

    if (
      Array.isArray(
        objectData.data
      )
    ) {
      return objectData.data as T[];
    }
  }

  return [];
}

/**
 * Ambil pesan error dari response API.
 */
async function getApiError(
  response: Response,
  fallback: string
) {
  try {
    const data = await response.json();

    return (
      data?.message ||
      data?.error ||
      fallback
    );
  } catch {
    return fallback;
  }
}

/* ============================================================
   PAGE
============================================================ */

export default function AssignmentsPage() {
  /* ==========================================================
     DATA STATE
  ========================================================== */

  const [assignments, setAssignments] =
    useState<Assignment[]>([]);

  const [teachers, setTeachers] =
    useState<Teacher[]>([]);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  /* ==========================================================
     FORM STATE
  ========================================================== */

  const [teacherId, setTeacherId] =
    useState('');

  const [subjectId, setSubjectId] =
    useState('');

  const [className, setClassName] =
    useState('7A');

  /* ==========================================================
     UI STATE
  ========================================================== */

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState<'success' | 'error'>(
      'success'
    );

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [search, setSearch] =
    useState('');

  /* ==========================================================
     FETCH ALL DATA
  ========================================================== */

  const fetchData = async () => {
    try {
      setLoading(true);
      setMessage('');

      const [
        resAssig,
        resTeach,
        resSubj,
      ] = await Promise.all([
        fetch('/api/assignments', {
          cache: 'no-store',
        }),

        fetch('/api/teachers', {
          cache: 'no-store',
        }),

        fetch('/api/subjects', {
          cache: 'no-store',
        }),
      ]);

      /* ======================================================
         ASSIGNMENTS
      ====================================================== */

      if (!resAssig.ok) {
        const error =
          await getApiError(
            resAssig,
            'Gagal memuat data penugasan.'
          );

        throw new Error(error);
      }

      const dataAssig =
        await resAssig.json();

      const assignmentList =
        normalizeArray<Assignment>(
          dataAssig,
          [
            'assignments',
          ]
        );

      setAssignments(
        assignmentList
      );

      /* ======================================================
         TEACHERS
      ====================================================== */

      if (resTeach.ok) {
        const dataTeach =
          await resTeach.json();

        /**
         * INI BAGIAN PENTING.
         *
         * teachers SELALU akan berupa array.
         *
         * Jadi:
         *
         * teachers.map(...)
         *
         * tidak akan lagi error.
         */
        const teacherList =
          normalizeArray<Teacher>(
            dataTeach,
            [
              'teachers',
              'teacher',
            ]
          );

        setTeachers(
          teacherList
        );
      } else {
        console.error(
          'Gagal memuat guru:',
          await getApiError(
            resTeach,
            'Gagal memuat data guru.'
          )
        );

        setTeachers([]);
      }

      /* ======================================================
         SUBJECTS
      ====================================================== */

      if (resSubj.ok) {
        const dataSubj =
          await resSubj.json();

        const subjectList =
          normalizeArray<Subject>(
            dataSubj,
            [
              'subjects',
              'subject',
            ]
          );

        setSubjects(
          subjectList
        );
      } else {
        console.error(
          'Gagal memuat mapel:',
          await getApiError(
            resSubj,
            'Gagal memuat data mata pelajaran.'
          )
        );

        setSubjects([]);
      }
    } catch (error: any) {
      console.error(
        'Fetch assignments error:',
        error
      );

      setMessageType('error');

      setMessage(
        error?.message ||
          'Gagal memuat data.'
      );

      /**
       * Pastikan state tetap array
       * walaupun terjadi error.
       */
      setAssignments([]);
      setTeachers([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchData();
  }, []);

  /* ==========================================================
     RESET FORM
  ========================================================== */

  const resetForm = () => {
    setTeacherId('');
    setSubjectId('');
    setClassName('7A');
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage('');

    if (!teacherId) {
      setMessageType('error');
      setMessage(
        'Silakan pilih guru terlebih dahulu.'
      );
      return;
    }

    if (!subjectId) {
      setMessageType('error');
      setMessage(
        'Silakan pilih mata pelajaran terlebih dahulu.'
      );
      return;
    }

    if (!className) {
      setMessageType('error');
      setMessage(
        'Silakan pilih kelas terlebih dahulu.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        '/api/assignments',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            teacherId,
            subjectId,
            className,
          }),
        }
      );

      if (!res.ok) {
        const error =
          await getApiError(
            res,
            'Gagal menyimpan penugasan.'
          );

        throw new Error(error);
      }

      await res.json();

      setMessageType('success');

      setMessage(
        'Penugasan guru berhasil ditambahkan.'
      );

      resetForm();

      await fetchData();
    } catch (error: any) {
      console.error(
        'Submit assignment error:',
        error
      );

      setMessageType('error');

      setMessage(
        error?.message ||
          'Terjadi kesalahan saat menyimpan penugasan.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ==========================================================
     SEARCH FILTER
  ========================================================== */

  const filteredAssignments =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) {
        return assignments;
      }

      return assignments.filter(
        (assignment) => {
          const teacherName =
            assignment.teacher
              ?.fullname ||
            '';

          const subjectName =
            assignment.subject
              ?.name ||
            '';

          const classNameValue =
            assignment.className ||
            '';

          return (
            teacherName
              .toLowerCase()
              .includes(keyword) ||
            subjectName
              .toLowerCase()
              .includes(keyword) ||
            classNameValue
              .toLowerCase()
              .includes(keyword)
          );
        }
      );
    }, [
      assignments,
      search,
    ]);

  /* ==========================================================
     STATISTICS
  ========================================================== */

  const totalAssignments =
    assignments.length;

  const totalTeachers =
    teachers.length;

  const totalSubjects =
    subjects.length;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-800">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-emerald-950/20 bg-[#062f28]">

        {/* GRID BACKGROUND */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.5) 1px,
                transparent 1px
              )
            `,
            backgroundSize:
              '38px 38px',
          }}
        />

        {/* GLOW */}

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />

        {/* HEADER CONTENT */}

        <div className="relative mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            {/* TITLE */}

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-white/[0.06] px-3 py-1.5">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />

                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-100/70">
                  Academic Management
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_0_30px_rgba(52,211,153,0.08)]">

                  <BookOpen
                    size={27}
                    strokeWidth={1.5}
                    className="text-emerald-200"
                  />

                </div>

                <div>

                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Penugasan Guru Pengampu
                  </h1>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-emerald-100/55">
                    Atur guru, mata pelajaran,
                    dan kelas secara terpusat
                    dalam sistem akademik.
                  </p>

                </div>

              </div>

            </div>

            {/* REFRESH */}

            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 text-[10px] font-bold text-white transition hover:bg-white/[0.12] disabled:cursor-not-allowed disabled:opacity-50"
            >

              <RefreshCw
                size={14}
                className={
                  loading
                    ? 'animate-spin'
                    : ''
                }
              />

              Refresh Data

            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] space-y-5 px-4 py-6 sm:px-6 lg:px-8">

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">

          <StatCard
            icon={BookOpen}
            label="Total Penugasan"
            value={
              totalAssignments
            }
            description="Guru & mapel yang ditugaskan"
          />

          <StatCard
            icon={Users}
            label="Guru"
            value={
              totalTeachers
            }
            description="Tenaga pengajar tersedia"
            positive
          />

          <StatCard
            icon={GraduationCap}
            label="Mata Pelajaran"
            value={
              totalSubjects
            }
            description="Mapel tersedia"
          />

        </div>

        {/* ===================================================
            MESSAGE
        =================================================== */}

        {message && (
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-xs font-medium shadow-sm ${
              messageType ===
              'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >

            {messageType ===
            'success' ? (
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            ) : (
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0 text-red-600"
              />
            )}

            <span className="flex-1">
              {message}
            </span>

            <button
              type="button"
              onClick={() =>
                setMessage('')
              }
              className="opacity-50 transition hover:opacity-100"
            >
              <X size={15} />
            </button>

          </div>
        )}

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">

          {/* =================================================
              FORM
          ================================================= */}

          <section className="h-fit overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)]">

            {/* FORM HEADER */}

            <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#f8fbfa] to-white px-5 py-5">

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl" />

              <div className="relative flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b5d4b] text-white shadow-lg shadow-emerald-900/10">

                  <Plus size={19} />

                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-800">
                    Tambah Penugasan
                  </h2>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    Tentukan guru, mapel,
                    dan kelas
                  </p>

                </div>

              </div>

            </div>

            {/* FORM BODY */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5"
            >

              {/* =================================================
                  TEACHER
              ================================================= */}

              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                  <Users
                    size={12}
                    className="text-emerald-600"
                  />

                  Ustadz / Guru

                  <span className="text-red-400">
                    *
                  </span>

                </label>

                <div className="relative">

                  <select
                    value={
                      teacherId
                    }
                    onChange={(
                      e
                    ) =>
                      setTeacherId(
                        e.target.value
                      )
                    }
                    required
                    disabled={
                      loading ||
                      teachers.length ===
                        0
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 pr-9 text-xs font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <option value="">
                      {loading
                        ? 'Memuat guru...'
                        : teachers.length ===
                            0
                          ? 'Belum ada guru'
                          : '-- Pilih Guru --'}
                    </option>

                    {teachers.map(
                      (
                        teacher
                      ) => (
                        <option
                          key={
                            teacher.id
                          }
                          value={
                            teacher.id
                          }
                        >
                          {
                            teacher.fullname
                          }
                          {teacher.status ===
                            'Nonaktif'
                            ? ' — Nonaktif'
                            : ''}
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

                {teachers.length ===
                  0 &&
                  !loading && (
                    <p className="mt-1.5 text-[9px] text-amber-600">
                      Belum ada data guru
                      yang tersedia.
                    </p>
                  )}

              </div>

              {/* =================================================
                  SUBJECT
              ================================================= */}

              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                  <BookOpen
                    size={12}
                    className="text-emerald-600"
                  />

                  Mata Pelajaran

                  <span className="text-red-400">
                    *
                  </span>

                </label>

                <div className="relative">

                  <select
                    value={
                      subjectId
                    }
                    onChange={(
                      e
                    ) =>
                      setSubjectId(
                        e.target.value
                      )
                    }
                    required
                    disabled={
                      loading ||
                      subjects.length ===
                        0
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 pr-9 text-xs font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <option value="">
                      {loading
                        ? 'Memuat mapel...'
                        : subjects.length ===
                            0
                          ? 'Belum ada mapel'
                          : '-- Pilih Mapel --'}
                    </option>

                    {subjects.map(
                      (
                        subject
                      ) => (
                        <option
                          key={
                            subject.id
                          }
                          value={
                            subject.id
                          }
                        >
                          {
                            subject.name
                          }
                        </option>
                      )
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

                {subjects.length ===
                  0 &&
                  !loading && (
                    <p className="mt-1.5 text-[9px] text-amber-600">
                      Belum ada mata
                      pelajaran yang
                      tersedia.
                    </p>
                  )}

              </div>

              {/* =================================================
                  CLASS
              ================================================= */}

              <div>

                <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                  <GraduationCap
                    size={12}
                    className="text-emerald-600"
                  />

                  Kelas Target

                  <span className="text-red-400">
                    *
                  </span>

                </label>

                <div className="relative">

                  <select
                    value={
                      className
                    }
                    onChange={(
                      e
                    ) =>
                      setClassName(
                        e.target.value
                      )
                    }
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                  >

                    <option value="7A">
                      Kelas 7A
                    </option>

                    <option value="7B">
                      Kelas 7B
                    </option>

                    <option value="8A">
                      Kelas 8A
                    </option>

                    <option value="8B">
                      Kelas 8B
                    </option>

                    <option value="9A">
                      Kelas 9A
                    </option>

                    <option value="9B">
                      Kelas 9B
                    </option>

                    <option value="10A">
                      Kelas 10A
                    </option>

                    <option value="10B">
                      Kelas 10B
                    </option>

                    <option value="11A">
                      Kelas 11A
                    </option>

                    <option value="11B">
                      Kelas 11B
                    </option>

                    <option value="12A">
                      Kelas 12A
                    </option>

                    <option value="12B">
                      Kelas 12B
                    </option>

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

              {/* =================================================
                  INFO
              ================================================= */}

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

                <div className="flex items-start gap-2">

                  <ShieldCheck
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-[9px] leading-4 text-emerald-700">
                    Satu penugasan akan
                    menghubungkan guru
                    dengan mata pelajaran
                    dan kelas yang dipilih.
                  </p>

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                disabled={
                  submitting ||
                  loading ||
                  teachers.length ===
                    0 ||
                  subjects.length ===
                    0
                }
                className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0b5d4b] text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#084c3e] disabled:cursor-not-allowed disabled:opacity-50"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {submitting ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Check
                      size={15}
                    />

                    Simpan Penugasan
                  </>
                )}

              </button>

            </form>

          </section>

          {/* =================================================
              ASSIGNMENT LIST
          ================================================= */}

          <section className="min-w-0">

            {/* LIST HEADER */}

            <div className="mb-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">

                    <BookOpen
                      size={18}
                    />

                  </div>

                  <div>

                    <h2 className="text-sm font-bold text-slate-800">
                      Daftar Penugasan
                    </h2>

                    <p className="text-[9px] text-slate-400">
                      {
                        filteredAssignments.length
                      }{' '}
                      dari{' '}
                      {
                        assignments.length
                      }{' '}
                      penugasan
                    </p>

                  </div>

                </div>

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={
                      search
                    }
                    onChange={(
                      e
                    ) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Cari guru, mapel, kelas..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 sm:w-64"
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                TABLE / LIST
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

              {loading ? (
                <LoadingState />
              ) : assignments.length ===
                0 ? (
                <EmptyState />
              ) : filteredAssignments.length ===
                0 ? (
                <SearchEmptyState />
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[700px] border-collapse text-xs">

                    <thead>

                      <tr className="border-b border-slate-200 bg-[#f8faf9]">

                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Pengajar
                        </th>

                        <th className="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Mata Pelajaran
                        </th>

                        <th className="px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Kelas
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {filteredAssignments.map(
                        (
                          assignment
                        ) => (
                          <tr
                            key={
                              assignment.id
                            }
                            className="group transition hover:bg-slate-50/70"
                          >

                            {/* TEACHER */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700">

                                  <Users
                                    size={
                                      16
                                    }
                                    strokeWidth={
                                      1.7
                                    }
                                  />

                                </div>

                                <div className="min-w-0">

                                  <div className="font-bold text-slate-800">

                                    {assignment
                                      .teacher
                                      ?.fullname ||
                                      'Guru tidak ditemukan'}

                                  </div>

                                  <div className="mt-0.5 text-[9px] text-slate-400">
                                    Pengajar
                                  </div>

                                </div>

                              </div>

                            </td>

                            {/* SUBJECT */}

                            <td className="px-4 py-4">

                              <div className="inline-flex max-w-[240px] items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-700">

                                <BookOpen
                                  size={
                                    12
                                  }
                                />

                                <span className="truncate">

                                  {assignment
                                    .subject
                                    ?.name ||
                                    'Mapel tidak ditemukan'}

                                </span>

                              </div>

                            </td>

                            {/* CLASS */}

                            <td className="px-4 py-4 text-center">

                              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-bold text-slate-600">

                                Kelas{' '}

                                {assignment.className ||
                                  '-'}

                              </span>

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </section>

        </div>

      </div>

      {/* =====================================================
          GLOBAL STYLE
      ===================================================== */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        input,
        textarea,
        select,
        button {
          font-family: inherit;
        }

        ::selection {
          background: rgba(16, 185, 129, 0.18);
        }

        input[type='search']::-webkit-search-cancel-button {
          display: none;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  positive,
}: {
  icon: any;
  label: string;
  value: number;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]">

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-50 opacity-0 blur-2xl transition group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            positive
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-slate-100 text-slate-500'
          }`}
        >

          <Icon
            size={18}
            strokeWidth={1.7}
          />

        </div>

        <div className="min-w-0">

          <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </div>

          <div className="mt-0.5 text-xl font-bold tracking-tight text-slate-800">
            {value}
          </div>

          <div className="truncate text-[8px] text-slate-400">
            {description}
          </div>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   LOADING STATE
============================================================ */

function LoadingState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">

        <Loader2
          size={24}
          className="animate-spin text-emerald-600"
        />

      </div>

      <p className="mt-4 text-xs font-semibold text-slate-500">
        Memuat data penugasan...
      </p>

      <p className="mt-1 text-[9px] text-slate-300">
        Menghubungkan ke database
        akademik
      </p>

    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

        <BookOpen
          size={28}
          strokeWidth={1.4}
        />

      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        Belum Ada Penugasan
      </h3>

      <p className="mt-1 max-w-xs text-[10px] leading-5 text-slate-400">
        Belum terdapat penugasan
        guru dan mata pelajaran
        dalam sistem.
      </p>

    </div>
  );
}

/* ============================================================
   SEARCH EMPTY STATE
============================================================ */

function SearchEmptyState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

        <Search
          size={26}
          strokeWidth={1.5}
        />

      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        Data Tidak Ditemukan
      </h3>

      <p className="mt-1 text-[10px] text-slate-400">
        Coba gunakan nama guru,
        mata pelajaran, atau kelas
        yang berbeda.
      </p>

    </div>
  );
}