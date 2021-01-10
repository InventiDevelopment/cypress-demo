const articleAddId = "TEST_ADD_ARTICLE"

class YourFeedPage {

    public clickToAddArticle() {
        return cy.getByDataId(articleAddId).click();
    }
}
export const yourFeed = new YourFeedPage();
