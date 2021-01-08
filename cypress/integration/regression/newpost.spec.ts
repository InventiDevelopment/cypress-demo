describe('New post', () => {
    beforeEach(() => {
      cy.task('cleanDatabase')
      cy.registerUserIfNeeded()
      //cy.login()
    })
  
    it('writes a post', () => {})
})