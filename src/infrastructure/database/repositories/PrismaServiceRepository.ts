import type { PrismaClient } from '@prisma/client';
import type { MedicalService } from '../../../domain/entities/Service';
import type { ServiceRepository } from '../../../domain/repositories/ServiceRepository';

export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly client: PrismaClient) {}

  async list(): Promise<MedicalService[]> {
    return this.client.medicalService.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string): Promise<MedicalService | null> {
    return this.client.medicalService.findUnique({
      where: { id },
    });
  }
}

