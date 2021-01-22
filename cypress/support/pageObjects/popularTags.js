const TAG = 'TEST_TAG_';

class PopularTagsPO {
  chooseNthTag(nth) {
    return this.getNthTag(nth).click();
  }
  getNthTag(nth){
    return cy.get('[data-testid*=TEST_TAG_]').eq(nth);
  }
  getAllTags() {
    return cy.containsDataId(TAG);
  }
}
export const PopularTags = new PopularTagsPO();
