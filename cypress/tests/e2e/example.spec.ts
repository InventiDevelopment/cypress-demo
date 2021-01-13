
import {editor} from "../../support/pages/editor.page";
import {yourFeed} from "../../support/pages/your.feed.page";
import {randomString} from "../../support/helpers";

describe('My First Test', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded()
    cy.login()
  })

  it('writes a post', () => {
    const title = randomString(7,"")
    yourFeed.clickToAddArticle()
    editor.fillArticleTitle(title)
    editor.fillArticleDesc(`about ${title}`)
    editor.fillArticleBody('this post is **important**.')
    editor.fillArticleTag('**important**')
    editor.addArticle();
  })
})
