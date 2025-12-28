// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js
import './commands';

// Import common helpers
import * as helpers from './helpers/common-helpers';

// Make helpers available globally (optional)
// Cypress.helpers = helpers;

// Example: Set up global beforeEach hook
// beforeEach(() => {
//   // Clear cookies and local storage before each test
//   cy.clearCookies();
//   cy.clearLocalStorage();
// });

// Example: Set up global afterEach hook
// afterEach(() => {
//   // Take screenshot on failure
//   if (Cypress.currentTest.state === 'failed') {
//     cy.takeScreenshot(Cypress.currentTest.title);
//   }
// });

// Prevent Cypress from failing on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // You can add specific error handling logic here
  // return false;
  
  // For now, let it fail on uncaught exceptions
  return true;
});

// Configure default command timeout
Cypress.config('defaultCommandTimeout', 10000);

