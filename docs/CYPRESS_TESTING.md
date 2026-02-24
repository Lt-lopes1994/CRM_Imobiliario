# 🧪 Testes E2E com Cypress - CRM Imobiliário

## 📋 Visão Geral

Este projeto utiliza Cypress 15.10.0 para testes E2E (End-to-End), garantindo que as funcionalidades críticas da aplicação funcionem conforme esperado em um navegador real.

## 🚀 Iniciando Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar testes em modo UI (desenvolvimento)
```bash
npm run test:e2e:ui
```

Isso iniciará:
- Servidor Next.js em `http://localhost:3000`
- Cypress Test Runner em modo interativo

### 3. Executar testes em modo headless (CI/CD)
```bash
npm run test:e2e
```

### 4. Executar testes com relatório Allure
```bash
npm run test:e2e:allure
npm run test:allure:report  # Visualizar relatório
```

### 5. Abrir Cypress manualmente
```bash
npm run cypress:open
```

## 📁 Estrutura de Testes

```
cypress/
├── e2e/
│   ├── auth.cy.ts              # Testes de autenticação (11 testes)
│   ├── home.cy.ts              # Testes da página inicial (7 testes)
│   ├── properties.cy.ts         # Testes de navegação de imóveis (4 testes)
│   ├── admin.cy.ts             # Testes do painel admin (15+ testes) ✨ NOVO
│   └── property-upload.cy.ts   # Testes de upload de imagens (12+ testes) ✨ NOVO
├── support/
│   ├── commands.ts             # Comandos customizados Cypress
│   ├── e2e.ts                 # Setup global + Allure integration
│   └── index.d.ts             # Tipagem TypeScript (gerado)
└── fixtures/
    ├── users.json             # Dados de teste de usuários ✨ NOVO
    └── properties.json        # Dados de teste de imóveis ✨ NOVO
```

## 🎯 Testes Implementados

### ✅ auth.cy.ts - Fluxos de Autenticação (11 testes)

- **Login Page**
  - ✓ Exibição do formulário
  - ✓ Toggle de visibilidade de senha
  - ✓ Validação de campos obrigatórios
  - ✓ Mensagens de erro (credenciais inválidas)
  - ✓ Navegação para "Esqueci minha senha"
  - ✓ Navegação para "Registrar"

- **Registration Page**
  - ✓ Exibição do formulário de registro
  - ✓ Navegação para login

- **Forgot Password Page**
  - ✓ Exibição do formulário
  - ✓ Navegação de volta para login

### ✅ home.cy.ts - Página Inicial (7 testes)

- ✓ Exibição do header
- ✓ Links de navegação funcionando
- ✓ Botão de login visível
- ✓ Seção hero presente
- ✓ Grid de imóveis carregado
- ✓ Footer exibido
- ✓ Responsividade em mobile (iPhone X)

### ✅ properties.cy.ts - Navegação de Imóveis (4 testes)

- ✓ Grid de imóveis na home
- ✓ Modais/detalhes de imóveis (quando clicado)
- ✓ Funcionalidade de filtros
- ✓ Navegação para página de detalhes

### ✅ admin.cy.ts - Painel Admin (15+ testes)

- **Dashboard Page**
  - ✓ Acesso ao dashboard admin
  - ✓ Exibição de cards KPI
  - ✓ Seção de imóveis recentes
  - ✓ Seção de mensagens recentes
  - ✓ Navegação sidebar

- **Properties Management**
  - ✓ Navegação para lista de imóveis
  - ✓ Formulário de novo imóvel
  - ✓ Validação de campos obrigatórios
  - ✓ Opções de filtro

- **User Management**
  - ✓ Seção de usuários (se disponível)

- **Admin Navigation**
  - ✓ Menu admin funcional
  - ✓ Manutenção de sessão admin
  - ✓ Logout seguro

### ✅ property-upload.cy.ts - Upload de Imagens (12+ testes)

- **Image Upload Form**
  - ✓ Campo de upload visível
  - ✓ Botão de upload
  - ✓ Área de preview

- **File Validation**
  - ✓ Validação de tipo de arquivo
  - ✓ Mensagens de erro (tipos inválidos)
  - ✓ Validação de tamanho máximo

- **Multiple Uploads**
  - ✓ Suporte a múltiplas imagens
  - ✓ Display de galeria de uploads
  - ✓ Remoção de imagens individuais

- **UploadThing Integration**
  - ✓ Integração com UploadThing
  - ✓ Indicador de progresso
  - ✓ Tratamento de conclusão

- **Image Management**
  - ✓ Preview de thumbnails
  - ✓ Reordenação por drag & drop
  - ✓ Metadata de imagens

## 🛠️ Comandos Customizados

### `cy.login(email, password)`
Realiza login automaticamente.
```typescript
cy.login("admin@test.com", "senha123");
```

### `cy.register(name, email, password)`
Registra novo usuário.
```typescript
cy.register("João Silva", "joao@test.com", "senha123");
```

### `cy.visitAdmin()`
Navega para painel admin.
```typescript
cy.visitAdmin();
```

### `cy.checkSession()`
Verifica se usuário está autenticado.
```typescript
cy.checkSession().then((isAuthenticated) => {
  expect(isAuthenticated).to.be.true;
});
```

