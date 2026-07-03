import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { ValidationError } from '../../../shared/errors/ValidationError';
import { env } from '../../../shared/config/env';
import { teamMembers, teamName, technologies } from '../../../shared/config/projectInfo';
import type { ApplicationContainer } from '../app';

interface ScheduleFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
}

function todayInputValue(): string {
  return new Date().toISOString().slice(0, 10);
}

function normalizeScheduleBody(body: unknown): ScheduleFormData {
  const data = body as Partial<Record<keyof ScheduleFormData, string>>;

  return {
    name: data.name ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    serviceId: data.serviceId ?? '',
    appointmentDate: data.appointmentDate ?? '',
    appointmentTime: data.appointmentTime ?? '',
    notes: data.notes ?? '',
  };
}

function getErrorMessages(error: unknown): string[] {
  if (error instanceof ValidationError) {
    return error.details;
  }

  if (error instanceof AppError) {
    return [error.message];
  }

  return ['Nao foi possivel concluir a operacao. Tente novamente.'];
}

export class PageController {
  constructor(private readonly container: ApplicationContainer) {}

  getHome = (_request: Request, response: Response): void => {
    response.render('pages/home', {
      title: 'Inicio',
    });
  };

  getServices = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const services = await this.container.listServicesUseCase.execute();

      response.render('pages/services', {
        title: 'Servicos',
        services,
      });
    } catch (error) {
      next(error);
    }
  };

  getScheduleForm = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const services = await this.container.listServicesUseCase.execute();

      response.render('pages/schedule', {
        title: 'Agendar consulta',
        services,
        form: normalizeScheduleBody({}),
        success: request.query.success === '1',
        errors: [],
        today: todayInputValue(),
      });
    } catch (error) {
      next(error);
    }
  };

  postSchedule = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const form = normalizeScheduleBody(request.body);

    try {
      const patient = await this.container.createPatientUseCase.execute({
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      await this.container.createAppointmentUseCase.execute({
        patientId: patient.id,
        serviceId: form.serviceId,
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        notes: form.notes,
      });

      response.redirect('/agendar?success=1');
    } catch (error) {
      try {
        const services = await this.container.listServicesUseCase.execute();

        response.status(error instanceof AppError ? error.statusCode : 400).render('pages/schedule', {
          title: 'Agendar consulta',
          services,
          form,
          success: false,
          errors: getErrorMessages(error),
          today: todayInputValue(),
        });
      } catch (renderError) {
        next(renderError);
      }
    }
  };

  getAppointments = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const appointments = await this.container.listAppointmentsUseCase.execute();

      response.render('pages/appointments', {
        title: 'Agendamentos',
        appointments,
      });
    } catch (error) {
      next(error);
    }
  };

  getTechnologies = (_request: Request, response: Response): void => {
    response.render('pages/technologies', {
      title: 'Equipe e Tecnologias',
      teamName,
      teamMembers,
      technologies,
      publicSiteUrl: env.PUBLIC_SITE_URL,
    });
  };
}

