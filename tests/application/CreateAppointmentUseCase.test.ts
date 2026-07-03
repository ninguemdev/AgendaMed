import { describe, expect, it } from 'vitest';
import { CreateAppointmentUseCase } from '../../src/application/use-cases/CreateAppointmentUseCase';
import type {
  Appointment,
  CreateAppointmentData,
} from '../../src/domain/entities/Appointment';
import type { CreatePatientData, Patient } from '../../src/domain/entities/Patient';
import type { MedicalService } from '../../src/domain/entities/Service';
import type { AppointmentRepository } from '../../src/domain/repositories/AppointmentRepository';
import type { PatientRepository } from '../../src/domain/repositories/PatientRepository';
import type { ServiceRepository } from '../../src/domain/repositories/ServiceRepository';
import { ValidationError } from '../../src/shared/errors/ValidationError';

class InMemoryPatientRepository implements PatientRepository {
  constructor(private readonly patients: Patient[]) {}

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

class InMemoryServiceRepository implements ServiceRepository {
  constructor(private readonly services: MedicalService[]) {}

  async list(): Promise<MedicalService[]> {
    return this.services;
  }

  async findById(id: string): Promise<MedicalService | null> {
    return this.services.find((service) => service.id === id) ?? null;
  }
}

class InMemoryAppointmentRepository implements AppointmentRepository {
  public appointments: Appointment[] = [];

  async create(data: CreateAppointmentData): Promise<Appointment> {
    const appointment: Appointment = {
      id: `appointment-${this.appointments.length + 1}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.appointments.push(appointment);
    return appointment;
  }

  async list(): Promise<Appointment[]> {
    return this.appointments;
  }
}

function futureDateInput(): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 3);
  return date.toISOString().slice(0, 10);
}

function makeUseCase() {
  const patient: Patient = {
    id: 'patient-1',
    name: 'Paciente Teste',
    email: 'paciente@example.com',
    phone: '(11) 99999-9999',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const service: MedicalService = {
    id: 'service-1',
    name: 'Consulta clinica geral',
    description: 'Atendimento inicial',
    durationMinutes: 40,
    priceInCents: 18000,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const appointmentRepository = new InMemoryAppointmentRepository();

  return {
    appointmentRepository,
    useCase: new CreateAppointmentUseCase(
      appointmentRepository,
      new InMemoryPatientRepository([patient]),
      new InMemoryServiceRepository([service]),
    ),
  };
}

describe('CreateAppointmentUseCase', () => {
  it('cria agendamento com paciente e servico existentes', async () => {
    const { appointmentRepository, useCase } = makeUseCase();

    const appointment = await useCase.execute({
      patientId: 'patient-1',
      serviceId: 'service-1',
      appointmentDate: futureDateInput(),
      appointmentTime: '09:30',
      notes: 'Primeira consulta',
    });

    expect(appointment.id).toBe('appointment-1');
    expect(appointmentRepository.appointments).toHaveLength(1);
  });

  it('rejeita data inexistente', async () => {
    const { useCase } = makeUseCase();

    await expect(
      useCase.execute({
        patientId: 'patient-1',
        serviceId: 'service-1',
        appointmentDate: '2026-02-30',
        appointmentTime: '09:30',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('rejeita servico inexistente', async () => {
    const { useCase } = makeUseCase();

    await expect(
      useCase.execute({
        patientId: 'patient-1',
        serviceId: 'service-nao-existe',
        appointmentDate: futureDateInput(),
        appointmentTime: '09:30',
      }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});

