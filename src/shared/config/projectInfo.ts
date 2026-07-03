export const teamName = 'AgendaMed Infra';

export const teamMembers = [
  { name: 'Integrante 1', role: 'Planejamento, requisitos e documentacao' },
  { name: 'Integrante 2', role: 'Arquitetura, dominio e casos de uso' },
  { name: 'Integrante 3', role: 'Banco de dados, Prisma e deploy' },
  { name: 'Integrante 4', role: 'Interface web, testes e apresentacao' },
];

export const technologies = [
  'TypeScript',
  'Node.js',
  'Express.js',
  'EJS',
  'PostgreSQL',
  'Prisma',
  'Zod',
  'Vitest',
  'ESLint',
  'Prettier',
  'Helmet',
  'Express Rate Limit',
  'Render Web Service',
  'Cloudflare DNS',
  'Cloudflare WAF',
];

export const infrastructureRequirements = [
  {
    item: 'Servidor',
    solution: 'Render Web Service',
  },
  {
    item: 'DNS',
    solution: 'Cloudflare DNS / Render DNS padrao para link .onrender.com',
  },
  {
    item: 'Servico web',
    solution: 'Express.js com Node.js e TypeScript',
  },
  {
    item: 'Banco de dados',
    solution: 'PostgreSQL',
  },
  {
    item: 'Firewall',
    solution: 'Cloudflare WAF',
  },
  {
    item: 'Nuvem',
    solution: 'Render Cloud',
  },
];

export const infrastructureStatements = [
  'Servidor usado: Render Web Service com runtime Node.js.',
  'DNS usado: Cloudflare DNS, quando usado com dominio proprio. Para o link publico inicial, foi usado o DNS padrao do Render no dominio .onrender.com.',
  'Servico web usado: Express.js executando uma aplicacao Node.js em TypeScript.',
  'Banco de dados usado: PostgreSQL.',
  'Firewall usado: Cloudflare WAF como firewall de aplicacao web definido para protecao da camada HTTP. Caso o deploy esteja apenas no dominio padrao do Render, registrar que a configuracao Cloudflare depende de dominio proprio.',
  'Nuvem usada: Render Cloud.',
];
