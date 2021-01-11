const usernameId = "TEST_USERNAME"
const emailId = "TEST_EMAIL"
const passwordId = "TEST_PASSWORD"
const submitBtnId = "TEST_SUBMIT_BTN"
const errorMsgId = "TEST_ERROR_MSG"

class RegistrationPage {

    fillUserName(username: string) {
        return cy.getByDataId(usernameId).type(username);
    }

    fillEmail(email: string) {
        return cy.getByDataId(emailId).type(email);
    }

    fillPassword(password: string) {
        return cy.getByDataId(passwordId).type(password);
    }

    signUpBtn() {
        return cy.getByDataId(submitBtnId).click();
    }

    getErrorMsg(item: string) {
        return cy.getByDataId(`TEST_ERROR_${item}`);
    }

}
export const registrationPage = new RegistrationPage();
