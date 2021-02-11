const ARTICLE_TITLE = 'TEST_TITLE';

class ArticlePO {
    getTitle() {
        return cy.findAllByTestId(ARTICLE_TITLE);
    }
}
export const Article = new ArticlePO();