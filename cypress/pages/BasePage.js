/**
 * BasePage - Abstract base class for all page objects
 * Provides common methods and utilities that all page objects will extend
 */
class BasePage {
  /**
   * Visit the page
   * @param {string} path - Optional path to append to baseUrl
   */
  visit(path = '') {
    cy.visit(path);
    this.waitForPageLoad();
  }

  /**
   * Wait for page to load completely
   */
  waitForPageLoad() {
    cy.window().its('document.readyState').should('eq', 'complete');
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   * @param {object} options - Cypress click options
   */
  click(selector, options = {}) {
    cy.get(selector).should('be.visible').click(options);
  }

  /**
   * Type text into an element
   * @param {string} selector - Element selector
   * @param {string} text - Text to type
   * @param {object} options - Cypress type options
   */
  type(selector, text, options = {}) {
    cy.get(selector).should('be.visible').clear().type(text, options);
  }

  /**
   * Get an element
   * @param {string} selector - Element selector
   * @returns {Cypress.Chainable} Cypress chainable element
   */
  getElement(selector) {
    return cy.get(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @param {boolean} shouldBeVisible - Whether element should be visible (default: true)
   */
  verifyElementVisibility(selector, shouldBeVisible = true) {
    if (shouldBeVisible) {
      cy.get(selector).should('be.visible');
    } else {
      cy.get(selector).should('not.be.visible');
    }
  }

  /**
   * Verify element contains text
   * @param {string} selector - Element selector
   * @param {string} text - Expected text
   */
 verifyElementText(selector, text) {
    cy.get(selector).should('contain', text);
  }
 
  /**
   * Select option from dropdown
   * @param {string} selector - Dropdown selector
   * @param {string} value - Value to select
   */
  selectOption(selector, value) {
    cy.get(selector).select(value);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
  }

  /**
   * Scroll to element
   * @param {string} selector - Element selector
   */
  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
  }

  /**
   * Get element text
   * @param {string} selector - Element selector
   * @returns {Cypress.Chainable} Cypress chainable with text
   */
  getElementText(selector) {
    return cy.get(selector).invoke('text');
  }

  /**
   * Check checkbox or radio button
   * @param {string} selector - Checkbox/radio selector
   * @param {boolean} checked - Whether it should be checked (default: true)
   */
  checkElement(selector, checked = true) {
    if (checked) {
      cy.get(selector).check();
    } else {
      cy.get(selector).uncheck();
    }
  }
}

export default BasePage;

