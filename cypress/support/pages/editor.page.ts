const articleTitleId = "TEST_ARTICLE_TITLE"
const articleDescId = "TEST_ARTICLE_DESC"
const articleBodyId = "TEST_ARTICLE_BODY"
const articleTagId = "TEST_ARTICLE_TAG"
const articleAddBtnId = "TEST_PUBLISH_ARTICLE"
const articleDelBtnId = "TEST_DELETE_ARTICLE"

class EditorPage {

    fillArticleTitle(articleTitle: string) {
        return cy.getByDataId(articleTitleId).type(articleTitle);
    }
    fillArticleDesc(articleDesc: string) {
        return cy.getByDataId(articleDescId).type(articleDesc);
    }
    fillArticleBody(articleBody: string) {
        return cy.getByDataId(articleBodyId).type(articleBody);
    }
    fillArticleTag(articleTag: string) {
        return cy.getByDataId(articleTagId).type(articleTag);
    }
    addArticle() {
        return cy.getByDataId(articleAddBtnId).click();
    }
    deleteCurrentArticle() {
        return cy.getByDataId(articleDelBtnId).click();
    }
}
export const editor = new EditorPage();
