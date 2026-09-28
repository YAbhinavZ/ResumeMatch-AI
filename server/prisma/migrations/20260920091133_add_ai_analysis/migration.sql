-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "aiMatchScore" INTEGER,
ADD COLUMN     "aiMatchedSkills" JSONB,
ADD COLUMN     "aiMissingSkills" JSONB,
ADD COLUMN     "aiStrengths" JSONB,
ADD COLUMN     "aiSuggestions" JSONB,
ADD COLUMN     "aiSummary" TEXT;
