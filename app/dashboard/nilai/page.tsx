
'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  RefreshCw,
  ClipboardList,
  Users,
  BookOpen,
} from 'lucide-react';

type AssessmentItem = {
  id: number;
  studentId: number;
  tpId: number;
  score: number;
  type: string;
  student?: {
    id: number;
    fullname: string;
    class_name?: string;
  };
};

type ClassRoom = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
};

export default function NilaiPage() {
  const [assessments, setAssessments] = useState<AssessmentItem[]>([]);
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // =========================================================
  // AMBIL DATA
  // =========================================================

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setMessage('');

      const [classRes, subjectRes, assessRes] = await Promise.all([
        fetch('/api/classes', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
        fetch('/api/assessment', { cache: 'no-store' }),
      ]);

      const [classData, subjectData, assessData] = await Promise.all([
        classRes.json(),
        subjectRes.json(),
        assessRes.json(),
      ]);

      if (!classRes.ok || !subjectRes.ok || !assessRes.ok) {
        throw new Error('Gagal mengambil data dari server.');
      }

      setClasses(
        Array.isArray(classData)
          ? classData
          : classData?.data || []
      );

      setSubjects(
        Array.isArray(subjectData)
          ? subjectData
          : subjectData?.data || subjectData?.subjects || []
      );

      setAssessments(
        Array.isArray(assessData)
          ? assessData
          : assessData?.data || []
      );
    } catch (err) {
      console.error('Gagal memuat rekap nilai:', err);
      setMessage('Gagal memuat rekapitulasi nilai asesmen. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredAssessments = useMemo(() => {
    return assessments.filter((item) => {
      const matchClass =
        !selectedClass ||
        item.student?.class_name === selectedClass;

      const matchSubject =
        !selectedSubject ||
        String(item.tpId) === selectedSubject;

      return matchClass && matchSubject;
    });
  }, [assessments, selectedClass, selectedSubject]);

  // =========================================================
  // STATISTIK
  // =========================================================

  const totalStudents = useMemo(() => {
    return new Set(
      filteredAssessments.map((item) => item.studentId)
    ).size;
  }, [filteredAssessments]);

  const averageScore = useMemo(() => {
    if (filteredAssessments.length === 0) return 0;

    const total = filteredAssessments.reduce(
      (sum, item) => sum + Number(item.score || 0),
      0
    );

    return total / filteredAssessments.length;
  }, [filteredAssessments]);

  // =========================================================
  // PREDIKAT
  // =========================================================

  const getPredicate = (score: number) => {
    if (score >= 90) return 'Sangat Baik (Mumtaz)';
    if (score >= 80) return 'Baik (Jeid Jiddan)';
    if (score >= 70) return 'Cukup Baik (Jeid)';
    if (score >= 60) return 'Cukup (Maqbul)';
    return 'Perlu Bimbingan';
  };

  const getPredicateColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    if (score >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  // =========================================================
  // TAMPILAN
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f0f0f1] p-4 sm:p-5">

      {/* HEADER */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[23px] font-normal leading-tight text-[#1d2327]">
            Rekapitulasi Nilai Asesmen
          </h1>
          <p className="mt-1 text-[13px] text-[#646970]">
            Rekap nilai santri berdasarkan hasil input asesmen guru.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          disabled={loading}
          className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-sm border border-[#2271b1] bg-[#2271b1] px-3 text-[13px] font-medium text-white hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            size={14}
            className={loading ? 'animate-spin' : ''}
          />
          {loading ? 'Memuat...' : 'Perbarui Data'}
        </button>
      </div>

      {/* NOTIFIKASI */}
      {message && (
        <div className="mb-4 border-l-4 border-red-500 bg-white px-4 py-3 text-[13px] text-[#1d2327] shadow-sm">
          {message}
        </div>
      )}

      {/* RINGKASAN */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-[#2271b1]">
            <ClipboardList size={20} />
          </div>
          <div>
            <p className="text-[12px] text-[#646970]">
              Total Catatan Asesmen
            </p>
            <p className="text-[21px] font-semibold leading-tight text-[#1d2327]">
              {filteredAssessments.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center bg-green-50 text-green-700">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[12px] text-[#646970]">
              Jumlah Santri
            </p>
            <p className="text-[21px] font-semibold leading-tight text-[#1d2327]">
              {totalStudents}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border border-[#dcdcde] bg-white px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center bg-purple-50 text-purple-700">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[12px] text-[#646970]">
              Rata-rata Nilai
            </p>
            <p className="text-[21px] font-semibold leading-tight text-[#1d2327]">
              {averageScore.toFixed(1)}
            </p>
          </div>
        </div>

      </div>

      {/* FILTER */}
      <div className="mb-4 border border-[#dcdcde] bg-white shadow-sm">

        <div className="border-b border-[#dcdcde] px-4 py-3">
          <h2 className="text-[14px] font-semibold text-[#1d2327]">
            Filter Data
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">

          <div>
            <label
              htmlFor="filter-class"
              className="mb-1.5 block text-[13px] font-medium text-[#1d2327]"
            >
              Kelas
            </label>

            <select
              id="filter-class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-9 w-full rounded-sm border border-[#8c8f94] bg-white px-2.5 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
            >
              <option value="">Semua Kelas</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  Kelas {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-subject"
              className="mb-1.5 block text-[13px] font-medium text-[#1d2327]"
            >
              Mata Pelajaran
            </label>

            <select
              id="filter-subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="h-9 w-full rounded-sm border border-[#8c8f94] bg-white px-2.5 text-[13px] text-[#1d2327] outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
            >
              <option value="">Semua Mata Pelajaran</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={String(subj.id)}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* TABEL */}
      <div className="border border-[#dcdcde] bg-white shadow-sm">

        <div className="flex flex-col gap-1 border-b border-[#dcdcde] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[14px] font-semibold text-[#1d2327]">
            Daftar Nilai Berdasarkan Asesmen
          </h2>

          <span className="text-[12px] text-[#646970]">
            Menampilkan {filteredAssessments.length} catatan
          </span>
        </div>

        {loading ? (
          <div className="px-4 py-12 text-center text-[13px] text-[#646970]">
            Memuat rekapitulasi nilai...
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <ClipboardList
              size={32}
              className="mx-auto mb-2 text-[#a7aaad]"
            />
            <p className="text-[13px] font-medium text-[#1d2327]">
              Belum ada data asesmen
            </p>
            <p className="mt-1 text-[12px] text-[#646970]">
              Belum ada nilai yang sesuai dengan filter yang dipilih.
              Silakan periksa kembali filter atau input melalui menu Input Asesmen.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">

              <thead>
                <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-[12px] font-semibold text-[#2c3338]">
                  <th className="whitespace-nowrap px-3 py-3 text-center">No.</th>
                  <th className="whitespace-nowrap px-3 py-3">Nama Santri</th>
                  <th className="whitespace-nowrap px-3 py-3">Kelas</th>
                  <th className="whitespace-nowrap px-3 py-3">ID TP</th>
                  <th className="whitespace-nowrap px-3 py-3">Jenis Asesmen</th>
                  <th className="whitespace-nowrap px-3 py-3 text-center">Nilai</th>
                  <th className="whitespace-nowrap px-3 py-3">Predikat / Keterangan</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssessments.map((item, index) => {
                  const score = Number(item.score) || 0;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#f0f0f1] hover:bg-[#f6f7f7]"
                    >
                      <td className="whitespace-nowrap px-3 py-3 text-center text-[#646970]">
                        {index + 1}
                      </td>

                      <td className="min-w-[180px] px-3 py-3 font-medium text-[#2271b1]">
                        {item.student?.fullname || `Santri ID: ${item.studentId}`}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-[#50575e]">
                        {item.student?.class_name || '-'}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-[#50575e]">
                        #{item.tpId}
                      </td>

                      <td className="whitespace-nowrap px-3 py-3">
                        <span
                          className={`inline-block rounded-sm px-2 py-1 text-[11px] font-medium ${
                            item.type === 'FORMATIVE'
                              ? 'bg-[#e5f5fa] text-[#0073aa]'
                              : 'bg-[#fcf0d5] text-[#8a6116]'
                          }`}
                        >
                          {item.type === 'FORMATIVE' ? 'Formatif' : 'Sumatif'}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-3 py-3 text-center font-semibold text-[#1d2327]">
                        {score}
                      </td>

                      <td className="min-w-[170px] px-3 py-3">
                        <span
                          className={`inline-block rounded-sm px-2 py-1 text-[11px] font-medium ${getPredicateColor(score)}`}
                        >
                          {getPredicate(score)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

        {/* FOOTER TABEL */}
        {!loading && filteredAssessments.length > 0 && (
          <div className="border-t border-[#dcdcde] bg-[#f6f7f7] px-4 py-2.5 text-[12px] text-[#646970]">
            Total: <strong className="text-[#1d2327]">{filteredAssessments.length}</strong> catatan asesmen
          </div>
        )}

      </div>
    </main>
  );
}
