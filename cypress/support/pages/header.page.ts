const signUpBtnId = "TEST_SIGN_UP_BTN"

class HeaderPage {

    clickToSignUp() {
        return cy.getByDataId(signUpBtnId).click();
    }
    getUserLink(username: string) {
        return cy.getByDataId(`TEST_${username}`);
    }
}
export const headerPage = new HeaderPage();
