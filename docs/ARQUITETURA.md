# Arquitetura

O AgendaMed usa Clean Architecture para separar regras de negocio, casos de uso, infraestrutura e interface web.

## Camadas

### Domain

Contem entidades e contratos de repositorio:

- Patient
- MedicalService
- Appointment
- PatientRepository
- ServiceRepository
- AppointmentRepository

Esta camada nao depende de Express, Prisma, banco de dados ou detalhes de interface.

### Application

Contem casos de uso e DTOs:

- CreatePatientUseCase
- ListServicesUseCase
- CreateAppointmentUseCase
- ListAppointmentsUseCase

Os casos de uso dependem apenas dos contratos do dominio. As validacoes de entrada usam Zod.

### Infrastructure

Contem detalhes externos:

- Cliente Prisma
- Repositorios concretos usando PostgreSQL
- Aplicacao Express
- Rotas, controllers e middlewares
- Health check com verificacao do banco

### Presentation

Contem a interface renderizada pelo servidor:

- Views EJS
- Layouts e partials
- CSS e assets publicos

### Shared

Contem configuracoes e erros reutilizaveis, como variaveis de ambiente e erros de validacao.

## Fluxo principal

```txt
Usuario -> Express Route -> Controller -> Use Case -> Repository Interface -> Prisma Repository -> PostgreSQL
```

O retorno segue o caminho inverso ate a view EJS ou resposta JSON.

## Justificativa

A separacao facilita a defesa academica porque mostra onde ficam as regras de negocio e onde ficam os detalhes tecnicos. Tambem permite testar os casos de uso sem depender diretamente do banco ou do Express.

