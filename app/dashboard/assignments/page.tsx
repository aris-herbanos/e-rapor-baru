'use client';

import { useState, useEffect } from 'react';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [teacherId, setTeacherId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [className, setClassName] = useState('7A');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [resAssig, resTeach, resSubj] = await Promise.all([
        fetch('/api/assignments'),
        fetch('/api/teachers'), // pastikan endpoint guru tersedia atau sesuaikan
        fetch('/api/subjects')   // pastikan endpoint mapel tersedia atau sesuaikan
      ]);
      
      const dataAssig = await resAssig.json();
      if (resAssig.ok) setAssignments(dataAssig);

      if (resTeach.ok) {
        const dataTeach = await resTeach.json();
        setTeachers(dataTeach);
      }

      if (resSubj.ok) {
        const dataSubj = await resSubj.json();
        setSubjects(dataSubj);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, subjectId, className }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan');

      setMessage('Sukses! Penugasan guru berhasil ditambahkan.');
      setTeacherId('');
      setSubjectId('');
      setClassName('7A');
      fetchData();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Penugasan Guru Pengampu</h1>
          <p className="text-sm text-slate-500 mt-1">Pondok Pesantren Terpadu Ulul Albab</p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.includes('Sukses') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Tambah Penugasan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 md:col-span-1 h-fit">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Tambah Penugasan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Ustadz / Guru</label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 text-sm"
                >
                  <option value="">-- Pilih Guru --</option>
                  {teachers.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.fullname}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 text-sm"
                >
                  <option value="">-- Pilih Mapel --</option>
                  {subjects.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kelas Target</label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 text-sm"
                >
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                  <option value="9A">9A</option>
                  <option value="9B">9B</option>
                  <option value="10A">10A</option>
                  <option value="11A">11A</option>
                  <option value="12A">12A</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#07543f] py-2.5 font-medium text-white hover:bg-[#054131] transition text-sm"
              >
                {loading ? 'Menyimpan...' : 'Simpan Penugasan'}
              </button>
            </form>
          </div>

          {/* Daftar Penugasan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Daftar Penugasan Guru ({assignments.length})</h2>
            <div className="space-y-3 max-h-[450px] overflow-y-auto">
              {assignments.length === 0 ? (
                <p className="text-sm text-slate-500">Belum ada penugasan guru yang tercatat.</p>
              ) : (
                assignments.map((asg) => (
                  <div key={asg.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-800">{asg.teacher?.fullname || 'Guru'}</div>
                      <div className="text-xs text-slate-600 mt-0.5">Mapel: <span className="font-medium text-emerald-700">{asg.subject?.name}</span></div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                        Kelas {asg.className}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}