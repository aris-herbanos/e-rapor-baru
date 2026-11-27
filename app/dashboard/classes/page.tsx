
'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Search,
  Edit3,
  GraduationCap,
  Plus,
  Save,
  School,
  Trash2,
  Users,
  X,
  AlertTriangle,
  Layers3,
  RefreshCw,
} from 'lucide-react';

type ClassRoom = {
  id: number;
  name: string;
  level: string;
  grade: number;
  status?: string;
};

type MessageType = 'success' | 'error' | '';

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('7');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const getLevelByGrade = (value: number) => {
    return value >= 10 ? 'SMA' : 'SMP';
  };

  const showMessage = (
    text: string,
    type: MessageType = 'success'
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchClasses = async () => {
    setFetching(true);

    try {
      const res = await fetch('/api/classes', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal memuat kelas.');
      }

      if (Array.isArray(data)) {
        setClasses(data);
      }
    } catch (error) {
      console.error('FETCH CLASSES ERROR:', error);
      showMessage('Gagal memuat daftar kelas.', 'error');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const resetForm = () => {
    setName('');
    setGrade('7');
    setEditingId(null);
  };

  const handleEdit = (item: ClassRoom) => {
    setEditingId(item.id);
    setName(item.name);
    setGrade(String(item.grade));
    setMessage('');
    setMessageType('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim().toUpperCase();
    const numericGrade = Number(grade);

    if (!trimmedName) {
      showMessage('Nama kelas wajib diisi.', 'error');
      return;
    }

    if (
      !Number.isInteger(numericGrade) ||
      numericGrade < 7 ||
      numericGrade > 12
    ) {
      showMessage('Tingkat kelas harus antara 7 sampai 12.', 'error');
      return;
    }

    setLoading(true);

    try {
      const url = editingId
        ? `/api/classes/${editingId}`
        : '/api/classes';

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          level: getLevelByGrade(numericGrade),
          grade: numericGrade,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            (editingId
              ? 'Gagal memperbarui kelas.'
              : 'Gagal menambahkan kelas.')
        );
      }

      showMessage(
        editingId
          ? 'Data kelas berhasil diperbarui.'
          : 'Kelas baru berhasil ditambahkan.',
        'success'
      );

      resetForm();
      await fetchClasses();
    } catch (error) {
      console.error('SAVE CLASS ERROR:', error);

      showMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: ClassRoom) => {
    const confirmed = window.confirm(
      `Hapus kelas ${item.name}?\n\nPastikan kelas ini tidak sedang digunakan oleh data akademik.`
    );

    if (!confirmed) return;

    setDeletingId(item.id);

    try {
      const res = await fetch(`/api/classes/${item.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Gagal menghapus kelas.');
      }

      if (editingId === item.id) {
        resetForm();
      }

      showMessage(`Kelas ${item.name} berhasil dihapus.`, 'success');
      await fetchClasses();
    } catch (error) {
      console.error('DELETE CLASS ERROR:', error);

      showMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus kelas.',
        'error'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!classes.length) {
      showMessage('Tidak ada kelas untuk dihapus.', 'error');
      return;
    }

    const confirmed = window.confirm(
      `PERINGATAN!\n\nAnda akan menghapus seluruh ${classes.length} kelas.\n\nTindakan ini tidak dapat dibatalkan. Lanjutkan?`
    );

    if (!confirmed) return;

    const confirmedAgain = window.confirm(
      'Konfirmasi terakhir:\n\nApakah Anda benar-benar yakin ingin menghapus seluruh data kelas?'
    );

    if (!confirmedAgain) return;

    setDeletingAll(true);

    try {
      const res = await fetch('/api/classes', {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menghapus seluruh kelas.'
        );
      }

      resetForm();
      showMessage('Seluruh data kelas berhasil dihapus.', 'success');

      await fetchClasses();
    } catch (error) {
      console.error('DELETE ALL ERROR:', error);

      showMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menghapus seluruh kelas.',
        'error'
      );
    } finally {
      setDeletingAll(false);
    }
  };

  const groupedClasses = useMemo(() => {
    const sorted = [...classes].sort(
      (a, b) =>
        Number(a.grade) - Number(b.grade) ||
        a.name.localeCompare(b.name)
    );

    return {
      SMP: sorted.filter(
        item => Number(item.grade) >= 7 && Number(item.grade) <= 9
      ),
      SMA: sorted.filter(
        item => Number(item.grade) >= 10 && Number(item.grade) <= 12
      ),
    };
  }, [classes]);

  const filteredClasses = useMemo(() => {
    return classes.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        String(item.grade).includes(search);

      const matchesLevel =
        filterLevel === 'Semua' ||
        getLevelByGrade(Number(item.grade)) === filterLevel;

      return matchesSearch && matchesLevel;
    }).sort(
      (a, b) =>
        Number(a.grade) - Number(b.grade) ||
        a.name.localeCompare(b.name)
    );
  }, [classes, search, filterLevel]);

  const activeClasses = classes.filter(
    item => item.status !== 'Tidak Aktif'
  ).length;

  const totalSMP = groupedClasses.SMP.length;
  const totalSMA = groupedClasses.SMA.length;

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327]">

      {/* HEADER WORDPRESS */}

      <div className="border-b border-[#dcdcde] bg-white">
        <div className="px-4 py-4 sm:px-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-[#646970]">
                <span>Data Master</span>
                <span>/</span>
                <span>Struktur Akademik</span>
              </div>

              <h1 className="text-xl font-semibold tracking-tight">
                Manajemen Kelas
              </h1>

              <p className="mt-1 text-xs text-[#646970]">
                Tambah, lihat, dan kelola kelas santri.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchClasses}
              disabled={fetching}
              className="inline-flex h-9 items-center gap-2 rounded border border-[#c3c4c7] bg-white px-3 text-xs font-medium text-[#2c3338] hover:bg-[#f6f7f7] disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={fetching ? 'animate-spin' : ''}
              />
              Muat Ulang
            </button>

          </div>
        </div>
      </div>

      {/* MAIN */}

      <main className="space-y-4 p-4 sm:p-6">

        {/* NOTIFICATION */}

        {message && (
          <div
            className={`flex items-center justify-between gap-3 rounded border px-4 py-3 text-sm ${
              messageType === 'success'
                ? 'border-[#c3e6cb] bg-[#edfaef] text-[#176b32]'
                : 'border-[#f0c5c5] bg-[#fcf0f1] text-[#b32d2e]'
            }`}
          >
            <div className="flex items-center gap-2">
              {messageType === 'success' ? (
                <CheckCircle2 size={17} />
              ) : (
                <AlertTriangle size={17} />
              )}
              <span>{message}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMessage('');
                setMessageType('');
              }}
              className="shrink-0 opacity-70 hover:opacity-100"
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* SUMMARY */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          {[
            {
              label: 'Total Kelas',
              value: classes.length,
              icon: Layers3,
              color: 'text-[#2271b1]',
              bg: 'bg-[#eaf3f9]',
            },
            {
              label: 'Jenjang SMP',
              value: totalSMP,
              icon: School,
              color: 'text-emerald-700',
              bg: 'bg-emerald-50',
            },
            {
              label: 'Jenjang SMA',
              value: totalSMA,
              icon: GraduationCap,
              color: 'text-amber-700',
              bg: 'bg-amber-50',
            },
            {
              label: 'Kelas Aktif',
              value: activeClasses,
              icon: CheckCircle2,
              color: 'text-emerald-700',
              bg: 'bg-emerald-50',
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded border border-[#dcdcde] bg-white p-3"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${item.bg} ${item.color}`}>
                  <Icon size={18} />
                </div>

                <div>
                  <div className="text-xl font-semibold leading-6">
                    {item.value}
                  </div>
                  <div className="text-[11px] text-[#646970]">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* FORM + LIST */}

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">

          {/* FORM */}

          <section className="overflow-hidden rounded border border-[#dcdcde] bg-white">

            <div className="flex items-center justify-between border-b border-[#dcdcde] px-4 py-3">
              <div>
                <h2 className="text-sm font-semibold">
                  {editingId ? 'Edit Kelas' : 'Tambah Kelas'}
                </h2>
                <p className="mt-0.5 text-[11px] text-[#646970]">
                  Isi informasi kelas di bawah.
                </p>
              </div>

              {editingId ? (
                <Edit3 size={17} className="text-amber-600" />
              ) : (
                <Plus size={18} className="text-[#2271b1]" />
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">

              <div>
                <label
                  htmlFor="class-name"
                  className="mb-1.5 block text-xs font-medium"
                >
                  Nama Kelas
                </label>

                <input
                  id="class-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  maxLength={30}
                  placeholder="Contoh: 7A"
                  className="h-9 w-full rounded border border-[#8c8f94] bg-white px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />

                <p className="mt-1 text-[10px] text-[#646970]">
                  Contoh penulisan: 7A, 7B, 8A.
                </p>
              </div>

              <div>
                <label
                  htmlFor="class-grade"
                  className="mb-1.5 block text-xs font-medium"
                >
                  Tingkat Pendidikan
                </label>

                <select
                  id="class-grade"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  className="h-9 w-full rounded border border-[#8c8f94] bg-white px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                >
                  {['7', '8', '9', '10', '11', '12'].map(item => (
                    <option key={item} value={item}>
                      Kelas {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded border border-[#dcdcde] bg-[#f6f7f7] p-3">
                <div className="text-[11px] text-[#646970]">
                  Jenjang pendidikan
                </div>

                <div className="mt-1 flex items-center gap-2">
                  {Number(grade) >= 10 ? (
                    <GraduationCap size={17} className="text-amber-700" />
                  ) : (
                    <School size={17} className="text-emerald-700" />
                  )}

                  <span className="text-sm font-semibold">
                    {getLevelByGrade(Number(grade))}
                  </span>

                  <span className="text-[10px] text-[#646970]">
                    (Ditentukan otomatis)
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-[#646970]">
                  Kelas 7–9 termasuk SMP. Kelas 10–12 termasuk SMA.
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading || deletingAll}
                  className={`inline-flex h-9 flex-1 items-center justify-center gap-2 rounded px-3 text-xs font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    editingId
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-[#2271b1] hover:bg-[#135e96]'
                  }`}
                >
                  {loading ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : editingId ? (
                    <Save size={14} />
                  ) : (
                    <Plus size={14} />
                  )}

                  {loading
                    ? 'Menyimpan...'
                    : editingId
                      ? 'Simpan Perubahan'
                      : 'Tambah Kelas'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="inline-flex h-9 items-center justify-center gap-1 rounded border border-[#c3c4c7] px-3 text-xs text-[#50575e] hover:bg-[#f6f7f7]"
                  >
                    <X size={14} />
                    Batal
                  </button>
                )}
              </div>

            </form>

          </section>

          {/* CLASS LIST */}

          <section className="min-w-0 overflow-hidden rounded border border-[#dcdcde] bg-white">

            {/* LIST HEADER */}

            <div className="flex flex-col gap-3 border-b border-[#dcdcde] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Daftar Kelas
                </h2>
                <p className="mt-0.5 text-[11px] text-[#646970]">
                  Kelola seluruh kelas yang sudah terdaftar.
                </p>
              </div>

              {classes.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteAll}
                  disabled={deletingAll || deletingId !== null}
                  className="inline-flex h-8 items-center justify-center gap-1.5 self-start rounded border border-[#d63638] px-3 text-[11px] font-medium text-[#d63638] hover:bg-[#fcf0f1] disabled:opacity-50 sm:self-auto"
                >
                  <Trash2 size={13} />
                  {deletingAll ? 'Menghapus...' : 'Hapus Semua'}
                </button>
              )}

            </div>

            {/* SEARCH & FILTER */}

            <div className="flex flex-col gap-2 border-b border-[#dcdcde] bg-[#f6f7f7] p-3 sm:flex-row">

              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Cari nama kelas atau tingkat..."
                  className="h-9 w-full rounded border border-[#c3c4c7] bg-white pl-9 pr-3 text-xs outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>

              <select
                value={filterLevel}
                onChange={e => setFilterLevel(e.target.value)}
                className="h-9 rounded border border-[#c3c4c7] bg-white px-3 text-xs outline-none focus:border-[#2271b1]"
              >
                <option value="Semua">Semua Jenjang</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>

            </div>

            {/* TABLE */}

            {fetching ? (
              <div className="flex items-center justify-center gap-2 py-14 text-xs text-[#646970]">
                <RefreshCw size={16} className="animate-spin" />
                Memuat daftar kelas...
              </div>
            ) : filteredClasses.length === 0 ? (
              <div className="px-4 py-14 text-center">
                <School
                  size={32}
                  className="mx-auto mb-3 text-[#a7aaad]"
                  strokeWidth={1.5}
                />

                <p className="text-sm font-medium text-[#50575e]">
                  {classes.length === 0
                    ? 'Belum ada kelas'
                    : 'Kelas tidak ditemukan'}
                </p>

                <p className="mt-1 text-xs text-[#646970]">
                  {classes.length === 0
                    ? 'Silakan tambahkan kelas melalui formulir.'
                    : 'Coba gunakan kata kunci pencarian yang berbeda.'}
                </p>
              </div>
            ) : (
              <>
                {/* TABLE DESKTOP */}

                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full border-collapse text-left text-xs">

                    <thead>
                      <tr className="border-b border-[#dcdcde] bg-[#f6f7f7] text-[10px] font-semibold uppercase tracking-wide text-[#646970]">
                        <th className="px-4 py-3">No.</th>
                        <th className="px-4 py-3">Nama Kelas</th>
                        <th className="px-4 py-3">Jenjang</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Tindakan</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredClasses.map((cls, index) => {
                        const isActive = cls.status !== 'Tidak Aktif';
                        const isDeleting = deletingId === cls.id;
                        const isSMA = Number(cls.grade) >= 10;

                        return (
                          <tr
                            key={cls.id}
                            className="border-b border-[#f0f0f1] transition hover:bg-[#f6f7f7]"
                          >
                            <td className="w-12 px-4 py-3 text-[#646970]">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3">
                              <div className="font-semibold text-[#2271b1]">
                                {cls.name}
                              </div>
                              <div className="mt-0.5 text-[10px] text-[#646970]">
                                Tingkat {cls.grade}
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-medium ${
                                isSMA
                                  ? 'bg-amber-50 text-amber-800'
                                  : 'bg-emerald-50 text-emerald-800'
                              }`}>
                                {isSMA ? (
                                  <GraduationCap size={12} />
                                ) : (
                                  <School size={12} />
                                )}
                                {getLevelByGrade(Number(cls.grade))}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1.5 text-[10px] ${
                                isActive
                                  ? 'text-emerald-700'
                                  : 'text-[#646970]'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  isActive ? 'bg-emerald-500' : 'bg-[#a7aaad]'
                                }`} />
                                {isActive ? 'Aktif' : 'Tidak Aktif'}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1">

                                <button
                                  type="button"
                                  onClick={() => handleEdit(cls)}
                                  disabled={isDeleting || deletingAll}
                                  title="Edit kelas"
                                  className="flex h-8 w-8 items-center justify-center rounded text-[#646970] hover:bg-[#f0f6fc] hover:text-[#2271b1] disabled:opacity-40"
                                >
                                  <Edit3 size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(cls)}
                                  disabled={isDeleting || deletingAll}
                                  title="Hapus kelas"
                                  className="flex h-8 w-8 items-center justify-center rounded text-[#646970] hover:bg-[#fcf0f1] hover:text-[#d63638] disabled:opacity-40"
                                >
                                  {isDeleting ? (
                                    <RefreshCw size={14} className="animate-spin" />
                                  ) : (
                                    <Trash2 size={15} />
                                  )}
                                </button>

                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                  </table>
                </div>

                {/* MOBILE */}

                <div className="divide-y divide-[#f0f0f1] sm:hidden">
                  {filteredClasses.map(cls => {
                    const isActive = cls.status !== 'Tidak Aktif';
                    const isSMA = Number(cls.grade) >= 10;
                    const isDeleting = deletingId === cls.id;

                    return (
                      <div key={cls.id} className="p-3">
                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">
                            <div className="font-semibold text-sm">
                              {cls.name}
                            </div>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[#646970]">
                              <span>Tingkat {cls.grade}</span>
                              <span>•</span>
                              <span>{getLevelByGrade(Number(cls.grade))}</span>
                              <span>•</span>
                              <span className={isActive ? 'text-emerald-700' : ''}>
                                {isActive ? 'Aktif' : 'Tidak Aktif'}
                              </span>
                            </div>
                          </div>

                          <div className="flex shrink-0 gap-1">
                            <button
                              type="button"
                              onClick={() => handleEdit(cls)}
                              disabled={isDeleting || deletingAll}
                              aria-label={`Edit kelas ${cls.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded border border-[#dcdcde] text-[#646970]"
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(cls)}
                              disabled={isDeleting || deletingAll}
                              aria-label={`Hapus kelas ${cls.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded border border-[#dcdcde] text-[#d63638]"
                            >
                              {isDeleting ? (
                                <RefreshCw size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* FOOTER */}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-3 text-[10px] text-[#646970]">
              <span>
                Menampilkan {filteredClasses.length} dari {classes.length} kelas
              </span>

              <span>
                SMP: {totalSMP} · SMA: {totalSMA}
              </span>
            </div>

          </section>

        </div>

        {/* INFORMATION */}

        <div className="flex items-start gap-2 rounded border border-[#c3c4c7] bg-white px-4 py-3 text-[11px] text-[#646970]">
          <BookOpen size={15} className="mt-0.5 shrink-0 text-[#2271b1]" />
          <p className="leading-5">
            <strong className="text-[#2c3338]">Informasi:</strong>{' '}
            Jenjang ditentukan otomatis berdasarkan tingkat kelas.
            Tingkat 7–9 termasuk SMP, sedangkan tingkat 10–12 termasuk SMA.
            Data jumlah santri belum ditampilkan karena endpoint kelas yang
            digunakan saat ini tidak menyediakan jumlah santri.
          </p>
        </div>

      </main>
    </div>
  );
}
