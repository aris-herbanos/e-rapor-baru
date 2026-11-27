
'use client';

import { useEffect, useMemo, useState } from 'react';

type Student = {
  id: number;
  nisn: string;
  fullname: string;
  gender: string;
  class_name: string;
};

type Classroom = {
  id: number;
  name: string;
  level: string;
  grade: number;
  status: string;
};

type PromotionStatus = 'NAIK' | 'TINGGAL' | 'LULUS';

export default function PromotionsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [fromClass, setFromClass] = useState('');
  const [toClass, setToClass] = useState('');

  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [status, setStatus] = useState<PromotionStatus>('NAIK');
  const [note, setNote] = useState('');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // =========================================================
  // LOAD KELAS
  // =========================================================

  const fetchClassrooms = async () => {
    try {
      setLoadingClasses(true);
      setError('');

      const response = await fetch('/api/classrooms', {
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Gagal mengambil daftar kelas.'
        );
      }

      setClassrooms(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal mengambil daftar kelas.'
      );
    } finally {
      setLoadingClasses(false);
    }
  };

  // =========================================================
  // LOAD SISWA
  // =========================================================

  const fetchStudents = async (className: string) => {
    if (!className) {
      setStudents([]);
      setSelectedIds([]);
      return;
    }

    try {
      setLoadingStudents(true);
      setError('');
      setSelectedIds([]);

      const response = await fetch(
        `/api/promotions?className=${encodeURIComponent(className)}`,
        {
          cache: 'no-store',
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Gagal mengambil data siswa.'
        );
      }

      setStudents(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal mengambil data siswa.'
      );
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  useEffect(() => {
    fetchStudents(fromClass);
  }, [fromClass]);

  // =========================================================
  // PILIH SEMUA
  // =========================================================

  const allSelected =
    students.length > 0 &&
    selectedIds.length === students.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(students.map((student) => student.id));
    } else {
      setSelectedIds([]);
    }
  };

  // =========================================================
  // PILIH SISWA
  // =========================================================

  const handleSelectStudent = (id: number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((studentId) => studentId !== id)
        : [...current, id]
    );
  };

  // =========================================================
  // RESET PILIHAN
  // =========================================================

  const resetSelection = () => {
    setSelectedIds([]);
    setMessage('');
    setError('');
  };

  // =========================================================
  // PROSES KENAIKAN / KELULUSAN
  // =========================================================

  const handlePromotion = async () => {
    setMessage('');
    setError('');

    if (selectedIds.length === 0) {
      setError('Pilih minimal satu siswa terlebih dahulu.');
      return;
    }

    if (
      (status === 'NAIK' || status === 'LULUS') &&
      !toClass
    ) {
      setError('Pilih kelas tujuan terlebih dahulu.');
      return;
    }

    if (status === 'NAIK' && fromClass === toClass) {
      setError(
        'Kelas tujuan tidak boleh sama dengan kelas asal.'
      );
      return;
    }

    const selectedStudents = students.filter((student) =>
      selectedIds.includes(student.id)
    );

    const names = selectedStudents
      .slice(0, 3)
      .map((student) => student.fullname)
      .join(', ');

    const more =
      selectedStudents.length > 3
        ? ` dan ${selectedStudents.length - 3} lainnya`
        : '';

    let destination = 'ke kelas berikutnya';

    if (status === 'TINGGAL') {
      destination = 'tetap di kelas masing-masing';
    } else if (status === 'LULUS') {
      destination = toClass
        ? `lulus dan lanjut ke kelas ${toClass}`
        : 'dinyatakan lulus';
    }

    const confirmed = window.confirm(
      `Yakin memproses ${selectedIds.length} siswa ${destination}?\n\n${names}${more}`
    );

    if (!confirmed) return;

    try {
      setProcessing(true);

      const response = await fetch('/api/promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIds: selectedIds,
          toClass: toClass,
          status,
          academicYear,
          note,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            'Gagal memproses data kenaikan/kelulusan.'
        );
      }

      setMessage(
        result.message || 'Proses berhasil diselesaikan.'
      );

      await fetchStudents(fromClass);
      setSelectedIds([]);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memproses data.'
      );
    } finally {
      setProcessing(false);
    }
  };

  // =========================================================
  // DATA KELAS TUJUAN
  // =========================================================

  const availableTargetClasses = useMemo(() => {
    return classrooms.filter(
      (classroom) => classroom.name !== fromClass
    );
  }, [classrooms, fromClass]);

  const selectedCount = selectedIds.length;

  const actionLabel =
    status === 'NAIK'
      ? `Naikkan ${selectedCount} Siswa`
      : status === 'TINGGAL'
        ? `Tetapkan ${selectedCount} Siswa Tinggal Kelas`
        : `Luluskan & Pindahkan ${selectedCount} Siswa`;

  return (
    <main className="min-h-screen bg-[#f0f0f1] text-[#1d2327] p-3 sm:p-5">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#1d2327]">
              Kenaikan Kelas & Kelulusan
            </h1>
            <p className="text-xs sm:text-[13px] text-[#646970] mt-1">
              Kelola proses kenaikan kelas, tinggal kelas, dan kelulusan siswa.
            </p>
          </div>

          <div className="text-xs text-[#646970]">
            <span className="font-medium">Tahun Pelajaran:</span>{' '}
            <span className="font-semibold text-[#1d2327]">
              {academicYear}
            </span>
          </div>
        </header>

        {/* NOTIFIKASI */}
        {message && (
          <div className="border-l-4 border-[#00a32a] bg-white px-3 py-3 shadow-sm text-[13px] text-[#1d5e2b]">
            <span className="font-semibold">Berhasil:</span>{' '}
            {message}
          </div>
        )}

        {error && (
          <div className="border-l-4 border-[#d63638] bg-white px-3 py-3 shadow-sm text-[13px] text-[#b32d2e]">
            <span className="font-semibold">Perhatian:</span>{' '}
            {error}
          </div>
        )}

        {/* FORM PENGATURAN */}
        <section className="bg-white border border-[#dcdcde] shadow-sm">
          <div className="px-4 py-3 border-b border-[#dcdcde]">
            <h2 className="text-sm font-semibold">
              Pengaturan Proses
            </h2>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

              {/* TAHUN PELAJARAN */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Tahun Pelajaran
                </label>

                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="2026/2027"
                  className="w-full h-9 px-2.5 border border-[#8c8f94] rounded-sm text-[13px] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                />
              </div>

              {/* KELAS ASAL */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Kelas Asal
                </label>

                <select
                  value={fromClass}
                  onChange={(e) => {
                    setFromClass(e.target.value);
                    setToClass('');
                    setMessage('');
                    setError('');
                  }}
                  disabled={loadingClasses}
                  className="w-full h-9 px-2.5 border border-[#8c8f94] rounded-sm bg-white text-[13px] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >
                  <option value="">
                    {loadingClasses
                      ? 'Memuat kelas...'
                      : '-- Pilih Kelas Asal --'}
                  </option>

                  {classrooms.map((classroom) => (
                    <option
                      key={classroom.id}
                      value={classroom.name}
                    >
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* KELAS TUJUAN */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Kelas Tujuan
                  {status === 'LULUS' && (
                    <span className="font-normal text-[#646970]">
                      {' '}(SMA/Lainnya)
                    </span>
                  )}
                </label>

                <select
                  value={toClass}
                  onChange={(e) => setToClass(e.target.value)}
                  disabled={
                    !fromClass ||
                    loadingClasses ||
                    status === 'TINGGAL'
                  }
                  className="w-full h-9 px-2.5 border border-[#8c8f94] rounded-sm bg-white text-[13px] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7] disabled:text-[#a7aaad]"
                >
                  <option value="">
                    -- Pilih Kelas Tujuan --
                  </option>

                  {availableTargetClasses.map((classroom) => (
                    <option
                      key={classroom.id}
                      value={classroom.name}
                    >
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Status Keputusan
                </label>

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as PromotionStatus);
                    setMessage('');
                    setError('');
                  }}
                  className="w-full h-9 px-2.5 border border-[#8c8f94] rounded-sm bg-white text-[13px] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                >
                  <option value="NAIK">Naik Kelas</option>
                  <option value="TINGGAL">Tinggal Kelas</option>
                  <option value="LULUS">Lulus</option>
                </select>
              </div>
            </div>

            {/* CATATAN */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">
                Catatan{' '}
                <span className="font-normal text-[#646970]">
                  (Opsional)
                </span>
              </label>

              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Contoh: Dinyatakan lulus dan melanjutkan ke tingkat SMA."
                className="w-full max-w-3xl p-2.5 border border-[#8c8f94] rounded-sm text-[13px] outline-none resize-y focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#646970]">
              <span>
                {status === 'NAIK'
                  ? 'Siswa terpilih akan dipindahkan ke kelas tujuan.'
                  : status === 'TINGGAL'
                    ? 'Siswa terpilih akan tetap berada di kelas asal.'
                    : 'Siswa terpilih akan diproses sebagai siswa lulus.'}
              </span>
            </div>
          </div>
        </section>

        {/* DAFTAR SISWA */}
        <section className="bg-white border border-[#dcdcde] shadow-sm">
          <div className="px-4 py-3 border-b border-[#dcdcde] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold">
                Daftar Siswa
              </h2>
              <p className="text-xs text-[#646970] mt-0.5">
                {fromClass
                  ? `Menampilkan siswa kelas ${fromClass}`
                  : 'Pilih kelas asal untuk menampilkan siswa.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedCount > 0 && (
                <>
                  <span className="text-xs font-semibold text-[#2271b1]">
                    {selectedCount} siswa dipilih
                  </span>

                  <button
                    type="button"
                    onClick={resetSelection}
                    className="text-xs text-[#2271b1] hover:text-[#135e96] underline"
                  >
                    Batal pilih
                  </button>
                </>
              )}
            </div>
          </div>

          {!fromClass ? (
            <div className="py-12 px-4 text-center">
              <p className="text-sm font-medium text-[#50575e]">
                Pilih kelas asal
              </p>
              <p className="text-xs text-[#646970] mt-1">
                Daftar siswa akan ditampilkan setelah kelas dipilih.
              </p>
            </div>
          ) : loadingStudents ? (
            <div className="py-12 text-center">
              <p className="text-[13px] text-[#646970]">
                Memuat data siswa...
              </p>
            </div>
          ) : students.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <p className="text-sm font-medium text-[#50575e]">
                Belum ada siswa
              </p>
              <p className="text-xs text-[#646970] mt-1">
                Tidak ditemukan siswa pada kelas ini.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] text-[#50575e] border-b border-[#dcdcde]">
                      <th className="px-3 py-2.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={allSelected}
                          onChange={(e) =>
                            handleSelectAll(e.target.checked)
                          }
                          aria-label="Pilih semua siswa"
                          className="accent-[#2271b1] cursor-pointer"
                        />
                      </th>
                      <th className="px-3 py-2.5 w-12 text-left font-semibold">
                        No.
                      </th>
                      <th className="px-3 py-2.5 text-left font-semibold">
                        NISN
                      </th>
                      <th className="px-3 py-2.5 text-left font-semibold">
                        Nama Lengkap
                      </th>
                      <th className="px-3 py-2.5 text-left font-semibold">
                        L/P
                      </th>
                      <th className="px-3 py-2.5 text-left font-semibold">
                        Kelas
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => {
                      const checked = selectedIds.includes(student.id);

                      return (
                        <tr
                          key={student.id}
                          className={`border-b border-[#f0f0f1] last:border-0 ${
                            checked
                              ? 'bg-[#f0f6fc]'
                              : 'hover:bg-[#f6f7f7]'
                          }`}
                        >
                          <td className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                handleSelectStudent(student.id)
                              }
                              aria-label={`Pilih ${student.fullname}`}
                              className="accent-[#2271b1] cursor-pointer"
                            />
                          </td>

                          <td className="px-3 py-2.5 text-[#646970]">
                            {index + 1}
                          </td>

                          <td className="px-3 py-2.5 font-mono text-xs text-[#646970]">
                            {student.nisn || '-'}
                          </td>

                          <td className="px-3 py-2.5 font-medium text-[#1d2327]">
                            {student.fullname}
                          </td>

                          <td className="px-3 py-2.5 text-[#50575e]">
                            {student.gender || '-'}
                          </td>

                          <td className="px-3 py-2.5 text-[#50575e]">
                            {student.class_name}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-2.5 border-t border-[#dcdcde] bg-[#f6f7f7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-xs text-[#646970]">
                  Total {students.length} siswa
                </span>
                <span className="text-xs text-[#646970]">
                  {selectedCount} siswa dipilih
                </span>
              </div>
            </>
          )}
        </section>

        {/* PANEL AKSI */}
        {students.length > 0 && (
          <section className="bg-white border border-[#dcdcde] shadow-sm">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-xs text-[#646970]">
                  Jumlah siswa yang akan diproses
                </div>
                <div className="text-lg font-semibold text-[#1d2327] mt-0.5">
                  {selectedCount}{' '}
                  <span className="text-xs font-normal text-[#646970]">
                    dari {students.length} siswa
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePromotion}
                disabled={processing || selectedCount === 0}
                className="inline-flex items-center justify-center gap-2 min-h-9 px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-[13px] font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  actionLabel
                )}
              </button>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
