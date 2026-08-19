require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Memulai import data lengkap SIPond ke database...');

  // 1. Import Teachers (Guru / Ustadz)
  const teachersData = [
    { id: "T001", nama: "Rezky Fariduddin" },
    { id: "T002", nama: "Surniawati" },
    { id: "T003", nama: "Alifia Nanda Agustin" },
    { id: "T004", nama: "Ahmad Ghufron" },
    { id: "T005", nama: "Maulana Aqil Tauhid" },
    { id: "T006", nama: "Hafidz Islami" },
    { id: "T007", nama: "Ustadz Ahmad" },
    { id: "T008", nama: "Muhammad Abidzar Al-Ghifari" },
    { id: "T009", nama: "Haykal" },
    { id: "T010", nama: "Muhammad Fatih Ats-Tsauri" },
    { id: "T011", nama: "Siti Hajar" },
    { id: "T012", nama: "Nurhaliza" }
  ];

  const defaultPassword = await bcrypt.hash('password123', 10);

  for (const t of teachersData) {
    await prisma.teacher.upsert({
      where: { identity_number: t.id },
      update: {},
      create: {
        identity_number: t.id,
        fullname: t.nama,
        password: defaultPassword,
        role: 'TEACHER',
      },
    });
  }
  console.log('✓ Data guru berhasil diimport.');

  // 2. Import Seluruh Data Santri (S0001 - S0240)
  const studentsData = [
    { id: "S0001", nama: "Ahmad Zaki", className: "7A" },
    { id: "S0002", nama: "Muhammad Rafli", className: "7A" },
    { id: "S0003", nama: "Aisyah Putri", className: "7A" },
    { id: "S0004", nama: "Fatimah Az-Zahra", className: "7A" },
    { id: "S0005", nama: "Muhammad Rizky", className: "7A" },
    { id: "S0006", nama: "Abdullah", className: "7A" },
    { id: "S0007", nama: "Khadijah", className: "7A" },
    { id: "S0008", nama: "Aminah", className: "7A" },
    { id: "S0009", nama: "Hasan", className: "7A" },
    { id: "S0010", nama: "Husein", className: "7A" },
    { id: "S0011", nama: "Bilal", className: "7A" },
    { id: "S0012", nama: "Umar", className: "7A" },
    { id: "S0013", nama: "Zainab", className: "7A" },
    { id: "S0014", nama: "Maryam", className: "7A" },
    { id: "S0015", nama: "Ibrahim", className: "7A" },
    { id: "S0016", nama: "Ismail", className: "7A" },
    { id: "S0017", nama: "Yusuf", className: "7A" },
    { id: "S0018", nama: "Sulaiman", className: "7A" },
    { id: "S0019", nama: "Dawud", className: "7A" },
    { id: "S0020", nama: "Harun", className: "7A" },
    { id: "S0021", nama: "Nurul Iman", className: "7B" },
    { id: "S0022", nama: "Siti Aminah", className: "7B" },
    { id: "S0023", nama: "Muhammad Hadi", className: "7B" },
    { id: "S0024", nama: "Ahmad Fauzan", className: "7B" },
    { id: "S0025", nama: "Zahra", className: "7B" },
    { id: "S0026", nama: "Kamilah", className: "7B" },
    { id: "S0027", nama: "Hanifah", className: "7B" },
    { id: "S0028", nama: "Salma", className: "7B" },
    { id: "S0029", nama: "Hafsa", className: "7B" },
    { id: "S0030", nama: "Ruqayyah", className: "7B" },
    { id: "S0031", nama: "Luqman", className: "7B" },
    { id: "S0032", nama: "Muadz", className: "7B" },
    { id: "S0033", nama: "Anas", className: "7B" },
    { id: "S0034", nama: "Zaid", className: "7B" },
    { id: "S0035", nama: "Talhah", className: "7B" },
    { id: "S0036", nama: "Zubair", className: "7B" },
    { id: "S0037", nama: "Saad", className: "7B" },
    { id: "S0038", nama: "Hamzah", className: "7B" },
    { id: "S0039", nama: "Khalid", className: "7B" },
    { id: "S0040", nama: "Musab", className: "7B" },
    { id: "S0041", nama: "Aisyah Rahmah", className: "8A" },
    { id: "S0042", nama: "Muhammad Ilham", className: "8A" },
    { id: "S0043", nama: "Fatimah Sari", className: "8A" },
    { id: "S0044", nama: "Ahmad Yazid", className: "8A" },
    { id: "S0045", nama: "Khadijah Nur", className: "8A" },
    { id: "S0046", nama: "Aminah Fitri", className: "8A" },
    { id: "S0047", nama: "Hasan Basri", className: "8A" },
    { id: "S0048", nama: "Husein Ali", className: "8A" },
    { id: "S0049", nama: "Bilal Ahmad", className: "8A" },
    { id: "S0050", nama: "Umar Faruq", className: "8A" },
    { id: "S0051", nama: "Zainab Huda", className: "8A" },
    { id: "S0052", nama: "Maryam Safa", className: "8A" },
    { id: "S0053", nama: "Ibrahim Malik", className: "8A" },
    { id: "S0054", nama: "Ismail Hakim", className: "8A" },
    { id: "S0055", nama: "Yusuf Qadir", className: "8A" },
    { id: "S0056", nama: "Sulaiman Rasyid", className: "8A" },
    { id: "S0057", nama: "Dawud Ramli", className: "8A" },
    { id: "S0058", nama: "Harun Yahya", className: "8A" },
    { id: "S0059", nama: "Nurul Haq", className: "8A" },
    { id: "S0060", nama: "Siti Maryam", className: "8A" },
    { id: "S0061", nama: "Ahmad Syafiq", className: "8B" },
    { id: "S0062", nama: "Muhammad Nabil", className: "8B" },
    { id: "S0063", nama: "Aisyah Zahra", className: "8B" },
    { id: "S0064", nama: "Fatimah Noor", className: "8B" },
    { id: "S0065", nama: "Zahra Amina", className: "8B" },
    { id: "S0066", nama: "Kamilah Husna", className: "8B" },
    { id: "S0067", nama: "Hanifah Latifa", className: "8B" },
    { id: "S0068", nama: "Salma Warda", className: "8B" },
    { id: "S0069", nama: "Hafsa Izzah", className: "8B" },
    { id: "S0070", nama: "Ruqayyah Nur", className: "8B" },
    { id: "S0071", nama: "Luqman Hakim", className: "8B" },
    { id: "S0072", nama: "Muadz Jabal", className: "8B" },
    { id: "S0073", nama: "Anas Malik", className: "8B" },
    { id: "S0074", nama: "Zaid Harits", className: "8B" },
    { id: "S0075", nama: "Talhah Ubaid", className: "8B" },
    { id: "S0076", nama: "Zubair Awwam", className: "8B" },
    { id: "S0077", nama: "Saad Waqqas", className: "8B" },
    { id: "S0078", nama: "Hamzah Abdul", className: "8B" },
    { id: "S0079", nama: "Khalid Walid", className: "8B" },
    { id: "S0080", nama: "Musab Umair", className: "8B" },
    { id: "S0081", nama: "Nurul Aini", className: "9A" },
    { id: "S0082", nama: "Siti Halimah", className: "9A" },
    { id: "S0083", nama: "Muhammad Aqil", className: "9A" },
    { id: "S0084", nama: "Ahmad Ghazali", className: "9A" },
    { id: "S0085", nama: "Khadijah Balqis", className: "9A" },
    { id: "S0086", nama: "Aminah Raihana", className: "9A" },
    { id: "S0087", nama: "Hasan Mujahid", className: "9A" },
    { id: "S0088", nama: "Husein Zaki", className: "9A" },
    { id: "S0089", nama: "Bilal Habib", className: "9A" },
    { id: "S0090", nama: "Umar Mukhtar", className: "9A" },
    { id: "S0091", nama: "Zainab Aqilah", className: "9A" },
    { id: "S0092", nama: "Maryam Haura", className: "9A" },
    { id: "S0093", nama: "Ibrahim Khalil", className: "9A" },
    { id: "S0094", nama: "Ismail Sabiq", className: "9A" },
    { id: "S0095", nama: "Yusuf Hamdi", className: "9A" },
    { id: "S0096", nama: "Sulaiman Jazil", className: "9A" },
    { id: "S0097", nama: "Dawud Nashir", className: "9A" },
    { id: "S0098", nama: "Harun Fathi", className: "9A" },
    { id: "S0099", nama: "Nurul Izzah", className: "9A" },
    { id: "S0100", nama: "Siti Khadijah", className: "9A" },
    { id: "S0101", nama: "Ahmad Mursyid", className: "9B" },
    { id: "S0102", nama: "Muhammad Dzaky", className: "9B" },
    { id: "S0103", nama: "Aisyah Humairah", className: "9B" },
    { id: "S0104", nama: "Fatimah Ridha", className: "9B" },
    { id: "S0105", nama: "Zahra Nabila", className: "9B" },
    { id: "S0106", nama: "Kamilah Safiya", className: "9B" },
    { id: "S0107", nama: "Hanifah Mawaddah", className: "9B" },
    { id: "S0108", nama: "Salma Tasnim", className: "9B" },
    { id: "S0109", nama: "Hafsa Rahmah", className: "9B" },
    { id: "S0110", nama: "Ruqayyah Afifah", className: "9B" },
    { id: "S0111", nama: "Luqman Azzam", className: "9B" },
    { id: "S0112", nama: "Muadz Fikri", className: "9B" },
    { id: "S0113", nama: "Anas Firdaus", className: "9B" },
    { id: "S0114", nama: "Zaid Muflih", className: "9B" },
    { id: "S0115", nama: "Talhah Fadhil", className: "9B" },
    { id: "S0116", nama: "Zubair Hamdan", className: "9B" },
    { id: "S0117", nama: "Saad Mukhlis", className: "9B" },
    { id: "S0118", nama: "Hamzah Syahid", className: "9B" },
    { id: "S0119", nama: "Khalid Mujahid", className: "9B" },
    { id: "S0120", nama: "Musab Habibi", className: "9B" },
    { id: "S0121", nama: "Nurul Hidayah", className: "10A" },
    { id: "S0122", nama: "Siti Rahmawati", className: "10A" },
    { id: "S0123", nama: "Muhammad Alif", className: "10A" },
    { id: "S0124", nama: "Ahmad Naufal", className: "10A" },
    { id: "S0125", nama: "Khadijah Salsabila", className: "10A" },
    { id: "S0126", nama: "Aminah Wardah", className: "10A" },
    { id: "S0127", nama: "Hasan Firdaus", className: "10A" },
    { id: "S0128", nama: "Husein Akbar", className: "10A" },
    { id: "S0129", nama: "Bilal Shiddiq", className: "10A" },
    { id: "S0130", nama: "Umar Hadi", className: "10A" },
    { id: "S0131", nama: "Zainab Karimah", className: "10A" },
    { id: "S0132", nama: "Maryam Azizah", className: "10A" },
    { id: "S0133", nama: "Ibrahim Fadlan", className: "10A" },
    { id: "S0134", nama: "Ismail Muttaqin", className: "10A" },
    { id: "S0135", nama: "Yusuf Amanullah", className: "10A" },
    { id: "S0136", nama: "Sulaiman Nabil", className: "10A" },
    { id: "S0137", nama: "Dawud Hafiz", className: "10A" },
    { id: "S0138", nama: "Harun Taqiy", className: "10A" },
    { id: "S0139", nama: "Nurul Falah", className: "10A" },
    { id: "S0140", nama: "Siti Aisyah", className: "10A" },
    { id: "S0141", nama: "Ahmad Muhaimin", className: "10B" },
    { id: "S0142", nama: "Muhammad Ziyad", className: "10B" },
    { id: "S0143", nama: "Aisyah Nabila", className: "10B" },
    { id: "S0144", nama: "Fatimah Husna", className: "10B" },
    { id: "S0145", nama: "Zahra Mufidah", className: "10B" },
    { id: "S0146", nama: "Kamilah Rahmah", className: "10B" },
    { id: "S0147", nama: "Hanifah Azzahra", className: "10B" },
    { id: "S0148", nama: "Salma Hafizah", className: "10B" },
    { id: "S0149", nama: "Hafsa Karimah", className: "10B" },
    { id: "S0150", nama: "Ruqayyah Siddiqah", className: "10B" },
    { id: "S0151", nama: "Luqman Afif", className: "10B" },
    { id: "S0152", nama: "Muadz Rasyid", className: "10B" },
    { id: "S0153", nama: "Anas Hafidz", className: "10B" },
    { id: "S0154", nama: "Zaid Mubarak", className: "10B" },
    { id: "S0155", nama: "Talhah Amin", className: "10B" },
    { id: "S0156", nama: "Zubair Ihsan", className: "10B" },
    { id: "S0157", nama: "Saad Akram", className: "10B" },
    { id: "S0158", nama: "Hamzah Faisal", className: "10B" },
    { id: "S0159", nama: "Khalid Rahim", className: "10B" },
    { id: "S0160", nama: "Musab Tawfiq", className: "10B" },
    { id: "S0161", nama: "Nurul Qolbi", className: "11A" },
    { id: "S0162", nama: "Siti Zuhriyah", className: "11A" },
    { id: "S0163", nama: "Muhammad Ihsan", className: "11A" },
    { id: "S0164", nama: "Ahmad Ridwan", className: "11A" },
    { id: "S0165", nama: "Khadijah Mutia", className: "11A" },
    { id: "S0166", nama: "Aminah Syifa", className: "11A" },
    { id: "S0167", nama: "Hasan Abdillah", className: "11A" },
    { id: "S0168", nama: "Husein Mahdi", className: "11A" },
    { id: "S0169", nama: "Bilal Raihan", className: "11A" },
    { id: "S0170", nama: "Umar Sulthan", className: "11A" },
    { id: "S0171", nama: "Zainab Nafilah", className: "11A" },
    { id: "S0172", nama: "Maryam Kamilah", className: "11A" },
    { id: "S0173", nama: "Ibrahim Taufiq", className: "11A" },
    { id: "S0174", nama: "Ismail Hanif", className: "11A" },
    { id: "S0175", nama: "Yusuf Mukhtar", className: "11A" },
    { id: "S0176", nama: "Sulaiman Faruq", className: "11A" },
    { id: "S0177", nama: "Dawud Izzudin", className: "11A" },
    { id: "S0178", nama: "Harun Musa", className: "11A" },
    { id: "S0179", nama: "Nurul Baraka", className: "11A" },
    { id: "S0180", nama: "Siti Fatimah", className: "11A" },
    { id: "S0181", nama: "Ahmad Baihaqi", className: "11B" },
    { id: "S0182", nama: "Muhammad Habib", className: "11B" },
    { id: "S0183", nama: "Aisyah Salwa", className: "11B" },
    { id: "S0184", nama: "Fatimah Wafiq", className: "11B" },
    { id: "S0185", nama: "Zahra Afiyah", className: "11B" },
    { id: "S0186", nama: "Kamilah Nadira", className: "11B" },
    { id: "S0187", nama: "Hanifah Sabrina", className: "11B" },
    { id: "S0188", nama: "Salma Aqilah", className: "11B" },
    { id: "S0189", nama: "Hafsa Luthfia", className: "11B" },
    { id: "S0190", nama: "Ruqayyah Mahira", className: "11B" },
    { id: "S0191", nama: "Luqman Bashir", className: "11B" },
    { id: "S0192", nama: "Muadz Shafwan", className: "11B" },
    { id: "S0193", nama: "Anas Mu'min", className: "11B" },
    { id: "S0194", nama: "Zaid Rafif", className: "11B" },
    { id: "S0195", nama: "Talhah Qasim", className: "11B" },
    { id: "S0196", nama: "Zubair Haidar", className: "11B" },
    { id: "S0197", nama: "Saad Dzulqarnain", className: "11B" },
    { id: "S0198", nama: "Hamzah Naufal", className: "11B" },
    { id: "S0199", nama: "Khalid Ayyub", className: "11B" },
    { id: "S0200", nama: "Musab Junaid", className: "11B" },
    { id: "S0201", nama: "Nurul Hikmah", className: "12A" },
    { id: "S0202", nama: "Siti Maisaroh", className: "12A" },
    { id: "S0203", nama: "Muhammad Farhan", className: "12A" },
    { id: "S0204", nama: "Ahmad Rasyid", className: "12A" },
    { id: "S0205", nama: "Khadijah Rahma", className: "12A" },
    { id: "S0206", nama: "Aminah Hafidzah", className: "12A" },
    { id: "S0207", nama: "Hasan Kamil", className: "12A" },
    { id: "S0208", nama: "Husein Nashir", className: "12A" },
    { id: "S0209", nama: "Bilal Abdurrahman", className: "12A" },
    { id: "S0210", nama: "Umar Zubair", className: "12A" },
    { id: "S0211", nama: "Zainab Maisun", className: "12A" },
    { id: "S0212", nama: "Maryam Lubna", className: "12A" },
    { id: "S0213", nama: "Ibrahim Qutaibah", className: "12A" },
    { id: "S0214", nama: "Ismail Waliyuddin", className: "12A" },
    { id: "S0215", nama: "Yusuf Shalahuddin", className: "12A" },
    { id: "S0216", nama: "Sulaiman Haitsam", className: "12A" },
    { id: "S0217", nama: "Dawud Fakhruddin", className: "12A" },
    { id: "S0218", nama: "Harun Jamaluddin", className: "12A" },
    { id: "S0219", nama: "Nurul Yaqin", className: "12A" },
    { id: "S0220", nama: "Siti Ruqayyah", className: "12A" },
    { id: "S0221", nama: "Ahmad Mujaddid", className: "12B" },
    { id: "S0222", nama: "Muhammad Sulthan", className: "12B" },
    { id: "S0223", nama: "Aisyah Firdausi", className: "12B" },
    { id: "S0224", nama: "Fatimah Zahratul", className: "12B" },
    { id: "S0225", nama: "Zahra Kamila", className: "12B" },
    { id: "S0226", nama: "Kamilah Athifa", className: "12B" },
    { id: "S0227", nama: "Hanifah Mumtaz", className: "12B" },
    { id: "S0228", nama: "Salma Riyadh", className: "12B" },
    { id: "S0229", nama: "Hafsa Nadhirah", className: "12B" },
    { id: "S0230", nama: "Ruqayyah Hania", className: "12B" },
    { id: "S0231", nama: "Luqman Zafran", className: "12B" },
    { id: "S0232", nama: "Muadz Irsyad", className: "12B" },
    { id: "S0233", nama: "Anas Syakir", className: "12B" },
    { id: "S0234", nama: "Zaid Abdurrahman", className: "12B" },
    { id: "S0235", nama: "Talhah Muhajir", className: "12B" },
    { id: "S0236", nama: "Zubair Farhan", className: "12B" },
    { id: "S0237", nama: "Saad Miqdad", className: "12B" },
    { id: "S0238", nama: "Hamzah Usamah", className: "12B" },
    { id: "S0239", nama: "Khalid Ziyad", className: "12B" },
    { id: "S0240", nama: "Musab Ashraf", className: "12B" }
  ];

  const femaleNames = ['Aisyah', 'Fatimah', 'Siti', 'Khadijah', 'Aminah', 'Zahra', 'Zainab', 'Maryam', 'Salma', 'Hafsa', 'Ruqayyah', 'Nurul', 'Kamilah', 'Hanifah', 'Safiya', 'Latifa', 'Warda', 'Izzah', 'Halimah', 'Balqis', 'Raihana', 'Haura', 'Izzah', 'Humairah', 'Ridha', 'Nabila', 'Tasnim', 'Afifah', 'Rahmawati', 'Alif', 'Salsabila', 'Wardah', 'Karimah', 'Azizah', 'Falah', 'Husna', 'Mufidah', 'Sabrina', 'Luthfia', 'Mahira', 'Zuhriyah', 'Syifa', 'Nafilah', 'Kamilah', 'Baraka', 'Salwa', 'Wafiq', 'Afiyah', 'Nadira', 'Maisaroh', 'Rahma', 'Hafidzah', 'Maisun', 'Lubna', 'Yaqin', 'Firdausi', 'Zahratul', 'Athifa', 'Mumtaz', 'Riyadh', 'Nadhirah', 'Hania'];

  for (const s of studentsData) {
    const isFemale = femaleNames.some(name => s.nama.includes(name));
    await prisma.student.upsert({
      where: { nisn: s.id },
      update: {},
      create: {
        nisn: s.id,
        fullname: s.nama,
        gender: isFemale ? 'P' : 'L',
        class_name: s.className,
      },
    });
  }
  console.log(`✓ Berhasil mengimport ${studentsData.length} data santri secara lengkap.`);

  // 3. Import Subjects (Mata Pelajaran Pesantren)
  const subjectsData = [
    { nama: "Tajwid (تجويد)" },
    { nama: "Tahfidz / Tahsin (تحفيظ القرآن)" },
    { nama: "Muroja'ah (المراجعة)" },
    { nama: "Fiqih (الفقه)" },
    { nama: "Bahasa Arab (اللغة العربية)" },
    { nama: "Pidato (الخطابة)" },
    { nama: "Hadis (الحديث)" },
    { nama: "Pendidikan Agama Islam" },
    { nama: "Tsaqofah Islamiyah (الثقافة الإسلامية)" },
    { nama: "Nahwu / Sorof (النحو و الصرف)" },
    { nama: "Mahfudzot (المحفوظات)" },
    { nama: "Siroh Nabawiyah (السيرة النبوية)" },
    { nama: "Imla dan Khot (الإملاء والخط)" }
  ];

  const firstTeacher = await prisma.teacher.findFirst();

  if (firstTeacher) {
    for (const sub of subjectsData) {
      // Cek agar tidak duplikat jika dijalankan berulang
      const existingSub = await prisma.subject.findFirst({
        where: { name: sub.nama, teacherId: firstTeacher.id }
      });
      if (!existingSub) {
        await prisma.subject.create({
          data: {
            name: sub.nama,
            teacherId: firstTeacher.id,
          },
        });
      }
    }
    console.log('✓ Data mata pelajaran pesantren berhasil diperiksa/diimport.');
  }

  console.log('Semua data lengkap SIPond berhasil dimasukkan ke database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });