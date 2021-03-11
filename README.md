# Cypress demo

![Alt text](img/pyramid.png?raw=true "Cypress automation testing pyramid")

Let me introduce you our Cypress Automation Framework for unit, component, integration, api and e2e regression tests we are inventing as a presentation of our automation skills. 
Our framework is universal and easy configurable.

The demo is created for real world React application and shows many best practices on automation field.

We cover the application with couple of different types of tests. Our framework generates nice HTML reports including screenshots, code coverage report, runs are set as part CI/CD delivery in GitLab pipeline.

We are also playing with Sorry Cypress dashboard to make our tests run in parallel and get nice reports including videos and screenshots. 

Our tests are atomic, which means that each test tests only one part of the application in time. They are short, readable and easy maintable. Atomic tests also help to preven flackieness. 
Our tests run independently, which means that we can run each test separately and it doesnt influence any other tests.  Our tests clean their data. That all makes it possible to run them paralelly. 

Test attributes are created by our team directly inside Frontend main repository. Mainly we use already existing id  or data-testid attributes to identify single HTML elements on the page. 

## Scenarios and test coverage 

Test scenarios are written in GEVEN WHEN THEN format and are saved to [Jira] or you can find them as a part of comment before each test.

#### Example of integration test scenario:

***GIVEN*** I am a not logged user

***AND*** I land to the base page with articles

***WHEN*** my app gets no articles from server

***THEN*** I can see the special text on the page

## Tests

For demo purposes we prepared different types of tests to show you what we can cover with Cypress in a really short time (20 MD)

***Component tests*** - visual unit tests for real React/Vue/.. components can test functionality and design of your components separately as well as unit tests test different functions od your app
***API tests*** - better solution is to use some special framework like JEST. But Cypress can manage API tests in a really cool way too. We can test xhr requests, responces and schemas directly from Cypress
***Integration tests*** - tests based on mock data from fixure files allows you to test main app functionality with known data set. It is important to avoid flaky tests.
***E2E tests*** - regression/smoke - high power tests that cover your code in the most efficient way.
***Security test*** - e2e regression tests that help to check your app from security point of view, e.g. app behaivior in offline mode or robot attack to input form test.
***Visual regression tests*** - TBD - tests that are based on screenshots comparation with help of third party tool like Percy.io is. Tests can help you to be sure that design of your app or components is stable.


## CI/CD

Gitlab pipeline is set as a part of CI/CD delivery. We run all our tests right after every commit. There are 3 jobs:

Run tests with destop viewport in Chrome
Run tests with mobile viewport in Chrome
Run tests with desktop viewport in Firefox

Jobs are run in parallel. We can add more jobs with different configuration here.

We can also categorise our tests to be able to run only one special set of the tests on demand. For example [SMOKE], [SECURITY], [VISUAL]

![Alt text](img/pipeline.png?raw=true "CI/CD pipeline")

## Reports

You can download HTML report including videos of failed tests from jobs artifacts.

![Alt text](img/report.png?raw=true "Cypress Mochawesome HTML report")

## Cypress dashboard (sorry-cypress)
In our repo we have predefined configuration for [sorry-cypress dashboard](https://sorry-cypress.dev/) which is a very interesting plugin in cypress community for live monitoring of executed test suites.

![Alt text](img/sorry.png?raw=true "Cypress dashboard")
![Alt text](img/sorry2.png?raw=true "Cypress dashboard")

## Code Coverage

The react app is instumented by us, so it allows us to properly follow the code coverage of it. You can download code coverage reports from job artifacts.

![Alt text](img/codecoverage.png?raw=true "Cypress code coverage of app")

## Installation

Use the npm to install all dependencies

```bash
npm i
```

## Run tests locally

```python
npm start # to build and run local app

npm run cypress:open # to run cypress in dubug mode and play with tets
npm run test:ci # to run tests in Chrome with in headless mode
npm run test:ci:mobile # to run tests in Chrome with moble viewport in headless mode 
test:ci:firefox # to run tests in Firefox in headless mode 
```

## Sorry cypress integration 
Run sorry-cypress dashboard locally: 
```python
   docker-compose -f docker-compose.minio.yml up 
```
For execution parallel tests run command:
```python
   cypress run --record --key cypress_demo --parallel --ci-build-id $CI_CONCURRENT_ID   
```
For integration with some cloud platform follow [https://sorry-cypress.dev/](https://sorry-cypress.dev/)
Remove html reports storing from ***.gitlab-ci.yml*** and set ***cypress.json*** file according [https://github.com/sorry-cypress/sorry-cypress/blob/master/example/cypress.json](https://github.com/sorry-cypress/sorry-cypress/blob/master/example/cypress.json)

## INVENTI Developers 
Oxana ŠAMANINA, Miroslav VRANKA, Jana ŠUMBEROVÁ