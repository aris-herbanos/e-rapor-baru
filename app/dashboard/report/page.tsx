'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BookOpen,
  ChevronDown,
  Loader2,
  Printer,
  Search,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

/* ============================================================
   TYPES
============================================================ */

type Student = {
  id: number;
  nisn: string;
  fullname: string;
  gender: string;
  class_name: string;
};

type ScoreRecord = {
  id: number;
  score: number;
  type: string; // 'ORAL' atau 'WRITTEN'
  tpCode?: string;
  tpDescription?: string;
  subjectName: string;
};

type PersonalityRecord = {
  arabic: string;
  name: string;
  value: string;
};

type ReportData = Student & {
  scoreRecords?: ScoreRecord[];
  personality?: PersonalityRecord[];
  homeroomNote?: string | null;
  attendance?: {
    sakit: number;
    izin: number;
    alpa: number;
  };
  averageScore?: number | null;
  totalStudents?: number | null;
  rank?: number | null;
};

/* ============================================================
   SUBJECTS
============================================================ */

const ORAL_SUBJECTS = [
  { arabic: 'تجويد', name: 'Tajwid' },
  { arabic: 'تحفيظ القرآن / تحسين', name: 'Tahfidz / Tahsin' },
  { arabic: 'المراجعة', name: "Muroja'ah" },
  { arabic: 'الفقه', name: 'Fiqih' },
  { arabic: 'اللغة العربية', name: 'Bahasa Arab' },
  { arabic: 'الخطابة', name: 'Pidato' },
];

const WRITTEN_SUBJECTS = [
  { arabic: 'الحديث', name: 'Hadis' },
  { arabic: 'التربية الدينية الإسلامية', name: 'Pendidikan Agama Islam' },
  { arabic: 'الفقه', name: 'Fiqih' },
  { arabic: 'الثقافة الإسلامية', name: 'Tsaqofah Islamiyah' },
  { arabic: 'اللغة العربية', name: 'Bahasa Arab' },
  { arabic: 'النحو و الصرف', name: 'Nahwu / Sorof' },
  { arabic: 'المحفوظات', name: 'Mahfudzot' },
  { arabic: 'السيرة النبوية', name: 'Siroh Nabawiyah' },
  { arabic: 'الإملاء والخط', name: 'Imla dan Khot' },
];

const DEFAULT_PERSONALITY: PersonalityRecord[] = [
  { arabic: 'السلوك', name: 'Kelakuan / Perilaku', value: '-' },
  { arabic: 'المواظبة', name: 'Kerajinan / Kehadiran', value: '-' },
  { arabic: 'النظافة', name: 'Kebersihan', value: '-' },
  { arabic: 'الانضباط', name: 'Disiplin', value: '-' },
];

/* ============================================================
   HELPERS
============================================================ */

