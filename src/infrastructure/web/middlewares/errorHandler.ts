import type { NextFunction, Request, Response } from 'express';
import { env } from '../../../shared/config/env';
import { AppError } from '../../../shared/errors/AppError';

export function notFoundHandler(request: Request, response: Response): void {
  response.status(404).render('pages/error', {
    title: 'Pagina nao encontrada',
    statusCode: 404,
    message: `A rota ${request.path} nao foi encontrada.`,
    details: null,
  });
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message =
    error instanceof AppError
      ? error.message
      : 'Erro interno ao processar a solicitacao.';

  response.status(statusCode).render('pages/error', {
    title: 'Erro',
    statusCode,
    message,
    details: env.NODE_ENV === 'production' ? null : error instanceof Error ? error.stack : null,
  });
}

