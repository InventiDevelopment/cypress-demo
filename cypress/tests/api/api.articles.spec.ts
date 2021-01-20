/// <reference types="react-scripts" />

const apiUrl = Cypress.env('apiUrl');

describe('Articles api tests', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
  });
  
  // GIVEN I am unlogged user
  // WHEN execute the API call /articles?limit=10&offset=0
  // THEN returns 10 articles
  it('[CD-T4] Get a list of articles', () => {
    cy.request('GET', `${apiUrl}/articles?limit=10&offset=0`).then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.body.articles.length).to.eq(10);
      expect(xhr.body.articles[0].title).not.to.be.empty;
    });
  });
});
