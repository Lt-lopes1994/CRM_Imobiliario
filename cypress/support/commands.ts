// Custom Cypress commands for CRM Imobiliário

// Login command helper
Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get("button[type='submit']").click();
  cy.url().should("not.include", "/login");
});

// Register command helper
Cypress.Commands.add(
  "register",
  (name: string, email: string, password: string) => {
    cy.visit("/register");
    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/");
  },
);

// Navigate to admin panel
Cypress.Commands.add("visitAdmin", () => {
  cy.visit("/admin");
  cy.url().should("include", "/admin");
  cy.get("h1").should("exist");
});

// Check if user is logged in
Cypress.Commands.add("checkSession", () => {
  cy.request({
    url: "/api/auth/session",
    failOnStatusCode: false,
  }).then((resp) => {
    return resp.status === 200;
  });
});

// Declare custom command types for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
      visitAdmin(): Chainable<void>;
      checkSession(): Chainable<boolean>;
    }
  }
}

export {};
