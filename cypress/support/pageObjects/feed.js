const ARTICLE_PREVIEW = 'TEST_ARTICLE_PREVIEW';
const GLOBAL_FEED_BUTTON = 'TEST_GLOBAL_FEED';
const LIKE_BTN = 'TEST_LIKE_BTN';
const AUTHOR_IMAGE = 'TEST_AUTHOR_IMG';
const AUTHOR = 'TEST_AUTHOR';
const DATE = 'TEST_DATE';
const ARTICLE_TITLE = 'TEST_ARTICLE_TITLE';
const DESCRIPTION = 'TEST_DESCRIPTION';

import { Article } from './article';

class FeedPO {
  getAllArticles() {
    return cy.findAllByTestId(ARTICLE_PREVIEW);
  }
  
  getArticlesCount() {
    return this.getAllArticles().its('length');
  }

  clickGlobalFeedButton() {
    cy.findByTestId(GLOBAL_FEED_BUTTON).click();
    return this;
  }

  clickToArticle(nth) {
    cy.findAllByTestId(ARTICLE_PREVIEW).eq(nth).click()
    return Article;
  }

  getAllTitles() {
    return cy.findAllByTestId(ARTICLE_TITLE);
  }

  getTitle(nth) {
    return cy.findAllByTestId(ARTICLE_TITLE).eq(nth);
  }

  getAllImages() {
    return cy.findAllByTestId(AUTHOR_IMAGE);
  }

  getAllAuthors() {
    return cy.findAllByTestId(AUTHOR);
  }

  getNthAuthor(nth) {
    return cy.findByTestId(AUTHOR).eq(nth);
  }

  getAllBtns() {
    return cy.findAllByTestId(LIKE_BTN);
  }

  getNthLikeBtn(nth) {
    return cy.findAllByTestId(LIKE_BTN).eq(nth);
  }

  clickToLike(nth) {
    return this.getNthLikeBtn(nth).click();
  }

  getAllDates() {
    return cy.findAllByTestId(DATE);
  }
}
export const Feed = new FeedPO();
