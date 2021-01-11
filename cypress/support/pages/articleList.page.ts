const articlePreview = "TEST_ARTICLE_PREVIEW"

class ArticleList {

    getAllArticles(): Cypress.Chainable<JQuery<HTMLElement>>  {
        return cy.findAllByTestId(articlePreview);
    }
    
}
export const articles = new ArticleList();