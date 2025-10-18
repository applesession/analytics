-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('validating', 'failed', 'in_progress', 'finalizing', 'completed', 'expired', 'cancelling', 'cancelled');

-- CreateTable
CREATE TABLE "batch" (
    "id" TEXT NOT NULL,
    "status" "BatchStatus" NOT NULL DEFAULT 'validating',
    "input_file_id" TEXT NOT NULL,
    "output_file_id" TEXT,
    "error_file_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch_request" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "error" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "batch_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dialog_metric" (
    "id" TEXT NOT NULL,
    "batch_request_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "dialog_started" BOOLEAN NOT NULL,
    "service_chosen" BOOLEAN NOT NULL,
    "specialist_chosen" BOOLEAN NOT NULL,
    "recorded" BOOLEAN NOT NULL,
    "visited" BOOLEAN NOT NULL,
    "messages_before_record" INTEGER,
    "script_adherence_percent" INTEGER NOT NULL,
    "leading_questions_percent" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dialog_metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversion_metric" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "dialogs_started" INTEGER,
    "services_chosen" INTEGER,
    "specialists_chosen" INTEGER,
    "records_made" INTEGER,
    "visits_made" INTEGER,
    "dropoff_percent" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversion_metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality_metric" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "avg_messages_before_record" INTEGER,
    "script_adherence_percent" INTEGER NOT NULL,
    "leading_questions_percent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quality_metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "batch_input_file_id_key" ON "batch"("input_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "batch_output_file_id_key" ON "batch"("output_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "batch_error_file_id_key" ON "batch"("error_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "dialog_metric_batch_request_id_key" ON "dialog_metric"("batch_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "conversion_metric_batch_id_key" ON "conversion_metric"("batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "quality_metric_batch_id_key" ON "quality_metric"("batch_id");

-- AddForeignKey
ALTER TABLE "batch_request" ADD CONSTRAINT "batch_request_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dialog_metric" ADD CONSTRAINT "dialog_metric_batch_request_id_fkey" FOREIGN KEY ("batch_request_id") REFERENCES "batch_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversion_metric" ADD CONSTRAINT "conversion_metric_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality_metric" ADD CONSTRAINT "quality_metric_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
