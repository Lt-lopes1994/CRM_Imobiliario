// E2E Tests for Home Page
describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the header", () => {
    cy.get("header").should("exist");
    cy.contains("CRM Imobiliária").should("be.visible");
  });

  it("should display navigation links", () => {
    cy.contains("Início").should("be.visible");
    cy.contains("Imóveis").should("be.visible");
    cy.contains("Contato").should("be.visible");
  });

  it("should display login button when not authenticated", () => {
    cy.contains("a", "Entrar").should("be.visible");
  });

  it("should navigate to login page when clicking login", () => {
    cy.contains("a", "Entrar").click();
    cy.url().should("include", "/login");
    cy.contains("Entrar na sua conta").should("be.visible");
  });

  it("should display hero section", () => {
    cy.get("main").should("be.visible");
  });

  it("should display property grid", () => {
    cy.get("main").within(() => {
      cy.get("[class*='grid']").should("exist");
    });
  });

  it("should display footer", () => {
    cy.get("footer").should("exist");
  });

  it("should be responsive on mobile", () => {
    cy.viewport("iphone-x");
    cy.get("[class*='md:']").should("exist");
    cy.contains("a", "Entrar").should("be.visible");
  });
});
