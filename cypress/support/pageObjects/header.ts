/// <reference path="../index.d.ts" />
const SIGNUP_BTN = "TEST_SIGN_UP_BTN"
const ARTICLE_ADD = "TEST_ADD_ARTICLE"

class HeaderPO {

    clickToSignUp() {
        return cy.findAllByTestId(SIGNUP_BTN).click();
    }
    getUserLink(username: string) {
        return cy.findAllByTestId(`TEST_${username}`);
    }
    clickToAddArticle() {
        return cy.findAllByTestId(ARTICLE_ADD).click();
    }
}
export const Header = new HeaderPO();
