# 🛒 Sistema de Supermercado

Sistema de gerenciamento de supermercado desenvolvido com ReactJS, Node.js e SQLite.

## 👥 Membros da Equipe

Samuel De Souza Santos
Everton Vieira git status

## 1. Visão Geral

Sistema web para gerenciamento de supermercado, permitindo que funcionários controlem produtos, promoções e usuários através de uma interface simples e segura, com autenticação via login.

## 2. Arquitetura e Fluxo de Uso

### 2.1 Arquitetura

O sistema é dividido em duas aplicações independentes que se comunicam via API REST:

- **Frontend:** aplicação React que o funcionário acessa pelo navegador
- **Backend:** servidor Node.js responsável pelas regras de negócio e banco de dados

### 2.2 Fluxo de uso

1. O funcionário acessa o sistema pelo navegador em `http://localhost:3000`
2. Na tela de login, informa seu email e senha
3. Após autenticação, recebe um token JWT que libera o acesso às demais páginas
4. O funcionário pode gerenciar produtos, promoções e usuários
5. Ao sair, o token é removido e o acesso é encerrado

### 2.3 Segurança

- Todas as rotas de produtos, usuários e clientes exigem um token JWT válido (enviado no header `Authorization: Bearer <token>`). Só a rota de login fica aberta.
- Se o token expirar ou for inválido, o backend responde `401` e o frontend automaticamente remove o token salvo e volta pra tela de login.
- As páginas `/produtos`, `/usuarios` e `/promocoes` são protegidas no frontend: sem token salvo, o funcionário é redirecionado pro login mesmo se digitar a URL direto no navegador.

### 2.4 Criando o primeiro usuário (admin)

Como o cadastro de usuários agora exige estar logado, é preciso existir pelo menos um usuário no banco antes do primeiro acesso. Para isso, rode o script de seed uma única vez:

```
Pasta backend
node seed.js
```

Isso cria um usuário admin com:
- **Email:** admin@supermercado.com
- **Senha:** 123456

Depois de logar com esse usuário, você pode cadastrar os demais funcionários normalmente pela tela de Usuários.

## 🚀 Tecnologias Utilizadas

- **Frontend:** ReactJS
- **Backend:** Node.js + Express
- **Banco de dados:** SQLite (better-sqlite3)
- **Autenticação:** JWT (JSON Web Token)

## 📋 Funcionalidades

- Login de funcionários
- Gerenciamento de Produtos (cadastrar, editar, remover)
- Gerenciamento de Usuários (cadastrar, editar, visualizar, remover)
- Gerenciamento de Promoções (aplicar e remover desconto em produtos)

## ⚙️ Como Instalar e Rodar

### Pré-requisitos

- Node.js instalado (https://nodejs.org)

### Backend

```
Pasta backend
npm install
node seed.js      
node server.js
```

O servidor vai rodar em: http://localhost:3001

### Frontend

```
Pasta frontend
npm install
npm start
```

O sistema vai abrir em: http://localhost:3000

## 🔑 Como usar

1. Acesse http://localhost:3000
2. Faça login com email e senha cadastrados
3. Navegue pelas páginas: Produtos, Usuários e Promoções
