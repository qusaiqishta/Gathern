import BasePage from './BasePage';
import { waitForDefaultConfig } from '../support/api-intercepts';
import {parseNumberToCommaSeparatedString, verifyUrlContains} from "../support/helpers/common-helpers.js"
/**
 * SearchResultsPage - Page object for the search results page
 */
class SearchResultsPage extends BasePage {
  // Selectors organized by section
  selectors = {
    propertyCards: {
      container: 'div.MuiGrid-container',
      card: 'div.MuiGrid-container > div',
      propertyName: '[data-testid="property-name"]',
      propertyPrice: '[data-testid="property-price"]',
      propertyImage: '[data-testid="property-image"]',
    },
    filters: {
      container: '[data-testid="filters-container"]',
      priceRange: '[data-testid="price-range-filter"]',
      propertyType: '[data-testid="property-type-filter"]',
      amenities: '[data-testid="amenities-filter"]',
      applyButton: '[data-testid="apply-filters-button"]',
    },
    sort: {
      dropdown: '[data-testid="sort-dropdown"]',
      option: '[data-testid="sort-option"]',
    },
    viewToggle: {
      listView: '[data-testid="list-view"]',
      mapView: '[data-testid="map-view"]',
    },
    pagination: {
      container: '[data-testid="pagination-container"]',
      nextButton: '[data-testid="pagination-next"]',
      previousButton: '[data-testid="pagination-previous"]',
      pageNumber: '[data-testid="pagination-page"]',
    },
  };

  /**
   * Select a property by index
   * @param {number} index - Index of the property (0-based)
   */
  selectProperty(index = 0) {
    cy.get(this.selectors.propertyCards.card)
      .eq(index)
      .should('be.visible')
      .click();
  }

  /**
   * Select a property by name
   * @param {string} propertyName - Name of the property
   */
  selectPropertyByName(propertyName) {
    cy.contains(this.selectors.propertyCards.propertyName, propertyName)
      .should('be.visible')
      .click();
  }

  /**
   * Apply filters to search results
   * @param {object} filterOptions - Object containing filter options
   */
  applyFilters(filterOptions) {
    if (filterOptions.priceRange) {
      // Logic to set price range
      cy.get(this.selectors.filters.priceRange).within(() => {
        // Price range selection logic
      });
    }
    if (filterOptions.propertyType) {
      cy.get(this.selectors.filters.propertyType).select(filterOptions.propertyType);
    }
    if (filterOptions.amenities) {
      filterOptions.amenities.forEach((amenity) => {
        cy.get(this.selectors.filters.amenities)
          .contains(amenity)
          .click();
      });
    }
    this.click(this.selectors.filters.applyButton);
  }

  /**
   * Verify search results are displayed
   */
  verifyResultsDisplayed() {
    // Wait for the default config API call to complete
    waitForDefaultConfig();
    waitForDefaultConfig('getFilterConfig');
    waitForDefaultConfig('getResultsData');
    verifyUrlContains('/search');
    cy.wait(5000);
    this.verifyElementVisibility(this.selectors.propertyCards.container);
    cy.get(this.selectors.propertyCards.card).should('have.length.greaterThan', 0);
  }
/**
 * Assert that every property card in the UI matches the corresponding API data
 * (city, area, price, total reviews, title, etc)
 */
verifyAllCardsMatchApiData() {
  // Wait for the most recent results data API call
  cy.wait('@getResultsData').then(() => {
    cy.get('@getResultsData.all').then((allInterceptions) => {
      const interception = Array.isArray(allInterceptions)
        ? allInterceptions[allInterceptions.length - 1]
        : allInterceptions;

      // Get the array of property items from API
      const responseData = interception?.response?.body?.items || [];

      cy.get(this.selectors.propertyCards.card).then($cards => {
        const cardsCount = $cards.length;

        // Loop over each response item and assert card content matches API data
        responseData.forEach((item, i) => {
          // Defensive: Only assert for those items that have a matching card in the UI
          if (i >= cardsCount) return;

          const city = item.address.city;
          const area = item.address.area;
          const pricePerNight = parseNumberToCommaSeparatedString(item.avg_price);
          const totalReviews = item.total_reviews;
          const title = item.chalet_title.trim();

          cy.wrap($cards)
            .eq(i)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              if (city) {
                cy.contains(city).should('exist');
              }
              if (area) {
                cy.contains(area).should('exist');
              }
              if (pricePerNight) {
                cy.contains(pricePerNight + ' SAR').should('exist');
              }
              if (totalReviews) {
                cy.contains(totalReviews).should('exist');
              }
              if (title) {
                cy.contains(title).should('exist');
              }
            });
        });
      });
    });
  });
}

SelectRandomProperty() {
  cy.get(this.selectors.propertyCards.card).then($cards => {
    const cardsCount = $cards.length;
    const index = Math.floor(Math.random() * cardsCount);
    cy.wrap($cards)
      .eq(index)
      .scrollIntoView()
      .should('be.visible')
      .find('a[target]')
      .invoke('attr', 'target', '_self')
      .click();
  });
  verifyUrlContains('/unit')
}


  /**
   * Get the count of properties displayed
   * @returns {Cypress.Chainable} Chainable with property count
   */
  getPropertyCount() {
    return cy.get(this.selectors.propertyCards.card).its('length');
  }

  /**
   * Sort results by option
   * @param {string} sortOption - Sort option (e.g., 'price-low-to-high', 'price-high-to-low')
   */
  sortResults(sortOption) {
    this.click(this.selectors.sort.dropdown);
    cy.get(this.selectors.sort.option).contains(sortOption).click();
  }

  /**
   * Toggle between list and map view
   * @param {string} view - 'list' or 'map'
   */
  toggleView(view) {
    if (view === 'map') {
      this.click(this.selectors.viewToggle.mapView);
    } else {
      this.click(this.selectors.viewToggle.listView);
    }
  }

  /**
   * Navigate to next page
   */
  goToNextPage() {
    this.click(this.selectors.pagination.nextButton);
  }

  /**
   * Navigate to previous page
   */
  goToPreviousPage() {
    this.click(this.selectors.pagination.previousButton);
  }

  /**
   * Get property details from a card
   * @param {number} index - Index of the property card
   * @returns {object} Object containing property details
   */
  getPropertyDetails(index = 0) {
    return cy.get(this.selectors.propertyCards.card).eq(index).within(() => {
      return {
        name: cy.get(this.selectors.propertyCards.propertyName).invoke('text'),
        price: cy.get(this.selectors.propertyCards.propertyPrice).invoke('text'),
      };
    });
  }
}

export default SearchResultsPage;

