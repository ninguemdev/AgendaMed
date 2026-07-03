# AgendaMed

AgendaMed e uma aplicacao web academica que simula uma startup de agendamento online para clinicas e profissionais autonomos. O sistema permite listar servicos, cadastrar pacientes, criar agendamentos e visualizar uma area administrativa simples com os agendamentos cadastrados.

O entregavel final do trabalho e um site online funcionando, com uma pagina obrigatoria chamada **Equipe e Tecnologias** explicando a infraestrutura simulada e as tecnologias utilizadas.

## Link do site online

Placeholder ate o deploy final:

```txt
https://SEU-LINK-DO-RENDER.onrender.com
```

## Repositorio GitHub

Repositorio remoto usado neste ambiente:

```txt
https://github.com/ninguemdev/AgendaMed
```

O GitHub CLI nao estava disponivel neste ambiente para criar automaticamente o repositorio com o nome `agendamed-infra-faculdade`. Se a entrega exigir exatamente esse nome, crie ou renomeie o repositorio no GitHub e atualize o remoto local.

## Requisitos do trabalho

- Site online funcionando.
- Simulacao de startup convencional.
- Banco de dados real com PostgreSQL.
- Informacoes de servidor, DNS, servico web, banco, firewall e nuvem visiveis no site.
- Versionamento com Git e GitHub.
- Commits consistentes e sem coautoria.
- Organizacao baseada em Clean Architecture.
- Documentacao criada antes da implementacao das funcionalidades.

## Tecnologias usadas

- TypeScript
- Node.js
- Express.js
- EJS
- PostgreSQL
- Prisma
- Zod
- Vitest
- ESLint
- Prettier
- Helmet
- Express Rate Limit
- Render Web Service
- Render PostgreSQL ou Supabase PostgreSQL
- Cloudflare DNS e Cloudflare WAF, quando houver dominio proprio

## Como rodar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Suba o PostgreSQL local:

```bash
docker compose up -d
```

3. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Gere o Prisma Client:

```bash
npm run prisma:generate
```

5. Rode as migrations:

```bash
npm run prisma:migrate
```

6. Rode o seed:

```bash
npm run prisma:seed
```

7. Inicie a aplicacao:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Variaveis de ambiente

Use `.env.example` como base:

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agendamed?schema=public"
NODE_ENV=development
PORT=3000
PUBLIC_SITE_URL="http://localhost:3000"
```

Nunca commite `.env` ou segredos.

## Migrations e seed

```bash
npm run prisma:migrate
npm run prisma:seed
```

O seed cria os servicos iniciais:

- Consulta clinica geral
- Retorno medico
- Teleconsulta
- Exame preventivo

## Testes, lint e build

```bash
npm run lint
npm run test
npm run build
```

## Deploy no Render

Configuracao esperada:

```txt
Build Command:
npm install && npm run prisma:generate && npm run build

Start Command:
npm run prisma:deploy && npm run prisma:seed && npm start
```

Variaveis:

```txt
DATABASE_URL=
NODE_ENV=production
PORT=10000
PUBLIC_SITE_URL=https://SEU-LINK-DO-RENDER.onrender.com
```

O guia detalhado esta em [docs/DEPLOY_RENDER.md](docs/DEPLOY_RENDER.md).

## Estrutura

```txt
src/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── shared/
```

A separacao segue Clean Architecture:

- `domain`: entidades e contratos.
- `application`: casos de uso e DTOs.
- `infrastructure`: Prisma, banco e web.
- `presentation`: views EJS e recursos visuais.
- `shared`: configuracoes e erros comuns.

## GitHub

Repositorio esperado para entrega:

```txt
agendamed-infra-faculdade
```

Se o GitHub CLI estiver disponivel:

```bash
gh repo create agendamed-infra-faculdade --public --source=. --remote=origin --push
```

Se o repositorio ja existir:

```bash
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

Se o remoto atual precisar ser trocado pelo repositorio da entrega:

```bash
git remote set-url origin https://github.com/SEU_USUARIO/agendamed-infra-faculdade.git
git push -u origin main
```
