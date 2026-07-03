# Deploy no Render

## 1. Criar banco PostgreSQL

No Render:

1. Acesse o dashboard.
2. Crie um PostgreSQL.
3. Copie a `DATABASE_URL` externa ou interna conforme a configuracao do Web Service.

Alternativa: usar Supabase PostgreSQL e copiar a connection string.

## 2. Criar Web Service

1. Crie um novo **Web Service**.
2. Conecte o repositorio GitHub.
3. Selecione o branch `main`.
4. Configure Node.js como ambiente.

O arquivo `render.yaml` tambem registra a configuracao esperada do Web Service para facilitar a revisao.

## 3. Build command

```txt
npm install && npm run prisma:generate && npm run build
```

## 4. Start command

```txt
npm run prisma:deploy && npm run prisma:seed && npm start
```

## 5. Variaveis de ambiente

```txt
DATABASE_URL=connection string do PostgreSQL
NODE_ENV=production
PORT=10000
PUBLIC_SITE_URL=https://SEU-LINK-DO-RENDER.onrender.com
```

## 6. Migrations

O comando de start executa:

```bash
npm run prisma:deploy
```

Isso aplica as migrations versionadas em `prisma/migrations`.

## 7. Seed

O comando de start tambem executa:

```bash
npm run prisma:seed
```

O seed usa upsert, portanto pode ser executado novamente sem duplicar os servicos iniciais.

## 8. Link publico

Apos o deploy, o Render gera um link publico semelhante a:

```txt
https://agendamed-infra-faculdade.onrender.com
```

Atualize o `README.md` e a pagina `/tecnologias` com o link real quando o deploy estiver concluido.

## 9. Repositorio

O remoto usado neste ambiente foi:

```txt
https://github.com/ninguemdev/AgendaMed
```

Se a entrega exigir o nome `agendamed-infra-faculdade`, crie ou renomeie o repositorio no GitHub e ajuste o remoto:

```bash
git remote set-url origin https://github.com/SEU_USUARIO/agendamed-infra-faculdade.git
git push -u origin main
```
