import { z } from 'zod';
import type { Patient } from '../../domain/entities/Patient';
import type { PatientRepository } from '../../domain/repositories/PatientRepository';
import { ValidationError } from '../../shared/errors/ValidationError';
import type { CreatePatientDTO } from '../dto/CreatePatientDTO';

const createPatientSchema = z.object({
  name: z.string().trim().min(1, 'Nome obrigatorio.'),
  email: z.string().trim().email('E-mail invalido.'),
  phone: z.string().trim().min(1, 'Telefone obrigatorio.'),
});

export class CreatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: CreatePatientDTO): Promise<Patient> {
    const parsed = createPatientSchema.safeParse(input);

    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues.map((issue) => issue.message));
    }

    return this.patientRepository.create(parsed.data);
  }
}

