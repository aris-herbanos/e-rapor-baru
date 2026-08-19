'use client';

import { useState, useEffect } from 'react';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [nisn, setNisn] = useState('');
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState('L');
  const [className, setClassName] = useState('7A');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      if (res.ok) setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nisn, fullname, gender, class_name: className }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menyimpan');

      setMessage('Sukses! Data santri berhasil ditambahkan.');
      setNisn('');
      setFullname('');
      setGender('L');
      setClassName('7A');
      fetchStudents();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Data Santri</h1>
          <p className="text-sm text-slate-500 mt-1">Pondok Pesantren Terpadu Ulul Albab</p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.includes('Sukses') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Tambah Santri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 md:col-span-1 h-fit">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Tambah Santri Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NISN / ID Santri</label>
                <input
                  type="text"
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  required
                  placeholder="Contoh: S0241"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap Santri</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  placeholder="Nama lengkap..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Kelamin</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="7A">7A</option>
                  <option value="7B">7B</option>
                  <option value="8A">8A</option>
                  <option value="8B">8B</option>
                  <option value="9A">9A</option>
                  <option value="9B">9B</option>
                  <option value="10A">10A</option>
                  <option value="10B">10B</option>
                  <option value="11A">11A</option>
                  <option value="11B">11B</option>
                  <option value="12A">12A</option>
                  <option value="12B">12B</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#07543f] py-2.5 font-medium text-white hover:bg-[#054131] transition"
              >
                {loading ? 'Menyimpan...' : 'Simpan Santri'}
              </button>
            </form>
          </div>

          {/* Tabel Daftar Santri */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Daftar Santri Terdaftar ({students.length})</h2>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 text-left border-b border-slate-200">
                    <th className="p-3">ID / NISN</th>
                    <th className="p-3">Nama Santri</th>
                    <th className="p-3 text-center">L/P</th>
                    <th className="p-3 text-center">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-slate-500 italic">Belum ada data santri.</td>
                    </tr>
                  ) : (
                    students.map((st) => (
                      <tr key={st.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-3 font-medium text-slate-600">{st.nisn}</td>
                        <td className="p-3 font-semibold text-slate-800">{st.fullname}</td>
                        <td className="p-3 text-center font-medium">
                          <span className={`px-2 py-0.5 rounded text-xs ${st.gender === 'P' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                            {st.gender}
                          </span>
                        </td>
                        <td className="p-3 text-center font-medium text-slate-700">{st.class_name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}