/// <reference types="Cypress" />
import { Endpoints } from '../../support/constants/endpoints';
import { Urls } from '../../support/constants/routs';
import { Feed } from '../../support/pageObjects/feed';
import { LogIn } from '../../support/pageObjects/login';
const login = Endpoints.LOGIN_API;

// since we are using Chrome debugger protocol API
// we should only run these tests when NOT in Firefox browser
// see https://on.cypress.io/configuration#Test-Configuration
describe('security tests', { browser: '!firefox' }, () => {
  const goOffline = () => {
    cy.log('**go offline**')
      .then(() => {
        return Cypress.automation('remote:debugger:protocol', {
          command: 'Network.enable',
        });
      })
      .then(() => {
        return Cypress.automation('remote:debugger:protocol', {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: true,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        });
      });
  };

  const goOnline = () => {
    // disable offline mode, otherwise we will break our tests :)
    cy.log('**go online**')
      .then(() => {
        // https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
        return Cypress.automation('remote:debugger:protocol', {
          command: 'Network.emulateNetworkConditions',
          params: {
            offline: false,
            latency: -1,
            downloadThroughput: -1,
            uploadThroughput: -1,
          },
        });
      })
      .then(() => {
        return Cypress.automation('remote:debugger:protocol', {
          command: 'Network.disable',
        });
      });
  };

  const assertOnline = () => {
    return cy.wrap(window).its('navigator.onLine').should('be.true')
  }
  
  const assertOffline = () => {
    return cy.wrap(window).its('navigator.onLine').should('be.false')
  }

  beforeEach(goOnline);
  afterEach(goOnline);
 
  //GIVEN I am a user 
  //WHEN I am in offline mode
  //THEN I still see articles from cache    
  it('[CD-T15]Check articles are visible in offline mode', () => {
    cy.visit('/');
    assertOnline();

    goOffline();
    assertOffline();

    //check the loading text is visible
    Feed.clickGlobalFeedButton().getArticlesCount().should('be.at.least', 1)
  });

  
})