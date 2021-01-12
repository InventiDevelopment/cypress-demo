
import {articles} from "../../support/pages/articleList.page";
import {endpoints} from "../../support/constants/endpoints"

const articlesApi = endpoints.articlesApi;

describe('Integration tests - check that articles are loaded correctly from fixture', () => {

  //GIVEN I am a not logged user 
  //AND I land to the base page with articles 
  //WHEN my app gets only x articles from server
  //THEN I can see only x articles on the page
  it('[CD-T7] - checks count of articles vs fixure file', () => {
    cy.intercept('GET', articlesApi, {
        fixture: 'articleList'
      })
    cy.visit('/')
    articles.getAllArticles().should('have.length', 10)
  })

  //GIVEN I am a not logged user 
  //AND I land to the base page with articles 
  //WHEN my app gets no articles from server
  //THEN I can see the special text on the page
  it('[CD-T8] - checks page with no articles', () => {
    cy.intercept('GET', articlesApi, {
        fixture: 'emptyArticleList'
      })
    cy.visit('/')
    articles.getAllArticles().should('have.length', 1)
    articles.getAllArticles().eq(0).should('contain','No articles are here')
  })
})
