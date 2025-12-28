import BasePage from './BasePage';

/**
 * PaymentPage - Page object for the payment page
 */
class PaymentPage extends BasePage {
  // Selectors organized by section
  selectors = {
    guestInformation: {
      firstName: '[data-testid="guest-first-name"]',
      lastName: '[data-testid="guest-last-name"]',
      email: '[data-testid="guest-email"]',
      phone: '[data-testid="guest-phone"]',
    },
    paymentMethod: {
      container: '[data-testid="payment-method-container"]',
      creditCard: '[data-testid="payment-credit-card"]',
      tamara: '[data-testid="payment-tamara"]',
      tabby: '[data-testid="payment-tabby"]',
      applePay: '[data-testid="applePay"]',
    },
    cardDetails: {
      cardNumber: '[data-testid="card-number"]',
      cardHolderName: '[data-testid="card-holder-name"]',
      expiryDate: '[data-testid="card-expiry-date"]',
      cvv: '[data-testid="card-cvv"]',
    },
    billingAddress: {
      addressLine1: '[data-testid="billing-address-line1"]',
      addressLine2: '[data-testid="billing-address-line2"]',
      city: '[data-testid="billing-city"]',
      state: '[data-testid="billing-state"]',
      zipCode: '[data-testid="billing-zip-code"]',
      country: '[data-testid="billing-country"]',
    },
    termsAndConditions: {
      checkbox: '[data-testid="terms-checkbox"]',
      link: '[data-testid="terms-link"]',
    },
    bookingSummary: {
      container: '[data-testid="booking-summary-container"]',
      propertyName: '[data-testid="summary-property-name"]',
      checkIn: '[data-testid="summary-checkin"]',
      checkOut: '[data-testid="summary-checkout"]',
      guests: '[data-testid="summary-guests"]',
      subtotal: '[data-testid="summary-subtotal"]',
      taxes: '[data-testid="summary-taxes"]',
      total: '[data-testid="summary-total"]',
    },
    actions: {
      completeBookingButton: '[data-testid="complete-booking-button"]',
      cancelButton: '[data-testid="cancel-button"]',
      backButton: '[data-testid="back-button"]',
    },
  };

  /**
   * Fill guest information form
   * @param {object} guestData - Object containing guest information
   */
  fillGuestInformation(guestData) {
    if (guestData.firstName) {
      this.type(this.selectors.guestInformation.firstName, guestData.firstName);
    }
    if (guestData.lastName) {
      this.type(this.selectors.guestInformation.lastName, guestData.lastName);
    }
    if (guestData.email) {
      this.type(this.selectors.guestInformation.email, guestData.email);
    }
    if (guestData.phone) {
      this.type(this.selectors.guestInformation.phone, guestData.phone);
    }
  }

  /**
   * Select payment method
   * @param {string} method - Payment method ('credit-card', 'debit-card', 'paypal', 'other')
   */
  selectPaymentMethod(method) {
    const methodSelector = this.selectors.paymentMethod[method.replace('-', '')] || 
                          this.selectors.paymentMethod.creditCard;
    this.click(methodSelector);
  }

  /**
   * Fill payment card details
   * @param {object} paymentData - Object containing payment card details
   */
  fillPaymentDetails(paymentData) {
    if (paymentData.cardNumber) {
      this.type(this.selectors.cardDetails.cardNumber, paymentData.cardNumber);
    }
    if (paymentData.cardHolderName) {
      this.type(this.selectors.cardDetails.cardHolderName, paymentData.cardHolderName);
    }
    if (paymentData.expiryDate) {
      this.type(this.selectors.cardDetails.expiryDate, paymentData.expiryDate);
    }
    if (paymentData.cvv) {
      this.type(this.selectors.cardDetails.cvv, paymentData.cvv);
    }
  }

  /**
   * Fill billing address
   * @param {object} addressData - Object containing billing address details
   */
  fillBillingAddress(addressData) {
    if (addressData.addressLine1) {
      this.type(this.selectors.billingAddress.addressLine1, addressData.addressLine1);
    }
    if (addressData.addressLine2) {
      this.type(this.selectors.billingAddress.addressLine2, addressData.addressLine2);
    }
    if (addressData.city) {
      this.type(this.selectors.billingAddress.city, addressData.city);
    }
    if (addressData.state) {
      this.type(this.selectors.billingAddress.state, addressData.state);
    }
    if (addressData.zipCode) {
      this.type(this.selectors.billingAddress.zipCode, addressData.zipCode);
    }
    if (addressData.country) {
      this.selectOption(this.selectors.billingAddress.country, addressData.country);
    }
  }

  /**
   * Accept terms and conditions
   */
  acceptTermsAndConditions() {
    this.checkElement(this.selectors.termsAndConditions.checkbox, true);
  }

  /**
   * Submit payment and complete booking
   */
  submitPayment() {
    this.click(this.selectors.actions.completeBookingButton);
  }

  /**
   * Verify booking summary is displayed
   */
  verifyBookingSummary() {
    this.verifyElementVisibility(this.selectors.bookingSummary.container);
    this.verifyElementVisibility(this.selectors.bookingSummary.propertyName);
    this.verifyElementVisibility(this.selectors.bookingSummary.total);
  }

  /**
   * Get booking summary details
   * @returns {object} Object containing booking summary information
   */
  getBookingSummary() {
    return {
      propertyName: this.getElementText(this.selectors.bookingSummary.propertyName),
      checkIn: this.getElementText(this.selectors.bookingSummary.checkIn),
      checkOut: this.getElementText(this.selectors.bookingSummary.checkOut),
      guests: this.getElementText(this.selectors.bookingSummary.guests),
      subtotal: this.getElementText(this.selectors.bookingSummary.subtotal),
      taxes: this.getElementText(this.selectors.bookingSummary.taxes),
      total: this.getElementText(this.selectors.bookingSummary.total),
    };
  }

  /**
   * Verify payment form is displayed
   */
  verifyPaymentFormDisplayed() {
    this.verifyElementVisibility(this.selectors.guestInformation.firstName);
    this.verifyElementVisibility(this.selectors.paymentMethod.container);
    this.verifyElementVisibility(this.selectors.actions.completeBookingButton);
  }

  /**
   * Click cancel button
   */
  clickCancel() {
    this.click(this.selectors.actions.cancelButton);
  }

  /**
   * Click back button
   */
  clickBack() {
    this.click(this.selectors.actions.backButton);
  }

  /**
   * Fill complete payment form
   * @param {object} formData - Object containing all form data (guest, payment, address)
   */
  fillCompletePaymentForm(formData) {
    if (formData.guest) {
      this.fillGuestInformation(formData.guest);
    }
    if (formData.paymentMethod) {
      this.selectPaymentMethod(formData.paymentMethod);
    }
    if (formData.payment) {
      this.fillPaymentDetails(formData.payment);
    }
    if (formData.billingAddress) {
      this.fillBillingAddress(formData.billingAddress);
    }
    if (formData.acceptTerms !== false) {
      this.acceptTermsAndConditions();
    }
  }
}

export default PaymentPage;

