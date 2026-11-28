-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('PERSONNEL', 'SCOLAIRE', 'ENTREPRISE', 'OPEN_SOURCE', 'INSTITUTIONNEL');

-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('WEB', 'MOBILE', 'DESKTOP', 'API', 'LIBRARY', 'GAME', 'OTHER');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "typeApplication" "ApplicationType" NOT NULL DEFAULT 'WEB',
ADD COLUMN     "typeProjet" "ProjectType" NOT NULL DEFAULT 'PERSONNEL',
ALTER COLUMN "technologies" SET DEFAULT ARRAY[]::TEXT[];
