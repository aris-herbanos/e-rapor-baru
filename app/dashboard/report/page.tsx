'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BookOpen,
  ChevronDown,
  Loader2,
  Printer,
  ShieldCheck,
  UserRound,
  RefreshCw,
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
  score: number | string | null;
  type: string;
  tpCode?: string | null;
  tpDescription?: string | null;
  subjectName: string;
};

type PersonalityRecord = {
  arabic: string;
  name: string;
  value: string | null;
};

type Attendance = {
  sakit: number;
  izin: number;
  alpa: number;
};

type ReportSettings = {
  schoolName?: string;
  academicYear?: string;
  semester?: string;
  principalName?: string;
};

type ReportData = Student & {
  schoolName?: string;
  academicYear?: string;
  semester?: string;
  principalName?: string;
  settings?: ReportSettings;
  scoreRecords?: ScoreRecord[];
  personality?: PersonalityRecord[];
  homeroomNote?: string | null;
  attendance?: Attendance | null;
  averageScore?: number | null;
  totalStudents?: number | null;
  rank?: number | null;
};

/* ============================================================
   SUBJECTS & PERSONALITY (DIPISAH SMP & SMA)
============================================================ */

const ORAL_SUBJECTS_SMP = [
  { arabic: 'تجويد', name: 'Tajwid' },
  { arabic: 'تحفيظ القرآن / تحسين', name: 'Tahfidz / Tahsin' },
  { arabic: 'المراجعة', name: "Muroja'ah" },
  { arabic: 'الفقه', name: 'Fiqih' },
  { arabic: 'اللغة العربية', name: 'Bahasa Arab' },
  { arabic: 'الخطابة', name: 'Pidato' },
];

const WRITTEN_SUBJECTS_SMP = [
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

const ORAL_SUBJECTS_SMA = [
  { arabic: 'تجويد', name: 'Tajwid' },
  { arabic: 'تحفيظ القرآن / تحسين', name: 'Tahfidz / Tahsin' },
  { arabic: 'المراجعة المتقدمة', name: 'Muroja’ah Lanjutan' },
  { arabic: 'الفقه المقارن', name: 'Fiqih Muqoron' },
  { arabic: 'محادثة', name: 'Muhadatsah' },
  { arabic: 'الخطابة والمناظرة', name: 'Pidato & Debat' },
];

const WRITTEN_SUBJECTS_SMA = [
  { arabic: 'علوم القرآن', name: 'Ulumul Quran' },
  { arabic: 'مصطلح الحديث', name: 'Mustholah Hadis' },
  { arabic: 'أصول الفقه', name: 'Ushul Fiqih' },
  { arabic: 'التاريخ الإسلامي', name: 'Tarikh Islam' },
  { arabic: 'البلاغة والأدب', name: 'Balaghoh & Adab' },
  { arabic: 'النحو والصرف المتقدم', name: 'Nahwu & Sorof Lanjutan' },
  { arabic: 'التوحيد والعقيدة', name: 'Tauhid & Aqidah' },
];

const PERSONALITY_ASPECTS = [
  { arabic: 'السلوك', name: 'Kelakuan / Perilaku' },
  { arabic: 'المواظبة', name: 'Kerajinan / Kehadiran' },
  { arabic: 'النظافة', name: 'Kebersihan' },
  { arabic: 'الانضباط', name: 'Disiplin' },
];

/* ============================================================
   HELPERS
============================================================ */

function normalizeText(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, ' ');
}

function normalizeScore(value: unknown): number {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return 0;
  return Math.round(numberValue);
}

function normalizeType(value: unknown): string {
  return normalizeText(value)
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ');
}

function typeMatches(databaseType: unknown, requestedType: 'ORAL' | 'WRITTEN'): boolean {
  const type = normalizeType(databaseType);

  if (requestedType === 'ORAL') {
    return ['oral', 'lisan', 'ujian lisan', 'praktik', 'praktek'].some(
      (item) => type === item || type.includes(item)
    );
  }

  return ['written', 'tertulis', 'ujian tertulis', 'tulis'].some(
    (item) => type === item || type.includes(item)
  );
}

function subjectMatches(databaseSubject: unknown, requestedSubject: unknown): boolean {
  const db = normalizeText(databaseSubject);
  const requested = normalizeText(requestedSubject);

  if (!db || !requested) return false;
  if (db === requested || db.includes(requested) || requested.includes(db)) return true;

  const aliases: Record<string, string[]> = {
    tajwid: ['ilmu tajwid'],
    'tahfidz / tahsin': ['tahfidz', 'tahsin', 'tahfidz al quran', 'tahfiz', 'tahfizh'],
    "muroja'ah": ['murojaah', "muroja'ah", 'murajaah', "muraja'ah"],
    fiqih: ['fikih', 'fiqh', 'fiqih islam'],
    hadis: ['hadits', 'al hadits', 'al hadis'],
    'bahasa arab': ['arab', 'bahasa arab'],
    'nahwu / sorof': ['nahwu', 'shorof', 'sorof', 'nahwu sorof', 'nahwu sharaf'],
    mahfudzot: ['mahfuzhat', 'mahfuzot', 'mahfudzat'],
    'siroh nabawiyah': ['sirah nabawiyah', 'siroh', 'sejarah nabi'],
    'imla dan khot': ['imla', 'imla dan khat', 'khot', 'khat'],
  };

  const requestedAliases = aliases[requested] ?? [];
  return requestedAliases.some(
    (alias) => db === alias || db.includes(alias) || alias.includes(db)
  );
}

function isSMALevel(className: string): boolean {
  const raw = normalizeText(className);
  const compact = raw.replace(/^kelas\s+/, '').trim();

  if (/(^|\D)(10|11|12)(\D|$)/.test(compact)) return true;
  if (compact.includes('sma') || compact.includes('ulya')) return true;

  const tokens = compact.split(/[^a-z0-9]+/).filter(Boolean);
  return tokens.some((token) => ['x', 'xi', 'xii'].includes(token));
}

function getPersonalityValue(
  personality: PersonalityRecord[] | undefined,
  aspectName: string,
  aspectArabic: string
): string {
  if (!personality || personality.length === 0) return '-';

  const found = personality.find((item) => {
    const itemName = normalizeText(item.name);
    const itemArabic = normalizeText(item.arabic);
    const targetName = normalizeText(aspectName);
    const targetArabic = normalizeText(aspectArabic);

    return (
      itemName === targetName ||
      itemArabic === targetArabic ||
      itemName.includes(targetName) ||
      targetName.includes(itemName)
    );
  });

  if (!found || !found.value || !String(found.value).trim()) return '-';
  return String(found.value).trim();
}

function getMerdekaCompetencyDescriptions(subjectName: string, score: number) {
  if (score <= 0) {
    return {
      achieved: `Kompetensi pada mata pelajaran ${subjectName} belum memiliki nilai.`,
      needsImprovement: `Nilai perlu dilengkapi dan peserta didik perlu mendapatkan tindak lanjut pembelajaran pada mata pelajaran ${subjectName}.`,
    };
  }

  if (score >= 90) {
    return {
      achieved: `Peserta didik menunjukkan penguasaan kompetensi pada mata pelajaran ${subjectName} dengan sangat baik serta mampu menerapkan materi secara mandiri.`,
      needsImprovement: `Pertahankan konsistensi belajar dan kembangkan kemampuan pada materi ${subjectName} ke tingkat yang lebih mendalam.`,
    };
  }

  if (score >= 85) {
    return {
      achieved: `Peserta didik mampu memahami dan menguasai materi esensial pada mata pelajaran ${subjectName} dengan sangat baik.`,
      needsImprovement: `Pertahankan konsistensi belajar dan tingkatkan eksplorasi terhadap materi ${subjectName}.`,
    };
  }

  if (score >= 75) {
    return {
      achieved: `Peserta didik telah mencapai kompetensi dasar dalam memahami konsep dan menyelesaikan pembelajaran pada mata pelajaran ${subjectName}.`,
      needsImprovement: `Perlu peningkatan pada pendalaman materi, ketelitian, dan penerapan konsep ${subjectName}.`,
    };
  }

  return {
    achieved: `Peserta didik mulai menunjukkan perkembangan dalam memahami materi dasar pada mata pelajaran ${subjectName}.`,
    needsImprovement: `Perlu bimbingan dan latihan yang lebih teratur untuk meningkatkan pemahaman konsep ${subjectName}.`,
  };
}

