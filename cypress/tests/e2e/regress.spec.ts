
import { randomString } from "../../support/helpers";
import {Header} from "../../support/pageObjects/header";
import {RegistrationForm} from "../../support/pageObjects/registration";

describe('Regress scenarios suite', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  //GIVEN Navigate into SignUp page
  //WHEN fill in mandatory values
  //AND click on Sign up button
  //THEN new user is created
  it('[CD-T12] Register new user', () => {
    const user = randomString(10,"")
    RegistrationForm.fillUserName(user)
    .fillPassword(`${user}12345`)
    .fillEmail(`${user}@cypress-demo.cz`)
    .signUpBtn()
    Header.getUserLink(user).should('exist')
  })

  //GIVEN Navigate into Home page
  //WHEN click on Sign up button
  //THEN new user is not created
  it('[CD-T13] Register new user negative path', () => {
    RegistrationForm.signUpBtn()
    .getErrorMsg('email').should('exist')
    RegistrationForm.getErrorMsg('password').should('exist')
    RegistrationForm.getErrorMsg('username').should('exist')
  })
})
