export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePatientData = Pick<Patient, 'name' | 'email' | 'phone'>;

