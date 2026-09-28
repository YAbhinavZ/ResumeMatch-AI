-- CreateTable
CREATE TABLE "Analysis" (
    "id" SERIAL NOT NULL,
    "resumeFileName" TEXT NOT NULL,
    "jobDescriptionFileName" TEXT,
    "jobDescriptionSource" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "matchedSkills" JSONB NOT NULL,
    "missingSkills" JSONB NOT NULL,
    "resumeTextLength" INTEGER NOT NULL,
    "jobDescriptionTextLength" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);
