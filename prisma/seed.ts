import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    name: 'Consulta clinica geral',
    description: 'Atendimento inicial para avaliacao de sintomas, orientacoes e encaminhamentos.',
    durationMinutes: 40,
    priceInCents: 18000,
  },
  {
    name: 'Retorno medico',
    description: 'Consulta de retorno para acompanhamento de exames, tratamento e evolucao clinica.',
    durationMinutes: 25,
    priceInCents: 9000,
  },
  {
    name: 'Teleconsulta',
    description: 'Atendimento online para orientacoes medicas e acompanhamento remoto.',
    durationMinutes: 30,
    priceInCents: 14000,
  },
  {
    name: 'Exame preventivo',
    description: 'Agendamento de avaliacao preventiva e solicitacao de exames de rotina.',
    durationMinutes: 50,
    priceInCents: 22000,
  },
];

async function main() {
  for (const service of services) {
    await prisma.medicalService.upsert({
      where: { name: service.name },
      update: service,
      create: service,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

