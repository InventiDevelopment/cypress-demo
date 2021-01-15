/// <reference types="react-scripts" />

import { Settings } from '../../support/pageObjects/settings';
import { Urls } from '../../support/constants/routs';
import { randomString } from '../../support/helpers';
import { Profile } from '../../support/pageObjects/profile';
import { Editor } from "../../support/pageObjects/editor";
import { Feed } from "../../support/pageObjects/feed";
import { PopularTags } from "../../support/pageObjects/popularTags";
import { Header } from "../../support/pageObjects/header";
import { Endpoints } from "../../support/constants/endpoints";

const userApi = Endpoints.USER_API;
const profileApi = Endpoints.ANY_PROFILE_API;
const settingsPageApi = Urls.SETTINGS_PAGE;
const deleteArticleApi = Endpoints.DELETE_ARTICLE_API;
const articleApi = Endpoints.ARTICLES_API;
const feedApi = Endpoints.FEED_API;

describe('Smoke scenarios suite', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
  });

  // GIVEN I am loged in user on homepage AND I click on "new post "
  // WHEN I fill in mandatory fields of article AND click on "publish"
  // THEN then the new article is saved

  // WHEN I click on delete article
  // THEN delete api responses code 200 and I can't see this article on my profile page
  it('[CD-T10] Add and delete article', () => {
    const title = randomString(7,"")
    Header.clickToAddArticle()
    Editor
      .fillArticleTitle(title)
      .fillArticleDesc(`about ${title}`)
      .fillArticleBody('this post is **important**.')
      .fillArticleTag('**important**')
      .addArticle();
    cy.intercept('DELETE', deleteArticleApi).as('deleteApi')
    Editor.deleteCurrentArticle();
    cy.wait('@deleteApi').then(({response})=>{
      expect(response.statusCode).eq(200)
    })
    Header.clickOnMyAcc();
    cy.contains(`${title}`).should('not.exist')
  })

  // GIVEN I am logged user on homepage
  // WHEN I click on any label
  // THEN I can see list of filtered articles
  it('[CD-T11] Filter articles according to label', () => {
    PopularTags.chooseNthTag(0);
    Feed.getArticlesCount().should('be.gte', 0);
  })
  
  // GIVEN I am registered user on homepage
  // WHEN I loged in and I edit my settings
  // THEN I my settings are eddited and saved.
  it('[CD-T9] Edit my biography', () => {
    var text = randomString(10, '');
    cy.intercept('PUT', userApi).as('users');
    cy.intercept('GET', profileApi).as('profile');
    cy.intercept('GET', articleApi).as('articles');
    cy.intercept('GET', feedApi).as('feed');

    Header.clickOnSettingsBtn();
    cy.urlValidation(settingsPageApi)
    Settings.getBioField().clear();
    Settings
      .fillBio(text)
      .getBioField().invoke('val').then((newBio) => {
        Settings.submitForm();
        cy.wait('@users');
        cy.wait('@feed');
        Header.clickOnMyAcc();
        cy.wait('@profile');
        cy.wait('@articles');
        Profile.getBiography().should('be.visible');
        Profile.getBiography().invoke('text').then((bio) => {
          expect(newBio).to.eq(bio.replace(/ /g, ''));
        });
    });
  });
});
