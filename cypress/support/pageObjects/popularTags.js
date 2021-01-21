const TAG = 'TEST_TAG_';

class PopularTagsPO {
  chooseNthTag(nth) {
    return cy.containsDataId(TAG).eq(nth).click();
  }
}
export const PopularTags = new PopularTagsPO();
