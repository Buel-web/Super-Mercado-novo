# 🛒 Sistema Administrativo

Sistema de gerenciamento de supermercado desenvolvido com **ReactJS**, **Node.js** e **SQLite**.

---

## 👥 Membros da Equipe

| Integrante | Matrícula |
|---|---|
| Everton Vieira | 2525050036 |
| Samuel De Souza Santos | 2525050004 |

**Professor:** Bruno Rafael Araújo Vasconcelos

---

## 📑 Sumário

- [1. Sobre o Projeto](#1-sobre-o-projeto)
- [2. Como Funciona o Sistema](#2-como-funciona-o-sistema)
  - [2.1 Arquitetura](#21-arquitetura)
  - [2.2 Fluxo de uso](#22-fluxo-de-uso)
  - [2.3 Páginas do Sistema](#23-páginas-do-sistema)
  - [2.4 Criando o primeiro usuário (admin)](#24-criando-o-primeiro-usuário-admin)
  - [2.5 Regras de Negócio](#25-regras-de-negócio)
- [3. Tecnologias Utilizadas](#3-tecnologias-utilizadas)
- [4. Instalação e Execução](#4-instalação-e-execução)
  - [4.1 Pré-requisitos](#41-pré-requisitos)
  - [4.2 Backend](#42-backend)
  - [4.3 Frontend](#43-frontend)
  - [4.4 Dependências](#44-dependências)
- [5. Repositórios e Requisitos](#5-repositórios-e-requisitos)
  - [5.1 Repositórios no GitHub](#51-repositórios-no-github)
  - [5.2 Requisitos do Sistema](#52-requisitos-do-sistema)
  - [5.2.1 Priorização de requisitos](#521-priorização-de-requisitos)
- [6. Referências Bibliográficas](#6-referências-bibliográficas)

---

## 1. Sobre o Projeto

O Sistema Administrativo é uma aplicação web desenvolvida para o gerenciamento interno de um supermercado, permitindo que funcionários controlem o cadastro de produtos, a aplicação de promoções e o cadastro de usuários do sistema.

O acesso é protegido por autenticação, garantindo que apenas funcionários devidamente cadastrados e autenticados consigam visualizar e alterar os dados.

O projeto foi construído como uma aplicação **full stack**, separando claramente as responsabilidades entre a interface (frontend) e as regras de negócio e persistência de dados (backend), que se comunicam por meio de uma API REST.

---

## 2. Como Funciona o Sistema

### 2.1 Arquitetura

O sistema é dividido em duas aplicações independentes que se comunicam via API REST:

- **Frontend:** aplicação React que o funcionário acessa pelo navegador.
- **Backend:** servidor Node.js responsável pelas regras de negócio e banco de dados.

### 2.2 Fluxo de uso

1. O funcionário acessa o sistema pelo navegador em `http://localhost:3000`.
2. Na tela de login, informa seu email e senha.
3. Após autenticação, recebe um token JWT que libera o acesso às demais páginas.
4. O funcionário pode gerenciar produtos, promoções e usuários.
5. Ao sair, o token é removido e o acesso é encerrado.

### 2.3 Páginas do Sistema

- **Login:** tela inicial onde o funcionário informa email e senha. Em caso de sucesso, o token JWT é salvo no navegador e o funcionário é redirecionado para a página de Produtos.
- **Produtos:** lista todos os produtos cadastrados (nome, preço, promoção, tipo e validade) e permite cadastrar, editar e remover produtos.
- **Promoções:** lista os produtos e permite aplicar ou remover um preço promocional de cada um.
- **Usuários:** lista os funcionários cadastrados (nome, email e CPF) e permite cadastrar, visualizar detalhes, editar e remover usuários.

> As três páginas internas (Produtos, Usuários e Promoções) compartilham uma barra de navegação com atalhos entre elas e um botão de **Sair**, responsável por encerrar a sessão.

### 2.4 Criando o primeiro usuário (admin)

Como o cadastro de usuários agora exige estar logado, é preciso existir pelo menos um usuário no banco antes do primeiro acesso. Para isso, rode o script de seed **uma única vez**, dentro da pasta `backend`:

```bash
node seed.js
```

Isso cria um usuário admin com:

- **Email:** `admin@supermercado.com`
- **Senha:** `123456`

Depois de logar com esse usuário, você pode cadastrar os demais funcionários normalmente pela tela de Usuários.

### 2.5 Regras de Negócio

- O login só é permitido com email cadastrado e senha correta; a senha informada é comparada com o hash salvo no banco (bcrypt).
- Toda rota da API, exceto a de login, exige um token JWT válido no cabeçalho da requisição (`Authorization: Bearer <token>`).
- O token JWT expira 8 horas após o login; expirado ou inválido, o acesso é negado e o sistema exige novo login.
- O cadastro de produto exige, no mínimo, nome e preço atual.
- A aplicação de promoção exige que um preço promocional seja informado.
- O cadastro de usuário exige nome, email, senha e CPF; a senha é criptografada antes de ser salva e o email deve ser único no sistema.
- As páginas internas do frontend não podem ser acessadas diretamente pela URL sem um token salvo; o funcionário é redirecionado automaticamente para o login.

---

## 3. Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | v22.x | Ambiente de execução JavaScript do servidor (backend). |
| Express | 5.x | Framework HTTP usado para criar a API REST e as rotas do backend. |
| better-sqlite3 | 12.x | Biblioteca de acesso ao banco de dados SQLite (persistência de produtos, usuários e clientes). |
| JWT | 9.x | Geração e validação do token de autenticação (login e proteção das rotas da API). |
| bcrypt | 6.x | Criptografia (hash) da senha dos usuários antes de salvar no banco. |
| cors | 2.x | Libera a comunicação entre o frontend (porta 3000) e o backend (porta 3001). |
| ReactJS | 19.x | Biblioteca usada para construir a interface (frontend) acessada pelo funcionário. |
| React Router DOM | 7.x | Controla a navegação entre as páginas (Login, Produtos, Usuários, Promoções) e a proteção de rotas. |
| Axios | 1.x | Cliente HTTP usado pelo frontend para consumir a API do backend. |

---

## 4. Instalação e Execução

### 4.1 Pré-requisitos

- Node.js v18 ou superior
- NPM (já incluído com o Node.js)
- Git

### 4.2 Backend

Dentro da pasta `backend`, execute:

```bash
npm install
node seed.js      # cria o usuário administrador inicial — rodar apenas uma vez
node server.js
```

O servidor sobe em `http://localhost:3001`.

### 4.3 Frontend

Dentro da pasta `frontend`, execute:

```bash
npm install
npm start
```

A aplicação abre automaticamente em `http://localhost:3000`.

### 4.4 Dependências

**Backend:**
- express
- better-sqlite3
- jsonwebtoken
- bcrypt
- cors

**Frontend:**
- axios
- react-router-dom

---

## 5. Repositórios e Requisitos

### 5.1 Repositórios no GitHub

- **Backend:** [Super-Mercado-novo/backend](https://github.com/Buel-web/Super-Mercado-novo/tree/main/backend)
- **Frontend:** [Super-Mercado-novo/frontend](https://github.com/Buel-web/Super-Mercado-novo/tree/main/frontend)
- **Repositório completo:** [Super-Mercado-novo](https://github.com/Buel-web/Super-Mercado-novo)

### 5.2 Requisitos do Sistema

| ID | Requisito | Prioridade | Status |
|---|---|---|---|
| RF01 | Cadastrar, listar, editar e remover produtos | Essencial | Entregue |
| RF02 | Cadastrar, listar, editar, visualizar e remover usuários | Essencial | Entregue |
| RF03 | Aplicar e remover preço promocional de um produto | Importante | Entregue |
| RF04 | Autenticar funcionário por email e senha (login) | Essencial | Entregue |
| RF05 | Gerar token JWT no login, com validade de 8 horas | Essencial | Entregue |
| RF06 | Proteger as rotas da API, exigindo token JWT válido | Essencial | Entregue |
| RF07 | Impedir acesso direto às páginas internas sem login | Importante | Entregue |
| RF08 | Encerrar sessão (logout), removendo o token salvo | Importante | Entregue |
| RF09 | Criptografar a senha do usuário antes de salvar no banco | Essencial | Entregue |
| RF10 | Cadastro de clientes do supermercado | Desejável | Entregue (backend); sem tela própria no frontend |

### 5.2.1 Priorização de requisitos

- **Micro-entrega 1 — Base do sistema** *(requisitos essenciais)*: estruturação inicial do projeto (frontend em React e backend em Node.js/Express), conexão com o banco SQLite e CRUD completo de produtos e usuários (RF01, RF02, RF09).
- **Micro-entrega 2 — Autenticação e regras de negócio** *(requisitos importantes)*: implementação da tela de login, geração do token JWT no backend, tela de Promoções e aplicação/remoção de preço promocional (RF03, RF04, RF05).
- **Micro-entrega 3 — Segurança e controle de sessão** *(reforço dos requisitos essenciais e importantes)*: criação do middleware de verificação do token JWT protegendo todas as rotas da API, proteção das rotas do frontend contra acesso direto sem login, botão de logout e script de seed para criação do primeiro usuário administrador (RF06, RF07, RF08).

Os requisitos essenciais (*Must have*) foram priorizados e entregues nas duas primeiras micro-entregas, garantindo o funcionamento básico do sistema. Os requisitos de segurança, embora também essenciais, dependiam da autenticação já estar pronta, por isso foram concluídos na última micro-entrega. O cadastro de clientes (RF10) foi implementado no backend, mas não teve prioridade para ganhar uma tela própria no frontend dentro do prazo do projeto.

---

## 6. Referências Bibliográficas

- Node.js Documentation
- Express.js Documentation
- React Documentation
- React Router Documentation
- Axios Documentation
- better-sqlite3 npm Package
- JSON Web Tokens (JWT) — jwt.io
- bcrypt npm Package
- Receita Federal do Brasil. Validação de CPF
- MDN Web Docs — JavaScript




