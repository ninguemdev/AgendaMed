# DNS Cloudflare

## Cenario com dominio proprio

Quando houver um dominio proprio, a configuracao recomendada e usar Cloudflare DNS apontando para o Web Service do Render.

Exemplo:

```txt
Tipo: CNAME
Nome: www
Destino: endereco fornecido pelo Render
Proxy: ativado
```

Tambem pode ser criado um registro para o dominio raiz, conforme as orientacoes do provedor do dominio e do Render.

## Cenario sem dominio proprio

Se nao houver dominio proprio, o projeto pode ser entregue inicialmente usando o dominio padrao do Render:

```txt
https://NOME-DO-SERVICO.onrender.com
```

Nesse caso, a pagina `/tecnologias` deve informar que:

- O DNS do link publico inicial e o DNS padrao do Render.
- Cloudflare DNS esta documentado como configuracao para dominio proprio.
- Cloudflare WAF depende da ativacao do proxy da Cloudflare em um dominio gerenciado por ela.

