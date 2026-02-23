// E2E Tests for Authentication
describe("Authentication", () => {
  describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("/login");
    });

    it("should display login form", () => {
      cy.contains("Entrar na sua conta").should("be.visible");
      cy.get('input[name="email"]').should("exist");
      cy.get('input[name="password"]').should("exist");
      cy.get("button[type='submit']").should("contain", "Entrar");
    });

    it("should display password toggle button", () => {
      cy.get('input[name="password"]').parent().find("button").should("exist");
    });

    it("should toggle password visibility", () => {
      const passwordInput = cy.get('input[name="password"]');
      passwordInput.should("have.attr", "type", "password");

      cy.get('input[name="password"]').parent().find("button").click();
      passwordInput.should("have.attr", "type", "text");
    });

    it("should display forgot password link", () => {
      cy.contains("a", "Esqueceu sua senha?").should("be.visible");
      cy.contains("a", "Esqueceu sua senha?").should(
        "have.attr",
        "href",
        "/forgot-password",
      );
    });

    it("should display register link", () => {
      cy.contains("a", "criar uma nova conta").should("be.visible");
      cy.contains("a", "criar uma nova conta").should(
        "have.attr",
        "href",
        "/register",
      );
    });

    it("should show error message with invalid credentials", () => {
      cy.get('input[name="email"]').type("nonexistent@test.com");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get("button[type='submit']").click();

      cy.contains("Credenciais inválidas").should("be.visible");
    });

    it("should require email field", () => {
      cy.get('input[name="password"]').type("password123");
      cy.get("button[type='submit']").click();

      cy.get('input[name="email"]').should("have.attr", "required");
    });

    it("should require password field", () => {
      cy.get('input[name="email"]').type("test@test.com");
      cy.get("button[type='submit']").click();

      cy.get('input[name="password"]').should("have.attr", "required");
    });

    it("should navigate to forgot password page", () => {
      cy.contains("a", "Esqueceu sua senha?").click();
      cy.url().should("include", "/forgot-password");
    });
  });

  describe("Registration Page", () => {
    beforeEach(() => {
      cy.visit("/register");
    });

    it("should display registration form", () => {
      cy.contains("Criar nova conta").should("be.visible");
      cy.get('input[name="name"]').should("exist");
      cy.get('input[name="email"]').should("exist");
      cy.get('input[name="password"]').should("exist");
    });

    it("should display login link", () => {
      cy.contains("a", "já tem uma conta").should("be.visible");
      cy.contains("a", "já tem uma conta").should(
        "have.attr",
        "href",
        "/login",
      );
    });

    it("should navigate to login page", () => {
      cy.contains("a", "já tem uma conta").click();
      cy.url().should("include", "/login");
    });
  });

  describe("Forgot Password Page", () => {
    it("should display forgot password form", () => {
      cy.visit("/forgot-password");
      cy.contains("Recuperar Senha").should("be.visible");
      cy.get('input[name="email"]').should("exist");
      cy.get("button[type='submit']").should("contain.text", "Enviar");
    });

    it("should display back to login link", () => {
      cy.visit("/forgot-password");
      cy.contains("a", "Voltar para login").should("be.visible");
      cy.contains("a", "Voltar para login").should(
        "have.attr",
        "href",
        "/login",
      );
    });

    it("should navigate back to login", () => {
      cy.visit("/forgot-password");
      cy.contains("a", "Voltar para login").click();
      cy.url().should("include", "/login");
    });
  });
});
