
import { randomString } from "../../support/helpers";
import { Header } from "../../support/pageObjects/header";
import { RegistrationForm } from "../../support/pageObjects/registration";
import { Endpoints } from "../../support/constants/endpoints";
import { Urls } from "../../support/constants/routs";

const users = Endpoints.ALL_USERS_API;
const register = Urls.REGISTER_PAGE;

describe('Tests on register page', () => {
  beforeEach(() => {
    cy.visit(register)
  })

  // GIVEN I am not registered user on register page
  // WHEN fill in mandatory values with valid data
  // AND click on Sign up button
  // THEN new user is created
  it('[CD-T12] Register new user', () => {
    const user = randomString(10,'')
    cy.intercept('POST', users).as('users')
    
    RegistrationForm
      .fillUserName(user)
      .fillPassword(`${user}12345`)
      .fillEmail(`${user}@cypress-demo.cz`)
      .signUpBtn()
    cy.wait('@users')
    Header.getUserName(user).should('exist')
  })

  // GIVEN I am not registered user on register page
  // WHEN I click on Sign up button
  // THEN new user is not created and I see error messages
  it('[CD-T13] Register new user negative path', () => {
    RegistrationForm
      .signUpBtn()
      .getErrorMsg('email').should('exist')
    RegistrationForm.getErrorMsg('password').should('exist')
    RegistrationForm.getErrorMsg('username').should('exist')
  })
})
