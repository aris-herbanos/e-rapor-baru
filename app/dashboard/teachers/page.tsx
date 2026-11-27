
'use client';

import { useEffect, useMemo, useState, type FormEvent, type ChangeEvent } from 'react';
import {
  AlertCircle,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  GraduationCap,
  IdCard,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react';

type Teacher = {
  id: number;
  identity_number: string;
  fullname: string;
  birth_date?: string | null;
  education?: string | null;
  address?: string | null;
  role: string;
  status: string;
};

const inputClass =
  'w-full rounded border border-[#8c8f94] bg-white px-3 py-2 text-[13px] text-[#2c3338] outline-none transition focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1]';

const buttonPrimary =
  'inline-flex h-[32px] items-center justify-center gap-1.5 rounded border border-[#2271b1] bg-[#2271b1] px-3 text-[12px] font-medium text-white transition hover:border-[#135e96] hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60';

const buttonSecondary =
  'inline-flex h-[32px] items-center justify-center gap-1.5 rounded border border-[#c3c4c7] bg-white px-3 text-[12px] font-medium text-[#2c3338] transition hover:border-[#8c8f94] hover:bg-[#f6f7f7] disabled:opacity-60';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [identityNumber, setIdentityNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Aktif');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  const [search, setSearch] = useState('');

  // =========================================================
  // FORMAT TANGGAL
  // =========================================================

  const formatBirthDate = (value?: string | null) => {
    if (!value) return '';

    const raw = String(value).trim();
    if (!raw) return '';

    if (/[a-zA-Z]/.test(raw) && !/^\d{4}-\d{2}-\d{2}/.test(raw)) {
      return raw;
    }

    const date = new Date(raw);

    if (Number.isNaN(date.getTime())) {
      return raw;
    }

    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setMessage('');

      const res = await fetch('/api/teachers', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal memuat data guru.');
      }

      const teacherData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setTeachers(teacherData);
    } catch (err: any) {
      console.error('Fetch teachers error:', err);
      setMessage(err?.message || 'Gagal memuat data guru.');
    } finally {
      setLoading(false);
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // =========================================================
  // RESET FORM
  // =========================================================

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

  const openAddModal = () => {
    resetForm();
    setMessage('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;

    setIsModalOpen(false);
    resetForm();
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        status,
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
        throw new Error(data?.message || 'Gagal menyimpan data guru.');
      }

      setMessage(
        editingId
          ? 'Sukses! Data guru berhasil diperbarui.'
          : 'Sukses! Ustadz/Guru berhasil ditambahkan.'
      );

      setIsModalOpen(false);
      resetForm();

      await fetchTeachers();
    } catch (err: any) {
      console.error('Submit teacher error:', err);
      setMessage(err?.message || 'Terjadi kesalahan saat menyimpan data guru.');
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // EDIT GURU
  // =========================================================

  const handleEdit = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setIdentityNumber(teacher.identity_number || '');
    setFullname(teacher.fullname || '');

    let normalizedBirthDate = teacher.birth_date || '';

    if (normalizedBirthDate && /^\d{4}-\d{2}-\d{2}/.test(normalizedBirthDate)) {
      normalizedBirthDate = normalizedBirthDate.substring(0, 10);
    }

    setBirthDate(normalizedBirthDate);
    setEducation(teacher.education || '');
    setAddress(teacher.address || '');
    setStatus(teacher.status || 'Aktif');
    setPassword('');
    setMessage('');
    setIsModalOpen(true);
  };

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

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

      setMessage(
        `Sukses! Status akun ${teacher.fullname} diubah menjadi ${newStatus}.`
      );

      await fetchTeachers();
    } catch (err: any) {
      console.error('Toggle status error:', err);
      setMessage(err?.message || 'Gagal mengubah status akun.');
    }
  };

  // =========================================================
  // DELETE SATU
  // =========================================================

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus guru ini? Data yang sudah dihapus tidak dapat dikembalikan.')) {
      return;
    }

    try {
      setMessage('');

      const res = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menghapus data guru.');
      }

      setMessage('Sukses! Data guru berhasil dihapus.');
      await fetchTeachers();
    } catch (err: any) {
      console.error('Delete teacher error:', err);
      setMessage(err?.message || 'Gagal menghapus data guru.');
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredTeachers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return teachers;

    return teachers.filter(
      (teacher) =>
        teacher.fullname?.toLowerCase().includes(keyword) ||
        teacher.identity_number?.toLowerCase().includes(keyword) ||
        teacher.education?.toLowerCase().includes(keyword) ||
        teacher.address?.toLowerCase().includes(keyword) ||
        teacher.birth_date?.toLowerCase().includes(keyword)
    );
  }, [teachers, search]);

  // =========================================================
  // SELECTION
  // =========================================================

  const selectedAll =
    filteredTeachers.length > 0 &&
    filteredTeachers.every((teacher) => selectedIds.includes(teacher.id));

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredTeachers.map((teacher) => teacher.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // =========================================================
  // BULK DELETE
  // =========================================================

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!confirm(`Hapus ${selectedIds.length} data guru terpilih? Data yang sudah dihapus tidak dapat dikembalikan.`)) {
      return;
    }

    try {
      setDeletingBulk(true);
      setMessage('');

      const res = await fetch('/api/teachers/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedIds,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menghapus data guru secara massal.');
      }

      setMessage(`Sukses! ${selectedIds.length} data guru berhasil dihapus.`);
      await fetchTeachers();
    } catch (err: any) {
      console.error('Bulk delete teacher error:', err);
      setMessage(err?.message || 'Terjadi kesalahan saat menghapus data guru.');
    } finally {
      setDeletingBulk(false);
    }
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status !== 'Nonaktif'
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === 'Nonaktif'
  ).length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f0f0f1] px-3 py-5 text-[#1d2327] sm:px-5">

      {/* HEADER */}

      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[23px] font-normal leading-tight text-[#1d2327]">
            Guru 
          </h1>
          <p className="mt-1 text-[12px] text-[#646970]">
            Kelola data tenaga pengajar dan akses akun guru.
          </p>
          <div className="mt-2 text-[11px] text-[#646970]">
            Dashboard <span className="mx-1">›</span> Data Master <span className="mx-1">›</span>{' '}
            <span className="text-[#1d2327]">Guru</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={fetchTeachers}
            disabled={loading}
            className={buttonSecondary}
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className={buttonPrimary}
          >
            <Plus size={14} />
            Tambah Pengajar
          </button>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Pengajar"
          value={totalTeachers}
          description="Semua data guru terdaftar"
        />
        <StatCard
          icon={CheckCircle2}
          label="Akun Aktif"
          value={activeTeachers}
          description="Dapat melakukan login"
        />
        <StatCard
          icon={AlertCircle}
          label="Akun Nonaktif"
          value={inactiveTeachers}
          description="Akses login dinonaktifkan"
        />
      </div>

      {/* MESSAGE */}

      {message && (
        <div
          className={`mb-4 flex items-start gap-2 border-l-4 bg-white px-3 py-2.5 text-[12px] shadow-sm ${
            message.startsWith('Sukses')
              ? 'border-l-[#00a32a] text-[#1d2327]'
              : 'border-l-[#d63638] text-[#1d2327]'
          }`}
        >
          {message.startsWith('Sukses') ? (
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00a32a]" />
          ) : (
            <AlertCircle size={15} className="mt-0.5 shrink-0 text-[#d63638]" />
          )}

          <span className="flex-1">{message}</span>

          <button
            type="button"
            onClick={() => setMessage('')}
            className="text-[#646970] hover:text-[#d63638]"
            aria-label="Tutup pesan"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* TEACHER LIST */}

      <section className="border border-[#c3c4c7] bg-white shadow-sm">

        <div className="flex flex-col justify-between gap-3 border-b border-[#dcdcde] px-3 py-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[14px] font-semibold text-[#1d2327]">
              Daftar Pengajar
            </h2>
            <p className="mt-0.5 text-[11px] text-[#646970]">
              Menampilkan {filteredTeachers.length} dari {teachers.length} data pengajar
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#787c82]"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, NIK, pendidikan..."
                className={`${inputClass} h-[32px] pl-8 sm:w-[260px]`}
              />
            </div>

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={deletingBulk}
                className="inline-flex h-[32px] items-center justify-center gap-1.5 rounded border border-[#d63638] bg-white px-3 text-[12px] font-medium text-[#d63638] hover:bg-[#fcf0f1] disabled:opacity-60"
              >
                {deletingBulk ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
                Hapus ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}

        {loading ? (
          <LoadingState />
        ) : teachers.length === 0 ? (
          <EmptyState onAdd={openAddModal} />
        ) : filteredTeachers.length === 0 ? (
          <SearchEmptyState />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#f6f7f7] text-left">
                    <th className="w-10 border-b border-[#dcdcde] px-3 py-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className="h-3.5 w-3.5 cursor-pointer accent-[#2271b1]"
                        aria-label="Pilih semua pengajar"
                      />
                    </th>
                    <th className="border-b border-[#dcdcde] px-3 py-2.5 font-semibold text-[#50575e]">
                      Identitas
                    </th>
                    <th className="border-b border-[#dcdcde] px-3 py-2.5 font-semibold text-[#50575e]">
                      Nama Pengajar
                    </th>
                    <th className="border-b border-[#dcdcde] px-3 py-2.5 font-semibold text-[#50575e]">
                      Pendidikan
                    </th>
                    <th className="border-b border-[#dcdcde] px-3 py-2.5 font-semibold text-[#50575e]">
                      Alamat
                    </th>
                    <th className="border-b border-[#dcdcde] px-3 py-2.5 font-semibold text-[#50575e]">
                      Status Akun
                    </th>
                    <th className="w-[100px] border-b border-[#dcdcde] px-3 py-2.5 text-right font-semibold text-[#50575e]">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTeachers.map((teacher, index) => {
                    const isChecked = selectedIds.includes(teacher.id);
                    const isInactive = teacher.status === 'Nonaktif';

                    return (
                      <tr
                        key={teacher.id}
                        className={`border-b border-[#f0f0f1] ${
                          isChecked
                            ? 'bg-[#f0f6fc]'
                            : index % 2 === 1
                              ? 'bg-[#fcfcfc]'
                              : 'bg-white'
                        } hover:bg-[#f6f7f7]`}
                      >
                        <td className="px-3 py-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(teacher.id)}
                            className="h-3.5 w-3.5 cursor-pointer accent-[#2271b1]"
                            aria-label={`Pilih ${teacher.fullname}`}
                          />
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="font-medium text-[#2271b1]">
                            {teacher.identity_number || '-'}
                          </div>
                          <div className="mt-0.5 text-[10px] text-[#787c82]">
                            ID #{teacher.id}
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f1] text-[#646970]">
                              <CircleUserRound size={17} />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-[#2271b1]">
                                {teacher.fullname}
                              </div>
                              <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#787c82]">
                                <CalendarDays size={10} />
                                {formatBirthDate(teacher.birth_date) || 'Tanggal lahir belum diisi'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          {teacher.education ? (
                            <span className="text-[#50575e]">
                              {teacher.education}
                            </span>
                          ) : (
                            <span className="italic text-[#a7aaad]">Belum diisi</span>
                          )}
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex max-w-[220px] items-start gap-1.5 text-[#50575e]">
                            <MapPin size={12} className="mt-0.5 shrink-0 text-[#787c82]" />
                            <span className="line-clamp-2 leading-5">
                              {teacher.address || 'Alamat belum diisi'}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-2.5">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(teacher)}
                            className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] font-medium ${
                              isInactive
                                ? 'border-[#f0c4c5] bg-[#fcf0f1] text-[#b32d2e] hover:bg-[#fbe5e7]'
                                : 'border-[#b8e6bf] bg-[#edfaef] text-[#008a20] hover:bg-[#dff5e3]'
                            }`}
                            title="Klik untuk mengubah status login"
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isInactive ? 'bg-[#d63638]' : 'bg-[#00a32a]'
                              }`}
                            />
                            {isInactive ? 'Nonaktif' : 'Aktif'}
                          </button>
                        </td>

                        <td className="px-3 py-2.5">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => handleEdit(teacher)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#c3c4c7] bg-white text-[#50575e] hover:border-[#2271b1] hover:text-[#2271b1]"
                              title="Edit guru"
                            >
                              <Pencil size={13} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(teacher.id)}
                              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#f0c4c5] bg-white text-[#d63638] hover:bg-[#fcf0f1]"
                              title="Hapus guru"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-3 py-2 text-[11px] text-[#646970] sm:flex-row sm:items-center">
              <span>
                Total {filteredTeachers.length} data ditampilkan
              </span>
              <span>
                {selectedIds.length > 0
                  ? `${selectedIds.length} data dipilih`
                  : 'Pilih data untuk tindakan massal'}
              </span>
            </div>
          </>
        )}
      </section>

      {/* MODAL */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-modal-title"
        >
          <button
            type="button"
            aria-label="Tutup modal"
            onClick={closeModal}
            disabled={submitting}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-[650px] flex-col overflow-hidden rounded border border-[#c3c4c7] bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[#dcdcde] bg-[#f6f7f7] px-4 py-3">
              <div>
                <h2
                  id="teacher-modal-title"
                  className="text-[15px] font-semibold text-[#1d2327]"
                >
                  {editingId ? 'Edit Data Guru' : 'Tambah Pengajar'}
                  {editingId && (
                    <span className="ml-2 text-[11px] font-normal text-[#646970]">
                      #{editingId}
                    </span>
                  )}
                </h2>
                <p className="mt-0.5 text-[11px] text-[#646970]">
                  {editingId
                    ? 'Perbarui informasi tenaga pengajar.'
                    : 'Masukkan data pengajar baru ke sistem.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="flex h-7 w-7 items-center justify-center rounded text-[#646970] hover:bg-[#e5e5e5] hover:text-[#d63638] disabled:opacity-50"
                aria-label="Tutup"
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-4 sm:p-5">

                <div className="mb-4 flex items-start gap-2 border-l-4 border-l-[#2271b1] bg-[#f6f7f7] px-3 py-2.5">
                  <BadgeCheck size={16} className="mt-0.5 shrink-0 text-[#2271b1]" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#1d2327]">
                      Informasi Pengajar
                    </p>
                    <p className="mt-0.5 text-[11px] leading-5 text-[#646970]">
                      Data ini digunakan untuk administrasi akademik dan akses akun guru.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

                  <FormInput
                    icon={IdCard}
                    label="NIK / NIP / ID Identitas"
                    value={identityNumber}
                    onChange={setIdentityNumber}
                    placeholder="Contoh: 3301xxxxxxxxxxxx"
                    required
                  />

                  <FormInput
                    icon={UserRound}
                    label="Nama Lengkap & Gelar"
                    value={fullname}
                    onChange={setFullname}
                    placeholder="Contoh: Ustadz Ahmad, S.Pd.I"
                    required
                  />

                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <FormInput
                    icon={GraduationCap}
                    label="Pendidikan Terakhir"
                    value={education}
                    onChange={setEducation}
                    placeholder="Contoh: S1 Pendidikan Agama Islam"
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                      Alamat
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Masukkan alamat domisili lengkap..."
                      rows={3}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-[#1d2327]">
                      Status Akun Login
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`${inputClass} appearance-none pr-8`}
                      >
                        <option value="Aktif">Aktif — Bisa Login</option>
                        <option value="Nonaktif">Nonaktif — Blokir Sementara</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#646970]"
                      />
                    </div>
                  </div>

                  {!editingId && (
                    <FormInput
                      icon={ShieldCheck}
                      label="Password Akun"
                      value={password}
                      onChange={setPassword}
                      placeholder="Minimal 6 karakter"
                      type="password"
                      required
                    />
                  )}
                </div>

                {/* MODAL FOOTER */}

                <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#dcdcde] pt-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className={buttonSecondary}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={buttonPrimary}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Menyimpan...
                      </>
                    ) : editingId ? (
                      <>
                        <Check size={14} />
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Simpan Pengajar
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: any;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="border border-[#c3c4c7] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] text-[#646970]">{label}</p>
          <p className="mt-1 text-[23px] font-semibold leading-none text-[#1d2327]">
            {value}
          </p>
          <p className="mt-1 text-[10px] text-[#787c82]">{description}</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#f0f0f1] text-[#646970]">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FORM INPUT
// ============================================================

function FormInput({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-[12px] font-medium text-[#1d2327]">
        <Icon size={13} className="text-[#646970]" />
        {label}
        {required && <span className="text-[#d63638]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

// ============================================================
// LOADING
// ============================================================

function LoadingState() {
  return (
    <div className="flex min-h-[230px] flex-col items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#2271b1]" />
      <p className="mt-3 text-[12px] text-[#646970]">
        Memuat data pengajar...
      </p>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex min-h-[230px] flex-col items-center justify-center px-5 text-center">
      <GraduationCap size={30} className="text-[#a7aaad]" />
      <h3 className="mt-3 text-[14px] font-semibold text-[#1d2327]">
        Belum Ada Pengajar
      </h3>
      <p className="mt-1 text-[11px] text-[#646970]">
        Belum terdapat data guru atau ustadz yang terdaftar dalam sistem.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className={`${buttonPrimary} mt-3`}
      >
        <Plus size={13} />
        Tambah Pengajar
      </button>
    </div>
  );
}

// ============================================================
// SEARCH EMPTY
// ============================================================

function SearchEmptyState() {
  return (
    <div className="flex min-h-[230px] flex-col items-center justify-center px-5 text-center">
      <Search size={27} className="text-[#a7aaad]" />
      <h3 className="mt-3 text-[14px] font-semibold text-[#1d2327]">
        Data Tidak Ditemukan
      </h3>
      <p className="mt-1 text-[11px] text-[#646970]">
        Coba gunakan nama, ID, pendidikan, tanggal lahir, atau alamat yang berbeda.
      </p>
    </div>
  );
}
