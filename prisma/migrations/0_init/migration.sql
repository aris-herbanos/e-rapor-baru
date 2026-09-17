-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "identity_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "birth_date" TEXT,
    "education" TEXT,
    "address" TEXT,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "status" TEXT NOT NULL DEFAULT 'Aktif',

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'SMP',

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CP" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT 7,

    CONSTRAINT "CP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TP" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cpId" INTEGER NOT NULL,

    CONSTRAINT "TP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "nisn" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "birth_info" TEXT,
    "gender" TEXT NOT NULL,
    "class_name" TEXT NOT NULL,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aktif',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "tpId" INTEGER,
    "score" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tahfidz" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "juz" INTEGER NOT NULL,
    "surah" TEXT NOT NULL,
    "ayat" TEXT NOT NULL,
    "predicate" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tahfidz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aktif',

    CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL DEFAULT '2026/2027',

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personality" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "suluk" TEXT NOT NULL DEFAULT '-',
    "muwadhotah" TEXT NOT NULL DEFAULT '-',
    "nadzofah" TEXT NOT NULL DEFAULT '-',
    "indhiplat" TEXT NOT NULL DEFAULT '-',

    CONSTRAINT "Personality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeroomNote" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "className" TEXT NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeroomNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" SERIAL NOT NULL,
    "schoolName" TEXT NOT NULL DEFAULT 'Pondok Pesantren Terpadu Ulul Albab',
    "academicYear" TEXT NOT NULL DEFAULT '2026/2027',
    "semester" TEXT NOT NULL DEFAULT 'Ganjil',
    "principalName" TEXT NOT NULL DEFAULT 'Pimpinan Pesantren',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentPromotion" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,
    "fromClass" TEXT NOT NULL,
    "toClass" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NAIK',
    "note" TEXT,
    "promotedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_identity_number_key" ON "Teacher"("identity_number");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_level_key" ON "Subject"("name", "level");

-- CreateIndex
CREATE INDEX "CP_subjectId_idx" ON "CP"("subjectId");

-- CreateIndex
CREATE INDEX "CP_grade_idx" ON "CP"("grade");

-- CreateIndex
CREATE INDEX "TP_cpId_idx" ON "TP"("cpId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");

-- CreateIndex
CREATE INDEX "Student_class_name_idx" ON "Student"("class_name");

-- CreateIndex
CREATE INDEX "Student_status_idx" ON "Student"("status");

-- CreateIndex
CREATE INDEX "Assessment_studentId_idx" ON "Assessment"("studentId");

-- CreateIndex
CREATE INDEX "Assessment_tpId_idx" ON "Assessment"("tpId");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_studentId_tpId_type_key" ON "Assessment"("studentId", "tpId", "type");

-- CreateIndex
CREATE INDEX "Tahfidz_studentId_idx" ON "Tahfidz"("studentId");

-- CreateIndex
CREATE INDEX "Attendance_studentId_idx" ON "Attendance"("studentId");

-- CreateIndex
CREATE INDEX "Attendance_className_idx" ON "Attendance"("className");

-- CreateIndex
CREATE INDEX "Attendance_date_idx" ON "Attendance"("date");

-- CreateIndex
CREATE INDEX "Attendance_day_idx" ON "Attendance"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_date_key" ON "Attendance"("studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ClassRoom_name_key" ON "ClassRoom"("name");

-- CreateIndex
CREATE INDEX "ClassRoom_level_idx" ON "ClassRoom"("level");

-- CreateIndex
CREATE INDEX "ClassRoom_grade_idx" ON "ClassRoom"("grade");

-- CreateIndex
CREATE INDEX "Assignment_teacherId_idx" ON "Assignment"("teacherId");

-- CreateIndex
CREATE INDEX "Assignment_subjectId_idx" ON "Assignment"("subjectId");

-- CreateIndex
CREATE INDEX "Assignment_className_idx" ON "Assignment"("className");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_teacherId_subjectId_className_academicYear_key" ON "Assignment"("teacherId", "subjectId", "className", "academicYear");

-- CreateIndex
CREATE UNIQUE INDEX "Personality_studentId_key" ON "Personality"("studentId");

-- CreateIndex
CREATE INDEX "Personality_className_idx" ON "Personality"("className");

-- CreateIndex
CREATE INDEX "Personality_studentId_idx" ON "Personality"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "HomeroomNote_studentId_key" ON "HomeroomNote"("studentId");

-- CreateIndex
CREATE INDEX "HomeroomNote_className_idx" ON "HomeroomNote"("className");

-- CreateIndex
CREATE INDEX "HomeroomNote_studentId_idx" ON "HomeroomNote"("studentId");

-- CreateIndex
CREATE INDEX "StudentPromotion_studentId_idx" ON "StudentPromotion"("studentId");

-- CreateIndex
CREATE INDEX "StudentPromotion_academicYear_idx" ON "StudentPromotion"("academicYear");

-- CreateIndex
CREATE INDEX "StudentPromotion_fromClass_idx" ON "StudentPromotion"("fromClass");

-- CreateIndex
CREATE INDEX "StudentPromotion_toClass_idx" ON "StudentPromotion"("toClass");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPromotion_studentId_academicYear_key" ON "StudentPromotion"("studentId", "academicYear");

-- AddForeignKey
ALTER TABLE "CP" ADD CONSTRAINT "CP_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TP" ADD CONSTRAINT "TP_cpId_fkey" FOREIGN KEY ("cpId") REFERENCES "CP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_tpId_fkey" FOREIGN KEY ("tpId") REFERENCES "TP"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tahfidz" ADD CONSTRAINT "Tahfidz_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personality" ADD CONSTRAINT "Personality_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeroomNote" ADD CONSTRAINT "HomeroomNote_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPromotion" ADD CONSTRAINT "StudentPromotion_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
