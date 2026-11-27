
'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  BookOpen,
  ChevronDown,
  Loader2,
  Printer,
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
  subjectName?: string | null;
  subjectId?: number | null;
  tpCode?: string | null;
  tpDescription?: string | null;
  subject?: { name?: string | null } | null;
  tp?: {
    code?: string | null;
    description?: string | null;
    cp?: {
      subject?: { name?: string | null } | null;
    } | null;
  } | null;
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

type SubjectItem = {
  arabic: string;
  name: string;
};

/* ============================================================
   SUBJECTS
============================================================ */

const ORAL_SUBJECTS_SMP: SubjectItem[] = [
  { arabic: 'تجويد', name: 'Tajwid' },
  { arabic: 'تحفيظ القرآن / تحسين', name: 'Tahfidz / Tahsin' },
  { arabic: 'المراجعة', name: "Muroja'ah" },
  { arabic: 'الفقه', name: 'Fiqih' },
  { arabic: 'اللغة العربية', name: 'Bahasa Arab' },
  { arabic: 'الخطابة', name: 'Pidato' },
];

const WRITTEN_SUBJECTS_SMP: SubjectItem[] = [
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

const ORAL_SUBJECTS_SMA: SubjectItem[] = [
  { arabic: 'تجويد', name: 'Tajwid' },
  { arabic: 'تحفيظ القرآن / تحسين', name: 'Tahfidz / Tahsin' },
  { arabic: 'المراجعة المتقدمة', name: 'Muroja’ah Lanjutan' },
  { arabic: 'الفقه المقارن', name: 'Fiqih Muqoron' },
  { arabic: 'محادثة', name: 'Muhadatsah' },
  { arabic: 'الخطابة والمناظرة', name: 'Pidato & Debat' },
];

const WRITTEN_SUBJECTS_SMA: SubjectItem[] = [
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
    .replace(/[ًٌٍَُِّْ]/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ');
}

function normalizeScore(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) return null;

  return Math.max(0, Math.min(100, numberValue));
}

function normalizeType(value: unknown): string {
  return normalizeText(value);
}

function typeMatches(
  databaseType: unknown,
  requestedType: 'ORAL' | 'WRITTEN'
): boolean {
  const type = normalizeType(databaseType);

  if (!type) return false;

  const oralKeywords = [
    'oral',
    'lisan',
    'ujian lisan',
    'praktik',
    'praktek',
    'speaking',
    'hafalan',
  ];

  const writtenKeywords = [
    'written',
    'tertulis',
    'ujian tertulis',
    'tulis',
    'writing',
  ];

  const keywords =
    requestedType === 'ORAL' ? oralKeywords : writtenKeywords;

  return keywords.some((keyword) => {
    return type === keyword || type.includes(keyword);
  });
}

function getDatabaseSubjectName(record: ScoreRecord): string {
  return (
    record.subjectName ||
    record.subject?.name ||
    record.tp?.cp?.subject?.name ||
    ''
  );
}

function canonicalSubject(value: unknown): string {
  const name = normalizeText(value);

  const aliases: Record<string, string[]> = {
    tajwid: ['tajwid', 'ilmu tajwid'],
    'tahfidz tahsin': [
      'tahfidz tahsin',
      'tahfidz',
      'tahsin',
      'tahfidz al quran',
      'tahfiz',
      'tahfizh',
      'tahfidzul quran',
    ],
    "muroja'ah": [
      "muroja'ah",
      'murojaah',
      'murajaah',
      "muraja'ah",
      'murojaah lanjutan',
      'muroja ah lanjutan',
    ],
    fiqih: ['fiqih', 'fikih', 'fiqh', 'fiqih islam', 'fiqih muqoron'],
    hadis: ['hadis', 'hadits', 'al hadis', 'al hadits', 'mustholah hadis'],
    'bahasa arab': ['bahasa arab', 'arab', 'muhadatsah'],
    'nahwu sorof': [
      'nahwu sorof',
      'nahwu shorof',
      'nahwu sharaf',
      'nahwu',
      'sorof',
      'shorof',
    ],
    mahfudzot: ['mahfudzot', 'mahfuzhat', 'mahfuzot', 'mahfudzat'],
    'siroh nabawiyah': [
      'siroh nabawiyah',
      'sirah nabawiyah',
      'siroh',
      'sirah',
      'sejarah nabi',
    ],
    'imla dan khot': [
      'imla dan khot',
      'imla dan khat',
      'imla',
      'khot',
      'khat',
    ],
    'pendidikan agama islam': [
      'pendidikan agama islam',
      'pai',
      'agama islam',
    ],
    'tsa qafah islamiyah': [
      'tsa qafah islamiyah',
      'tsaqofah islamiyah',
      'tsaqafah islamiyah',
    ],
    'ulumul quran': ['ulumul quran', 'ulum al quran'],
    'ushul fiqih': ['ushul fiqih', 'ushul fikih', 'ushul fiqh'],
    'tarikh islam': ['tarikh islam', 'sejarah islam'],
    'balaghoh adab': ['balaghoh adab', 'balaghah adab', 'balaghoh', 'adab'],
    'tauhid aqidah': ['tauhid aqidah', 'tauhid', 'aqidah', 'akidah'],
    'pidato debat': ['pidato debat', 'pidato', 'khitobah', 'khutbah'],
  };

  for (const [canonical, variants] of Object.entries(aliases)) {
    if (variants.some((variant) => name === normalizeText(variant))) {
      return canonical;
    }
  }

  return name;
}

function subjectMatches(
  databaseSubject: unknown,
  requestedSubject: unknown
): boolean {
  const db = canonicalSubject(databaseSubject);
  const requested = canonicalSubject(requestedSubject);

  if (!db || !requested) return false;
  if (db === requested) return true;

  if (db.length >= 5 && requested.length >= 5) {
    return db.includes(requested) || requested.includes(db);
  }

  return false;
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
  if (!personality?.length) return '-';

  const targetName = normalizeText(aspectName);
  const targetArabic = normalizeText(aspectArabic);

  const found = personality.find((item) => {
    const itemName = normalizeText(item.name);
    const itemArabic = normalizeText(item.arabic);

    return (
      itemName === targetName ||
      itemArabic === targetArabic ||
      itemName.includes(targetName) ||
      targetName.includes(itemName)
    );
  });

  if (!found?.value || !String(found.value).trim()) return '-';

  return String(found.value).trim();
}

function getMerdekaCompetencyDescriptions(
  subjectName: string,
  score: number
) {
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

function getPersonalityMerdekaDescription(
  aspectName: string,
  value: string
) {
  const val = normalizeText(value);

  if (!val || val === '-') {
    return {
      achieved: `Aspek ${aspectName} belum diisi predikat penilaiannya.`,
      needsImprovement: `Mohon wali kelas untuk melengkapi penilaian pada aspek ${aspectName} sesuai perkembangan santri.`,
    };
  }

  if (
    val.includes('sangat baik') ||
    val.includes('mumtaz')
  ) {
    return {
      achieved: `Peserta didik menunjukkan sikap ${aspectName.toLowerCase()} yang sangat terpuji, konsisten menjadi teladan yang baik di lingkungan ma'had.`,
      needsImprovement: `Pertahankan keteladanan yang sangat baik ini dan teruskan pembiasaan positif dalam keseharian.`,
    };
  }

  if (val.includes('baik') || val.includes('jayyid')) {
    return {
      achieved: `Peserta didik menunjukkan sikap ${aspectName.toLowerCase()} yang baik serta dapat mematuhi tata tertib dan norma yang berlaku di pondok pesantren.`,
      needsImprovement: `Pertahankan kedisiplinan dan terus tingkatkan konsistensi sikap terpuji dalam kehidupan sehari-hari.`,
    };
  }

  return {
    achieved: `Peserta didik menunjukkan predikat ${value} pada aspek ${aspectName} dalam keseharian di lingkungan pondok pesantren.`,
    needsImprovement: `Perlu bimbingan lanjutan dan pengawasan intensif dalam pembentukan karakter ${aspectName.toLowerCase()}.`,
  };
}

/* ============================================================
   COMPONENTS
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

function ScoreTable({
  subjects,
  getScore,
  category,
  compact = false,
}: {
  subjects: SubjectItem[];
  getScore: (subjectName: string, category: 'ORAL' | 'WRITTEN') => number;
  category: 'ORAL' | 'WRITTEN';
  compact?: boolean;
}) {
  return (
    <table className="report-table w-full border-collapse border border-slate-300 bg-white text-[9px]">
      <thead>
        <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
          <th className="w-[6%] border border-slate-300 py-1.5">No</th>
          <th className="w-[27%] border border-slate-300 py-1.5 text-center">
            Mata Pelajaran / المواد
          </th>
          <th className="w-[12%] border border-slate-300 py-1.5">
            Nilai Akhir
          </th>
          <th className="w-[55%] border border-slate-300 px-2.5 py-1.5 text-left">
            Capaian Kompetensi
          </th>
        </tr>
      </thead>

      <tbody>
        {subjects.map((subject, index) => {
          const score = getScore(subject.name, category);
          const description = getMerdekaCompetencyDescriptions(
            subject.name,
            score
          );

          return (
            <tr key={`${category}-${subject.name}`} className="report-row">
              <td className="border border-slate-300 py-1.5 text-center align-top text-slate-500">
                {index + 1}
              </td>

              <td className="border border-slate-300 px-2 py-1.5 text-center align-top">
                <div className="font-medium leading-tight text-slate-800">
                  {subject.name}
                </div>

                <div
                  dir="rtl"
                  className={`arabic mt-0.5 font-semibold leading-tight text-slate-500 ${
                    compact ? 'text-[9.5px]' : 'text-[10.5px]'
                  }`}
                >
                  {subject.arabic}
                </div>
              </td>

              <td className="border border-slate-300 py-1.5 text-center align-top font-bold text-[#477b69]">
                {score > 0 ? score : '-'}
              </td>

              <td className="border border-slate-300 px-2.5 py-1.5 align-top leading-[1.3] text-slate-700">
                <div>{description.achieved}</div>
                <div className="mt-0.5 text-[8px] leading-[1.3] text-slate-500">
                  {description.needsImprovement}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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

  const requestIdRef = useRef(0);

  /* ============================================================
     LOAD STUDENTS
  ============================================================ */

  useEffect(() => {
    const controller = new AbortController();

    async function loadStudents() {
      try {
        setLoadingStudents(true);
        setError('');

        const response = await fetch('/api/students', {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data santri.');
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.students)
            ? data.students
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setStudents(list);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;

        setStudents([]);
        setError(
          err instanceof Error
            ? err.message
            : 'Gagal mengambil data santri.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStudents(false);
        }
      }
    }

    loadStudents();

    return () => controller.abort();
  }, []);

  /* ============================================================
     CLASS FILTER
  ============================================================ */

  const classes = useMemo(() => {
    const unique = Array.from(
      new Set(
        students
          .map((student) => String(student.class_name ?? '').trim())
          .filter(Boolean)
      )
    );

    return unique.sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    );
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!classFilter) return students;

    return students.filter(
      (student) => String(student.class_name) === String(classFilter)
    );
  }, [students, classFilter]);

  /* ============================================================
     FETCH REPORT
  ============================================================ */

  const fetchReport = async (selectedId?: string) => {
    const id = selectedId !== undefined ? selectedId : studentId;

    if (!id) {
      setError('Silakan pilih santri terlebih dahulu.');
      return;
    }

    const currentRequest = ++requestIdRef.current;

    try {
      setLoadingReport(true);
      setError('');
      setReportData(null);

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

      if (currentRequest !== requestIdRef.current) return;

      const report = data.report;

      const normalizedReport: ReportData = {
        ...report,
        scoreRecords: Array.isArray(report.scoreRecords)
          ? report.scoreRecords
          : [],
        personality: Array.isArray(report.personality)
          ? report.personality
          : [],
        attendance: report.attendance ?? {
          sakit: 0,
          izin: 0,
          alpa: 0,
        },
      };

      setReportData(normalizedReport);
    } catch (err) {
      if (currentRequest !== requestIdRef.current) return;

      setReportData(null);
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memuat data rapor.'
      );
    } finally {
      if (currentRequest === requestIdRef.current) {
        setLoadingReport(false);
      }
    }
  };

  /* ============================================================
     HANDLERS
  ============================================================ */

  const handleStudentChange = (value: string) => {
    setStudentId(value);
    setError('');

    if (!value) {
      requestIdRef.current++;
      setReportData(null);
      setLoadingReport(false);
      return;
    }

    fetchReport(value);
  };

  const handleClassChange = (value: string) => {
    requestIdRef.current++;
    setClassFilter(value);
    setStudentId('');
    setReportData(null);
    setLoadingReport(false);
    setError('');
  };

  const handlePrint = () => {
    if (!reportData) return;
    window.print();
  };

  /* ============================================================
     GET SCORE
  ============================================================ */

  const getScoreNumber = (
    subjectName: string,
    categoryType: 'ORAL' | 'WRITTEN'
  ): number => {
    const records = reportData?.scoreRecords ?? [];

    const matchingScores = records
      .filter((item) => {
        const databaseSubject = getDatabaseSubjectName(item);

        return (
          typeMatches(item.type, categoryType) &&
          subjectMatches(databaseSubject, subjectName)
        );
      })
      .map((item) => normalizeScore(item.score))
      .filter((score): score is number => score !== null);

    if (matchingScores.length === 0) return 0;

    const total = matchingScores.reduce(
      (sum, score) => sum + score,
      0
    );

    return Math.round(total / matchingScores.length);
  };

  /* ============================================================
     REPORT VARIABLES
  ============================================================ */

  const attendance: Attendance = reportData?.attendance ?? {
    sakit: 0,
    izin: 0,
    alpa: 0,
  };

  const personality = reportData?.personality ?? [];

  const isSMA = reportData
    ? isSMALevel(reportData.class_name)
    : false;

  const activeOralSubjects = isSMA
    ? ORAL_SUBJECTS_SMA
    : ORAL_SUBJECTS_SMP;

  const activeWrittenSubjects = isSMA
    ? WRITTEN_SUBJECTS_SMA
    : WRITTEN_SUBJECTS_SMP;

  const schoolName =
    reportData?.schoolName ||
    reportData?.settings?.schoolName ||
    'Pondok Pesantren Terpadu Ulul Albab';

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

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <>
      {/* CONTROL PANEL - WORDPRESS ADMIN STYLE */}
      <section className="control-panel print:hidden border-b border-[#dcdcde] bg-[#f0f0f1] text-[#1d2327]">
        <div className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5 lg:px-8">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#1d2327]">
                Rapor Santri
              </h1>
              <p className="mt-1 text-xs text-[#646970]">
                Laporan hasil belajar dan perkembangan santri.
              </p>
            </div>

            <div className="text-xs text-[#646970]">
              Sistem Penilaian Akademik
            </div>
          </div>

          <div className="border border-[#dcdcde] bg-white shadow-sm">
            <div className="border-b border-[#dcdcde] px-4 py-3">
              <h2 className="text-sm font-semibold">
                Pilih Data Rapor
              </h2>
            </div>

            <div className="grid gap-3 p-4 lg:grid-cols-[190px_minmax(0,1fr)_auto_auto]">
              {/* KELAS */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1d2327]">
                  Kelas
                </label>

                <div className="relative">
                  <select
                    value={classFilter}
                    onChange={(event) =>
                      handleClassChange(event.target.value)
                    }
                    disabled={loadingStudents}
                    className="h-9 w-full appearance-none rounded-sm border border-[#8c8f94] bg-white px-2.5 pr-8 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                  >
                    <option value="">Semua Kelas</option>

                    {classes.map((className) => (
                      <option key={className} value={className}>
                        {/^\s*kelas\s/i.test(className)
                          ? className
                          : `Kelas ${className}`}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#646970]"
                  />
                </div>
              </div>

              {/* SANTRI */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#1d2327]">
                  Nama Santri
                </label>

                <div className="relative">
                  <UserRound
                    size={14}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#646970]"
                  />

                  <select
                    value={studentId}
                    onChange={(event) =>
                      handleStudentChange(event.target.value)
                    }
                    disabled={loadingStudents}
                    className="h-9 w-full appearance-none rounded-sm border border-[#8c8f94] bg-white px-8 pr-8 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                  >
                    <option value="">
                      {loadingStudents
                        ? 'Memuat santri...'
                        : filteredStudents.length === 0
                          ? 'Tidak ada santri'
                          : '-- Pilih Santri --'}
                    </option>

                    {filteredStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.fullname}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#646970]"
                  />
                </div>
              </div>

              {/* RELOAD */}
              <button
                type="button"
                onClick={() => fetchReport()}
                disabled={loadingReport || !studentId}
                className="inline-flex h-9 items-center justify-center gap-2 self-end rounded-sm border border-[#2271b1] bg-white px-3 text-[13px] font-medium text-[#2271b1] transition-colors hover:bg-[#f0f6fc] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingReport ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <RefreshCw size={14} />
                )}
                Muat Ulang
              </button>

              {/* PRINT */}
              <button
                type="button"
                onClick={handlePrint}
                disabled={!reportData}
                className="inline-flex h-9 items-center justify-center gap-2 self-end rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[13px] font-medium text-white transition-colors hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Printer size={14} />
                Cetak F4 / PDF
              </button>
            </div>

            {error && (
              <div className="mx-4 mb-4 border-l-4 border-[#d63638] bg-[#fcf0f1] px-3 py-2.5 text-xs text-[#b32d2e]">
                {error}
              </div>
            )}
          </div>

          <div className="mt-2 text-xs text-[#646970]">
            {loadingStudents
              ? 'Sedang mengambil data santri...'
              : `${filteredStudents.length} santri tersedia`}
          </div>
        </div>
      </section>

      {/* EMPTY STATE */}
      {!reportData && !loadingReport && (
        <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f0f0f1] px-5">
          <div className="max-w-md border border-[#dcdcde] bg-white px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f6fc] text-[#2271b1]">
              <BookOpen size={22} strokeWidth={1.6} />
            </div>

            <h2 className="text-sm font-semibold text-[#1d2327]">
              Pilih Santri untuk Melihat Rapor
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#646970]">
              Pilih kelas dan nama santri pada panel di atas untuk
              menampilkan laporan hasil belajar secara lengkap.
            </p>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loadingReport && (
        <div className="print:hidden flex min-h-[calc(100vh-190px)] items-center justify-center bg-[#f0f0f1]">
          <div className="border border-[#dcdcde] bg-white px-10 py-8 text-center shadow-sm">
            <Loader2
              size={25}
              className="mx-auto animate-spin text-[#2271b1]"
            />
            <p className="mt-3 text-xs font-medium text-[#646970]">
              Menyiapkan rapor santri...
            </p>
          </div>
        </div>
      )}

      {/* REPORT DOCUMENT */}
      {reportData && !loadingReport && (
        <main className="report-screen bg-[#dfe5e2] px-3 py-6 print:bg-white print:p-0">
          <div className="report-document mx-auto w-[215.9mm] bg-white text-slate-900 shadow-[0_10px_35px_rgba(15,23,42,0.12)] print:w-[215.9mm] print:shadow-none">

            {/* HEADER */}
            <header className="report-header relative border-b border-slate-200 px-[10mm] pb-2.5 pt-[4mm] text-center">
              <div className="absolute left-[10mm] top-[4mm] flex h-[19mm] w-[19mm] items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mx-auto max-w-[520px] px-[18mm]">
                <div
                  dir="rtl"
                  className="arabic mb-0.5 text-[13px] font-bold text-slate-600"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </div>

                <div className="text-[8px] font-bold tracking-[0.15em] text-slate-500">
                  مَعْهَدُ أُولِي الْأَلْبَابِ الإِسْلَامِي
                </div>

                <h2 className="mt-0.5 text-[17px] font-black leading-tight tracking-tight text-[#315f50]">
                  {schoolName}
                </h2>

                <p className="mt-0.5 text-[8px] text-slate-400">
                  Doyo Baru - Waibu - Jayapura
                </p>
              </div>

              <div className="mt-1.5 border-t border-slate-100 pt-1 text-center">
                <div className="arabic text-[11px] font-semibold text-slate-600">
                  السنة الدراسية / Tahun Ajaran: {academicYear}
                </div>
              </div>
            </header>

            {/* TITLE */}
            <div className="report-block mx-[10mm] my-2.5 border-y border-[#9db9ad]/60 bg-[#f4f8f6] px-3 py-1.5 text-center">
              <div
                dir="rtl"
                className="arabic text-[12px] font-bold leading-5 text-[#315f50]"
              >
                كَشْفُ دَرَجَاتِ الطَّالِبِ{' '}
                <span className="mx-2 text-[#b29b65]">•</span>
                {semesterArabic}
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-800">
                LAPORAN HASIL BELAJAR SANTRI TINGKAT {isSMA ? 'SMA' : 'SMP'}
              </div>

              <div className="text-[7.5px] font-medium tracking-[0.12em] text-slate-500">
                SEMESTER {semesterLabel.toUpperCase()} • TAHUN AJARAN {academicYear}
              </div>
            </div>

            {/* STUDENT INFO */}
            <section className="report-block mx-[10mm] mb-2.5 rounded-lg border border-slate-200 bg-[#fafbfa] p-2.5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-[10px]">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">
                  <span className="font-semibold text-slate-600">
                    Nama Santri{' '}
                    <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">
                      / اسم الطالب
                    </span>
                  </span>
                  <span className="max-w-[55%] truncate font-bold text-slate-900">
                    {reportData.fullname}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1">
                  <span className="font-semibold text-slate-600">
                    NISN{' '}
                    <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">
                      / رقم القيد
                    </span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {reportData.nisn || '-'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    Kelas{' '}
                    <span dir="rtl" className="arabic ml-1 text-[12px] font-semibold">
                      / الفصل
                    </span>
                  </span>
                  <span className="font-bold text-[#477b69]">
                    {reportData.class_name || '-'} (Tingkat {isSMA ? 'SMA' : 'SMP'})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">
                    Tahun Ajaran
                  </span>
                  <span className="font-semibold text-slate-800">
                    {academicYear} • {semesterLabel}
                  </span>
                </div>
              </div>
            </section>

            {/* UJIAN LISAN */}
            <ReportSection
              number="03"
              title="Ujian Lisan dan Praktik"
              arabic="الامتحان الشفوي والتطبيقي"
            >
              <ScoreTable
                subjects={activeOralSubjects}
                getScore={getScoreNumber}
                category="ORAL"
              />
            </ReportSection>

            {/* UJIAN TERTULIS */}
            <ReportSection
              number="04"
              title="Ujian Tertulis"
              arabic="الامتحان التحريري"
            >
              <ScoreTable
                subjects={activeWrittenSubjects}
                getScore={getScoreNumber}
                category="WRITTEN"
                compact
              />
            </ReportSection>

            {/* KEPRIBADIAN SANTRI */}
            <ReportSection
              number="05"
              title="Kepribadian Santri"
              arabic="شخصية الطالب / الطالبة"
            >
              <table className="report-table w-full border-collapse border border-slate-300 bg-white text-[9px]">
                <thead>
                  <tr className="bg-[#f1f6f3] text-center font-bold text-slate-700">
                    <th className="w-[6%] border border-slate-300 py-1.5">No</th>
                    <th className="w-[27%] border border-slate-300 py-1.5 text-center">
                      Aspek / الصفة
                    </th>
                    <th className="w-[12%] border border-slate-300 py-1.5">
                      Predikat
                    </th>
                    <th className="w-[55%] border border-slate-300 px-2.5 py-1.5 text-left">
                      Capaian Kompetensi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {PERSONALITY_ASPECTS.map((item, index) => {
                    const value = getPersonalityValue(
                      personality,
                      item.name,
                      item.arabic
                    );

                    const desc = getPersonalityMerdekaDescription(
                      item.name,
                      value
                    );

                    return (
                      <tr key={`personality-${item.name}`} className="report-row">
                        <td className="border border-slate-300 py-1 text-center align-top text-slate-500">
                          {index + 1}
                        </td>

                        <td className="border border-slate-300 px-1.5 py-1 text-center align-top">
                          <div className="font-medium leading-tight text-slate-800">
                            {item.name}
                          </div>
                          <div
                            dir="rtl"
                            className="arabic mt-0.5 text-[9.5px] font-semibold leading-tight text-slate-500"
                          >
                            {item.arabic}
                          </div>
                        </td>

                        <td
                          className={`border border-slate-300 py-1 text-center align-top font-bold ${
                            value === '-'
                              ? 'text-slate-400'
                              : 'text-[#477b69]'
                          }`}
                        >
                          {value}
                        </td>

                        <td className="border border-slate-300 px-2.5 py-1 align-top leading-[1.25] text-slate-700">
                          <div>{desc.achieved}</div>
                          <div className="mt-0.5 text-[8px] leading-[1.25] text-slate-500">
                            {desc.needsImprovement}
                          </div>
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
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-800">
                    Ketidakhadiran
                  </span>
                  <span dir="rtl" className="arabic text-[10px] font-semibold text-slate-600">
                    الغياب
                  </span>
                </div>

                <table className="w-full border-collapse border border-slate-300 bg-white text-[9.5px]">
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">
                        Sakit (مرض)
                      </td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">
                        {attendance.sakit} hari
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">
                        Izin (إذن)
                      </td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">
                        {attendance.izin} hari
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-slate-300 px-2 py-1 text-slate-600">
                        Alpa / Tanpa Keterangan (غائب)
                      </td>
                      <td className="border border-slate-300 px-2 py-1 text-center font-bold text-slate-800">
                        {attendance.alpa} hari
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="report-block">
                <div className="mb-1 flex items-center justify-between border-b-2 border-[#315f50] pb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-800">
                    Catatan Wali Kelas
                  </span>
                  <span dir="rtl" className="arabic text-[10px] font-semibold text-slate-600">
                    ملاحظات مربي الفصل
                  </span>
                </div>

                <div className="h-[74px] overflow-y-auto rounded border border-slate-300 bg-white p-2 text-[9px] leading-relaxed text-slate-700">
                  {reportData.homeroomNote ? (
                    reportData.homeroomNote
                  ) : (
                    <span className="italic text-slate-400">
                      Terus tingkatkan prestasi belajar dan jaga kedisiplinan
                      selama berada di lingkungan pondok pesantren.
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* TANDA TANGAN */}
            <section className="report-block mx-[10mm] pb-6 text-[9.5px]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="mb-1 text-slate-600">Mengetahui,</div>
                  <div className="font-bold text-slate-800">
                    Orang Tua / Wali Murid
                  </div>
                  <div className="h-14" />
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">
                    ( ........................................ )
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-slate-600">Wali Kelas</div>
                  <div className="font-bold text-slate-800">
                    مربي الفصل
                  </div>
                  <div className="h-14" />
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">
                    ________________________
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-slate-600">
                    Doyo Baru, {formattedPrintDate}
                  </div>
                  <div className="font-bold text-slate-800">
                    {principalName}
                  </div>
                  <div className="h-14" />
                  <div className="border-b border-slate-400 pb-0.5 font-bold text-slate-800">
                    Pimpinan Pesantren
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* PRINT STYLES */}
      <style jsx global>{`
        .arabic {
          font-family: 'Amiri', 'Traditional Arabic', serif;
        }

        @media print {
          @page {
            size: 215.9mm 330.2mm;
            margin: 0;
          }

          html,
          body {
            width: 215.9mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body * {
            visibility: hidden;
          }

          .report-screen,
          .report-screen * {
            visibility: visible;
          }

          .report-screen {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 215.9mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }

          .report-document {
            width: 215.9mm !important;
            min-height: 330.2mm;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }

          .report-block {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .report-table {
            break-inside: auto;
          }

          .report-row {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .report-header {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          table {
            border-collapse: collapse !important;
          }

          thead {
            display: table-header-group;
          }

          tfoot {
            display: table-footer-group;
          }

          img {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `}</style>
    </>
  );
}
