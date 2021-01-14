/// <reference path="../index.d.ts" />
const USERNAME = "TEST_USERNAME"
const EMAIL = "TEST_EMAIL"
const PASSWORD = "TEST_PASSWORD"
const SUBMIT = "TEST_SUBMIT_BTN"
const ERROR_MSG = "TEST_ERROR_MSG"

class RegistrationFormPO {

    fillUserName(username: string) {
        cy.findAllByTestId(USERNAME).type(username)
        return this
    }

    fillEmail(email: string) {
        cy.findAllByTestId(EMAIL).type(email)
        return this
    }

    fillPassword(password: string) {
        cy.findAllByTestId(PASSWORD).type(password)
        return this
    }

    signUpBtn() {
        cy.findAllByTestId(SUBMIT).click()
        return this
    }

    getErrorMsg(item: string) {
        return cy.findAllByTestId(`TEST_ERROR_${item}`)
    }

}
export const RegistrationForm = new RegistrationFormPO();
