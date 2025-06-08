-- CreateTable
CREATE TABLE "HabitCheckmark" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "HabitCheckmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HabitCheckmark" ADD CONSTRAINT "HabitCheckmark_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
