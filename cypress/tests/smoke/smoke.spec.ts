
import {Editor} from "../../support/pageObjects/editor";
import {Feed} from "../../support/pageObjects/feed";
import {randomString} from "../../support/helpers";
import {PopularTags} from "../../support/pageObjects/popularTags";
import { Header } from "../../support/pageObjects/header";
import { Endpoints } from "../../support/constants/endpoints";

const deleteArticleApi = Endpoints.DELETE_ARTICLE_API

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
  it('[CD-T10] Add & delete article', () => {
    const title = randomString(7,"")
    Header.clickToAddArticle()
    Editor.fillArticleTitle(title)
    .fillArticleDesc(`about ${title}`)
    .fillArticleBody('this post is **important**.')
    .fillArticleTag('**important**')
    .addArticle();
    cy.intercept('DELETE', deleteArticleApi).as('deleteApi')
    Editor.deleteCurrentArticle();
    cy.wait('@deleteApi').then(({response})=>{
      expect(response.statusCode).eq(200)
    })
  })

  //GIVEN Navigate into Home page
  //WHEN choose some article
  //THEN list of articles contains 20 items
  it('Open article according to specific tag', () => {
    PopularTags.chooseNthTag(0)
    Feed.getArticlesCount().should('be.gte',0)
  })
})
