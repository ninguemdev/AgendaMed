# Firewall

## Solucao definida

Firewall usado: **Cloudflare WAF**.

O Cloudflare WAF funciona como firewall de aplicacao web, analisando requisicoes HTTP antes de encaminha-las para o servidor da aplicacao.

## Funcao no projeto

No AgendaMed, a funcao planejada do WAF e:

- Reduzir trafego malicioso.
- Bloquear padroes comuns de ataque web.
- Proteger a camada HTTP antes do Render Web Service.
- Permitir regras de bloqueio por pais, IP, caminho ou padrao de requisicao, se necessario.

## Limitacao do dominio `.onrender.com`

Se o projeto estiver publicado apenas no dominio padrao do Render, a Cloudflare nao controla o DNS desse dominio. Por isso, o Cloudflare WAF fica documentado como camada definida para quando houver dominio proprio.

Mesmo sem dominio proprio, a aplicacao inclui medidas basicas:

- Helmet no Express.
- Rate limit simples.
- Validacao com Zod.
- Variaveis de ambiente.
- Nao exposicao de stack trace em producao.

