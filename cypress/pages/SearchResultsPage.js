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
      filtersButton:'.mobile-search-buttons-container button:first-child',
      container: '[data-test="sentinelStart"] ~ div',
      priceRange: '[data-testid="price-range-filter"]',
      propertyType: 'div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.ltr-pixbia > div > div > div > div.MuiBox-root.jss4706.ltr-1hdbc19.eyq2vs40 > div > div > div',
      amenities: 'div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.ltr-pixbia > div > div > div > div.MuiBox-root.jss4776.ltr-1hdbc19.eyq2vs40 > div > div',
      applyButton: 'div.MuiDialogActions-root button:first-child',
      offerDiscount:'input.MuiSwitch-input',
      noInsurance:'input.MuiSwitch-input'
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
      .scrollIntoView()
      .should('be.visible')
      .find('a[target]')
      .invoke('attr', 'target', '_self')
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
    this.click(this.selectors.filters.filtersButton);
    // Set the price range slider's minimum value dynamically
    
    if (typeof filterOptions?.priceRange?.min === 'number') {
      cy.get('span[role="slider"][aria-labelledby="range-slider"]', { timeout: 10000 })
      .eq(4).click();
      const movements= (filterOptions.priceRange.min/50) -1
      for(let i =0;i<movements;i++){
          cy.get('span[role="slider"][aria-labelledby="range-slider"]')
          .eq(4)
          .type('{rightarrow}');
      }
    }
    
    
    if (filterOptions.offerDiscount) {
      cy.get(this.selectors.filters.offerDiscount).first()
        .check({ force: true });
    }
    if (filterOptions.noInsurance) {
      cy.get(this.selectors.filters.noInsurance).eq(1)
        .check({ force: true });
    }
    
    if (filterOptions.propertyTypes) {
      filterOptions.propertyTypes.forEach((property) => {
        cy.get(this.selectors.filters.container).first()
          .contains(property)
          .click();
      });
    }
    if (filterOptions.amenities) {
      filterOptions.amenities.forEach((amenity) => {
        cy.get(this.selectors.filters.container).first()
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
    this.selectProperty(index);
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

