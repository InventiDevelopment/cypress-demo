**Sorry cypress integration**
- Run sorry-cypress dashboard locally: 
   - docker-compose -f docker-compose.minio.yml up 
- For execution parallel tests run command:
    - cypress run --record --key cypress_demo --parallel --ci-build-id $CI_CONCURRENT_ID   
- For integration with some cloud platform follow https://sorry-cypress.dev/
-  Remove html reports storing from .gitlab-ci.yml and set cypress.json file according:
    - https://github.com/sorry-cypress/sorry-cypress/blob/master/example/cypress.json
    
