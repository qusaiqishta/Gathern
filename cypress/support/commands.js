// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to wait for API requests to complete
 * @example cy.waitForApi()
 */
Cypress.Commands.add('waitForApi', () => {
  cy.intercept('**').as('apiRequests');
  cy.wait('@apiRequests', { timeout: 10000 });
});

/**
 * Custom command to login (if needed in future)
 * @param {string} email - User email
 * @param {string} password - User password
 * @example cy.login('user@example.com', 'password123')
 */
Cypress.Commands.add('login', (email, password) => {
  // Implementation will be added when login functionality is needed
  cy.log('Login command - to be implemented');
});

/**
 * Custom command to wait for page to be fully loaded
 * @example cy.waitForPageLoad()
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().its('document.readyState').should('eq', 'complete');
  cy.document().should('have.property', 'readyState', 'complete');
});

/**
 * Custom command to clear all cookies and local storage
 * @example cy.clearAll()
 */
Cypress.Commands.add('clearAll', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

/**
 * Custom command to take a screenshot with a custom name
 * @param {string} name - Screenshot name
 * @example cy.takeScreenshot('homepage')
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'viewport' });
});

