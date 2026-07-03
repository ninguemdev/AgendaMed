# Infraestrutura

## Servidor

Servidor usado: **Render Web Service com runtime Node.js**.

## DNS

DNS usado: **Cloudflare DNS**, quando usado com dominio proprio.

Para o link publico inicial, pode ser usado o DNS padrao do Render no dominio `.onrender.com`. Nesse caso, a documentacao deve registrar que Cloudflare depende de um dominio proprio.

## Servico web

Servico web usado: **Express.js executando uma aplicacao Node.js em TypeScript**.

## Banco de dados

Banco de dados usado: **PostgreSQL**, acessado pela aplicacao por meio do Prisma.

Em producao, o banco pode ser:

- Render PostgreSQL
- Supabase PostgreSQL

## Firewall

Firewall usado: **Cloudflare WAF** como firewall de aplicacao web definido para proteger a camada HTTP.

Se o deploy estiver apenas no dominio padrao do Render, a configuracao Cloudflare fica documentada como camada planejada para quando houver dominio proprio.

## Nuvem

Nuvem usada: **Render Cloud**.

## Fluxo de requisicao

```txt
Navegador
  -> DNS Cloudflare ou DNS padrao Render
  -> Cloudflare WAF, quando houver dominio proprio
  -> Render Web Service
  -> Express.js
  -> Caso de uso
  -> Repositorio Prisma
  -> PostgreSQL
```

## Diagrama textual da arquitetura

```txt
+------------------+
| Navegador        |
+------------------+
         |
         v
+------------------+
| DNS              |
| Cloudflare/Render|
+------------------+
         |
         v
+------------------+
| Cloudflare WAF   |
| se houver dominio|
+------------------+
         |
         v
+------------------+
| Render Web       |
| Node.js + Express|
+------------------+
         |
         v
+------------------+
| Clean Architecture|
| domain/app/infra |
+------------------+
         |
         v
+------------------+
| PostgreSQL       |
+------------------+
```