function getPersonalityMerdekaDescription(aspectName: string, value: string) {
  const val = normalizeText(value);

  if (!val || val === '-') {
    return {
      achieved: `Aspek ${aspectName} belum diisi predikat penilaiannya.`,
      needsImprovement: `Mohon wali kelas untuk melengkapi penilaian pada aspek ${aspectName} sesuai perkembangan santri.`,
    };
  }

  if (val.includes('sangat baik') || val.includes('mumtaz')) {
    return {
      achieved: `Peserta didik menunjukkan sikap ${aspectName.toLowerCase()} yang sangat terpuji, konsisten menjadi teladan yang baik di lingkungan ma'had.`,
      needsImprovement: `Pertahankan keteladanan yang sangat baik ini dan teruskan pembiasaan positif dalam keseharian.`,
    };
  } else if (val.includes('baik') || val.includes('jayyid')) {
    return {
      achieved: `Peserta didik menunjukkan sikap ${aspectName.toLowerCase()} yang baik serta dapat mematuhi tata tertib dan norma yang berlaku di pondok pesantren.`,
      needsImprovement: `Pertahankan kedisiplinan dan terus tingkatkan konsistensi sikap terpuji dalam kehidupan sehari-hari.`,
    };
  } else {
    return {
      achieved: `Peserta didik menunjukkan predikat ${value} pada aspek ${aspectName} dalam keseharian di lingkungan pondok pesantren.`,
      needsImprovement: `Perlu bimbingan lanjutan dan pengawasan intensif dalam pembentukan karakter ${aspectName.toLowerCase()}.`,
    };
  }
}

