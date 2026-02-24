# 🧪 Guia Completo de Testes - CRM Imobiliário

## 📋 Índice
1. [Início Rápido](#início-rápido)
2. [Estrutura de Testes](#estrutura-de-testes)
3. [Executar Testes](#executar-testes)
4. [Fixtures e Dados de Teste](#fixtures-e-dados-de-teste)
5. [Allure Report](#allure-report)
6. [GitHub Actions CI/CD](#github-actions-cicd)
7. [Boas Práticas](#boas-práticas)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Início Rápido

### Primeiro acesso

```bash
# 1. Clonar e instalar
git clone <seu-repo>
cd CRM_Imobiliario
npm install

# 2. Setup do banco
npx prisma migrate dev
npm run db:seed

# 3. Rodar testes (interface visual)
npm run test:e2e:ui
```

**O que acontece:**
- ✅ Servidor Next.js inicia em `http://localhost:3000`
- ✅ Cypress abre com interface visual
- ✅ Você vê os testes rodando no navegador
- ✅ Pode pausar, debugar e inspecionar elementos

---

## 🗂️ Estrutura de Testes

### Arquivos de Teste

```
cypress/e2e/
├── auth.cy.ts              # ✅ 11 testes - Autenticação
├── home.cy.ts              # ✅ 7 testes - Página inicial
├── properties.cy.ts        # ✅ 4 testes - Navegação de imóveis
├── admin.cy.ts             # ✅ 15+ testes - Painel admin
└── property-upload.cy.ts   # ✅ 12+ testes - Upload de imagens
```

**Total: 50+ testes** cobrindo fluxos críticos

### Fixtures (Dados de Teste)

```
cypress/fixtures/
├── users.json              # Usuários de teste
└── properties.json         # Imóveis de exemplo
```

**Vantagens:**
- ✅ Dados centralizados
- ✅ Fácil de atualizar
- ✅ Reutilizáveis em múltiplos testes
- ✅ Mantém testes limpos

### Suporte Cypress

```
cypress/support/
├── commands.ts             # Comandos customizados (login, register)
├── e2e.ts                 # Setup global + Allure
└── index.d.ts             # Tipagem TypeScript
```

---

## 🎯 Executar Testes

### Opção 1: Interface Visual (Desenvolvimento)
```bash
npm run test:e2e:ui
```
**Melhor para:**
- Desenvolver novos testes
- Debugar falhas
- Entender interações
- Desenvolvimento interativo

### Opção 2: Headless (CI/CD)
```bash
npm run test:e2e
```
**Melhor para:**
- Validação automática
- Pull requests
- Pipelines de CI/CD
- Testes rápidos

### Opção 3: Com Relatório Allure
```bash
npm run test:e2e:allure
npm run test:allure:report
```
**Melhor para:**
- Análise detalhada
- Histórico de falhas
- Rastreabilidade
- Stakeholders

### Opção 4: Teste Específico
```bash
# Rodar apenas testes de auth
npm run cypress:run -- --spec "cypress/e2e/auth.cy.ts"

# Rodar apenas 1 teste
npm run cypress:run -- --spec "cypress/e2e/auth.cy.ts" --grep "should display login form"

# Com modo visual
npm run cypress:open
# Depois selecione o arquivo específico
```

### Opção 5: Modo Debug
```bash
npm run cypress:run -- --headed --reporter spec
```
**Com saída detalhada:**
```
✓ should display login button when not authenticated
✓ should navigate to login page when clicking login
✓ should display hero section
✓ should display property grid
✓ should display footer
✓ (5 passed)
```

---

## 📦 Fixtures e Dados de Teste

### Como Usar Fixtures

#### Exemplo 1: Login com fixture
```typescript
describe("Login", () => {
  it("should login with fixture data", () => {
    cy.fixture("users.json").then((users) => {
      cy.login(users.admin.email, users.admin.password);
    });
  });
});
```

#### Exemplo 2: Criar imóvel com fixture
```typescript
describe("Create Property", () => {
  it("should create property from fixture", () => {
    cy.fixture("properties.json").then((props) => {
      cy.visit("/admin/properties/new");
      
      const property = props.apartment;
      cy.get('input[name="title"]').type(property.title);
      cy.get('input[name="price"]').type(property.price);
      cy.get("button[type='submit']").click();
    });
  });
});
```

### Adicionar Novas Fixtures

1. **Criar arquivo** em `cypress/fixtures/`
2. **Adicionar dados JSON**
```json
{
  "scenario1": { "data": "value" },
  "scenario2": { "data": "value" }
}
```
3. **Usar em testes**
```typescript
cy.fixture("seu-arquivo.json").then((data) => {
  // usar data
});
```

---

## 📊 Allure Report

### Gerar Relatório

```bash
# 1. Rodar testes com coleta de dados Allure
npm run test:e2e:allure

# 2. Abrir relatório no navegador
npm run test:allure:report
```

### O que ele mostra

```
📊 DASHBOARD
├── 50 testes no total
├── 48 passados ✅
├── 2 falhados ❌
├── Tempo total: 2min 34s
└── Taxa de sucesso: 96%

📈 HISTÓRICO
├── Build #1: 50/50 ✅
├── Build #2: 47/50 ⚠️
├── Build #3: 50/50 ✅
└── Tendência: Melhoria constante

🔗 RASTREABILIDADE
├── teste → requisito
├── teste → história de usuário
└── teste → functionality

📹 ANEXOS
├── Screenshots de falhas
├── Vídeos dos testes
└── Logs detalhados
```

### Integração com CI/CD

Allure é executado automaticamente em cada push/PR:
```yaml
GitHub Actions
  ↓
E2E Tests
  ↓
Gerar Allure
  ↓
Upload Artifacts
  ↓
Você visualiza no GitHub!
```

---

## 🚀 GitHub Actions CI/CD

### Como Funciona

#### 1. **Push ou PR criado**
```
→ GitHub dispara workflow
```

#### 2. **Testes rodam em ubuntu-latest**
```
✅ Node.js 20.x instalado
✅ Dependências instaladas (npm ci)
✅ Banco PostgreSQL simulado
✅ Migrações aplicadas
✅ Testes executados
```

#### 3. **Relatórios gerados**
```
✅ Allure Report (30 dias)
✅ Screenshots (7 dias)
✅ Vídeos (7 dias)
✅ Comentário em PR com resultado
```

### Variáveis de Ambiente (GitHub Secrets)

Para deploy automático Vercel, adicione em **Settings > Secrets and variables > Actions**:
```
VERCEL_TOKEN        → seu token Vercel
VERCEL_ORG_ID       → ID da organização
VERCEL_PROJECT_ID   → ID do projeto
```

### Ver Resultados

1. **No GitHub**
   - Vá para seu PR
   - Role para "Checks"
   - Veja "E2E Tests CI/CD"

2. **Baixar Artefatos**
   - Clique na seção "Runs" no Actions
   - Vá para detalhes do run
   - Baixe "allure-report", "cypress-videos", etc

3. **Em Tempo Real**
   - Clique no job em execução
   - Veja logs ao vivo

### Exemplo de Workflow
```
PR #123 criada
  ↓
✅ Lint check
  ↓
✅ Build check
  ↓
✅ E2E Tests (31 testes em 2min)
  ↓
✅ Allure Report gerado
  ↓
💬 Comentário automático: "Tudo OK! 🎉"
  ↓
✅ Pronto para merge!
```

---

## 🎓 Boas Práticas

### Estrutura de Teste Ideal

```typescript
describe("Recurso/Funcionalidade", () => {
  // Setup comum
  beforeEach(() => {
    cy.visit("/pagina");
  });

  // Grupo de testes relacionados
  describe("Cenário específico", () => {
    it("ação 1", () => {
      // AAA Pattern
      // Arrange: preparar dados
      // Act: executar ação
      // Assert: verificar resultado
      cy.get(".button").click();
      cy.get(".result").should("be.visible");
    });
  });
});
```

### Seletores Recomendados

**✅ Bom:**
```typescript
cy.get('[data-testid="login-button"]').click();
cy.get('input[name="email"]').type("e@mail.com");
cy.get('[aria-label="Close"]').click();
```

**❌ Evitar:**
```typescript
cy.get("button").click();           // Muito genérico!
cy.get(".btn.primary.lg").click();  // Frágil a CSS changes
cy.contains("Click me").click();    // Quebra com mudanças de texto
```

### Padrão AAA (Arrange-Act-Assert)

```typescript
it("should add item to cart", () => {
  // 1. ARRANGE - Preparar
  cy.fixture("products.json").then((products) => {
    const product = products[0];
    
    // 2. ACT - Executar
    cy.visit("/products");
    cy.get(`[data-product-id="${product.id}"]`).click();
    cy.get('[data-testid="add-to-cart"]').click();
    
    // 3. ASSERT - Verificar
    cy.get(".cart-count").should("contain", "1");
    cy.contains(`${product.name} adicionado`).should("be.visible");
  });
});
```

### Evitar Timeouts

**❌ Evitar:**
```typescript
cy.wait(5000); // Aguardar fixo é ruim!
```

**✅ Melhor:**
```typescript
cy.get(".loading").should("not.exist");     // Espero não existir
cy.get(".data").should("contain", "texto");  // Espero conteúdo
cy.intercept("/api/data").as("getData");     // Espero requisição
cy.wait("@getData");
```

---

## 🚨 Troubleshooting

### "Port 3000 already in use"
```bash
# Windows - encontrar e matar processo
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### "Cannot find element"
```typescript
// Use debug para pausar
cy.get(".selector").debug();

// Ou pause manualmente
cy.pause();

// Ou aumente timeout
cy.get(".slow-element", { timeout: 20000 }).should("exist");
```

### "cy.login is not a function"
- Verifique se `cypress/support/commands.ts` existe
- Verifique se `e2e.ts` importa `"./commands"`
- Rode `npm run cypress:verify`

### Testes falham só no CI

**Causas comuns:**
- Timing (use cy.intercept ao invés de cy.wait)
- Variáveis de ambiente (DATABASE_URL em .env)
- Portas em uso (CI usa porta diferente)
- Ordem de testes (teste não é isolado)

**Solução:**
```bash
# Rodar localmente com mesmas vars de env
DATABASE_URL="..." npm run test:e2e
```

### Screenshot/Video não salvo

Verifique `.gitignore`:
```
# ✅ Adicionado automaticamente:
cypress/screenshots
cypress/videos
cypress/downloads
```

Se ainda tiver problema:
```bash
npx cypress run --record  # Salvar cloud
```

---

## 📞 Suporte e Recursos

- **Documentação Completa**: [CYPRESS_TESTING.md](CYPRESS_TESTING.md)
- **Guide de Início**: [QUICK_START.md](QUICK_START.md)
- **Docs Cypress**: https://docs.cypress.io
- **Allure Report**: https://docs.qameta.io/allure

---

**Última atualização**: 23 de fevereiro de 2026  
**Versão**: 2.0.0 (Com todas as melhorias!)  
**Status**: 🟢 Pronto para produção
