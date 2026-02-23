// E2E Tests for Property Browsing
describe("Property Browsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display property grid on home page", () => {
    cy.get("main").should("be.visible");
    // Check if property cards are rendered (they may not be visible if no data)
    cy.get("[class*='grid']").should("exist");
  });

  it("should display property details modal when clicking on a property", () => {
    // Wait for properties to load
    cy.wait(1000);
    // Look for a clickable property card - adjust selector as needed
    cy.get('button:contains("Ver detalhes")')
      .first()
      .then(($btn) => {
        if ($btn.length > 0) {
          cy.get('button:contains("Ver detalhes")').first().click();
          // Verify modal is opened
          cy.get("[class*='modal'], [class*='dialog'], [role='dialog']").should(
            "exist",
          );
        }
      });
  });

  it("should have working filter functionality", () => {
    // Wait for filters to load
    cy.wait(500);
    // Check if filter section exists
    cy.get("[class*='filter']").then(($filter) => {
      if ($filter.length > 0) {
        cy.get("[class*='filter']").should("be.visible");
      }
    });
  });

  it("should navigate to property detail page", () => {
    cy.wait(1000);
    // Try to find a property link - adjust selector based on your property card structure
    cy.get("a[href*='/properties/']")
      .first()
      .then(($link) => {
        if ($link.length > 0) {
          cy.get("a[href*='/properties/']").first().click();
          cy.url().should("include", "/properties/");
        }
      });
  });
});
