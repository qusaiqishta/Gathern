# Gathern Automation - Cypress E2E Testing

This project contains Cypress end-to-end automation tests for the Gathern web application, following the Page Object Model (POM) design pattern.

## Project Overview

The automation suite is designed to test the complete property booking flow:
1. **Home Page** - Search for properties
2. **Search Results Page** - Browse and select a property
3. **Property Details Page** - View property details and initiate booking
4. **Payment Page** - Complete booking with payment information

## Project Structure

```
gathernAutomation/
├── cypress/
│   ├── e2e/                    # Test files (to be added)
│   ├── fixtures/               # Test data files
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.js         # Base page class with common methods
│   │   ├── HomePage.js         # Home page with search form
│   │   ├── SearchResultsPage.js # Search results page
│   │   ├── PropertyDetailsPage.js # Property details page
│   │   └── PaymentPage.js      # Payment page
│   ├── support/
│   │   ├── commands.js         # Custom Cypress commands
│   │   ├── e2e.js              # Cypress support file
│   │   └── helpers/
│   │       └── common-helpers.js # Shared utility functions
│   ├── videos/                 # Test execution videos
│   └── screenshots/            # Test failure screenshots
├── cypress.config.js           # Cypress configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The project is configured with the following settings in `cypress.config.js`:

- **Base URL**: `https://gathern.co/`
- **Viewport**: 1280x720
- **Video Recording**: Enabled for all tests
- **Screenshots**: Enabled on test failures
- **Default Timeout**: 10 seconds
- **Page Load Timeout**: 30 seconds

## Running Tests

### Open Cypress Test Runner (Interactive Mode)
```bash
npm run cypress:open
```

### Run Tests in Headless Mode
```bash
npm run cypress:run
```

### Run Tests in Headed Mode (with browser visible)
```bash
npm run cypress:run:headed
```

## Page Object Model Structure

### BasePage
All page objects extend the `BasePage` class, which provides common methods:
- `visit(path)` - Navigate to a page
- `click(selector)` - Click an element
- `type(selector, text)` - Type text into an element
- `getElement(selector)` - Get an element
- `verifyElementVisibility(selector)` - Verify element visibility
- `verifyElementText(selector, text)` - Verify element text
- And more...

### Page Objects

#### HomePage
Located at `cypress/pages/HomePage.js`

**Selectors:**
- Search form elements (location, dates, guests, search button)
- Navigation elements

**Methods:**
- `fillSearchForm(location, checkIn, checkOut, guests)`
- `submitSearch()`
- `navigateToSearch(location, dates, guests)`
- `verifySearchFormDisplayed()`

#### SearchResultsPage
Located at `cypress/pages/SearchResultsPage.js`

**Selectors:**
- Property cards
- Filters
- Sort options
- View toggles
- Pagination

**Methods:**
- `selectProperty(index)` or `selectPropertyByName(name)`
- `applyFilters(filterOptions)`
- `verifyResultsDisplayed()`
- `getPropertyCount()`
- `sortResults(sortOption)`

#### PropertyDetailsPage
Located at `cypress/pages/PropertyDetailsPage.js`

**Selectors:**
- Property information
- Images gallery
- Booking calendar
- Guest selector
- Book/Reserve button
- Amenities
- Reviews

**Methods:**
- `selectDates(checkIn, checkOut)`
- `selectGuests(count)`
- `clickBookButton()`
- `verifyPropertyDetails()`
- `getPropertyTitle()`
- `getTotalPrice()`

#### PaymentPage
Located at `cypress/pages/PaymentPage.js`

**Selectors:**
- Guest information form
- Payment method selection
- Card details
- Billing address
- Terms and conditions
- Booking summary
- Action buttons

**Methods:**
- `fillGuestInformation(guestData)`
- `selectPaymentMethod(method)`
- `fillPaymentDetails(paymentData)`
- `fillBillingAddress(addressData)`
- `acceptTermsAndConditions()`
- `submitPayment()`
- `verifyBookingSummary()`
- `fillCompletePaymentForm(formData)`

## Custom Commands

Custom Cypress commands are available in `cypress/support/commands.js`:

- `cy.waitForApi()` - Wait for API requests to complete
- `cy.login(email, password)` - Login command (to be implemented)
- `cy.waitForPageLoad()` - Wait for page to be fully loaded
- `cy.clearAll()` - Clear all cookies and local storage
- `cy.takeScreenshot(name)` - Take a screenshot with custom name

## Helper Functions

Common utility functions are available in `cypress/support/helpers/common-helpers.js`:

- `formatDate(date, format)` - Format date to specific format
- `getFutureDate(daysFromNow)` - Get future date
- `getFutureDateString(daysFromNow, format)` - Get formatted future date string
- `generateRandomEmail(domain)` - Generate random email
- `generateRandomPhone(format)` - Generate random phone number
- `generateRandomString(length)` - Generate random string
- `waitForStableElement(selector, timeout)` - Wait for element to be stable
- And more...

## Selectors Organization

Each page object has a dedicated `selectors` object containing all element selectors, organized by section/functionality:

```javascript
selectors = {
  searchForm: {
    locationInput: '[data-testid="location-input"]',
    checkInDate: '[data-testid="checkin-date"]',
    // ...
  },
  navigation: {
    // navigation selectors
  }
}
```
