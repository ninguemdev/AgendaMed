# ADR 0002: Clean Architecture

## Status

Aceita.

## Contexto

O trabalho exige organizacao baseada em Clean Architecture.

## Decisao

Separar o codigo em:

- `domain`
- `application`
- `infrastructure`
- `presentation`
- `shared`

O dominio define entidades e contratos. A aplicacao define casos de uso. A infraestrutura implementa banco e web. A apresentacao renderiza as views.

## Consequencias

A separacao aumenta a clareza para apresentacao e permite testar casos de uso sem banco real.

