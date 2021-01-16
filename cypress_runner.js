/// <reference types="Cypress" />



const cypress = require('cypress');
const yargs = require('yargs');


function buildId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const argv = yargs
  .options({
    browser: {
      alias: 'b',
      describe: 'choose browser that you wanna run tests on',
      default: 'chrome',
      choices: ['chrome', 'electron', 'edge', 'firefox'],
    },
    spec: {
      alias: 's',
      describe: 'run test with specific spec file',
      default: 'cypress/tests/',
    },
    mode: {
      alias: 'm',
      describe: 'run test in headless or headed mode',
      default: 'headless',
      choices: ['headless', 'headed'],
    },
    config: {
      alias: 'config',
      describe: 'run test with different configuration',
    },
    env: {
      alias: 'e',
      describe: 'run test with specific enviromental variables',
    },
    record: {
      alias: 'r',
      describe: 'run test with specific record',
    },
    key: {
      alias: 'k',
      describe: 'run test with specific key',
    },
    parallel: {
      alias: 'p',
      describe: 'parallel run',
    },
    ciBuildId: {
      alias: 'ciId',
      describe: 'CI build id',
    },
  })
  .help().argv;

cypress
  .run({
    browser: argv.browser,
    spec: argv.spec,
    headed: argv.mode === 'headed',
    headless: argv.mode === 'headless',
    config: argv.config,
    env: argv.env,
    record: argv.record = 'true',
    key: argv.key = 'cypress_demo',
    parallel: argv.parallel = 'true',
    ciBuildId: argv.ciId = buildId(),
  })
  .then( testResult => {
    console.log(testResult.totalFailed);
    process.exit(testResult.totalFailed);
  })
  .catch((error) => {
    console.error('errors: ', error);
    process.exit(1);
  });
