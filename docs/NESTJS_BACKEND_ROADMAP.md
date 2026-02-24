# Roadmap Backend NestJS (Robusto e Escalável)

## Objetivo

Evoluir do backend atual em Next.js API Routes para NestJS com arquitetura modular, escalável e preparada para crescimento de equipe e carga.

## Estratégia de migração (sem quebrar o produto)

1. **Fase 1 - Frontend estabilizado (atual)**
   - Corrigir lacunas de UX/rotas críticas do painel e autenticação.
   - Garantir lint/build limpos e fluxo principal funcionando.
2. **Fase 2 - NestJS em paralelo (strangler pattern)**
   - Criar serviço NestJS separado (`apps/api`) consumindo o mesmo PostgreSQL/Prisma.
   - Expor rotas v1 equivalentes às atuais (`/properties`, `/messages`, `/admin/*`).
   - Frontend passa a consumir NestJS por `NEXT_PUBLIC_API_URL` gradualmente.
3. **Fase 3 - Migração total e hardening**
   - Remover API Routes legadas.
   - Ativar observabilidade, rate limit, cache, filas e testes completos.

## Arquitetura alvo NestJS

- `AuthModule` (JWT, refresh token, RBAC)
- `UsersModule`
- `PropertiesModule`
- `CategoriesModule`
- `MessagesModule`
- `AdminModule` (dashboard e métricas)
- `FilesModule` (upload)
- `HealthModule` (readiness/liveness)

### Camadas

- `Controller` -> entrada HTTP + validação
- `Service` -> regra de negócio
- `Repository`/`PrismaService` -> persistência
- `DTO + class-validator` -> contratos
- `Guards` -> Auth e autorização por perfil
- `Interceptors/Filters` -> logging, tratamento de erro e padronização de resposta

## Requisitos de robustez

- Versionamento de API (`/v1`)
- Validação global (`ValidationPipe` com whitelist/forbidNonWhitelisted)
- Tratamento global de exceções
- Rate limiting e CORS controlado
- Logs estruturados (pino)
- Observabilidade (OpenTelemetry + health checks)
- Testes unitários + e2e (Jest + Supertest)

## Modelo de dados

- Manter Prisma inicialmente para reduzir risco de migração.
- Em seguida avaliar:
  - Continuar com Prisma no NestJS (mais rápido para entrega)
  - Ou migrar para TypeORM/Drizzle (somente se houver necessidade concreta)

## Ordem de implementação sugerida (sprints)

1. **Sprint 1**
   - Bootstrap NestJS, config, PrismaModule, AuthModule e UsersModule.
   - Endpoints de autenticação e perfil.
2. **Sprint 2**
   - Properties/Categories CRUD completo com paginação, filtros e ordenação.
3. **Sprint 3**
   - Messages + Admin dashboard (métricas e recentes).
4. **Sprint 4**
   - Upload de imagens, cache, fila de tarefas, testes e observabilidade.

## Contratos iniciais de API (v1)

- `POST /v1/auth/login`
- `POST /v1/auth/register`
- `GET /v1/properties`
- `GET /v1/properties/:id`
- `POST /v1/messages`
- `GET /v1/admin/dashboard`
- `GET /v1/admin/properties`
- `POST /v1/admin/properties`
- `PATCH /v1/admin/properties/:id`
- `DELETE /v1/admin/properties/:id`

## Status atual (23/fev/2026)

✅ **Frontend lapidado e estável**

- Dashboard admin com dados reais (imóveis/mensagens recentes)
- Rota de recuperação de senha criada
- Tela de edição de imóvel funcional
- Lint e build 100% limpos

✅ **NestJS scaffolded e pronto para evolução**

- `apps/api` criado com módulos de domínio (auth, users, properties, categories, messages, admin, prisma)
- ConfigModule global, ValidationPipe, CORS e versioning (`/v1`)
- PrismaService centralizado para acesso ao banco
- Health-check endpoint ativo
- Build validado e pronto

## Sprint 1 (Próximas 2-3 sessões)

- Criar PrismaModule completo com migrations espelhadas do front
- Implementar AuthModule com JWT e credenciais
- Criar DTOs e guards de autorização (RBAC)
- Endpoints: `/v1/auth/login`, `/v1/auth/register`, `/v1/auth/profile`
- Validar com testes unitários básicos

## Sprint 2

- Properties CRUD completo no NestJS
- Categoria, filtros e paginação
- Conectar frontend com nova API via `NEXT_PUBLIC_API_URL=http://localhost:4000`
- Validar fluxos end-to-end

## Como executar agora

```bash
# Frontend (Next.js)
npm run dev

# Backend (NestJS) - em outro terminal
npm run api:dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000/v1
