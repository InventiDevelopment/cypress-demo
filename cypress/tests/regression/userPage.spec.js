import { Feed } from '../../support/pageObjects/feed';
import { Endpoints } from '../../support/constants/endpoints';

const user = Cypress._.pick(Cypress.env('user'), 'username', 'email', 'password');
const feed = Endpoints.FEED_API;
const articles = Endpoints.ARTICLES_API;
const data = [
  { url: '/', api: feed },
  { url: `/@${user.username}`, api: articles },
  { url: `/@${user.username}/favorites`, api: articles }
];

data.forEach((item) => {

  describe('Tests for all articles feed on ' + `${item.url}`, () => {
    beforeEach(() => {
      cy.registerUserIfNeeded();
      cy.login();
      cy.visit(item.url);
      cy.intercept('GET', item.api).as('api');
      cy.wait('@api')
    });

    // GIVEN I am logged user on homepage
    // WHEN I click on global feed link
    // THEN I can see all article previews properly
    it('[CD] Check article preview', () => {
      Feed.getAllImages().each(($el) => {
        cy.wrap($el).should('be.visible');
      });
      Feed.getAllAuthors().each(($el) => {
        cy.wrap($el).should('be.visible');
      });
      Feed.getAllDates().each(($el) => {
        cy.wrap($el).should('be.visible');
      });
      Feed.getAllTitles().each(($el) => {
        cy.wrap($el).should('be.visible');
      });
      Feed.getAllArticles().each(($el) => {
        cy.wrap($el).find('.preview-link').should('be.visible');
      });
    });

    // GIVEN I am logged user on homepage
    // WHEN I click on any article preview
    // THEN I am navigated to article page
    it('[CD] Click to article', () => {
      Feed.getTitle(0).invoke('text').then((text1) => {
        Feed.clickToArticle(0).getTitle().then((text2) => {
          expect(text1).to.eq(text2.text())
        })
      })
    });
  });
});
