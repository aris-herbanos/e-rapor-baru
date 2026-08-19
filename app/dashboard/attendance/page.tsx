'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Users,
  UserCheck,
  UserX,
  HeartPulse,
  FileCheck2,
  Search,
  RefreshCw,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

type Student = {
  id: number;
  fullname: string;
  class_name?: string;
};

type Attendance = {
  id: number;
  studentId: number;
  status: string;
  date: string;
  student?: {
    fullname?: string;
    class_name?: string;
  };
};

const STATUS_OPTIONS = [
  {
    value: 'HADIR',
    label: 'Hadir',
    description: 'Santri hadir',
    icon: CheckCircle2,
  },
  {
    value: 'SAKIT',
    label: 'Sakit',
    description: 'Tidak hadir karena sakit',
    icon: HeartPulse,
  },
  {
    value: 'IZIN',
    label: 'Izin',
    description: 'Tidak hadir dengan izin',
    icon: FileCheck2,
  },
  {
    value: 'ALPA',
    label: 'Alpa',
    description: 'Tanpa keterangan',
    icon: UserX,
  },
];

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('HADIR');

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('SEMUA');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  /* =========================================================
     FETCH DATA
  ========================================================= */

  const fetchData = async () => {
    setLoadingData(true);

    try {
      const [attendanceRes, studentRes] = await Promise.all([
        fetch('/api/attendance', {
          cache: 'no-store',
        }),
        fetch('/api/students', {
          cache: 'no-store',
        }),
      ]);

      const attendanceData = await attendanceRes.json();
      const studentData = await studentRes.json();

      if (attendanceRes.ok && Array.isArray(attendanceData)) {
        setAttendances(attendanceData);
      }

      if (studentRes.ok && Array.isArray(studentData)) {
        setStudents(studentData);
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err);
      setMessage('Gagal memuat data. Silakan coba kembali.');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =========================================================
     STATISTIK
  ========================================================= */

  const statistics = useMemo(() => {
    return {
      total: attendances.length,
      hadir: attendances.filter((a) => a.status === 'HADIR').length,
      sakit: attendances.filter((a) => a.status === 'SAKIT').length,
      izin: attendances.filter((a) => a.status === 'IZIN').length,
      alpa: attendances.filter((a) => a.status === 'ALPA').length,
    };
  }, [attendances]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredAttendances = useMemo(() => {
    return attendances.filter((attendance) => {
      const studentName =
        attendance.student?.fullname ||
        `Santri ID: ${attendance.studentId}`;

      const matchesSearch = studentName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === 'SEMUA' ||
        attendance.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [attendances, search, filterStatus]);

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId) {
      setMessage('Silakan pilih santri terlebih dahulu.');
      return;
    }

    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan kehadiran'
        );
      }

      setMessage(
        'Sukses! Kehadiran santri berhasil dicatat.'
      );

      setStudentId('');
      setStatus('HADIR');

      await fetchData();
    } catch (err: any) {
      setMessage(
        `Error: ${err.message || 'Terjadi kesalahan'}`
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STATUS STYLE
  ========================================================= */

  const getStatusStyle = (value: string) => {
    switch (value) {
      case 'HADIR':
        return {
          wrapper:
            'bg-emerald-50 border-emerald-100 text-emerald-700',
          dot: 'bg-emerald-500',
          icon: 'text-emerald-600',
        };

      case 'SAKIT':
        return {
          wrapper: 'bg-blue-50 border-blue-100 text-blue-700',
          dot: 'bg-blue-500',
          icon: 'text-blue-600',
        };

      case 'IZIN':
        return {
          wrapper:
            'bg-amber-50 border-amber-100 text-amber-700',
          dot: 'bg-amber-500',
          icon: 'text-amber-600',
        };

      case 'ALPA':
        return {
          wrapper: 'bg-red-50 border-red-100 text-red-700',
          dot: 'bg-red-500',
          icon: 'text-red-600',
        };

      default:
        return {
          wrapper:
            'bg-slate-50 border-slate-100 text-slate-600',
          dot: 'bg-slate-400',
          icon: 'text-slate-500',
        };
    }
  };

  const selectedStudent = students.find(
    (student) => String(student.id) === studentId
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f5f7f6]">

      {/* =====================================================
          HEADER HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#063c30]">

        {/* Decorative Islamic geometry */}

        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-emerald-200/10" />

        <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-amber-200/10" />

        <div className="pointer-events-none absolute bottom-[-100px] left-[30%] h-56 w-56 rounded-full border border-emerald-200/5" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-emerald-200">
                  <CalendarCheck
                    size={15}
                    strokeWidth={1.7}
                  />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">
                  Akademik • Kehadiran
                </span>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Kehadiran Santri
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100/55">
                Kelola dan pantau catatan kehadiran santri
                secara tertib, cepat, dan terintegrasi.
              </p>

            </div>

            <div className="hidden lg:block">

              <div
                dir="rtl"
                className="font-serif text-sm text-amber-200/70"
              >
                وَقُلْ رَبِّ زِدْنِي عِلْمًا
              </div>

              <div className="mt-1 text-right text-[9px] uppercase tracking-[0.16em] text-emerald-200/30">
                QS. طه : 114
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">

        {/* ===================================================
            MESSAGE
        ==================================================== */}

        {message && (
          <div
            className={[
              'mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
              message.includes('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >

            <div
              className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                message.includes('Sukses')
                  ? 'bg-emerald-100'
                  : 'bg-red-100',
              ].join(' ')}
            >
              {message.includes('Sukses') ? (
                <CheckCircle2 size={15} />
              ) : (
                <UserX size={15} />
              )}
            </div>

            <span>{message}</span>

          </div>
        )}


        {/* ===================================================
            STATISTIC CARDS
        ==================================================== */}

        <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-5">

          <StatisticCard
            label="Total Catatan"
            value={statistics.total}
            icon={Users}
            accent="slate"
          />

          <StatisticCard
            label="Hadir"
            value={statistics.hadir}
            icon={CheckCircle2}
            accent="emerald"
          />

          <StatisticCard
            label="Sakit"
            value={statistics.sakit}
            icon={HeartPulse}
            accent="blue"
          />

          <StatisticCard
            label="Izin"
            value={statistics.izin}
            icon={FileCheck2}
            accent="amber"
          />

          <StatisticCard
            label="Alpa"
            value={statistics.alpa}
            icon={UserX}
            accent="red"
          />

        </div>


        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

          {/* =================================================
              FORM
          ================================================== */}

          <section className="h-fit overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">

            <div className="border-b border-slate-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063c30] text-emerald-200">
                  <UserCheck
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    Catat Kehadiran
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Tambahkan data absensi santri
                  </p>
                </div>

              </div>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* SANTRI */}

              <div>

                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Santri
                </label>

                <div className="relative">

                  <select
                    value={studentId}
                    onChange={(e) =>
                      setStudentId(e.target.value)
                    }
                    required
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  >

                    <option value="">
                      -- Pilih Santri --
                    </option>

                    {students
                      .slice()
                      .sort((a, b) =>
                        a.fullname.localeCompare(
                          b.fullname
                        )
                      )
                      .map((student) => (
                        <option
                          key={student.id}
                          value={student.id}
                        >
                          {student.fullname}
                          {student.class_name
                            ? ` — ${student.class_name}`
                            : ''}
                        </option>
                      ))}

                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

                {selectedStudent && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700">

                    <GraduationIcon />

                    <span>
                      Kelas{' '}
                      <strong>
                        {selectedStudent.class_name ||
                          '-'}
                      </strong>
                    </span>

                  </div>
                )}

                {students.length === 0 && (
                  <p className="mt-2 text-[11px] text-amber-600">
                    Belum ada data santri yang tersedia.
                  </p>
                )}

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Status Kehadiran
                </label>

                <div className="grid grid-cols-2 gap-2">

                  {STATUS_OPTIONS.map((option) => {

                    const Icon = option.icon;
                    const active =
                      status === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setStatus(option.value)
                        }
                        className={[
                          'flex items-center gap-2 rounded-xl border p-3 text-left transition-all',
                          active
                            ? 'border-emerald-300 bg-emerald-50 ring-2 ring-emerald-500/10'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
                        ].join(' ')}
                      >

                        <div
                          className={[
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                            active
                              ? 'bg-white'
                              : 'bg-slate-50',
                          ].join(' ')}
                        >

                          <Icon
                            size={16}
                            strokeWidth={1.7}
                            className={
                              active
                                ? 'text-emerald-600'
                                : 'text-slate-400'
                            }
                          />

                        </div>

                        <div className="min-w-0">

                          <div
                            className={[
                              'text-xs font-semibold',
                              active
                                ? 'text-emerald-700'
                                : 'text-slate-700',
                            ].join(' ')}
                          >
                            {option.label}
                          </div>

                          <div className="mt-0.5 truncate text-[9px] text-slate-400">
                            {option.description}
                          </div>

                        </div>

                      </button>
                    );
                  })}

                </div>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading || students.length === 0}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#07543f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#064734] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <RefreshCw
                      size={16}
                      className="animate-spin"
                    />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Simpan Kehadiran
                  </>
                )}

              </button>

            </form>

            {/* FORM FOOTER */}

            <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">

              <div className="flex items-center gap-2 text-[10px] text-slate-400">

                <ShieldCheck
                  size={14}
                  className="text-emerald-600"
                />

                Data kehadiran tersimpan secara
                terintegrasi dalam sistem.

              </div>

            </div>

          </section>


          {/* =================================================
              HISTORY
          ================================================== */}

          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">

            {/* HEADER */}

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={17}
                      className="text-emerald-600"
                      strokeWidth={1.7}
                    />

                    <h2 className="text-sm font-semibold text-slate-800">
                      Riwayat Kehadiran
                    </h2>

                  </div>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Catatan kehadiran santri yang
                    tersimpan dalam sistem
                  </p>

                </div>


                <button
                  type="button"
                  onClick={fetchData}
                  disabled={loadingData}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >

                  <RefreshCw
                    size={13}
                    className={
                      loadingData
                        ? 'animate-spin'
                        : ''
                    }
                  />

                  Perbarui

                </button>

              </div>


              {/* FILTER */}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">

                <div className="relative flex-1">

                  <Search
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Cari nama santri..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>

                <div className="relative">

                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-xs text-slate-600 outline-none sm:w-36"
                  >

                    <option value="SEMUA">
                      Semua Status
                    </option>

                    <option value="HADIR">
                      Hadir
                    </option>

                    <option value="SAKIT">
                      Sakit
                    </option>

                    <option value="IZIN">
                      Izin
                    </option>

                    <option value="ALPA">
                      Alpa
                    </option>

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

              </div>

            </div>


            {/* LIST */}

            <div className="max-h-[600px] overflow-y-auto">

              {loadingData ? (

                <div className="flex flex-col items-center justify-center px-6 py-20">

                  <RefreshCw
                    size={22}
                    className="animate-spin text-emerald-600"
                  />

                  <p className="mt-3 text-xs text-slate-400">
                    Memuat data kehadiran...
                  </p>

                </div>

              ) : filteredAttendances.length === 0 ? (

                <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">

                    <CalendarCheck
                      size={24}
                      className="text-slate-300"
                      strokeWidth={1.5}
                    />

                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-600">
                    Belum ada catatan
                  </h3>

                  <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-400">
                    Data kehadiran yang telah dicatat
                    akan muncul di bagian ini.
                  </p>

                </div>

              ) : (

                <div className="divide-y divide-slate-100">

                  {filteredAttendances.map(
                    (attendance, index) => {

                      const style =
                        getStatusStyle(
                          attendance.status
                        );

                      return (
                        <div
                          key={attendance.id}
                          className="group flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50/80 sm:px-6"
                        >

                          {/* NUMBER */}

                          <div className="hidden w-6 text-center text-[10px] font-medium text-slate-300 sm:block">
                            {String(index + 1).padStart(
                              2,
                              '0'
                            )}
                          </div>


                          {/* AVATAR */}

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f2ef] text-xs font-bold text-[#07543f]">
                            {(
                              attendance.student
                                ?.fullname ||
                              `S${attendance.studentId}`
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>


                          {/* INFO */}

                          <div className="min-w-0 flex-1">

                            <div className="truncate text-xs font-semibold text-slate-800 sm:text-sm">
                              {attendance.student
                                ?.fullname ||
                                `Santri ID: ${attendance.studentId}`}
                            </div>

                            <div className="mt-1 flex items-center gap-2">

                              <span className="text-[10px] text-slate-400">
                                Kelas{' '}
                                {attendance.student
                                  ?.class_name || '-'}
                              </span>

                              <span className="h-1 w-1 rounded-full bg-slate-300" />

                              <span className="text-[10px] text-slate-400">
                                {new Date(
                                  attendance.date
                                ).toLocaleDateString(
                                  'id-ID',
                                  {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  }
                                )}
                              </span>

                            </div>

                          </div>


                          {/* STATUS */}

                          <div
                            className={[
                              'flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide',
                              style.wrapper,
                            ].join(' ')}
                          >

                            <span
                              className={[
                                'h-1.5 w-1.5 rounded-full',
                                style.dot,
                              ].join(' ')}
                            />

                            {attendance.status}

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}


/* ============================================================
   STATISTIC CARD
============================================================ */

function StatisticCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: any;
  accent: 'slate' | 'emerald' | 'blue' | 'amber' | 'red';
}) {
  const styles = {
    slate: {
      icon: 'bg-slate-100 text-slate-500',
      value: 'text-slate-800',
    },
    emerald: {
      icon: 'bg-emerald-50 text-emerald-600',
      value: 'text-emerald-700',
    },
    blue: {
      icon: 'bg-blue-50 text-blue-600',
      value: 'text-blue-700',
    },
    amber: {
      icon: 'bg-amber-50 text-amber-600',
      value: 'text-amber-700',
    },
    red: {
      icon: 'bg-red-50 text-red-600',
      value: 'text-red-700',
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.035)]">

      <div className="flex items-center justify-between gap-2">

        <div
          className={[
            'flex h-9 w-9 items-center justify-center rounded-xl',
            styles[accent].icon,
          ].join(' ')}
        >
          <Icon
            size={17}
            strokeWidth={1.7}
          />
        </div>

      </div>

      <div className="mt-3">

        <div
          className={[
            'text-xl font-semibold tracking-tight',
            styles[accent].value,
          ].join(' ')}
        >
          {value}
        </div>

        <div className="mt-0.5 text-[10px] font-medium text-slate-400">
          {label}
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SMALL GRADUATION ICON
============================================================ */

function GraduationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10L12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}