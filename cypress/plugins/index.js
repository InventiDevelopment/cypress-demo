/**
 * @type {Cypress.PluginConfig}
 */
//const selectTests = require('cypress-select-tests');
//import '@cypress-select-tests'

module.exports = (on, config) => {
  require('@cypress/react/plugins/react-scripts')(on, config);
  const selectTests = require('cypress-select-tests');
  require('@cypress/code-coverage/task')(on, config);
  on('file:preprocessor', selectTests(config, pickTests));
  return config;
};
const pickTests = (filename, foundTests, config) => {
  console.log('tags', config.env.TEST_TAGS)
  console.log('picking tests from file', filename);
  const tags = config.env.TEST_TAGS =='undefined'?'':config.env.TEST_TAGS.split('-');
  console.log(`found tests with tags - ${config.env.TEST_TAGS}`);
  const containsAll = foundTests.filter((fullTestName) =>
    tags.every((el) => {
      return fullTestName.join(' ').includes(el);
    })
  );
  console.log(containsAll.length);
  return containsAll;
};
