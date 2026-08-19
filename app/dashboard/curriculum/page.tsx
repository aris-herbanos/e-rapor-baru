'use client';

import { useEffect, useMemo, useState } from 'react';

type TP = {
  id: number;
  code: string;
  description: string;
};

type CP = {
  id: number;
  code: string;
  description: string;
  tps: TP[];
};

export default function CurriculumPage() {
  const [cps, setCps] = useState<CP[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] =
    useState(true);
  const [message, setMessage] = useState('');

  // Form CP
  const [subjectId, setSubjectId] =
    useState('');
  const [cpCode, setCpCode] =
    useState('');
  const [cpDesc, setCpDesc] =
    useState('');

  // Form TP
  const [selectedCpId, setSelectedCpId] =
    useState('');
  const [tpCode, setTpCode] =
    useState('');
  const [tpDesc, setTpDesc] =
    useState('');

  const [search, setSearch] =
    useState('');

  const fetchCurriculum = async () => {
    try {
      setLoadingData(true);

      const res = await fetch(
        '/api/curriculum',
        {
          cache: 'no-store',
        },
      );

      const data = await res.json();

      if (res.ok) {
        setCps(
          Array.isArray(data)
            ? data
            : data.data || [],
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const handleCreateCP = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(
        '/api/curriculum',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            action: 'CREATE_CP',
            subjectId,
            code: cpCode,
            description: cpDesc,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Gagal menambahkan CP',
        );
      }

      setMessage(
        'success:Capaian Pembelajaran (CP) berhasil ditambahkan.',
      );

      setCpCode('');
      setCpDesc('');

      await fetchCurriculum();
    } catch (err: any) {
      setMessage(
        `error:${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTP = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(
        '/api/curriculum',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            action: 'CREATE_TP',
            cpId: selectedCpId,
            code: tpCode,
            description: tpDesc,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Gagal menambahkan TP',
        );
      }

      setMessage(
        'success:Tujuan Pembelajaran (TP) berhasil ditambahkan.',
      );

      setTpCode('');
      setTpDesc('');

      await fetchCurriculum();
    } catch (err: any) {
      setMessage(
        `error:${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const totalTP = useMemo(() => {
    return cps.reduce(
      (total, cp) =>
        total + (cp.tps?.length || 0),
      0,
    );
  }, [cps]);

  const filteredCP = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return cps;
    }

    return cps.filter((cp) => {
      const cpMatch =
        cp.code
          ?.toLowerCase()
          .includes(keyword) ||
        cp.description
          ?.toLowerCase()
          .includes(keyword);

      const tpMatch = cp.tps?.some(
        (tp) =>
          tp.code
            ?.toLowerCase()
            .includes(keyword) ||
          tp.description
            ?.toLowerCase()
            .includes(keyword),
      );

      return cpMatch || tpMatch;
    });
  }, [cps, search]);

  const isSuccess =
    message.startsWith('success:');

  const displayMessage =
    message.replace(
      /^(success|error):/,
      '',
    );

  return (
    <div className="min-h-screen bg-[#f6f8f6] text-slate-800">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-amber-100/40 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(150deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(30deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(150deg, #064e3b 12%, transparent 12.5%, transparent 87%, #064e3b 87.5%, #064e3b),
              linear-gradient(60deg, #064e3b 25%, transparent 25.5%, transparent 75%, #064e3b 75%)
            `,
            backgroundSize:
              '80px 140px',
            backgroundPosition:
              '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
          }}
        />
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] text-white">
                ✦
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                Manajemen Kurikulum
              </span>

            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Capaian & Tujuan Pembelajaran
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Kelola struktur Capaian Pembelajaran
              dan Tujuan Pembelajaran secara
              terstruktur untuk mendukung proses
              akademik santri.
            </p>

          </div>

          <div className="hidden lg:block">

            <div className="text-right">

              <div
                className="font-serif text-xl text-emerald-900"
                dir="rtl"
              >
                وَقُلْ رَبِّ زِدْنِي عِلْمًا
              </div>

              <div className="mt-1 text-[10px] font-medium tracking-wide text-slate-400">
                QS. طه : ١١٤
              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            STATISTICS
        ==================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <StatCard
            icon="◈"
            label="Total CP"
            value={cps.length}
            color="emerald"
          />

          <StatCard
            icon="◇"
            label="Total TP"
            value={totalTP}
            color="amber"
          />

          <StatCard
            icon="✓"
            label="CP Memiliki TP"
            value={
              cps.filter(
                (cp) =>
                  cp.tps?.length > 0,
              ).length
            }
            color="blue"
          />

          <StatCard
            icon="✦"
            label="Kurikulum"
            value="Aktif"
            color="violet"
          />

        </div>

        {/* ===================================================
            MESSAGE
        ==================================================== */}

        {message && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 ${
              isSuccess
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >

            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {isSuccess
                ? '✓'
                : '!'}
            </div>

            <div>
              <div className="text-xs font-bold">
                {isSuccess
                  ? 'Berhasil'
                  : 'Terjadi Kesalahan'}
              </div>

              <div className="mt-0.5 text-xs opacity-80">
                {displayMessage}
              </div>
            </div>

          </div>
        )}

        {/* ===================================================
            FORM GRID
        ==================================================== */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* =================================================
              CP FORM
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

            <div className="relative overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#075c45] to-[#0b7054] px-6 py-6">

              <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/10" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl text-amber-300">
                  ◈
                </div>

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-100/60">
                    Tahap 01
                  </div>

                  <h2 className="mt-0.5 text-base font-bold text-white">
                    Capaian Pembelajaran
                  </h2>

                  <p className="mt-0.5 text-xs text-emerald-100/70">
                    Tambahkan kompetensi yang harus
                    dicapai santri
                  </p>

                </div>

              </div>

            </div>

            <form
              onSubmit={handleCreateCP}
              className="space-y-5 p-6"
            >

              <FormField
                label="ID Mata Pelajaran"
                description="Identitas mata pelajaran"
              >
                <div className="relative">

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center border-r border-slate-200 text-slate-400">
                    #
                  </div>

                  <input
                    type="number"
                    value={subjectId}
                    onChange={(e) =>
                      setSubjectId(
                        e.target.value,
                      )
                    }
                    required
                    placeholder="Contoh: 1"
                    className="form-input pl-14"
                  />

                </div>
              </FormField>

              <FormField
                label="Kode CP"
                description="Kode unik capaian pembelajaran"
              >
                <input
                  type="text"
                  value={cpCode}
                  onChange={(e) =>
                    setCpCode(
                      e.target.value,
                    )
                  }
                  required
                  placeholder="Contoh: CP-PAI-01"
                  className="form-input"
                />
              </FormField>

              <FormField
                label="Deskripsi CP"
                description="Uraikan kompetensi yang harus dicapai"
              >
                <textarea
                  value={cpDesc}
                  onChange={(e) =>
                    setCpDesc(
                      e.target.value,
                    )
                  }
                  required
                  rows={4}
                  placeholder="Tuliskan deskripsi capaian pembelajaran..."
                  className="form-input resize-none py-3"
                />
              </FormField>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#064e3b] to-[#087453] text-xs font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <Spinner />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                      +
                    </span>

                    Simpan Capaian Pembelajaran
                  </>
                )}

              </button>

            </form>
          </section>

          {/* =================================================
              TP FORM
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

            <div className="relative overflow-hidden bg-gradient-to-br from-[#9a6b12] via-[#b37c16] to-[#c28a21] px-6 py-6">

              <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/15" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl text-white">
                  ◇
                </div>

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-amber-100/70">
                    Tahap 02
                  </div>

                  <h2 className="mt-0.5 text-base font-bold text-white">
                    Tujuan Pembelajaran
                  </h2>

                  <p className="mt-0.5 text-xs text-amber-50/75">
                    Turunkan CP menjadi tujuan yang
                    terukur
                  </p>

                </div>

              </div>

            </div>

            <form
              onSubmit={handleCreateTP}
              className="space-y-5 p-6"
            >

              <FormField
                label="Capaian Pembelajaran"
                description="Pilih CP yang menjadi induk"
              >
                <select
                  value={selectedCpId}
                  onChange={(e) =>
                    setSelectedCpId(
                      e.target.value,
                    )
                  }
                  required
                  className="form-input"
                >

                  <option value="">
                    Pilih Capaian Pembelajaran
                  </option>

                  {cps.map((cp) => (
                    <option
                      key={cp.id}
                      value={cp.id}
                    >
                      CP-{cp.code} — ID {cp.id}
                    </option>
                  ))}

                </select>
              </FormField>

              <FormField
                label="Kode TP"
                description="Kode unik tujuan pembelajaran"
              >
                <input
                  type="text"
                  value={tpCode}
                  onChange={(e) =>
                    setTpCode(
                      e.target.value,
                    )
                  }
                  required
                  placeholder="Contoh: TP-01"
                  className="form-input"
                />
              </FormField>

              <FormField
                label="Deskripsi TP"
                description="Uraikan tujuan pembelajaran secara spesifik"
              >
                <textarea
                  value={tpDesc}
                  onChange={(e) =>
                    setTpDesc(
                      e.target.value,
                    )
                  }
                  required
                  rows={4}
                  placeholder="Tuliskan deskripsi tujuan pembelajaran..."
                  className="form-input resize-none py-3"
                />
              </FormField>

              <button
                type="submit"
                disabled={loading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9a6b12] to-[#c28a21] text-xs font-bold text-white shadow-lg shadow-amber-900/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <Spinner />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                      +
                    </span>

                    Simpan Tujuan Pembelajaran
                  </>
                )}

              </button>

            </form>
          </section>

        </div>

        {/* ===================================================
            CURRICULUM LIST
        ==================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

          {/* List Header */}

          <div className="border-b border-slate-100 p-5 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  ☷
                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-800">
                    Struktur Kurikulum
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Daftar CP dan TP yang telah
                    terdaftar
                  </p>

                </div>

              </div>

              <div className="relative w-full lg:w-72">

                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-slate-400">
                  ⌕
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value,
                    )
                  }
                  placeholder="Cari CP atau TP..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />

              </div>

            </div>

          </div>

          {/* List */}

          <div className="p-5 sm:p-6">

            {loadingData ? (
              <LoadingState />
            ) : filteredCP.length === 0 ? (
              <EmptyState
                search={search}
              />
            ) : (
              <div className="space-y-4">

                {filteredCP.map(
                  (cp, index) => (
                    <CurriculumCard
                      key={cp.id}
                      cp={cp}
                      index={index}
                    />
                  ),
                )}

              </div>
            )}

          </div>

        </section>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <div className="mt-8 text-center">

          <div className="flex items-center justify-center gap-3">

            <span className="h-px w-12 bg-slate-200" />

            <span
              className="font-serif text-sm text-emerald-800"
              dir="rtl"
            >
              بِسْمِ اللهِ
            </span>

            <span className="h-px w-12 bg-slate-200" />

          </div>

          <p className="mt-2 text-[9px] font-medium tracking-wide text-slate-400">
            Sistem Informasi Akademik •
            Manajemen Kurikulum
          </p>

        </div>

      </main>
    </div>
  );
}

/* ==============================================================
   FORM FIELD
============================================================== */

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <div className="mb-2 flex items-end justify-between gap-3">

        <label className="text-xs font-bold text-slate-700">
          {label}
          <span className="ml-1 text-emerald-600">
            *
          </span>
        </label>

        {description && (
          <span className="hidden text-[9px] text-slate-400 sm:block">
            {description}
          </span>
        )}

      </div>

      {children}

    </div>
  );
}

/* ==============================================================
   STAT CARD
============================================================== */

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color:
    | 'emerald'
    | 'amber'
    | 'blue'
    | 'violet';
}) {
  const colors = {
    emerald:
      'bg-emerald-50 text-emerald-700',
    amber:
      'bg-amber-50 text-amber-700',
    blue:
      'bg-blue-50 text-blue-700',
    violet:
      'bg-violet-50 text-violet-700',
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.04)]">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300">
          Data
        </span>

      </div>

      <div className="mt-3">

        <div className="text-xl font-bold tracking-tight text-slate-800">
          {value}
        </div>

        <div className="mt-0.5 text-[9px] font-medium text-slate-400">
          {label}
        </div>

      </div>

    </div>
  );
}

/* ==============================================================
   CURRICULUM CARD
============================================================== */

function CurriculumCard({
  cp,
  index,
}: {
  cp: CP;
  index: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition hover:border-emerald-200 hover:bg-white">

      {/* CP */}

      <div className="p-4 sm:p-5">

        <div className="flex gap-3 sm:gap-4">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xs font-bold text-white shadow-sm">
            {String(
              index + 1,
            ).padStart(2, '0')}
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-md bg-emerald-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-800">
                CP
              </span>

              <span className="text-xs font-bold text-emerald-800">
                {cp.code}
              </span>

              <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] font-medium text-slate-400">
                ID {cp.id}
              </span>

              <span className="ml-auto rounded-full bg-white px-2.5 py-1 text-[8px] font-semibold text-slate-400 shadow-sm">
                {cp.tps?.length || 0}{' '}
                TP
              </span>

            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              {cp.description}
            </p>

          </div>

        </div>

      </div>

      {/* TP */}

      <div className="border-t border-slate-200/80 bg-white/70 p-4 sm:p-5">

        <div className="mb-3 flex items-center gap-2">

          <span className="h-px w-5 bg-amber-400" />

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Tujuan Pembelajaran
          </span>

        </div>

        {!cp.tps ||
        cp.tps.length === 0 ? (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">
              —
            </div>

            <div>
              <div className="text-[10px] font-semibold text-slate-500">
                Belum ada TP
              </div>

              <div className="mt-0.5 text-[9px] text-slate-400">
                Tambahkan Tujuan Pembelajaran
                untuk CP ini.
              </div>
            </div>

          </div>
        ) : (
          <div className="space-y-2">

            {cp.tps.map(
              (tp, tpIndex) => (
                <div
                  key={tp.id}
                  className="group flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-amber-200 hover:bg-amber-50/30"
                >

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[8px] font-bold text-amber-700">
                    {tpIndex + 1}
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold text-amber-800">
                        {tp.code}
                      </span>

                      <span className="text-[8px] text-slate-300">
                        ID {tp.id}
                      </span>

                    </div>

                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      {tp.description}
                    </p>

                  </div>

                </div>
              ),
            )}

          </div>
        )}

      </div>

    </div>
  );
}

/* ==============================================================
   LOADING
============================================================== */

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-14">

      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600" />

      <p className="mt-3 text-xs text-slate-400">
        Memuat struktur kurikulum...
      </p>

    </div>
  );
}

/* ==============================================================
   EMPTY
============================================================== */

function EmptyState({
  search,
}: {
  search: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg text-slate-300 shadow-sm">
        {search ? '⌕' : '☷'}
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-600">
        {search
          ? 'Data tidak ditemukan'
          : 'Belum ada kurikulum'}
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-[10px] leading-5 text-slate-400">
        {search
          ? 'Coba gunakan kata kunci atau kode CP/TP yang berbeda.'
          : 'Silakan tambahkan Capaian Pembelajaran terlebih dahulu.'}
      </p>

    </div>
  );
}

/* ==============================================================
   SPINNER
============================================================== */

function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}