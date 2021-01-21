const ARTICLE_TITLE = 'TEST_ARTICLE_TITLE';
const ARTICLE_DESC = 'TEST_ARTICLE_DESC';
const ARTICLE_BODY = 'TEST_ARTICLE_BODY';
const ARTICLE_TAG = 'TEST_ARTICLE_TAG';
const ARTICLE_ADD_BTN = 'TEST_PUBLISH_ARTICLE';
const ARTICLE_DEL_BTN = 'TEST_DELETE_ARTICLE';

class EditorPO {
  fillArticleTitle(articleTitle) {
    cy.findByTestId(ARTICLE_TITLE).type(articleTitle);
    return this;
  }
  fillArticleDesc(articleDesc) {
    cy.findByTestId(ARTICLE_DESC).type(articleDesc);
    return this;
  }
  fillArticleBody(articleBody) {
    cy.findByTestId(ARTICLE_BODY).type(articleBody);
    return this;
  }
  fillArticleTag(articleTag) {
    cy.findByTestId(ARTICLE_TAG).type(articleTag);
    return this;
  }
  addArticle() {
    cy.findByTestId(ARTICLE_ADD_BTN).click();
    return this;
  }
  deleteCurrentArticle() {
    cy.findByTestId(ARTICLE_DEL_BTN).click();
    return this;
  }
}

export const Editor = new EditorPO();
