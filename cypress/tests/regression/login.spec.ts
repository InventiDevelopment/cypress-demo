/// <reference types="Cypress" />

import { Urls } from '../../support/constants/routs';
import { LogIn } from '../../support/pageObjects/login';
import { Endpoints } from '../../support/constants/endpoints';

const login = Endpoints.LOGIN_API;
const user = Cypress._.pick(Cypress.env('user'), 'email', 'password');

describe('Tests on login page', () => {
  beforeEach(() => {
    cy.visit(Urls.LOGIN_PAGE);
  });

  // GIVEN I am registered user on login page
  // WHEN I fill valid e-mail and passworrd into the inputs AND submit the formular
  // THEN I am loged in and I see my feed page
  it('[CD-T6] Fill the login form', () => {
    cy.intercept('POST', login).as('api');
    LogIn.fillEmail(user.email).fillPassword(user.password);
    cy.get('form').submit();
    cy.wait('@api').its('response.statusCode').should('eq', 200);
    cy.url().should('be.eq', Cypress.config().baseUrl + '/');
  });
});
