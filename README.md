# API SOLID - Ignite GymPass


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);


## Tecnologias Utilizadas

- Node.js
- Fastify
- JWT
- Zod
- Swagger Fastify UI
- Docker/Postgresql (para o banco de dados)
- Vitest (Testes E2E)
- Arquitetura Solid
- TDD

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/api-solid.git
   ```
   
2. Navegue até o diretório do projeto:
   ```bash
   cd api-solid
   ```
   
3. Instale as dependências:
   ```bash
   pnpm install
   ```
   
4. Inicialize o container docker com o banco de dados Postgresql:
   ```bash
   pnpm docker:start
   ```

5. Configure o schema do banco de dados com o prisma:
   ```bash
   pnpm db:migrate
   ```

6. Abra o navegador e acesse a documentação do swagger e teste as rotas:
   ```bash
   http://localhost:3333/docs
   ```
   

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.