const BIO = 'TEST_BIO';
const BANNER = 'TEST_PROFILE_BANNER'
const EDIT_BTN = 'TEST_EDIT'

class ProfilePage {
  getBiography() {
    return cy.findByTestId(BIO);
  }

  getBanner() {
    return cy.findByTestId(BANNER);
  }
  getEditBtn() {
    return cy.findByTestId(EDIT_BTN);
  }
  clickToEdit() {
    this.getEditBtn().click()
    return this
  }
}

export const Profile = new ProfilePage();
