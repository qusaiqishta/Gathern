import BasePage from './BasePage';
import {formatDateToDayDateMonth, parseNumberToCommaSeparatedString} from '../support/helpers/common-helpers';
/**
 * PropertyDetailsPage - Page object for the property details page
 */
class PropertyDetailsPage extends BasePage {
  // Selectors organized by section
  selectors = {
    propertyInfo: {
      title: '[data-testid="property-title"]',
      location: '[data-testid="property-location"]',
      rating: '[data-testid="property-rating"]',
      price: '[data-testid="property-price"]',
      propertyInfoCard:'div.ltr-1kz6xjl.e3c9j8z1 > div'
    },
    images: {
      container: '[data-testid="property-images-container"]',
      mainImage: '[data-testid="property-main-image"]',
      thumbnail: '[data-testid="property-thumbnail"]',
      nextButton: '[data-testid="image-next"]',
      previousButton: '[data-testid="image-previous"]',
    },
    booking: {
      calendar: '[data-testid="booking-calendar"]',
      checkInDate: '[data-testid="checkin-date"]',
      checkOutDate: '[data-testid="checkout-date"]',
      guestSelector: '[data-testid="guest-selector"]',
      guestCount: '[data-testid="guest-count"]',
      bookButton: '[data-testid="book-button"]',
      reserveButton: '[data-testid="reserve-button"]',
      totalPrice: '[data-testid="total-price"]',
    },
    amenities: {
      container: '[data-testid="amenities-container"]',
      amenityItem: '[data-testid="amenity-item"]',
    },
    reviews: {
      container: '[data-testid="reviews-container"]',
      reviewItem: '[data-testid="review-item"]',
      rating: '[data-testid="review-rating"]',
      comment: '[data-testid="review-comment"]',
    },
    description: {
      section: '[data-testid="property-description"]',
      text: '[data-testid="description-text"]',
    },
  };

  /**
   * Click the book button
   */
  clickBookButton() {
    this.click(this.selectors.booking.bookButton);
  }

  /**
   * Click the reserve button
   */
  clickReserveButton() {
    this.click(this.selectors.booking.reserveButton);
  }

  /**
   * Verify property details are displayed
   */
  verifyPropertyDetails() {
    cy.wait('@propertyDetails').then(interception=>{
      const propertyDetails = interception.response.body.data;
      const pricePerNight = parseNumberToCommaSeparatedString(propertyDetails.avg_price);
      const finalPrice = propertyDetails.final_price_services;
      const numberOfNights = propertyDetails.nights;
      const checkInDate = formatDateToDayDateMonth(propertyDetails.selected_check_in);
      const checkOutDate = formatDateToDayDateMonth(propertyDetails.selected_check_out);
      const tabbyPayDisclaimer = propertyDetails.tabby_text;
      const tamaraPayDisclaimer = propertyDetails.tamara_text;
      const qitafEarnedPoints = propertyDetails.earn_qitaf.text_bold;

      cy.get(this.selectors.propertyInfo.propertyInfoCard).within(() => {
        if (pricePerNight) {
          cy.contains(pricePerNight+ ' Riyal / Night').should('exist');
        }
        if (finalPrice && numberOfNights) {
          cy.contains(`Total of ${numberOfNights} Nights ${finalPrice} SAR`).should('exist');
        }
        if (checkInDate) {
        cy.get('input').first().should('have.value', checkInDate);
          
        }
        if (checkOutDate) {
          cy.get('input').last().should('have.value', checkOutDate);
        }
        if (tabbyPayDisclaimer) {
          cy.contains(tabbyPayDisclaimer).should('exist');
        }
        if (tamaraPayDisclaimer) {
          cy.contains(tamaraPayDisclaimer).should('exist');
        }
        if (qitafEarnedPoints) {
          cy.contains(qitafEarnedPoints).should('exist');
        }
      });
    })

  }

  /**
   * Get property title
   * @returns {Cypress.Chainable} Chainable with property title
   */
  getPropertyTitle() {
    return this.getElementText(this.selectors.propertyInfo.title);
  }

  /**
   * Get property price
   * @returns {Cypress.Chainable} Chainable with property price
   */
  getPropertyPrice() {
    return this.getElementText(this.selectors.propertyInfo.price);
  }

  /**
   * Get total booking price
   * @returns {Cypress.Chainable} Chainable with total price
   */
  getTotalPrice() {
    return this.getElementText(this.selectors.booking.totalPrice);
  }

  /**
   * Verify booking calendar is displayed
   */
  verifyBookingCalendarDisplayed() {
    this.verifyElementVisibility(this.selectors.booking.calendar);
  }

  /**
   * Navigate through property images
   * @param {string} direction - 'next' or 'previous'
   */
  navigateImages(direction) {
    if (direction === 'next') {
      this.click(this.selectors.images.nextButton);
    } else {
      this.click(this.selectors.images.previousButton);
    }
  }

  /**
   * Get amenities list
   * @returns {Cypress.Chainable} Chainable with amenities
   */
  getAmenities() {
    return cy.get(this.selectors.amenities.amenityItem);
  }

  /**
   * Get reviews count
   * @returns {Cypress.Chainable} Chainable with reviews count
   */
  getReviewsCount() {
    return cy.get(this.selectors.reviews.reviewItem).its('length');
  }
}

export default PropertyDetailsPage;

