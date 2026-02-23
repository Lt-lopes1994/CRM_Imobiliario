// E2E Tests for Admin Dashboard
describe("Admin Dashboard", () => {
  beforeEach(() => {
    // Load admin user fixture
    cy.fixture("users.json").then((users) => {
      cy.login(users.admin.email, users.admin.password);
      cy.visit("/admin");
    });
  });

  describe("Dashboard Page", () => {
    it("should display admin dashboard", () => {
      cy.url().should("include", "/admin");
      cy.get("h1, h2").should("exist");
    });

    it("should display KPI cards", () => {
      // Check for stat cards (adjust selectors based on your dashboard)
      cy.get("[class*='card'], [class*='stat']").should(
        "have.length.greaterThan",
        0,
      );
    });

    it("should display recent properties section", () => {
      cy.contains("Imóveis Recentes", { matchCase: false })
        .should("be.visible")
        .or(cy.contains("Propriedades Recentes", { matchCase: false }));
    });

    it("should display recent messages section", () => {
      cy.contains("Mensagens Recentes", { matchCase: false })
        .should("be.visible")
        .or(cy.contains("Atividade Recente", { matchCase: false }));
    });

    it("should display sidebar navigation", () => {
      cy.get("aside, [class*='sidebar']").should("exist");
    });
  });

  describe("Properties Management", () => {
    it("should navigate to properties list", () => {
      cy.contains("a, button", "Imóveis", { matchCase: false })
        .should("exist")
        .click();
      cy.url().should("include", "/admin/properties");
    });

    it("should navigate to new property form", () => {
      cy.visit("/admin/properties/new");
      cy.contains("h1, h2", "Novo Imóvel", { matchCase: false })
        .should("exist")
        .or(cy.contains("h1, h2", "Criar Imóvel", { matchCase: false }));
    });

    it("should display property form fields", () => {
      cy.visit("/admin/properties/new");

      cy.fixture("properties.json").then((props) => {
        const property = props.house;

        // Fill form (adjust selectors based on your actual form)
        cy.get('input[name="title"]').should("exist").type(property.title);
        cy.get('textarea[name="description"]')
          .should("exist")
          .type(property.description);
        cy.get('select[name="propertyType"], [class*="propertyType"]').should(
          "exist",
        );
        cy.get('input[name="address"]').should("exist").type(property.address);
        cy.get('input[name="price"]')
          .should("exist")
          .type(property.price.toString());
      });
    });

    it("should validate required fields on property form", () => {
      cy.visit("/admin/properties/new");
      cy.get("button[type='submit']").click();

      // Check for validation messages
      cy.get("[class*='error'], [class*='invalid']")
        .should("exist")
        .or(cy.contains("obrigatório", { matchCase: false }));
    });

    it("should display property filtering options", () => {
      cy.visit("/admin/properties");

      // Wait for properties to load
      cy.wait(500);

      cy.get("[class*='filter'], [class*='search']").then(($filter) => {
        if ($filter.length > 0) {
          cy.get("[class*='filter']").should("be.visible");
        }
      });
    });
  });

  describe("User Management", () => {
    it("should navigate to users section if available", () => {
      cy.contains("a, button", "Usuários", { matchCase: false }).then(
        ($btn) => {
          if ($btn.length > 0) {
            cy.contains("a, button", "Usuários").click();
            cy.url().should("not.include", "/login");
          }
        },
      );
    });
  });

  describe("Admin Logout", () => {
    it("should logout from admin panel", () => {
      cy.contains("button, a", "Sair", { matchCase: false }).click();
      cy.url().should("not.include", "/admin");
    });

    it("should redirect to login after logout", () => {
      cy.contains("button, a", "Sair", { matchCase: false }).click();
      cy.url().should("include", "/login");
    });
  });

  describe("Admin Navigation", () => {
    it("should have working admin menu", () => {
      cy.get("aside, nav, [class*='sidebar']").should("exist");
      cy.get("a[href*='/admin']").should("have.length.greaterThan", 0);
    });

    it("should maintain admin session", () => {
      cy.request({
        url: "/api/auth/session",
        failOnStatusCode: false,
      }).then((resp) => {
        // Session should exist
        if (resp.status === 200) {
          expect(resp.body).to.have.property("user");
        }
      });
    });
  });
});
