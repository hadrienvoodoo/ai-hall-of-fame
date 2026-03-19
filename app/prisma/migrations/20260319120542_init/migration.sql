-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "toolUsed" TEXT NOT NULL,
    "problemSolved" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "beforeAfterUrl" TEXT,
    "aiLevel" INTEGER NOT NULL DEFAULT 1,
    "contributorSlackId" TEXT NOT NULL,
    "contributorName" TEXT NOT NULL,
    "slackMessageTs" TEXT,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contributor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slackId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "currentAiLevel" INTEGER NOT NULL DEFAULT 1,
    "projectCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "voterSlackId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_slackId_key" ON "Contributor"("slackId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_projectId_voterSlackId_key" ON "Vote"("projectId", "voterSlackId");
