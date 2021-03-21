import { Settings } from '../../support/pageObjects/settings';
import { randomString } from '../../support/helpers';
import { Profile } from '../../support/pageObjects/profile';
import { Endpoints } from '../../support/constants/endpoints';
import { Urls } from '../../support/constants/routs';

const settingsUrl = Urls.SETTINGS_PAGE;
const userApi = Endpoints.USER_API;
const profileApi = Endpoints.ANY_PROFILE_API;
const articleApi = Endpoints.ARTICLES_API;
const feedApi = Endpoints.FEED_API;
const user = Cypress._.pick(Cypress.env('user'),'username', 'email', 'password');

describe('Tests on settings page', () => {
  beforeEach(() => {
    cy.registerUserIfNeeded();
    cy.login();
    cy.visit(settingsUrl);
  });

  // GIVEN I am logged user on settings page
  // WHEN I loged in and I edit my settings
  // THEN I my settings are eddited and saved.
  it('[CD-T9] Edit my biography [SMOKE]', { retry: 1 }, () => {
    var text = randomString(10, '');
    cy.intercept('PUT', userApi).as('users');
    cy.intercept('GET', profileApi).as('profile');
    cy.intercept('GET', articleApi).as('articles');
    cy.intercept('GET', feedApi).as('feed');

    // remember the old text and add new one
    Settings.getBioField()
      .invoke('val')
      .then((oldBio) => {
        Settings.getBioField().clear();
        Settings
          .fillBio(text)
          .getBioField()
          .invoke('val')
          .then((newBio) => {
            // check the new text is different
            expect(newBio).not.eq(oldBio);

            Settings.submitForm();
            cy.wait('@users');
            cy.wait('@feed');
            cy.url().should('be.eq', Cypress.config().baseUrl + '/');

            // check text on my profile
            cy.visit(`/@${user.username}`);
            Profile.getEditBtn().should('be.visible');
            Profile.getBiography().should('be.visible');
            Profile.getBiography()
              .invoke('text')
              .then((bio) => {
                expect(newBio).to.eq(bio.replace(/ /g, ''));
              });
          });
      });
  });
});
