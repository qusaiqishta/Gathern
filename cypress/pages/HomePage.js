import BasePage from './BasePage';

/**
 * HomePage - Page object for the home page with search form
 */
class HomePage extends BasePage {
  // Selectors organized by section
  selectors = {
    searchForm: {
      locationInput: 'div.Hero_hero__QtNbi > div.Hero_searchBar__BDt2Q.boxed.false > div > div > div > div > div > span:nth-child(1)',
      checkInDate: '.MuiPickersDateRangePickerInput-root>div>div:first-child',
      checkOutDate: '.MuiPickersDateRangePickerInput-root>div>div:last-child',
      guestSelector: '[data-testid="guest-selector"]',
      searchButton: '[class*="Hero_searchButton"]',
      citySearchInput:'#cities-popover > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div.ltr-gcuzx4.eb0vins0 > div > div > input',
      dropdownOptionsSelector:'#cities-popover > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div.ltr-y0y7mr.edmkj4q1',
      propertyTypeSelector:'#__next > div.page-layout > div.Hero_hero__QtNbi > div.Hero_searchBar__BDt2Q.boxed.false > div > div > div > div > div > span:nth-child(3) > div',
      propertyTypeDropdown:'#places-popover > div.MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > div'
    },
    navigation: {
      logo: '[data-testid="logo"]',
      menu: '[data-testid="menu"]',
    },
  };

  /**
   * Fill the search form with provided parameters
   * @param {string} location - Location to search for
   * @param {string} checkIn - Check-in date
   * @param {string} checkOut - Check-out date
   * @param {number} guests - Number of guests
   */
  fillSearchForm(location, checkIn, checkOut, guests) {
    if (location) {
      this.type(this.selectors.searchForm.locationInput, location);
    }
    if (checkIn) {
      this.type(this.selectors.searchForm.checkInDate, checkIn);
    }
    if (checkOut) {
      this.type(this.selectors.searchForm.checkOutDate, checkOut);
    }
    if (guests) {
      this.click(this.selectors.searchForm.guestSelector);
      // Additional logic to select guest count would go here
    }
  }

  /**
   * Submit the search form
   */
  submitSearch() {
    this.click(this.selectors.searchForm.searchButton);
  }

  /**
   * Navigate to search with all parameters
   * @param {string} location - Location to search for
   * @param {object} dates - Object with checkIn and checkOut dates
   * @param {number} guests - Number of guests
   */
  navigateToSearch(location, dates = {}, guests) {
    this.fillSearchForm(location, dates.checkIn, dates.checkOut, guests);
    this.submitSearch();
  }

  /**
   * Verify search form is displayed
   */
  verifySearchFormDisplayed() {
    this.verifyElementVisibility(this.selectors.searchForm.locationInput);
    this.verifyElementVisibility(this.selectors.searchForm.searchButton);
  }

  /**
   * Clear search form
   */
  clearSearchForm() {
    cy.get(this.selectors.searchForm.locationInput).clear();
    cy.get(this.selectors.searchForm.checkInDate).clear();
    cy.get(this.selectors.searchForm.checkOutDate).clear();
  }
}

export default HomePage;

