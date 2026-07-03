import type { PrismaClient } from '@prisma/client';
import type { CreatePatientData, Patient } from '../../../domain/entities/Patient';
import type { PatientRepository } from '../../../domain/repositories/PatientRepository';

export class PrismaPatientRepository implements PatientRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(data: CreatePatientData): Promise<Patient> {
    return this.client.patient.create({
      data,
    });
  }

  async findById(id: string): Promise<Patient | null> {
    return this.client.patient.findUnique({
      where: { id },
    });
  }
}

