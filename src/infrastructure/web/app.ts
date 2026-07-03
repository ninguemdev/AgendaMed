import express, { type Express } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { CreateAppointmentUseCase } from '../../application/use-cases/CreateAppointmentUseCase';
import { CreatePatientUseCase } from '../../application/use-cases/CreatePatientUseCase';
import { ListAppointmentsUseCase } from '../../application/use-cases/ListAppointmentsUseCase';
import { ListServicesUseCase } from '../../application/use-cases/ListServicesUseCase';
import { checkDatabaseConnection, type DatabaseStatus } from '../database/health';
import { prisma } from '../database/prisma';
import { PrismaAppointmentRepository } from '../database/repositories/PrismaAppointmentRepository';
import { PrismaPatientRepository } from '../database/repositories/PrismaPatientRepository';
import { PrismaServiceRepository } from '../database/repositories/PrismaServiceRepository';
import { HealthController } from './controllers/HealthController';
import { PageController } from './controllers/PageController';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { createRoutes } from './routes';
import { env } from '../../shared/config/env';

export interface ApplicationContainer {
  createPatientUseCase: Pick<CreatePatientUseCase, 'execute'>;
  listServicesUseCase: Pick<ListServicesUseCase, 'execute'>;
  createAppointmentUseCase: Pick<CreateAppointmentUseCase, 'execute'>;
  listAppointmentsUseCase: Pick<ListAppointmentsUseCase, 'execute'>;
  checkDatabase: () => Promise<DatabaseStatus>;
}

export function createDefaultContainer(): ApplicationContainer {
  const patientRepository = new PrismaPatientRepository(prisma);
  const serviceRepository = new PrismaServiceRepository(prisma);
  const appointmentRepository = new PrismaAppointmentRepository(prisma);

  return {
    createPatientUseCase: new CreatePatientUseCase(patientRepository),
    listServicesUseCase: new ListServicesUseCase(serviceRepository),
    createAppointmentUseCase: new CreateAppointmentUseCase(
      appointmentRepository,
      patientRepository,
      serviceRepository,
    ),
    listAppointmentsUseCase: new ListAppointmentsUseCase(appointmentRepository),
    checkDatabase: () => checkDatabaseConnection(prisma),
  };
}

export function createApp(container: ApplicationContainer = createDefaultContainer()): Express {
  const app = express();
  const viewsPath = path.resolve(process.cwd(), 'src', 'presentation', 'views');
  const publicPath = path.resolve(process.cwd(), 'public');

  app.set('view engine', 'ejs');
  app.set('views', viewsPath);

  app.locals.formatCurrency = (valueInCents: number): string =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueInCents / 100);

  app.locals.formatDate = (date: Date): string =>
    new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'UTC',
    }).format(date);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:'],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
        },
      },
    }),
  );

  if (env.NODE_ENV !== 'test') {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: true,
        legacyHeaders: false,
      }),
    );
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(publicPath));

  app.use((request, response, next) => {
    response.locals.currentPath = request.path;
    response.locals.siteName = 'AgendaMed';
    next();
  });

  const pageController = new PageController(container);
  const healthController = new HealthController(container.checkDatabase);

  app.use(createRoutes(pageController, healthController));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

