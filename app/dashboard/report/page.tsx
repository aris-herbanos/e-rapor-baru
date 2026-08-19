'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Loader2,
  Printer,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

type Student = {
  id: number;
  nisn: string;
  fullname: string;
  gender: string;
  class_name: string;
};

type ScoreRecord = {
  subjectId: number;
  subject: {
    name: string;
  };
  type: string;
  scoreNumber: number;
  scoreText: string;
};

type ReportData = Student & {
  scoreRecords?: ScoreRecord[];

  personality?: {
    arabic: string;
    name: string;
    value: string;
  }[];

  homeroomNote?: string;

  attendance?: {
    sakit: number;
    izin: number;
    alpa: number;
  };

  averageScore?: number | null;
  totalStudents?: number | null;
  rank?: number | null;
};

const ORAL_SUBJECTS = [
  {
    arabic: 'تجويد',
    name: 'Tajwid',
  },
  {
    arabic: 'تحفيظ القرآن / تحسين',
    name: 'Tahfidz / Tahsin',
  },
  {
    arabic: 'المراجعة',
    name: "Muroja'ah",
  },
  {
    arabic: 'الفقه',
    name: 'Fiqih',
  },
  {
    arabic: 'اللغة العربية',
    name: 'Bahasa Arab',
  },
  {
    arabic: 'الخطابة',
    name: 'Pidato',
  },
];

const WRITTEN_SUBJECTS = [
  {
    arabic: 'الحديث',
    name: 'Hadis',
  },
  {
    arabic: 'التربية الدينية الإسلامية',
    name: 'Pendidikan Agama Islam',
  },
  {
    arabic: 'الفقه',
    name: 'Fiqih',
  },
  {
    arabic: 'الثقافة الإسلامية',
    name: 'Tsaqofah Islamiyah',
  },
  {
    arabic: 'اللغة العربية',
    name: 'Bahasa Arab',
  },
  {
    arabic: 'النحو و الصرف',
    name: 'Nahwu / Sorof',
  },
  {
    arabic: 'المحفوظات',
    name: 'Mahfudzot',
  },
  {
    arabic: 'السيرة النبوية',
    name: 'Siroh Nabawiyah',
  },
  {
    arabic: 'الإملاء والخط',
    name: 'Imla dan Khot',
  },
];

const DEFAULT_PERSONALITY = [
  {
    arabic: 'السلوك',
    name: 'Kelakuan / Perilaku',
    value: '-',
  },
  {
    arabic: 'المواظبة',
    name: 'Kerajinan / Kehadiran',
    value: '-',
  },
  {
    arabic: 'النظافة',
    name: 'Kebersihan',
    value: '-',
  },
  {
    arabic: 'الانضباط',
    name: 'Disiplin',
    value: '-',
  },
];

