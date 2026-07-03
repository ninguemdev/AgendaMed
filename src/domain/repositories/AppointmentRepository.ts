import type { Appointment, CreateAppointmentData } from '../entities/Appointment';

export interface AppointmentRepository {
  create(data: CreateAppointmentData): Promise<Appointment>;
  list(): Promise<Appointment[]>;
}

