const BIO = 'TEST_BIO';

class SettingsPO {

  getBioField() {
    return cy.findByTestId(BIO);
  }

  fillBio(text: string) {
    this.getBioField().type(text)
    return this;
  }
}
export const Settings = new SettingsPO();
