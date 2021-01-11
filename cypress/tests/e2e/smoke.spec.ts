
import {editor} from "../../support/pages/editor.page";
import {feedsPage} from "../../support/pages/feeds.page";
import {randomString} from "../../support/helpers";
import {popularTag} from "../../support/pages/popular.tags.page";

describe('Smoke scenarios suite', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded()
    cy.login()
  })

  //GIVEN Navigate into Home page
  //WHEN choose add article option
  //AND fill in mandatory fields of article
  //AND click on add article btn
  //THEN click on delete article
  //AND delete api ended with response code 200
  it('CD-T10 Add & delete article', () => {
    const title = randomString(7,"")
    feedsPage.clickToAddArticle()
    editor.fillArticleTitle(title)
    editor.fillArticleDesc(`about ${title}`)
    editor.fillArticleBody('this post is **important**.')
    editor.fillArticleTag('**important**')
    editor.addArticle();
    cy.server();
    cy.route('DELETE','/api/articles/**').as('deleteApi')
    editor.deleteCurrentArticle();
    cy.wait('@deleteApi').then(xhr=>{
      expect(xhr.status).eq(200)
    })
  })

  //GIVEN Navigate into Home page
  //WHEN choose some article
  //THEN list of articles contains 20 items
  it('Open article according specific tag', () => {
   popularTag.chooseNthArticle(0)
   feedsPage.getArticlesList().should('have.length',20)
  })
})
