'use client';

import { useEffect, useState } from 'react';

type Teacher = {
  id: number;
  identity_number: string;
  fullname: string;
  role: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [identityNumber, setIdentityNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('TEACHER');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchTeachers = async () => {
    try {
      setLoadingData(true);

      const res = await fetch('/api/teachers', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (res.ok) {
        setTeachers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity_number: identityNumber,
          fullname,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Gagal menyimpan data guru.',
        );
      }

      setMessage(
        'Sukses! Guru / Ustadz berhasil didaftarkan.',
      );

      setIdentityNumber('');
      setFullname('');
      setPassword('');
      setRole('TEACHER');

      await fetchTeachers();
    } catch (err: any) {
      setMessage(
        `Error: ${
          err?.message || 'Terjadi kesalahan.'
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  const totalTeachers = teachers.length;

  const totalAdmins = teachers.filter(
    (teacher) => teacher.role === 'ADMIN',
  ).length;

  const totalTeachingStaff = teachers.filter(
    (teacher) => teacher.role === 'TEACHER',
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="relative overflow-hidden border-b border-emerald-900/10 bg-gradient-to-br from-[#063b2c] via-[#07553e] to-[#0b6b4e]">
        {/* Dekorasi */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-[#d6b86a]/20" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/[0.03]" />

        <div className="relative mx-auto max-w-6xl px-5 py-7 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d6b86a] text-[10px] font-bold text-[#063b2c]">
                  ✦
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-50">
                  Akademik & Pengajar
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Guru & Ustadz
              </h1>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-emerald-100/80">
                Kelola data pengajar, akun guru, dan
                administrator Pondok Pesantren Terpadu
                Ulul Albab.
              </p>
            </div>

            <div className="hidden sm:block">
              <div className="text-right">
                <div
                  className="font-serif text-xl text-[#e8d18b]"
                  dir="rtl"
                >
                  العلم نور
                </div>

                <div className="mt-1 text-[10px] uppercase tracking-widest text-emerald-100/60">
                  Ilmu adalah cahaya
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <main className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
        {/* =======================================================
            STATISTIC
        ======================================================== */}

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Total Pengajar"
            value={totalTeachers}
            icon="👥"
          />

          <StatCard
            label="Guru / Ustadz"
            value={totalTeachingStaff}
            icon="📚"
          />

          <StatCard
            label="Administrator"
            value={totalAdmins}
            icon="🛡"
          />
        </div>

        {/* =======================================================
            MESSAGE
        ======================================================== */}

        {message && (
          <div
            className={`mb-5 flex items-start gap-3 rounded-xl border px-4 py-3.5 text-sm ${
              message.startsWith('Sukses')
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            <span className="mt-0.5 text-base">
              {message.startsWith('Sukses')
                ? '✓'
                : '!'
              }
            </span>

            <span>{message}</span>
          </div>
        )}

        {/* =======================================================
            MAIN GRID
        ======================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr]">
          {/* =====================================================
              FORM
          ====================================================== */}

          <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {/* Form header */}

            <div className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-lg text-white shadow-sm">
                  +
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-800">
                    Tambah Pengajar
                  </h2>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Daftarkan guru atau ustadz baru
                  </p>
                </div>
              </div>
            </div>

            {/* Form body */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >
              {/* Identity */}

              <InputField
                label="NIP / NIK / ID Identitas"
                value={identityNumber}
                onChange={setIdentityNumber}
                placeholder="Contoh: 123456789"
                required
              />

              {/* Name */}

              <InputField
                label="Nama Lengkap & Gelar"
                value={fullname}
                onChange={setFullname}
                placeholder="Ustadz Ahmad, S.Pd.I"
                required
              />

              {/* Password */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Password Akun
                </label>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    placeholder="Masukkan password"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>

                <p className="mt-1.5 text-[10px] text-gray-400">
                  Password digunakan untuk login ke sistem.
                </p>
              </div>

              {/* Role */}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Peran Pengguna
                </label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                >
                  <option value="TEACHER">
                    Guru / Pengampu
                  </option>

                  <option value="ADMIN">
                    Administrator
                  </option>
                </select>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#07553e] to-[#08704f] text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/15 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <span className="text-base">+</span>
                    Simpan Pengajar
                  </>
                )}
              </button>
            </form>
          </section>

          {/* =====================================================
              TEACHERS LIST
          ====================================================== */}

          <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {/* List header */}

            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  Pengajar Terdaftar
                </h2>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  Data guru dan administrator yang memiliki
                  akses sistem.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[10px] font-semibold text-emerald-700">
                  {totalTeachers} Pengguna
                </span>
              </div>
            </div>

            {/* List */}

            <div className="p-4">
              {loadingData ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gray-100" />

                        <div className="flex-1">
                          <div className="h-3 w-40 rounded bg-gray-100" />

                          <div className="mt-2 h-2.5 w-28 rounded bg-gray-100" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : teachers.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-2.5">
                  {teachers.map((teacher, index) => (
                    <TeacherCard
                      key={teacher.id}
                      teacher={teacher}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200/80 bg-white p-4 shadow-[0_5px_20px_rgba(0,0,0,0.035)] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-800">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg transition group-hover:bg-emerald-100">
          {icon}
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT FIELD
|--------------------------------------------------------------------------
*/

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-700">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      />
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| TEACHER CARD
|--------------------------------------------------------------------------
*/

function TeacherCard({
  teacher,
  index,
}: {
  teacher: Teacher;
  index: number;
}) {
  const isAdmin = teacher.role === 'ADMIN';

  const initials = teacher.fullname
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm ${
            isAdmin
              ? 'bg-gradient-to-br from-[#5b3b8c] to-[#7b52ad] text-white'
              : 'bg-gradient-to-br from-[#07553e] to-[#0b8060] text-white'
          }`}
        >
          {initials || 'GU'}
        </div>

        {/* Information */}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-bold text-gray-800">
              {teacher.fullname}
            </h3>

            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                isAdmin
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isAdmin
                ? 'Administrator'
                : 'Guru / Ustadz'}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
            <span>
              ID Sistem:{' '}
              <strong className="font-semibold text-gray-500">
                #{teacher.id}
              </strong>
            </span>

            <span className="hidden text-gray-300 sm:inline">
              •
            </span>

            <span>
              NIP/NIK:{' '}
              <strong className="font-semibold text-gray-500">
                {teacher.identity_number}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Status */}

      <div className="flex shrink-0 items-center gap-2 sm:pl-4">
        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-white px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

          <span className="text-[9px] font-semibold text-emerald-700">
            Aktif
          </span>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-6 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
        👨‍🏫
      </div>

      <h3 className="text-sm font-bold text-gray-700">
        Belum Ada Pengajar
      </h3>

      <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
        Data guru atau ustadz yang ditambahkan akan
        muncul di bagian ini.
      </p>
    </div>
  );
}