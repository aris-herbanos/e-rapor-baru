'use client';

import { useEffect, useMemo, useState } from 'react';

type Student = {
  id: number;
  nisn: string;
  fullname: string;
  birth_info?: string | null;
  class_name: string;
  gender: string;
  address?: string | null;
};

const ITEMS_PER_PAGE = 10;

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // =========================
  // FORM STATE
  // =========================

  const [nisn, setNisn] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthInfo, setBirthInfo] = useState('');
  const [className, setClassName] = useState('');
  const [gender, setGender] = useState('L');
  const [address, setAddress] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // =========================
  // BULK SELECTION
  // =========================

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  // =========================
  // CSV
  // =========================

  const [uploading, setUploading] = useState(false);

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // FETCH STUDENTS
  // =========================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/students', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || 'Gagal memuat data santri.'
        );
      }

      const result = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setStudents(result);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err: any) {
      console.error(err);

      setMessage(
        err?.message || 'Gagal memuat data santri.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.max(
    1,
    Math.ceil(students.length / ITEMS_PER_PAGE)
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentStudents = useMemo(() => {
    return students.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [students, startIndex]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    const tableElement =
      document.getElementById('student-table');

    if (tableElement) {
      tableElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setNisn('');
    setFullname('');
    setBirthInfo('');
    setClassName('');
    setGender('L');
    setAddress('');
    setEditingId(null);
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage('');
    setSubmitting(true);

    try {
      const url = editingId
        ? `/api/students/${editingId}`
        : '/api/students';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nisn: nisn.trim(),
          fullname: fullname.trim(),
          birth_info: birthInfo.trim(),
          class_name: className.trim(),
          gender,
          address: address.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message || 'Gagal menyimpan data.'
        );
      }

      setMessage(
        editingId
          ? 'Sukses! Data santri berhasil diperbarui.'
          : 'Sukses! Santri berhasil ditambahkan.'
      );

      resetForm();

      await fetchStudents();
    } catch (err: any) {
      setMessage(
        err?.message ||
          'Terjadi kesalahan saat menyimpan data.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setNisn(student.nisn);
    setFullname(student.fullname);
    setBirthInfo(student.birth_info || '');
    setClassName(student.class_name);
    setGender(student.gender);
    setAddress(student.address || '');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: number) => {
    if (
      !confirm(
        'Yakin ingin menghapus santri ini?'
      )
    ) {
      return;
    }

    try {
      setMessage('');

      const res = await fetch(
        `/api/students/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal menghapus santri.'
        );
      }

      setMessage(
        'Sukses! Santri berhasil dihapus.'
      );

      await fetchStudents();
    } catch (err: any) {
      setMessage(
        err?.message ||
          'Gagal menghapus santri.'
      );
    }
  };

  // =========================
  // SELECT ALL CURRENT PAGE
  // =========================

  const currentPageIds =
    currentStudents.map(
      (student) => student.id
    );

  const allCurrentSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
      selectedIds.includes(id)
    );

  const handleSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedIds((prev) => {
        const merged = new Set([
          ...prev,
          ...currentPageIds,
        ]);

        return Array.from(merged);
      });
    } else {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !currentPageIds.includes(id)
        )
      );
    }
  };

  // =========================
  // SELECT ONE
  // =========================

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  // =========================
  // BULK DELETE
  // =========================

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    if (
      !confirm(
        `Hapus ${selectedIds.length} santri terpilih?`
      )
    ) {
      return;
    }

    try {
      setDeletingBulk(true);
      setMessage('');

      const res = await fetch(
        '/api/students/bulk',
        {
          method: 'DELETE',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            ids: selectedIds,
          }),
        }
      );

      const data = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Gagal hapus massal.'
        );
      }

      setMessage(
        `Sukses! ${selectedIds.length} santri berhasil dihapus.`
      );

      setSelectedIds([]);

      await fetchStudents();
    } catch (err: any) {
      setMessage(
        err?.message ||
          'Terjadi kesalahan saat hapus massal.'
      );
    } finally {
      setDeletingBulk(false);
    }
  };

  // =========================
// DOWNLOAD CSV TEMPLATE
// RAPI & AMAN DIBUKA DI EXCEL
// =========================

const downloadTemplate = () => {
  const rows = [
    [
      'nisn',
      'fullname',
      'birth_info',
      'class_name',
      'gender',
      'address',
    ],
    [
      '3123456789',
      'Ahmad Fauzi',
      'Purwokerto 12 Januari 2012',
      '7A',
      'L',
      'Jl. Masjid No. 1 Purwokerto',
    ],
    [
      '3123456790',
      'Fatimah Zahra',
      'Jakarta 5 Mei 2012',
      '7A',
      'P',
      'Jl. Merdeka No. 45 Jakarta',
    ],
  ];

  // Escape CSV agar aman jika ada koma, titik koma,
  // tanda kutip, atau karakter khusus.
  const escapeCsv = (value: string) => {
    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const csvContent =
    '\uFEFF' +
    rows
      .map((row) =>
        row.map(escapeCsv).join(';')
      )
      .join('\r\n');

  const blob = new Blob(
    [csvContent],
    {
      type: 'text/csv;charset=utf-8;',
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = 'template_import_santri.csv';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  // Bersihkan object URL setelah download
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
};

  // =========================
  // IMPORT CSV
  // =========================

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        setUploading(true);

        const text =
          event.target?.result as string;

        const lines = text
          .split(/\r?\n/)
          .map((line) =>
            line.trim()
          )
          .filter(Boolean);

        if (lines.length < 2) {
          throw new Error(
            'File CSV kosong atau format tidak valid.'
          );
        }

        const parsedStudents: {
          nisn: string;
          fullname: string;
          birth_info: string;
          class_name: string;
          gender: string;
          address: string;
        }[] = [];

        for (
          let i = 1;
          i < lines.length;
          i++
        ) {
          const row = lines[i]
            .split(',')
            .map((value) =>
              value
                .trim()
                .replace(
                  /^["']|["']$/g,
                  ''
                )
            );

          if (row.length >= 6) {
            parsedStudents.push({
              nisn: row[0],
              fullname: row[1],
              birth_info: row[2],
              class_name: row[3],
              gender: row[4],
              address: row[5],
            });
          }
        }

        if (
          parsedStudents.length === 0
        ) {
          throw new Error(
            'Tidak ditemukan data santri yang valid.'
          );
        }

        const res = await fetch(
          '/api/students/bulk',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              students:
                parsedStudents,
            }),
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data?.message ||
              'Gagal mengimpor data.'
          );
        }

        setMessage(
          data?.message ||
            'Sukses! Data santri berhasil diimpor.'
        );

        await fetchStudents();
      } catch (err: any) {
        setMessage(
          err?.message ||
            'Gagal membaca file CSV.'
        );
      } finally {
        setUploading(false);

        e.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  // =========================
  // STATISTICS
  // =========================

  const maleCount =
    students.filter(
      (student) =>
        student.gender === 'L'
    ).length;

  const femaleCount =
    students.filter(
      (student) =>
        student.gender === 'P'
    ).length;

  // =========================
  // RENDER
  // =========================

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-5 py-5 text-white shadow-[0_10px_30px_rgba(6,95,70,0.15)] sm:px-6">

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <UsersIcon />
              </div>

              <div>

                <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  Data Master
                </div>

                <h1 className="mt-0.5 text-xl font-bold tracking-tight">
                  Manajemen Santri
                </h1>

                <p className="mt-0.5 text-[11px] text-emerald-50/75">
                  Kelola data santri secara cepat dan terstruktur.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                onClick={downloadTemplate}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 text-[11px] font-semibold text-white transition hover:bg-white/20"
              >
                <DownloadIcon />
                Template CSV
              </button>

              <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-amber-500 px-3 text-[11px] font-bold text-white shadow-sm transition hover:bg-amber-600">

                <UploadIcon />

                {uploading
                  ? 'Mengimpor...'
                  : 'Impor CSV'}

                <input
                  type="file"
                  accept=".csv"
                  onChange={
                    handleFileUpload
                  }
                  disabled={uploading}
                  className="hidden"
                />

              </label>

            </div>

          </div>

        </header>

        {/* ================= STAT ================= */}

        <section className="mt-4 grid grid-cols-3 gap-2.5">

          <MiniStat
            label="Total Santri"
            value={students.length}
            icon={<UsersIcon />}
          />

          <MiniStat
            label="Laki-laki"
            value={maleCount}
            icon={<MaleIcon />}
          />

          <MiniStat
            label="Perempuan"
            value={femaleCount}
            icon={<FemaleIcon />}
          />

        </section>

        {/* ================= MESSAGE ================= */}

        {message && (
          <div
            className={`mt-4 flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs ${
              message.startsWith('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >

            {message.startsWith(
              'Sukses'
            ) ? (
              <CheckIcon />
            ) : (
              <AlertIcon />
            )}

            <span>{message}</span>

          </div>
        )}

        {/* ================= MAIN ================= */}

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[290px_minmax(0,1fr)]">

          {/* ================= FORM ================= */}

          <section className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)]">

            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">

              <div className="flex items-center gap-2.5">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">

                  {editingId ? (
                    <EditIcon />
                  ) : (
                    <PlusIcon />
                  )}

                </div>

                <div>

                  <h2 className="text-xs font-bold text-slate-800">
                    {editingId
                      ? 'Edit Santri'
                      : 'Tambah Santri'}
                  </h2>

                  <p className="text-[9px] text-slate-400">
                    {editingId
                      ? 'Perbarui data santri'
                      : 'Masukkan data santri baru'}
                  </p>

                </div>

              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-[10px] font-semibold text-red-600 hover:underline"
                >
                  Batal
                </button>
              )}

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3.5 p-4"
            >

              <Field
                label="NISN"
                value={nisn}
                onChange={setNisn}
                placeholder="3123456789"
              />

              <Field
                label="Nama Lengkap"
                value={fullname}
                onChange={setFullname}
                placeholder="Nama lengkap santri"
              />

              <Field
                label="Tempat, Tanggal Lahir"
                value={birthInfo}
                onChange={setBirthInfo}
                placeholder="Purwokerto, 12 Januari 2012"
                required={false}
              />

              <div className="grid grid-cols-2 gap-2.5">

                <Field
                  label="Kelas"
                  value={className}
                  onChange={setClassName}
                  placeholder="7A"
                />

                <div>

                  <label className="mb-1 block text-[10px] font-semibold text-slate-600">
                    Jenis Kelamin
                  </label>

                  <select
                    value={gender}
                    onChange={(e) =>
                      setGender(
                        e.target.value
                      )
                    }
                    className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                  >

                    <option value="L">
                      Laki-laki
                    </option>

                    <option value="P">
                      Perempuan
                    </option>

                  </select>

                </div>

              </div>

              <div>

                <label className="mb-1 block text-[10px] font-semibold text-slate-600">
                  Alamat
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  placeholder="Alamat lengkap santri"
                  rows={2}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                />

              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-700 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-60"
              >

                {submitting ? (
                  <>
                    <SpinnerIcon />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <CheckIcon />
                    ) : (
                      <PlusIcon />
                    )}

                    {editingId
                      ? 'Simpan Perubahan'
                      : 'Tambah Santri'}
                  </>
                )}

              </button>

            </form>

          </section>

          {/* ================= TABLE ================= */}

          <section
            id="student-table"
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)]"
          >

            {/* TABLE HEADER */}

            <div className="border-b border-slate-100 px-4 py-3.5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h2 className="text-xs font-bold text-slate-800">
                    Daftar Santri
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">

                    {students.length > 0 ? (
                      <>
                        Menampilkan{' '}
                        <span className="font-semibold text-slate-600">
                          {startIndex + 1}
                        </span>
                        –
                        <span className="font-semibold text-slate-600">
                          {Math.min(
                            startIndex +
                              currentStudents.length,
                            students.length
                          )}
                        </span>{' '}
                        dari{' '}
                        <span className="font-semibold text-slate-600">
                          {students.length}
                        </span>{' '}
                        santri
                      </>
                    ) : (
                      'Belum ada data santri'
                    )}

                  </p>

                </div>

                <div className="flex items-center gap-2">

                  {selectedIds.length > 0 && (
                    <button
                      type="button"
                      onClick={
                        handleBulkDelete
                      }
                      disabled={
                        deletingBulk
                      }
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-red-600 px-3 text-[10px] font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                    >

                      <TrashIcon />

                      {deletingBulk
                        ? 'Menghapus...'
                        : `Hapus (${selectedIds.length})`}

                    </button>
                  )}

                </div>

              </div>

            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">

              {loading ? (
                <LoadingTable />
              ) : students.length === 0 ? (
                <EmptyState />
              ) : (
                <table className="w-full min-w-[720px] border-collapse text-xs">

                  <thead>

                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wide text-slate-400">

                      <th className="w-10 px-3 py-2.5 text-center">

                        <input
                          type="checkbox"
                          checked={
                            allCurrentSelected
                          }
                          onChange={
                            handleSelectAll
                          }
                          className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />

                      </th>

                      <th className="w-12 px-2 py-2.5 text-left">
                        No
                      </th>

                      <th className="px-3 py-2.5 text-left">
                        Santri
                      </th>

                      <th className="px-3 py-2.5 text-left">
                        Kelas
                      </th>

                      <th className="px-3 py-2.5 text-left">
                        L/P
                      </th>

                      <th className="px-3 py-2.5 text-left">
                        Informasi
                      </th>

                      <th className="px-3 py-2.5 text-right">
                        Aksi
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {currentStudents.map(
                      (
                        student,
                        index
                      ) => {

                        const isChecked =
                          selectedIds.includes(
                            student.id
                          );

                        return (
                          <tr
                            key={
                              student.id
                            }
                            className={`group transition ${
                              isChecked
                                ? 'bg-emerald-50/50'
                                : 'hover:bg-slate-50/70'
                            }`}
                          >

                            <td className="px-3 py-2.5 text-center">

                              <input
                                type="checkbox"
                                checked={
                                  isChecked
                                }
                                onChange={() =>
                                  handleSelectOne(
                                    student.id
                                  )
                                }
                                className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                              />

                            </td>

                            <td className="px-2 py-2.5 font-semibold text-slate-300">
                              {startIndex +
                                index +
                                1}
                            </td>

                            <td className="px-3 py-2.5">

                              <div className="font-semibold text-slate-800">
                                {
                                  student.fullname
                                }
                              </div>

                              <div className="mt-0.5 text-[9px] text-slate-400">
                                NISN{' '}
                                {
                                  student.nisn
                                }
                              </div>

                            </td>

                            <td className="px-3 py-2.5">

                              <span className="inline-flex rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                                {
                                  student.class_name
                                }
                              </span>

                            </td>

                            <td className="px-3 py-2.5">

                              <span
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold ${
                                  student.gender ===
                                  'L'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-pink-50 text-pink-600'
                                }`}
                              >
                                {
                                  student.gender
                                }
                              </span>

                            </td>

                            <td className="max-w-[260px] px-3 py-2.5">

                              <div className="truncate text-[10px] font-medium text-slate-600">
                                {student.birth_info ||
                                  '—'}
                              </div>

                              <div className="mt-0.5 truncate text-[9px] text-slate-400">
                                {student.address ||
                                  'Alamat belum diisi'}
                              </div>

                            </td>

                            <td className="px-3 py-2.5 text-right">

                              <div className="flex justify-end gap-1">

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(
                                      student
                                    )
                                  }
                                  className="rounded-md bg-amber-50 px-2 py-1 text-[9px] font-semibold text-amber-700 transition hover:bg-amber-100"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      student.id
                                    )
                                  }
                                  className="rounded-md bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                  Hapus
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      }
                    )}

                  </tbody>

                </table>
              )}

            </div>

            {/* ================= PAGINATION ================= */}

            {!loading &&
              students.length > 0 && (
                <Pagination
                  currentPage={
                    currentPage
                  }
                  totalPages={totalPages}
                  totalItems={
                    students.length
                  }
                  itemsPerPage={
                    ITEMS_PER_PAGE
                  }
                  onPageChange={
                    goToPage
                  }
                />
              )}

          </section>

        </div>

        {/* ================= FOOTER ================= */}

        <footer className="flex flex-col items-center justify-between gap-1 border-t border-slate-200/70 pt-3 text-[9px] text-slate-400 sm:flex-row">

          <span>
            Sistem Akademik · Pondok Pesantren
            Terpadu Ulul Albab
          </span>

          <span className="font-serif text-slate-500">
            العلم نور
          </span>

        </footer>

      </div>
    </main>
  );
}

/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-1 block text-[10px] font-semibold text-slate-600">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        required={required}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
      />

    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-[0_3px_15px_rgba(15,23,42,0.03)]">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
        {icon}
      </div>

      <div className="min-w-0">

        <div className="text-sm font-bold leading-none text-slate-800">
          {value}
        </div>

        <div className="mt-1 truncate text-[9px] font-medium text-slate-400">
          {label}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const pages: (
    number | string
  )[] = [];

  if (totalPages <= 7) {
    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      totalPages - 2
    ) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  const firstItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          itemsPerPage +
        1;

  const lastItem =
    Math.min(
      currentPage *
        itemsPerPage,
      totalItems
    );

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

      {/* INFO */}

      <div className="text-[9px] text-slate-400">

        Menampilkan{' '}

        <span className="font-semibold text-slate-600">
          {firstItem}
        </span>

        –

        <span className="font-semibold text-slate-600">
          {lastItem}
        </span>

        {' '}dari{' '}

        <span className="font-semibold text-slate-600">
          {totalItems}
        </span>{' '}
        santri

      </div>

      {/* NAVIGATION */}

      <div className="flex items-center justify-center gap-1">

        {/* PREVIOUS */}

        <button
          type="button"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          aria-label="Halaman sebelumnya"
          className="flex h-7 min-w-7 items-center justify-center rounded-md border border-slate-200 bg-white px-2 text-[11px] font-bold text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>

        {/* PAGES */}

        {pages.map(
          (page, index) =>
            page === '...' ? (
              <span
                key={`dots-${index}`}
                className="flex h-7 w-6 items-center justify-center text-[10px] text-slate-400"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(
                    page as number
                  )
                }
                className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[10px] font-semibold transition ${
                  currentPage === page
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                {page}
              </button>
            )
        )}

        {/* NEXT */}

        <button
          type="button"
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          aria-label="Halaman berikutnya"
          className="flex h-7 min-w-7 items-center justify-center rounded-md border border-slate-200 bg-white px-2 text-[11px] font-bold text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ›
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingTable() {
  return (
    <div className="divide-y divide-slate-100">

      {[
        1,
        2,
        3,
        4,
        5,
        6,
      ].map((item) => (
        <div
          key={item}
          className="flex animate-pulse items-center gap-4 px-4 py-3"
        >

          <div className="h-3 w-3 rounded bg-slate-200" />

          <div className="h-3 w-8 rounded bg-slate-200" />

          <div className="flex-1">

            <div className="h-3 w-40 rounded bg-slate-200" />

            <div className="mt-1 h-2 w-24 rounded bg-slate-100" />

          </div>

          <div className="h-5 w-10 rounded bg-slate-100" />

          <div className="h-5 w-5 rounded bg-slate-100" />

        </div>
      ))}

    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <UsersIcon />
      </div>

      <h3 className="mt-3 text-xs font-bold text-slate-700">
        Belum ada data santri
      </h3>

      <p className="mt-1 max-w-xs text-[10px] leading-4 text-slate-400">
        Tambahkan santri baru melalui
        formulir atau gunakan fitur
        impor CSV.
      </p>

    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
      />

      <path
        strokeLinecap="round"
        d="M3 20a6 6 0 0 1 12 0"
      />

      <path
        strokeLinecap="round"
        d="M16 5.5a3 3 0 0 1 0 5.5"
      />

      <path
        strokeLinecap="round"
        d="M18 14a5 5 0 0 1 3 6"
      />
    </svg>
  );
}

function MaleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle
        cx="10"
        cy="14"
        r="5"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 10 20 4M15 4h5v5"
      />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <circle
        cx="12"
        cy="9"
        r="5"
      />

      <path
        strokeLinecap="round"
        d="M12 14v7M9 18h6"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        d="M12 5v14M5 12h14"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14 6 4 4M5 19l3.5-.7L18.5 8.3a2.1 2.1 0 0 0-3-3L6 15.5 5 19Z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12 4 4L19 6"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4M12 17h.01"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.3 3.8-7.7 13.2a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        d="M12 3v12m0 0 4-4m-4 4-4-4"
      />

      <path
        strokeLinecap="round"
        d="M5 20h14"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <path
        strokeLinecap="round"
        d="M12 16V4m0 0 4 4m-4-4L8 8"
      />

      <path
        strokeLinecap="round"
        d="M5 20h14"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />

      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}