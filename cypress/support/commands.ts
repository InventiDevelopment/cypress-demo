// import "@testing-library/cypress/add-commands";
const apiUrl = Cypress.env('apiUrl')

declare global {
    namespace Cypress {
        interface Greeting {
            greeting: string;
            name: string;
        }

        interface Chainable {
            /**
             * Yields "foo"
             *
             * @returns {typeof foo}
             * @memberof Chainable
             * @example
             *    cy.foo().then(f = ...) // f is "foo"
             */
            foo: typeof foo;
            foo2: typeof foo2;

            getLoginToken(user: string): Chainable<void>;
            login(): Chainable<void>;
            registerUserIfNeeded(): Chainable<void>;
            getByDataId(dataId: string): Chainable<Element>;
            /**
             * Yields sum of the arguments.
             *
             * @memberof Cypress.Chainable
             *
             * @example
             * ```
             * cy.sum(2, 3).should('equal', 5)
             * ```
             */
            sum: (a: number, b: number) => Chainable<number>;

            /**
             * Example command that passes an object of arguments.
             * @memberof Cypress.Chainable
             * @example
             * ```
             * cy.greeting({ greeting: 'Hello', name: 'Friend' })
             * // or use defaults
             * cy.greeting()
             * ```
             */
            greeting: (options?: Greeting) => void;
        }
    }
}


/**
 * An example function "getByDataId()"
 *
 * @returns {string} "foo"
 * @example
 *    foo() // "foo"
 */
export function getByDataId(dataId: string) {
    return cy.get(`[data-testid='${dataId}']`)
}

/**
 * Uses another custom command `cy.foo()` internally.
 *
 * @returns {string} "foo"
 * @example cy.foo() // "foo"
 */
export function foo2() {
    return cy.foo()
}

/**
 * Adds two numbers
 * @example sum(2, 3) // 5
 */
export function sum(a: number, b: number): number {
    return a + b
}

const defaultGreeting: Cypress.Greeting = {
    greeting: 'hi',
    name: 'there'
}

/**
 * Prints a custom greeting.
 * @example printToConsole({ greeting: 'hello', name: 'world' })
 */
export const printToConsole = (options = defaultGreeting) => {
    const {greeting, name} = options
    console.log(`${greeting}, ${name}`)
}

// add commands to Cypress like "cy.foo()" and "cy.foo2()"
Cypress.Commands.add('getByDataId', getByDataId)
Cypress.Commands.add('foo2', foo2)
Cypress.Commands.add('sum', sum)
Cypress.Commands.add('greeting', printToConsole)



// a custom Cypress command to login using XHR call
// and then set the received token in the local storage
// can log in with default user or with a given one
Cypress.Commands.add('login', (user = Cypress.env('user')) => {
    cy.getLoginToken(user).then(token => {
        localStorage.setItem('jwt', token)
        // with this token set, when we visit the page
        // the web application will have the user logged in
    })

    cy.visit('/')
    cy.getByDataId("TEST_GLOBAL_FEED").should('be.visible')
})

// custom Cypress command to simply return a token after logging in
// useful to perform authorized API calls
Cypress.Commands.add('getLoginToken', (user = Cypress.env('user')) => {
    return cy
        .request('POST', `${apiUrl}/api/users/login`, {
            user: Cypress._.pick(user, ['email', 'password'])
        })
        .its('body.user.token')
        .should('exist')
})

// creates a user with email and password
// defined in cypress.json environment variables
// if the user already exists, ignores the error
// or given user info parameters
Cypress.Commands.add('registerUserIfNeeded', (options = {}) => {
    const defaults = {
        image: 'https://robohash.org/6FJ.png?set=set3&size=150x150',
        // email, password
        ...Cypress.env('user')
    }
    const user = Cypress._.defaults({}, options, defaults)
    cy.request({
        method: 'POST',
        url: `${apiUrl}/api/users`,
        body: {
            user
        },
        failOnStatusCode: false
    })
})

/**
 * Dispatches a given Redux action straight to the application
 */
Cypress.Commands.add('dispatch', action => {
    expect(action)
        .to.be.an('object')
        .and.to.have.property('type')
    cy.window()
        .its('store')
        .invoke('dispatch', action)
})

