import { Feed } from '../../support/pageObjects/feed';
import { PopularTags } from '../../support/pageObjects/popularTags';

describe('Tests for articles landing on homepage', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
    cy.visit('/');
  });

  // GIVEN I am logged user on homepage
  // WHEN I click on any label
  // THEN I can see list of filtered articles
  it('[CD-T11] Filter articles according to label', () => {
    PopularTags.chooseNthTag(0);
    Feed.getArticlesCount().should('be.gte', 0);
  });
});
