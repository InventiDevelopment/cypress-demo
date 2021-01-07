/// <reference path="../support/index.d.ts" />

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('/')
    expect(true).to.equal(true)
  })
})