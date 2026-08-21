'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  AlertCircle,
  Save,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

type Student = {
  id: number;
  fullname: string;
  class_name?: string | null;
};

type AttendanceStudent = {
  fullname?: string | null;
  class_name?: string | null;
};

type Attendance = {
  id: number;
  studentId: number;
  status: string;
  date: string;
  student?: AttendanceStudent | null;
};

/* =========================================================
   STATUS
========================================================= */

const STATUS_OPTIONS = [
  { value: 'HADIR', label: 'Hadir', icon: CheckCircle2 },
  { value: 'SAKIT', label: 'Sakit', icon: HeartPulse },
  { value: 'IZIN', label: 'Izin', icon: FileCheck2 },
  { value: 'ALPA', label: 'Alpa', icon: UserX },
] as const;

/* =========================================================
   HELPERS
========================================================= */

function getStatusLabel(status: string) {
  const option = STATUS_OPTIONS.find((item) => item.value === status);
  return option?.label || status;
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/* =========================================================
   PAGE
========================================================= */

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Form State untuk Absensi Seclass
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [classAttendanceMap, setClassAttendanceMap] = useState<Record<number, string>>({});

  // Filter & UI State
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('SEMUA');
  const [filterStatus, setFilterStatus] = useState('SEMUA');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  /* =========================================================
     FETCH DATA
  ========================================================= */

  const fetchData = useCallback(async () => {
    setLoadingData(true);

    try {
      const [attendanceRes, studentRes] = await Promise.all([
        fetch('/api/attendance', { cache: 'no-store' }),
        fetch('/api/students', { cache: 'no-store' }),
      ]);

      const attendanceData = await attendanceRes.json();
      if (!attendanceRes.ok) {
        throw new Error(attendanceData?.message || 'Gagal memuat data kehadiran.');
      }
      setAttendances(Array.isArray(attendanceData) ? attendanceData : []);

      const studentData = await studentRes.json();
      if (!studentRes.ok) {
        throw new Error(studentData?.message || 'Gagal memuat data santri.');
      }
      const studentList = Array.isArray(studentData) ? studentData : studentData?.data || [];
      setStudents(studentList);

      // Set default kelas pertama jika belum dipilih
      if (!selectedClass && studentList.length > 0) {
        const firstClass = studentList.find((s: Student) => s.class_name)?.class_name;
        if (firstClass) setSelectedClass(firstClass);
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      setMessage(error instanceof Error ? error.message : 'Gagal memuat data.');
      setMessageType('error');
    } finally {
      setLoadingData(false);
    }
  }, [selectedClass]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* =========================================================
     CLASS LIST
  ========================================================= */

  const classList = useMemo(() => {
    const classes = students
      .map((s) => s.class_name)
      .filter((c): c is string => Boolean(c && c.trim()));
    return Array.from(new Set(classes)).sort();
  }, [students]);

  const filteredStudentsByClass = useMemo(() => {
    if (!selectedClass) return [];
    return students.filter((s) => s.class_name === selectedClass);
  }, [students, selectedClass]);

  // Saat kelas atau tanggal berubah, sinkronkan status yang sudah ada di database ke state form
  useEffect(() => {
    if (!selectedClass) return;

    const initialMap: Record<number, string> = {};
    filteredStudentsByClass.forEach((student) => {
      // Cari data absensi santri ini pada tanggal yang dipilih
      const existing = attendances.find((a) => {
        if (a.studentId !== student.id) return false;
        const aDate = new Date(a.date).toISOString().split('T')[0];
        return aDate === attendanceDate;
      });

      // Default HADIR jika belum pernah diabsen pada tanggal tersebut
      initialMap[student.id] = existing ? existing.status : 'HADIR';
    });

    setClassAttendanceMap(initialMap);
  }, [selectedClass, attendanceDate, filteredStudentsByClass, attendances]);

  const handleStatusChange = (studentId: number, newStatus: string) => {
    setClassAttendanceMap((prev) => ({
      ...prev,
      [studentId]: newStatus,
    }));
  };

  const handleSetAllStatus = (statusVal: string) => {
    const updatedMap: Record<number, string> = {};
    filteredStudentsByClass.forEach((s) => {
      updatedMap[s.id] = statusVal;
    });
    setClassAttendanceMap(updatedMap);
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const statistics = useMemo(() => {
    return {
      total: attendances.length,
      hadir: attendances.filter((item) => item.status === 'HADIR').length,
      sakit: attendances.filter((item) => item.status === 'SAKIT').length,
      izin: attendances.filter((item) => item.status === 'IZIN').length,
      alpa: attendances.filter((item) => item.status === 'ALPA').length,
    };
  }, [attendances]);

  /* =========================================================
     FILTERED HISTORY
  ========================================================= */

  const filteredAttendances = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attendances.filter((attendance) => {
      const studentName = attendance.student?.fullname || `Santri ID: ${attendance.studentId}`;
      const className = attendance.student?.class_name || '';

      const matchesSearch =
        !keyword ||
        studentName.toLowerCase().includes(keyword) ||
        className.toLowerCase().includes(keyword);

      const matchesClassFilter = filterClass === 'SEMUA' || className === filterClass;
      const matchesStatus = filterStatus === 'SEMUA' || attendance.status === filterStatus;

      return matchesSearch && matchesClassFilter && matchesStatus;
    });
  }, [attendances, search, filterClass, filterStatus]);

  /* =========================================================
     SUBMIT BATCH
  ========================================================= */

  const handleSubmitBatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedClass) {
      setMessage('Silakan pilih kelas terlebih dahulu.');
      setMessageType('error');
      return;
    }

    if (!attendanceDate) {
      setMessage('Silakan tentukan tanggal absensi.');
      setMessageType('error');
      return;
    }

    const payload = Object.entries(classAttendanceMap).map(([stId, stStatus]) => ({
      studentId: Number(stId),
      status: stStatus,
      date: attendanceDate,
    }));

    if (payload.length === 0) {
      setMessage('Tidak ada santri di kelas ini.');
      setMessageType('error');
      return;
    }

    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menyimpan kehadiran.');
      }

      setMessage('Kehadiran satu kelas berhasil dicatat dan disimpan.');
      setMessageType('success');
      await fetchData();
    } catch (error) {
      console.error('Gagal menyimpan kehadiran:', error);
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan saat menyimpan data.');
      setMessageType('error');
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
        return { wrapper: 'bg-emerald-50 border-emerald-100 text-emerald-700', dot: 'bg-emerald-500' };
      case 'SAKIT':
        return { wrapper: 'bg-blue-50 border-blue-100 text-blue-700', dot: 'bg-blue-500' };
      case 'IZIN':
        return { wrapper: 'bg-amber-50 border-amber-100 text-amber-700', dot: 'bg-amber-500' };
      case 'ALPA':
        return { wrapper: 'bg-red-50 border-red-100 text-red-700', dot: 'bg-red-500' };
      default:
        return { wrapper: 'bg-slate-50 border-slate-100 text-slate-600', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#063c30]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-emerald-200/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-amber-200/10" />
        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-emerald-200">
                  <CalendarCheck size={15} strokeWidth={1.7} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">
                  Akademik • Kehadiran
                </span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Kehadiran Santri (Satu Kelas Sekaligus)
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100/55">
                Kelola absensi seluruh santri dalam satu kelas dengan mudah tanpa bolak-balik memilih nama santri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
        {message && (
          <div
            className={[
              'mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
              messageType === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >
            <div
              className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                messageType === 'success' ? 'bg-emerald-100' : 'bg-red-100',
              ].join(' ')}
            >
              {messageType === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            </div>
            <span>{message}</span>
          </div>
        )}

        {/* STATISTICS */}
        <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <StatisticCard label="Total Catatan" value={statistics.total} icon={Users} accent="slate" />
          <StatisticCard label="Hadir" value={statistics.hadir} icon={CheckCircle2} accent="emerald" />
          <StatisticCard label="Sakit" value={statistics.sakit} icon={HeartPulse} accent="blue" />
          <StatisticCard label="Izin" value={statistics.izin} icon={FileCheck2} accent="amber" />
          <StatisticCard label="Alpa" value={statistics.alpa} icon={UserX} accent="red" />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          
          {/* TABEL ABSENSI SATU KELAS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063c30] text-emerald-200">
                    <UserCheck size={18} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">Lembar Absensi Kelas</h2>
                    <p className="mt-0.5 text-[11px] text-slate-400">Centang atau ubah status kehadiran santri di bawah</p>
                  </div>
                </div>

                {/* PINTASAN UBAH SEMUA STATUS */}
                {filteredStudentsByClass.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-400 font-semibold mr-1">Set Semua:</span>
                    <button type="button" onClick={() => handleSetAllStatus('HADIR')} className="px-2.5 py-1 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Hadir</button>
                    <button type="button" onClick={() => handleSetAllStatus('SAKIT')} className="px-2.5 py-1 text-[10px] font-bold rounded bg-blue-100 text-blue-800 hover:bg-blue-200">Sakit</button>
                    <button type="button" onClick={() => handleSetAllStatus('IZIN')} className="px-2.5 py-1 text-[10px] font-bold rounded bg-amber-100 text-amber-800 hover:bg-amber-200">Izin</button>
                    <button type="button" onClick={() => handleSetAllStatus('ALPA')} className="px-2.5 py-1 text-[10px] font-bold rounded bg-red-100 text-red-800 hover:bg-red-200">Alpa</button>
                  </div>
                )}
              </div>

              {/* FILTER KELAS & TANGGAL DI DALAM FORM */}
              <form onSubmit={handleSubmitBatch} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Pilih Kelas *</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-700 outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">-- Pilih Kelas --</option>
                    {classList.map((cls) => (
                      <option key={cls} value={cls}>Kelas {cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Tanggal Absensi *</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-700 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </form>
            </div>

            {/* TABEL DAFTAR SANTRI SATU KELAS */}
            <div className="p-5 overflow-x-auto">
              {!selectedClass ? (
                <div className="text-center py-12 text-xs text-slate-400">Silakan pilih kelas terlebih dahulu untuk mengisi absensi.</div>
              ) : filteredStudentsByClass.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">Tidak ada santri di kelas ini.</div>
              ) : (
                <form onSubmit={handleSubmitBatch} className="space-y-4">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600">
                        <th className="p-3 w-12 text-center">No</th>
                        <th className="p-3">Nama Santri</th>
                        <th className="p-3 w-72 text-center">Status Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudentsByClass
                        .slice()
                        .sort((a, b) => a.fullname.localeCompare(b.fullname))
                        .map((student, idx) => {
                          const currentStatus = classAttendanceMap[student.id] || 'HADIR';
                          return (
                            <tr key={student.id} className="hover:bg-slate-50/50">
                              <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                              <td className="p-3 font-semibold text-slate-800">{student.fullname}</td>
                              <td className="p-3 text-center">
                                <div className="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
                                  {STATUS_OPTIONS.map((opt) => {
                                    const isSelected = currentStatus === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleStatusChange(student.id, opt.value)}
                                        className={[
                                          'px-3 py-1.5 rounded-lg text-[11px] font-bold transition',
                                          isSelected
                                            ? opt.value === 'HADIR'
                                              ? 'bg-emerald-600 text-white shadow-sm'
                                              : opt.value === 'SAKIT'
                                              ? 'bg-blue-600 text-white shadow-sm'
                                              : opt.value === 'IZIN'
                                              ? 'bg-amber-600 text-white shadow-sm'
                                              : 'bg-red-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-200',
                                        ].join(' ')}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading || filteredStudentsByClass.length === 0}
                      className="flex items-center gap-2 rounded-xl bg-[#064e3b] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#053d2e] disabled:opacity-50"
                    >
                      {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                      {loading ? 'Menyimpan...' : 'Simpan Absensi Satu Kelas'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* HISTORY */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock3 size={17} className="text-emerald-600" strokeWidth={1.7} />
                  <h2 className="text-sm font-semibold text-slate-800">Riwayat Kehadiran</h2>
                </div>
                <button
                  type="button"
                  onClick={fetchData}
                  disabled={loadingData}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw size={13} className={loadingData ? 'animate-spin' : ''} />
                  Perbarui
                </button>
              </div>

              {/* TOMBOL PINTASAN KELAS PADA RIWAYAT */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setFilterClass('SEMUA')}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                    filterClass === 'SEMUA' ? 'bg-[#063c30] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua Kelas
                </button>
                {classList.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setFilterClass(cls)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                      filterClass === cls ? 'bg-[#063c30] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Kelas {cls}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari santri..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-xs text-slate-600 outline-none w-28"
                >
                  <option value="SEMUA">Status</option>
                  <option value="HADIR">Hadir</option>
                  <option value="SAKIT">Sakit</option>
                  <option value="IZIN">Izin</option>
                  <option value="ALPA">Alpa</option>
                </select>
              </div>
            </div>

            <div className="max-h-[500px] overflow-y-auto">
              {loadingData ? (
                <div className="flex flex-col items-center justify-center px-6 py-16">
                  <RefreshCw size={22} className="animate-spin text-emerald-600" />
                  <p className="mt-3 text-xs text-slate-400">Memuat riwayat...</p>
                </div>
              ) : filteredAttendances.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <CalendarCheck size={24} className="text-slate-300" strokeWidth={1.5} />
                  <h3 className="mt-3 text-xs font-semibold text-slate-600">Belum ada catatan</h3>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredAttendances.map((attendance, index) => {
                    const style = getStatusStyle(attendance.status);
                    const fullname = attendance.student?.fullname || `Santri ID: ${attendance.studentId}`;
                    const initial = fullname.charAt(0).toUpperCase();

                    return (
                      <div key={attendance.id} className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9f2ef] text-xs font-bold text-[#07543f]">
                          {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-semibold text-slate-800">{fullname}</div>
                          <div className="text-[10px] text-slate-400">
                            Kelas {attendance.student?.class_name || '-'} • {formatDate(attendance.date)}
                          </div>
                        </div>
                        <div className={['flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide', style.wrapper].join(' ')}>
                          <span className={['h-1.5 w-1.5 rounded-full', style.dot].join(' ')} />
                          <span>{getStatusLabel(attendance.status)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatisticCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: 'slate' | 'emerald' | 'blue' | 'amber' | 'red';
}) {
  const styles = {
    slate: { icon: 'bg-slate-100 text-slate-500', value: 'text-slate-800' },
    emerald: { icon: 'bg-emerald-50 text-emerald-600', value: 'text-emerald-700' },
    blue: { icon: 'bg-blue-50 text-blue-600', value: 'text-blue-700' },
    amber: { icon: 'bg-amber-50 text-amber-600', value: 'text-amber-700' },
    red: { icon: 'bg-red-50 text-red-600', value: 'text-red-700' },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.035)]">
      <div className="flex items-center justify-between gap-2">
        <div className={['flex h-9 w-9 items-center justify-center rounded-xl', styles[accent].icon].join(' ')}>
          <Icon size={17} strokeWidth={1.7} />
        </div>
      </div>
      <div className="mt-3">
        <div className={['text-xl font-semibold tracking-tight', styles[accent].value].join(' ')}>
          {value}
        </div>
        <div className="mt-0.5 text-[10px] font-medium text-slate-400">{label}</div>
      </div>
    </div>
  );
}

function GraduationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10L12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}