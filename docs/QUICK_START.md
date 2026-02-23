# 🚀 Guia de Início Rápido

## Para testar rapidamente o sistema:

### 1. Configuração Local Rápida

```bash
# Clone e instale
git clone <url>
cd imobiliaria
npm install

# Configure o banco (PostgreSQL local)
cp .env.example .env
# Edite .env com sua string de conexão do PostgreSQL

# Setup do banco
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
```

### 2. Executar o projeto

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

### 2.1 Executar backend NestJS (repositório separado)

Veja [CRM_Imobiliario_Backend](https://github.com/Lt-lopes1994/CRM_Imobiliario_Backend) para instruções de setup.

```bash
# Clone o repositório do backend
git clone https://github.com/Lt-lopes1994/CRM_Imobiliario_Backend.git
cd CRM_Imobiliario_Backend
npm install
npm run start:dev
```

- Backend disponível em `http://localhost:4000/v1`

### 3. Testes E2E com Cypress

```bash
# Modo UI interativo (desenvolvimento)
npm run test:e2e:ui

# Modo headless (CI/CD)
npm run test:e2e

# Abrir Cypress diretamente
npm run cypress:open
```

**Nota**: O servidor Next.js (`npm run dev`) é iniciado automaticamente antes dos testes.

Veja [CYPRESS_TESTING.md](CYPRESS_TESTING.md) para documentação completa de testes.

### 4. Contas de Teste

- **Admin**: admin@crm.com / admin123
- **User**: user@crm.com / user123

### 5. Acessar

- **Site**: http://localhost:3000
- **Admin**: http://localhost:3000/admin (login como admin)

---

## 📋 Checklist para Produção (Vercel)

- [ ] Criar conta na Vercel
- [ ] Configurar banco PostgreSQL (Neon/Supabase)
- [ ] Configurar variáveis de ambiente
- [ ] Fazer deploy
- [ ] Executar migrações em produção
- [ ] Criar primeira conta admin

---

## 🔧 Comandos Úteis

```bash
# Resetar banco e recriar dados
npm run db:reset

# Apenas popular dados
npm run db:seed

# Ver banco de dados
npx prisma studio

# Gerar tipos depois de alterar schema
npx prisma generate

# Criar nova migração
npx prisma migrate dev --name nome-da-migracao

# Verificar instalação do Cypress
npx cypress verify

# Rodar Cypress com debug
npm run cypress:run -- --headed --spec "cypress/e2e/auth.cy.ts"

# Clean install (remover node_modules)
rm -r node_modules && npm install
```
