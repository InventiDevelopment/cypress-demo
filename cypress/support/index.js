// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';

import { configure } from '@testing-library/cypress'
configure({ testIdAttribute: 'data-testid' });

const apiUrl = Cypress.env('apiUrl');
const user = Cypress._.pick(Cypress.env('user'), 'username', 'email', 'password');

Cypress.Commands.add('containsDataId', (containsDataId) => {
  return cy.get(`[data-testid^='${containsDataId}']`);
});

Cypress.Commands.add('login', (user = Cypress.env('user')) => {
  getLoginToken(user).then((token) => {
    localStorage.setItem('jwt', token);
  });
});

export function getLoginToken(user = Cypress.env('user')) {
  return cy
    .request('POST', `${apiUrl}/users/login`, {
      user: Cypress._.pick(user, ['email', 'password']),
    })
    .its('body.user.token');
}

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

Cypress.Commands.add('urlValidation', (url) => {
  cy.url({ timeout: 60000 }).should('contain', url);
});

Cypress.Commands.add('getByDataIdWithChild', (dataId, child) => {
  cy.get(`[data-testid='${dataId}'] > ${child}`);
});

Cypress.Commands.add('postComment', (url) => {
  getLoginToken(user).then((token) => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/articles/${url}/comments`,
      headers: {
        authorization: `Token ${token}`,
      },
      body: {
        comment: {
          author: `${user.username}`,
          body: 'This is a test.',
        },
      },
    });
  });
});

Cypress.Commands.add('deleteComment', (url, id) => {
  getLoginToken(user).then((token) => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/articles/${url}/comments/${id}`,
      headers: {
        authorization: `Token ${token}`,
      },
    });
  });
});

Cypress.Commands.add('getComments', (url) => {
  cy.request('GET', `${apiUrl}/articles/${url}/comments`);
});
