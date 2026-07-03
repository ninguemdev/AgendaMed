import { Router } from 'express';
import type { HealthController } from '../controllers/HealthController';
import type { PageController } from '../controllers/PageController';

export function createRoutes(
  pageController: PageController,
  healthController: HealthController,
): Router {
  const router = Router();

  router.get('/', pageController.getHome);
  router.get('/servicos', pageController.getServices);
  router.get('/agendar', pageController.getScheduleForm);
  router.post('/agendar', pageController.postSchedule);
  router.get('/agendamentos', pageController.getAppointments);
  router.get('/tecnologias', pageController.getTechnologies);
  router.get('/health', healthController.show);

  return router;
}

