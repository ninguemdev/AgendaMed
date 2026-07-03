import { Prisma, type PrismaClient } from '@prisma/client';
import type { Appointment, CreateAppointmentData } from '../../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../../domain/repositories/AppointmentRepository';
import { AppError } from '../../../shared/errors/AppError';

export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(data: CreateAppointmentData): Promise<Appointment> {
    try {
      return await this.client.appointment.create({
        data,
        include: {
          patient: true,
          service: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new AppError('Ja existe agendamento para este servico nesta data e horario.', 409);
      }

      throw error;
    }
  }

  async list(): Promise<Appointment[]> {
    return this.client.appointment.findMany({
      include: {
        patient: true,
        service: true,
      },
      orderBy: [
        {
          appointmentDate: 'desc',
        },
        {
          appointmentTime: 'desc',
        },
      ],
    });
  }
}

