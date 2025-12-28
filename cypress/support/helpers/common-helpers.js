import HomePage from "../../pages/HomePage";
const homePage = new HomePage();
/**
 * Format date to a specific format
 * @param {Date} date - Date object
 * @param {string} format - Date format (default: 'YYYY-MM-DD')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Get future date
 * @param {number} daysFromNow - Number of days from today
 * @returns {Date} Future date object
 */
export function getFutureDate(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

/**
 * Get formatted future date string
 * @param {number} daysFromNow - Number of days from today
 * @param {string} format - Date format (default: 'YYYY-MM-DD')
 * @returns {string} Formatted future date string
 */
export function getFutureDateString(daysFromNow, format = 'YYYY-MM-DD') {
  return formatDate(getFutureDate(daysFromNow), format);
}

/**
 * Generate random email address
 * @param {string} domain - Email domain (default: 'example.com')
 * @returns {string} Random email address
 */
export function generateRandomEmail(domain = 'example.com') {
  const randomString = Math.random().toString(36).substring(2, 15);
  return `test_${randomString}@${domain}`;
}

/**
 * Generate random phone number
 * @param {string} format - Phone format (default: 'US')
 * @returns {string} Random phone number
 */
export function generateRandomPhone(format = 'US') {
  if (format === 'US') {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${areaCode}-${exchange}-${number}`;
  }
  return Math.floor(Math.random() * 10000000000).toString();
}

/**
 * Generate random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export function generateRandomString(length = 10) {
  return Math.random().toString(36).substring(2, length + 2);
}

/**
 * Wait for element to be visible and stable
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in milliseconds
 */
export function waitForStableElement(selector, timeout = 10000) {
  cy.get(selector, { timeout }).should('be.visible');
  cy.get(selector).should('not.have.class', 'loading');
}

/**
 * Assert that element contains text (case insensitive)
 * @param {string} selector - Element selector
 * @param {string} text - Expected text
 */
export function assertContainsText(selector, text) {
  cy.get(selector).should('contain.text', text);
}

/**
 * Scroll element into view and click
 * @param {string} selector - Element selector
 */
export function scrollAndClick(selector) {
  cy.get(selector).scrollIntoView().should('be.visible').click();
}

/**
 * Type text slowly (character by character)
 * @param {string} selector - Element selector
 * @param {string} text - Text to type
 * @param {number} delay - Delay between characters in milliseconds
 */
export function typeSlowly(selector, text, delay = 50) {
  cy.get(selector).clear();
  text.split('').forEach((char) => {
    cy.get(selector).type(char, { delay });
  });
}

/**
 * Verify URL contains path
 * @param {string} path - Expected path
 */
export function verifyUrlContains(path) {
  cy.url().should('include', path);
}

/**
 * Get random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Select a random Saudi Arabia city from a searchable dropdown
 * @param {string} inputSelector - Selector for the dropdown input field
 * @param {string} dropdownOptionsSelector - Selector for the dropdown options container/list
 * @returns {string} The selected city name
 * @example
 * selectRandomSaudiCity('[data-testid="location-input"]', '[data-testid="location-options"]')
 */
export function selectRandomSaudiCity() {
  const cities = ['AlUla', 'Al Khobar', 'Jeddah', 'Dammam'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  
  // Clear and type the city name in the input field
  cy.get(homePage.selectors.searchForm.locationInput).should('be.visible').click();
  cy.get(homePage.selectors.searchForm.citySearchInput,{timeout:10000}).should('be.visible').type(randomCity);
  // Wait for dropdown options to appear and select the city using contains
  cy.get(homePage.selectors.searchForm.dropdownOptionsSelector, { timeout: 5000 })
    .should('be.visible')
    .contains(randomCity)
    .should('be.visible')
    .click();
  
  return randomCity;
}

/**
 * Select a property type from the available options
 * @param {string} propertyTypeSelector - Selector for the property type options container/list
 * @param {string} propertyType - Optional specific property type to select. If not provided, selects a random type
 * @returns {string} The selected property type name
 * @example
 * selectPropertyType('[data-testid="property-type-options"]')
 * selectPropertyType('[data-testid="property-type-options"]', 'Villas')
 */
export function selectPropertyType(propertyType = null) {
  const propertyTypes = [
    'Apartments, Studios, rooms, Villas',
    'Farms',
    'Camps',
    'Chalets, Istrahas and Resorts'
  ];
  
  const selectedType = propertyType || propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
  
  // Wait for property type options to appear and select using contains
  cy.get(homePage.selectors.searchForm.propertyTypeSelector, { timeout: 5000 })
    .should('be.visible')
    .click();
  cy.get(homePage.selectors.searchForm.propertyTypeDropdown, { timeout: 5000 })
    .should('be.visible')
    .contains(selectedType)
    .click();
  
  return selectedType;
}

/**
 * Format date for Material-UI date picker aria-label (e.g., "Jan 2, 2026")
 * @param {Date} date - Date object
 * @returns {string} Formatted date string in "MMM D, YYYY" format
 */
function formatDateForPicker(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

/**
 * Select check-in or check-out date from Material-UI date picker
 * @param {string} dateButtonSelector - Selector for the date button (checkIn or checkOut)
 * @param {string} dateType - 'checkIn' or 'checkOut' (default: 'checkIn')
 * @param {number} daysAhead - Number of days ahead from today (default: 2 for checkIn, 4 for checkOut)
 * @returns {object} Object containing the selected date and formatted date string
 * @example
 * selectDateRange('[data-testid="checkin-date"]', 'checkIn')
 * selectDateRange('[data-testid="checkout-date"]', 'checkOut')
 */
export function selectDateRange(dateButtonSelector, dateType = 'checkIn', daysAhead = null) {
  // Set default days ahead: 2 for checkIn, 7 for checkOut
  const defaultDaysAhead = dateType === 'checkIn' ? 2 : 7;
  const daysFromNow = daysAhead !== null ? daysAhead : defaultDaysAhead;
  
  // Calculate the target date
  const targetDate = getFutureDate(daysFromNow);
  const formattedDate = formatDateForPicker(targetDate);
  
  // Click on the date button to open the picker
  cy.get(dateButtonSelector).should('be.visible').click();
  
  // Wait for the date picker to appear
  cy.get('.MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer', { timeout: 5000 })
    .should('be.visible');
  
  // Navigate to the correct month if needed
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();
  
  // Calculate how many months to navigate
  const monthsDiff = (targetYear - currentYear) * 12 + (targetMonth - currentMonth);
  
  // Navigate to the correct month (only if target date is in a future month)
  if (monthsDiff > 1) {
    for (let i = 0; i < monthsDiff; i++) {
      cy.get('[data-mui-test="next-arrow-button"]').last()
        .should('be.visible')
        .should('not.be.disabled')
        .click();
      cy.wait(300); // Wait for calendar animation
    }
  }
  
  // Select the date using aria-label
  cy.get(`button[data-mui-test="DateRangeDay"][aria-label="${formattedDate}"]`).first()
    .should('be.visible')
    .should('not.be.disabled')
    .click();
  
  return {
    date: targetDate,
    formattedDate: formattedDate,
    daysAhead: daysFromNow
  };
}
export function parseNumberToCommaSeparatedString(number) {
  const num = Number(number);
  if (isNaN(num)) return '';
  const hasDecimal = num % 1 !== 0;
  if (hasDecimal) {
    return num
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return num
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

/**
 * Formats an ISO date string (e.g., "2025-12-27") to "Saturday, 27 December"
 * @param {string} isoDateString - Date in "YYYY-MM-DD" format
 * @returns {string} - Formatted date (e.g., "Saturday, 27 December")
 */
export function formatDateToDayDateMonth(isoDateString) {
  if (!isoDateString) return '';
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) return '';

  const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${weekday}, ${day} ${month}`;
}
