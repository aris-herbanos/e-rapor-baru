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
type Student = { id: number; fullname: string; class_name: string };
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

  const loadData = async () => {
    try {
      const [classRes, subjectRes, currRes, studentRes, assessRes] = await Promise.all([
        fetch('/api/classes', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
        fetch('/api/curriculum', { cache: 'no-store' }),
        fetch('/api/students', { cache: 'no-store' }),
        fetch('/api/assessment', { cache: 'no-store' }),
      ]);

      const [classData, subjectData, currData, studentData, assessData] = await Promise.all([
        classRes.json(),
        subjectRes.json(),
        currRes.json(),
        studentRes.json(),
        assessRes.json(),
      ]);

      if (classRes.ok) setClasses(Array.isArray(classData) ? classData : classData?.data || []);
      if (subjectRes.ok) setSubjects(Array.isArray(subjectData) ? subjectData : subjectData?.data || []);
      if (currRes.ok) setCps(Array.isArray(currData) ? currData : currData?.data || []);
      if (studentRes.ok) setStudents(Array.isArray(studentData) ? studentData : studentData?.data || []);
      if (assessRes.ok) setAssessments(Array.isArray(assessData) ? assessData : assessData?.data || []);
    } catch (err) {
      console.error('Gagal memuat data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const uniqueSubjects = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((subj) => {
      const cleanName = String(subj.name || '').trim().toLowerCase();
      if (cleanName && !map.has(cleanName)) map.set(cleanName, subj);
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [subjects]);

  const filteredCPs = useMemo(() => {
    if (!selectedSubjectId || !selectedClass) return [];
    const selectedSubj = subjects.find((s) => String(s.id) === String(selectedSubjectId));
    if (!selectedSubj) return [];
    const targetName = String(selectedSubj.name || '').trim().toLowerCase();
    const currentGradeNum = extractGradeNumber(selectedClass);

    return cps.filter((cp) => {
      const matchSubject =
        String(cp.subjectId) === String(selectedSubjectId) ||
        (cp.subject?.name && String(cp.subject.name).trim().toLowerCase() === targetName);
      if (!matchSubject) return false;
      if (cp.grade !== null && cp.grade !== undefined) {
        const isCurrentSMA = currentGradeNum >= 10;
        const isCpSMA = Number(cp.grade) >= 10;
        if (isCurrentSMA !== isCpSMA) return false;
      }
      return true;
    });
  }, [cps, subjects, selectedSubjectId, selectedClass]);

  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    return students.filter((s) => s.class_name === selectedClass);
  }, [students, selectedClass]);

  const getGradingPercentage = (targetType: 'TP' | 'STS' | 'SAS', tpId?: number) => {
    if (filteredStudents.length === 0) return 0;
    let gradedCount = 0;
    filteredStudents.forEach((student) => {
      let hasScore = false;
      if (targetType === 'TP' && tpId) {
        hasScore = assessments.some(
          (a) => a.studentId === student.id && a.tpId === tpId && a.score !== null && a.score !== undefined
        );
      } else {
        const subjectId = Number(selectedSubjectId);
        hasScore = assessments.some(
          (a) =>
            a.studentId === student.id &&
            Number(a.subjectId) === subjectId &&
            (a.type === `${targetType}_ORAL` || a.type === `${targetType}_WRITTEN`) &&
            a.score !== null &&
            a.score !== undefined
        );
      }
      if (hasScore) gradedCount++;
    });
    return Math.round((gradedCount / filteredStudents.length) * 100);
  };

  const openModal = (targetType: 'TP' | 'STS' | 'SAS', title: string, tpData?: TP) => {
    setActiveTarget({ targetType, data: tpData, title });
    const initialMap: Record<string, string> = {};
    filteredStudents.forEach((student) => {
      let foundOral, foundWritten;
      if (targetType === 'TP' && tpData) {
        foundOral = assessments.find(
          (a) => a.studentId === student.id && a.tpId === tpData.id && (a.type === 'ORAL' || a.type === 'TP_ORAL')
        );
        foundWritten = assessments.find(
          (a) => a.studentId === student.id && a.tpId === tpData.id && (a.type === 'WRITTEN' || a.type === 'TP_WRITTEN')
        );
      } else {
        const subjectId = Number(selectedSubjectId);
        foundOral = assessments.find(
          (a) => a.studentId === student.id && Number(a.subjectId) === subjectId && a.type === `${targetType}_ORAL`
        );
        foundWritten = assessments.find(
          (a) => a.studentId === student.id && Number(a.subjectId) === subjectId && a.type === `${targetType}_WRITTEN`
        );
      }
      if (foundOral) initialMap[`${student.id}-ORAL`] = String(foundOral.score);
      if (foundWritten) initialMap[`${student.id}-WRITTEN`] = String(foundWritten.score);
    });
    setScoresMap(initialMap);
  };

  const handleScoreChange = (studentId: number, type: 'ORAL' | 'WRITTEN', val: string) => {
    if (val === '' || (Number.isInteger(Number(val)) && Number(val) >= 0 && Number(val) <= 100)) {
      setScoresMap((prev) => ({ ...prev, [`${studentId}-${type}`]: val }));
    }
  };

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
        const saveOne = async (value: string, component: 'ORAL' | 'WRITTEN') => {
          const score = Number(value);
          if (!Number.isInteger(score) || score < 0 || score > 100) {
            throw new Error(`Nilai ${component.toLowerCase()} untuk ${student.fullname} harus bilangan bulat 0–100.`);
          }
          const payload: any = {
            studentId: student.id,
            subjectId,
            score,
            type: activeTarget.targetType === 'TP' ? component : `${activeTarget.targetType}_${component}`,
          };
          if (activeTarget.targetType === 'TP') {
            if (!activeTarget.data?.id) throw new Error('Tujuan Pembelajaran belum dipilih.');
            payload.tpId = activeTarget.data.id;
          }
          const response = await fetch('/api/assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          let result: any = null;
          try { result = await response.json(); } catch {}
          if (!response.ok || result?.success === false) {
            throw new Error(result?.message || `Gagal menyimpan nilai ${component.toLowerCase()} untuk ${student.fullname}.`);
          }
        };
        if (oralVal !== undefined && oralVal !== '') await saveOne(oralVal, 'ORAL');
        if (writtenVal !== undefined && writtenVal !== '') await saveOne(writtenVal, 'WRITTEN');
      }
      await loadData();
      setMessage('success:Semua nilai berhasil disimpan dan data asesmen telah diperbarui.');
      setTimeout(() => {
        setMessage('');
        setActiveTarget(null);
      }, 1500);
    } catch (err: any) {
      console.error('Gagal menyimpan nilai:', err);
      setMessage(`error:${err?.message || 'Terjadi kesalahan saat menyimpan nilai.'}`);
      await loadData();
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success|error):/, '');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1d2327]">Input Nilai Asesmen</h1>
        <p className="mt-1 text-sm text-[#646970]">
          Pilih kelas dan mata pelajaran, lalu input nilai lisan dan tertulis.
        </p>
      </div>

      {message && (
        <div className={`rounded border p-3 text-sm ${
          isSuccess
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-red-200 bg-red-50 text-red-700'
        }`}>
          {displayMessage}
        </div>
      )}

      {/* Filter */}
      <div className="grid gap-4 rounded-lg border border-[#c3c4c7] bg-white p-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#1d2327]">Kelas</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
          >
            <option value="">— Pilih Kelas —</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>Kelas {cls.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1d2327]">Mata Pelajaran</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
          >
            <option value="">— Pilih Mata Pelajaran —</option>
            {uniqueSubjects.map((subj) => (
              <option key={subj.id} value={subj.id}>{subj.name}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedClass && selectedSubjectId ? (
        <div className="space-y-6">
          {/* STS & SAS */}
          <div className="grid gap-4 sm:grid-cols-2">
            {(['STS', 'SAS'] as const).map((type) => {
              const pct = getGradingPercentage(type);
              const title = type === 'STS' ? 'Sumatif Tengah Semester (STS)' : 'Sumatif Akhir Semester (SAS)';
              return (
                <div key={type} className="flex items-center justify-between rounded-lg border border-[#c3c4c7] bg-white p-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#f0f0f1] px-2 py-0.5 text-xs font-medium text-[#1d2327]">
                        {type === 'STS' ? 'UTS' : 'UAS'}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        pct === 100 ? 'bg-emerald-100 text-emerald-700' :
                        pct > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {pct}% Dinilai
                      </span>
                    </div>
                    <h3 className="mt-2 font-medium text-[#1d2327]">{title}</h3>
                  </div>
                  <button
                    onClick={() => openModal(type, title)}
                    className="rounded bg-[#2271b1] px-4 py-2 text-sm font-medium text-white hover:bg-[#135e96]"
                  >
                    Input Nilai
                  </button>
                </div>
              );
            })}
          </div>

          {/* CP & TP */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-[#1d2327]">Capaian & Tujuan Pembelajaran</h2>
            {filteredCPs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#c3c4c7] bg-white py-12 text-center text-sm text-[#646970]">
                Belum ada struktur kurikulum untuk kelas dan mata pelajaran ini.
              </div>
            ) : (
              filteredCPs.map((cp, cpIdx) => (
                <div key={cp.id} className="mb-4 rounded-lg border border-[#c3c4c7] bg-white p-5">
                  <div className="mb-3">
                    <span className="rounded bg-[#f0f0f1] px-2 py-0.5 text-xs font-medium">
                      Capaian Pembelajaran {cpIdx + 1}
                    </span>
                    <p className="mt-2 text-sm font-medium text-[#1d2327]">{cp.description}</p>
                  </div>
                  <div className="space-y-3 border-l-2 border-[#c3c4c7] pl-4">
                    {cp.tps?.map((tp, tpIdx) => {
                      const pct = getGradingPercentage('TP', tp.id);
                      return (
                        <div key={tp.id} className="flex items-center justify-between rounded border border-[#c3c4c7] bg-[#f6f7f7] p-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-medium">Tujuan {tpIdx + 1}</span>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                                pct === 100 ? 'bg-emerald-100 text-emerald-700' :
                                pct > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {pct}%
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-[#1d2327]">{tp.description}</p>
                          </div>
                          <button
                            onClick={() => openModal('TP', `CP ${cpIdx + 1} — TP ${tpIdx + 1}: ${tp.description}`, tp)}
                            className="rounded bg-[#2271b1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#135e96]"
                          >
                            Input
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-[#c3c4c7] bg-white py-16 text-center text-sm text-[#646970]">
          Silakan pilih <strong>Kelas</strong> dan <strong>Mata Pelajaran</strong> untuk menampilkan asesmen.
        </div>
      )}

      {/* Modal */}
      {activeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-[#c3c4c7] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#c3c4c7] bg-[#1d2327] px-5 py-3 text-white">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-300">Input Nilai</div>
                <h3 className="text-sm font-medium">{activeTarget.title}</h3>
              </div>
              <button
                onClick={() => setActiveTarget(null)}
                disabled={loading}
                className="rounded px-2 py-1 text-sm hover:bg-white/10"
              >
                Tutup
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {filteredStudents.length === 0 ? (
                <div className="py-10 text-center text-sm text-[#646970]">Tidak ada santri di kelas ini.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-left text-[#1d2327]">
                      <th className="p-3 w-12">No</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3 text-center">Lisan / Praktik</th>
                      <th className="p-3 text-center">Tertulis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, idx) => (
                      <tr key={s.id} className="border-b border-[#c3c4c7] hover:bg-[#f6f7f7]">
                        <td className="p-3 text-[#646970]">{idx + 1}</td>
                        <td className="p-3 font-medium">{s.fullname}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scoresMap[`${s.id}-ORAL`] ?? ''}
                            onChange={(e) => handleScoreChange(s.id, 'ORAL', e.target.value)}
                            className="w-24 rounded border border-[#8c8f94] px-2 py-1 text-center text-sm focus:border-[#2271b1] focus:outline-none"
                            placeholder="0-100"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scoresMap[`${s.id}-WRITTEN`] ?? ''}
                            onChange={(e) => handleScoreChange(s.id, 'WRITTEN', e.target.value)}
                            className="w-24 rounded border border-[#8c8f94] px-2 py-1 text-center text-sm focus:border-[#2271b1] focus:outline-none"
                            placeholder="0-100"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-[#c3c4c7] bg-[#f6f7f7] px-5 py-4">
              <button
                onClick={() => setActiveTarget(null)}
                disabled={loading}
                className="rounded border border-[#8c8f94] px-4 py-2 text-sm hover:bg-white"
              >
                Batal
              </button>
              <button
                onClick={handleSaveAllScores}
                disabled={loading}
                className="rounded bg-[#2271b1] px-5 py-2 text-sm font-medium text-white hover:bg-[#135e96] disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan Nilai'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}