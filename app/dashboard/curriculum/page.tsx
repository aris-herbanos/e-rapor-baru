'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Save, BookOpen, ArrowLeft, Layers } from 'lucide-react';

type TP = {
  id: number;
  code: string;
  description: string;
};

type CP = {
  id: number;
  code: string;
  description: string;
  subjectId?: number;
  grade?: number;
  subject?: {
    name: string;
  };
  tps: TP[];
};

type Subject = { id: number; name: string; level?: 'SMP' | 'SMA' };

const SUBJECTS_SMP: Subject[] = [
  { id: 1, name: 'Tajwid', level: 'SMP' },
  { id: 2, name: 'Tahfidz / Tahsin', level: 'SMP' },
  { id: 3, name: "Muroja'ah", level: 'SMP' },
  { id: 4, name: 'Fiqih', level: 'SMP' },
  { id: 5, name: 'Bahasa Arab', level: 'SMP' },
  { id: 6, name: 'Pidato', level: 'SMP' },
  { id: 7, name: 'Hadis', level: 'SMP' },
  { id: 8, name: 'Pendidikan Agama Islam', level: 'SMP' },
  { id: 9, name: 'Tsaqofah Islamiyah', level: 'SMP' },
  { id: 10, name: 'Nahwu / Sorof', level: 'SMP' },
  { id: 11, name: 'Mahfudzot', level: 'SMP' },
  { id: 12, name: 'Siroh Nabawiyah', level: 'SMP' },
  { id: 13, name: 'Imla dan Khot', level: 'SMP' },
];

const SUBJECTS_SMA: Subject[] = [
  { id: 101, name: 'Tajwid', level: 'SMA' },
  { id: 102, name: 'Tahfidz / Tahsin', level: 'SMA' },
  { id: 103, name: 'Muroja’ah Lanjutan', level: 'SMA' },
  { id: 104, name: 'Fiqih Muqoron', level: 'SMA' },
  { id: 105, name: 'Muhadatsah', level: 'SMA' },
  { id: 106, name: 'Pidato & Debat', level: 'SMA' },
  { id: 107, name: 'Ulumul Quran', level: 'SMA' },
  { id: 108, name: 'Mustholah Hadis', level: 'SMA' },
  { id: 109, name: 'Ushul Fiqih', level: 'SMA' },
  { id: 110, name: 'Tarikh Islam', level: 'SMA' },
  { id: 111, name: 'Balaghoh & Adab', level: 'SMA' },
  { id: 112, name: 'Nahwu & Sorof Lanjutan', level: 'SMA' },
  { id: 113, name: 'Tauhid & Aqidah', level: 'SMA' },
];