function ReportSection({
  number,
  title,
  arabic,
  children,
}: {
  number: string;
  title: string;
  arabic: string;
  children: ReactNode;
}) {
  return (
    <section className="report-block mx-[10mm] mb-3">
      <div className="mb-1 flex items-center justify-between border-b-2 border-[#315f50] pb-1">
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-[#315f50] text-[8px] font-bold text-white">
            {number}
          </span>
          <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-800">
            {title}
          </h3>
        </div>
        <div dir="rtl" className="arabic text-[11px] font-semibold text-slate-600">
          {arabic}
        </div>
      </div>
      {children}
    </section>
  );
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

        const response = await fetch('/api/students', { cache: 'no-store' });
        if (!response.ok) throw new Error('Gagal mengambil data santri.');

        const data = await response.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.students)
          ? data.students
          : Array.isArray(data?.data)
          ? data.data
          : [];

        if (mounted) setStudents(list);
      } catch (err) {
        if (mounted) {
          setStudents([]);
          setError(err instanceof Error ? err.message : 'Gagal mengambil data santri.');
        }
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    }

    loadStudents();

    return () => {
      mounted = false;
    };
  }, []);

  const classes = useMemo(() => {
    const unique = Array.from(
      new Set(
        students
          .map((student) => String(student.class_name ?? '').trim())
          .filter(Boolean)
      )
    );

    return unique.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!classFilter) return students;
    return students.filter((student) => String(student.class_name) === String(classFilter));
  }, [students, classFilter]);

  const fetchReport = async (selectedId?: string) => {
    const id = selectedId !== undefined ? selectedId : studentId;

    if (!id) {
      setError('Silakan pilih santri terlebih dahulu.');
      return;
    }

    try {
      setLoadingReport(true);
      setError('');

      const response = await fetch(
        `/api/report?studentId=${encodeURIComponent(id)}&_=${Date.now()}`,
        {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Gagal memuat data rapor.');
      }

      if (!data?.report) {
        throw new Error('Data rapor santri tidak ditemukan.');
      }

      setReportData(data.report);
    } catch (err) {
      setReportData(null);
      setError(err instanceof Error ? err.message : 'Gagal memuat data rapor.');
    } finally {
      setLoadingReport(false);
    }
  };

  const handleStudentChange = (value: string) => {
    setStudentId(value);
    setError('');
    if (!value) {
      setReportData(null);
      return;
    }
    fetchReport(value);
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

  const getScoreNumber = (subjectName: string, categoryType: 'ORAL' | 'WRITTEN'): number => {
    if (!reportData?.scoreRecords || reportData.scoreRecords.length === 0) return 0;

    const found = reportData.scoreRecords.find(
      (scoreItem) =>
        typeMatches(scoreItem.type, categoryType) &&
        subjectMatches(scoreItem.subjectName, subjectName)
    );

    return normalizeScore(found?.score);
  };

  const attendance: Attendance = reportData?.attendance ?? { sakit: 0, izin: 0, alpa: 0 };
  const personality = reportData?.personality ?? [];

  const isSMA = reportData ? isSMALevel(reportData.class_name) : false;
  const activeOralSubjects = isSMA ? ORAL_SUBJECTS_SMA : ORAL_SUBJECTS_SMP;
  const activeWrittenSubjects = isSMA ? WRITTEN_SUBJECTS_SMA : WRITTEN_SUBJECTS_SMP;

  const schoolName =
    reportData?.schoolName ||
    reportData?.settings?.schoolName ||
    'Pondok Pesantren Terpadu Ulil Albab';

  const academicYear =
    reportData?.academicYear ||
    reportData?.settings?.academicYear ||
    '2026/2027';

  const semester =
    reportData?.semester ||
    reportData?.settings?.semester ||
    'Ganjil';

  const principalName =
    reportData?.principalName ||
    reportData?.settings?.principalName ||
    'Pimpinan Pesantren';

  const normalizedSemester = normalizeText(semester);
  const isEvenSemester =
    normalizedSemester === 'genap' ||
    normalizedSemester === '2' ||
    normalizedSemester.includes('semester 2');

  const semesterLabel = isEvenSemester ? 'Genap' : 'Ganjil';
  const semesterArabic = isEvenSemester
    ? 'الفصل الدراسي الثاني'
    : 'الفصل الدراسي الأول';

  const formattedPrintDate = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

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
                <p className="mt-0.5 text-[10px] text-emerald-100/60">Sistem Penilaian &amp; Kurikulum Merdeka (Otomatis Tingkat SMP / SMA)</p>
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
                    onChange={(event) => handleClassChange(event.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-3 pr-9 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-300/10"
                  >
                    <option value="">Semua Kelas</option>
                    {classes.map((className) => (
                      <option key={className} value={className}>Kelas {className}</option>
                    ))}
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
                    onChange={(event) => handleStudentChange(event.target.value)}
                    disabled={loadingStudents}
                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0f4035] px-9 pr-9 text-xs text-white outline-none focus:ring-2 focus:ring-emerald-300/10 disabled:opacity-50"
                  >
                    <option value="">
                      {loadingStudents ? 'Memuat santri...' : filteredStudents.length === 0 ? 'Tidak ada santri' : 'Pilih santri'}
                    </option>
                    {filteredStudents.map((student) => (
                      <option key={student.id} value={student.id}>{student.fullname}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/40" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => fetchReport()}
                disabled={loadingReport || !studentId}
                className="h-10 self-end rounded-lg bg-[#6b9b88] px-5 text-xs font-bold text-white transition hover:bg-[#78a995] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loadingReport ? (
                  <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" />Memuat...</span>
                ) : (
                  <span className="flex items-center gap-2"><RefreshCw size={14} />Muat Ulang</span>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                disabled={!reportData}
                className="h-10 self-end rounded-lg border border-amber-200/20 bg-amber-100/10 px-5 text-xs font-bold text-amber-100 transition hover:bg-amber-100/15 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span className="flex items-center gap-2"><Printer size={14} />Cetak F4 / PDF</span>
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-lg border border-red-200/10 bg-red-300/10 px-3 py-2 text-xs text-red-100">{error}</div>
            )}
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
        <main className="report-screen bg-[#dfe5e2] px-3 py-6 print:bg-white print:p-0">
          <div className="report-document mx-auto w-[215.9mm] bg-white text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.14)] print:w-[215.9mm] print:shadow-none">
            
            {/* HEADER */}
            <header className="report-header relative border-b border-slate-200 px-[10mm] pb-2.5 pt-[4mm] text-center">
              <div className="absolute left-[10mm] top-[4mm] flex h-[19mm] w-[19mm] items-center justify-center">
                <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <div className="mx-auto max-w-[520px] px-[18mm]">
                <div dir="rtl" className="arabic mb-0.5 text-[13px] font-bold text-slate-600">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                <div className="text-[8px] font-bold tracking-[0.15em] text-slate-500">مَعْهَدُ أُولِي الْأَلْبَابِ الإِسْلَامِي</div>
                <h2 className="mt-0.5 text-[17px] font-black leading-tight tracking-tight text-[#315f50]">
                  {schoolName}
                </h2>
                <p className="mt-0.5 text-[8px] text-slate-400">Duyu Baru - Waibu - Jayapura</p>
              </div>
              <div className="mt-1.5 border-t border-slate-100 pt-1 text-center">
                <div className="arabic text-[11px] font-semibold text-slate-600">السنة الدراسية / Tahun Ajaran: {academicYear}</div>
              </div>
            </header>

            {/* TITLE */}
            <div className="report-block mx-[10mm] my-2.5 border-y border-[#9db9ad]/60 bg-[#f4f8f6] px-3 py-1.5 text-center">
              <div dir="rtl" className="arabic text-[12px] font-bold leading-5 text-[#315f50]">
                كَشْفُ دَرَجَاتِ الطَّالِبِ <span className="mx-2 text-[#b29b65]">•</span> {semesterArabic}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-800">
                LAPORAN HASIL BELAJAR SANTRI TINGKAT {isSMA ? 'SMA' : 'SMP'}
              </div>
              <div className="text-[7.5px] font-medium tracking-[0.12em] text-slate-500">SEMESTER {semesterLabel.toUpperCase()} • TAHUN AJARAN {academicYear}</div>
            </div>

            {/* STUDENT INFO */}
            <section className="report-block mx-[10mm] mb-2.5 rounded-lg border border-slate-200 bg-[#fafbfa] p-2.5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[10px]">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">
                  <span className="font-semibold text-slate-600">Nama Santri <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">/ اسم الطالب</span></span>
                  <span className="max-w-[55%] truncate font-bold text-slate-900">{reportData.fullname}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">
                  <span className="font-semibold text-slate-600">NISN <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">/ رقم القيد</span></span>
                  <span className="font-semibold text-slate-800">{reportData.nisn || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Kelas <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">/ الفصل</span></span>
                  <span className="font-bold text-[#477b69]">{reportData.class_name || '-'} (Tingkat {isSMA ? 'SMA' : 'SMP'})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Tahun Ajaran</span>
                  <span className="font-semibold text-slate-800">{academicYear} • {semesterLabel}</span>
                </div>
              </div>
            </section>

            {/* UJIAN LISAN */}
            <ReportSection number="03" title="Ujian Lisan dan Praktik" arabic="الامتحان الشفوي والتطبيقي">
              <table className="report-table w-full border-collapse border border-slate-300 bg-white text-[9.5px]">
                <thead>
                  <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                    <th className="w-[6%] border border-slate-300 py-1.5">No</th>
                    <th className="w-[27%] border border-slate-300 py-1.5 text-center">Mata Pelajaran / المواد</th>
                    <th className="w-[12%] border border-slate-300 py-1.5">Nilai Akhir</th>
                    <th className="w-[55%] border border-slate-300 px-2.5 py-1.5 text-left">Capaian Kompetensi</th>
                  </tr>
                </thead>
                <tbody>
                  {activeOralSubjects.map((subject, index) => {
                    const score = getScoreNumber(subject.name, 'ORAL');
                    const description = getMerdekaCompetencyDescriptions(subject.name, score);
                    return (
                      <tr key={`oral-${subject.name}`} className="report-row">
                        <td className="border border-slate-300 py-1.5 text-center align-top text-slate-500">{index + 1}</td>
                        <td className="border border-slate-300 px-2 py-1.5 text-center align-top">
                          <div className="font-medium leading-tight text-slate-800">{subject.name}</div>
                          <div dir="rtl" className="arabic mt-0.5 text-[10.5px] font-semibold leading-tight text-slate-500">{subject.arabic}</div>
                        </td>
                        <td className="border border-slate-300 py-1.5 text-center align-top font-bold text-[#477b69]">{score > 0 ? score : '-'}</td>
                        <td className="border border-slate-300 px-2.5 py-1.5 align-top leading-[1.3] text-slate-700">
                          <div>{description.achieved}</div>
                          <div className="mt-0.5 text-[8.5px] leading-[1.3] text-slate-500">{description.needsImprovement}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ReportSection>

            {/* UJIAN TERTULIS */}
            <ReportSection number="04" title="Ujian Tertulis" arabic="الامتحان التحريري">
              <table className="report-table w-full border-collapse border border-slate-300 bg-white text-[9px]">
                <thead>
                  <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                    <th className="w-[6%] border border-slate-300 py-1.5">No</th>
                    <th className="w-[27%] border border-slate-300 py-1.5 text-center">Mata Pelajaran / المواد</th>
                    <th className="w-[12%] border border-slate-300 py-1.5">Nilai Akhir</th>
                    <th className="w-[55%] border border-slate-300 px-2.5 py-1.5 text-left">Capaian Kompetensi</th>
                  </tr>
                </thead>
                <tbody>
                  {activeWrittenSubjects.map((subject, index) => {
                    const score = getScoreNumber(subject.name, 'WRITTEN');
                    const description = getMerdekaCompetencyDescriptions(subject.name, score);
                    return (
                      <tr key={`written-${subject.name}`} className="report-row">
                        <td className="border border-slate-300 py-1 text-center align-top text-slate-500">{index + 1}</td>
                        <td className="border border-slate-300 px-1.5 py-1 text-center align-top">
                          <div className="font-medium leading-tight text-slate-800">{subject.name}</div>
                          <div dir="rtl" className="arabic mt-0.5 text-[9.5px] font-semibold leading-tight text-slate-500">{subject.arabic}</div>
                        </td>
                        <td className="border border-slate-300 py-1 text-center align-top font-bold text-[#477b69]">{score > 0 ? score : '-'}</td>
                        <td className="border border-slate-300 px-2.5 py-1 align-top leading-[1.25] text-slate-700">
                          <div>{description.achieved}</div>
                          <div className="mt-0.5 text-[8px] leading-[1.25] text-slate-500">{description.needsImprovement}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ReportSection>

            {/* KEPRIBADIAN SANTRI */}
            <ReportSection number="05" title="Kepribadian Santri" arabic="شخصية الطالب / الطالبة">
              <table className="report-table w-full border-collapse border border-slate-300 bg-white text-[9px]">
                <thead>
                  <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                    <th className="w-[6%] border border-slate-300 py-1.5">No</th>
                    <th className="w-[27%] border border-slate-300 py-1.5 text-center">Aspek / الصفة</th>
                    <th className="w-[12%] border border-slate-300 py-1.5">Predikat</th>
                    <th className="w-[55%] border border-slate-300 px-2.5 py-1.5 text-left">Capaian Kompetensi</th>
                  </tr>
                </thead>
                <tbody>
                  {PERSONALITY_ASPECTS.map((item, index) => {
                    const value = getPersonalityValue(personality, item.name, item.arabic);
                    const desc = getPersonalityMerdekaDescription(item.name, value);
                    return (
                      <tr key={`personality-${item.name}`} className="report-row">
                        <td className="border border-slate-300 py-1 text-center align-top text-slate-500">{index + 1}</td>
                        <td className="border border-slate-300 px-1.5 py-1 text-center align-top">
                          <div className="font-medium leading-tight text-slate-800">{item.name}</div>
                          <div dir="rtl" className="arabic mt-0.5 text-[9.5px] font-semibold leading-tight text-slate-500">{item.arabic}</div>
                        </td>
                        <td className={`border border-slate-300 py-1 text-center align-top font-bold ${value === '-' ? 'text-slate-400' : 'text-[#477b69]'}`}>{value}</td>
                        <td className="border border-slate-300 px-2.5 py-1 align-top leading-[1.25] text-slate-700">
                          <div>{desc.achieved}</div>
                          <div className="mt-0.5 text-[8px] leading-[1.25] text-slate-500">{desc.needsImprovement}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </ReportSection>

            {/* KEHADIRAN & CATATAN WALI KELAS */}
            <div className="mx-[10mm] mb-4 grid grid-cols-2 gap-3">
              <section className="report-block">
                <div className="mb-1 flex items-center justify-between border-b-2 border-[#315f50] pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-800">Ketidakhadiran</span>
                  <span dir="rtl" className="arabic text-[10px] font-semibold text-slate-600">الغياب</span>
                </div>
                <table className="w-full border-collapse border border-slate-300 bg-white text-[9.5px]">
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">Sakit (مرض)</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">{attendance.sakit} hari</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">Izin (إذن)</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">{attendance.izin} hari</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">Alpa / Tanpa Keterangan (غائب)</td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">{attendance.alpa} hari</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="report-block">
                <div className="mb-1 flex items-center justify-between border-b-2 border-[#315f50] pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-800">Catatan Wali Kelas</span>
                  <span dir="rtl" className="arabic text-[10px] font-semibold text-slate-600">ملاحظات مربي الفصل</span>
                </div>
                <div className="h-[74px] rounded border border-slate-300 bg-white p-2 text-[9px] leading-relaxed text-slate-700 overflow-y-auto">
                  {reportData.homeroomNote ? (
                    reportData.homeroomNote
                  ) : (
                    <span className="italic text-slate-400">Terus tingkatkan prestasi belajar dan jaga kedisiplinan selama berada di lingkungan pondok pesantren.</span>
                  )}
                </div>
              </section>
            </div>

            {/* TANDA TANGAN */}
            <section className="report-block mx-[10mm] pb-6 text-[9.5px]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="mb-1 text-slate-600">Mengetahui,</div>
                  <div className="font-bold text-slate-800">Orang Tua / Wali Murid</div>
                  <div className="h-14"></div>
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">( ........................................ )</div>
                </div>

                <div>
                  <div className="mb-1 text-slate-600">Wali Kelas</div>
                  <div className="font-bold text-slate-800">مربي الفصل</div>
                  <div className="h-14"></div>
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">________________________</div>
                </div>

                <div>
                  <div className="mb-1 text-slate-600">Duyu Baru, {formattedPrintDate}</div>
                  <div className="font-bold text-slate-800">{principalName}</div>
                  <div className="h-14"></div>
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">Pimpinan Pesantren</div>
                </div>
              </div>
            </section>

          </div>
        </main>
      )}
    </>
  );
}