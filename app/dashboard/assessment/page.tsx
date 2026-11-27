
'use client';

import { useEffect, useState, useMemo } from 'react';

type ClassRoom = { id: number; name: string };
type Subject = { id: number; name: string };
type TP = { id: number; code: string; description: string };

type CP = {
  id: number;
  code: string;
  description: string;
  subjectId: number;
  subject?: { name: string };
  grade?: number;
  tps: TP[];
};

type Student = {
  id: number;
  fullname: string;
  class_name: string;
};

type Assessment = {
  studentId: number;
  tpId?: number | null;
  subjectId?: number | null;
  score: number;
  type: string;
};

function extractGradeNumber(className: string): number {
  const match = String(className || '').match(/\d+/);
  return match ? Number(match[0]) : 7;
}

export default function AssessmentPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cps, setCps] = useState<CP[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  const [activeTarget, setActiveTarget] = useState<{
    targetType: 'TP' | 'STS' | 'SAS';
    data?: TP;
    title: string;
  } | null>(null);

  const [scoresMap, setScoresMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // =========================================================
  // LOAD DATA
  // =========================================================

  const loadData = async () => {
    try {
      const [
        classRes,
        subjectRes,
        currRes,
        studentRes,
        assessRes,
      ] = await Promise.all([
        fetch('/api/classes', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
        fetch('/api/curriculum', { cache: 'no-store' }),
        fetch('/api/students', { cache: 'no-store' }),
        fetch('/api/assessment', { cache: 'no-store' }),
      ]);

      const [
        classData,
        subjectData,
        currData,
        studentData,
        assessData,
      ] = await Promise.all([
        classRes.json(),
        subjectRes.json(),
        currRes.json(),
        studentRes.json(),
        assessRes.json(),
      ]);

      if (classRes.ok) {
        setClasses(
          Array.isArray(classData)
            ? classData
            : classData?.data || []
        );
      }

      if (subjectRes.ok) {
        setSubjects(
          Array.isArray(subjectData)
            ? subjectData
            : subjectData?.data || []
        );
      }

      if (currRes.ok) {
        setCps(
          Array.isArray(currData)
            ? currData
            : currData?.data || []
        );
      }

      if (studentRes.ok) {
        setStudents(
          Array.isArray(studentData)
            ? studentData
            : studentData?.data || []
        );
      }

      if (assessRes.ok) {
        setAssessments(
          Array.isArray(assessData)
            ? assessData
            : assessData?.data || []
        );
      }
    } catch (err) {
      console.error('Gagal memuat data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================================================
  // FILTER SUBJECT
  // =========================================================

  const uniqueSubjects = useMemo(() => {
    const map = new Map<string, Subject>();

    subjects.forEach((subj) => {
      const cleanName = String(subj.name || '')
        .trim()
        .toLowerCase();

      if (cleanName && !map.has(cleanName)) {
        map.set(cleanName, subj);
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [subjects]);

  // =========================================================
  // FILTER CP
  // =========================================================

  const filteredCPs = useMemo(() => {
    if (!selectedSubjectId || !selectedClass) return [];

    const selectedSubj = subjects.find(
      (s) => String(s.id) === String(selectedSubjectId)
    );

    if (!selectedSubj) return [];

    const targetName = String(selectedSubj.name || '')
      .trim()
      .toLowerCase();

    const currentGradeNum = extractGradeNumber(selectedClass);

    return cps.filter((cp) => {
      const matchSubject =
        String(cp.subjectId) === String(selectedSubjectId) ||
        (
          cp.subject?.name &&
          String(cp.subject.name).trim().toLowerCase() === targetName
        );

      if (!matchSubject) return false;

      if (cp.grade !== null && cp.grade !== undefined) {
        const isCurrentSMA = currentGradeNum >= 10;
        const isCpSMA = Number(cp.grade) >= 10;

        if (isCurrentSMA !== isCpSMA) return false;
      }

      return true;
    });
  }, [cps, subjects, selectedSubjectId, selectedClass]);

  // =========================================================
  // FILTER STUDENTS
  // =========================================================

  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];

    return students.filter(
      (s) => s.class_name === selectedClass
    );
  }, [students, selectedClass]);

  // =========================================================
  // GRADING PERCENTAGE
  // =========================================================

  const getGradingPercentage = (
    targetType: 'TP' | 'STS' | 'SAS',
    tpId?: number
  ) => {
    if (filteredStudents.length === 0) return 0;

    let gradedCount = 0;

    filteredStudents.forEach((student) => {
      let hasScore = false;

      if (targetType === 'TP' && tpId) {
        hasScore = assessments.some(
          (a) =>
            a.studentId === student.id &&
            a.tpId === tpId &&
            a.score !== null &&
            a.score !== undefined
        );
      } else {
        const subjectId = Number(selectedSubjectId);

        hasScore = assessments.some(
          (a) =>
            a.studentId === student.id &&
            Number(a.subjectId) === subjectId &&
            (
              a.type === `${targetType}_ORAL` ||
              a.type === `${targetType}_WRITTEN`
            ) &&
            a.score !== null &&
            a.score !== undefined
        );
      }

      if (hasScore) gradedCount++;
    });

    return Math.round(
      (gradedCount / filteredStudents.length) * 100
    );
  };

  // =========================================================
  // OPEN INPUT MODAL
  // =========================================================

  const openModal = (
    targetType: 'TP' | 'STS' | 'SAS',
    title: string,
    tpData?: TP
  ) => {
    setActiveTarget({
      targetType,
      data: tpData,
      title,
    });

    const initialMap: Record<string, string> = {};

    filteredStudents.forEach((student) => {
      let foundOral;
      let foundWritten;

      if (targetType === 'TP' && tpData) {
        foundOral = assessments.find(
          (a) =>
            a.studentId === student.id &&
            a.tpId === tpData.id &&
            (a.type === 'ORAL' || a.type === 'TP_ORAL')
        );

        foundWritten = assessments.find(
          (a) =>
            a.studentId === student.id &&
            a.tpId === tpData.id &&
            (a.type === 'WRITTEN' || a.type === 'TP_WRITTEN')
        );
      } else {
        const subjectId = Number(selectedSubjectId);

        foundOral = assessments.find(
          (a) =>
            a.studentId === student.id &&
            Number(a.subjectId) === subjectId &&
            a.type === `${targetType}_ORAL`
        );

        foundWritten = assessments.find(
          (a) =>
            a.studentId === student.id &&
            Number(a.subjectId) === subjectId &&
            a.type === `${targetType}_WRITTEN`
        );
      }

      if (foundOral) {
        initialMap[`${student.id}-ORAL`] =
          String(foundOral.score);
      }

      if (foundWritten) {
        initialMap[`${student.id}-WRITTEN`] =
          String(foundWritten.score);
      }
    });

    setScoresMap(initialMap);
  };

  // =========================================================
  // SCORE CHANGE
  // =========================================================

  const handleScoreChange = (
    studentId: number,
    type: 'ORAL' | 'WRITTEN',
    val: string
  ) => {
    if (
      val === '' ||
      (
        Number.isInteger(Number(val)) &&
        Number(val) >= 0 &&
        Number(val) <= 100
      )
    ) {
      setScoresMap((prev) => ({
        ...prev,
        [`${studentId}-${type}`]: val,
      }));
    }
  };

  // =========================================================
  // SAVE SCORES
  // =========================================================

  const handleSaveAllScores = async () => {
    if (!activeTarget) return;

    if (!selectedSubjectId) {
      setMessage('error:Mata pelajaran belum dipilih.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const subjectId = Number(selectedSubjectId);

      for (const student of filteredStudents) {
        const oralVal = scoresMap[`${student.id}-ORAL`];
        const writtenVal = scoresMap[`${student.id}-WRITTEN`];

        const saveOne = async (
          value: string,
          component: 'ORAL' | 'WRITTEN'
        ) => {
          const score = Number(value);

          if (
            !Number.isInteger(score) ||
            score < 0 ||
            score > 100
          ) {
            throw new Error(
              `Nilai ${component.toLowerCase()} untuk ${student.fullname} harus bilangan bulat 0–100.`
            );
          }

          const payload: any = {
            studentId: student.id,
            subjectId,
            score,
            type:
              activeTarget.targetType === 'TP'
                ? component
                : `${activeTarget.targetType}_${component}`,
          };

          if (activeTarget.targetType === 'TP') {
            if (!activeTarget.data?.id) {
              throw new Error(
                'Tujuan Pembelajaran belum dipilih.'
              );
            }

            payload.tpId = activeTarget.data.id;
          }

          const response = await fetch('/api/assessment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          let result: any = null;

          try {
            result = await response.json();
          } catch {}

          if (!response.ok || result?.success === false) {
            throw new Error(
              result?.message ||
              `Gagal menyimpan nilai ${component.toLowerCase()} untuk ${student.fullname}.`
            );
          }
        };

        if (oralVal !== undefined && oralVal !== '') {
          await saveOne(oralVal, 'ORAL');
        }

        if (writtenVal !== undefined && writtenVal !== '') {
          await saveOne(writtenVal, 'WRITTEN');
        }
      }

      await loadData();

      setMessage(
        'success:Semua nilai berhasil disimpan dan data asesmen telah diperbarui.'
      );

      setTimeout(() => {
        setMessage('');
        setActiveTarget(null);
      }, 1500);
    } catch (err: any) {
      console.error('Gagal menyimpan nilai:', err);

      setMessage(
        `error:${err?.message || 'Terjadi kesalahan saat menyimpan nilai.'}`
      );

      await loadData();
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success|error):/, '');

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-5">

      {/* =====================================================
          PAGE TITLE
      ====================================================== */}

      <div>
        <h1 className="text-[23px] font-normal text-[#1d2327]">
          Input Nilai Asesmen
        </h1>

        <p className="mt-1 text-[13px] text-[#646970]">
          Pilih kelas dan mata pelajaran, lalu input nilai lisan
          dan tertulis.
        </p>
      </div>

      {/* =====================================================
          NOTIFICATION
      ====================================================== */}

      {message && (
        <div
          className={`rounded-[3px] border-l-4 px-4 py-3 text-[13px] ${
            isSuccess
              ? 'border-[#00a32a] bg-white text-[#1d2327]'
              : 'border-[#d63638] bg-white text-[#1d2327]'
          }`}
        >
          {displayMessage}
        </div>
      )}

      {/* =====================================================
          FILTER WIDGET
      ====================================================== */}

      <div className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white">

        {/* HEADER */}

        <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">
          <h2 className="text-[14px] font-medium text-[#1d2327]">
            Filter Penilaian
          </h2>
        </div>

        {/* FORM */}

        <div className="grid gap-4 p-4 sm:grid-cols-2">

          {/* CLASS */}

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
              Kelas
            </label>

            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
              }}
              className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
            >
              <option value="">— Pilih Kelas —</option>

              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  Kelas {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBJECT */}

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#1d2327]">
              Mata Pelajaran
            </label>

            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
              }}
              className="w-full rounded-[3px] border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#1d2327] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
            >
              <option value="">— Pilih Mata Pelajaran —</option>

              {uniqueSubjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* FILTER FOOTER */}

        <div className="border-t border-[#e2e4e7] bg-[#f6f7f7] px-4 py-2.5 text-[12px] text-[#646970]">
          Pilih kelas dan mata pelajaran untuk menampilkan
          komponen penilaian.
        </div>

      </div>

      {/* =====================================================
          ASSESSMENT CONTENT
      ====================================================== */}

      {selectedClass && selectedSubjectId ? (
        <div className="space-y-5">

          {/* =================================================
              STS & SAS
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">

            {(['STS', 'SAS'] as const).map((type) => {
              const pct = getGradingPercentage(type);

              const title =
                type === 'STS'
                  ? 'Sumatif Tengah Semester (STS)'
                  : 'Sumatif Akhir Semester (SAS)';

              return (
                <div
                  key={type}
                  className="overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white"
                >

                  {/* CARD HEADER */}

                  <div className="border-b border-[#e2e4e7] bg-[#f6f7f7] px-4 py-3">
                    <h3 className="text-[14px] font-medium text-[#1d2327]">
                      {title}
                    </h3>
                  </div>

                  {/* CARD CONTENT */}

                  <div className="flex items-center justify-between gap-3 p-4">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-[3px] border border-[#c3c4c7] bg-[#f6f7f7] px-2 py-1 text-[11px] font-medium text-[#50575e]">
                          {type === 'STS' ? 'UTS' : 'UAS'}
                        </span>

                        <span
                          className={`rounded-[3px] px-2 py-1 text-[11px] font-medium ${
                            pct === 100
                              ? 'bg-[#edfaef] text-[#008a20]'
                              : pct > 0
                                ? 'bg-[#fcf0e8] text-[#9a6700]'
                                : 'bg-[#f0f0f1] text-[#646970]'
                          }`}
                        >
                          {pct}% Dinilai
                        </span>

                      </div>

                      <p className="mt-2 text-[12px] text-[#646970]">
                        Progres penilaian
                      </p>

                      {/* PROGRESS */}

                      <div className="mt-2 h-1.5 w-40 max-w-full overflow-hidden rounded-full bg-[#f0f0f1]">
                        <div
                          className={`h-full ${
                            pct === 100
                              ? 'bg-[#00a32a]'
                              : 'bg-[#2271b1]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                    </div>

                    <button
                      onClick={() => openModal(type, title)}
                      className="shrink-0 rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-3 py-2 text-[13px] text-white hover:bg-[#135e96]"
                    >
                      Input Nilai
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* =================================================
              CP & TP
          ================================================== */}

          <div>

            <div className="mb-3">
              <h2 className="text-[18px] font-normal text-[#1d2327]">
                Capaian & Tujuan Pembelajaran
              </h2>

              <p className="mt-1 text-[13px] text-[#646970]">
                Daftar capaian pembelajaran dan tujuan
                pembelajaran untuk mata pelajaran yang dipilih.
              </p>
            </div>

            {/* EMPTY CP */}

            {filteredCPs.length === 0 ? (
              <div className="rounded-[4px] border border-[#c3c4c7] bg-white px-5 py-12 text-center">

                <div className="text-[14px] text-[#1d2327]">
                  Belum ada struktur kurikulum
                </div>

                <p className="mt-2 text-[13px] text-[#646970]">
                  Belum ada struktur kurikulum untuk kelas dan
                  mata pelajaran ini.
                </p>

              </div>
            ) : (

              filteredCPs.map((cp, cpIdx) => (
                <div
                  key={cp.id}
                  className="mb-4 overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white"
                >

                  {/* CP HEADER */}

                  <div className="border-b border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-[3px] bg-[#2271b1] px-2 py-1 text-[11px] font-medium text-white">
                        CP {cpIdx + 1}
                      </span>

                      <span className="text-[12px] text-[#646970]">
                        Capaian Pembelajaran
                      </span>

                    </div>

                    <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#1d2327]">
                      {cp.description}
                    </p>

                  </div>

                  {/* TP LIST */}

                  <div className="p-4">

                    {cp.tps?.length ? (
                      <div className="space-y-3">

                        {cp.tps.map((tp, tpIdx) => {
                          const pct = getGradingPercentage(
                            'TP',
                            tp.id
                          );

                          return (
                            <div
                              key={tp.id}
                              className="overflow-hidden rounded-[3px] border border-[#c3c4c7]"
                            >

                              {/* TP CONTENT */}

                              <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">

                                <div className="min-w-0 flex-1">

                                  <div className="flex flex-wrap items-center gap-2">

                                    <span className="text-[12px] font-medium text-[#1d2327]">
                                      TP {tpIdx + 1}
                                    </span>

                                    <span
                                      className={`rounded-[3px] px-2 py-1 text-[11px] ${
                                        pct === 100
                                          ? 'bg-[#edfaef] text-[#008a20]'
                                          : pct > 0
                                            ? 'bg-[#fcf0e8] text-[#9a6700]'
                                            : 'bg-[#f0f0f1] text-[#646970]'
                                      }`}
                                    >
                                      {pct}% Dinilai
                                    </span>

                                  </div>

                                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#1d2327]">
                                    {tp.description}
                                  </p>

                                  {/* PROGRESS BAR */}

                                  <div className="mt-2 h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-[#f0f0f1]">
                                    <div
                                      className={`h-full ${
                                        pct === 100
                                          ? 'bg-[#00a32a]'
                                          : 'bg-[#2271b1]'
                                      }`}
                                      style={{
                                        width: `${pct}%`,
                                      }}
                                    />
                                  </div>

                                </div>

                                {/* INPUT BUTTON */}

                                <button
                                  onClick={() =>
                                    openModal(
                                      'TP',
                                      `CP ${cpIdx + 1} — TP ${tpIdx + 1}: ${tp.description}`,
                                      tp
                                    )
                                  }
                                  className="shrink-0 self-start rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-3 py-1.5 text-[12px] text-white hover:bg-[#135e96] sm:self-center"
                                >
                                  Input Nilai
                                </button>

                              </div>

                            </div>
                          );
                        })}

                      </div>
                    ) : (
                      <div className="py-5 text-center text-[13px] text-[#646970]">
                        Belum ada Tujuan Pembelajaran pada CP ini.
                      </div>
                    )}

                  </div>

                </div>
              ))

            )}

          </div>

        </div>
      ) : (

        /* ===================================================
            EMPTY FILTER STATE
        ==================================================== */

        <div className="rounded-[4px] border border-[#c3c4c7] bg-white px-5 py-14 text-center">

          <div className="text-[15px] font-medium text-[#1d2327]">
            Belum ada data penilaian
          </div>

          <p className="mt-2 text-[13px] text-[#646970]">
            Silakan pilih <strong>Kelas</strong> dan{' '}
            <strong>Mata Pelajaran</strong> untuk menampilkan asesmen.
          </p>

        </div>

      )}

      {/* =====================================================
          INPUT MODAL
      ====================================================== */}

      {activeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">

          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[4px] border border-[#c3c4c7] bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[#c3c4c7] bg-[#1d2327] px-4 py-3 text-white sm:px-5">

              <div className="min-w-0">

                <div className="text-[11px] uppercase tracking-wide text-[#c3c4c7]">
                  Input Nilai
                </div>

                <h3 className="mt-1 truncate text-[14px] font-medium">
                  {activeTarget.title}
                </h3>

              </div>

              <button
                onClick={() => setActiveTarget(null)}
                disabled={loading}
                className="ml-3 rounded-[3px] px-3 py-1.5 text-[12px] hover:bg-white/10 disabled:opacity-50"
              >
                Tutup
              </button>

            </div>

            {/* MODAL INFO */}

            <div className="border-b border-[#e2e4e7] bg-[#f6f7f7] px-4 py-3 text-[12px] text-[#646970] sm:px-5">

              <div className="flex flex-wrap gap-x-5 gap-y-1">

                <span>
                  Kelas:{' '}
                  <strong className="text-[#1d2327]">
                    {selectedClass}
                  </strong>
                </span>

                <span>
                  Mata Pelajaran:{' '}
                  <strong className="text-[#1d2327]">
                    {
                      subjects.find(
                        (s) =>
                          String(s.id) ===
                          String(selectedSubjectId)
                      )?.name
                    }
                  </strong>
                </span>

                <span>
                  Jumlah Santri:{' '}
                  <strong className="text-[#1d2327]">
                    {filteredStudents.length}
                  </strong>
                </span>

              </div>

            </div>

            {/* MODAL CONTENT */}

            <div className="flex-1 overflow-auto p-3 sm:p-5">

              {filteredStudents.length === 0 ? (
                <div className="py-10 text-center text-[13px] text-[#646970]">
                  Tidak ada santri di kelas ini.
                </div>
              ) : (

                <div className="overflow-x-auto rounded-[3px] border border-[#c3c4c7]">

                  <table className="w-full min-w-[600px] border-collapse text-[13px]">

                    {/* TABLE HEADER */}

                    <thead>
                      <tr className="border-b border-[#c3c4c7] bg-[#f0f0f1] text-left text-[#1d2327]">

                        <th className="w-12 border-r border-[#c3c4c7] px-3 py-3 font-medium">
                          No.
                        </th>

                        <th className="border-r border-[#c3c4c7] px-3 py-3 font-medium">
                          Nama Santri
                        </th>

                        <th className="w-36 border-r border-[#c3c4c7] px-3 py-3 text-center font-medium">
                          Lisan / Praktik
                        </th>

                        <th className="w-36 px-3 py-3 text-center font-medium">
                          Tertulis
                        </th>

                      </tr>
                    </thead>

                    {/* TABLE BODY */}

                    <tbody>

                      {filteredStudents.map((s, idx) => (
                        <tr
                          key={s.id}
                          className="border-b border-[#e2e4e7] last:border-b-0 hover:bg-[#f6f7f7]"
                        >

                          {/* NUMBER */}

                          <td className="border-r border-[#e2e4e7] px-3 py-3 text-[#646970]">
                            {idx + 1}
                          </td>

                          {/* STUDENT */}

                          <td className="border-r border-[#e2e4e7] px-3 py-3 font-medium text-[#1d2327]">
                            {s.fullname}
                          </td>

                          {/* ORAL */}

                          <td className="border-r border-[#e2e4e7] px-3 py-3 text-center">

                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={
                                scoresMap[`${s.id}-ORAL`] ?? ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  s.id,
                                  'ORAL',
                                  e.target.value
                                )
                              }
                              className="w-20 rounded-[3px] border border-[#8c8f94] bg-white px-2 py-1.5 text-center text-[13px] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                              placeholder="0–100"
                            />

                          </td>

                          {/* WRITTEN */}

                          <td className="px-3 py-3 text-center">

                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={
                                scoresMap[`${s.id}-WRITTEN`] ?? ''
                              }
                              onChange={(e) =>
                                handleScoreChange(
                                  s.id,
                                  'WRITTEN',
                                  e.target.value
                                )
                              }
                              className="w-20 rounded-[3px] border border-[#8c8f94] bg-white px-2 py-1.5 text-center text-[13px] focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                              placeholder="0–100"
                            />

                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

            {/* MODAL FOOTER */}

            <div className="flex flex-col-reverse gap-2 border-t border-[#c3c4c7] bg-[#f6f7f7] px-4 py-3 sm:flex-row sm:justify-between sm:px-5">

              <div className="flex items-center text-[12px] text-[#646970]">
                Nilai harus berupa bilangan bulat 0–100.
              </div>

              <div className="flex justify-end gap-2">

                {/* CANCEL */}

                <button
                  onClick={() => setActiveTarget(null)}
                  disabled={loading}
                  className="rounded-[3px] border border-[#8c8f94] bg-white px-4 py-2 text-[13px] text-[#1d2327] hover:bg-[#f0f0f1] disabled:opacity-50"
                >
                  Batal
                </button>

                {/* SAVE */}

                <button
                  onClick={handleSaveAllScores}
                  disabled={loading}
                  className="rounded-[3px] border border-[#2271b1] bg-[#2271b1] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Nilai'}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
