/// <reference types="Cypress" />

const rm = require('rimraf');
const cypress = require('cypress');
const shell = require('shelljs');
const yargs = require('yargs');
const marge = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge');

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
  })
  .help().argv;

rm('cypress/reports/mocha/*.', (error) => {
  if (error) {
    console.error(`Error while removing existing report files: ${error}`);
    process.exit(1);
  }
  console.log('Removing all existing report files successfully!');
});

cypress
  .run({
    browser: argv.browser,
    spec: argv.spec,
    headed: argv.mode === 'headed',
    headless: argv.mode === 'headless',
    config: argv.config,
    env: argv.env,
  }).then(async (testResult) => {
        console.log(process.env.BITBUCKET_BRANCH);
        const generatedReport = await Promise.resolve(
            generateReport({
                files: ['cypress/reports/mocha/*.json'],
                inline: true,
                saveJson: true,
            }),
        );
        process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'
        process.env.BUCKET_NAME = 'drivvn-report';

        //upload report into s3 bucket
        // if (
        //     process.env.BITBUCKET_BRANCH === 'master' ||
        //     process.env.BITBUCKET_BRANCH === 'slack'
        // ) {
            shell.exec('ts-node cypress/slack/s3Upload.ts');

            const AWSBucket = require('s3-bucket-toolkit');

            const bucket = new AWSBucket({
                // accessKeyId: process.env.AWS_ACCESS_ID,
                // secretAccessKey: process.env.AWS_SECRET_KEY,
                accessKeyId: "AKIAIV3EM542W7AYWERA",
                secretAccessKey: "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",
                region: 'eu-west-2',
                bucketACL: 'public-read',
                bucketName: process.env.BUCKET_NAME,
                pagingDelay: 500, // (optional) set a global delay in between s3 api calls, default: 500ms
            });

            //get versionId of uploaded report
            bucket
                .listFileVersions({
                    Key: 'mochawesome-report/mochawesome.html',
                    limit: 2,
                    delay: 10,
                })
                .then(function (response) {
                    let validVersion;
                    let versions = response.Versions;
                    versions.forEach((vers) => {
                        if (vers.IsLatest === true) {
                            validVersion = vers.VersionId;
                        }
                    });
                    process.env.BUCKET_OBJECT_VERSION = validVersion;
                    shell.exec('ts-node cypress/support/slack/index.ts');
                    process.exit(testResult.totalFailed);
                });
        // } else {
        //     process.exit(testResult.totalFailed);
        // }
    })
    .catch((error) => {
        console.error('errors: ', error);
        process.exit(1);
    });

function generateReport(options) {
  return merge(options).then((report) => marge.create(report, options));
}
