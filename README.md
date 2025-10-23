# Oticket - Sistema de Pedidos

Bem-vindo ao repositório do Oticket, um sistema completo de gerenciamento de pedidos, produtos e clientes.

Este projeto é dividido em duas partes principais:
1.  **`api-pedidos`**: O serviço de backend (API) construído com Node.js, Express, Prisma e PostgreSQL.
2.  **`dashboard-pedidos`**: O painel de administração (frontend) construído com Next.js e TypeScript.

---

## 🛠️ Tecnologias Utilizadas

* **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL, Docker
* **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Lucide React, Axios
* **Testes**: Jest (para o backend)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/en/) (v18 ou superior recomendado)
* [NPM](https://www.npmjs.com/) (geralmente vem com o Node.js)
* [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Rodando o Projeto Localmente

Para rodar o projeto completo, você precisará iniciar o Backend e o Frontend em dois terminais separados.

### 1. Backend (`api-pedidos`)

O backend é totalmente containerizado com Docker. Ele subirá a API Node.js e um banco de dados PostgreSQL.

**Atenção:** Certifique-se de que nada esteja rodando nas portas `3001` (API) e `5432` (PostgreSQL) em sua máquina.

1.  **Navegue até a pasta do backend:**
    ```bash
    cd api-pedidos
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```

3.  **Edite o arquivo `.env`:**
    Abra o arquivo `.env` e preencha as variáveis.:
    ```.env
    DB_USER=pedidos
    DB_PASSWORD=SUA_SENHA_AQUI
    DB_NAME=mini_pedidos
    DB_PORT=5432

    API_PORT=3001

    DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?schema=public"    
    ```

4.  **Suba os containers:**
    Este comando irá construir as imagens e iniciar a API e o banco de dados.
    ```bash
    docker compose up --build
    ```

O backend estará rodando em `http://localhost:3001`.

### 2. Frontend (`dashboard-pedidos`)

O frontend roda diretamente na sua máquina com Node.js.

1.  **Abra um novo terminal.**

2.  **Navegue até a pasta do frontend:**
    ```bash
    cd dashboard-pedidos
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O frontend estará disponível em `http://localhost:3000` e se conectará automaticamente à API no `localhost:3001`.

---

## 🧪 Rodando os Testes (Backend)

Os testes de unidade e integração do backend podem ser rodados com um único comando e com o Container do Docker rodando.

1.  **Navegue até a pasta do backend:**
    ```bash
    cd api-pedidos
    ```

2.  **Instale as dependências (se ainda não o fez):**
    ```bash
    npm install
    ```

3.  **Execute os testes:**
    ```bash
    npm run test
    ```

---

## 📖 Endpoints da API

A documentação completa da API está disponível via Swagger após iniciar o backend.

Acesse: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)