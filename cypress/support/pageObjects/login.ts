const EMAIL = 'TEST_EMAIL';
const PASSWD = 'TEST_PASSWD';

class SignInPO {
  fillEmail(mail: string) {
    cy.findByTestId(EMAIL).type(mail)
    return this
  }

  fillPassword(password: string) {
    cy.findByTestId(PASSWD).type(password, { log: false } );
    return this
  }

  submitForm(){
    cy.get('form').submit();
    return this;
  }
}

export const LogIn = new SignInPO();