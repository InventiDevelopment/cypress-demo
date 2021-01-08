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
import './commands'

const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`)
  })

// creates a user with email and password
// defined in cypress.json environment variables
// if the user already exists, ignores the error
// or given user info parameters
Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
  const defaults = {
    image: 'https://robohash.org/6FJ.png?set=set3&size=150x150',
    // email, password
    ...Cypress.env('user')
  }
  const user = Cypress._.defaults({}, options, defaults)
  cy.request({
    method: 'POST',
    url: `${apiUrl}/api/users`,
    body: {
      user
    },
    failOnStatusCode: false
  })
})
