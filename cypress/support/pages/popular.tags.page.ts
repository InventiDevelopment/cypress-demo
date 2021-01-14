const tagId = "TEST_TAG_"

class PopularTagsPage {

    chooseNthArticle(nth: number) {
        return cy.containsDataId(tagId).eq(nth).click();
    }
}
export const popularTag = new PopularTagsPage();