export default function ReportPage() {
  const [studentId, setStudentId] = useState('');
  const [classFilter, setClassFilter] = useState('');

  const [students, setStudents] = useState<Student[]>([]);

  const [reportData, setReportData] =
    useState<ReportData | null>(null);

  const [loadingStudents, setLoadingStudents] =
    useState(false);

  const [loadingReport, setLoadingReport] =
    useState(false);

  const [error, setError] = useState('');

  /* =========================================================
     LOAD STUDENTS
  ========================================================= */

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoadingStudents(true);

        const res = await fetch('/api/students', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(
            'Gagal mengambil data santri.',
          );
        }

        const data = await res.json();

        const list = Array.isArray(data)
          ? data
          : data.students || data.data || [];

        if (Array.isArray(list)) {
          setStudents(list);
        }
      } catch {
        setStudents([]);
      } finally {
        setLoadingStudents(false);
      }
    }

    loadStudents();
  }, []);

  /* =========================================================
     CLASSES
  ========================================================= */

  const classes = useMemo(() => {
    const unique = Array.from(
      new Set(
        students
          .map((student) => student.class_name)
          .filter(Boolean),
      ),
    );

    return unique.sort();
  }, [students]);

  /* =========================================================
     FILTER STUDENTS
  ========================================================= */

  const filteredStudents = useMemo(() => {
    if (!classFilter) {
      return students;
    }

    return students.filter(
      (student) =>
        student.class_name === classFilter,
    );
  }, [students, classFilter]);

  /* =========================================================
     FETCH REPORT
  ========================================================= */

  const fetchReport = async (
    selectedId?: string,
  ) => {
    const id =
      selectedId !== undefined
        ? selectedId
        : studentId;

    if (!id) {
      setError(
        'Silakan pilih santri terlebih dahulu.',
      );
      return;
    }

    setLoadingReport(true);
    setError('');
    setReportData(null);

    try {
      const res = await fetch(
        `/api/report?studentId=${encodeURIComponent(
          id,
        )}`,
        {
          cache: 'no-store',
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Gagal memuat data rapor.',
        );
      }

      setReportData(data.report);
    } catch (err: any) {
      setError(
        err?.message ||
          'Gagal memuat data rapor.',
      );
    } finally {
      setLoadingReport(false);
    }
  };

  /* =========================================================
     STUDENT CHANGE
  ========================================================= */

  const handleStudentChange = (
    value: string,
  ) => {
    setStudentId(value);

    if (value) {
      fetchReport(value);
    } else {
      setReportData(null);
    }
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handlePrint = () => {
    if (!reportData) {
      return;
    }

    window.print();
  };

  /* =========================================================
     SCORE HELPER
  ========================================================= */

  const getScoreRecord = (
    subjectName: string,
    type: 'Lisan' | 'Tertulis',
  ) => {
    if (!reportData?.scoreRecords) {
      return {
        number: '-',
        text: '-',
      };
    }

    const found =
      reportData.scoreRecords.find(
        (score) =>
          score.type.toLowerCase() ===
            type.toLowerCase() &&
          score.subject?.name
            ?.toLowerCase()
            .includes(
              subjectName.toLowerCase(),
            ),
      );

    if (!found) {
      return {
        number: '-',
        text: '-',
      };
    }

    return {
      number:
        found.scoreNumber !== undefined &&
        found.scoreNumber !== null
          ? String(found.scoreNumber)
          : '-',

      text:
        found.scoreText || '-',
    };
  };

  /* =========================================================
     DATA
  ========================================================= */

  const attendance =
    reportData?.attendance || {
      sakit: 0,
      izin: 0,
      alpa: 0,
    };

  const personality =
    reportData?.personality?.length
      ? reportData.personality
      : DEFAULT_PERSONALITY;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          CONTROL PANEL
      ===================================================== */}

      <section className="control-panel print:hidden border-b border-emerald-900/10 bg-[#174d40] text-white">
        <div className="mx-auto max-w-[1500px] px-5 py-4 lg:px-8">

          {/* BRAND */}

          <div className="mb-4 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <BookOpen
                  size={20}
                  strokeWidth={1.6}
                  className="text-emerald-100"
                />
              </div>

              <div>
                <h1 className="text-[15px] font-semibold tracking-tight">
                  Rapor Santri
                </h1>

                <p className="mt-0.5 text-[10px] text-emerald-100/60">
                  Sistem Penilaian &amp; Laporan Hasil Belajar
                </p>
              </div>

            </div>

            <div className="hidden items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2 sm:flex">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

              <span className="text-[9px] text-emerald-100/60">
                Sistem Aktif
              </span>

            </div>

          </div>

          {/* FILTER */}

          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">

            <div className="grid gap-3 lg:grid-cols-[190px_minmax(0,1fr)_auto_auto]">

              {/* KELAS */}

              <div>

                <label className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.15em] text-emerald-100/50">
                  Kelas
                </label>

                <div className="relative">

                  <select
                    value={classFilter}
                    onChange={(e) => {
                      setClassFilter(
                        e.target.value,
                      );

                      setStudentId('');

                      setReportData(null);

                      setError('');
                    }}
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-3 pr-9 text-[11px] text-white outline-none focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10"
                  >

                    <option value="">
                      Semua Kelas
                    </option>

                    {classes.map((c) => (
                      <option
                        key={c}
                        value={c}
                      >
                        Kelas {c}
                      </option>
                    ))}

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40"
                  />

                </div>

              </div>

              {/* SANTRI */}

              <div>

                <label className="mb-1.5 block text-[8px] font-bold uppercase tracking-[0.15em] text-emerald-100/50">
                  Santri
                </label>

                <div className="relative">

                  <UserRound
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100/40"
                  />

                  <select
                    value={studentId}
                    onChange={(e) =>
                      handleStudentChange(
                        e.target.value,
                      )
                    }
                    disabled={
                      loadingStudents
                    }
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-9 pr-9 text-[11px] text-white outline-none focus:border-emerald-300/40 focus:ring-2 focus:ring-emerald-300/10 disabled:opacity-50"
                  >

                    <option value="">
                      {loadingStudents
                        ? 'Memuat santri...'
                        : 'Pilih santri'}
                    </option>

                    {filteredStudents.map(
                      (student) => (
                        <option
                          key={student.id}
                          value={student.id}
                        >
                          {student.fullname}
                        </option>
                      ),
                    )}

                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40"
                  />

                </div>

              </div>

              {/* PREVIEW */}

              <button
                type="button"
                onClick={() =>
                  fetchReport()
                }
                disabled={
                  loadingReport ||
                  !studentId
                }
                className="h-10 self-end rounded-lg bg-[#6b9b88] px-5 text-[10px] font-bold text-white transition hover:bg-[#78a995] disabled:cursor-not-allowed disabled:opacity-40"
              >

                {loadingReport ? (
                  <span className="flex items-center justify-center gap-2">

                    <Loader2
                      size={14}
                      className="animate-spin"
                    />

                    Memuat...

                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">

                    <Search size={14} />

                    Preview Rapor

                  </span>
                )}

              </button>

              {/* PRINT */}

              <button
                type="button"
                onClick={handlePrint}
                disabled={!reportData}
                className="h-10 self-end rounded-lg border border-amber-200/20 bg-amber-100/10 px-5 text-[10px] font-bold text-amber-100 transition hover:bg-amber-100/15 disabled:cursor-not-allowed disabled:opacity-30"
              >

                <span className="flex items-center justify-center gap-2">

                  <Printer size={14} />

                  Cetak F4 / PDF

                </span>

              </button>

            </div>

            {error && (
              <div className="mt-3 rounded-lg border border-red-200/10 bg-red-300/10 px-3 py-2 text-[10px] text-red-100">
                {error}
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!reportData &&
        !loadingReport && (
          <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f5f7f6] px-5">

            <div className="max-w-md text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm">

                <BookOpen
                  size={27}
                  strokeWidth={1.5}
                />

              </div>

              <h2 className="text-lg font-semibold tracking-tight text-slate-800">
                Pilih Santri untuk Melihat Rapor
              </h2>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                Pilih kelas dan nama santri pada panel
                di atas untuk menampilkan laporan hasil
                belajar secara lengkap.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em] text-emerald-700/50">

                <ShieldCheck size={13} />

                Dokumen Akademik Resmi

              </div>

            </div>

          </div>
        )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loadingReport && (
        <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f5f7f6]">

          <div className="text-center">

            <Loader2
              size={28}
              className="mx-auto animate-spin text-emerald-700"
            />

            <p className="mt-3 text-xs font-medium text-slate-500">
              Menyiapkan rapor santri...
            </p>

          </div>

        </div>
      )}

      {/* =====================================================
          REPORT
      ===================================================== */}

      {reportData &&
        !loadingReport && (
          <main className="report-screen min-h-screen bg-[#dfe5e2] px-3 py-8 print:bg-white print:p-0">

            <div className="report-paper relative mx-auto min-h-[330mm] w-[210mm] overflow-hidden bg-white text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] print:min-h-[330mm] print:w-[210mm] print:shadow-none">

              {/* =================================================
                  TOP LINE
              ================================================= */}

              <div className="relative z-20 h-1 bg-[#477b69]" />

              {/* =================================================
                  WATERMARK LOGO
                  
                  LOGO BESAR DI TENGAH KERTAS
                  SANGAT SAMAR
              ================================================= */}

              <div
                className="report-watermark pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >

                <img
                  src="/logo.png"
                  alt=""
                  className="h-[115mm] w-[115mm] object-contain opacity-[0.045]"
                />

              </div>

              {/* =================================================
                  PAPER CONTENT
              ================================================= */}

              <div className="report-content relative z-10 px-[14mm] py-[8mm]">

                {/* =================================================
                    HEADER RAPOR
                ================================================= */}

                <header className="border-b border-slate-200 pb-4">

                  <div className="flex items-center gap-5">

                    {/* HEADER LOGO */}

                    <div className="flex h-[23mm] w-[23mm] shrink-0 items-center justify-center">

                      <img
                        src="/logo.png"
                        alt="Logo Pondok Pesantren Terpadu Ulul Albab"
                        className="h-full w-full object-contain"
                      />

                    </div>

                    {/* SCHOOL INFO */}

                    <div className="flex-1">

                      <div
                        dir="rtl"
                        className="mb-1 text-center font-serif text-[10px] text-slate-500"
                      >
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                      </div>

                      <div className="text-center">

                        <div className="text-[8.5px] font-medium tracking-[0.16em] text-slate-500">
                          مَعْهَدُ أُولِي الْأَلْبَابِ الإِسْلَامِي
                        </div>

                        <h2 className="mt-1 text-[14px] font-bold tracking-[0.06em] text-[#315f50]">
                          PONDOK PESANTREN TERPADU
                        </h2>

                        <h3 className="text-[13px] font-bold tracking-[0.10em] text-[#315f50]">
                          ULUL ALBAB
                        </h3>

                        <p className="mt-1 text-[8px] text-slate-400">
                          Duyu Baru - Waibu - Jayapura
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-2 text-center">

                    <div className="font-serif text-[8.5px] text-slate-500">
                      السنة الدراسية : ١٤٤٨ - ١٤٤٧ هـ / ٢٠٢٦ - ٢٠٢٧ م
                    </div>

                  </div>

                </header>

                {/* =================================================
                    TITLE
                ================================================= */}

                <div className="my-4 border-y border-[#9db9ad]/60 bg-[#f4f8f6] px-3 py-2 text-center">

                  <div
                    dir="rtl"
                    className="font-serif text-[10px] font-semibold text-[#315f50]"
                  >

                    كَشْفُ دَرَجَاتِ الطَّالِبِ

                    <span className="mx-2 text-[#b29b65]">
                      •
                    </span>

                    الفصل الدراسي الأول

                  </div>

                  <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                    LAPORAN HASIL BELAJAR SANTRI
                  </div>

                  <div className="mt-0.5 text-[8px] font-medium tracking-[0.12em] text-slate-400">
                    SEMESTER GANJIL • TAHUN AJARAN 2026/2027
                  </div>

                </div>

                {/* =================================================
                    IDENTITAS
                ================================================= */}

                <section className="mb-4 rounded-lg border border-slate-200 bg-[#fafbfa]/95 p-3">

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[9px]">

                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">

                      <span className="font-semibold text-slate-500">
                        Nama Santri

                        <span
                          dir="rtl"
                          className="ml-1 font-serif"
                        >
                          / اسم الطالب
                        </span>

                      </span>

                      <span className="font-bold text-slate-900">
                        {reportData.fullname}
                      </span>

                    </div>

                    <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">

                      <span className="font-semibold text-slate-500">
                        NISN

                        <span
                          dir="rtl"
                          className="ml-1 font-serif"
                        >
                          / رقم القيد
                        </span>

                      </span>

                      <span className="font-semibold text-slate-800">
                        {reportData.nisn || '-'}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="font-semibold text-slate-500">
                        Kelas

                        <span
                          dir="rtl"
                          className="ml-1 font-serif"
                        >
                          / الفصل
                        </span>

                      </span>

                      <span className="font-bold text-[#477b69]">
                        {reportData.class_name}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="font-semibold text-slate-500">
                        Tahun Ajaran
                      </span>

                      <span className="font-semibold text-slate-800">
                        2026/2027 • Ganjil
                      </span>

                    </div>

                  </div>

                </section>

                {/* =================================================
                    LISAN
                ================================================= */}

                <ReportSection
                  number="03"
                  title="Ujian Lisan dan Praktik"
                  arabic="الامتحان الشفوي والتطبيقي"
                >

                  <table className="w-full border-collapse border border-slate-300 bg-white/95 text-[8.5px]">

                    <thead>

                      <tr className="bg-[#f1f6f3] text-center">

                        <th className="w-[8%] border border-slate-300 p-1.5">
                          No
                        </th>

                        <th
                          className="w-[22%] border border-slate-300 p-1.5 text-right"
                          dir="rtl"
                        >
                          المواد الدراسية
                        </th>

                        <th className="w-[35%] border border-slate-300 p-1.5 text-left">
                          Mata Pelajaran
                        </th>

                        <th className="w-[15%] border border-slate-300 p-1.5">
                          رقماً
                        </th>

                        <th className="w-[20%] border border-slate-300 p-1.5">
                          كتابة / Predikat
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {ORAL_SUBJECTS.map(
                        (subject, index) => {

                          const score =
                            getScoreRecord(
                              subject.name,
                              'Lisan',
                            );

                          return (
                            <tr
                              key={subject.name}
                              className="text-center"
                            >

                              <td className="border border-slate-300 bg-white/95 p-1.5 text-slate-500">
                                {index + 1}
                              </td>

                              <td
                                dir="rtl"
                                className="border border-slate-300 bg-white/95 p-1.5 text-right font-serif text-[10px]"
                              >
                                {subject.arabic}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 text-left font-medium">
                                {subject.name}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 font-bold text-[#477b69]">
                                {score.number}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 font-serif">
                                {score.text}
                              </td>

                            </tr>
                          );
                        },
                      )}

                    </tbody>

                  </table>

                </ReportSection>

                {/* =================================================
                    TERTULIS
                ================================================= */}

                <ReportSection
                  number="04"
                  title="Ujian Tertulis"
                  arabic="الامتحان التحريري"
                >

                  <table className="w-full border-collapse border border-slate-300 bg-white/95 text-[8.5px]">

                    <thead>

                      <tr className="bg-[#f1f6f3] text-center">

                        <th className="w-[8%] border border-slate-300 p-1.5">
                          No
                        </th>

                        <th
                          className="w-[22%] border border-slate-300 p-1.5 text-right"
                          dir="rtl"
                        >
                          المواد الدراسية
                        </th>

                        <th className="w-[35%] border border-slate-300 p-1.5 text-left">
                          Mata Pelajaran
                        </th>

                        <th className="w-[15%] border border-slate-300 p-1.5">
                          رقماً
                        </th>

                        <th className="w-[20%] border border-slate-300 p-1.5">
                          كتابة / Predikat
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {WRITTEN_SUBJECTS.map(
                        (subject, index) => {

                          const score =
                            getScoreRecord(
                              subject.name,
                              'Tertulis',
                            );

                          return (
                            <tr
                              key={subject.name}
                              className="text-center"
                            >

                              <td className="border border-slate-300 bg-white/95 p-1.5 text-slate-500">
                                {index + 1}
                              </td>

                              <td
                                dir="rtl"
                                className="border border-slate-300 bg-white/95 p-1.5 text-right font-serif text-[10px]"
                              >
                                {subject.arabic}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 text-left font-medium">
                                {subject.name}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 font-bold text-[#477b69]">
                                {score.number}
                              </td>

                              <td className="border border-slate-300 bg-white/95 p-1.5 font-serif">
                                {score.text}
                              </td>

                            </tr>
                          );
                        },
                      )}

                    </tbody>

                  </table>

                </ReportSection>

                {/* =================================================
                    PERSONALITY
                ================================================= */}

                <ReportSection
                  number="05"
                  title="Kepribadian Santri"
                  arabic="شخصية الطالب / الطالبة"
                >

                  <table className="w-full border-collapse border border-slate-300 bg-white/95 text-[8.5px]">

                    <thead>

                      <tr className="bg-[#f1f6f3] text-center">

                        <th className="w-[8%] border border-slate-300 p-1.5">
                          No
                        </th>

                        <th className="w-[37%] border border-slate-300 p-1.5 text-left">
                          Aspek Kepribadian
                        </th>

                        <th
                          dir="rtl"
                          className="w-[25%] border border-slate-300 p-1.5 text-right"
                        >
                          الصفة
                        </th>

                        <th className="w-[30%] border border-slate-300 p-1.5">
                          Predikat / Nilai
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {personality.map(
                        (item, index) => (
                          <tr
                            key={item.name}
                            className="text-center"
                          >

                            <td className="border border-slate-300 bg-white/95 p-1.5 text-slate-500">
                              {index + 1}
                            </td>

                            <td className="border border-slate-300 bg-white/95 p-1.5 text-left font-medium">
                              {item.name}
                            </td>

                            <td
                              dir="rtl"
                              className="border border-slate-300 bg-white/95 p-1.5 text-right font-serif text-[10px]"
                            >
                              {item.arabic}
                            </td>

                            <td className="border border-slate-300 bg-white/95 p-1.5 font-semibold text-[#477b69]">
                              {item.value}
                            </td>

                          </tr>
                        ),
                      )}

                    </tbody>

                  </table>

                </ReportSection>

                {/* =================================================
                    ATTENDANCE + NOTE
                ================================================= */}

                <div className="mb-5 grid grid-cols-2 gap-3 text-[8.5px]">

                  {/* ATTENDANCE */}

                  <div className="rounded-lg border border-slate-300 bg-white/95 p-3">

                    <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">

                      <span className="font-bold text-[#315f50]">
                        Ketidakhadiran
                      </span>

                      <span
                        dir="rtl"
                        className="font-serif text-slate-500"
                      >
                        الغياب والحضور
                      </span>

                    </div>

                    <div className="space-y-1.5">

                      <div className="flex justify-between">
                        <span>
                          Sakit / مرض
                        </span>

                        <strong>
                          {attendance.sakit} hari
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          Izin / الاستئذان
                        </span>

                        <strong>
                          {attendance.izin} hari
                        </strong>
                      </div>

                      <div className="flex justify-between">
                        <span>
                          Alpa / بلا عذر
                        </span>

                        <strong>
                          {attendance.alpa} hari
                        </strong>
                      </div>

                    </div>

                  </div>

                  {/* NOTE */}

                  <div className="rounded-lg border border-slate-300 bg-white/95 p-3">

                    <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">

                      <span className="font-bold text-[#315f50]">
                        Catatan Wali Kelas
                      </span>

                      <span
                        dir="rtl"
                        className="font-serif text-slate-500"
                      >
                        ملاحظات
                      </span>

                    </div>

                    <p className="min-h-[45px] leading-5 text-slate-700">
                      {reportData.homeroomNote ||
                        'Belum ada catatan dari wali kelas.'}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    SIGNATURE
                ================================================= */}

                <div className="border-t border-slate-300 pt-4">

                  <div className="grid grid-cols-3 gap-4 text-center text-[8.5px]">

                    {/* ORANG TUA */}

                    <div>

                      <div
                        dir="rtl"
                        className="font-serif text-[10px] font-semibold text-slate-800"
                      >
                        ولي الأمر
                      </div>

                      <div className="mt-0.5 text-slate-500">
                        Orang Tua / Wali
                      </div>

                      <div className="mt-14 font-semibold">
                        ( __________________ )
                      </div>

                    </div>

                    {/* WALI KELAS */}

                    <div>

                      <div
                        dir="rtl"
                        className="font-serif text-[10px] font-semibold text-slate-800"
                      >
                        معلم الفصل
                      </div>

                      <div className="mt-0.5 text-slate-500">
                        Wali Kelas
                      </div>

                      <div className="mt-14 font-semibold">
                        ( __________________ )
                      </div>

                    </div>

                    {/* MUDIR */}

                    <div>

                      <div className="text-slate-500">
                        Jayapura, 20 Agustus 2026
                      </div>

                      <div
                        dir="rtl"
                        className="mt-1 font-serif text-[10px] font-semibold text-slate-800"
                      >
                        مدير المعهد
                      </div>

                      <div className="mt-0.5 text-slate-500">
                        Mudir Ma'had
                      </div>

                      <div className="mt-10 font-bold text-[#315f50] underline underline-offset-2">
                        Ayub Fakhruddin
                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="mt-5 flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.18em] text-slate-300">

                  <ShieldCheck size={10} />

                  Dokumen Akademik • E-Rapor Ulul Albab

                </div>

              </div>
            </div>
          </main>
        )}

      {/* =====================================================
          PRINT STYLE
      ===================================================== */}

      <style jsx global>{`

        @page {
          size: F4 portrait;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        select option {
          background: #ffffff;
          color: #0f172a;
        }

        /* =====================================================
           SCREEN
        ===================================================== */

        .report-paper {
          position: relative;
        }

        /*
          Watermark sengaja dibuat sangat transparan.
          Nilai 0.045 = 4.5% opacity.
        */

        .report-watermark {
          opacity: 1;
        }

        .report-watermark img {
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        /*
          Semua isi rapor berada di atas watermark.
        */

        .report-content {
          position: relative;
          z-index: 10;
        }

        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

          html,
          body {
            width: 210mm !important;
            min-width: 210mm !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .report-screen {
            display: block !important;
            width: 210mm !important;
            min-height: 330mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .report-paper {
            position: relative !important;
            width: 210mm !important;
            min-width: 210mm !important;
            max-width: 210mm !important;
            min-height: 330mm !important;
            height: 330mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
            box-shadow: none !important;
          }

          /*
            WATERMARK PRINT

            Tetap berada tepat di tengah halaman.
          */

          .report-watermark {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            z-index: 0 !important;
            transform: translate(-50%, -50%) !important;
            pointer-events: none !important;
          }

          .report-watermark img {
            width: 115mm !important;
            height: 115mm !important;
            opacity: 0.045 !important;
            object-fit: contain !important;
          }

          /*
            Isi tetap berada di atas watermark.
          */

          .report-content {
            position: relative !important;
            z-index: 10 !important;
          }

          .report-paper * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /*
            Jangan biarkan elemen tertentu membuat
            halaman tambahan.
          */

          .report-paper table {
            page-break-inside: avoid !important;
          }

          .report-paper tr {
            page-break-inside: avoid !important;
          }

          .report-paper section {
            page-break-inside: avoid !important;
          }

          .report-paper header {
            page-break-inside: avoid !important;
          }

          /*
            Hilangkan bayangan saat cetak.
          */

          .report-paper {
            box-shadow: none !important;
          }

        }

        /* =====================================================
           MOBILE / SCREEN SMALL
        ===================================================== */

        @media screen and (max-width: 900px) {

          .report-screen {
            overflow-x: auto;
            justify-content: flex-start;
          }

          .report-paper {
            flex-shrink: 0;
          }

        }

      `}</style>
    </>
  );
}

/* ============================================================
   REPORT SECTION
============================================================ */

function ReportSection({
  number,
  title,
  arabic,
  children,
}: {
  number: string;
  title: string;
  arabic: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4">

      {/* SECTION HEADER */}

      <div className="flex items-center justify-between rounded-t-lg bg-[#477b69] px-3 py-1.5 text-white">

        <div className="flex items-center gap-2">

          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[7px] font-bold text-white/80">
            {number}
          </span>

          <span className="text-[9px] font-bold tracking-wide">
            {title}
          </span>

        </div>

        <span
          dir="rtl"
          className="font-serif text-[9px] text-white/75"
        >
          {arabic}
        </span>

      </div>

      {children}

    </section>
  );
}