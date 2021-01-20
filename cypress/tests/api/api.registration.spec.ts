/// <reference types="react-scripts" />

const apiUrl = Cypress.env('apiUrl');

describe('Registration api tests', () => {

  // GIVEN I am not registered user
  // WHEN I execute the API  without mandatory value
  // THEN the request status code is 422: Unprocessable Entity and I can see 3 error messages
  it('[CD-T5] Error when create new user with invalid value', () => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/users`,
      failOnStatusCode: false,
      body: {
        user: {
          username: '',
          email: 'test@test.test',
          password: '1234',
        },
      },
    }).then((xhr) => {
      expect(xhr.status).to.eq(422);
      expect(xhr.body.errors.username.length).to.eq(2);
      cy.log('**Error message:** ' + xhr.body.errors.username[0]);
      cy.log('**Error message:** ' + xhr.body.errors.username[1]);
      cy.log('**Error message:** ' + xhr.body.errors.username[2]);
    });
  });
});
