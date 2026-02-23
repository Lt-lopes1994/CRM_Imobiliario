// Cypress support file for E2E tests
// Loaded before each E2E spec file

// Add custom commands, helpers and global config
import "./commands";
import "@shelex/cypress-allure-plugin";

// Add Allure reporting
Cypress.env("allure", true);

// Suppress specific Next.js console messages (optional)
const app = window.next;

beforeEach(() => {
  // Reset any state if needed
});

// Handle uncaught exceptions gracefully
Cypress.on("uncaught:exception", (err, runnable) => {
  // Return false to prevent test failure on uncaught exceptions
  // This is useful for handling non-critical errors
  if (
    err.message.includes("ResizeObserver") ||
    err.message.includes("Cannot read property") ||
    err.name === "TypeError"
  ) {
    return false;
  }
  // Let other errors fail the test
  return true;
});
