# 🔌 Configuração de Backend - API URL

## Visão Geral

Este projeto usa exclusivamente **backend externo NestJS**.
As rotas de negócio do frontend devem usar `NEXT_PUBLIC_API_URL` + helpers de `src/lib/api.ts`.

## Configuração Rápida

### Usar Backend Externo (NestJS no Render)

```bash
# 1. Copie o .env.example
cp .env.example .env

# 2. Adicione a linha (descomente):
NEXT_PUBLIC_API_URL="https://crm-imobiliario-back.onrender.com/v1"

# 3. Reinicie o servidor
npm run dev
```

## Como Funciona

### Arquivo de Configuração: `src/lib/api.ts`

```typescript
import { getApiUrl, apiRequest } from "@/lib/api";

// ✅ Forma recomendada
const url = getApiUrl("/properties");
// "https://crm-imobiliario-back.onrender.com/v1/properties"

// Ou use o helper completo
const response = await apiRequest("/properties", {
  method: "GET",
});
```

### Exemplo de Migração

**❌ Antes (hardcoded):**

```typescript
const response = await fetch("/api/admin/dashboard");
```

**✅ Depois (configurável):**

```typescript
import { getApiUrl } from "@/lib/api";

const response = await fetch(getApiUrl("admin/dashboard"));
// OU
import { apiRequest } from "@/lib/api";

const response = await apiRequest("admin/dashboard");
```

---

## Endpoints da API

### Backend Externo (NestJS - Render)

Base URL: `https://crm-imobiliario-back.onrender.com/v1`

| Endpoint                | Método           | Descrição                    |
| ----------------------- | ---------------- | ---------------------------- |
| `/auth/login`           | POST             | Login com credenciais        |
| `/auth/register`        | POST             | Registro de novo usuário     |
| `/properties`           | GET              | Listar imóveis               |
| `/properties/:id`       | GET              | Detalhes de imóvel           |
| `/admin/dashboard`      | GET              | Estatísticas do dashboard    |
| `/admin/properties`     | GET/POST         | CRUD de imóveis (admin)      |
| `/admin/properties/:id` | GET/PATCH/DELETE | Gerenciar imóvel específico  |
| `/messages`             | POST             | Enviar mensagem de interesse |
| `/categories`           | GET              | Listar categorias            |

---

## Troubleshooting

### CORS Error no Backend Externo

Se aparecer erro de CORS:

```
Access to fetch at 'https://crm-imobiliario-back.onrender.com/v1/...' has been blocked by CORS policy
```

**Solução**: Verificar configuração CORS no backend NestJS (`main.ts`):

```typescript
app.enableCors({
  origin: ["http://localhost:3000", "https://seu-frontend.vercel.app"],
  credentials: true,
});
```

### Backend demora para responder

Render (plano gratuito) hiberna após inatividade. Primeira requisição pode demorar ~30s.

**Solução**: Implementar warm-up endpoint no frontend:

```typescript
// Fazer requisição de aquecimento ao carregar app
useEffect(() => {
  fetch(getApiUrl("health"), { method: "GET" });
}, []);
```

### Variável de ambiente não reconhecida

Variáveis `NEXT_PUBLIC_*` só são lidas no **build time**.

**Solução**: Após alterar `.env`, reinicie o servidor:

```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

---

## Arquivos Afetados

Arquivos migrados para usar `getApiUrl()`/`apiRequest()`:

- [x] `src/lib/api.ts` (criado)
- [x] `src/app/admin/page.tsx`
- [x] `src/app/admin/properties/page.tsx`
- [x] `src/app/admin/properties/new/page.tsx`
- [x] `src/app/admin/properties/[id]/edit/page.tsx`
- [x] `src/app/register/page.tsx`
- [x] `src/app/properties/[id]/page.tsx`
- [x] `src/components/property-grid.tsx`

---

## Status da Configuração

Verifique qual backend está sendo usado:

```typescript
import { getApiInfo } from "@/lib/api";

console.log(getApiInfo());
// {
//   baseUrl: "https://crm-imobiliario-back.onrender.com/v1",
//   isExternal: true,
//   mode: "NestJS Backend"
// }
```

---

## Exemplo Completo de Migração

**Arquivo**: `src/app/admin/page.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api"; // ✅ Adicionar import

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(...);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ❌ ANTES:
      // const response = await fetch("/api/admin/dashboard");

      // ✅ DEPOIS:
      const response = await fetch(getApiUrl("admin/dashboard"));

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  return (...);
}
```

---

## Próximos Passos

1. ✅ Configurar `.env` com `NEXT_PUBLIC_API_URL`
2. ✅ Migrar componentes para usar `getApiUrl()`/`apiRequest()`
3. ⏳ Testar todas as funcionalidades com backend externo
4. ⏳ Documentar diferenças de comportamento (se houver)
5. ⏳ Remover/arquivar rotas legadas de `src/app/api` (exceto autenticação, se ainda necessária)

---

**Última atualização**: 24 de fevereiro de 2026  
**Backend URL**: https://crm-imobiliario-back.onrender.com/v1  
**Status**: 🟢 Frontend apontando para backend NestJS
