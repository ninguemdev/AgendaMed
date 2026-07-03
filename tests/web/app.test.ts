import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { createApp, type ApplicationContainer } from '../../src/infrastructure/web/app';
import type { Appointment } from '../../src/domain/entities/Appointment';
import type { Patient } from '../../src/domain/entities/Patient';
import type { MedicalService } from '../../src/domain/entities/Service';

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

const appointment: Appointment = {
  id: 'appointment-1',
  patientId: patient.id,
  serviceId: service.id,
  appointmentDate: new Date(Date.UTC(2026, 6, 10)),
  appointmentTime: '09:30',
  notes: 'Primeira consulta',
  patient,
  service,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function makeContainer(): ApplicationContainer {
  return {
    createPatientUseCase: {
      execute: vi.fn(async () => patient),
    },
    listServicesUseCase: {
      execute: vi.fn(async () => [service]),
    },
    createAppointmentUseCase: {
      execute: vi.fn(async () => appointment),
    },
    listAppointmentsUseCase: {
      execute: vi.fn(async () => [appointment]),
    },
    checkDatabase: vi.fn(async () => 'connected'),
  };
}

describe('AgendaMed web app', () => {
  it('renderiza a pagina inicial', async () => {
    const app = createApp(makeContainer());

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('AgendaMed');
    expect(response.text).toContain('Agendar consulta');
  });

  it('renderiza servicos vindos do caso de uso', async () => {
    const app = createApp(makeContainer());

    const response = await request(app).get('/servicos');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Consulta clinica geral');
  });

  it('salva agendamento pelo formulario', async () => {
    const container = makeContainer();
    const app = createApp(container);

    const response = await request(app).post('/agendar').type('form').send({
      name: 'Paciente Teste',
      email: 'paciente@example.com',
      phone: '(11) 99999-9999',
      serviceId: service.id,
      appointmentDate: '2026-07-10',
      appointmentTime: '09:30',
      notes: 'Primeira consulta',
    });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/agendar?success=1');
    expect(container.createPatientUseCase.execute).toHaveBeenCalledOnce();
    expect(container.createAppointmentUseCase.execute).toHaveBeenCalledOnce();
  });

  it('renderiza a pagina de equipe e tecnologias com itens obrigatorios', async () => {
    const app = createApp(makeContainer());

    const response = await request(app).get('/tecnologias');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Servidor usado: Render Web Service');
    expect(response.text).toContain('Cloudflare WAF');
    expect(response.text).toContain('Clean Architecture');
    expect(response.text).toContain('Integrante 1');
  });

  it('responde health check com status do banco', async () => {
    const app = createApp(makeContainer());

    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      database: 'connected',
    });
    expect(response.body.timestamp).toBeDefined();
  });
});

