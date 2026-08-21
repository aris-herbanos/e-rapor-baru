'use client';

import { useEffect, useState, useCallback } from 'react';
import { BookOpen, Users, Award, RefreshCw, CheckCircle2 } from 'lucide-react';

type AssessmentItem = {
  id: number;
  studentId: number;
  tpId: number;
  score: number;
  type: string;
  student?: {
    id: number;
    fullname: string;
    class_name?: string;
  };
};

type ClassRoom = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
};

export default function NilaiPage() {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Ambil data referensi kelas, mapel, dan asesmen
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [classRes, subjectRes, assessRes] = await Promise.all([
        fetch('/api/classes', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
        fetch('/api/assessment', { cache: 'no-store' }),
      ]);

      const classData = await classRes.json();
      const subjectData = await subjectRes.json();
      const assessData = await assessRes.json();

      if (classRes.ok) setClasses(Array.isArray(classData) ? classData : classData?.data || []);
      if (subjectRes.ok) setSubjects(Array.isArray(subjectData) ? subjectData : subjectData?.data || []);
      if (assessRes.ok) setAssessments(Array.isArray(assessData) ? assessData : assessData?.data || []);
    } catch (err) {
      console.error('Gagal memuat rekap nilai:', err);
      setMessage('Gagal memuat rekapitulasi nilai asesmen.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter asesmen berdasarkan kelas yang dipilih
  const filteredAssessments = assessments.filter((item) => {
    if (!selectedClass) return true;
    return item.student?.class_name === selectedClass;
  });

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <header className="rounded-2xl bg-[#064e3b] px-6 py-7 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-100">
            Akademik • Rekapitulasi
          </span>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl mt-1">
            Rekapitulasi Nilai Asesmen Santri
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            Nilai santri di bawah ini bersumber secara otomatis dari hasil input asesmen guru.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Perbarui Data
        </button>
      </header>

      {message && (
        <div className="p-4 rounded-xl text-sm bg-red-50 text-red-800 border border-red-200">
          {message}
        </div>
      )}

      {/* FILTER PARAMETER */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Filter Kelas
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 bg-white"
          >
            <option value="">-- Semua Kelas --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                Kelas {cls.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Filter Mata Pelajaran
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 bg-white"
          >
            <option value="">-- Semua Mata Pelajaran --</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.name}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABEL REKAPITULASI ASESMEN */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-800 flex items-center justify-between">
          <span>Daftar Nilai Berdasarkan Asesmen</span>
          <span className="text-xs font-normal text-slate-500">
            Total Rekap: {filteredAssessments.length} catatan
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-400">Memuat rekapitulasi nilai...</div>
        ) : filteredAssessments.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400">
            Belum ada data asesmen yang dimasukkan untuk filter ini. Silakan input melalui menu <strong>Input Asesmen</strong>.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="p-4">No</th>
                  <th className="p-4">Nama Santri</th>
                  <th className="p-4">Kelas</th>
                  <th className="p-4">ID TP</th>
                  <th className="p-4">Jenis Asesmen</th>
                  <th className="p-4 text-center">Nilai Angka</th>
                  <th className="p-4">Predikat / Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssessments.map((item, index) => {
                  const score = item.score;
                  let predicate = 'Perlu Bimbingan';
                  if (score >= 90) predicate = 'Sangat Baik (Mumtaz)';
                  else if (score >= 80) predicate = 'Baik (Jeid Jiddan)';
                  else if (score >= 70) predicate = 'Cukup Baik (Jeid)';
                  else if (score >= 60) predicate = 'Cukup (Maqbul)';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 text-slate-400 font-medium">{index + 1}</td>
                      <td className="p-4 font-bold text-slate-800">{item.student?.fullname || `Siswa ID: ${item.studentId}`}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                          {item.student?.class_name || '-'}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">TP #{item.tpId}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.type === 'FORMATIVE' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                          {item.type === 'FORMATIVE' ? 'Formatif' : 'Sumatif'}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-900 text-sm">{score}</td>
                      <td className="p-4 font-medium text-emerald-800">{predicate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}