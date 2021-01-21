const EMAIL = 'TEST_EMAIL';
const PASSWD = 'TEST_PASSWD';
const ERROR_MSG='TEST_ERROR_';

class SignInPO {
  fillEmail(mail) {
    cy.findByTestId(EMAIL).type(mail)
    return this
  }

  fillPassword(password) {
    cy.findByTestId(PASSWD).type(password, { log: false } );
    return this
  }

  submitForm(){
    cy.get('form').submit();
    return this;
  }

  getErrorMsg() {
    return cy.containsDataId(ERROR_MSG);
  }
}

export const LogIn = new SignInPO();