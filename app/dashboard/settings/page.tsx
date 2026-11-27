
'use client';

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import {
  Settings,
  School,
  CalendarDays,
  UserRound,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  BookOpen,
  Loader2,
} from 'lucide-react';

type MessageType = 'success' | 'error' | '';

type SettingsData = {
  id?: number;
  schoolName: string;
  academicYear: string;
  semester: string;
  principalName: string;
};

const DEFAULT_SETTINGS: SettingsData = {
  schoolName: '',
  academicYear: '',
  semester: 'Ganjil',
  principalName: '',
};

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('Ganjil');
  const [principalName, setPrincipalName] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] =
    useState<MessageType>('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ============================================================
     MESSAGE
  ============================================================ */

  const showMessage = (
    text: string,
    type: MessageType = 'success'
  ) => {
    setMessage(text);
    setMessageType(type);
  };

  /* ============================================================
     LOAD SETTINGS
  ============================================================ */

  const loadSettings = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'GET',
        cache: 'no-store',
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            'Gagal memuat pengaturan sistem.'
        );
      }

      const data: SettingsData =
        result?.data || DEFAULT_SETTINGS;

      setSchoolName(data.schoolName || '');
      setAcademicYear(data.academicYear || '');

      setSemester(
        data.semester === 'Genap'
          ? 'Genap'
          : 'Ganjil'
      );

      setPrincipalName(data.principalName || '');
    } catch (error) {
      console.error('[LOAD_SETTINGS_ERROR]', error);

      showMessage(
        error instanceof Error
          ? error.message
          : 'Gagal memuat pengaturan sistem.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {
    loadSettings();
  }, []);

  /* ============================================================
     SAVE SETTINGS
  ============================================================ */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const cleanSchoolName = schoolName.trim();
    const cleanAcademicYear = academicYear.trim();
    const cleanPrincipalName = principalName.trim();

    if (!cleanSchoolName) {
      showMessage(
        'Nama lembaga wajib diisi.',
        'error'
      );
      return;
    }

    if (!cleanAcademicYear) {
      showMessage(
        'Tahun ajaran wajib diisi.',
        'error'
      );
      return;
    }

    if (!cleanPrincipalName) {
      showMessage(
        'Nama pimpinan wajib diisi.',
        'error'
      );
      return;
    }

    if (!['Ganjil', 'Genap'].includes(semester)) {
      showMessage(
        'Semester harus Ganjil atau Genap.',
        'error'
      );
      return;
    }

    setSaving(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          schoolName: cleanSchoolName,
          academicYear: cleanAcademicYear,
          semester,
          principalName: cleanPrincipalName,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            'Gagal menyimpan pengaturan.'
        );
      }

      if (result?.data) {
        setSchoolName(
          result.data.schoolName || ''
        );

        setAcademicYear(
          result.data.academicYear || ''
        );

        setSemester(
          result.data.semester === 'Genap'
            ? 'Genap'
            : 'Ganjil'
        );

        setPrincipalName(
          result.data.principalName || ''
        );
      }

      showMessage(
        'Pengaturan sistem berhasil disimpan.',
        'success'
      );
    } catch (error) {
      console.error('[SAVE_SETTINGS_ERROR]', error);

      showMessage(
        error instanceof Error
          ? error.message
          : 'Gagal menyimpan pengaturan sistem.',
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     STYLE
  ============================================================ */

  const inputClass =
    'mt-1.5 block h-9 w-full rounded-sm border border-[#8c8f94] bg-white px-3 text-[13px] text-[#2c3338] outline-none transition focus:border-[#2271b1] focus:shadow-[0_0_0_1px_#2271b1]';

  const labelClass =
    'block text-[13px] font-medium text-[#1d2327]';

  const sectionTitleClass =
    'flex items-center gap-2 text-[14px] font-semibold text-[#1d2327]';

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#f0f0f1] px-3 py-5 text-[#1d2327] sm:px-5 lg:px-6">

      <div className="mx-auto max-w-[1100px]">

        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2 text-[11px] text-[#646970]">
              <Settings size={13} />
              <span>Pengaturan</span>
              <span>/</span>
              <span>Sistem</span>
            </div>

            <h1 className="text-[23px] font-semibold leading-tight text-[#1d2327]">
              Pengaturan Sistem
            </h1>

            <p className="mt-1 text-[13px] text-[#646970]">
              Kelola identitas lembaga dan konfigurasi akademik.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-sm border border-[#c3c4c7] bg-white px-3 py-2 text-[12px] text-[#50575e] sm:self-center">
            <ShieldCheck
              size={15}
              className="text-[#00a32a]"
            />
            <span>Sistem Aktif</span>
          </div>

        </div>

        {/* ====================================================
            MESSAGE
        ==================================================== */}

        {message && (
          <div
            role="alert"
            className={[
              'mb-4 flex items-center gap-2 border-l-4 bg-white px-3 py-3 text-[13px] shadow-sm',
              messageType === 'success'
                ? 'border-l-[#00a32a] text-[#1d2327]'
                : 'border-l-[#d63638] text-[#b32d2e]',
            ].join(' ')}
          >
            {messageType === 'success' ? (
              <CheckCircle2
                size={17}
                className="shrink-0 text-[#00a32a]"
              />
            ) : (
              <AlertCircle
                size={17}
                className="shrink-0 text-[#d63638]"
              />
            )}

            <span>{message}</span>
          </div>
        )}

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center border border-[#c3c4c7] bg-white">
            <div className="flex items-center gap-2 text-[13px] text-[#646970]">
              <Loader2
                size={18}
                className="animate-spin text-[#2271b1]"
              />
              Memuat pengaturan sistem...
            </div>
          </div>
        ) : (

          /* ==================================================
             FORM
          ================================================== */

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">

              {/* =================================================
                  MAIN FORM
              ================================================= */}

              <div className="min-w-0 space-y-4">

                {/* IDENTITAS LEMBAGA */}

                <section className="border border-[#c3c4c7] bg-white shadow-sm">

                  <div className="flex items-center gap-2 border-b border-[#dcdcde] px-4 py-3">
                    <School
                      size={17}
                      className="text-[#646970]"
                    />

                    <h2 className={sectionTitleClass}>
                      Identitas Lembaga
                    </h2>
                  </div>

                  <div className="space-y-4 p-4">

                    <div>
                      <label
                        htmlFor="schoolName"
                        className={labelClass}
                      >
                        Nama Lembaga / Pondok Pesantren
                        <span className="ml-1 text-[#d63638]">*</span>
                      </label>

                      <input
                        id="schoolName"
                        type="text"
                        value={schoolName}
                        onChange={(e) =>
                          setSchoolName(e.target.value)
                        }
                        required
                        placeholder="Pondok Pesantren Terpadu Ulul Albab"
                        className={inputClass}
                      />

                      <p className="mt-1 text-[11px] text-[#646970]">
                        Digunakan pada halaman sistem dan dokumen rapor.
                      </p>
                    </div>

                  </div>
                </section>

                {/* KONFIGURASI AKADEMIK */}

                <section className="border border-[#c3c4c7] bg-white shadow-sm">

                  <div className="flex items-center gap-2 border-b border-[#dcdcde] px-4 py-3">
                    <CalendarDays
                      size={17}
                      className="text-[#646970]"
                    />

                    <h2 className={sectionTitleClass}>
                      Konfigurasi Akademik
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="academicYear"
                        className={labelClass}
                      >
                        Tahun Ajaran Aktif
                        <span className="ml-1 text-[#d63638]">*</span>
                      </label>

                      <input
                        id="academicYear"
                        type="text"
                        value={academicYear}
                        onChange={(e) =>
                          setAcademicYear(e.target.value)
                        }
                        required
                        placeholder="2026/2027"
                        className={inputClass}
                      />

                      <p className="mt-1 text-[11px] text-[#646970]">
                        Contoh: 2026/2027
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="semester"
                        className={labelClass}
                      >
                        Semester
                        <span className="ml-1 text-[#d63638]">*</span>
                      </label>

                      <select
                        id="semester"
                        value={semester}
                        onChange={(e) =>
                          setSemester(e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="Ganjil">
                          Semester Ganjil
                        </option>

                        <option value="Genap">
                          Semester Genap
                        </option>
                      </select>
                    </div>

                  </div>
                </section>

                {/* PIMPINAN */}

                <section className="border border-[#c3c4c7] bg-white shadow-sm">

                  <div className="flex items-center gap-2 border-b border-[#dcdcde] px-4 py-3">
                    <UserRound
                      size={17}
                      className="text-[#646970]"
                    />

                    <h2 className={sectionTitleClass}>
                      Pimpinan Lembaga
                    </h2>
                  </div>

                  <div className="p-4">

                    <div>
                      <label
                        htmlFor="principalName"
                        className={labelClass}
                      >
                        Nama Pimpinan / Mudir Pesantren
                        <span className="ml-1 text-[#d63638]">*</span>
                      </label>

                      <input
                        id="principalName"
                        type="text"
                        value={principalName}
                        onChange={(e) =>
                          setPrincipalName(e.target.value)
                        }
                        required
                        placeholder="Masukkan nama pimpinan"
                        className={inputClass}
                      />

                      <p className="mt-1 text-[11px] text-[#646970]">
                        Nama ini digunakan pada dokumen dan cetakan rapor.
                      </p>
                    </div>

                  </div>
                </section>

                {/* SAVE ACTION */}

                <div className="flex flex-col gap-3 border border-[#c3c4c7] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-2 text-[11px] text-[#646970]">
                    <ShieldCheck
                      size={15}
                      className="shrink-0 text-[#00a32a]"
                    />

                    <span>
                      Pastikan data sudah benar sebelum disimpan.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-sm border border-[#2271b1] bg-[#2271b1] px-4 text-[13px] font-medium text-white transition hover:border-[#135e96] hover:bg-[#135e96] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <Loader2
                          size={15}
                          className="animate-spin"
                        />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        Simpan Pengaturan
                      </>
                    )}
                  </button>

                </div>

              </div>

              {/* =================================================
                  SIDEBAR
              ================================================= */}

              <aside className="space-y-4">

                {/* PREVIEW */}

                <section className="border border-[#c3c4c7] bg-white shadow-sm">

                  <div className="flex items-center gap-2 border-b border-[#dcdcde] px-3 py-3">
                    <School
                      size={16}
                      className="text-[#646970]"
                    />

                    <h2 className="text-[13px] font-semibold text-[#1d2327]">
                      Pratinjau Identitas
                    </h2>
                  </div>

                  <div className="border-b border-[#dcdcde] bg-[#f6f7f7] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-[#646970]">
                      Nama Lembaga
                    </div>

                    <div className="mt-1 break-words text-[13px] font-semibold leading-relaxed text-[#1d2327]">
                      {schoolName || 'Nama Lembaga'}
                    </div>
                  </div>

                  <div className="divide-y divide-[#dcdcde] px-3">

                    <div className="py-3">
                      <div className="text-[11px] text-[#646970]">
                        Tahun Ajaran
                      </div>

                      <div className="mt-1 text-[13px] font-medium text-[#1d2327]">
                        {academicYear || 'Belum diatur'}
                      </div>
                    </div>

                    <div className="py-3">
                      <div className="text-[11px] text-[#646970]">
                        Semester
                      </div>

                      <div className="mt-1 text-[13px] font-medium text-[#1d2327]">
                        {semester}
                      </div>
                    </div>

                    <div className="py-3">
                      <div className="text-[11px] text-[#646970]">
                        Pimpinan / Mudir
                      </div>

                      <div className="mt-1 break-words text-[13px] font-medium text-[#1d2327]">
                        {principalName || 'Belum diatur'}
                      </div>
                    </div>

                  </div>
                </section>

                {/* CATATAN */}

                <section className="border border-[#c3c4c7] bg-white shadow-sm">

                  <div className="flex items-center gap-2 border-b border-[#dcdcde] px-3 py-3">
                    <AlertCircle
                      size={16}
                      className="text-[#646970]"
                    />

                    <h2 className="text-[13px] font-semibold text-[#1d2327]">
                      Catatan
                    </h2>
                  </div>

                  <div className="p-3 text-[12px] leading-relaxed text-[#50575e]">
                    Pastikan tahun ajaran, semester, dan nama pimpinan sudah sesuai sebelum digunakan untuk pencetakan rapor santri.
                  </div>

                </section>

                {/* AYAT */}

                <section className="border border-[#c3c4c7] bg-white p-4 text-center shadow-sm">

                  <div
                    dir="rtl"
                    className="font-serif text-lg text-[#50575e]"
                  >
                    وَقُلْ رَبِّ زِدْنِي عِلْمًا
                  </div>

                  <p className="mt-2 text-[11px] leading-relaxed text-[#646970]">
                    “Ya Tuhanku, tambahkanlah kepadaku ilmu.”
                  </p>

                  <p className="mt-1 text-[10px] text-[#8c8f94]">
                    QS. Taha: 114
                  </p>

                </section>

              </aside>

            </div>
          </form>
        )}

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8c8f94]">
          <span>Pengaturan Sistem</span>
          <span>Pondok Pesantren Terpadu Ulul Albab</span>
        </div>

      </div>
    </div>
  );
}
