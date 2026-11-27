
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
  HeartPulse,
  FileCheck2,
  UserX,
  Search,
  RefreshCw,
  AlertCircle,
  Save,
  Printer,
  Users,
  ChevronDown,
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================

type Student = {
  id: number;
  fullname: string;
  class_name?: string | null;
};

type Attendance = {
  id: number;
  studentId: number;
  status: string;
  date: string;
  student?: {
    fullname?: string | null;
    class_name?: string | null;
  } | null;
};

type Status = 'HADIR' | 'SAKIT' | 'IZIN' | 'ALPA';

const STATUS_OPTIONS: {
  value: Status;
  label: string;
  short: string;
  color: string;
}[] = [
  {
    value: 'HADIR',
    label: 'Hadir',
    short: 'H',
    color: 'bg-[#00a32a]',
  },
  {
    value: 'SAKIT',
    label: 'Sakit',
    short: 'S',
    color: 'bg-[#2271b1]',
  },
  {
    value: 'IZIN',
    label: 'Izin',
    short: 'I',
    color: 'bg-[#dba617]',
  },
  {
    value: 'ALPA',
    label: 'Alpa',
    short: 'A',
    color: 'bg-[#d63638]',
  },
];

// ============================================================
// HELPERS
// ============================================================

function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDateOnly(value: string) {
  if (!value) return '';

  if (value.includes('T')) {
    return value.split('T')[0];
  }

  return getLocalDate(new Date(value));
}

