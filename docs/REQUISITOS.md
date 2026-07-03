# Requisitos do Trabalho

| Requisito | Como foi atendido | Onde aparece no projeto |
| --- | --- | --- |
| Ter um site online funcionando | A aplicacao Express sera publicada no Render Web Service | README, docs/DEPLOY_RENDER.md, rota `/health` |
| Simular uma startup ou empresa convencional | AgendaMed simula uma startup de agendamento para clinicas e profissionais autonomos | Rota `/`, README |
| Ter banco de dados real | O banco definido e PostgreSQL com Prisma | prisma/schema.prisma, docs/INFRAESTRUTURA.md |
| Informar servidor usado | A pagina `/tecnologias` declara Render Web Service | View de tecnologias, docs/INFRAESTRUTURA.md |
| Informar DNS usado | Cloudflare DNS com dominio proprio ou DNS padrao `.onrender.com` do Render | View de tecnologias, docs/DNS_CLOUDFLARE.md |
| Informar servico web usado | Express.js em Node.js com TypeScript | View de tecnologias, docs/INFRAESTRUTURA.md |
| Informar banco de dados usado | PostgreSQL | View de tecnologias, prisma/schema.prisma |
| Informar firewall usado | Cloudflare WAF planejado/definido para dominio proprio | View de tecnologias, docs/FIREWALL.md |
| Informar nuvem usada | Render Cloud | View de tecnologias, docs/INFRAESTRUTURA.md |
| Informar nome da equipe | Integrante informado: Dionel Sebastião, RA:2567830 | docs/EQUIPE.md, rota `/tecnologias` |
| Informar tecnologias utilizadas | Lista de tecnologias documentada e exibida no site | README, rota `/tecnologias` |
| Explicar como foi feito | Texto academico descreve arquitetura, banco e deploy | rota `/tecnologias`, docs/ARQUITETURA.md |
| Usar Git e GitHub | Repositorio Git local e instrucoes para GitHub | README, docs/PLANO_DE_COMMITS.md |
| Ter commits consistentes | Plano de commits separado por etapa | docs/PLANO_DE_COMMITS.md |
| Nao usar coautoria nos commits | Regras documentadas e commits sem `Co-authored-by` | AGENT.md, historico Git |
| Usar Clean Architecture | Camadas domain, application, infrastructure, presentation e shared | src/, docs/ARQUITETURA.md |
| Criar setup e documentacao antes da implementacao | Etapas iniciais do historico criam configuracao e docs antes das funcionalidades | Historico Git |
| Ser simples, funcional, publicavel e defendivel | Escopo sem autenticacao complexa, com rotas essenciais e documentacao | README, docs/ |
