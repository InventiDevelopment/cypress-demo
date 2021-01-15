/// <reference path="../index.d.ts" />
const ARTICLE_PREVIEW = 'TEST_ARTICLE_PREVIEW';

class FeedPO {
  getAllArticles() {
    return cy.findAllByTestId(ARTICLE_PREVIEW);
  }
  
  getArticlesCount() {
    return this.getAllArticles().its('length');
  }
}
export const Feed = new FeedPO();
