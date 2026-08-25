'use client';

import { useEffect, useState, useMemo } from 'react';

type ClassRoom = { id: number; name: string };
type Subject = { id: number; name: string };
type TP = { id: number; code: string; description: string };
type CP = { id: number; code: string; description: string; subjectId: number; subject?: { name: string }; level?: string; tps: TP[] };
type Student = { id: number; fullname: string; class_name: string };
type Assessment = { studentId: number; tpId?: number; score: number; type: string };

function isSMALevel(className: string): boolean {
  const c = String(className || '').trim().toLowerCase();
  return (
    c.includes('10') ||
    c.includes('11') ||
    c.includes('12') ||
    c.includes('sma') ||
    c.includes('ulya') ||
    c.includes('x') ||
    c.includes('xi') ||
    c.includes('xii')
  );
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

      const classData = await classRes.json();
      const subjectData = await subjectRes.json();
      const currData = await currRes.json();
      const studentData = await studentRes.json();
      const assessData = await assessRes.json();

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
      if (cleanName && !map.has(cleanName)) {
        map.set(cleanName, subj);
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [subjects]);

  // Filter CP berdasarkan Mapel dan Jenjang (SMP / SMA) agar tidak tergabung dalam satu draf
  const filteredCPs = useMemo(() => {
    if (!selectedSubjectId || !selectedClass) return [];
    const selectedSubj = subjects.find((s) => String(s.id) === String(selectedSubjectId));
    if (!selectedSubj) return [];

    const targetName = String(selectedSubj.name || '').trim().toLowerCase();
    const isCurrentClassSMA = isSMALevel(selectedClass);

    return cps.filter((cp) => {
      const matchSubject =
        String(cp.subjectId) === String(selectedSubjectId) ||
        (cp.subject?.name && String(cp.subject.name).trim().toLowerCase() === targetName);

      if (!matchSubject) return false;

      const cpLevel = String(cp.level || '').trim().toLowerCase();
      if (cpLevel) {
        if (isCurrentClassSMA && (cpLevel.includes('smp') || cpLevel.includes('tsanawiyah') || cpLevel.includes('wustha'))) {
          return false;
        }
        if (!isCurrentClassSMA && (cpLevel.includes('sma') || cpLevel.includes('aliyah') || cpLevel.includes('ulya'))) {
          return false;
        }
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
          (a) => a.studentId === student.id && a.tpId === tpId && (a.score !== null && a.score !== undefined)
        );
      } else {
        hasScore = assessments.some(
          (a) => a.studentId === student.id && (a.type === targetType || a.type === `${targetType}_ORAL` || a.type === `${targetType}_WRITTEN`) && (a.score !== null && a.score !== undefined)
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
        foundOral = assessments.find((a) => a.studentId === student.id && a.tpId === tpData.id && (a.type === 'ORAL' || a.type === 'TP_ORAL'));
        foundWritten = assessments.find((a) => a.studentId === student.id && a.tpId === tpData.id && (a.type === 'WRITTEN' || a.type === 'TP_WRITTEN'));
      } else {
        foundOral = assessments.find((a) => a.studentId === student.id && (a.type === targetType || a.type === `${targetType}_ORAL`));
        foundWritten = assessments.find((a) => a.studentId === student.id && a.type === `${targetType}_WRITTEN`);
      }

      if (foundOral) initialMap[`${student.id}-ORAL`] = String(foundOral.score);
      if (foundWritten) initialMap[`${student.id}-WRITTEN`] = String(foundWritten.score);
    });

    setScoresMap(initialMap);
  };

  const handleScoreChange = (studentId: number, type: 'ORAL' | 'WRITTEN', val: string) => {
    if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
      setScoresMap((prev) => ({ ...prev, [`${studentId}-${type}`]: val }));
    }
  };

  const handleSaveAllScores = async () => {
    if (!activeTarget) return;
    setLoading(true);
    setMessage('');

    try {
      for (const student of filteredStudents) {
        const oralVal = scoresMap[`${student.id}-ORAL`];
        const writtenVal = scoresMap[`${student.id}-WRITTEN`];

        if (oralVal !== undefined && oralVal !== '') {
          const payloadOral: any = {
            studentId: student.id,
            score: Number(oralVal),
            type: activeTarget.targetType === 'TP' ? 'ORAL' : `${activeTarget.targetType}_ORAL`,
          };
          if (activeTarget.targetType === 'TP' && activeTarget.data) payloadOral.tpId = activeTarget.data.id;

          await fetch('/api/assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadOral),
          });
        }

        if (writtenVal !== undefined && writtenVal !== '') {
          const payloadWritten: any = {
            studentId: student.id,
            score: Number(writtenVal),
            type: activeTarget.targetType === 'TP' ? 'WRITTEN' : `${activeTarget.targetType}_WRITTEN`,
          };
          if (activeTarget.targetType === 'TP' && activeTarget.data) payloadWritten.tpId = activeTarget.data.id;

          await fetch('/api/assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadWritten),
          });
        }
      }

      setMessage('success:Semua nilai kelas berhasil disimpan.');
      await loadData();
      setTimeout(() => {
        setMessage('');
        setActiveTarget(null);
      }, 1500);
    } catch (err: any) {
      setMessage(`error:${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success|error):/, '');

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Input Nilai Asesmen</h1>
        <p className="text-sm text-slate-500">Pilih kelas dan mapel, lalu klik tombol input untuk mengisi nilai lisan dan tertulis secara bersamaan.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-xs font-bold ${isSuccess ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {displayMessage}
        </div>
      )}

      {/* FILTER UTAMA */}
      <div className="grid sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">1. Pilih Kelas *</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)} 
            className="w-full h-11 px-3 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:border-emerald-500 font-medium"
          >
            <option value="">-- Pilih Kelas --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>Kelas {cls.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">2. Pilih Mata Pelajaran *</label>
          <select 
            value={selectedSubjectId} 
            onChange={(e) => setSelectedSubjectId(e.target.value)} 
            className="w-full h-11 px-3 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:border-emerald-500 font-medium"
          >
            <option value="">-- Pilih Mata Pelajaran --</option>
            {uniqueSubjects.map((subj) => (
              <option key={subj.id} value={subj.id}>{subj.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      {selectedClass && selectedSubjectId ? (
        <div className="space-y-6">
          
          {/* KARTU STS & SAS */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* STS CARD */}
            {(() => {
              const pct = getGradingPercentage('STS');
              return (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg text-xs font-bold">Ujian Tengah Semester</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pct === 100 ? 'bg-emerald-100 text-emerald-800' : pct > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                        {pct}% Dinilai
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mt-2">Sumatif Tengah Semester (STS)</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal('STS', 'Sumatif Tengah Semester (STS)')}
                    className={`px-4 py-2.5 text-white text-xs font-bold rounded-xl transition shadow-sm shrink-0 ${
                      pct === 100 ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-700 hover:bg-blue-800'
                    }`}
                  >
                    ✏️ Input Nilai
                  </button>
                </div>
              );
            })()}

            {/* SAS CARD */}
            {(() => {
              const pct = getGradingPercentage('SAS');
              return (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-lg text-xs font-bold">Ujian Akhir Semester</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pct === 100 ? 'bg-emerald-100 text-emerald-800' : pct > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                        {pct}% Dinilai
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mt-2">Sumatif Akhir Semester (SAS)</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal('SAS', 'Sumatif Akhir Semester (SAS)')}
                    className={`px-4 py-2.5 text-white text-xs font-bold rounded-xl transition shadow-sm shrink-0 ${
                      pct === 100 ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-purple-700 hover:bg-purple-800'
                    }`}
                  >
                    ✏️ Input Nilai
                  </button>
                </div>
              );
            })()}
          </div>

          <hr className="border-slate-200 my-2" />

          {/* DAFTAR CP & TP */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Capaian & Tujuan Pembelajaran (Sumatif TP)</h2>
            {filteredCPs.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
                Belum ada struktur kurikulum untuk mata pelajaran ini.
              </div>
            ) : (
              filteredCPs.map((cp, cpIdx) => (
                <div key={cp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-4">
                  <div>
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-bold">Capaian Pembelajaran {cpIdx + 1}</span>
                    <p className="text-sm font-semibold text-slate-800 mt-2">{cp.description}</p>
                  </div>

                  <div className="pl-4 border-l-2 border-amber-400 space-y-3">
                    {cp.tps?.length === 0 ? (
                      <div className="text-xs text-slate-400 italic">Belum ada Tujuan Pembelajaran untuk capaian ini.</div>
                    ) : (
                      cp.tps.map((tp, tpIdx) => {
                        const pct = getGradingPercentage('TP', tp.id);
                        return (
                          <div key={tp.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">Tujuan {tpIdx + 1}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pct === 100 ? 'bg-emerald-100 text-emerald-800' : pct > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                                  {pct}% Dinilai
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 font-medium">{tp.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => openModal('TP', `Capaian ${cpIdx + 1} — Tujuan ${tpIdx + 1}: ${tp.description}`, tp)}
                              className={`px-4 py-2 text-white text-xs font-bold rounded-xl transition shadow-sm shrink-0 ${
                                pct === 100 ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-[#064e3b] hover:bg-[#053d2e]'
                              }`}
                            >
                              ✏️ Input Nilai
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400 text-xs">
          ⚠️ Silakan pilih **Kelas** dan **Mata Pelajaran** di atas untuk menampilkan lembar asesmen.
        </div>
      )}

      {/* MODAL POP-UP */}
      {activeTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#064e3b] text-white px-5 py-3.5 flex justify-between items-center gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold">Input Nilai Kelas {selectedClass} (Lisan & Tertulis)</span>
                <h3 className="text-xs font-bold mt-0.5">{activeTarget.title}</h3>
              </div>
              <button 
                onClick={() => setActiveTarget(null)}
                className="text-white/80 hover:text-white text-xs font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition shrink-0"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">Tidak ada santri di kelas ini.</div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600">
                      <th className="p-3 w-12 text-center">No</th>
                      <th className="p-3">Nama Santri</th>
                      <th className="p-3 w-36 text-center text-emerald-800">🗣️ Ujian Lisan / Praktik</th>
                      <th className="p-3 w-36 text-center text-blue-800">✍️ Ujian Tertulis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="p-3 text-center text-slate-400">{idx + 1}</td>
                        <td className="p-3 font-semibold text-slate-800">{s.fullname}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scoresMap[`${s.id}-ORAL`] ?? ''}
                            onChange={(e) => handleScoreChange(s.id, 'ORAL', e.target.value)}
                            placeholder="0-100"
                            className="h-9 w-28 text-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 outline-none focus:border-emerald-500 bg-white shadow-inner"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={scoresMap[`${s.id}-WRITTEN`] ?? ''}
                            onChange={(e) => handleScoreChange(s.id, 'WRITTEN', e.target.value)}
                            placeholder="0-100"
                            className="h-9 w-28 text-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 outline-none focus:border-blue-500 bg-white shadow-inner"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTarget(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveAllScores}
                disabled={loading}
                className="px-6 py-2.5 bg-[#064e3b] hover:bg-[#053d2e] text-white text-xs font-bold rounded-xl transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}