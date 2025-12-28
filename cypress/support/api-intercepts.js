/**
 * API Intercepts for Gathern application
 * This file contains all API intercepts used in the tests
 */

/**
 * Intercept the default config API call
 * Note: This intercept should be set up BEFORE visiting the page or making the API call
 * This will intercept the real API call without modifying the response
 * @param {string} alias - Alias name for the intercept (default: 'getDefaultConfig')
 * @returns {Cypress.Chainable} The intercept alias
 */
export function interceptDefaultConfig(alias = 'getDefaultConfig') {
  return cy.intercept('GET', 'https://api.gathern.co/v1/web/default/config').as(alias);
}

export function interceptFilterConfig(alias = 'getFilterConfig') {
  return cy.intercept('GET', 'https://api.gathern.co/v1/web/default/filter-config').as(alias);
}

export function interceptResultsData(alias = 'getResultsData') {
  return cy.intercept('GET', 'https://api.gathern.co/v1/web/filter/index?*').as(alias);
}

export function interceptPropertyDetails(alias = 'propertyDetails'){
  return cy.intercept('GET','https://api.gathern.co/v1/web/chalet/unit?*').as(alias)
}


/**
 * Wait for the default config API call to complete
 * Note: Make sure interceptDefaultConfig() is called before this function
 * @param {string} alias - Alias name for the intercept (default: 'getDefaultConfig')
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
export function waitForDefaultConfig(alias = 'getDefaultConfig', timeout = 10000) {
  // Wait for the API call to complete
  cy.wait(`@${alias}`, { timeout }).then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
  });
}

/**
 * Setup all API intercepts
 * Call this function in beforeEach or before tests
 */
export function setupApiIntercepts() {
  interceptDefaultConfig();
}

