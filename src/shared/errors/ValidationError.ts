import { AppError } from './AppError';

export class ValidationError extends AppError {
  public readonly details: string[];

  constructor(details: string[]) {
    super('Dados invalidos.', 400);
    this.details = details.length > 0 ? details : ['Revise os dados informados.'];
  }
}

