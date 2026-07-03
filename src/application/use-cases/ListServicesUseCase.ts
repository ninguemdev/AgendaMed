import type { MedicalService } from '../../domain/entities/Service';
import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';

export class ListServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<MedicalService[]> {
    return this.serviceRepository.list();
  }
}

