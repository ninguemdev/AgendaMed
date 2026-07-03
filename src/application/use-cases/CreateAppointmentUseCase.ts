import { z } from 'zod';
import type { Appointment } from '../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';
import type { PatientRepository } from '../../domain/repositories/PatientRepository';
import type { ServiceRepository } from '../../domain/repositories/ServiceRepository';
import { ValidationError } from '../../shared/errors/ValidationError';
import type { CreateAppointmentDTO } from '../dto/CreateAppointmentDTO';

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const createAppointmentSchema = z.object({
  patientId: z.string().trim().min(1, 'Paciente obrigatorio.'),
  serviceId: z.string().trim().min(1, 'Servico obrigatorio.'),
  appointmentDate: z.string().trim().min(1, 'Data obrigatoria.'),
  appointmentTime: z
    .string()
    .trim()
    .min(1, 'Horario obrigatorio.')
    .regex(timeRegex, 'Horario invalido. Use o formato HH:mm.'),
  notes: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined)),
});

function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  const isSameDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return isSameDate ? date : null;
}

function todayUtcDateOnly(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute(input: CreateAppointmentDTO): Promise<Appointment> {
    const parsed = createAppointmentSchema.safeParse(input);

    if (!parsed.success) {
      throw new ValidationError(parsed.error.issues.map((issue) => issue.message));
    }

    const appointmentDate = parseDateOnly(parsed.data.appointmentDate);

    if (!appointmentDate) {
      throw new ValidationError(['Data invalida. Use uma data existente no formato AAAA-MM-DD.']);
    }

    if (appointmentDate < todayUtcDateOnly()) {
      throw new ValidationError(['Nao e permitido agendar para uma data passada.']);
    }

    const [patient, service] = await Promise.all([
      this.patientRepository.findById(parsed.data.patientId),
      this.serviceRepository.findById(parsed.data.serviceId),
    ]);

    if (!patient) {
      throw new ValidationError(['Paciente informado nao foi encontrado.']);
    }

    if (!service) {
      throw new ValidationError(['Servico informado nao foi encontrado.']);
    }

    return this.appointmentRepository.create({
      patientId: parsed.data.patientId,
      serviceId: parsed.data.serviceId,
      appointmentDate,
      appointmentTime: parsed.data.appointmentTime,
      notes: parsed.data.notes,
    });
  }
}

