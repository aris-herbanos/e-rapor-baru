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

export default function PromotionsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [fromClass, setFromClass] = useState('');
  const [toClass, setToClass] = useState('');

  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [status, setStatus] = useState<'NAIK' | 'TINGGAL'>('NAIK');
  const [note, setNote] = useState('');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /*
   * ============================
   * LOAD KELAS
   * ============================
   */
  const fetchClassrooms = async () => {
    try {
      setLoadingClasses(true);

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
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err: any) {
      setError(
        err?.message || 'Gagal mengambil daftar kelas.'
      );
    } finally {
      setLoadingClasses(false);
    }
  };

  /*
   * ============================
   * LOAD SISWA
   * ============================
   */
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
        `/api/promotions?className=${encodeURIComponent(
          className
        )}`,
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
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (err: any) {
      setError(
        err?.message || 'Gagal mengambil data siswa.'
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

  /*
   * ============================
   * PILIH SEMUA
   * ============================
   */
  const allSelected =
    students.length > 0 &&
    selectedIds.length === students.length;

  const handleSelectAll = (
    checked: boolean
  ) => {
    if (checked) {
      setSelectedIds(
        students.map((student) => student.id)
      );
    } else {
      setSelectedIds([]);
    }
  };

  /*
   * ============================
   * PILIH SISWA
   * ============================
   */
  const handleSelectStudent = (
    id: number
  ) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (studentId) => studentId !== id
          )
        : [...current, id]
    );
  };

  /*
   * ============================
   * RESET
   * ============================
   */
  const resetSelection = () => {
    setSelectedIds([]);
    setMessage('');
    setError('');
  };

  /*
   * ============================
   * PROSES KENAIKAN
   * ============================
   */
  const handlePromotion = async () => {
    setMessage('');
    setError('');

    if (selectedIds.length === 0) {
      setError(
        'Pilih minimal satu siswa terlebih dahulu.'
      );
      return;
    }

    if (status === 'NAIK' && !toClass) {
      setError(
        'Pilih kelas tujuan terlebih dahulu.'
      );
      return;
    }

    if (status === 'NAIK' && fromClass === toClass) {
      setError(
        'Kelas tujuan tidak boleh sama dengan kelas asal.'
      );
      return;
    }

    const selectedStudents = students.filter(
      (student) =>
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

    const destination =
      status === 'NAIK'
        ? `ke kelas ${toClass}`
        : 'tetap di kelas masing-masing';

    const confirmed = window.confirm(
      `Yakin memproses ${selectedIds.length} siswa ${destination}?\n\n${names}${more}`
    );

    if (!confirmed) return;

    try {
      setProcessing(true);

      const response = await fetch(
        '/api/promotions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentIds: selectedIds,
            toClass,
            status,
            academicYear,
            note,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            'Gagal memproses kenaikan kelas.'
        );
      }

      setMessage(
        result.message ||
          'Kenaikan kelas berhasil diproses.'
      );

      /*
       * Refresh daftar siswa.
       */
      await fetchStudents(fromClass);

      setSelectedIds([]);
    } catch (err: any) {
      setError(
        err?.message ||
          'Gagal memproses kenaikan kelas.'
      );
    } finally {
      setProcessing(false);
    }
  };

  /*
   * ============================
   * FILTER KELAS TUJUAN
   * ============================
   */
  const availableTargetClasses = useMemo(() => {
    return classrooms.filter(
      (classroom) =>
        classroom.name !== fromClass
    );
  }, [classrooms, fromClass]);

  return (
    <main className="min-h-screen bg-[#f5f8f6] text-slate-800 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

      {/* HEADER */}
      <header className="rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] px-6 py-7 text-white shadow-lg">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
              Akademik
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
              Kenaikan Kelas
            </h1>

            <p className="text-sm text-emerald-50/80 mt-1">
              Kelola kenaikan siswa dari kelas lama
              ke kelas berikutnya secara massal.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-3 text-right">
            <div className="text-[10px] uppercase tracking-wider text-emerald-100">
              Tahun Pelajaran
            </div>

            <div className="font-bold text-lg">
              {academicYear}
            </div>
          </div>

        </div>
      </header>

      {/* MESSAGE */}
      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </div>
      )}

      {/* FILTER */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* TAHUN */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tahun Pelajaran
            </label>

            <input
              type="text"
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(e.target.value)
              }
              placeholder="2026/2027"
              className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* KELAS ASAL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kelas Asal
            </label>

            <select
              value={fromClass}
              onChange={(e) =>
                setFromClass(e.target.value)
              }
              disabled={loadingClasses}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">
                -- Pilih Kelas Asal --
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
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Kelas Tujuan
            </label>

            <select
              value={toClass}
              onChange={(e) =>
                setToClass(e.target.value)
              }
              disabled={
                !fromClass ||
                loadingClasses ||
                status === 'TINGGAL'
              }
              className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">
                -- Pilih Kelas Tujuan --
              </option>

              {availableTargetClasses.map(
                (classroom) => (
                  <option
                    key={classroom.id}
                    value={classroom.name}
                  >
                    {classroom.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | 'NAIK'
                    | 'TINGGAL'
                )
              }
              className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="NAIK">
                Naik Kelas
              </option>

              <option value="TINGGAL">
                Tinggal Kelas
              </option>
            </select>
          </div>

        </div>

        {/* CATATAN */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Catatan
            <span className="font-normal text-slate-400">
              {' '}
              (opsional)
            </span>
          </label>

          <textarea
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            rows={2}
            placeholder="Contoh: Dinyatakan naik berdasarkan hasil rapat kenaikan kelas."
            className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

      </section>

      {/* DAFTAR SISWA */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* TOOLBAR */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 justify-between sm:items-center">

          <div>
            <h2 className="font-bold text-slate-800">
              Daftar Siswa
            </h2>

            <p className="text-xs text-slate-400 mt-0.5">
              {fromClass
                ? `Siswa kelas ${fromClass}`
                : 'Pilih kelas asal terlebih dahulu'}
            </p>
          </div>

          <div className="flex items-center gap-2">

            {selectedIds.length > 0 && (
              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                {selectedIds.length} siswa dipilih
              </span>
            )}

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={resetSelection}
                className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal Pilih
              </button>
            )}

          </div>
        </div>

        {/* CONTENT */}
        {!fromClass ? (

          <div className="p-14 text-center">

            <div className="text-4xl mb-3">
              🎓
            </div>

            <p className="font-semibold text-slate-600">
              Pilih kelas asal
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Daftar siswa akan muncul setelah
              kelas dipilih.
            </p>

          </div>

        ) : loadingStudents ? (

          <div className="p-14 text-center text-sm text-slate-400">
            Memuat data siswa...
          </div>

        ) : students.length === 0 ? (

          <div className="p-14 text-center">

            <div className="text-4xl mb-3">
              📚
            </div>

            <p className="font-semibold text-slate-600">
              Belum ada siswa
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Tidak ditemukan siswa pada kelas ini.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600">

                  <th className="p-3 w-12 text-center">

                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) =>
                        handleSelectAll(
                          e.target.checked
                        )
                      }
                      className="rounded text-emerald-600"
                    />

                  </th>

                  <th className="p-3 text-left">
                    No.
                  </th>

                  <th className="p-3 text-left">
                    NISN
                  </th>

                  <th className="p-3 text-left">
                    Nama Lengkap
                  </th>

                  <th className="p-3 text-left">
                    L/P
                  </th>

                  <th className="p-3 text-left">
                    Kelas
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {students.map(
                  (student, index) => {

                    const checked =
                      selectedIds.includes(
                        student.id
                      );

                    return (
                      <tr
                        key={student.id}
                        className={`transition ${
                          checked
                            ? 'bg-emerald-50/60'
                            : 'hover:bg-slate-50'
                        }`}
                      >

                        <td className="p-3 text-center">

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              handleSelectStudent(
                                student.id
                              )
                            }
                            className="rounded text-emerald-600"
                          />

                        </td>

                        <td className="p-3 text-slate-400">
                          {index + 1}
                        </td>

                        <td className="p-3 font-mono text-xs text-slate-500">
                          {student.nisn}
                        </td>

                        <td className="p-3">

                          <div className="font-semibold text-slate-800">
                            {student.fullname}
                          </div>

                        </td>

                        <td className="p-3">
                          {student.gender}
                        </td>

                        <td className="p-3">

                          <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {student.class_name}
                          </span>

                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* ACTION */}
      {students.length > 0 && (
        <section className="sticky bottom-4">

          <div className="rounded-2xl bg-white border border-slate-200 shadow-xl p-4">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

              <div>

                <div className="text-xs text-slate-400">
                  Siswa yang akan diproses
                </div>

                <div className="text-lg font-bold text-slate-800">
                  {selectedIds.length}{' '}
                  <span className="text-sm font-normal text-slate-400">
                    siswa
                  </span>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-2">

                <button
                  type="button"
                  onClick={handlePromotion}
                  disabled={
                    processing ||
                    selectedIds.length === 0
                  }
                  className={`h-11 px-6 rounded-xl text-sm font-bold text-white shadow transition disabled:opacity-50 ${
                    status === 'NAIK'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {processing
                    ? 'Memproses...'
                    : status === 'NAIK'
                    ? `Naikkan ${
                        selectedIds.length
                      } Siswa`
                    : `Tetapkan ${
                        selectedIds.length
                      } Siswa`}
                </button>

              </div>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}