/**
 * @type {Cypress.PluginConfig}
 */
// import {randomString} from "../support/helpers";

module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config)
    return config
}
