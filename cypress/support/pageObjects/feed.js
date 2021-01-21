const ARTICLE_PREVIEW = 'TEST_ARTICLE_PREVIEW';
const GLOBAL_FEED_BUTTON = 'TEST_GLOBAL_FEED';

class FeedPO {
  getAllArticles() {
    return cy.findAllByTestId(ARTICLE_PREVIEW);
  }
  
  getArticlesCount() {
    return this.getAllArticles().its('length');
  }

  clickGlobalFeedButton(){
    cy.findByTestId(GLOBAL_FEED_BUTTON).click();
    return this;
  }
}
export const Feed = new FeedPO();
