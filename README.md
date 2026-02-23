# 🏢 CRM Imobiliário

> **Sistema de gerenciamento de imóveis moderno, escalável e pronto para produção**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Lt-lopes1994/CRM_Imobiliario/actions)
[![Tests](https://img.shields.io/badge/tests-50%2B-blue)](./CYPRESS_TESTING.md)
[![E2E](https://img.shields.io/badge/E2E-cypress-brightgreen)](./CYPRESS_TESTING.md)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

---

## 📖 Índice

- [Início Rápido](#-início-rápido)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Testes E2E](#-testes-e2e)
- [Deploy](#-deploy)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)

---

## 🚀 Início Rápido

### Requisitos
- Node.js 20+
- PostgreSQL 15+ (ou Neon)
- npm ou yarn

### Setup Local em 3 Passos

```bash
# 1️⃣ Clone e instale
git clone https://github.com/Lt-lopes1994/CRM_Imobiliario.git
cd CRM_Imobiliario
npm install

# 2️⃣ Configure banco de dados
cp .env.example .env.local
# Edite .env.local com sua DATABASE_URL

# 3️⃣ Inicie o servidor
npx prisma migrate dev
npm run db:seed
npm run dev
```

✅ Acesse `http://localhost:3000`

#### Contas de Teste
```
👤 Admin:  admin@crm.com / admin123
👤 User:   user@crm.com  / user123
```

---

## ✨ Funcionalidades

### 👥 Para Usuários

- 🏠 **Catálogo de Imóveis** - Explorar propriedades com filtros avançados
- 🔍 **Busca Inteligente** - Por localização, tipo, preço
- 💬 **Sistema de Mensagens** - Demonstrar interesse em imóveis
- 📱 **Interface Responsiva** - Funciona em desktop, tablet e mobile
- ⭐ **Favoritos** - Salvar imóveis preferidos (futuro)

### 🛠️ Para Administradores

- 📊 **Dashboard em Tempo Real** - Estatísticas de imóveis, usuários, receita
- 🏘️ **Gerenciamento Completo** - Criar, editar, deletar imóveis
- 📸 **Upload de Imagens** - Múltiplas imagens por imóvel com UploadThing
- 👥 **Controle de Usuários** - Gerenciar permissões e roles
- 💌 **Gerenciador de Mensagens** - Visualizar interesse dos clientes
- 📈 **Relatórios Analytics** - Desempenho e métricas (em desenvolvimento)

### 🔐 Segurança

- ✅ Autenticação JWT via NextAuth.js
- ✅ Hashing de senhas com bcrypt
- ✅ Variáveis de ambiente seguras
- ✅ Validação de dados com Zod
- ✅ Roles e permissões (Admin/User)

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Next.js | 15.3.8 | Framework React full-stack |
| React | 19.0.0 | UI Components |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| React Hook Form | 7.60 | Gerenciamento de forms |
| Zod | 4.0.5 | Validação de schemas |

### Backend
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| NextAuth.js | 4.24.11 | Autenticação |
| Prisma ORM | 6.11.1 | Database client |
| PostgreSQL | 15 | Banco de dados |
| Neon | - | Database cloud |

### Testes & DevOps
| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| Cypress | 15.10.0 | E2E testing |
| Allure Report | 2.x | Test reporting |
| GitHub Actions | - | CI/CD |
| ESLint | 9 | Code linting |

### Hospedagem
```
Frontend:  Vercel (Next.js otimizado)
Backend:   NestJS (repositório separado)
Database:  Neon / Supabase
CDN:       Vercel Edge Network
```

---

## 🏗️ Arquitetura

### Estrutura de Repositórios

```
📦 CRM_Imobiliario (Frontend)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Dashboard admin
│   │   ├── properties/         # Catálogo de imóveis
│   │   ├── auth/               # Login/Register/Recuperação
│   │   ├── api/                # API Routes (deprecated, migrar para NestJS)
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components reutilizáveis
│   ├── lib/                    # Utilitários e configurações
│   └── types/                  # TypeScript definitions
├── prisma/
│   └── schema.prisma           # Database schema
└── cypress/                    # E2E tests + fixtures

📦 CRM_Imobiliario_Backend (Separado)
└── NestJS 11 + Prisma (em desenvolvimento)
   Veja: https://github.com/Lt-lopes1994/CRM_Imobiliario_Backend
```

### Fluxo de Dados

```
┌───────────────────────────────────────┐
│  Next.js Frontend (Vercel, porta 3000) │
│  ├── Pages (SSR)                       │
│  ├── Components (Client)               │
│  └── API Routes (transitório)          │
└──────────────┬──────────────────────────┘
               │ HTTP/REST
               ▼
┌─────────────────────────────────────────┐
│  NestJS Backend (Railway, porta 4000)   │
│  ├── Auth Module                        │
│  ├── Properties Module                  │
│  ├── Users Module                       │
│  └── Prisma Service                     │
└──────────────┬──────────────────────────┘
               │ SQL
               ▼
┌─────────────────────────────────────────┐
│  PostgreSQL (Neon)                      │
│  └── Shared Schema                      │
└─────────────────────────────────────────┘
```

### Migrations Strategy
1. ✅ **Fase Atual**: Frontend completo, Next.js API Routes
2. ⏳ **Sprint 1-2**: Backend NestJS em paralelo
3. ⏳ **Sprint 3**: Frontend redireciona para NestJS
4. ⏳ **Sprint 4**: Remove Next.js API Routes

---

## 🧪 Testes E2E

### Setup

```bash
# Instalar dependências (já incluído)
npm install

# Testes em modo UI (desenvolvimento)
npm run test:e2e:ui

# Testes em modo headless (CI/CD)
npm run test:e2e

# Relatórios com Allure
npm run test:e2e:allure
npm run test:allure:report
```

### Coverage

```
✅ 50+ testes
├── Auth (11)          - Login, Register, Recuperação
├── Home (7)           - Página inicial, navegação
├── Properties (4)     - Catálogo, filtros
├── Admin (15+)        - Dashboard, CRUD
└── Upload (12+)       - Imagens, validações
```

### Estrutura de Testes

```
cypress/
├── e2e/                    # Testes E2E
│   ├── auth.cy.ts
│   ├── home.cy.ts
│   ├── properties.cy.ts
│   ├── admin.cy.ts         # ✨ Admin Dashboard
│   └── property-upload.cy.ts # ✨ Upload de Imagens
├── fixtures/               # Dados de teste
│   ├── users.json
│   └── properties.json
└── support/                # Helpers
    ├── commands.ts         # cy.login(), cy.register()
    └── e2e.ts             # Setup global
```

### CI/CD Automático

```yaml
📌 Acionado em: push ou pull_request para main/develop

✅ Node.js 20
✅ PostgreSQL test
✅ npm ci
✅ Migrações
✅ 50+ testes E2E
✅ Allure Report
✅ Upload artifacts
✅ Comentário em PR
```

**Veja**: [.github/workflows/e2e-tests.yml](.github/workflows/e2e-tests.yml)

---

## 🚀 Deploy

### Deploy na Vercel (Frontend)

#### Pré-requisito
```bash
# 1. Criar conta em https://vercel.com
# 2. Conectar repositório GitHub
# 3. Adicionar variáveis de ambiente
```

#### Variáveis Necessárias
```env
DATABASE_URL=postgresql://user:password@host/db
NEXTAUTH_SECRET=seu-secret-aleatorio-aqui
NEXTAUTH_URL=https://seu-dominio.com
UPLOADTHING_SECRET=seu-uploadthing-secret
UPLOADTHING_APP_ID=seu-app-id
```

#### Deploy (Automático)
```bash
# 1. Push para main
git push origin main

# 2. Vercel detecta mudança
# 3. Build automático
# 4. Deploy em produção
# ✅ Pronto em ~2 minutos
```

#### Verificações Pré-Deploy
```bash
npm run build    # Compilar com sucesso
npm run lint     # 0 warnings/errors
npm run test:e2e # Testes passando
```

### Backend NestJS (Separado)

**Veja**: [CRM_Imobiliario_Backend](https://github.com/Lt-lopes1994/CRM_Imobiliario_Backend)

Deploy recomendado:
- 🚀 Railway.app (simples)
- 🚀 Render (alternativa)
- 🚀 DigitalOcean (mais controle)

---

## 📋 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar servidor
npm run dev

# Cypress (UI)
npm run test:e2e:ui

# Banco de dados
npx prisma studio       # Visualizar dados
npm run db:seed        # Popular dados
npm run db:reset       # Resetar tudo

# Linter
npm run lint
```

### Build & Deploy

```bash
# Build para produção
npm run build
npm start

# Verificações pré-deploy
npm run lint
npm run test:e2e
npm run build
```

### Prisma

```bash
# Criar migração
npx prisma migrate dev --name nome-da-migracao

# Syncar schema (desenvolvimento)
npx prisma db push

# Gerar tipos
npx prisma generate

# Ver logs
npx prisma db execute --stdin
```

---

## 🗺️ Roadmap

### ✅ Fase 1: Frontend (Completo - 23 fev 2026)
- ✅ Pages (Home, Login, Register, Admin, Properties)
- ✅ Components (Header, Footer, Cards, Forms)
- ✅ Autenticação (NextAuth.js JWT)
- ✅ Dashboard com dados reais
- ✅ CRUD de imóveis (create, read, update, delete)
- ✅ Upload de imagens (UploadThing)
- ✅ Testes E2E (50+ testes)
- ✅ CI/CD (GitHub Actions)

### 📦 Fase 2: Backend NestJS (Em Paralelo)
- ⏳ Estrutura de módulos escalável
- ⏳ AuthModule com JWT
- ⏳ PropertiesModule CRUD
- ⏳ UsersModule
- ⏳ CategoriesModule
- ⏳ MessagesModule
- ⏳ AdminModule com Dashboard
- ⏳ Testes unitários + E2E
- ⏳ Documentação Swagger

### 🔄 Fase 3: Integração (Q1 2026)
- ⏳ Frontend redireciona para NestJS API
- ⏳ Remover Next.js API Routes
- ⏳ Login integrado com NestJS
- ⏳ Sincronizar autenticação

### 🎯 Fase 4: Features Avançadas (Q2 2026)
- ⏳ Favoritos de imóveis
- ⏳ Sistema de reviews
- ⏳ Notificações email
- ⏳ Agendamento de visitas
- ⏳ Relatórios PDF
- ⏳ Mapa interativo (Google Maps)
- ⏳ Chat em tempo real (WebSocket)

### 🚀 Fase 5: Performance & Scale (Q3 2026)
- ⏳ Redis para cache
- ⏳ Message Queue (Bull/RabbitMQ)
- ⏳ Search engine (Elasticsearch)
- ⏳ CDN para imagens otimizadas
- ⏳ PWA (Progressive Web App)
- ⏳ Analytics (Google Analytics / Mixpanel)

---

## 📚 Documentação

| Tipo | Arquivo | Descrição |
|------|---------|-----------|
| 🚀 Início Rápido | [docs/QUICK_START.md](./docs/QUICK_START.md) | Setup local em 3 passos |
| 🧪 Testes | [docs/TESTING_GUIDE.md](./docs/TESTING_GUIDE.md) | Guia prático de testes |
| 📚 Referência | [docs/CYPRESS_TESTING.md](./docs/CYPRESS_TESTING.md) | Documentação técnica Cypress |
| 🚢 Deploy | [docs/DEPLOY_GUIDE.md](./docs/DEPLOY_GUIDE.md) | Deploy para Vercel |
| 📊 Status | [docs/STATUS.md](./docs/STATUS.md) | Status atual do projeto |
| 🔧 Backend | [docs/NESTJS_BACKEND_ROADMAP.md](./docs/NESTJS_BACKEND_ROADMAP.md) | Plano NestJS |
| 📖 Índice | [docs/INDEX.md](./docs/INDEX.md) | **Índice completo de documentação →** |

---

## 🤝 Contribuir

### Passos para Contribuir

1. **Fork** o repositório
```bash
# Clique em "Fork" no GitHub
```

2. **Clone** seu fork
```bash
git clone https://github.com/seu-usuario/CRM_Imobiliario.git
cd CRM_Imobiliario
```

3. **Crie uma branch** para sua feature
```bash
git checkout -b feature/sua-funcionalidade
```

4. **Faça as mudanças** e teste
```bash
npm run lint
npm run test:e2e:ui
npm run build
```

5. **Commit** com mensagem clara
```bash
git commit -m "feat: adiciona nova funcionalidade X"
```

6. **Push** para seu fork
```bash
git push origin feature/sua-funcionalidade
```

7. **Abra um Pull Request** explicando as mudanças
```
Título: feat: descrição breve
Descrição: expliquem o que foi feito e por quê
```

### Convenção de Commits

```
feat:     nova feature
fix:      correção de bug
docs:     documentação
style:    formatação, sem mudança lógica
refactor: refatoração de código
test:     testes
chore:    dependências, config
```

### Padrões de Código

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Componentes reutilizáveis
- ✅ Testes para novos features
- ✅ Documentação em comentários

---

## 🐛 Suporte

### Issues
- 🐛 [Reportar Bug](https://github.com/Lt-lopes1994/CRM_Imobiliario/issues/new?labels=bug)
- 💡 [Sugerir Feature](https://github.com/Lt-lopes1994/CRM_Imobiliario/issues/new?labels=enhancement)
- 📚 [Fazer Pergunta](https://github.com/Lt-lopes1994/CRM_Imobiliario/discussions)

### Recursos
- 📖 [Documentação Completa](./CYPRESS_TESTING.md)
- 🚀 [Quick Start](./QUICK_START.md)
- 🧪 [Guia de Testes](./TESTING_GUIDE.md)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Bruno Lopes**
- GitHub: [@Lt-lopes1994](https://github.com/Lt-lopes1994)
- Email: seu-email@example.com

---

## 🙏 Agradecimentos

- Next.js team por framework excelente
- Prisma pela melhor ORM TypeScript
- Vercel pela hospedagem rápida
- Comunidade open-source

---

## 📊 Status do Projeto

```
┌──────────────────────────────────────┐
│ 📈 Production Ready: ✅ SIM          │
│ 🧪 Test Coverage: 50+ testes       │
│ 📝 Documentação: Completa           │
│ 🚀 CI/CD: GitHub Actions OK         │
│ 📱 Responsivo: ✅ Mobile-first      │
│ 🔐 Segurança: JWT + bcrypt          │
│ ⚡ Performance: Otimizado Vercel    │
└──────────────────────────────────────┘
```

---

<div align="center">

### ⭐ Se este projeto foi útil, deixe uma estrela!

[![GitHub stars](https://img.shields.io/github/stars/Lt-lopes1994/CRM_Imobiliario?style=social)](https://github.com/Lt-lopes1994/CRM_Imobiliario)

**Desenvolvido com ❤️ usando Next.js 15 e TypeScript**

[📧 Contato](mailto:seu-email@example.com) • [🐛 Issues](https://github.com/Lt-lopes1994/CRM_Imobiliario/issues) • [💬 Discussions](https://github.com/Lt-lopes1994/CRM_Imobiliario/discussions)

</div>
