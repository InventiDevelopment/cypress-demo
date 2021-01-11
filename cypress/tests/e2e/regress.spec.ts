
import {editor} from "../../support/pages/editor.page";
import {feedsPage} from "../../support/pages/feeds.page";
import {randomString} from "../../support/helpers";
import {popularTag} from "../../support/pages/popular.tags.page";
import {headerPage} from "../../support/pages/header.page";
import {registrationPage} from "../../support/pages/registration.page";

describe('Regress scenarios suite', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  //GIVEN Navigate into SignUp page
  //WHEN fill in mandatory values
  //AND click on Sign up button
  //THEN new user is created
  it('CD-T12 Register new user', () => {
    const user = randomString(10,"")
    registrationPage.fillUserName(user)
    registrationPage.fillPassword(`${user}12345`)
    registrationPage.fillEmail(`${user}@babis.cz`)
    registrationPage.signUpBtn()
    headerPage.getUserLink(user).should('exist')
  })

  //GIVEN Navigate into Home page
  //WHEN click on Sign up button
  //THEN new user is not created
  it('CD-T13 Register new user negative path', () => {
    registrationPage.signUpBtn()
    registrationPage.getErrorMsg('email').should('exist')
    registrationPage.getErrorMsg('password').should('exist')
    registrationPage.getErrorMsg('username').should('exist')
  })
})