function formatDate(value: string) {
  if (!value) return '-';

  const date = new Date(`${getDateOnly(value)}T12:00:00`);

  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateLong(value: string) {
  if (!value) return '-';

  const date = new Date(`${getDateOnly(value)}T12:00:00`);

  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getStatusLabel(status: string) {
  return (
    STATUS_OPTIONS.find((item) => item.value === status)?.label ||
    status
  );
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'HADIR':
      return 'border-[#b8e6bf] bg-[#edfaef] text-[#008a20]';

    case 'SAKIT':
      return 'border-[#b6d7f2] bg-[#eef7ff] text-[#135e96]';

    case 'IZIN':
      return 'border-[#f0d58a] bg-[#fcf9e8] text-[#996800]';

    case 'ALPA':
      return 'border-[#f0b8b8] bg-[#fcf0f1] text-[#b32d2e]';

    default:
      return 'border-[#c3c4c7] bg-[#f6f7f7] text-[#646970]';
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(
    () => getLocalDate()
  );

  const [classAttendanceMap, setClassAttendanceMap] = useState<
    Record<number, string>
  >({});

  const [activeTab, setActiveTab] = useState<'input' | 'rekap'>(
    'input'
  );

  const [rekapStartDate, setRekapStartDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return getLocalDate(date);
  });

  const [rekapEndDate, setRekapEndDate] = useState(
    () => getLocalDate()
  );

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('SEMUA');
  const [filterStatus, setFilterStatus] = useState('SEMUA');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<
    'success' | 'error' | ''
  >('');

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  // ==========================================================
  // FETCH DATA
  // ==========================================================

  const fetchData = useCallback(async () => {
    setLoadingData(true);

    try {
      const url =
        `/api/attendance?startDate=${rekapStartDate}` +
        `&endDate=${rekapEndDate}`;

      const [attendanceRes, studentRes] = await Promise.all([
        fetch(url, { cache: 'no-store' }),
        fetch('/api/students', { cache: 'no-store' }),
      ]);

      const attendanceData = await attendanceRes.json();

      if (!attendanceRes.ok) {
        throw new Error(
          attendanceData?.message ||
            'Gagal memuat data kehadiran.'
        );
      }

      setAttendances(
        Array.isArray(attendanceData)
          ? attendanceData
          : attendanceData?.data || []
      );

      const studentData = await studentRes.json();

      if (!studentRes.ok) {
        throw new Error(
          studentData?.message ||
            'Gagal memuat data santri.'
        );
      }

      const studentList = Array.isArray(studentData)
        ? studentData
        : studentData?.data || [];

      setStudents(studentList);

      if (!selectedClass && studentList.length > 0) {
        const firstClass = studentList.find(
          (student: Student) => student.class_name
        )?.class_name;

        if (firstClass) {
          setSelectedClass(firstClass);
        }
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat data.'
      );

      setMessageType('error');
    } finally {
      setLoadingData(false);
    }
  }, [selectedClass, rekapStartDate, rekapEndDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================================
  // CLASS LIST
  // ==========================================================

  const classList = useMemo(() => {
    const classes = students
      .map((student) => student.class_name)
      .filter(
        (className): className is string =>
          Boolean(className && className.trim())
      );

    return Array.from(new Set(classes)).sort();
  }, [students]);

  // ==========================================================
  // STUDENTS IN SELECTED CLASS
  // ==========================================================

  const filteredStudentsByClass = useMemo(() => {
    if (!selectedClass) return [];

    return students
      .filter((student) => student.class_name === selectedClass)
      .sort((a, b) => a.fullname.localeCompare(b.fullname));
  }, [students, selectedClass]);

  // ==========================================================
  // INITIAL ATTENDANCE STATUS
  // ==========================================================

  useEffect(() => {
    if (!selectedClass) return;

    const initialMap: Record<number, string> = {};

    filteredStudentsByClass.forEach((student) => {
      const existing = attendances.find((attendance) => {
        if (attendance.studentId !== student.id) return false;

        return (
          getDateOnly(attendance.date) === attendanceDate
        );
      });

      initialMap[student.id] = existing
        ? existing.status
        : 'HADIR';
    });

    setClassAttendanceMap(initialMap);
  }, [
    selectedClass,
    attendanceDate,
    filteredStudentsByClass,
    attendances,
  ]);

  // ==========================================================
  // CHANGE STATUS
  // ==========================================================

  const handleStatusChange = (
    studentId: number,
    newStatus: string
  ) => {
    setClassAttendanceMap((previous) => ({
      ...previous,
      [studentId]: newStatus,
    }));
  };

  // ==========================================================
  // SET ALL STATUS
  // ==========================================================

  const handleSetAllStatus = (status: string) => {
    const updatedMap: Record<number, string> = {};

    filteredStudentsByClass.forEach((student) => {
      updatedMap[student.id] = status;
    });

    setClassAttendanceMap(updatedMap);
  };

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const classStatistics = useMemo(() => {
    const values = Object.values(classAttendanceMap);

    return {
      total: filteredStudentsByClass.length,
      hadir: values.filter((value) => value === 'HADIR').length,
      sakit: values.filter((value) => value === 'SAKIT').length,
      izin: values.filter((value) => value === 'IZIN').length,
      alpa: values.filter((value) => value === 'ALPA').length,
    };
  }, [classAttendanceMap, filteredStudentsByClass]);

  const statistics = useMemo(() => {
    return {
      total: attendances.length,
      hadir: attendances.filter(
        (item) => item.status === 'HADIR'
      ).length,
      sakit: attendances.filter(
        (item) => item.status === 'SAKIT'
      ).length,
      izin: attendances.filter(
        (item) => item.status === 'IZIN'
      ).length,
      alpa: attendances.filter(
        (item) => item.status === 'ALPA'
      ).length,
    };
  }, [attendances]);

  // ==========================================================
  // RECAP PER STUDENT
  // ==========================================================

  const studentRecapList = useMemo(() => {
    if (!selectedClass) return [];

    return filteredStudentsByClass.map((student) => {
      const records = attendances.filter((attendance) => {
        if (attendance.studentId !== student.id) return false;

        const dateString = getDateOnly(attendance.date);

        if (
          rekapStartDate &&
          dateString < rekapStartDate
        ) {
          return false;
        }

        if (
          rekapEndDate &&
          dateString > rekapEndDate
        ) {
          return false;
        }

        return true;
      });

      const hadir = records.filter(
        (item) => item.status === 'HADIR'
      ).length;

      const sakit = records.filter(
        (item) => item.status === 'SAKIT'
      ).length;

      const izin = records.filter(
        (item) => item.status === 'IZIN'
      ).length;

      const alpa = records.filter(
        (item) => item.status === 'ALPA'
      ).length;

      return {
        ...student,
        hadir,
        sakit,
        izin,
        alpa,
        total: hadir + sakit + izin + alpa,
      };
    });
  }, [
    filteredStudentsByClass,
    attendances,
    selectedClass,
    rekapStartDate,
    rekapEndDate,
  ]);

  // ==========================================================
  // HISTORY FILTER
  // ==========================================================

  const filteredAttendances = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return attendances.filter((attendance) => {
      const studentName =
        attendance.student?.fullname ||
        `Santri ID: ${attendance.studentId}`;

      const className =
        attendance.student?.class_name || '';

      const matchesSearch =
        !keyword ||
        studentName.toLowerCase().includes(keyword) ||
        className.toLowerCase().includes(keyword);

      const matchesClass =
        filterClass === 'SEMUA' ||
        className === filterClass;

      const matchesStatus =
        filterStatus === 'SEMUA' ||
        attendance.status === filterStatus;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    attendances,
    search,
    filterClass,
    filterStatus,
  ]);

  // ==========================================================
  // SAVE ATTENDANCE
  // ==========================================================

  const handleSubmitBatch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedClass || !attendanceDate) {
      setMessage('Silakan pilih kelas dan tanggal.');
      setMessageType('error');
      return;
    }

    const payload = Object.entries(classAttendanceMap).map(
      ([studentId, status]) => ({
        studentId: Number(studentId),
        status,
        date: attendanceDate,
      })
    );

    if (payload.length === 0) {
      setMessage('Tidak ada santri di kelas ini.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Gagal menyimpan kehadiran.'
        );
      }

      setMessage(
        `Kehadiran ${payload.length} santri kelas ${selectedClass} berhasil disimpan.`
      );

      setMessageType('success');

      await fetchData();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat menyimpan.'
      );

      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // PRINT
  // ==========================================================

  const handleDirectPrint = () => {
    const printContent = printRef.current?.innerHTML;

    if (!printContent) return;

    const printWindow = window.open(
      '',
      '_blank',
      'width=900,height=700'
    );

    if (!printWindow) {
      alert('Izinkan popup untuk mencetak laporan.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rekap Kehadiran Santri</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 24px;
              color: #000;
            }

            h2, h3, p {
              text-align: center;
              margin: 4px 0;
            }

            .header-print {
              border-bottom: 2px solid #000;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 12px;
            }

            th, td {
              border: 1px solid #333;
              padding: 7px;
              text-align: left;
            }

            th {
              background: #f2f2f2;
              text-align: center;
            }

            .text-center {
              text-align: center;
            }

            .font-bold {
              font-weight: bold;
            }

            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>

        <body>
          <div class="header-print">
            <h2>Pondok Pesantren Terpadu Ulil Albab</h2>
            <h3>Rekapitulasi Kehadiran Santri</h3>
            <p>
              Kelas ${selectedClass || '-'}
              |
              Periode ${formatDate(rekapStartDate)}
              s/d ${formatDate(rekapEndDate)}
            </p>
          </div>

          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-4">

      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div className="flex flex-wrap items-center justify-between gap-3">

        <div>
          <h1 className="text-[23px] font-normal text-[#1d2327]">
            Kehadiran Santri
          </h1>

          <p className="mt-1 text-[13px] text-[#646970]">
            Catat kehadiran dan lihat rekap absensi santri.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          disabled={loadingData}
          className="inline-flex items-center gap-2 rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#1d2327] hover:bg-[#f6f7f7] disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loadingData ? 'animate-spin' : ''}
          />
          Perbarui
        </button>

      </div>

      {/* ======================================================
          NOTIFICATION
      ======================================================= */}

      {message && (
        <div
          className={`flex items-start gap-2 rounded-[3px] border-l-4 bg-white px-3 py-3 text-[13px] ${
            messageType === 'success'
              ? 'border-[#00a32a]'
              : 'border-[#d63638]'
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-[#00a32a]"
            />
          ) : (
            <AlertCircle
              size={17}
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
            ×
          </button>
        </div>
      )}

      {/* ======================================================
          SUMMARY
      ======================================================= */}

      <div className="rounded-[4px] border border-[#c3c4c7] bg-white">

        <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-2.5">
          <h2 className="text-[13px] font-medium text-[#1d2327]">
            Ringkasan Kehadiran
          </h2>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-[#e2e4e7] sm:grid-cols-5 sm:divide-y-0">

          <SummaryItem
            label="Total Catatan"
            value={statistics.total}
            color="text-[#1d2327]"
          />

          <SummaryItem
            label="Hadir"
            value={statistics.hadir}
            color="text-[#008a20]"
          />

          <SummaryItem
            label="Sakit"
            value={statistics.sakit}
            color="text-[#135e96]"
          />

          <SummaryItem
            label="Izin"
            value={statistics.izin}
            color="text-[#996800]"
          />

          <SummaryItem
            label="Alpa"
            value={statistics.alpa}
            color="text-[#b32d2e]"
          />

        </div>

      </div>

      {/* ======================================================
          MAIN ATTENDANCE WIDGET
      ======================================================= */}

      <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

        {/* TABS */}

        <div className="flex border-b border-[#c3c4c7] bg-[#f6f7f7]">

          <button
            type="button"
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-[13px] ${
              activeTab === 'input'
                ? 'border-[#2271b1] bg-white font-medium text-[#2271b1]'
                : 'border-transparent text-[#646970] hover:text-[#1d2327]'
            }`}
          >
            <CalendarCheck size={16} />
            Input Kehadiran
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rekap')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-[13px] ${
              activeTab === 'rekap'
                ? 'border-[#2271b1] bg-white font-medium text-[#2271b1]'
                : 'border-transparent text-[#646970] hover:text-[#1d2327]'
            }`}
          >
            <Users size={16} />
            Rekap per Santri
          </button>

        </div>

        {/* FILTER BAR */}

        <div className="border-b border-[#c3c4c7] px-4 py-3">

          <div className="grid gap-3 sm:grid-cols-2">

            {/* CLASS */}

            <div>
              <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                Pilih Kelas
              </label>

              <div className="relative">

                <select
                  value={selectedClass}
                  onChange={(event) =>
                    setSelectedClass(event.target.value)
                  }
                  className="w-full appearance-none rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 pr-8 text-[13px] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                >
                  <option value="">
                    — Pilih Kelas —
                  </option>

                  {classList.map((className) => (
                    <option
                      key={className}
                      value={className}
                    >
                      Kelas {className}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

              </div>
            </div>

            {/* DATE */}

            {activeTab === 'input' ? (

              <div>
                <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                  Tanggal Kehadiran
                </label>

                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(event) =>
                    setAttendanceDate(event.target.value)
                  }
                  className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>

            ) : (

              <div className="grid grid-cols-2 gap-2">

                <div>
                  <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                    Dari Tanggal
                  </label>

                  <input
                    type="date"
                    value={rekapStartDate}
                    onChange={(event) =>
                      setRekapStartDate(event.target.value)
                    }
                    className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-2 py-2 text-[12px] focus:border-[#2271b1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                    Sampai Tanggal
                  </label>

                  <input
                    type="date"
                    value={rekapEndDate}
                    onChange={(event) =>
                      setRekapEndDate(event.target.value)
                    }
                    className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-2 py-2 text-[12px] focus:border-[#2271b1] focus:outline-none"
                  />
                </div>

              </div>

            )}

          </div>

        </div>

        {/* ====================================================
            INPUT TAB
        ===================================================== */}

        {activeTab === 'input' && (

          <div>

            {/* INPUT TOOLBAR */}

            {selectedClass && filteredStudentsByClass.length > 0 && (

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e4e7] bg-white px-4 py-3">

                <div className="text-[13px] text-[#1d2327]">

                  <strong>
                    Kelas {selectedClass}
                  </strong>

                  <span className="ml-2 text-[#646970]">
                    {filteredStudentsByClass.length} santri
                  </span>

                </div>

                <div className="flex flex-wrap items-center gap-1.5">

                  <span className="mr-1 text-[11px] text-[#646970]">
                    Tandai semua:
                  </span>

                  {STATUS_OPTIONS.map((status) => (

                    <button
                      key={status.value}
                      type="button"
                      onClick={() =>
                        handleSetAllStatus(status.value)
                      }
                      className={`rounded-[3px] border px-2 py-1 text-[11px] hover:opacity-80 ${
                        getStatusStyle(status.value)
                      }`}
                    >
                      {status.label}
                    </button>

                  ))}

                </div>

              </div>

            )}

            {/* INPUT CONTENT */}

            <div className="p-4">

              {!selectedClass ? (

                <EmptyState
                  title="Pilih Kelas Terlebih Dahulu"
                  description="Pilih kelas pada bagian atas untuk menampilkan daftar santri."
                />

              ) : filteredStudentsByClass.length === 0 ? (

                <EmptyState
                  title="Belum Ada Santri"
                  description="Tidak ditemukan santri pada kelas yang dipilih."
                />

              ) : (

                <form onSubmit={handleSubmitBatch}>

                  {/* ATTENDANCE TABLE */}

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[460px] border-collapse text-[13px]">

                      <thead>

                        <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">

                          <th className="w-12 px-3 py-2.5 text-center font-medium text-[#1d2327]">
                            No.
                          </th>

                          <th className="px-3 py-2.5 text-left font-medium text-[#1d2327]">
                            Nama Santri
                          </th>

                          <th className="w-[210px] px-3 py-2.5 text-left font-medium text-[#1d2327]">
                            Kehadiran
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {filteredStudentsByClass.map(
                          (student, index) => {
                            const currentStatus =
                              classAttendanceMap[student.id] ||
                              'HADIR';

                            return (

                              <tr
                                key={student.id}
                                className="border-b border-[#e2e4e7] hover:bg-[#f6f7f7]"
                              >

                                <td className="px-3 py-2.5 text-center text-[#646970]">
                                  {index + 1}
                                </td>

                                <td className="px-3 py-2.5 font-medium text-[#1d2327]">
                                  {student.fullname}
                                </td>

                                <td className="px-3 py-2.5">

                                  <select
                                    value={currentStatus}
                                    onChange={(event) =>
                                      handleStatusChange(
                                        student.id,
                                        event.target.value
                                      )
                                    }
                                    className={`w-full rounded-[3px] border px-2 py-1.5 text-[12px] font-medium focus:outline-none focus:ring-1 focus:ring-[#2271b1] ${getStatusStyle(currentStatus)}`}
                                  >

                                    {STATUS_OPTIONS.map(
                                      (status) => (
                                        <option
                                          key={status.value}
                                          value={status.value}
                                        >
                                          {status.label}
                                        </option>
                                      )
                                    )}

                                  </select>

                                </td>

                              </tr>

                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>

                  {/* SUMMARY BEFORE SAVE */}

                  <div className="mt-3 grid grid-cols-4 gap-1.5">

                    <MiniCount
                      label="Hadir"
                      count={classStatistics.hadir}
                      color="text-[#008a20]"
                    />

                    <MiniCount
                      label="Sakit"
                      count={classStatistics.sakit}
                      color="text-[#135e96]"
                    />

                    <MiniCount
                      label="Izin"
                      count={classStatistics.izin}
                      color="text-[#996800]"
                    />

                    <MiniCount
                      label="Alpa"
                      count={classStatistics.alpa}
                      color="text-[#b32d2e]"
                    />

                  </div>

                  {/* SAVE BUTTON */}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e2e4e7] pt-3">

                    <div className="text-[12px] text-[#646970]">
                      Tanggal: {formatDateLong(attendanceDate)}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || loadingData}
                      className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {loading ? (
                        <RefreshCw
                          size={15}
                          className="animate-spin"
                        />
                      ) : (
                        <Save size={15} />
                      )}

                      {loading
                        ? 'Menyimpan...'
                        : 'Simpan Absensi'}

                    </button>

                  </div>

                </form>

              )}

            </div>

          </div>

        )}

        {/* ====================================================
            RECAP TAB
        ===================================================== */}

        {activeTab === 'rekap' && (

          <div className="p-4">

            {!selectedClass ? (

              <EmptyState
                title="Pilih Kelas"
                description="Pilih kelas terlebih dahulu untuk melihat rekap kehadiran."
              />

            ) : (

              <div>

                {/* RECAP HEADER */}

                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">

                  <div>

                    <h3 className="text-[13px] font-medium text-[#1d2327]">
                      Rekap Kelas {selectedClass}
                    </h3>

                    <p className="mt-1 text-[12px] text-[#646970]">
                      {formatDate(rekapStartDate)} –{' '}
                      {formatDate(rekapEndDate)}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleDirectPrint}
                    disabled={studentRecapList.length === 0}
                    className="inline-flex items-center gap-2 rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-3 py-2 text-[12px] text-white hover:bg-[#135e96] disabled:opacity-50"
                  >
                    <Printer size={15} />
                    Cetak Rekap
                  </button>

                </div>

                {/* PRINT AREA */}

                <div ref={printRef}>

                  {studentRecapList.length === 0 ? (

                    <EmptyState
                      title="Belum Ada Data Rekap"
                      description="Tidak ditemukan data kehadiran pada periode tersebut."
                    />

                  ) : (

                    <div className="overflow-x-auto">

                      <table className="w-full min-w-[540px] border-collapse text-[12px]">

                        <thead>

                          <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">

                            <th className="w-10 px-2 py-2.5 text-center font-medium">
                              No.
                            </th>

                            <th className="px-3 py-2.5 text-left font-medium">
                              Nama Santri
                            </th>

                            <th className="px-2 py-2.5 text-center font-medium">
                              Hadir
                            </th>

                            <th className="px-2 py-2.5 text-center font-medium">
                              Sakit
                            </th>

                            <th className="px-2 py-2.5 text-center font-medium">
                              Izin
                            </th>

                            <th className="px-2 py-2.5 text-center font-medium">
                              Alpa
                            </th>

                            <th className="px-2 py-2.5 text-center font-medium">
                              Total
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {studentRecapList.map(
                            (student, index) => (

                              <tr
                                key={student.id}
                                className="border-b border-[#e2e4e7] hover:bg-[#f6f7f7]"
                              >

                                <td className="px-2 py-2 text-center text-[#646970]">
                                  {index + 1}
                                </td>

                                <td className="px-3 py-2 font-medium text-[#1d2327]">
                                  {student.fullname}
                                </td>

                                <td className="px-2 py-2 text-center text-[#008a20]">
                                  {student.hadir}
                                </td>

                                <td className="px-2 py-2 text-center text-[#135e96]">
                                  {student.sakit}
                                </td>

                                <td className="px-2 py-2 text-center text-[#996800]">
                                  {student.izin}
                                </td>

                                <td className="px-2 py-2 text-center text-[#b32d2e]">
                                  {student.alpa}
                                </td>

                                <td className="px-2 py-2 text-center font-medium">
                                  {student.total}
                                </td>

                              </tr>

                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  )}

                </div>

              </div>

            )}

          </div>

        )}

      </div>

      {/* ======================================================
          HISTORY WIDGET
      ======================================================= */}

      <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

        {/* HISTORY HEADER */}

        <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <div>

              <h2 className="text-[13px] font-medium text-[#1d2327]">
                Riwayat Kehadiran
              </h2>

              <p className="mt-0.5 text-[11px] text-[#646970]">
                Daftar catatan kehadiran yang sudah tersimpan.
              </p>

            </div>

            <span className="rounded-[3px] border border-[#c3c4c7] bg-white px-2 py-1 text-[11px] text-[#646970]">
              {filteredAttendances.length} data
            </span>

          </div>

          {/* FILTERS */}

          <div className="mt-3 flex flex-wrap gap-2">

            {/* SEARCH */}

            <div className="relative min-w-[180px] flex-1">

              <Search
                size={15}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#646970]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Cari nama santri..."
                className="w-full rounded-[3px] border border-[#8c8f94] bg-white py-1.5 pl-8 pr-3 text-[12px] focus:border-[#2271b1] focus:outline-none"
              />

            </div>

            {/* CLASS FILTER */}

            <select
              value={filterClass}
              onChange={(event) =>
                setFilterClass(event.target.value)
              }
              className="rounded-[3px] border border-[#8c8f94] bg-white px-2 py-1.5 text-[12px] focus:border-[#2271b1] focus:outline-none"
            >

              <option value="SEMUA">
                Semua Kelas
              </option>

              {classList.map((className) => (
                <option
                  key={className}
                  value={className}
                >
                  Kelas {className}
                </option>
              ))}

            </select>

            {/* STATUS FILTER */}

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
              className="rounded-[3px] border border-[#8c8f94] bg-white px-2 py-1.5 text-[12px] focus:border-[#2271b1] focus:outline-none"
            >

              <option value="SEMUA">
                Semua Status
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* HISTORY LIST */}

        {loadingData ? (

          <div className="flex items-center justify-center gap-2 py-10 text-[13px] text-[#646970]">

            <RefreshCw
              size={16}
              className="animate-spin"
            />

            Memuat data...

          </div>

        ) : filteredAttendances.length === 0 ? (

          <div className="py-10 text-center">

            <Search
              size={25}
              className="mx-auto mb-2 text-[#c3c4c7]"
            />

            <p className="text-[13px] text-[#646970]">
              Tidak ada catatan kehadiran yang ditemukan.
            </p>

          </div>

        ) : (

          <div className="max-h-[360px] overflow-y-auto">

            <table className="w-full min-w-[480px] border-collapse text-[12px]">

              <thead className="sticky top-0 z-10">

                <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7]">

                  <th className="w-10 px-3 py-2 text-center font-medium">
                    No.
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Nama Santri
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Kelas
                  </th>

                  <th className="px-3 py-2 text-left font-medium">
                    Tanggal
                  </th>

                  <th className="px-3 py-2 text-center font-medium">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredAttendances.map(
                  (attendance, index) => {

                    const fullname =
                      attendance.student?.fullname ||
                      `Santri ID: ${attendance.studentId}`;

                    return (

                      <tr
                        key={attendance.id}
                        className="border-b border-[#e2e4e7] hover:bg-[#f6f7f7]"
                      >

                        <td className="px-3 py-2 text-center text-[#646970]">
                          {index + 1}
                        </td>

                        <td className="px-3 py-2 font-medium text-[#1d2327]">
                          {fullname}
                        </td>

                        <td className="px-3 py-2 text-[#646970]">
                          {attendance.student?.class_name || '-'}
                        </td>

                        <td className="px-3 py-2 text-[#646970]">
                          {formatDate(attendance.date)}
                        </td>

                        <td className="px-3 py-2 text-center">

                          <span
                            className={`inline-block rounded-[3px] border px-2 py-0.5 text-[11px] font-medium ${getStatusStyle(attendance.status)}`}
                          >
                            {getStatusLabel(attendance.status)}
                          </span>

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        )}

        {/* HISTORY FOOTER */}

        <div className="border-t border-[#c3c4c7] bg-[#f6f7f7] px-4 py-2">

          <p className="text-[11px] text-[#646970]">
            Gunakan pencarian dan filter untuk menemukan
            catatan kehadiran tertentu.
          </p>

        </div>

      </div>

    </div>
  );
}

// ============================================================
// SUMMARY ITEM
// ============================================================

function SummaryItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="px-3 py-3">

      <div className={`text-[21px] font-semibold leading-tight ${color}`}>
        {value}
      </div>

      <div className="mt-1 text-[11px] text-[#646970]">
        {label}
      </div>

    </div>
  );
}

// ============================================================
// MINI COUNT
// ============================================================

function MiniCount({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div className="rounded-[3px] border border-[#e2e4e7] bg-[#f6f7f7] px-2 py-2 text-center">

      <div className={`text-[16px] font-semibold ${color}`}>
        {count}
      </div>

      <div className="text-[10px] text-[#646970]">
        {label}
      </div>

    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="py-10 text-center">

      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f0f1]">
        <Users
          size={20}
          className="text-[#646970]"
        />
      </div>

      <h3 className="text-[13px] font-medium text-[#1d2327]">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-[12px] text-[#646970]">
        {description}
      </p>

    </div>
  );
}
