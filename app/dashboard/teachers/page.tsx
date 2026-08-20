'use client';

import { useEffect, useMemo, useState } from 'react';
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

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // =========================================================
  // MODAL
  // =========================================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [identityNumber, setIdentityNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Aktif');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // BULK SELECTION
  // =========================================================

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  // =========================================================
  // SEARCH
  // =========================================================

  const [search, setSearch] = useState('');

  // =========================================================
  // FORMAT TANGGAL
  // =========================================================

  const formatBirthDate = (
    value?: string | null
  ) => {
    if (!value) return '';

    const raw = String(value).trim();

    if (!raw) return '';

    /*
     * Jika API sudah mengirim format:
     * 15 Agustus 1990
     * maka langsung tampilkan.
     */
    if (
      /[a-zA-Z]/.test(raw) &&
      !/^\d{4}-\d{2}-\d{2}/.test(raw)
    ) {
      return raw;
    }

    /*
     * Jika database mengirim:
     * 1990-08-15
     * atau ISO datetime.
     */
    const date = new Date(raw);

    if (Number.isNaN(date.getTime())) {
      return raw;
    }

    return new Intl.DateTimeFormat(
      'id-ID',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ).format(date);
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
        throw new Error(
          data?.message ||
            'Gagal memuat data guru.'
        );
      }

      const teacherData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setTeachers(teacherData);
    } catch (err: any) {
      console.error(
        'Fetch teachers error:',
        err
      );

      setMessage(
        err?.message ||
          'Gagal memuat data guru.'
      );
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

  // =========================================================
  // OPEN ADD MODAL
  // =========================================================

  const openAddModal = () => {
    resetForm();
    setMessage('');
    setIsModalOpen(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (submitting) return;

    setIsModalOpen(false);
    resetForm();
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

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

      const method = editingId
        ? 'PUT'
        : 'POST';

      const payload: {
        identity_number: string;
        fullname: string;
        birth_date: string;
        education: string;
        address: string;
        status: string;
        password?: string;
      } = {
        identity_number:
          identityNumber.trim(),

        fullname:
          fullname.trim(),

        birth_date:
          birthDate.trim(),

        education:
          education.trim(),

        address:
          address.trim(),

        status,
      };

      /*
       * Password hanya dikirim ketika
       * menambah guru baru.
       */
      if (!editingId) {
        payload.password =
          password;
      }

      const res = await fetch(
        url,
        {
          method,
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await res.json();

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

      setIsModalOpen(false);

      resetForm();

      await fetchTeachers();
    } catch (err: any) {
      console.error(
        'Submit teacher error:',
        err
      );

      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menyimpan data guru.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // EDIT GURU
  // =========================================================

  const handleEdit = (
    teacher: Teacher
  ) => {
    setEditingId(
      teacher.id
    );

    setIdentityNumber(
      teacher.identity_number ||
        ''
    );

    setFullname(
      teacher.fullname ||
        ''
    );

    /*
     * Penting:
     * Untuk field tanggal input,
     * kita normalisasi jika database
     * mengirim ISO datetime.
     */
    let normalizedBirthDate =
      teacher.birth_date || '';

    if (
      normalizedBirthDate &&
      /^\d{4}-\d{2}-\d{2}/.test(
        normalizedBirthDate
      )
    ) {
      normalizedBirthDate =
        normalizedBirthDate.substring(
          0,
          10
        );
    }

    setBirthDate(
      normalizedBirthDate
    );

    setEducation(
      teacher.education ||
        ''
    );

    setAddress(
      teacher.address ||
        ''
    );

    setStatus(
      teacher.status ||
        'Aktif'
    );

    setPassword('');

    setMessage('');

    setIsModalOpen(true);
  };

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  const handleToggleStatus =
    async (
      teacher: Teacher
    ) => {
      try {
        const newStatus =
          teacher.status ===
          'Nonaktif'
            ? 'Aktif'
            : 'Nonaktif';

        setMessage('');

        const res =
          await fetch(
            `/api/teachers/${teacher.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify(
                {
                  identity_number:
                    teacher.identity_number,

                  fullname:
                    teacher.fullname,

                  birth_date:
                    teacher.birth_date,

                  education:
                    teacher.education,

                  address:
                    teacher.address,

                  status:
                    newStatus,
                }
              ),
            }
          );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
              'Gagal mengubah status akun guru.'
          );
        }

        setMessage(
          `Sukses! Status akun ${teacher.fullname} diubah menjadi ${newStatus}.`
        );

        await fetchTeachers();
      } catch (err: any) {
        console.error(
          'Toggle status error:',
          err
        );

        setMessage(
          err?.message ||
            'Gagal mengubah status akun.'
        );
      }
    };

  // =========================================================
  // DELETE SATU
  // =========================================================

  const handleDelete =
    async (
      id: number
    ) => {
      if (
        !confirm(
          'Yakin ingin menghapus guru ini? Data yang sudah dihapus tidak dapat dikembalikan.'
        )
      ) {
        return;
      }

      try {
        setMessage('');

        const res =
          await fetch(
            `/api/teachers/${id}`,
            {
              method: 'DELETE',
            }
          );

        const data =
          await res.json();

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
        console.error(
          'Delete teacher error:',
          err
        );

        setMessage(
          err?.message ||
            'Gagal menghapus data guru.'
        );
      }
    };

  // =========================================================
  // SELECT ALL
  // =========================================================

  const handleSelectAll =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (e.target.checked) {
        setSelectedIds(
          filteredTeachers.map(
            (teacher) =>
              teacher.id
          )
        );
      } else {
        setSelectedIds([]);
      }
    };

  // =========================================================
  // SELECT ONE
  // =========================================================

  const handleSelectOne =
    (
      id: number
    ) => {
      setSelectedIds(
        (prev) =>
          prev.includes(id)
            ? prev.filter(
                (item) =>
                  item !== id
              )
            : [
                ...prev,
                id,
              ]
      );
    };

  // =========================================================
  // BULK DELETE
  // =========================================================

  const handleBulkDelete =
    async () => {
      if (
        selectedIds.length ===
        0
      ) {
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

        const res =
          await fetch(
            '/api/teachers/bulk',
            {
              method: 'DELETE',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify(
                {
                  ids:
                    selectedIds,
                }
              ),
            }
          );

        const data =
          await res.json();

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

  // =========================================================
  // FILTER
  // =========================================================

  const filteredTeachers =
    useMemo(() => {
      const keyword =
        search
          .trim()
          .toLowerCase();

      if (!keyword) {
        return teachers;
      }

      return teachers.filter(
        (teacher) =>
          teacher.fullname
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          teacher.identity_number
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          teacher.education
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          teacher.address
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          teacher.birth_date
            ?.toLowerCase()
            .includes(
              keyword
            )
      );
    }, [
      teachers,
      search,
    ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalTeachers =
    teachers.length;

  const activeTeachers =
    teachers.filter(
      (teacher) =>
        teacher.status !==
        'Nonaktif'
    ).length;

  const inactiveTeachers =
    teachers.filter(
      (teacher) =>
        teacher.status ===
        'Nonaktif'
    ).length;

  const selectedAll =
    filteredTeachers.length >
      0 &&
    filteredTeachers.every(
      (teacher) =>
        selectedIds.includes(
          teacher.id
        )
    );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-800">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-emerald-950/20 bg-[#062f28]">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
            `,
            backgroundSize:
              '38px 38px',
          }}
        />

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-7 sm:px-7 lg:px-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-white/[0.06] px-3 py-1.5">

                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-100/70">
                  Data Master • Academic
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_0_30px_rgba(52,211,153,0.08)]">

                  <GraduationCap
                    size={28}
                    strokeWidth={1.5}
                    className="text-emerald-200"
                  />

                </div>

                <div>

                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Guru &amp; Ustadz
                  </h1>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-emerald-100/55">
                    Kelola tenaga pengajar,
                    informasi akademik,
                    dan akses akun secara
                    terpusat.
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <div className="hidden rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 sm:block">

                <div className="flex items-center gap-2">

                  <ShieldCheck
                    size={15}
                    className="text-emerald-300"
                  />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-100/60">
                    Sistem Akademik
                  </span>

                </div>

                <div className="mt-1 text-[10px] text-white/40">
                  Teacher Management
                </div>

              </div>

              <button
                type="button"
                onClick={fetchTeachers}
                disabled={loading}
                className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 text-[10px] font-bold text-white transition hover:bg-white/[0.12] disabled:opacity-50"
              >

                <RefreshCw
                  size={14}
                  className={
                    loading
                      ? 'animate-spin'
                      : ''
                  }
                />

                Refresh

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] space-y-5 px-4 py-6 sm:px-6 lg:px-8">

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon={Users}
            label="Total Pengajar"
            value={totalTeachers}
            description="Semua data guru"
          />

          <StatCard
            icon={CheckCircle2}
            label="Akun Aktif"
            value={activeTeachers}
            description="Dapat melakukan login"
            positive
          />

          <StatCard
            icon={AlertCircle}
            label="Nonaktif"
            value={inactiveTeachers}
            description="Akses login diblokir"
            warning
          />

          <StatCard
            icon={ShieldCheck}
            label="Terpilih"
            value={selectedIds.length}
            description="Data untuk tindakan"
          />

        </div>

        {/* ===================================================
            MESSAGE
        =================================================== */}

        {message && (
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-xs font-medium shadow-sm ${
              message.startsWith(
                'Sukses'
              )
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >

            {message.startsWith(
              'Sukses'
            ) ? (
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
            ) : (
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0 text-red-600"
              />
            )}

            <span className="flex-1">
              {message}
            </span>

            <button
              type="button"
              onClick={() =>
                setMessage('')
              }
              className="opacity-50 transition hover:opacity-100"
            >
              <X size={15} />
            </button>

          </div>
        )}

        {/* ===================================================
            TEACHER LIST
        =================================================== */}

        <section>

          {/* LIST HEADER */}

          <div className="mb-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">

                  <Users size={18} />

                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-800">
                    Daftar Pengajar
                  </h2>

                  <p className="text-[9px] text-slate-400">
                    {filteredTeachers.length}{' '}
                    dari{' '}
                    {teachers.length}{' '}
                    data pengajar
                  </p>

                </div>

              </div>

              <div className="flex flex-col gap-2 sm:flex-row">

                {/* SEARCH */}

                <div className="relative">

                  <Search
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    placeholder="Cari guru..."
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 sm:w-56"
                  />

                </div>

                {/* BULK DELETE */}

                {selectedIds.length >
                  0 && (
                  <button
                    type="button"
                    onClick={
                      handleBulkDelete
                    }
                    disabled={
                      deletingBulk
                    }
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-[10px] font-bold text-white shadow-lg shadow-red-600/10 transition hover:bg-red-700 disabled:opacity-60"
                  >

                    {deletingBulk ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2
                        size={14}
                      />
                    )}

                    Hapus (
                    {
                      selectedIds.length
                    }
                    )

                  </button>
                )}

                {/* TAMBAH GURU */}

                <button
                  type="button"
                  onClick={
                    openAddModal
                  }
                  className="group flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0b5d4b] px-4 text-[10px] font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#084c3e]"
                >

                  <Plus
                    size={15}
                    className="transition group-hover:rotate-90"
                  />

                  Tambah Pengajar

                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

            {loading ? (
              <LoadingState />
            ) : teachers.length === 0 ? (
              <EmptyState
                onAdd={
                  openAddModal
                }
              />
            ) : filteredTeachers.length ===
              0 ? (
              <SearchEmptyState />
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px] border-collapse text-xs">

                  <thead>

                    <tr className="border-b border-slate-200 bg-[#f8faf9]">

                      <th className="w-12 px-4 py-3 text-center">

                        <input
                          type="checkbox"
                          checked={
                            selectedAll
                          }
                          onChange={
                            handleSelectAll
                          }
                          className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />

                      </th>

                      <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Identitas
                      </th>

                      <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Pengajar
                      </th>

                      <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Pendidikan
                      </th>

                      <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Alamat
                      </th>

                      <th className="px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Status
                      </th>

                      <th className="px-4 py-3 text-right text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {filteredTeachers.map(
                      (teacher) => {

                        const isChecked =
                          selectedIds.includes(
                            teacher.id
                          );

                        const isInactive =
                          teacher.status ===
                          'Nonaktif';

                        return (
                          <tr
                            key={
                              teacher.id
                            }
                            className={`group transition ${
                              isChecked
                                ? 'bg-emerald-50/60'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >

                            {/* CHECK */}

                            <td className="px-4 py-4 text-center">

                              <input
                                type="checkbox"
                                checked={
                                  isChecked
                                }
                                onChange={() =>
                                  handleSelectOne(
                                    teacher.id
                                  )
                                }
                                className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                              />

                            </td>

                            {/* IDENTITY */}

                            <td className="px-3 py-4">

                              <div className="flex items-center gap-2.5">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[10px] font-bold text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-700">

                                  #
                                  {
                                    teacher.id
                                  }

                                </div>

                                <div className="min-w-0">

                                  <div className="truncate text-[10px] font-bold text-slate-700">
                                    {teacher.identity_number ||
                                      '-'}
                                  </div>

                                  <div className="mt-0.5 flex items-center gap-1 text-[8px] text-slate-400">

                                    <IdCard
                                      size={
                                        9
                                      }
                                    />

                                    ID Identitas

                                  </div>

                                </div>

                              </div>

                            </td>

                            {/* NAME + BIRTH */}

                            <td className="px-3 py-4">

                              <div className="flex items-start gap-2.5">

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-700">

                                  <CircleUserRound
                                    size={
                                      18
                                    }
                                    strokeWidth={
                                      1.7
                                    }
                                  />

                                </div>

                                <div className="min-w-0">

                                  <div className="max-w-[230px] truncate font-bold text-slate-800">
                                    {
                                      teacher.fullname
                                    }
                                  </div>

                                  <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">

                                    <CalendarDays
                                      size={
                                        10
                                      }
                                      className="shrink-0"
                                    />

                                    <span>
                                      {formatBirthDate(
                                        teacher.birth_date
                                      ) ||
                                        'Tanggal lahir belum diisi'}
                                    </span>

                                  </div>

                                </div>

                              </div>

                            </td>

                            {/* EDUCATION */}

                            <td className="px-3 py-4">

                              {teacher.education ? (
                                <span className="inline-flex max-w-[200px] items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[9px] font-semibold text-emerald-700">

                                  <GraduationCap
                                    size={
                                      11
                                    }
                                  />

                                  <span className="truncate">
                                    {
                                      teacher.education
                                    }
                                  </span>

                                </span>
                              ) : (
                                <span className="text-[10px] italic text-slate-300">
                                  Belum diisi
                                </span>
                              )}

                            </td>

                            {/* ADDRESS */}

                            <td className="px-3 py-4">

                              <div className="flex max-w-[240px] items-start gap-1.5">

                                <MapPin
                                  size={
                                    12
                                  }
                                  className="mt-0.5 shrink-0 text-emerald-500"
                                />

                                <span className="line-clamp-2 text-[10px] leading-4 text-slate-500">
                                  {
                                    teacher.address ||
                                    'Alamat belum diisi'
                                  }
                                </span>

                              </div>

                            </td>

                            {/* STATUS */}

                            <td className="px-3 py-4">

                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleStatus(
                                    teacher
                                  )
                                }
                                className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[9px] font-bold transition ${
                                  isInactive
                                    ? 'border-red-100 bg-red-50 text-red-600 hover:border-red-200 hover:bg-red-100'
                                    : 'border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-200 hover:bg-emerald-100'
                                }`}
                                title="Klik untuk mengubah status login"
                              >

                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isInactive
                                      ? 'bg-red-500'
                                      : 'bg-emerald-500'
                                  }`}
                                />

                                {isInactive
                                  ? 'Nonaktif'
                                  : 'Aktif'}

                              </button>

                            </td>

                            {/* ACTION */}

                            <td className="px-4 py-4 text-right">

                              <div className="flex justify-end gap-1.5">

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(
                                      teacher
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600 transition hover:bg-amber-100 hover:text-amber-700"
                                  title="Edit guru"
                                >
                                  <Pencil
                                    size={
                                      13
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      teacher.id
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                                  title="Hapus guru"
                                >
                                  <Trash2
                                    size={
                                      13
                                    }
                                  />
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </section>

      </div>

      {/* =====================================================
          MODAL FORM TAMBAH / EDIT
      ===================================================== */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teacher-modal-title"
        >

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Tutup modal"
            onClick={closeModal}
            disabled={submitting}
            className="absolute inset-0 cursor-default bg-slate-950/55 backdrop-blur-sm"
          />

          {/* MODAL */}

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.30)]">

            {/* MODAL HEADER */}

            <div className="relative overflow-hidden bg-[#062f28] px-5 py-5 text-white sm:px-6">

              {/* GRID */}

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
                  `,
                  backgroundSize:
                    '28px 28px',
                }}
              />

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />

              <div className="relative flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-emerald-200">

                    {editingId ? (
                      <Pencil size={19} />
                    ) : (
                      <Plus size={20} />
                    )}

                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h2
                        id="teacher-modal-title"
                        className="text-base font-bold"
                      >
                        {editingId
                          ? 'Edit Data Guru'
                          : 'Tambah Pengajar'}
                      </h2>

                      {editingId && (
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[8px] font-bold text-emerald-200">
                          #{editingId}
                        </span>
                      )}

                    </div>

                    <p className="mt-0.5 text-[9px] text-emerald-100/55">
                      {editingId
                        ? 'Perbarui informasi tenaga pengajar.'
                        : 'Masukkan data pengajar baru ke sistem.'}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-white/70 transition hover:bg-white/[0.14] hover:text-white disabled:opacity-50"
                >
                  <X size={17} />
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="overflow-y-auto">

              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-6"
              >

                {/* INFO */}

                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">

                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">

                    <BadgeCheck
                      size={15}
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-bold text-emerald-800">
                      Informasi Pengajar
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-emerald-700/70">
                      Data ini akan digunakan
                      untuk administrasi
                      akademik dan akses
                      akun guru.
                    </p>

                  </div>

                </div>

                {/* GRID FORM */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <FormInput
                    icon={IdCard}
                    label="NIK / NIP / ID Identitas"
                    value={
                      identityNumber
                    }
                    onChange={
                      setIdentityNumber
                    }
                    placeholder="Contoh: 3301xxxxxxxxxxxx"
                    required
                  />

                  <FormInput
                    icon={UserRound}
                    label="Nama Lengkap & Gelar"
                    value={
                      fullname
                    }
                    onChange={
                      setFullname
                    }
                    placeholder="Contoh: Ustadz Ahmad, S.Pd.I"
                    required
                  />

                  {/* TANGGAL */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                      <CalendarDays
                        size={12}
                        className="text-emerald-600"
                      />

                      Tanggal Lahir

                    </label>

                    <input
                      type="date"
                      value={
                        birthDate
                      }
                      onChange={(
                        e
                      ) =>
                        setBirthDate(
                          e.target
                            .value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                    />

                  </div>

                  <FormInput
                    icon={
                      GraduationCap
                    }
                    label="Pendidikan Terakhir"
                    value={
                      education
                    }
                    onChange={
                      setEducation
                    }
                    placeholder="Contoh: S1 Pendidikan Agama Islam"
                  />

                  {/* ADDRESS */}

                  <div className="sm:col-span-2">

                    <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                      <MapPin
                        size={12}
                        className="text-emerald-600"
                      />

                      Alamat

                    </label>

                    <textarea
                      value={
                        address
                      }
                      onChange={(
                        e
                      ) =>
                        setAddress(
                          e.target
                            .value
                        )
                      }
                      placeholder="Masukkan alamat domisili lengkap..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                    />

                  </div>

                  {/* STATUS */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

                      <ShieldCheck
                        size={12}
                        className="text-emerald-600"
                      />

                      Status Akun Login

                    </label>

                    <div className="relative">

                      <select
                        value={
                          status
                        }
                        onChange={(
                          e
                        ) =>
                          setStatus(
                            e.target
                              .value
                          )
                        }
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3 pr-9 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
                      >

                        <option value="Aktif">
                          Aktif — Bisa Login
                        </option>

                        <option value="Nonaktif">
                          Nonaktif — Blokir Sementara
                        </option>

                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}

                  {!editingId && (
                    <FormInput
                      icon={
                        ShieldCheck
                      }
                      label="Password Akun"
                      value={
                        password
                      }
                      onChange={
                        setPassword
                      }
                      placeholder="Minimal 6 karakter"
                      type="password"
                      required
                    />
                  )}

                </div>

                {/* FOOTER BUTTON */}

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={
                      closeModal
                    }
                    disabled={
                      submitting
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="group relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0b5d4b] px-6 text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#084c3e] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {submitting ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Menyimpan...
                      </>
                    ) : editingId ? (
                      <>
                        <Check
                          size={15}
                        />
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus
                          size={15}
                        />
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

      {/* =====================================================
          GLOBAL STYLE
      ===================================================== */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        input,
        textarea,
        select,
        button {
          font-family: inherit;
        }

        ::selection {
          background: rgba(16, 185, 129, 0.18);
        }

        input[type='search']::-webkit-search-cancel-button {
          display: none;
        }

        input[type='checkbox'] {
          accent-color: #059669;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        /* Scrollbar */

        ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Modal scrollbar */

        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 999px;
        }

      `}</style>

    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  positive,
  warning,
}: {
  icon: any;
  label: string;
  value: number;
  description: string;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]">

      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-50 opacity-0 blur-2xl transition group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            warning
              ? 'bg-red-50 text-red-500'
              : positive
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-slate-100 text-slate-500'
          }`}
        >

          <Icon
            size={18}
            strokeWidth={1.7}
          />

        </div>

        <div className="min-w-0">

          <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </div>

          <div className="mt-0.5 text-xl font-bold tracking-tight text-slate-800">
            {value}
          </div>

          <div className="truncate text-[8px] text-slate-400">
            {description}
          </div>

        </div>

      </div>

    </div>
  );
}

/* ============================================================
   FORM INPUT
============================================================ */

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
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold text-slate-600">

        <Icon
          size={12}
          className="text-emerald-600"
        />

        {label}

        {required && (
          <span className="text-red-400">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        required={required}
        placeholder={
          placeholder
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
      />

    </div>
  );
}

/* ============================================================
   LOADING
============================================================ */

function LoadingState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">

        <Loader2
          size={24}
          className="animate-spin text-emerald-600"
        />

      </div>

      <p className="mt-4 text-xs font-semibold text-slate-500">
        Memuat data pengajar...
      </p>

      <p className="mt-1 text-[9px] text-slate-300">
        Menghubungkan ke database
        akademik
      </p>

    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

        <GraduationCap
          size={28}
          strokeWidth={1.4}
        />

      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        Belum Ada Pengajar
      </h3>

      <p className="mt-1 max-w-xs text-[10px] leading-5 text-slate-400">
        Belum terdapat data guru
        atau ustadz yang terdaftar
        dalam sistem.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 flex h-9 items-center gap-2 rounded-xl bg-[#0b5d4b] px-4 text-[10px] font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#084c3e]"
      >

        <Plus size={14} />

        Tambah Pengajar

      </button>

    </div>
  );
}

/* ============================================================
   SEARCH EMPTY
============================================================ */

function SearchEmptyState() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

        <Search
          size={26}
          strokeWidth={1.5}
        />

      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-700">
        Data Tidak Ditemukan
      </h3>

      <p className="mt-1 text-[10px] text-slate-400">
        Coba gunakan nama, ID,
        pendidikan, tanggal lahir,
        atau alamat yang berbeda.
      </p>

    </div>
  );
}