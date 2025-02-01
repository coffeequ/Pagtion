-- CreateTable
CREATE TABLE "Documents" (
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "parentDocumentId" TEXT DEFAULT '',
    "content" JSONB,
    "coverImage" TEXT,
    "icon" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "Documents_userId_idx" ON "Documents"("userId");

-- CreateIndex
CREATE INDEX "Documents_userId_parentDocumentId_idx" ON "Documents"("userId", "parentDocumentId");

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "Documents"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
