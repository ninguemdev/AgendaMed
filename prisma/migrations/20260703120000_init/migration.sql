CREATE TABLE "patients" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "medical_services" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "durationMinutes" INTEGER NOT NULL,
  "priceInCents" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "medical_services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "appointments" (
  "id" TEXT NOT NULL,
  "patientId" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "appointmentDate" DATE NOT NULL,
  "appointmentTime" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "medical_services_name_key" ON "medical_services"("name");

CREATE UNIQUE INDEX "appointments_serviceId_appointmentDate_appointmentTime_key"
ON "appointments"("serviceId", "appointmentDate", "appointmentTime");

CREATE INDEX "appointments_patientId_idx" ON "appointments"("patientId");

CREATE INDEX "appointments_serviceId_idx" ON "appointments"("serviceId");

ALTER TABLE "appointments"
ADD CONSTRAINT "appointments_patientId_fkey"
FOREIGN KEY ("patientId") REFERENCES "patients"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "appointments"
ADD CONSTRAINT "appointments_serviceId_fkey"
FOREIGN KEY ("serviceId") REFERENCES "medical_services"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

