'use client';

import { useEffect, useState } from 'react';

type Teacher = {
  id: number;
  identity_number: string;
  fullname: string;
  birth_date?: string | null;
  education?: string | null;
  address?: string | null;
  role: string;
  status: string; // Tambahan status akun
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // =========================
  // FORM STATE
  // =========================
  const [identityNumber, setIdentityNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Aktif'); // State status form

  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // BULK SELECTION
  // =========================
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  // =========================
  // FETCH DATA GURU
  // =========================
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setMessage('');

      const res = await fetch('/api/teachers', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || 'Gagal memuat data guru.'
        );
      }

      setTeachers(
        Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : []
      );
    } catch (err: any) {
      console.error('Fetch teachers error:', err);
      setMessage(
        err?.message || 'Gagal memuat data guru.'
      );
    } finally {
      setLoading(false);
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setIdentityNumber('');
    setFullname('');
    setBirthDate('');
    setEducation('');
    setAddress('');
    setPassword('');
    setStatus('Aktif');
    setEditingId(null);
  };

  // =========================
  // SUBMIT FORM
  // TAMBAH / EDIT
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage('');
    setSubmitting(true);

    try {
      const url = editingId
        ? `/api/teachers/${editingId}`
        : '/api/teachers';

      const method = editingId ? 'PUT' : 'POST';

      const payload: {
        identity_number: string;
        fullname: string;
        birth_date: string;
        education: string;
        address: string;
        status: string;
        password?: string;
      } = {
        identity_number: identityNumber.trim(),
        fullname: fullname.trim(),
        birth_date: birthDate.trim(),
        education: education.trim(),
        address: address.trim(),
        status: status,
      };

      if (!editingId) {
        payload.password = password;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal menyimpan data guru.'
        );
      }

      setMessage(
        editingId
          ? 'Sukses! Data guru berhasil diperbarui.'
          : 'Sukses! Ustadz/Guru berhasil ditambahkan.'
      );

      resetForm();
      await fetchTeachers();
    } catch (err: any) {
      console.error('Submit teacher error:', err);

      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menyimpan data guru.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT GURU
  // =========================
  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);

    setIdentityNumber(
      teacher.identity_number || ''
    );

    setFullname(
      teacher.fullname || ''
    );

    setBirthDate(
      teacher.birth_date || ''
    );

    setEducation(
      teacher.education || ''
    );

    setAddress(
      teacher.address || ''
    );

    setStatus(
      teacher.status || 'Aktif'
    );

    setPassword('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =========================
  // TOGGLE STATUS (AKTIF / NONAKTIF)
  // =========================
  const handleToggleStatus = async (teacher: Teacher) => {
    try {
      const newStatus = teacher.status === 'Nonaktif' ? 'Aktif' : 'Nonaktif';
      setMessage('');

      const res = await fetch(`/api/teachers/${teacher.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity_number: teacher.identity_number,
          fullname: teacher.fullname,
          birth_date: teacher.birth_date,
          education: teacher.education,
          address: teacher.address,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal mengubah status akun guru.');
      }

      setMessage(`Sukses! Status akun ${teacher.fullname} diubah menjadi ${newStatus}.`);
      await fetchTeachers();
    } catch (err: any) {
      console.error('Toggle status error:', err);
      setMessage(err?.message || 'Gagal mengubah status akun.');
    }
  };

  // =========================
  // DELETE SATU GURU
  // =========================
  const handleDelete = async (id: number) => {
    if (
      !confirm(
        'Yakin ingin menghapus guru ini? Data yang sudah dihapus tidak dapat dikembalikan.'
      )
    ) {
      return;
    }

    try {
      setMessage('');

      const res = await fetch(
        `/api/teachers/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal menghapus data guru.'
        );
      }

      setMessage(
        'Sukses! Data guru berhasil dihapus.'
      );

      await fetchTeachers();
    } catch (err: any) {
      console.error('Delete teacher error:', err);

      setMessage(
        err?.message ||
          'Gagal menghapus data guru.'
      );
    }
  };

  // =========================
  // SELECT ALL
  // =========================
  const handleSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedIds(
        teachers.map((teacher) => teacher.id)
      );
    } else {
      setSelectedIds([]);
    }
  };

  // =========================
  // SELECT SATU
  // =========================
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // =========================
  // DELETE MASSAL
  // =========================
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    if (
      !confirm(
        `Hapus ${selectedIds.length} data guru terpilih? Data yang sudah dihapus tidak dapat dikembalikan.`
      )
    ) {
      return;
    }

    try {
      setDeletingBulk(true);
      setMessage('');

      const res = await fetch(
        '/api/teachers/bulk',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal menghapus data guru secara massal.'
        );
      }

      setMessage(
        `Sukses! ${selectedIds.length} data guru berhasil dihapus.`
      );

      await fetchTeachers();
    } catch (err: any) {
      console.error(
        'Bulk delete teacher error:',
        err
      );

      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menghapus data guru.'
      );
    } finally {
      setDeletingBulk(false);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-800 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <header className="rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-100">
            Data Master
          </span>

          <h1 className="text-xl font-bold tracking-tight sm:text-2xl mt-1">
            Guru & Ustadz
          </h1>

          <p className="text-xs text-emerald-50/80 mt-1">
            Kelola data tenaga pengajar, pendidikan, alamat, status akun, edit, hapus satuan, dan hapus massal.
          </p>
        </div>
      </header>

      {/* MESSAGE */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm border font-medium ${
            message.startsWith('Sukses')
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* FORM TAMBAH / EDIT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">

          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-slate-800 text-sm">
              {editingId
                ? 'Edit Data Guru'
                : 'Tambah Pengajar Baru'}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Batal
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NIK / NIP */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIK / NIP / ID Identitas
              </label>

              <input
                type="text"
                value={identityNumber}
                onChange={(e) =>
                  setIdentityNumber(
                    e.target.value
                  )
                }
                required
                placeholder="Contoh: 3301xxxxxxxxxxxx"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* NAMA */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap & Gelar
              </label>

              <input
                type="text"
                value={fullname}
                onChange={(e) =>
                  setFullname(
                    e.target.value
                  )
                }
                required
                placeholder="Contoh: Ustadz Ahmad, S.Pd.I"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* TANGGAL LAHIR */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Lahir
              </label>

              <input
                type="text"
                value={birthDate}
                onChange={(e) =>
                  setBirthDate(
                    e.target.value
                  )
                }
                placeholder="Contoh: 15 Agustus 1990"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* PENDIDIKAN TERAKHIR */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pendidikan Terakhir
              </label>

              <input
                type="text"
                value={education}
                onChange={(e) =>
                  setEducation(
                    e.target.value
                  )
                }
                placeholder="Contoh: S1 Pendidikan Agama Islam"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* ALAMAT */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat
              </label>

              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                placeholder="Alamat domisili"
                rows={2}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 resize-none"
              />
            </div>

            {/* STATUS AKUN */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status Akun Login
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 bg-white"
              >
                <option value="Aktif">Aktif (Bisa Login)</option>
                <option value="Nonaktif">Nonaktif (Blokir Sementara)</option>
              </select>
            </div>

            {/* PASSWORD */}
            {!editingId && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password Akun
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow transition text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting
                ? 'Menyimpan...'
                : editingId
                ? 'Simpan Perubahan'
                : 'Simpan Pengajar'}
            </button>

          </form>
        </div>

        {/* DAFTAR GURU */}
        <div className="lg:col-span-2 space-y-4">

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
            <h2 className="font-bold text-slate-800 text-sm">
              Daftar Pengajar Terdaftar ({teachers.length})
            </h2>

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={deletingBulk}
                className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5 disabled:opacity-60"
              >
                {deletingBulk
                  ? 'Menghapus...'
                  : `🗑️ Hapus Terpilih (${selectedIds.length})`}
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">
                Memuat data guru...
              </div>
            ) : teachers.length === 0 ? (
              <div className="p-12 text-center text-sm text-slate-400">
                Belum ada data guru terdaftar.
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full text-left border-collapse text-xs">

                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedIds.length ===
                              teachers.length &&
                            teachers.length > 0
                          }
                          onChange={
                            handleSelectAll
                          }
                          className="rounded text-emerald-600 cursor-pointer"
                        />
                      </th>
                      <th className="p-3">ID / NIK</th>
                      <th className="p-3">Nama</th>
                      <th className="p-3">Pendidikan</th>
                      <th className="p-3">Status Login</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-slate-700">

                    {teachers.map((teacher) => {
                      const isChecked =
                        selectedIds.includes(
                          teacher.id
                        );

                      return (
                        <tr
                          key={teacher.id}
                          className={`hover:bg-slate-50/80 ${
                            isChecked
                              ? 'bg-emerald-50/40'
                              : ''
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleSelectOne(
                                  teacher.id
                                )
                              }
                              className="rounded text-emerald-600 cursor-pointer"
                            />
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-emerald-700">
                              #{teacher.id}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {teacher.identity_number || '-'}
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-800">
                              {teacher.fullname}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {teacher.birth_date || '-'}
                            </div>
                          </td>

                          <td className="p-3">
                            {teacher.education ? (
                              <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-100">
                                {teacher.education}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          {/* TOMBOL TOGGLE STATUS LOGIN */}
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(teacher)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition shadow-sm ${
                                teacher.status === 'Nonaktif'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              }`}
                              title="Klik untuk mengubah status login"
                            >
                              {teacher.status === 'Nonaktif' ? '🔴 Nonaktif' : '🟢 Aktif'}
                            </button>
                          </td>

                          <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  teacher
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold hover:bg-amber-100 transition"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  teacher.id
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition"
                            >
                              Hapus
                            </button>
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}