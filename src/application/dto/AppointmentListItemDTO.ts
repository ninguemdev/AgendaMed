export interface AppointmentListItemDTO {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceName: string;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string | null;
}

