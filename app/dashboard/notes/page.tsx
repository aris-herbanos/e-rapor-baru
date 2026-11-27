
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import {
  MessageSquareText,
  Users,
  FileText,
  Save,
  Loader2,
  CheckCircle2,
  RefreshCw,
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

type NoteRecord = {
  studentId: number;
  note?: string | null;
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

  // =========================================================
  // AMBIL DAFTAR KELAS
  // =========================================================

  useEffect(() => {
    let active = true;

    const fetchClasses = async () => {
      try {
        setLoadingClasses(true);

        const res = await fetch('/api/classes', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Gagal memuat daftar kelas.');
        }

        const data = await res.json();

        const classList = Array.isArray(data)
          ? data
          : data?.data || [];

        if (active) {
          setClasses(classList);
        }
      } catch (error) {
        console.error(error);

        if (active) {
          setMessage('Error: Gagal memuat daftar kelas.');
        }
      } finally {
        if (active) {
          setLoadingClasses(false);
        }
      }
    };

    fetchClasses();

    return () => {
      active = false;
    };
  }, []);

  // =========================================================
  // AMBIL DATA SANTRI DAN CATATAN
  // =========================================================

  useEffect(() => {
    let active = true;

    if (!selectedClass) {
      setStudents([]);
      setNotesData({});
      setMessage('');
      return;
    }

    const fetchStudentsAndNotes = async () => {
      try {
        setLoadingStudents(true);
        setMessage('');

        setStudents([]);
        setNotesData({});

        const studentsRes = await fetch('/api/students', {
          cache: 'no-store',
        });

        if (!studentsRes.ok) {
          throw new Error('Gagal memuat data santri.');
        }

        const allStudentsData = await studentsRes.json();

        const allStudents = Array.isArray(allStudentsData)
          ? allStudentsData
          : allStudentsData?.data || [];

        const filteredStudents: Student[] = allStudents.filter(
          (student: Student) =>
            student.class_name === selectedClass,
        );

        const notesRes = await fetch(
          `/api/notes?className=${encodeURIComponent(selectedClass)}`,
          {
            cache: 'no-store',
          },
        );

        if (!notesRes.ok) {
          throw new Error('Gagal memuat catatan wali kelas.');
        }

        const notesList = await notesRes.json();

        const map: Record<number, string> = {};

        if (Array.isArray(notesList)) {
          notesList.forEach((note: NoteRecord) => {
            map[note.studentId] = note.note || '';
          });
        } else if (Array.isArray(notesList?.data)) {
          notesList.data.forEach((note: NoteRecord) => {
            map[note.studentId] = note.note || '';
          });
        }

        if (active) {
          setStudents(filteredStudents);
          setNotesData(map);
        }
      } catch (error) {
        console.error(error);

        if (active) {
          setStudents([]);
          setNotesData({});

          setMessage(
            `Error: ${
              error instanceof Error
                ? error.message
                : 'Gagal memuat data.'
            }`,
          );
        }
      } finally {
        if (active) {
          setLoadingStudents(false);
        }
      }
    };

    fetchStudentsAndNotes();

    return () => {
      active = false;
    };
  }, [selectedClass]);

  // =========================================================
  // UPDATE CATATAN
  // =========================================================

  const handleChange = (
    studentId: number,
    value: string,
  ) => {
    setNotesData((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // =========================================================
  // SIMPAN CATATAN
  // =========================================================

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedClass || students.length === 0 || loading) {
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
        'success:Sukses! Catatan wali kelas berhasil disimpan.',
      );
    } catch (error) {
      console.error(error);

      setMessage(
        `error:${
          error instanceof Error
            ? error.message
            : 'Gagal menyimpan catatan.'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // STATISTIK
  // =========================================================

  const filledNotes = students.filter(
    (student) =>
      notesData[student.id]?.trim().length > 0,
  ).length;

  const selectedClassData = classes.find(
    (item) => item.name === selectedClass,
  );

  const isSuccess = message.startsWith('success:');
  const displayMessage = message.replace(/^(success:|error:)/, '');

  // =========================================================
  // TAMPILAN
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f0f0f1] p-4 sm:p-5">

      {/* HEADER */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-[23px] font-normal leading-tight text-[#1d2327]">
            Catatan Wali Kelas
          </h1>

          <p className="mt-1 text-[13px] text-[#646970]">
            Kelola catatan perkembangan dan nasihat untuk setiap santri.
          </p>
        </div>

        {selectedClass && (
          <button
            type="button"
            onClick={() => setSelectedClass((prev) => prev)}
            disabled={loadingStudents || loading}
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-sm border border-[#8c8f94] bg-white px-3 text-[13px] font-medium text-[#2c3338] hover:bg-[#f6f7f7] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={14}
              className={loadingStudents ? 'animate-spin' : ''}
            />
            Data Kelas
          </button>
        )}

      </div>

      {/* NOTIFIKASI */}

      {message && (
        <div
          className={`mb-4 flex items-start gap-2 border-l-4 bg-white px-4 py-3 text-[13px] shadow-sm ${
            isSuccess
              ? 'border-green-600 text-[#1d2327]'
              : 'border-red-600 text-[#1d2327]'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-green-700"
            />
          ) : (
            <FileText
              size={16}
              className="mt-0.5 shrink-0 text-red-600"
            />
          )}

          <span>{displayMessage}</span>
        </div>
      )}

      {/* FILTER KELAS */}

      <section className="mb-4 border border-[#dcdcde] bg-white shadow-sm">

        <div className="border-b border-[#dcdcde] px-4 py-3">
          <h2 className="text-[14px] font-semibold text-[#1d2327]">
            Pilih Kelas
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">

          <div>
            <label
              htmlFor="selected-class"
              className="mb-1.5 block text-[13px] font-medium text-[#1d2327]"
            >
              Kelas yang Dikelola
            </label>

            <select
              id="selected-class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              disabled={loadingClasses}
              className="h-9 w-full rounded-sm border border-[#8c8f94] bg-white px-2.5 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {loadingClasses
                  ? 'Memuat kelas...'
                  : '-- Pilih Kelas --'}
              </option>

              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  Kelas {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <p className="pb-2 text-[12px] text-[#646970]">
              Pilih kelas untuk melihat daftar santri dan mengisi catatan wali kelas.
            </p>
          </div>

        </div>

      </section>

      {/* RINGKASAN */}

      {selectedClass && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-blue-50 text-[#2271b1]">
              <Users size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Jumlah Santri
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {students.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-green-50 text-green-700">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Catatan Terisi
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {filledNotes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center bg-orange-50 text-orange-700">
              <FileText size={18} />
            </div>

            <div>
              <p className="text-[12px] text-[#646970]">
                Belum Terisi
              </p>
              <p className="text-[20px] font-semibold leading-tight text-[#1d2327]">
                {students.length - filledNotes}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* FORM CATATAN */}

      {selectedClass ? (

        <form
          onSubmit={handleSave}
          className="border border-[#dcdcde] bg-white shadow-sm"
        >

          {/* HEADER TABEL */}

          <div className="flex flex-col gap-3 border-b border-[#dcdcde] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-[14px] font-semibold text-[#1d2327]">
                Daftar Catatan Perkembangan Santri
              </h2>

              <p className="mt-1 text-[12px] text-[#646970]">
                {selectedClassData
                  ? `Kelas ${selectedClassData.name}`
                  : `Kelas ${selectedClass}`}
                {' '}• {students.length} santri
              </p>
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                loadingStudents ||
                students.length === 0
              }
              className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Simpan Catatan
                </>
              )}
            </button>

          </div>

          {/* LOADING */}

          {loadingStudents ? (

            <div className="px-4 py-14 text-center">
              <Loader2
                size={24}
                className="mx-auto animate-spin text-[#2271b1]"
              />

              <p className="mt-3 text-[13px] text-[#646970]">
                Memuat data santri dan catatan...
              </p>
            </div>

          ) : students.length === 0 ? (

            <div className="px-4 py-14 text-center">
              <Users
                size={30}
                className="mx-auto text-[#a7aaad]"
              />

              <p className="mt-3 text-[13px] font-medium text-[#1d2327]">
                Belum ada santri
              </p>

              <p className="mt-1 text-[12px] text-[#646970]">
                Tidak ditemukan santri pada kelas yang dipilih.
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] border-collapse text-left text-[13px]">

                <thead>
                  <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[12px] font-semibold text-[#2c3338]">

                    <th className="w-14 px-3 py-3 text-center">
                      No.
                    </th>

                    <th className="w-[28%] px-3 py-3">
                      Nama Santri
                    </th>

                    <th className="px-3 py-3">
                      Catatan Perkembangan
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => {
                    const note = notesData[student.id] || '';
                    const hasNote = note.trim().length > 0;

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-[#f0f0f1] align-top hover:bg-[#f6f7f7]"
                      >

                        <td className="px-3 py-4 text-center text-[#646970]">
                          {index + 1}
                        </td>

                        <td className="px-3 py-4">

                          <div className="font-medium text-[#2271b1]">
                            {student.fullname}
                          </div>

                          {student.nisn && (
                            <div className="mt-1 text-[11px] text-[#646970]">
                              NISN: {student.nisn}
                            </div>
                          )}

                        </td>

                        <td className="px-3 py-3">

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
                            className="min-h-[76px] w-full resize-y rounded-sm border border-[#8c8f94] bg-white px-3 py-2 text-[13px] leading-5 text-[#1d2327] outline-none placeholder:text-[#a7aaad] focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                          />

                          <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
                            <span
                              className={
                                hasNote
                                  ? 'text-green-700'
                                  : 'text-[#8c8f94]'
                              }
                            >
                              {hasNote
                                ? 'Catatan sudah diisi'
                                : 'Belum ada catatan'}
                            </span>

                            <span className="text-[#8c8f94]">
                              {note.length} karakter
                            </span>
                          </div>

                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>

          )}

          {/* FOOTER */}

          {!loadingStudents && students.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-[12px] text-[#646970]">
                {filledNotes} dari {students.length} catatan telah diisi.
              </p>

              <p className="text-[11px] text-[#8c8f94]">
                Catatan akan ditampilkan pada rapor santri.
              </p>

            </div>
          )}

        </form>

      ) : (

        /* BELUM MEMILIH KELAS */

        <div className="border border-[#dcdcde] bg-white px-4 py-16 text-center shadow-sm">

          <MessageSquareText
            size={32}
            className="mx-auto text-[#a7aaad]"
          />

          <h2 className="mt-3 text-[15px] font-medium text-[#1d2327]">
            Pilih Kelas Terlebih Dahulu
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-[#646970]">
            Silakan pilih kelas melalui menu di atas untuk menampilkan daftar santri dan mengisi catatan wali kelas.
          </p>

        </div>

      )}

    </main>
  );
}
