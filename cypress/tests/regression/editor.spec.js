import { randomString } from '../../support/helpers';
import { Editor } from '../../support/pageObjects/editor';
import { Header } from '../../support/pageObjects/header';
import { Endpoints } from '../../support/constants/endpoints';

const deleteArticleApi = Endpoints.DELETE_ARTICLE_API;

describe('Tests on editor page', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
    cy.visit('/editor');
  });

  // GIVEN I am loged in user on homepage AND I click on "new post "
  // WHEN I fill in mandatory fields of article AND click on "publish"
  // THEN then the new article is saved
  // WHEN I click on delete article
  // THEN delete api responses code 200 and I can't see this article on my profile page
  it('[CD-T10] Add and delete article [SMOKE]', () => {
    const title = randomString(7, '');
    Header.clickToAddArticle();
    Editor.fillArticleTitle(title)
      .fillArticleDesc(`about ${title}`)
      .fillArticleBody('this post is **important**.')
      .fillArticleTag('**important**')
      .addArticle();
    cy.intercept('DELETE', deleteArticleApi).as('deleteApi');
    Editor.deleteCurrentArticle();
    cy.wait('@deleteApi').then(({ response }) => {
      expect(response.statusCode).eq(200);
    });
    Header.clickOnMyAcc();
    cy.contains(`${title}`).should('not.exist');
  });
});