export default function CurriculumPage() {
  const [activeTabLevel, setActiveTabLevel] = useState<'SMP' | 'SMA'>('SMP');
  const [selectedGrade, setSelectedGrade] = useState<number>(7);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cps, setCps] = useState<CP[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // State Form Input CP Baru
  const [cpDesc, setCpDesc] = useState('');
  
  // State Form Input TP Cepat di dalam CP
  const [activeCpIdForTp, setActiveCpIdForTp] = useState<number | null>(null);
  const [tpDesc, setTpDesc] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState('');

  // Atur pilihan tingkat kelas (Grade) otomatis berdasarkan jenjang aktif
  useEffect(() => {
    if (activeTabLevel === 'SMP') {
      setSelectedGrade(7);
    } else {
      setSelectedGrade(10);
    }
  }, [activeTabLevel]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const [currRes, subjRes] = await Promise.all([
        fetch('/api/curriculum', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
      ]);

      const currData = await currRes.json();
      const subjData = await subjRes.json();

      if (currRes.ok) setCps(Array.isArray(currData) ? currData : currData.data || []);
      
      if (subjRes.ok) {
        const list = Array.isArray(subjData) ? subjData : subjData?.data || subjData?.subjects || [];
        if (Array.isArray(list) && list.length > 0) {
          setSubjects(list);
        } else {
          setSubjects([...SUBJECTS_SMP, ...SUBJECTS_SMA]);
        }
      }
    } catch (err) {
      console.error('Gagal memuat data:', err);
      setSubjects([...SUBJECTS_SMP, ...SUBJECTS_SMA]);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Mata Pelajaran berdasarkan tab jenjang aktif
  const filteredSubjectsByLevel = useMemo(() => {
    return subjects.filter((subj) => {
      if (activeTabLevel === 'SMA') {
        return subj.name.includes('Lanjutan') || subj.name.includes('Muqoron') || subj.name.includes('Ulumul') || subj.name.includes('Mustholah') || subj.name.includes('Ushul') || subj.name.includes('Tarikh') || subj.name.includes('Balaghoh') || subj.name.includes('Tauhid') || subj.level === 'SMA';
      } else {
        return !subj.name.includes('Lanjutan') && !subj.name.includes('Muqoron') && !subj.name.includes('Ulumul') && !subj.name.includes('Mustholah') && !subj.name.includes('Ushul') && !subj.name.includes('Tarikh') && !subj.name.includes('Balaghoh') && !subj.name.includes('Tauhid');
      }
    });
  }, [subjects, activeTabLevel]);

  // Filter CP berdasarkan mapel dan tingkat kelas (grade) yang dipilih
  const currentSubjectCPs = useMemo(() => {
    if (!selectedSubject) return [];
    return cps.filter((cp) => {
      const matchSubject = cp.subjectId === selectedSubject.id || normalizeText(cp.subject?.name) === normalizeText(selectedSubject.name);
      const matchGrade = cp.grade === undefined || cp.grade === Number(selectedGrade);
      return matchSubject && matchGrade;
    });
  }, [cps, selectedSubject, selectedGrade]);

  function normalizeText(val: any) {
    return String(val || '').trim().toLowerCase();
  }

  // Simpan CP Baru dengan menyertakan grade
  const handleSaveCP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !cpDesc.trim()) return;
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_CP',
          subjectId: selectedSubject.id,
          grade: Number(selectedGrade),
          description: cpDesc,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan CP');

      setMessage('success:Capaian Pembelajaran (CP) berhasil ditambahkan.');
      setCpDesc('');
      await fetchData();
    } catch (err: any) {
      setMessage(`error:${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Simpan TP Baru ke CP tertentu
  const handleSaveTP = async (cpId: number) => {
    if (!tpDesc.trim()) return;
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE_TP',
          cpId: cpId,
          description: tpDesc,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan TP');

      setMessage('success:Tujuan Pembelajaran (TP) berhasil ditambahkan.');
      setTpDesc('');
      setActiveCpIdForTp(null);
      await fetchData();
    } catch (err: any) {
      setMessage(`error:${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Hapus CP atau TP
  const handleDelete = async (id: number, type: 'CP' | 'TP') => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${type} ini?`)) return;

    try {
      const res = await fetch('/api/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE', type, id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menghapus');

      setMessage(`success:${type} berhasil dihapus.`);
      await fetchData();
    } catch (err: any) {
      setMessage(`error:${err.message}`);
    }
  };

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success|error):/, '');

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:py-10 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kurikulum (CP & TP)</h1>
          <p className="text-sm text-slate-500">Kelola Capaian Pembelajaran dan Tujuan Pembelajaran per Tingkat Kelas.</p>
        </div>
        {selectedSubject && (
          <button
            type="button"
            onClick={() => {
              setSelectedSubject(null);
              setMessage('');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition self-start"
          >
            <ArrowLeft size={14} /> Kembali ke Daftar Mapel
          </button>
        )}
      </div>

      {message && (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${isSuccess ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
          <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isSuccess ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}`}>
            {isSuccess ? '✓' : '!'}
          </div>
          <div>
            <div className="text-xs font-bold">{isSuccess ? 'Berhasil' : 'Terjadi Kesalahan'}</div>
            <div className="mt-0.5 text-xs opacity-80">{displayMessage}</div>
          </div>
        </div>
      )}

      {/* TAHAP 1: PILIH JENJANG & MATA PELAJARAN */}
      {!selectedSubject ? (
        <div className="space-y-4">
          
          {/* TAB PILIHAN JENJANG (SMP / SMA) */}
          <div className="flex rounded-2xl bg-slate-200/70 p-1.5 max-w-xs shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTabLevel('SMP')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${activeTabLevel === 'SMP' ? 'bg-[#064e3b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🎓 Jenjang SMP
            </button>
            <button
              type="button"
              onClick={() => setActiveTabLevel('SMA')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${activeTabLevel === 'SMA' ? 'bg-[#064e3b] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🎓 Jenjang SMA
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-700" /> Pilih Mata Pelajaran ({activeTabLevel})
            </h2>
            {loadingData ? (
              <div className="text-center py-10 text-xs text-slate-400">Memuat mata pelajaran...</div>
            ) : filteredSubjectsByLevel.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400">Belum ada mata pelajaran untuk jenjang ini.</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {filteredSubjectsByLevel.map((subj) => (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(subj);
                      setMessage('');
                    }}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-left group shadow-sm"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">{subj.name}</div>
                      <span className="text-[10px] text-slate-400">Kelola CP & TP ({activeTabLevel})</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">Pilih →</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TAHAP 2: KELOLA CP & TP PER TINGKAT KELAS */
        <div className="space-y-6">
          
          {/* INFO MAPEL AKTIF & PILIHAN TINGKAT KELAS (GRADE) */}
          <div className="bg-[#064e3b] text-white p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-semibold">Mata Pelajaran Aktif</span>
              <h2 className="text-lg font-bold">{selectedSubject.name}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-100 font-medium">Tingkat Kelas:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(Number(e.target.value))}
                className="bg-white text-slate-800 text-xs font-bold px-3 py-2 rounded-xl outline-none shadow-sm cursor-pointer"
              >
                {activeTabLevel === 'SMP' ? (
                  <>
                    <option value={7}>Kelas 7</option>
                    <option value={8}>Kelas 8</option>
                    <option value={9}>Kelas 9</option>
                  </>
                ) : (
                  <>
                    <option value={10}>Kelas 10</option>
                    <option value={11}>Kelas 11</option>
                    <option value={12}>Kelas 12</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* FORM TAMBAH CP BARU SPESIFIK KELAS */}
          <form onSubmit={handleSaveCP} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              + Tambah Capaian Pembelajaran (CP) untuk Kelas {selectedGrade}
            </h3>
            <div>
              <textarea
                value={cpDesc}
                onChange={(e) => setCpDesc(e.target.value)}
                placeholder={`Tuliskan deskripsi CP khusus untuk Kelas ${selectedGrade}...`}
                rows={3}
                className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#064e3b] hover:bg-[#053d2e] text-white text-xs font-bold rounded-xl transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : `Simpan CP Kelas ${selectedGrade}`}
            </button>
          </form>

          {/* DAFTAR CP & TP BERDASARKAN KELAS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-800 border-b pb-3 flex items-center justify-between">
              <span>Daftar CP & TP — {selectedSubject.name} (Kelas {selectedGrade})</span>
              <span className="text-xs font-normal text-slate-400">{currentSubjectCPs.length} CP ditemukan</span>
            </h3>

            {currentSubjectCPs.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                Belum ada Capaian Pembelajaran (CP) untuk Kelas {selectedGrade}. Silakan tambahkan melalui form di atas.
              </div>
            ) : (
              <div className="space-y-4">
                {currentSubjectCPs.map((cp) => (
                  <div key={cp.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    
                    {/* Header CP */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                            CP: {cp.code}
                          </span>
                          <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                            Kelas {cp.grade || selectedGrade}
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 font-semibold mt-1.5">{cp.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(cp.id, 'CP')}
                        className="text-[10px] text-red-600 font-bold hover:underline shrink-0"
                      >
                        Hapus CP
                      </button>
                    </div>

                    {/* Daftar TP di bawah CP */}
                    <div className="pl-4 border-l-2 border-amber-400 space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tujuan Pembelajaran (TP):</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCpIdForTp(activeCpIdForTp === cp.id ? null : cp.id);
                            setTpDesc('');
                          }}
                          className="text-[10px] text-amber-800 font-bold hover:underline flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                        >
                          <Plus size={10} /> Tambah TP
                        </button>
                      </div>

                      {/* Form Input TP Cepat */}
                      {activeCpIdForTp === cp.id && (
                        <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-inner space-y-2 my-2">
                          <input
                            type="text"
                            value={tpDesc}
                            onChange={(e) => setTpDesc(e.target.value)}
                            placeholder="Tulis deskripsi Tujuan Pembelajaran (TP)..."
                            className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs outline-none focus:border-amber-500"
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setActiveCpIdForTp(null)}
                              className="px-3 h-8 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveTP(cp.id)}
                              disabled={loading}
                              className="px-4 h-8 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700"
                            >
                              Simpan TP
                            </button>
                          </div>
                        </div>
                      )}

                      {cp.tps?.length === 0 ? (
                        <div className="text-[10px] text-slate-400 italic py-1">Belum ada TP untuk CP ini.</div>
                      ) : (
                        cp.tps.map((tp) => (
                          <div key={tp.id} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
                            <div>
                              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[9px] font-bold mr-2">{tp.code}</span>
                              <span className="text-[11px] text-slate-700">{tp.description}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDelete(tp.id, 'TP')}
                              className="text-[9px] text-red-600 font-bold hover:underline shrink-0"
                            >
                              Hapus
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </main>
  );
}