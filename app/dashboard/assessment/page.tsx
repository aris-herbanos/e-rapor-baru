'use client';

import { useMemo, useState } from 'react';

export default function AssessmentPage() {
  const [studentId, setStudentId] = useState('');
  const [tpId, setTpId] = useState('');
  const [score, setScore] = useState('');
  const [type, setType] = useState('FORMATIVE');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const numericScore = Number(score);

  const grade = useMemo(() => {
    if (
      score === '' ||
      Number.isNaN(numericScore)
    ) {
      return null;
    }

    if (numericScore >= 90) {
      return {
        label: 'Sangat Baik',
        arabic: 'ممتاز',
        description:
          'Capaian pembelajaran sangat baik',
      };
    }

    if (numericScore >= 80) {
      return {
        label: 'Baik',
        arabic: 'جيد جداً',
        description:
          'Capaian pembelajaran baik',
      };
    }

    if (numericScore >= 70) {
      return {
        label: 'Cukup Baik',
        arabic: 'جيد',
        description:
          'Capaian pembelajaran cukup baik',
      };
    }

    if (numericScore >= 60) {
      return {
        label: 'Cukup',
        arabic: 'مقبول',
        description:
          'Masih perlu penguatan',
      };
    }

    return {
      label: 'Perlu Bimbingan',
      arabic: 'ضعيف',
      description:
        'Memerlukan pendampingan lebih lanjut',
    };
  }, [score, numericScore]);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(
        '/api/assessment',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            studentId,
            tpId,
            score,
            type,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Gagal menyimpan',
        );
      }

      setMessage(
        'success:Sukses! Nilai berhasil disimpan ke database.',
      );

      setScore('');
    } catch (err: any) {
      setMessage(
        `error:${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

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
          BACKGROUND DECORATION
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

      <main className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

        {/* ===================================================
            PAGE HEADER
        ==================================================== */}

        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-[10px] text-white">
                ✦
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                Sistem Akademik
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Input Nilai Asesmen
            </h1>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
              Kelola penilaian santri berdasarkan
              Tujuan Pembelajaran secara terstruktur,
              akurat, dan terdokumentasi.
            </p>
          </div>

          <div className="hidden sm:block">
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
            CONTENT GRID
        ==================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* =================================================
              FORM CARD
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">

            {/* Card Header */}

            <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#064e3b] via-[#075c45] to-[#0b7054] px-6 py-6 sm:px-7">

              <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full border border-white/10" />

              <div className="absolute -right-4 -top-10 h-28 w-28 rounded-full border border-amber-300/10" />

              <div className="relative flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl text-amber-300 shadow-inner">
                  ✦
                </div>

                <div>
                  <h2 className="text-base font-bold text-white">
                    Form Penilaian
                  </h2>

                  <p className="mt-0.5 text-xs text-emerald-100/75">
                    Masukkan data asesmen santri
                  </p>
                </div>

              </div>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-7"
            >

              {/* =================================================
                  MESSAGE
              ================================================== */}

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

              {/* =================================================
                  STUDENT + TP
              ================================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Student */}

                <Field
                  label="ID Siswa"
                  hint="Identitas santri"
                >
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center border-r border-slate-200 text-slate-400">
                      <span className="text-sm">
                        #
                      </span>
                    </div>

                    <input
                      type="number"
                      value={studentId}
                      onChange={(e) =>
                        setStudentId(
                          e.target.value,
                        )
                      }
                      required
                      placeholder="Contoh: 1"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-14 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </Field>

                {/* TP */}

                <Field
                  label="ID Tujuan Pembelajaran"
                  hint="Target kompetensi"
                >
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center border-r border-slate-200 text-emerald-700">
                      <span className="text-xs font-bold">
                        TP
                      </span>
                    </div>

                    <input
                      type="number"
                      value={tpId}
                      onChange={(e) =>
                        setTpId(
                          e.target.value,
                        )
                      }
                      required
                      placeholder="Contoh: 1"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-14 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </Field>
              </div>

              {/* =================================================
                  ASSESSMENT TYPE
              ================================================== */}

              <div className="mt-5">
                <Field
                  label="Jenis Asesmen"
                  hint="Pilih metode penilaian"
                >
                  <div className="grid gap-3 sm:grid-cols-2">

                    <button
                      type="button"
                      onClick={() =>
                        setType(
                          'FORMATIVE',
                        )
                      }
                      className={`group rounded-xl border p-4 text-left transition ${
                        type ===
                        'FORMATIVE'
                          ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/10'
                          : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            type ===
                            'FORMATIVE'
                              ? 'bg-emerald-700 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          ◈
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-800">
                            Formatif
                          </div>

                          <div className="mt-1 text-[10px] leading-4 text-slate-400">
                            Selama proses
                            pembelajaran
                          </div>
                        </div>

                        {type ===
                          'FORMATIVE' && (
                          <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                            ✓
                          </div>
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setType(
                          'SUMMATIVE',
                        )
                      }
                      className={`group rounded-xl border p-4 text-left transition ${
                        type ===
                        'SUMMATIVE'
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500/10'
                          : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">

                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            type ===
                            'SUMMATIVE'
                              ? 'bg-amber-600 text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          ◆
                        </div>

                        <div>
                          <div className="text-xs font-bold text-slate-800">
                            Sumatif
                          </div>

                          <div className="mt-1 text-[10px] leading-4 text-slate-400">
                            Akhir lingkup
                            materi / bab
                          </div>
                        </div>

                        {type ===
                          'SUMMATIVE' && (
                          <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] text-white">
                            ✓
                          </div>
                        )}
                      </div>
                    </button>

                  </div>
                </Field>
              </div>

              {/* =================================================
                  SCORE
              ================================================== */}

              <div className="mt-5">
                <Field
                  label="Nilai Asesmen"
                  hint="Masukkan angka 0 – 100"
                >

                  <div className="grid gap-4 sm:grid-cols-[1fr_190px]">

                    {/* Score input */}

                    <div className="relative">
                      <input
                        type="number"
                        value={score}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          if (
                            value ===
                              '' ||
                            (Number(
                              value,
                            ) >= 0 &&
                              Number(
                                value,
                              ) <= 100)
                          ) {
                            setScore(
                              value,
                            );
                          }
                        }}
                        required
                        min="0"
                        max="100"
                        placeholder="85"
                        className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-2xl font-bold tracking-tight text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                      />

                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs font-medium text-slate-400">
                        / 100
                      </div>
                    </div>

                    {/* Grade */}

                    <div
                      className={`rounded-xl border p-3 transition ${
                        grade
                          ? 'border-emerald-100 bg-emerald-50/70'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">

                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          Predikat
                        </span>

                        {grade && (
                          <span
                            className="font-serif text-sm text-emerald-800"
                            dir="rtl"
                          >
                            {
                              grade.arabic
                            }
                          </span>
                        )}
                      </div>

                      <div className="mt-1">
                        <div className="text-sm font-bold text-slate-800">
                          {grade
                            ? grade.label
                            : '—'}
                        </div>

                        <div className="mt-0.5 text-[9px] text-slate-400">
                          {grade
                            ? grade.description
                            : 'Predikat akan muncul otomatis'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score scale */}

                  <div className="mt-3 grid grid-cols-5 gap-1.5">

                    <ScoreScale
                      value="0–59"
                      label="Perlu Bimbingan"
                    />

                    <ScoreScale
                      value="60–69"
                      label="Cukup"
                    />

                    <ScoreScale
                      value="70–79"
                      label="Cukup Baik"
                    />

                    <ScoreScale
                      value="80–89"
                      label="Baik"
                    />

                    <ScoreScale
                      value="90–100"
                      label="Sangat Baik"
                    />

                  </div>
                </Field>
              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <div className="mt-7 border-t border-slate-100 pt-5">

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#064e3b] to-[#087453] text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/15 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Menyimpan Nilai...
                    </>
                  ) : (
                    <>
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10">
                        ✓
                      </span>

                      Simpan Nilai Asesmen
                    </>
                  )}

                </button>

                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Pastikan ID siswa, TP, jenis asesmen,
                  dan nilai sudah benar sebelum disimpan.
                </p>
              </div>

            </form>
          </section>

          {/* =================================================
              SIDE INFORMATION
          ================================================== */}

          <aside className="space-y-5">

            {/* Islamic Card */}

            <div className="relative overflow-hidden rounded-2xl bg-[#064e3b] p-6 text-white shadow-[0_12px_40px_rgba(6,78,59,0.15)]">

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/10" />

              <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full border border-amber-300/10" />

              <div className="relative">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                    ✦
                  </div>

                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-100/70">
                    Adab
                  </span>

                </div>

                <div
                  className="font-serif text-xl leading-9 text-white"
                  dir="rtl"
                >
                  مَنْ سَلَكَ طَرِيقًا
                  يَلْتَمِسُ فِيهِ عِلْمًا
                </div>

                <p className="mt-4 text-xs leading-5 text-emerald-100/70">
                  “Barang siapa menempuh jalan
                  untuk mencari ilmu, Allah akan
                  mudahkan baginya jalan menuju
                  surga.”
                </p>

                <div className="mt-4 text-[9px] font-semibold tracking-wide text-amber-300/80">
                  HR. MUSLIM
                </div>

              </div>
            </div>

            {/* Assessment Info */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">

              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  ?
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-800">
                    Tentang Asesmen
                  </h3>

                  <p className="text-[9px] text-slate-400">
                    Panduan singkat
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                <InfoItem
                  number="01"
                  title="Formative"
                  text="Penilaian dilakukan selama proses pembelajaran untuk memantau perkembangan santri."
                />

                <InfoItem
                  number="02"
                  title="Summative"
                  text="Penilaian dilakukan pada akhir lingkup materi untuk melihat pencapaian kompetensi."
                />

                <InfoItem
                  number="03"
                  title="Tujuan Pembelajaran"
                  text="Setiap nilai terhubung dengan TP sehingga perkembangan belajar dapat ditelusuri."
                />

              </div>

            </div>

            {/* Status */}

            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  ✓
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Data Terintegrasi
                  </div>

                  <div className="mt-0.5 text-[9px] text-slate-400">
                    Nilai tersimpan ke database
                    akademik
                  </div>
                </div>

              </div>

            </div>

          </aside>
        </div>

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
            Penilaian Santri
          </p>

        </div>

      </main>
    </div>
  );
}

/* ==============================================================
   FIELD COMPONENT
============================================================== */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
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

        {hint && (
          <span className="text-[9px] text-slate-400">
            {hint}
          </span>
        )}

      </div>

      {children}
    </div>
  );
}

/* ==============================================================
   SCORE SCALE
============================================================== */

function ScoreScale({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-2 text-center">
      <div className="text-[8px] font-bold text-slate-600">
        {value}
      </div>

      <div className="mt-0.5 truncate text-[7px] text-slate-400">
        {label}
      </div>
    </div>
  );
}

/* ==============================================================
   INFO ITEM
============================================================== */

function InfoItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[8px] font-bold text-emerald-700">
        {number}
      </div>

      <div>
        <div className="text-[10px] font-bold text-slate-700">
          {title}
        </div>

        <p className="mt-0.5 text-[9px] leading-4 text-slate-400">
          {text}
        </p>
      </div>

    </div>
  );
}