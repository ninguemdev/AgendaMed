import { describe, expect, it } from 'vitest';
import { CreatePatientUseCase } from '../../src/application/use-cases/CreatePatientUseCase';
import type { CreatePatientData, Patient } from '../../src/domain/entities/Patient';
import type { PatientRepository } from '../../src/domain/repositories/PatientRepository';
import { ValidationError } from '../../src/shared/errors/ValidationError';

class InMemoryPatientRepository implements PatientRepository {
  public patients: Patient[] = [];

  async create(data: CreatePatientData): Promise<Patient> {
    const patient: Patient = {
      id: `patient-${this.patients.length + 1}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.patients.push(patient);
    return patient;
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patients.find((patient) => patient.id === id) ?? null;
  }
}

describe('CreatePatientUseCase', () => {
  it('cria paciente com dados validos', async () => {
    const repository = new InMemoryPatientRepository();
    const useCase = new CreatePatientUseCase(repository);

    const patient = await useCase.execute({
      name: 'Paciente Teste',
      email: 'paciente@example.com',
      phone: '(11) 99999-9999',
    });

    expect(patient.id).toBe('patient-1');
    expect(repository.patients).toHaveLength(1);
  });

  it('rejeita e-mail invalido', async () => {
    const repository = new InMemoryPatientRepository();
    const useCase = new CreatePatientUseCase(repository);

    await expect(
      useCase.execute({
        name: 'Paciente Teste',
        email: 'email-invalido',
        phone: '(11) 99999-9999',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});