function normalizeText(value: unknown): string {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function subjectMatches(databaseSubject: string, requestedSubject: string) {
  const db = normalizeText(databaseSubject);
  const requested = normalizeText(requestedSubject);
  if (!db || !requested) return false;
  return db === requested || db.includes(requested) || requested.includes(db);
}

function getPredicateText(score: number): string {
  if (score >= 90) return 'Sangat Baik';
  if (score >= 80) return 'Baik';
  if (score >= 70) return 'Cukup Baik';
  if (score >= 60) return 'Cukup';
  return 'Perlu Bimbingan';
}

/* ============================================================
   PAGE
============================================================ */

export default function ReportPage() {
  const [studentId, setStudentId] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function loadStudents() {
      try {
        setLoadingStudents(true);
        setError('');
        const res = await fetch('/api/students', { cache: 'no-store' });
        if (!res.ok) throw new Error('Gagal mengambil data santri.');
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.students || data?.data || [];
        if (mounted && Array.isArray(list)) setStudents(list);
      } catch (err) {
        if (mounted) setStudents([]);
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    }
    loadStudents();
    return () => { mounted = false; };
  }, []);

  const classes = useMemo(() => {
    const unique = Array.from(new Set(students.map((s) => String(s.class_name ?? '').trim()).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!classFilter) return students;
    return students.filter((s) => String(s.class_name) === String(classFilter));
  }, [students, classFilter]);

  const fetchReport = async (selectedId?: string) => {
    const id = selectedId !== undefined ? selectedId : studentId;
    if (!id) {
      setError('Silakan pilih santri terlebih dahulu.');
      return;
    }
    setLoadingReport(true);
    setError('');
    setReportData(null);
    try {
      const res = await fetch(`/api/report?studentId=${encodeURIComponent(id)}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Gagal memuat data rapor.');
      if (!data?.report) throw new Error('Data rapor santri tidak ditemukan.');
      setReportData(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data rapor.');
    } finally {
      setLoadingReport(false);
    }
  };

  const handleStudentChange = (value: string) => {
    setStudentId(value);
    setError('');
    if (value) fetchReport(value);
    else setReportData(null);
  };

  const handleClassChange = (value: string) => {
    setClassFilter(value);
    setStudentId('');
    setReportData(null);
    setError('');
  };

  const handlePrint = () => {
    if (!reportData) return;
    window.print();
  };

  // Fungsi pencocokan nilai berdasarkan Nama Mapel DAN Kategori Ujian ('ORAL' atau 'WRITTEN')
  const getScoreRecord = (subjectName: string, categoryType: 'ORAL' | 'WRITTEN') => {
    if (!reportData?.scoreRecords?.length) return { number: '-', text: '-' };
    const found = reportData.scoreRecords.find((scoreItem) => {
      return (
        scoreItem.type === categoryType &&
        subjectMatches(scoreItem.subjectName, subjectName)
      );
    });
    if (!found) return { number: '-', text: '-' };
    return {
      number: String(found.score),
      text: getPredicateText(found.score),
    };
  };

  const attendance = reportData?.attendance ?? { sakit: 0, izin: 0, alpa: 0 };
  const personality = reportData?.personality && reportData.personality.length > 0 ? reportData.personality : DEFAULT_PERSONALITY;

  return (
    <>
      {/* CONTROL PANEL */}
      <section className="control-panel print:hidden border-b border-emerald-900/10 bg-[#174d40] text-white">
        <div className="mx-auto max-w-[1500px] px-5 py-4 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <BookOpen size={20} strokeWidth={1.6} className="text-emerald-100" />
              </div>
              <div>
                <h1 className="text-[15px] font-semibold tracking-tight">Rapor Santri</h1>
                <p className="mt-0.5 text-[10px] text-emerald-100/60">Sistem Penilaian &amp; Laporan Hasil Belajar</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <div className="grid gap-3 lg:grid-cols-[180px_minmax(0,1fr)_auto_auto]">
              <div>
                <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-emerald-100/70">Kelas</label>
                <div className="relative">
                  <select
                    value={classFilter}
                    onChange={(e) => handleClassChange(e.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-3 pr-9 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-300/10"
                  >
                    <option value="">Semua Kelas</option>
                    {classes.map((c) => (<option key={c} value={c}>Kelas {c}</option>))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[9px] font-bold uppercase tracking-wider text-emerald-100/70">Santri</label>
                <div className="relative">
                  <UserRound size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-100/40" />
                  <select
                    value={studentId}
                    onChange={(e) => handleStudentChange(e.target.value)}
                    disabled={loadingStudents}
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-9 pr-9 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-300/10 disabled:opacity-50"
                  >
                    <option value="">{loadingStudents ? 'Memuat santri...' : filteredStudents.length === 0 ? 'Tidak ada santri' : 'Pilih santri'}</option>
                    {filteredStudents.map((s) => (<option key={s.id} value={s.id}>{s.fullname}</option>))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => fetchReport()}
                disabled={loadingReport || !studentId}
                className="h-10 self-end rounded-lg bg-[#6b9b88] px-5 text-xs font-bold text-white transition hover:bg-[#78a995] disabled:opacity-40"
              >
                {loadingReport ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" />Memuat...</span> : <span className="flex items-center gap-2"><Search size={14} />Preview Rapor</span>}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                disabled={!reportData}
                className="h-10 self-end rounded-lg border border-amber-200/20 bg-amber-100/10 px-5 text-xs font-bold text-amber-100 transition hover:bg-amber-100/15 disabled:opacity-30"
              >
                <span className="flex items-center gap-2"><Printer size={14} />Cetak F4 / PDF</span>
              </button>
            </div>
            {error && <div className="mt-3 rounded-lg bg-red-300/10 px-3 py-2 text-xs text-red-100">{error}</div>}
          </div>
        </div>
      </section>

      {!reportData && !loadingReport && (
        <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f5f7f6] px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-700 shadow-sm">
              <BookOpen size={27} strokeWidth={1.5} />
            </div>
            <h2 className="text-base font-semibold tracking-tight text-slate-800">Pilih Santri untuk Melihat Rapor</h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">Pilih kelas dan nama santri pada panel di atas untuk menampilkan laporan hasil belajar secara lengkap.</p>
          </div>
        </div>
      )}

      {loadingReport && (
        <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f5f7f6]">
          <div className="text-center">
            <Loader2 size={28} className="mx-auto animate-spin text-emerald-700" />
            <p className="mt-3 text-xs font-medium text-slate-500">Menyiapkan rapor santri...</p>
          </div>
        </div>
      )}

      {reportData && !loadingReport && (
        <main className="report-screen min-h-screen bg-[#dfe5e2] px-3 py-7 print:bg-white print:p-0">
          <div className="report-paper relative mx-auto w-[215.9mm] min-h-[330.2mm] overflow-hidden bg-white text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] print:m-0 print:shadow-none">
            
            <div className="relative z-20 h-1 bg-[#477b69]" />

            <div className="report-watermark pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <img src="/logo.png" alt="" className="h-[110mm] w-[110mm] object-contain opacity-[0.045]" />
            </div>

            <div className="report-content relative z-10 px-[10mm] py-[5mm]">
              
              <header className="relative border-b border-slate-200 pb-3 text-center">
                <div className="absolute left-0 top-0 flex h-[22mm] w-[22mm] items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
                </div>

                <div className="mx-auto max-w-[520px] px-[22mm]">
                  <div dir="rtl" className="arabic mb-1 text-center text-sm font-bold text-slate-600">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.16em] text-slate-500">
                    مَعْهَدُ أُولِي الْأَلْبَابِ الإِسْلَامِي
                  </div>
                  <h2 className="mt-1 text-lg font-black tracking-tight text-[#315f50] leading-tight">
                    PONDOK PESANTREN TERPADU <br />
                    <span className="text-xl">ULIL ALBAB</span>
                  </h2>
                  <p className="mt-0.5 text-[10px] text-slate-400">Duyu Baru - Waibu - Jayapura</p>
                </div>

                <div className="mt-2.5 border-t border-slate-100 pt-1.5 text-center">
                  <div className="arabic text-sm font-semibold text-slate-600">
                    السنة الدراسية : ١٤٤٨ - ١٤٤٧ هـ / ٢٠٢٦ - ٢٠٢٧ م
                  </div>
                </div>
              </header>

              <div className="my-3 border-y border-[#9db9ad]/60 bg-[#f4f8f6] px-3 py-2 text-center">
                <div dir="rtl" className="arabic text-sm font-bold leading-6 text-[#315f50]">
                  كَشْفُ دَرَجَاتِ الطَّالِبِ <span className="mx-2 text-[#b29b65]">•</span> الفصل الدراسي الأول
                </div>
                <div className="text-xs font-bold uppercase tracking-wide text-slate-800">
                  LAPORAN HASIL BELAJAR SANTRI
                </div>
                <div className="text-[8.5px] font-medium tracking-[0.12em] text-slate-500">
                  SEMESTER GANJIL • TAHUN AJARAN 2026/2027
                </div>
              </div>

              <section className="mb-3 rounded-lg border border-slate-200 bg-[#fafbfa]/95 p-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                    <span className="font-semibold text-slate-600">
                      Nama Santri <span dir="rtl" className="arabic ml-1 text-sm font-semibold">/ اسم الطالب</span>
                    </span>
                    <span className="max-w-[55%] truncate font-bold text-slate-900">{reportData.fullname}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                    <span className="font-semibold text-slate-600">
                      NISN <span dir="rtl" className="arabic ml-1 text-sm font-semibold">/ رقم القيد</span>
                    </span>
                    <span className="font-semibold text-slate-800">{reportData.nisn || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">
                      Kelas <span dir="rtl" className="arabic ml-1 text-sm font-semibold">/ الفصل</span>
                    </span>
                    <span className="font-bold text-[#477b69]">{reportData.class_name || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-600">Tahun Ajaran</span>
                    <span className="font-semibold text-slate-800">2026/2027 • Ganjil</span>
                  </div>
                </div>
              </section>

              {/* LISAN */}
              <ReportSection number="03" title="Ujian Lisan dan Praktik" arabic="الامتحان الشفوي والتطبيقي">
                <table className="report-table w-full table-fixed border-collapse border border-slate-300 bg-white/95 text-xs">
                  <thead>
                    <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                      <th className="w-[7%] border border-slate-300 px-1.5 py-1.5">No</th>
                      <th className="w-[26%] border border-slate-300 px-1.5 py-1.5 text-right" dir="rtl">
                        <span className="arabic text-sm font-bold">المواد الدراسية</span>
                      </th>
                      <th className="w-[33%] border border-slate-300 px-1.5 py-1.5 text-left">Mata Pelajaran</th>
                      <th className="w-[14%] border border-slate-300 px-1.5 py-1.5"><span className="arabic text-sm font-bold">رقماً</span></th>
                      <th className="w-[20%] border border-slate-300 px-1.5 py-1.5">Predikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORAL_SUBJECTS.map((subject, index) => {
                      const score = getScoreRecord(subject.name, 'ORAL');
                      return (
                        <tr key={subject.name} className="text-center">
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-slate-500">{index + 1}</td>
                          <td dir="rtl" className="arabic border border-slate-300 bg-white/95 px-1.5 py-1.5 text-right text-base font-semibold leading-6">{subject.arabic}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-left font-medium">{subject.name}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 font-bold text-[#477b69]">{score.number}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 font-medium">{score.text}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ReportSection>

              {/* TERTULIS */}
              <ReportSection number="04" title="Ujian Tertulis" arabic="الامتحان التحريري">
                <table className="report-table w-full table-fixed border-collapse border border-slate-300 bg-white/95 text-xs">
                  <thead>
                    <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                      <th className="w-[7%] border border-slate-300 px-1.5 py-1.5">No</th>
                      <th className="w-[26%] border border-slate-300 px-1.5 py-1.5 text-right" dir="rtl">
                        <span className="arabic text-sm font-bold">المواد الدراسية</span>
                      </th>
                      <th className="w-[33%] border border-slate-300 px-1.5 py-1.5 text-left">Mata Pelajaran</th>
                      <th className="w-[14%] border border-slate-300 px-1.5 py-1.5"><span className="arabic text-sm font-bold">رقماً</span></th>
                      <th className="w-[20%] border border-slate-300 px-1.5 py-1.5">Predikat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WRITTEN_SUBJECTS.map((subject, index) => {
                      const score = getScoreRecord(subject.name, 'WRITTEN');
                      return (
                        <tr key={subject.name} className="text-center">
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-slate-500">{index + 1}</td>
                          <td dir="rtl" className="arabic border border-slate-300 bg-white/95 px-1.5 py-1.5 text-right text-base font-semibold leading-6">{subject.arabic}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-left font-medium">{subject.name}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 font-bold text-[#477b69]">{score.number}</td>
                          <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 font-medium">{score.text}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ReportSection>

              {/* KEPRIBADIAN */}
              <ReportSection number="05" title="Kepribadian Santri" arabic="شخصية الطالب / الطالبة">
                <table className="report-table w-full table-fixed border-collapse border border-slate-300 bg-white/95 text-xs">
                  <thead>
                    <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                      <th className="w-[7%] border border-slate-300 px-1.5 py-1.5">No</th>
                      <th className="w-[38%] border border-slate-300 px-1.5 py-1.5 text-left">Aspek Kepribadian</th>
                      <th dir="rtl" className="w-[25%] border border-slate-300 px-1.5 py-1.5 text-right">
                        <span className="arabic text-sm font-bold">الصفة</span>
                      </th>
                      <th className="w-[30%] border border-slate-300 px-1.5 py-1.5">Predikat / Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personality.map((item, index) => (
                      <tr key={`${item.name}-${index}`} className="text-center">
                        <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-slate-500">{index + 1}</td>
                        <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 text-left font-medium">{item.name}</td>
                        <td dir="rtl" className="arabic border border-slate-300 bg-white/95 px-1.5 py-1.5 text-right text-base font-semibold leading-6">{item.arabic}</td>
                        <td className="border border-slate-300 bg-white/95 px-1.5 py-1.5 font-semibold text-[#477b69]">{item.value || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ReportSection>

              {/* ATTENDANCE + NOTE */}
              <div className="mb-3 grid grid-cols-[1fr_1.6fr] gap-3 text-xs">
                <div className="rounded-lg border border-slate-300 bg-white/95 p-3">
                  <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-[#315f50]">Ketidakhadiran</span>
                    <span dir="rtl" className="arabic text-sm font-bold text-slate-600">الغياب والحضور</span>
                  </div>
                  <div className="space-y-1.5 leading-5">
                    <div className="flex justify-between"><span>Sakit / مرض</span><strong>{attendance.sakit} hari</strong></div>
                    <div className="flex justify-between"><span>Izin / الاستئذان</span><strong>{attendance.izin} hari</strong></div>
                    <div className="flex justify-between"><span>Alpa / بلا عذر</span><strong>{attendance.alpa} hari</strong></div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-300 bg-white/95 p-3">
                  <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="font-bold text-[#315f50]">Catatan Wali Kelas</span>
                    <span dir="rtl" className="arabic text-sm font-bold text-slate-600">ملاحظات</span>
                  </div>
                  <p className="min-h-[45px] text-xs leading-5 text-slate-700">
                    {reportData.homeroomNote || 'Belum ada catatan dari wali kelas.'}
                  </p>
                </div>
              </div>

              {/* SIGNATURE */}
              <div className="border-t border-slate-300 pt-3">
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div dir="rtl" className="arabic text-base font-bold text-slate-800">ولي الأمر</div>
                    <div className="mt-0.5 text-slate-500">Orang Tua / Wali</div>
                    <div className="mt-10 font-semibold">( __________________ )</div>
                  </div>
                  <div>
                    <div dir="rtl" className="arabic text-base font-bold text-slate-800">معلم الفصل</div>
                    <div className="mt-0.5 text-slate-500">Wali Kelas</div>
                    <div className="mt-10 font-semibold">( __________________ )</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Jayapura, 20 Agustus 2026</div>
                    <div dir="rtl" className="arabic mt-0.5 text-base font-bold text-slate-800">مدير المعهد</div>
                    <div className="mt-0.5 text-slate-500">Mudir Ma'had</div>
                    <div className="mt-8 font-bold text-[#315f50] underline underline-offset-2">Ayub Fakhruddin</div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.18em] text-slate-400">
                <ShieldCheck size={10} />
                Dokumen Akademik • E-Rapor Ulil Albab
              </div>

            </div>
          </div>
        </main>
      )}

      <style jsx global>{`
        @font-face {
          font-family: 'Traditional Arabic';
          src: local('Traditional Arabic');
          font-style: normal;
          font-weight: normal;
        }
        .arabic {
          font-family: 'Traditional Arabic', 'Amiri', 'Noto Naskh Arabic', 'Times New Roman', serif;
          font-weight: normal;
        }
        @page {
          size: F4 portrait;
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          background: #f5f7f6;
        }
        select option {
          background: #ffffff;
          color: #0f172a;
        }
        .report-table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
        }
        .report-table th, .report-table td {
          vertical-align: middle;
        }
        @media print {
          .control-panel, .print\\:hidden {
            display: none !important;
          }
          body, .report-screen {
            background: white !important;
            width: 215.9mm !important;
            min-height: 330.2mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .report-paper {
            width: 215.9mm !important;
            height: 330.2mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
}

function ReportSection({ number, title, arabic, children }: { number: string; title: string; arabic: string; children: ReactNode }) {
  return (
    <section className="mb-3">
      <div className="flex items-center justify-between rounded-t-lg bg-[#477b69] px-3 py-1.5 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[9px] font-bold text-white">
            {number}
          </span>
          <span className="text-xs font-bold tracking-wide">{title}</span>
        </div>
        <span dir="rtl" className="arabic text-sm font-semibold leading-5 text-white/95">{arabic}</span>
      </div>
      {children}
    </section>
  );
}