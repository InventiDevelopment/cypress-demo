/// <reference path="../index.d.ts" />
const SIGNUP_BTN = 'TEST_SIGN_UP_BTN';
const ARTICLE_ADD = 'TEST_ADD_ARTICLE';
const SETTINGS = 'TEST_SETTINGS';

import { Feed } from '../pageObjects/feed';
import { Settings } from '../pageObjects/settings';
import { Profile } from './profile';

class HeaderPO {
  clickToSignUp() {
    return cy.findAllByTestId(SIGNUP_BTN).click();
  }

  getUserName(user) {
    return cy.contains(`${user}`);
  }

  clickOnMyAcc(user) {
    this.getUserName(user).click();
    return Profile;
  }

  getArticleBtn() {
    return cy.findByTestId(ARTICLE_ADD);
  }

  clickToAddArticle() {
    this.getArticleBtn().click();
    return Feed;
  }

  getSettingsBtn() {
    return cy.findByTestId(SETTINGS);
  }

  clickOnSettingsBtn() {
    this.getSettingsBtn().click();
    return Settings;
  }
}

export const Header = new HeaderPO();
