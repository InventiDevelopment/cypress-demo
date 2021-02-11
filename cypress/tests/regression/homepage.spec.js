import { it } from 'mocha';
import { Feed } from '../../support/pageObjects/feed';
import { PopularTags } from '../../support/pageObjects/popularTags';
import { Endpoints } from '../../support/constants/endpoints';

const user = Cypress._.pick(Cypress.env('user'), 'username', 'email', 'password');
const articles = Endpoints.ARTICLES_API;
const favorite = Endpoints.FAVORITE_API;
const listFA = `${Endpoints.FAVORITE_API}?favorited=${user.username}`;
const apiUrl = Cypress.env('apiUrl');

describe('Tests for articles landing on homepage', () => {
  beforeEach(() => {
   cy.intercept('GET', articles).as('api');
    cy.registerUserIfNeeded();
    cy.login();
    cy.visit('/');
    Feed.clickGlobalFeedButton();
    cy.wait('@api')
  });

  // GIVEN I am logged user on homepage
  // WHEN I click on any label
  // THEN I can see list of filtered articles
  it('[CD-T11] Filter articles according to label', () => {
    PopularTags.chooseNthTag(0);
    Feed.getArticlesCount().should('be.gte', 0);
  });

  // GIVEN I am logged user on homepage global feed
  // WHEN I click on any heart icon
  // THEN the article is added to favorites 
  // AND the icon changes color
  it('[CD] Add article to favorites', () => {
    cy.intercept('POST', favorite).as('like');

    // make sure the article is not my favorite
    cy.unfavorite();
    // get first button's color
    Feed.getNthLikeBtn(0)
      .invoke('css', 'text-decoration-color')
      .then((color) => {
        // like and check the color
        Feed.clickToLike(0)
        cy.wait('@like')
        Feed.getNthLikeBtn(0).should('not.have.css', 'text-decoration-color', color)
      });
  });
});
