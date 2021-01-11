import "@testing-library/cypress/add-commands";
const apiUrl = Cypress.env('apiUrl');

declare global {
  interface Chainable {
    getLoginToken(user: string): Chainable<void>;
    login(): Chainable<void>;
    registerUserIfNeeded(): Chainable<void>;
    getByDataId(dataId: string): Chainable;
    containsDataId(dataId: string): Chainable;
  }
}

export function getByDataId(dataId: string) {
  return cy.get(`[data-testid='${dataId}']`);
}

export function containsDataId(dataId: string) {
  return cy.get(`[data-testid^='${dataId}']`);
}

Cypress.Commands.add('getByDataId', getByDataId);
Cypress.Commands.add('containsDataId', containsDataId);


Cypress.Commands.add('login', (user = Cypress.env('user')) => {
  cy.getLoginToken(user).then((token) => {
    localStorage.setItem('jwt', token);
  });

  cy.visit('/');
  cy.getByDataId('TEST_GLOBAL_FEED').should('be.visible');
});

Cypress.Commands.add('getLoginToken', (user = Cypress.env('user')) => {
  return cy
    .request('POST', `${apiUrl}/users/login`, {
      user: Cypress._.pick(user, ['email', 'password']),
    })
    .its('body.user.token')
    .should('exist');
});

Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
  const defaults = {
    image: 'https://robohash.org/6FJ.png?set=set3&size=150x150',
    // email, password
    ...Cypress.env('user'),
  };
  const user = Cypress._.defaults({}, options, defaults);
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/users`,
    body: {
      user,
    },
    failOnStatusCode: false,
  });
});
