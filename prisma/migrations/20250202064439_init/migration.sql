-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "parentDocumentId" TEXT,
    "content" JSONB,
    "coverImage" TEXT,
    "icon" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "Document_userId_parentDocumentId_idx" ON "Document"("userId", "parentDocumentId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_parentDocumentId_fkey" FOREIGN KEY ("parentDocumentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
