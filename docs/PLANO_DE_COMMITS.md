# Plano de Commits

O projeto seguira commits pequenos e consistentes, usando Conventional Commits.

1. `chore: configura estrutura inicial do projeto`
2. `docs: documenta requisitos arquitetura e infraestrutura`
3. `chore: configura express prisma postgres e testes`
4. `feat: implementa dominio e casos de uso`
5. `feat: adiciona persistencia com postgres e prisma`
6. `feat: cria interface web da agendamed`
7. `feat: adiciona pagina de equipe e tecnologias`
8. `test: adiciona cobertura dos fluxos principais`
9. `docs: atualiza instrucoes de repositorio e deploy`, se necessario
10. `chore: prepara deploy em producao`

Regras:

- Verificar `git status` antes de cada commit.
- Nao usar `Co-authored-by`.
- Nao commitar `.env`.
- Nao commitar segredos.
- Rodar `npm run lint`, `npm run test` e `npm run build` antes dos commits finais.

