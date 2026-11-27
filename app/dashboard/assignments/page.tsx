'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Users,
  X,
} from 'lucide-react';

type Teacher = {
  id: number;
  fullname: string;
  identity_number?: string | null;
  status?: string | null;
};

type Subject = {
  id: number;
  name: string;
};

type Assignment = {
  id: number;
  teacherId?: number;
  subjectId?: number;
  className?: string | null;
  teacher?: { id?: number; fullname?: string | null } | null;
  subject?: { id?: number; name?: string | null } | null;
};

function normalizeArray<T>(data: unknown, possibleKeys: string[] = []): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object') {
    const objectData = data as Record<string, unknown>;
    for (const key of possibleKeys) {
      if (Array.isArray(objectData[key])) return objectData[key] as T[];
    }
    if (Array.isArray(objectData.data)) return objectData.data as T[];
  }
  return [];
}

async function getApiError(response: Response, fallback: string) {
  try {
    const data = await response.json();
    return data?.message || data?.error || fallback;
  } catch {
    return fallback;
  }
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [teacherId, setTeacherId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [className, setClassName] = useState('7A');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setMessage('');
      const [resAssig, resTeach, resSubj] = await Promise.all([
        fetch('/api/assignments', { cache: 'no-store' }),
        fetch('/api/teachers', { cache: 'no-store' }),
        fetch('/api/subjects', { cache: 'no-store' }),
      ]);

      if (!resAssig.ok) throw new Error(await getApiError(resAssig, 'Gagal memuat data penugasan.'));
      const dataAssig = await resAssig.json();
      setAssignments(normalizeArray<Assignment>(dataAssig, ['assignments']));

      if (resTeach.ok) {
        const dataTeach = await resTeach.json();
        setTeachers(normalizeArray<Teacher>(dataTeach, ['teachers', 'teacher']));
      } else {
        setTeachers([]);
      }

      if (resSubj.ok) {
        const dataSubj = await resSubj.json();
        setSubjects(normalizeArray<Subject>(dataSubj, ['subjects', 'subject']));
      } else {
        setSubjects([]);
      }
    } catch (error: any) {
      setMessageType('error');
      setMessage(error?.message || 'Gagal memuat data.');
      setAssignments([]);
      setTeachers([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTeacherId('');
    setSubjectId('');
    setClassName('7A');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    if (!teacherId || !subjectId || !className) {
      setMessageType('error');
      setMessage('Silakan lengkapi semua field yang wajib.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacherId, subjectId, className }),
      });
      if (!res.ok) throw new Error(await getApiError(res, 'Gagal menyimpan penugasan.'));
      await res.json();
      setMessageType('success');
      setMessage('Penugasan guru berhasil ditambahkan.');
      resetForm();
      await fetchData();
    } catch (error: any) {
      setMessageType('error');
      setMessage(error?.message || 'Terjadi kesalahan saat menyimpan penugasan.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssignments = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return assignments;
    return assignments.filter((a) => {
      const teacherName = a.teacher?.fullname || '';
      const subjectName = a.subject?.name || '';
      const classNameValue = a.className || '';
      return (
        teacherName.toLowerCase().includes(keyword) ||
        subjectName.toLowerCase().includes(keyword) ||
        classNameValue.toLowerCase().includes(keyword)
      );
    });
  }, [assignments, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1d2327]">Penugasan Guru Pengampu</h1>
          <p className="mt-1 text-sm text-[#646970]">
            Atur guru, mata pelajaran, dan kelas secara terpusat.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded border border-[#c3c4c7] bg-white px-4 py-2 text-sm hover:bg-[#f6f7f7] disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Penugasan" value={assignments.length} />
        <StatCard label="Guru" value={teachers.length} />
        <StatCard label="Mata Pelajaran" value={subjects.length} />
      </div>

      {/* Message */}
      {message && (
        <div className={`flex items-start gap-3 rounded border p-3 text-sm ${
          messageType === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-red-200 bg-red-50 text-red-800'
        }`}>
          {messageType === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="flex-1">{message}</span>
          <button onClick={() => setMessage('')} className="opacity-60 hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        {/* Form */}
        <div className="rounded-lg border border-[#c3c4c7] bg-white">
          <div className="border-b border-[#c3c4c7] px-5 py-4">
            <h2 className="font-semibold text-[#1d2327]">Tambah Penugasan</h2>
            <p className="mt-0.5 text-xs text-[#646970]">Tentukan guru, mapel, dan kelas</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#1d2327]">
                Ustadz / Guru <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                  disabled={loading || teachers.length === 0}
                  className="w-full appearance-none rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >
                  <option value="">
                    {loading ? 'Memuat...' : teachers.length === 0 ? 'Belum ada guru' : '— Pilih Guru —'}
                  </option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.fullname}{t.status === 'Nonaktif' ? ' — Nonaktif' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#1d2327]">
                Mata Pelajaran <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  required
                  disabled={loading || subjects.length === 0}
                  className="w-full appearance-none rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] disabled:bg-[#f6f7f7]"
                >
                  <option value="">
                    {loading ? 'Memuat...' : subjects.length === 0 ? 'Belum ada mapel' : '— Pilih Mapel —'}
                  </option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#1d2327]">
                Kelas Target <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full appearance-none rounded border border-[#8c8f94] px-3 py-2 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                >
                  {['7A','7B','8A','8B','9A','9B','10A','10B','11A','11B','12A','12B'].map((c) => (
                    <option key={c} value={c}>Kelas {c}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#646970]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || loading || teachers.length === 0 || subjects.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#2271b1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#135e96] disabled:opacity-50"
            >
              {submitting ? (
                <><Loader2 size={16} className="animate-spin" /> Menyimpan...</>
              ) : (
                <><Plus size={16} /> Simpan Penugasan</>
              )}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="rounded-lg border border-[#c3c4c7] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#c3c4c7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#1d2327]">Daftar Penugasan</h2>
              <p className="text-xs text-[#646970]">
                {filteredAssignments.length} dari {assignments.length} penugasan
              </p>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#646970]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari guru, mapel, kelas..."
                className="w-full rounded border border-[#8c8f94] py-2 pl-9 pr-3 text-sm focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1] sm:w-64"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center text-sm text-[#646970]">
              <Loader2 className="mr-2 animate-spin" size={18} /> Memuat data...
            </div>
          ) : assignments.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-sm text-[#646970]">
              <BookOpen size={32} className="mb-3 text-[#c3c4c7]" />
              Belum ada penugasan.
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center text-sm text-[#646970]">
              <Search size={32} className="mb-3 text-[#c3c4c7]" />
              Data tidak ditemukan.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#c3c4c7] bg-[#f6f7f7] text-left text-[#1d2327]">
                    <th className="px-5 py-3 font-medium">Pengajar</th>
                    <th className="px-5 py-3 font-medium">Mata Pelajaran</th>
                    <th className="px-5 py-3 text-center font-medium">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((a) => (
                    <tr key={a.id} className="border-b border-[#c3c4c7] hover:bg-[#f6f7f7]">
                      <td className="px-5 py-3 font-medium text-[#1d2327]">
                        {a.teacher?.fullname || '—'}
                      </td>
                      <td className="px-5 py-3">{a.subject?.name || '—'}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="rounded bg-[#f0f0f1] px-2 py-0.5 text-xs">
                          Kelas {a.className || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#c3c4c7] bg-white p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-[#646970]">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-[#1d2327]">{value}</div>
    </div>
  );
}