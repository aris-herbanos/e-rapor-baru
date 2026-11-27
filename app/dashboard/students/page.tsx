
'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';

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

const inputClass =
  'h-8 w-full rounded-sm border border-[#8c8f94] bg-white px-2 text-[13px] text-[#2c3338] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1]';

const primaryButton =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[12px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60';

const secondaryButton =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-sm border border-[#c3c4c7] bg-white px-3 text-[12px] font-medium text-[#2c3338] hover:border-[#8c8f94] hover:bg-[#f6f7f7] disabled:cursor-not-allowed disabled:opacity-60';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // MODAL & FORM
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nisn, setNisn] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthInfo, setBirthInfo] = useState('');
  const [className, setClassName] = useState('');
  const [gender, setGender] = useState('L');
  const [address, setAddress] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // BULK SELECTION
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [deletingBulk, setDeletingBulk] = useState(false);

  // CSV
  const [uploading, setUploading] = useState(false);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/students', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal memuat data santri.');
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
      setMessage(err?.message || 'Gagal memuat data santri.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(students.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentStudents = useMemo(() => {
    return students.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [students, startIndex]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    document.getElementById('student-table')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // OPEN / CLOSE MODAL
  const openAddModal = () => {
    setEditingId(null);
    setNisn('');
    setFullname('');
    setBirthInfo('');
    setClassName('');
    setGender('L');
    setAddress('');
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setNisn(student.nisn);
    setFullname(student.fullname);
    setBirthInfo(student.birth_info || '');
    setClassName(student.class_name);
    setGender(student.gender);
    setAddress(student.address || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // SUBMIT FORM
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        throw new Error(data?.message || 'Gagal menyimpan data.');
      }

      setMessage(
        editingId
          ? 'Sukses! Data santri berhasil diperbarui.'
          : 'Sukses! Santri berhasil ditambahkan.'
      );

      closeModal();
      await fetchStudents();
    } catch (err: any) {
      setMessage(err?.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE SINGLE
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus santri ini?')) return;

    try {
      setMessage('');

      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal menghapus santri.');
      }

      setMessage('Sukses! Santri berhasil dihapus.');
      await fetchStudents();
    } catch (err: any) {
      setMessage(err?.message || 'Gagal menghapus santri.');
    }
  };

  // SELECT ALL CURRENT PAGE
  const currentPageIds = currentStudents.map((student) => student.id);

  const allCurrentSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds((prev) => {
        const merged = new Set([...prev, ...currentPageIds]);
        return Array.from(merged);
      });
    } else {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // BULK DELETE
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!confirm(`Hapus ${selectedIds.length} santri terpilih?`)) return;

    try {
      setDeletingBulk(true);
      setMessage('');

      const res = await fetch('/api/students/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || 'Gagal hapus massal.');
      }

      setMessage(`Sukses! ${selectedIds.length} santri berhasil dihapus.`);
      setSelectedIds([]);
      await fetchStudents();
    } catch (err: any) {
      setMessage(err?.message || 'Terjadi kesalahan saat hapus massal.');
    } finally {
      setDeletingBulk(false);
    }
  };

  // DOWNLOAD CSV TEMPLATE
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
        'Purwokerto, 12 Januari 2012',
        '7A',
        'L',
        'Jl. Masjid No. 1, Purwokerto',
      ],
      [
        '3123456790',
        'Fatimah Zahra',
        'Jakarta, 5 Mei 2012',
        '7A',
        'P',
        'Jl. Merdeka No. 45, Jakarta',
      ],
    ];

    const escapeCsv = (value: string) => {
      return `"${String(value).replace(/"/g, '""')}"`;
    };

    const csvContent =
      '\uFEFF' +
      rows
        .map((row) => row.map(escapeCsv).join(';'))
        .join('\r\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'template_import_santri.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  // IMPORT CSV
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        setUploading(true);

        const text = event.target?.result as string;
        const lines = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);

        if (lines.length < 2) {
          throw new Error('File CSV kosong atau format tidak valid.');
        }

        const parsedStudents: any[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row =
            lines[i].split(';').length > 1
              ? lines[i].split(';')
              : lines[i].split(',');

          const cleanedRow = row.map((value) =>
            value.trim().replace(/^["']|["']$/g, '')
          );

          if (cleanedRow.length >= 6) {
            parsedStudents.push({
              nisn: cleanedRow[0],
              fullname: cleanedRow[1],
              birth_info: cleanedRow[2],
              class_name: cleanedRow[3],
              gender: cleanedRow[4],
              address: cleanedRow[5],
            });
          }
        }

        if (parsedStudents.length === 0) {
          throw new Error('Tidak ditemukan data santri yang valid.');
        }

        const res = await fetch('/api/students/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ students: parsedStudents }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || 'Gagal mengimpor data.');
        }

        setMessage(
          data?.message || 'Sukses! Data santri berhasil diimpor.'
        );

        await fetchStudents();
      } catch (err: any) {
        setMessage(err?.message || 'Gagal membaca file CSV.');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    };

    reader.readAsText(file);
  };

  // STATISTICS
  const maleCount = students.filter((s) => s.gender === 'L').length;
  const femaleCount = students.filter((s) => s.gender === 'P').length;

  return (
    <main className="min-h-screen bg-[#f0f0f1] px-3 py-5 text-[#1d2327] sm:px-5">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[21px] font-normal leading-tight text-[#1d2327]">
              Manajemen Santri
            </h1>
            <p className="mt-1 text-[12px] text-[#646970]">
              Kelola data induk santri, informasi pribadi, dan data kelas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={downloadTemplate}
              className={secondaryButton}
            >
              <DownloadIcon />
              Template CSV
            </button>

            <label className={`${secondaryButton} cursor-pointer`}>
              <UploadIcon />
              {uploading ? 'Mengimpor...' : 'Impor CSV'}
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={openAddModal}
              className={primaryButton}
            >
              <PlusIcon />
              Tambah Santri
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
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

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-4 border-l-4 bg-white px-3 py-2.5 text-[12px] shadow-sm ${
              message.startsWith('Sukses')
                ? 'border-l-[#00a32a] text-[#146c2e]'
                : 'border-l-[#d63638] text-[#b32d2e]'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.startsWith('Sukses') ? (
                <CheckIcon />
              ) : (
                <AlertIcon />
              )}
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* TABLE */}
        <section
          id="student-table"
          className="min-w-0 border border-[#c3c4c7] bg-white shadow-sm"
        >
          <div className="flex flex-col gap-2 border-b border-[#dcdcde] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-[#1d2327]">
                Daftar Santri
              </h2>
              <p className="mt-0.5 text-[11px] text-[#646970]">
                {students.length > 0 ? (
                  <>
                    Menampilkan{' '}
                    <strong className="font-semibold text-[#2c3338]">
                      {startIndex + 1}–{Math.min(
                        startIndex + currentStudents.length,
                        students.length
                      )}
                    </strong>{' '}
                    dari{' '}
                    <strong className="font-semibold text-[#2c3338]">
                      {students.length}
                    </strong>{' '}
                    santri
                  </>
                ) : (
                  'Belum ada data santri'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedIds.length > 0 && (
                <>
                  <span className="text-[11px] text-[#646970]">
                    {selectedIds.length} dipilih
                  </span>
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    disabled={deletingBulk}
                    className="inline-flex h-8 items-center gap-1.5 rounded-sm border border-[#d63638] bg-white px-3 text-[12px] font-medium text-[#d63638] hover:bg-[#fcf0f1] disabled:opacity-60"
                  >
                    <TrashIcon />
                    {deletingBulk ? 'Menghapus...' : 'Hapus Terpilih'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <LoadingTable />
            ) : students.length === 0 ? (
              <EmptyState />
            ) : (
              <table className="w-full min-w-[850px] border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#f6f7f7] text-left text-[11px] font-semibold text-[#2c3338]">
                    <th className="w-10 border-b border-[#c3c4c7] px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={allCurrentSelected}
                        onChange={handleSelectAll}
                        aria-label="Pilih semua santri pada halaman ini"
                        className="h-4 w-4 cursor-pointer accent-[#2271b1]"
                      />
                    </th>
                    <th className="w-12 border-b border-[#c3c4c7] px-2 py-2">
                      No.
                    </th>
                    <th className="border-b border-[#c3c4c7] px-3 py-2">
                      Santri
                    </th>
                    <th className="border-b border-[#c3c4c7] px-3 py-2">
                      Kelas
                    </th>
                    <th className="border-b border-[#c3c4c7] px-3 py-2">
                      L/P
                    </th>
                    <th className="border-b border-[#c3c4c7] px-3 py-2">
                      Tempat, Tanggal Lahir
                    </th>
                    <th className="border-b border-[#c3c4c7] px-3 py-2">
                      Alamat
                    </th>
                    <th className="w-28 border-b border-[#c3c4c7] px-3 py-2 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentStudents.map((student, index) => {
                    const isChecked = selectedIds.includes(student.id);

                    return (
                      <tr
                        key={student.id}
                        className={`${
                          isChecked
                            ? 'bg-[#f0f6fc]'
                            : 'hover:bg-[#f6f7f7]'
                        }`}
                      >
                        <td className="border-b border-[#dcdcde] px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(student.id)}
                            aria-label={`Pilih ${student.fullname}`}
                            className="h-4 w-4 cursor-pointer accent-[#2271b1]"
                          />
                        </td>

                        <td className="border-b border-[#dcdcde] px-2 py-2 text-[#646970]">
                          {startIndex + index + 1}
                        </td>

                        <td className="border-b border-[#dcdcde] px-3 py-2">
                          <div className="font-semibold text-[#2271b1]">
                            {student.fullname}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[#646970]">
                            NISN: {student.nisn}
                          </div>
                        </td>

                        <td className="border-b border-[#dcdcde] px-3 py-2">
                          <span className="inline-block border border-[#dcdcde] bg-[#f6f7f7] px-2 py-0.5 text-[11px] font-medium text-[#2c3338]">
                            {student.class_name}
                          </span>
                        </td>

                        <td className="border-b border-[#dcdcde] px-3 py-2">
                          <span
                            className={`font-medium ${
                              student.gender === 'L'
                                ? 'text-[#2271b1]'
                                : 'text-[#d63678]'
                            }`}
                          >
                            {student.gender === 'L'
                              ? 'Laki-laki'
                              : student.gender === 'P'
                                ? 'Perempuan'
                                : student.gender}
                          </span>
                        </td>

                        <td className="border-b border-[#dcdcde] px-3 py-2 text-[#50575e]">
                          {student.birth_info || '—'}
                        </td>

                        <td className="max-w-[240px] truncate border-b border-[#dcdcde] px-3 py-2 text-[#50575e]">
                          {student.address || '—'}
                        </td>

                        <td className="border-b border-[#dcdcde] px-3 py-2">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(student)}
                              className="text-[11px] font-medium text-[#2271b1] hover:text-[#135e96] hover:underline"
                            >
                              Edit
                            </button>
                            <span className="text-[#c3c4c7]">|</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(student.id)}
                              className="text-[11px] font-medium text-[#b32d2e] hover:text-[#8a2424] hover:underline"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {!loading && students.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={students.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={goToPage}
            />
          )}
        </section>

        {/* MODAL */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !submitting) {
                closeModal();
              }
            }}
          >
            <div className="my-auto w-full max-w-[560px] border border-[#c3c4c7] bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#dcdcde] px-4 py-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#1d2327]">
                    {editingId ? 'Edit Data Santri' : 'Tambah Santri Baru'}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#646970]">
                    Lengkapi informasi identitas santri.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  aria-label="Tutup formulir"
                  className="flex h-7 w-7 items-center justify-center text-[20px] text-[#646970] hover:bg-[#f0f0f1] hover:text-[#1d2327] disabled:opacity-50"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-3.5 p-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field
                      label="NISN"
                      value={nisn}
                      onChange={setNisn}
                      placeholder="3123456789"
                    />

                    <Field
                      label="Kelas"
                      value={className}
                      onChange={setClassName}
                      placeholder="Contoh: 7A"
                    />
                  </div>

                  <Field
                    label="Nama Lengkap"
                    value={fullname}
                    onChange={setFullname}
                    placeholder="Nama lengkap santri"
                  />

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field
                      label="Tempat, Tanggal Lahir"
                      value={birthInfo}
                      onChange={setBirthInfo}
                      placeholder="Purwokerto, 12 Januari 2012"
                      required={false}
                    />

                    <div>
                      <label className="mb-1 block text-[12px] font-medium text-[#2c3338]">
                        Jenis Kelamin
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={inputClass}
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-medium text-[#2c3338]">
                      Alamat
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Alamat lengkap santri"
                      rows={3}
                      className="w-full resize-y rounded-sm border border-[#8c8f94] bg-white px-2 py-2 text-[13px] text-[#2c3338] outline-none focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className={secondaryButton}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={primaryButton}
                  >
                    {submitting ? (
                      <>
                        <SpinnerIcon />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <CheckIcon />
                        {editingId ? 'Simpan Perubahan' : 'Tambah Santri'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-4 flex flex-col justify-between gap-1 border-t border-[#dcdcde] pt-3 text-[11px] text-[#646970] sm:flex-row">
          <span>
            Sistem Akademik · Pondok Pesantren Terpadu Ulul Albab
          </span>
          <span className="font-serif">العلم نور</span>
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
      <label className="mb-1 block text-[12px] font-medium text-[#2c3338]">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={inputClass}
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
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border border-[#c3c4c7] bg-white px-3 py-3 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#dcdcde] bg-[#f6f7f7] text-[#2271b1]">
        {icon}
      </div>
      <div>
        <div className="text-[19px] font-semibold leading-tight text-[#1d2327]">
          {value}
        </div>
        <div className="mt-0.5 text-[11px] text-[#646970]">{label}</div>
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
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('...');

    pages.push(totalPages);
  }

  const firstItem =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const lastItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-[#dcdcde] bg-[#f6f7f7] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-[11px] text-[#646970]">
        Menampilkan{' '}
        <strong className="font-semibold text-[#2c3338]">
          {firstItem}–{lastItem}
        </strong>{' '}
        dari{' '}
        <strong className="font-semibold text-[#2c3338]">
          {totalItems}
        </strong>{' '}
        santri
      </div>

      <div className="flex items-center justify-center gap-1">
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          label="‹"
          ariaLabel="Halaman sebelumnya"
        />

        {pages.map((page, index) =>
          page === '...' ? (
            <span
              key={`dots-${index}`}
              className="flex h-7 min-w-7 items-center justify-center text-[11px] text-[#646970]"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`h-7 min-w-7 rounded-sm border px-2 text-[11px] ${
                currentPage === page
                  ? 'border-[#2271b1] bg-[#2271b1] font-semibold text-white'
                  : 'border-[#c3c4c7] bg-white text-[#2c3338] hover:border-[#2271b1] hover:text-[#2271b1]'
              }`}
            >
              {page}
            </button>
          )
        )}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          label="›"
          ariaLabel="Halaman berikutnya"
        />
      </div>
    </div>
  );
}

function PageButton({
  disabled,
  onClick,
  label,
  ariaLabel,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className="h-7 min-w-7 rounded-sm border border-[#c3c4c7] bg-white px-2 text-[13px] text-[#50575e] hover:border-[#2271b1] hover:text-[#2271b1] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}

/* =========================================================
   LOADING & EMPTY
========================================================= */

function LoadingTable() {
  return (
    <div className="divide-y divide-[#dcdcde]">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="flex animate-pulse items-center gap-4 px-4 py-3"
        >
          <div className="h-4 w-4 rounded-sm bg-[#e5e5e5]" />
          <div className="h-3 w-8 rounded-sm bg-[#e5e5e5]" />
          <div className="flex-1">
            <div className="h-3 w-40 rounded-sm bg-[#e5e5e5]" />
            <div className="mt-2 h-2 w-24 rounded-sm bg-[#f0f0f1]" />
          </div>
          <div className="h-5 w-12 rounded-sm bg-[#f0f0f1]" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-11 w-11 items-center justify-center border border-[#dcdcde] bg-[#f6f7f7] text-[#8c8f94]">
        <UsersIcon />
      </div>
      <h3 className="mt-3 text-[13px] font-semibold text-[#2c3338]">
        Belum ada data santri
      </h3>
      <p className="mt-1 max-w-sm text-[11px] leading-5 text-[#646970]">
        Tambahkan santri baru melalui tombol Tambah Santri atau gunakan fitur
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M3 20a6 6 0 0 1 12 0" />
      <path strokeLinecap="round" d="M16 5.5a3 3 0 0 1 0 5.5" />
      <path strokeLinecap="round" d="M18 14a5 5 0 0 1 3 6" />
    </svg>
  );
}

function MaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="10" cy="14" r="5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10 20 4M15 4h5v5" />
    </svg>
  );
}

function FemaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <circle cx="12" cy="9" r="5" />
      <path strokeLinecap="round" d="M12 14v7M9 18h6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4M12 17h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m10.3 3.8-7.7 13.2a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <path strokeLinecap="round" d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path strokeLinecap="round" d="M5 20h14" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
      <path strokeLinecap="round" d="M12 16V4m0 0 4 4m-4-4L8 8" />
      <path strokeLinecap="round" d="M5 20h14" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
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
