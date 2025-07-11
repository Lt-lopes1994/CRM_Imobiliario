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

### 3. Contas de Teste

- **Admin**: admin@crm.com / admin123
- **User**: user@crm.com / user123

### 4. Acessar

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
```
