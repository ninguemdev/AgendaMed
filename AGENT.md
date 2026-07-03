# AGENT.md

## Objetivo do projeto

AgendaMed e um projeto academico que simula a infraestrutura de uma startup de agendamento online para clinicas e profissionais autonomos. O entregavel final e um site online funcionando, com uma pagina explicando equipe, tecnologias e infraestrutura.

## Stack

- Linguagem: TypeScript
- Runtime: Node.js
- Backend/web service: Express.js
- Views: EJS
- Banco de dados: PostgreSQL
- ORM: Prisma
- Validacao: Zod
- Testes: Vitest
- Lint/format: ESLint e Prettier
- Deploy: Render Web Service
- Nuvem: Render Cloud
- DNS: Cloudflare DNS quando houver dominio proprio; caso contrario, DNS padrao do Render
- Firewall: Cloudflare WAF quando houver dominio proprio
- Versionamento: Git + GitHub

## Regras de arquitetura

- Usar Clean Architecture.
- `domain` contem entidades e contratos de repositorio.
- `application` contem casos de uso e DTOs.
- `infrastructure` contem Prisma, implementacoes concretas, banco e Express.
- `presentation` contem views EJS e assets.
- `shared` contem configuracoes e erros reutilizaveis.
- O dominio nao deve importar Express, Prisma ou codigo de banco.

## Regras de commits

- Usar commits pequenos e consistentes.
- Usar Conventional Commits.
- Verificar `git status` antes de commitar.
- Rodar lint, testes e build antes dos commits finais importantes.
- Nao commitar `.env`, segredos, arquivos temporarios ou credenciais.

## Proibicao de coautoria

- Nao adicionar `Co-authored-by`.
- Nao atribuir autoria a IA.
- Nao inventar nomes de pessoas.
- Os integrantes devem permanecer como placeholders editaveis.

## Como rodar

```bash
npm install
docker compose up -d
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Como testar

```bash
npm run lint
npm run test
npm run build
```

## Como fazer deploy

No Render, configurar:

```txt
Build Command:
npm install --include=dev && npm run prisma:generate && npm run build

Start Command:
npm run prisma:deploy && npm run prisma:seed && npm start
```

Variaveis:

```txt
DATABASE_URL=
NODE_ENV=production
PORT=10000
PUBLIC_SITE_URL=
```