## 📝 Escrevendo Novos Testes

### Estrutura Básica

```typescript
describe("Feature Name", () => {
  beforeEach(() => {
    cy.visit("/page-url");
  });

  it("should do something", () => {
    cy.get("selector").should("be.visible");
    cy.get("button").click();
    cy.url().should("include", "/expected-url");
  });
});
```

### Boas Práticas

1. **Use seletores descritivos**
   - Prefira `data-testid` quando possível
   - Evite seletores muito genéricos

2. **Isole testes**
   - Cada teste deve ser independente
   - Use `beforeEach` para setup comum

3. **Espere por elementos**
   - Évite `cy.wait(1000)` - use waiters apropriados
   - Use `cy.intercept()` para esperar requisições HTTP

4. **Mantenha testes legíveis**
   - Um assert por parágrafo lógico
   - Use custom commands para reduzir código repetido

### Exemplo: Teste de CRUD

```typescript
describe("Property Management", () => {
  it("should create a new property", () => {
    cy.login("admin@test.com", "senha123");
    cy.visit("/admin/properties/new");
    
    cy.get('input[name="title"]').type("Apartamento 2BR");
    cy.get('input[name="price"]').type("250000");
    cy.get("button[type='submit']").click();
    
    cy.url().should("include", "/admin/properties");
    cy.contains("Apartamento 2BR").should("be.visible");
  });
});
```

## 🔧 Configuração (cypress.config.ts)

```typescript
  setupNodeEvents: allureWriter,           // ✨ Integração Allure
}
```

### Ajustar Configuração

Edite `cypress.config.ts` para:
- Mudar `baseUrl` se server rodar em porta diferente
- Aumentar timeouts para operações lentas
- Adicionar plugins ou event listeners

## 📊 Fixtures (Dados de Teste)

### users.json
```json
{
  "admin": { "email": "admin@crm.com", "password": "admin123" },
  "user": { "email": "user@crm.com", "password": "user123" },
  "newUser": { "name": "Maria", "email": "maria@test.com" },
  "invalidUser": { "email": "fake@test.com", "password": "wrong" }
}
```

### properties.json
```json
{
  "house": { "title": "Casa Moderna...", "propertyType": "HOUSE", "price": 450000 },
  "apartment": { "title": "Apartamento...", "propertyType": "APARTMENT", "price": 350000 },
  ...
}
```

**Us🔗 GitHub Actions - CI/CD Automatizado

O projeto inclui dois workflows automatizados:

#### 1. **e2e-tests.yml** - Testes em cada push/PR
```yaml
✅ Instala dependências
✅ Setup banco PostgreSQL (teste)
✅ Executa migrações
✅ Roda todos os E2E testes
✅ Gera relatório Allure
✅ Faz upload de screenshots/vídeos
✅ Comenta PR com resultados
```

**Acionado por:**
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

#### 2. **vercel-deploy.yml** - Deploy automático
```yaml
✅ Deploy automático para Vercel em `main`
```

**Configuração necessária em GitHub:**
```
Secrets > New repository secret
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
```

### 📈 Allure Report
x] ✅ Fixtures (dados de teste)
- [x] ✅ Testes de admin dashboard
- [x] ✅ Testes de upload de imagens
- [x] ✅ Integração com Allure Report
- [x] ✅ GitHub Actions CI/CD
- [ ] Coverage de testes (nyc/c8)
- [ ] Performance testing (Lighthouse)
- [ ] Visual regression testing
- [ ] API mocking avançado (MSW)
- [ ] Load testing (k6)
npm run test:allure:report
```

#### Funcionalidades do Allure
- 📊 Dashboard com estatísticas
- 🎯 Histórico de testes
- 📹 Screenshots/vídeos anexados
- ⏱️ Tempo de execução por teste
- 🔗 Rastrability (requisitos → testes)

### GitHub Actions - Exemplo de Resultado
```
✅ build: PASSED
✅ lint: PASSED (continue-on-error)
✅ e2e-tests: PASSED (31 tests)
📊 Generated Allure Report
📤 Uploaded artifacts (7 days retention)
💬 PR Comment: "✅ E2E Tests completed. View Allure Report"get().debug()`
- Use `cy.pause()` para modo interativo

### "Port 3000 already in use"
- Encerre outro processo Next.js: `lsof -i :3000` (Linux/Mac) ou `netstat -ano | findstr :3000` (Windows)
- Ou mude porta em `start-server-and-test` no package.json

### Testes passam localmente mas falham no CI
- Pode ser timing (use waits apropriados)
- Verifique variáveis de ambiente em CI
- Use `cy.intercept()` para mockar APIs lentes

## 📊 Relatórios e CI/CD

### GitHub Actions (Exemplo)

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-videos
          path: cypress/videos
```

## 🎓 Recursos Adicionais

- [Documentação Oficial Cypress](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)

## 🔄 Próximas Melhorias

- [ ] Adicionar fixtures (dados de teste)
- [ ] Testes de admin dashboard
- [ ] Testes de upload de imagens
- [ ] Integração com Allure Report
- [ ] GitHub Actions CI/CD
- [ ] Coverage de testes
- [ ] Mocking de API responses

---

**Última atualização**: 23 de fevereiro de 2026  
**Mantido por**: AI Coding Agent / Bruno Lopes
