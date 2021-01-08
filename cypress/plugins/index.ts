/**
 * @type {Cypress.PluginConfig}
 */
import knexFactory = require('knex')
import { join } from 'path'

module.exports = (on, config) => {
  
    // tasks for resetting database during tests
  on('task', {
    cleanDatabase () {
      const filename = join(__dirname, '..', '..', 'server', '.tmp.db')
      const knex = knexFactory({
        client: 'sqlite3',
        connection: {
          filename
        },
        useNullAsDefault: true
      })
      // if we are trying to truncate a non-existing table
      // that is ok - the server API will create them
      const onError = err =>
        err.toString().includes('no such table') ? null : Promise.reject(err)

      // truncates all tables which removes data left by previous tests
      return Promise.all([
        knex('Users')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          ),
        knex('Articles')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          ),
        knex('ArticleTags')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          ),
        knex('Comments')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          ),
        knex('Followers')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          ),
        knex('ArticleFavorites')
          .truncate()
          .catch(err =>
            err.toString().includes('no such table')
              ? undefined
              : Promise.reject(err)
          )
      ])
    },
    registerNewUserIfNeeded () {}
  })
}