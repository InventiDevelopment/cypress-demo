// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getLoginToken(user: string): Chainable<void>;
    login(): Chainable<void>;
    registerUserIfNeeded(): Chainable<void>;
    findByTestId(dataId: string): Chainable;
    findByAllTestId(dataId: string): Chainable;
    containsDataId(dataId: string): Chainable;
    urlValidation(url: string): Chainer<void>;
  }
}
