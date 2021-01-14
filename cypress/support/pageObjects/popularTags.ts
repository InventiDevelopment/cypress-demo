/// <reference path="../index.d.ts" />
const TAG = "TEST_TAG_"

class PopularTagsPO {

    chooseNthTag(nth: number) {
        return cy.containsDataId(TAG).eq(nth).click();
    }
}
export const PopularTags = new PopularTagsPO();
