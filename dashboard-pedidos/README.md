# 🎫 Oticket - Sistema de Gerenciamento

Sistema completo de gerenciamento de clientes, produtos e pedidos desenvolvido com Next.js 14, TypeScript e TailwindCSS.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [API Endpoints](#api-endpoints)
- [Deploy](#deploy)

---

## 🎯 Sobre o Projeto

O Oticket é um sistema web para gerenciamento de vendas de ingressos, permitindo o cadastro e controle de clientes, produtos e pedidos de forma intuitiva e responsiva.

### ✨ Diferenciais

- ✅ Interface moderna e responsiva
- ✅ Componentização organizada
- ✅ TypeScript para type safety
- ✅ Loading states e feedback visual
- ✅ Validação de formulários
- ✅ Integração completa com API
- ✅ Docker Compose configurado
- ✅ Código limpo e documentado

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Axios** - Requisições HTTP
- **Lucide React** - Ícones

### Backend (opcional)
- **Node.js** - Runtime
- **Express** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração

---

## 📁 Estrutura do Projeto

```
oticket/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Página principal do dashboard
│   │   ├── login/
│   │   │   └── page.tsx          # Página de login
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx       # Menu lateral
│   │   │   ├── SidebarButton.tsx
│   │   │   └── LogoutSidebarButton.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── PageHeader.tsx    # Cabeçalho de páginas
│   │   │   ├── SearchBar.tsx     # Barra de pesquisa
│   │   │   ├── StatCard.tsx      # Cards de estatística
│   │   │   ├── StatusBadge.tsx   # Badge de status
│   │   │   ├── Table.tsx         # Tabela reutilizável
│   │   │   ├── Modal.tsx         # Modal genérico
│   │   │   ├── Input.tsx         # Input customizado
│   │   │   ├── Select.tsx        # Select dropdown
│   │   │   ├── Toast.tsx         # Notificações
│   │   │   └── EmptyState.tsx    # Estado vazio
│   │   │
│   │   └── pages/
│   │       ├── DashboardHome.tsx # Dashboard principal
│   │       ├── ClientesPage.tsx  # Página de clientes
│   │       ├── ProdutosPage.tsx  # Página de produtos
│   │       └── PedidosPage.tsx   # Página de pedidos
│   │
│   ├── services/
│   │   ├── clienteService.ts     # Serviço de clientes
│   │   ├── produtoService.ts     # Serviço de produtos
│   │   └── pedidoService.ts      # Serviço de pedidos
│   │
│   ├── lib/
│   │   └── api.ts                # Configuração do Axios
│   │
│   └── types/
│       └── index.ts              # Tipos TypeScript
│
├── public/
│   └── logo.png
│
├── .env.local                    # Variáveis de ambiente
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── docker-compose.yml
```

---

## 💻 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/oticket.git
cd oticket
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Execute o