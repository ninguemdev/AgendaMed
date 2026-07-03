import type { CreatePatientData, Patient } from '../entities/Patient';

export interface PatientRepository {
  create(data: CreatePatientData): Promise<Patient>;
  findById(id: string): Promise<Patient | null>;
}

