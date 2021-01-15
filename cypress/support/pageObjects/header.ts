/// <reference path="../index.d.ts" />
const SIGNUP_BTN = 'TEST_SIGN_UP_BTN';
const ARTICLE_ADD = 'TEST_ADD_ARTICLE';
const SETTINGS = 'TEST_SETTINGS';
const USERNAME_LINK = 'TEST_USERNAME'

import { Feed } from '../pageObjects/feed';
import { Settings } from '../pageObjects/settings';
import { Profile } from './profile';

class HeaderPO {
  clickToSignUp() {
    return cy.findByTestId(SIGNUP_BTN).click();
  }

  getUserName() {
    return cy.findByTestId(USERNAME_LINK).invoke('text');
  }

  clickOnMyAcc() {
    cy.findByTestId(USERNAME_LINK).click();
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
