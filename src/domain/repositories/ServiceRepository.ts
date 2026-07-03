import type { MedicalService } from '../entities/Service';

export interface ServiceRepository {
  list(): Promise<MedicalService[]>;
  findById(id: string): Promise<MedicalService | null>;
}

