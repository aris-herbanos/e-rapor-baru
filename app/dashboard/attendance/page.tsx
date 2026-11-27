'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  AlertCircle,
  Save,
  BarChart3,
  ListOrdered,
  Printer,
} from 'lucide-react';

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

const STATUS_OPTIONS = [
  { value: 'HADIR', label: 'Hadir', icon: CheckCircle2 },
  { value: 'SAKIT', label: 'Sakit', icon: HeartPulse },
  { value: 'IZIN', label: 'Izin', icon: FileCheck2 },
  { value: 'ALPA', label: 'Alpa', icon: UserX },
] as const;

function getStatusLabel(status: string) {
  const option = STATUS_OPTIONS.find((item) => item.value === status);
  return option?.label || status;
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [classAttendanceMap, setClassAttendanceMap] = useState<Record<number, string>>({});

  const [activeTab, setActiveTab] = useState<'input' | 'rekap'>('input');

  const [rekapStartDate, setRekapStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split('T')[0];
  });
  const [rekapEndDate, setRekapEndDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('SEMUA');
  const [filterStatus, setFilterStatus] = useState('SEMUA');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handleDirectPrint = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Cetak Rekap Kehadiran - Kelas ${selectedClass}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #000; }
            h2, h3, p { text-align: center; margin: 4px 0; }
            .header-print { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; text-align: center; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header-print">
            <h2>Pondok Pesantren Terpadu Ulil Albab</h2>
            <h3>Laporan Rekapitulasi Kehadiran Santri</h3>
            <p>Kelas: ${selectedClass || '-'} | Periode: ${formatDate(rekapStartDate)} s/d ${formatDate(rekapEndDate)}</p>
          </div>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    try {
      const url = `/api/attendance?startDate=${rekapStartDate}&endDate=${rekapEndDate}`;
      const [attendanceRes, studentRes] = await Promise.all([
        fetch(url, { cache: 'no-store' }),
        fetch('/api/students', { cache: 'no-store' }),
      ]);

      const attendanceData = await attendanceRes.json();
      if (!attendanceRes.ok) throw new Error(attendanceData?.message || 'Gagal memuat data kehadiran.');
      setAttendances(Array.isArray(attendanceData) ? attendanceData : attendanceData?.data || []);

      const studentData = await studentRes.json();
      if (!studentRes.ok) throw new Error(studentData?.message || 'Gagal memuat data santri.');
      const studentList = Array.isArray(studentData) ? studentData : studentData?.data || [];
      setStudents(studentList);

      if (!selectedClass && studentList.length > 0) {
        const firstClass = studentList.find((s: Student) => s.class_name)?.class_name;
        if (firstClass) setSelectedClass(firstClass);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal memuat data.');
      setMessageType('error');
    } finally {
      setLoadingData(false);
    }
  }, [selectedClass, rekapStartDate, rekapEndDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  useEffect(() => {
    if (!selectedClass) return;
    const initialMap: Record<number, string> = {};
    filteredStudentsByClass.forEach((student) => {
      const existing = attendances.find((a) => {
        if (a.studentId !== student.id) return false;
        const aDate = new Date(a.date).toISOString().split('T')[0];
        return aDate === attendanceDate;
      });
      initialMap[student.id] = existing ? existing.status : 'HADIR';
    });
    setClassAttendanceMap(initialMap);
  }, [selectedClass, attendanceDate, filteredStudentsByClass, attendances]);

  const handleStatusChange = (studentId: number, newStatus: string) => {
    setClassAttendanceMap((prev) => ({ ...prev, [studentId]: newStatus }));
  };

  const handleSetAllStatus = (statusVal: string) => {
    const updatedMap: Record<number, string> = {};
    filteredStudentsByClass.forEach((s) => {
      updatedMap[s.id] = statusVal;
    });
    setClassAttendanceMap(updatedMap);
  };

  const statistics = useMemo(() => ({
    total: attendances.length,
    hadir: attendances.filter((item) => item.status === 'HADIR').length,
    sakit: attendances.filter((item) => item.status === 'SAKIT').length,
    izin: attendances.filter((item) => item.status === 'IZIN').length,
    alpa: attendances.filter((item) => item.status === 'ALPA').length,
  }), [attendances]);

  const studentRecapList = useMemo(() => {
    if (!selectedClass) return [];
    return filteredStudentsByClass
      .slice()
      .sort((a, b) => a.fullname.localeCompare(b.fullname))
      .map((student) => {
        const studentRecords = attendances.filter((a) => {
          if (a.studentId !== student.id) return false;
          const aDateStr = new Date(a.date).toISOString().split('T')[0];
          if (rekapStartDate && aDateStr < rekapStartDate) return false;
          if (rekapEndDate && aDateStr > rekapEndDate) return false;
          return true;
        });
        const hadir = studentRecords.filter((a) => a.status === 'HADIR').length;
        const sakit = studentRecords.filter((a) => a.status === 'SAKIT').length;
        const izin = studentRecords.filter((a) => a.status === 'IZIN').length;
        const alpa = studentRecords.filter((a) => a.status === 'ALPA').length;
        const total = hadir + sakit + izin + alpa;
        return { ...student, hadir, sakit, izin, alpa, total };
      });
  }, [filteredStudentsByClass, attendances, selectedClass, rekapStartDate, rekapEndDate]);

  const filteredAttendances = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return attendances.filter((attendance) => {
      const studentName = attendance.student?.fullname || `Santri ID: ${attendance.studentId}`;
      const className = attendance.student?.class_name || '';
      const matchesSearch = !keyword || studentName.toLowerCase().includes(keyword) || className.toLowerCase().includes(keyword);
      const matchesClassFilter = filterClass === 'SEMUA' || className === filterClass;
      const matchesStatus = filterStatus === 'SEMUA' || attendance.status === filterStatus;
      return matchesSearch && matchesClassFilter && matchesStatus;
    });
  }, [attendances, search, filterClass, filterStatus]);

  const handleSubmitBatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedClass || !attendanceDate) {
      setMessage('Silakan pilih kelas dan tanggal.');
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
    setLoading(true);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Gagal menyimpan kehadiran.');
      setMessage('Kehadiran satu kelas berhasil dicatat.');
      setMessageType('success');
      await fetchData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (value: string) => {
    switch (value) {
      case 'HADIR': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'SAKIT': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IZIN': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'ALPA': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1d2327]">Kehadiran Santri</h1>
        <p className="mt-1 text-sm text-[#646970]">
          Kelola absensi satu kelas sekaligus dan lihat rekapitulasi kehadiran.
        </p>
      </div>

      {message && (
        <div className={`flex items-center gap-3 rounded border p-3 text-sm ${
          messageType === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-red-200 bg-red-50 text-red-800'
        }`}>
          {messageType === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {message}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Catatan" value={statistics.total} />
        <StatCard label="Hadir" value={statistics.hadir} accent="emerald" />
        <StatCard label="Sakit" value={statistics.sakit} accent="blue" />
        <StatCard label="Izin" value={statistics.izin} accent="amber" />
        <StatCard label="Alpa" value={statistics.alpa} accent="red" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* Main Panel */}
        <div className="rounded-lg border border-[#c3c4c7] bg-white">
          {/* Tabs */}
          <div className="flex border-b border-[#c3c4c7] bg-[#f6f7f7] px-5">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
                activeTab === 'input'
                  ? 'border-[#2271b1] text-[#2271b1]'
                  : 'border-transparent text-[#646970] hover:text-[#1d2327]'
              }`}
            >
              <ListOrdered size={16} /> Lembar Absensi
            </button>
            <button
              onClick={() => setActiveTab('rekap')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
                activeTab === 'rekap'
                  ? 'border-[#2271b1] text-[#2271b1]'
                  : 'border-transparent text-[#646970] hover:text-[#1d2327]'
              }`}
            >
              <BarChart3 size={16} /> Rekap Per Siswa
            </button>
          </div>

          <div className="border-b border-[#c3c4c7] px-5 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold text-[#1d2327]">
                {activeTab === 'input' ? 'Lembar Absensi Kelas' : 'Rekapitulasi Kehadiran'}
              </h2>

              {activeTab === 'input' && filteredStudentsByClass.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-[#646970]">Set Semua:</span>
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSetAllStatus(opt.value)}
                      className="rounded border border-[#c3c4c7] bg-white px-2.5 py-1 text-xs hover:bg-[#f6f7f7]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'rekap' && studentRecapList.length > 0 && (
                <button
                  onClick={handleDirectPrint}
                  className="inline-flex items-center gap-2 rounded bg-[#2271b1] px-4 py-2 text-sm text-white hover:bg-[#135e96]"
                >
                  <Printer size={16} /> Cetak Rekap
                </button>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#646970]">Kelas</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                >
                  <option value="">— Pilih Kelas —</option>
                  {classList.map((cls) => (
                    <option key={cls} value={cls}>Kelas {cls}</option>
                  ))}
                </select>
              </div>

              {activeTab === 'input' ? (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#646970]">Tanggal</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#646970]">Dari</label>
                    <input
                      type="date"
                      value={rekapStartDate}
                      onChange={(e) => setRekapStartDate(e.target.value)}
                      className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[#646970]">Sampai</label>
                    <input
                      type="date"
                      value={rekapEndDate}
                      onChange={(e) => setRekapEndDate(e.target.value)}
                      className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-5">
            {!selectedClass ? (
              <div className="py-12 text-center text-sm text-[#646970]">Silakan pilih kelas terlebih dahulu.</div>
            ) : activeTab === 'input' ? (
              filteredStudentsByClass.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#646970]">Tidak ada santri di kelas ini.</div>
              ) : (
                <form onSubmit={handleSubmitBatch} className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                          <th className="p-3 text-center w-12">No</th>
                          <th className="p-3 text-left">Nama Santri</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudentsByClass
                          .slice()
                          .sort((a, b) => a.fullname.localeCompare(b.fullname))
                          .map((student, idx) => {
                            const currentStatus = classAttendanceMap[student.id] || 'HADIR';
                            return (
                              <tr key={student.id} className="border-b border-[#c3c4c7] hover:bg-[#f6f7f7]">
                                <td className="p-3 text-center text-[#646970]">{idx + 1}</td>
                                <td className="p-3 font-medium">{student.fullname}</td>
                                <td className="p-3 text-center">
                                  <div className="inline-flex gap-1">
                                    {STATUS_OPTIONS.map((opt) => (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleStatusChange(student.id, opt.value)}
                                        className={`rounded px-3 py-1 text-xs font-medium ${
                                          currentStatus === opt.value
                                            ? 'bg-[#2271b1] text-white'
                                            : 'bg-[#f0f0f1] text-[#1d2327] hover:bg-[#e0e0e0]'
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded bg-[#2271b1] px-5 py-2 text-sm font-medium text-white hover:bg-[#135e96] disabled:opacity-50"
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                      {loading ? 'Menyimpan...' : 'Simpan Absensi'}
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div ref={printRef}>
                {studentRecapList.length === 0 ? (
                  <div className="py-12 text-center text-sm text-[#646970]">Tidak ada data rekap.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">
                          <th className="p-3 text-center">No</th>
                          <th className="p-3 text-left">Nama Santri</th>
                          <th className="p-3 text-center">Hadir</th>
                          <th className="p-3 text-center">Sakit</th>
                          <th className="p-3 text-center">Izin</th>
                          <th className="p-3 text-center">Alpa</th>
                          <th className="p-3 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentRecapList.map((item, idx) => (
                          <tr key={item.id} className="border-b border-[#c3c4c7] hover:bg-[#f6f7f7]">
                            <td className="p-3 text-center">{idx + 1}</td>
                            <td className="p-3 font-medium">{item.fullname}</td>
                            <td className="p-3 text-center">{item.hadir}</td>
                            <td className="p-3 text-center">{item.sakit}</td>
                            <td className="p-3 text-center">{item.izin}</td>
                            <td className="p-3 text-center">{item.alpa}</td>
                            <td className="p-3 text-center font-medium">{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        <div className="rounded-lg border border-[#c3c4c7] bg-white">
          <div className="border-b border-[#c3c4c7] px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#1d2327]">Riwayat Kehadiran</h2>
              <button
                onClick={fetchData}
                disabled={loadingData}
                className="inline-flex items-center gap-1 rounded border border-[#c3c4c7] px-3 py-1 text-xs hover:bg-[#f6f7f7]"
              >
                <RefreshCw size={14} className={loadingData ? 'animate-spin' : ''} />
                Perbarui
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              <button
                onClick={() => setFilterClass('SEMUA')}
                className={`rounded px-2.5 py-1 text-xs ${
                  filterClass === 'SEMUA' ? 'bg-[#2271b1] text-white' : 'bg-[#f0f0f1] hover:bg-[#e0e0e0]'
                }`}
              >
                Semua
              </button>
              {classList.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={`rounded px-2.5 py-1 text-xs ${
                    filterClass === cls ? 'bg-[#2271b1] text-white' : 'bg-[#f0f0f1] hover:bg-[#e0e0e0]'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari santri..."
                  className="w-full rounded border border-[#8c8f94] py-1.5 pl-8 pr-3 text-xs focus:border-[#2271b1] focus:outline-none"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded border border-[#8c8f94] px-2 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
              >
                <option value="SEMUA">Semua Status</option>
                <option value="HADIR">Hadir</option>
                <option value="SAKIT">Sakit</option>
                <option value="IZIN">Izin</option>
                <option value="ALPA">Alpa</option>
              </select>
            </div>
          </div>

          <div className="max-h-[520px] overflow-y-auto">
            {loadingData ? (
              <div className="py-12 text-center text-sm text-[#646970]">Memuat...</div>
            ) : filteredAttendances.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#646970]">Belum ada catatan.</div>
            ) : (
              <div className="divide-y divide-[#c3c4c7]">
                {filteredAttendances.map((attendance) => {
                  const fullname = attendance.student?.fullname || `Santri ID: ${attendance.studentId}`;
                  return (
                    <div key={attendance.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#f6f7f7]">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-[#f0f0f1] text-xs font-medium text-[#1d2327]">
                        {fullname.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{fullname}</div>
                        <div className="text-xs text-[#646970]">
                          Kelas {attendance.student?.class_name || '-'} • {formatDate(attendance.date)}
                        </div>
                      </div>
                      <span className={`rounded border px-2 py-0.5 text-xs font-medium ${getStatusStyle(attendance.status)}`}>
                        {getStatusLabel(attendance.status)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = 'slate',
}: {
  label: string;
  value: number;
  accent?: 'slate' | 'emerald' | 'blue' | 'amber' | 'red';
}) {
  const colorMap = {
    slate: 'text-[#1d2327]',
    emerald: 'text-emerald-700',
    blue: 'text-blue-700',
    amber: 'text-amber-700',
    red: 'text-red-700',
  };
  return (
    <div className="rounded-lg border border-[#c3c4c7] bg-white p-4">
      <div className={`text-2xl font-semibold ${colorMap[accent]}`}>{value}</div>
      <div className="mt-1 text-xs text-[#646970]">{label}</div>
    </div>
  );
}