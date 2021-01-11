const articleAddId = "TEST_ADD_ARTICLE"
const articleId = "TEST_ARTICLE_"

class FeedsPage {

    clickToAddArticle() {
        return cy.getByDataId(articleAddId).click();
    }
    getArticlesList() {
        return cy.containsDataId(articleId);
    }
}
export const feedsPage = new FeedsPage();
