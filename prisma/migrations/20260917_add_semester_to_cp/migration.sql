-- AlterTable
ALTER TABLE "CP" ADD COLUMN     "semester" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Subject_level_idx" ON "Subject"("level");

-- CreateIndex
CREATE INDEX "CP_semester_idx" ON "CP"("semester");

-- CreateIndex
CREATE INDEX "CP_subjectId_grade_semester_idx" ON "CP"("subjectId", "grade", "semester");

-- CreateIndex
CREATE INDEX "Assessment_type_idx" ON "Assessment"("type");

-- CreateIndex
CREATE INDEX "Tahfidz_date_idx" ON "Tahfidz"("date");

-- CreateIndex
CREATE INDEX "Attendance_status_idx" ON "Attendance"("status");

-- CreateIndex
CREATE INDEX "ClassRoom_status_idx" ON "ClassRoom"("status");

-- CreateIndex
CREATE INDEX "Assignment_academicYear_idx" ON "Assignment"("academicYear");

-- CreateIndex
CREATE INDEX "StudentPromotion_status_idx" ON "StudentPromotion"("status");
