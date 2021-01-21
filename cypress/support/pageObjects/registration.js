const USERNAME = 'TEST_USERNAME';
const EMAIL = 'TEST_EMAIL';
const PASSWORD = 'TEST_PASSWORD';
const SUBMIT = 'TEST_SUBMIT_BTN';

class RegistrationFormPO {
  fillUserName(username) {
    cy.findByTestId(USERNAME).type(username);
    return this;
  }

  fillEmail(email) {
    cy.findByTestId(EMAIL).type(email);
    return this;
  }

  fillPassword(password) {
    cy.findByTestId(PASSWORD).type(password, { log: false });
    return this;
  }

  signUpBtn() {
    cy.findByTestId(SUBMIT).click();
    return this;
  }

  getErrorMsg(item) {
    return cy.findByTestId(`TEST_ERROR_${item}`);
  }
}
export const RegistrationForm = new RegistrationFormPO();
