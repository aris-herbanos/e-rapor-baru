'use client';

import { useState, useEffect } from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  Loader2,
  MessageSquareText,
  Save,
  Sparkles,
  Users,
} from 'lucide-react';

type ClassRoom = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  fullname: string;
  nisn?: string;
  class_name: string;
};

export default function NotesPage() {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState('');

  const [notesData, setNotesData] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [message, setMessage] = useState('');

  /* ============================================================
     AMBIL DAFTAR KELAS
  ============================================================ */

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);

        const res = await fetch('/api/classes');

        if (!res.ok) {
          throw new Error('Gagal memuat daftar kelas.');
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setClasses(data);
        }
      } catch (error) {
        console.error(error);
        setMessage('Error: Gagal memuat daftar kelas.');
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, []);

  /* ============================================================
     AMBIL SANTRI & CATATAN
  ============================================================ */

  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setNotesData({});
      return;
    }

    const fetchStudentsAndNotes = async () => {
      try {
        setLoadingStudents(true);
        setMessage('');

        const studentsRes = await fetch('/api/students');

        if (!studentsRes.ok) {
          throw new Error('Gagal memuat data santri.');
        }

        const allStudents = await studentsRes.json();

        const filteredStudents = Array.isArray(allStudents)
          ? allStudents.filter(
              (student: Student) =>
                student.class_name === selectedClass,
            )
          : [];

        setStudents(filteredStudents);

        /* Ambil catatan */

        const notesRes = await fetch(
          `/api/notes?className=${encodeURIComponent(selectedClass)}`,
        );

        if (!notesRes.ok) {
          throw new Error('Gagal memuat catatan wali kelas.');
        }

        const notesList = await notesRes.json();

        const map: Record<number, string> = {};

        if (Array.isArray(notesList)) {
          notesList.forEach((note: any) => {
            map[note.studentId] = note.note || '';
          });
        }

        setNotesData(map);
      } catch (error: any) {
        console.error(error);

        setStudents([]);
        setNotesData({});
        setMessage(
          `Error: ${error.message || 'Gagal memuat data.'}`,
        );
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudentsAndNotes();
  }, [selectedClass]);

  /* ============================================================
     UPDATE CATATAN
  ============================================================ */

  const handleChange = (
    studentId: number,
    value: string,
  ) => {
    setNotesData((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  /* ============================================================
     SIMPAN CATATAN
  ============================================================ */

  const handleSave = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (!selectedClass || students.length === 0) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const records = students.map((student) => ({
        studentId: student.id,
        note: notesData[student.id] || '',
      }));

      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: selectedClass,
          records,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan catatan.',
        );
      }

      setMessage(
        'Sukses! Catatan wali kelas berhasil disimpan.',
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        `Error: ${
          error.message || 'Gagal menyimpan catatan.'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     JUMLAH CATATAN
  ============================================================ */

  const filledNotes = students.filter(
    (student) =>
      notesData[student.id]?.trim().length > 0,
  ).length;

  const selectedClassData = classes.find(
    (item) => item.name === selectedClass,
  );

  return (
    <div className="min-h-screen bg-[#f5f8f6] px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl space-y-6">

        {/* ======================================================
            HEADER
        ======================================================= */}

        <section className="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#063d31] px-6 py-7 text-white shadow-[0_12px_35px_rgba(6,61,49,0.10)] sm:px-8">

          {/* Dekorasi */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-300/[0.07] blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-amber-300/[0.05] blur-3xl" />

          <div className="relative">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* TITLE */}

              <div className="flex items-start gap-4">

                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/10 bg-white/[0.07] shadow-inner">

                  <MessageSquareText
                    size={23}
                    strokeWidth={1.6}
                    className="text-emerald-200"
                  />

                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-300 text-[#063d31]">
                    <Sparkles
                      size={9}
                      strokeWidth={2.5}
                    />
                  </span>

                </div>

                <div>

                  <div className="mb-1 flex items-center gap-2">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-200/60">
                      Akademik • Rapor
                    </span>

                  </div>

                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    Catatan Wali Kelas
                  </h1>

                  <p className="mt-1.5 max-w-xl text-xs leading-5 text-emerald-50/55 sm:text-sm">
                    Catatan perkembangan, apresiasi, dan nasihat
                    untuk membangun karakter santri.
                  </p>

                </div>

              </div>

              {/* BISMILLAH */}

              <div className="hidden rounded-xl border border-amber-200/10 bg-white/[0.035] px-4 py-3 text-right sm:block">

                <div
                  dir="rtl"
                  className="font-serif text-sm text-amber-200/70"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-[0.16em] text-emerald-100/25">
                  Mendidik dengan ilmu & akhlak
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ======================================================
            MESSAGE
        ======================================================= */}

        {message && (
          <div
            className={[
              'flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm shadow-sm',
              message.includes('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700',
            ].join(' ')}
          >

            {message.includes('Sukses') ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
            ) : (
              <FileText
                size={18}
                className="mt-0.5 shrink-0"
              />
            )}

            <span>{message}</span>

          </div>
        )}

        {/* ======================================================
            FILTER & INFO
        ======================================================= */}

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">

          {/* FILTER */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

              <div className="flex-1">

                <div className="mb-2 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <BookOpenCheck
                      size={15}
                      strokeWidth={1.7}
                    />
                  </div>

                  <label className="text-xs font-semibold text-slate-700">
                    Kelas yang Dikelola
                  </label>

                </div>

                <div className="relative">

                  <select
                    value={selectedClass}
                    onChange={(e) =>
                      setSelectedClass(
                        e.target.value,
                      )
                    }
                    disabled={loadingClasses}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <option value="">
                      {loadingClasses
                        ? 'Memuat kelas...'
                        : '-- Pilih Kelas --'}
                    </option>

                    {classes.map((cls) => (
                      <option
                        key={cls.id}
                        value={cls.name}
                      >
                        Kelas {cls.name}
                      </option>
                    ))}

                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                </div>

                <p className="mt-2 text-[10px] text-slate-400">
                  Pilih kelas untuk menampilkan daftar santri
                  dan catatan perkembangan.
                </p>

              </div>

            </div>

          </div>

          {/* STAT */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:min-w-[270px]">

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <div className="flex items-center justify-between">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Users
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>

                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Santri
                </span>

              </div>

              <div className="mt-3 text-xl font-bold tracking-tight text-slate-800">
                {students.length}
              </div>

              <div className="mt-0.5 text-[10px] text-slate-400">
                {selectedClass
                  ? `Kelas ${selectedClass}`
                  : 'Belum dipilih'}
              </div>

            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.035)]">

              <div className="flex items-center justify-between">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                  <FileText
                    size={16}
                    strokeWidth={1.7}
                  />
                </div>

                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Terisi
                </span>

              </div>

              <div className="mt-3 text-xl font-bold tracking-tight text-slate-800">
                {filledNotes}
              </div>

              <div className="mt-0.5 text-[10px] text-slate-400">
                dari {students.length} santri
              </div>

            </div>

          </div>

        </section>

        {/* ======================================================
            CONTENT
        ======================================================= */}

        {selectedClass ? (

          <form
            onSubmit={handleSave}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_28px_rgba(15,23,42,0.045)]"
          >

            {/* CONTENT HEADER */}

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">

                    <GraduationCap
                      size={19}
                      strokeWidth={1.7}
                    />

                  </div>

                  <div>

                    <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
                      Perkembangan Santri
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                      Kelas {selectedClass}
                      {selectedClassData
                        ? ` • ${selectedClassData.name}`
                        : ''}
                    </p>

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    loadingStudents ||
                    students.length === 0
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#07543f] px-5 text-xs font-semibold text-white shadow-[0_5px_15px_rgba(7,84,63,0.18)] transition-all hover:bg-[#064735] hover:shadow-[0_7px_18px_rgba(7,84,63,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save
                        size={15}
                        strokeWidth={1.8}
                      />
                      Simpan Catatan
                    </>
                  )}

                </button>

              </div>

            </div>

            {/* LOADING */}

            {loadingStudents ? (

              <div className="flex min-h-[300px] flex-col items-center justify-center px-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">

                  <Loader2
                    size={22}
                    className="animate-spin"
                  />

                </div>

                <p className="mt-4 text-sm font-medium text-slate-600">
                  Memuat data santri...
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Mohon tunggu sebentar.
                </p>

              </div>

            ) : (

              /* ==================================================
                 TABLE
              ================================================== */

              <div className="px-3 pb-3 sm:px-5 sm:pb-5">

                <div className="overflow-hidden rounded-xl border border-slate-200">

                  <div className="max-h-[580px] overflow-auto">

                    <table className="w-full min-w-[720px] border-collapse">

                      <thead className="sticky top-0 z-10">

                        <tr className="border-b border-emerald-900/10 bg-[#f2f6f4]">

                          <th className="w-16 px-4 py-3.5 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            No
                          </th>

                          <th className="w-[30%] px-4 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Santri
                          </th>

                          <th className="px-4 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Catatan Perkembangan
                          </th>

                        </tr>

                      </thead>

                      <tbody className="divide-y divide-slate-100">

                        {students.length === 0 ? (

                          <tr>

                            <td
                              colSpan={3}
                              className="px-6 py-16 text-center"
                            >

                              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">

                                <Users
                                  size={21}
                                  strokeWidth={1.6}
                                />

                              </div>

                              <p className="mt-4 text-sm font-medium text-slate-600">
                                Belum ada santri
                              </p>

                              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                                Tidak ditemukan data santri
                                pada kelas yang dipilih.
                              </p>

                            </td>

                          </tr>

                        ) : (

                          students.map(
                            (student, index) => {

                              const note =
                                notesData[
                                  student.id
                                ] || '';

                              const hasNote =
                                note.trim()
                                  .length > 0;

                              return (
                                <tr
                                  key={student.id}
                                  className="group align-top transition-colors hover:bg-emerald-50/[0.25]"
                                >

                                  {/* NO */}

                                  <td className="px-4 py-4 text-center">

                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-semibold text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                      {index + 1}
                                    </span>

                                  </td>

                                  {/* SANTRI */}

                                  <td className="px-4 py-4">

                                    <div className="flex items-start gap-3">

                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-xs font-bold text-emerald-700">

                                        {student.fullname
                                          ?.charAt(
                                            0,
                                          )
                                          ?.toUpperCase() ||
                                          'S'}

                                      </div>

                                      <div className="min-w-0">

                                        <div className="truncate text-xs font-semibold text-slate-800">
                                          {student.fullname}
                                        </div>

                                        {student.nisn && (
                                          <div className="mt-1 text-[9px] text-slate-400">
                                            NISN {student.nisn}
                                          </div>
                                        )}

                                        <div className="mt-1 inline-flex items-center rounded-md bg-slate-50 px-1.5 py-0.5 text-[8px] font-medium text-slate-400">
                                          Santri
                                        </div>

                                      </div>

                                    </div>

                                  </td>

                                  {/* NOTE */}

                                  <td className="px-3 py-3">

                                    <div className="relative">

                                      <textarea
                                        rows={3}
                                        value={note}
                                        onChange={(e) =>
                                          handleChange(
                                            student.id,
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Tuliskan perkembangan, prestasi, sikap, atau nasihat untuk santri..."
                                        className="min-h-[78px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50/40 px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                                      />

                                      <div className="mt-1 flex items-center justify-between px-1">

                                        <span
                                          className={[
                                            'text-[9px]',
                                            hasNote
                                              ? 'text-emerald-500'
                                              : 'text-slate-300',
                                          ].join(
                                            ' ',
                                          )}
                                        >
                                          {hasNote
                                            ? 'Catatan siap disimpan'
                                            : 'Belum ada catatan'}
                                        </span>

                                        <span className="text-[9px] text-slate-300">
                                          {note.length}{' '}
                                          karakter
                                        </span>

                                      </div>

                                    </div>

                                  </td>

                                </tr>
                              );
                            },
                          )

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            )}

            {/* FOOTER */}

            {!loadingStudents &&
              students.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3.5 sm:px-6">

                  <div className="flex flex-col gap-2 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2">

                      <CheckCircle2
                        size={13}
                        className="text-emerald-500"
                      />

                      <span>
                        {filledNotes} dari{' '}
                        {students.length} catatan
                        telah diisi
                      </span>

                    </div>

                    <span className="text-slate-300">
                      Catatan akan ditampilkan pada
                      rapor santri
                    </span>

                  </div>

                </div>
              )}

          </form>

        ) : (

          /* ======================================================
             EMPTY STATE
          ======================================================= */

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_28px_rgba(15,23,42,0.035)]">

            <div className="relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden px-6 py-14 text-center">

              <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-emerald-100/30 blur-3xl" />

              <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-amber-100/25 blur-3xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">

                <MessageSquareText
                  size={28}
                  strokeWidth={1.5}
                />

              </div>

              <div className="relative mt-6">

                <h2 className="text-base font-semibold text-slate-700">
                  Pilih Kelas Terlebih Dahulu
                </h2>

                <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-400">
                  Pilih kelas dari menu di atas untuk
                  melihat daftar santri dan mulai
                  menuliskan catatan perkembangan
                  mereka.
                </p>

              </div>

              <div className="relative mt-6 flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/70 px-3.5 py-2">

                <Sparkles
                  size={12}
                  className="text-amber-500"
                />

                <span className="text-[9px] font-medium text-amber-700">
                  Catatan dengan ilmu, adab, dan kasih sayang
                </span>

              </div>

            </div>

          </section>

        )}

      </div>

    </div>
  );
}