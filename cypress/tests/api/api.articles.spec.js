/// <reference types="react-scripts" />

import {Endpoints} from '../../support/constants/endpoints'

const apiUrl = Cypress.env('apiUrl');
const articlesApi = Endpoints.ARTICLES_API;

describe('Articles api tests', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
  });

  // GIVEN I am logged user
  // WHEN execute the /articles API call with defined number of articles (limit values)
  // THEN returns proper number of articles
  it('[CD-T4] Get a list of articles', () => {
    cy.wrap([1, 9, 10, 11, 100]).each((el) => {
      cy.request('GET', `${apiUrl}/articles?limit=${el}&offset=0`).then((xhr) => {
        expect(xhr.status).to.eq(200);
        expect(xhr.body.articles.length).to.eq(el);
        expect(xhr.body.articles[Number(el)-1].title).not.to.be.empty;
      });
    });
  });

  // GIVEN I am logged user with a global list of articles
  // WHEN I pick up the arcicle AND add it to favorites
  // THEN I can see this article in the list of my favourites
  //      and  it will have "favorite" index
  it('[CD-T16] Add article to favorites', { retry: 1 }, () => {
    // pick up the 1st article's slug
    cy.request('GET', `${apiUrl}/articles?limit=10&offset=0`).then((list) => {
      expect(list.status).to.eq(200);
      var slug = list.body.articles[0].slug;

      // make sure the article is not my favorite
      cy.unfavorite(slug);

      // call the first article api and remember a number of favorites
      cy.request('GET', `${apiUrl}/articles/${slug}`).then((article) => {
        expect(article.status).to.eq(200);
        var f1 = article.body.article.favoritesCount;

        // add to favorited and check it's added
        cy.favoriteArticle(slug).then((like) => {
          cy.request('GET', `${apiUrl}/articles/${slug}`);
          var f2 = like.body.article.favoritesCount;
          expect(like.status).to.eq(200);
          expect(like.body.article.favorited).to.be.true;
          expect(f2).to.be.greaterThan(f1);
        });
      });
    });
  });
});