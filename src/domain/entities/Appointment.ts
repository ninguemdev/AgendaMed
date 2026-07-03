import type { Patient } from './Patient';
import type { MedicalService } from './Service';

export interface Appointment {
  id: string;
  patientId: string;
  serviceId: string;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  patient?: Patient;
  service?: MedicalService;
}

export interface CreateAppointmentData {
  patientId: string;
  serviceId: string;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string | null;
}

