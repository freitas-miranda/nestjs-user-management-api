
# Gestão de usuários

- Projeto desenvolvido para demostrar como separar o core de uma aplicação do framework que está sendo utilizado, implantando Clean Architecture e testes (unitários, integração e e2e).
- Neste exemplo foi utilizado o NestJS que sobe a aplicação e instancia os módulos, que por sua vez preparam os casos de usos para utilização, criando a instância do caso de uso, injetando o repositório a ser utilizado e as demais dependências conforme necessário.

## Tecnologias
- NestJS
- Express
- Jest
- Prisma ORM
- MySql
- Docker
- Dev Container


## Arquitetura
- Clean Architecture

## Comandos
```bash
# Instalar dependências
$ yarn install

# Crie o banco de dados 'login_nest'
# Conectar no container login-nest-db na porta 3307

# Criar as tabelas no banco de dados
$ npx prisma migrate dev

# Iniciar a aplicação
$ yarn dev
```
