// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getLoginToken(user: string): Chainable<void>;
    login(): Chainable<void>;
    registerUserIfNeeded(): Chainable<void>;
    getByDataId(dataId: string): Chainable;
    containsDataId(dataId: string): Chainable;
  }
}
