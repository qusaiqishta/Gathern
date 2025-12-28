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
    homePage.visit('/')
 
  });

  it('should search for properties using helper functions', () => {
    // Verify search form is displayed
    homePage.verifySearchFormDisplayed();

    // Step 1: Select a random Saudi city using helper function
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
    //apply some filters on the results 
    const filtersOptions = {
      priceRange: { min: 300 },
      offerDiscount: true,     
      noInsurance: true,       
      propertyTypes: ['Resort','Chalet','Farm','Camp'],
      amenities: ['Internet', 'TV'] 
    };
    searchResultsPage.applyFilters(filtersOptions)
// verify that the results deisplayed on the UI matched what comes from the API
    searchResultsPage.verifyAllCardsMatchApiData();
    interceptPropertyDetails();
    searchResultsPage.SelectRandomProperty();
    //verify the details for specific property
    propertyDetailsPage.verifyPropertyDetails();
  });
});

