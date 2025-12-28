import HomePage from '../pages/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage';
import { 
  selectRandomSaudiCity, 
  selectPropertyType, 
  selectDateRange 
} from '../support/helpers/common-helpers';
import { interceptDefaultConfig, interceptFilterConfig, interceptResultsData, interceptPropertyDetails } from '../support/api-intercepts';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';
describe('Property Search Flow', () => {
  const homePage = new HomePage();
  const searchResultsPage = new SearchResultsPage();
  const propertyDetailsPage = new PropertyDetailsPage();
  beforeEach(() => {
    // Set up API intercepts before visiting the page
    interceptDefaultConfig();
    interceptFilterConfig();
    interceptResultsData();
    // Visit the Gathern website
    cy.visit(Cypress.config('baseUrl'));
    // Wait for page to load
    homePage.waitForPageLoad();
  });

  it('should search for properties using helper functions', () => {
    // Verify search form is displayed
    homePage.verifySearchFormDisplayed();

    // Step 1: Select a random Saudi city using helper function
    // Note: Update these selectors with actual selectors from the website
    const selectedCity = selectRandomSaudiCity();
    cy.log(`Selected city: ${selectedCity}`);

    // Step 2: Select check-in date (2 days ahead) using helper function
    const checkInDate = selectDateRange(
      homePage.selectors.searchForm.checkInDate,
      'checkIn'
    );
    cy.log(`Selected check-in date: ${checkInDate.formattedDate} (${checkInDate.daysAhead} days ahead)`);

    // Step 3: Select check-out date (4 days ahead) using helper function
    const checkOutDate = selectDateRange(
      homePage.selectors.searchForm.checkOutDate,
      'checkOut'
    );
    cy.log(`Selected check-out date: ${checkOutDate.formattedDate} (${checkOutDate.daysAhead} days ahead)`);

    // Step 4: Select property type using helper function
    // Note: This assumes there's a property type selector on the home page
    // If it's on a different page or modal, adjust accordingly
    const selectedPropertyType = selectPropertyType();
    cy.log(`Selected property type: ${selectedPropertyType}`);

  
    // Step 5: Submit the search
    // homePage.submitSearch();

    // Step 7: Verify search results page is displayed
    searchResultsPage.verifyResultsDisplayed();

    // Step 8: Verify that results are shown
    searchResultsPage.getPropertyCount().then((count) => {
      cy.log(`Found ${count} properties`);
      expect(count).to.be.greaterThan(0);
    });

    searchResultsPage.verifyAllCardsMatchApiData();
    interceptPropertyDetails();
    searchResultsPage.SelectRandomProperty();
    propertyDetailsPage.verifyPropertyDetails();
  });
});

