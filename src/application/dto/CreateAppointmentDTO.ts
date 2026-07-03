export interface CreateAppointmentDTO {
  patientId: string;
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

