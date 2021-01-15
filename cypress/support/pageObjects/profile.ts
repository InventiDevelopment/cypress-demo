const BIO = 'TEST_BIO';

class ProfilePage {
  getBiography() {
    return cy.findByTestId(BIO);
  }
}

export const Profile = new ProfilePage();
