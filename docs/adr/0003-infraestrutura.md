# ADR 0003: Infraestrutura

## Status

Aceita.

## Contexto

O projeto precisa simular a infraestrutura de uma startup ou empresa convencional e informar servidor, DNS, servico web, banco, firewall e nuvem.

## Decisao

Usar:

- Servidor: Render Web Service
- DNS: Cloudflare DNS com dominio proprio ou DNS padrao do Render em `.onrender.com`
- Servico web: Express.js em Node.js com TypeScript
- Banco: PostgreSQL
- Firewall: Cloudflare WAF
- Nuvem: Render Cloud

## Consequencias

O projeto pode ser publicado rapidamente no Render e fica documentado para evoluir com dominio proprio na Cloudflare.

