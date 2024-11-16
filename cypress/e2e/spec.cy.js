describe('Login Page Test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    // Test the root redirect to login page is working
    cy.url().should('include', '/login')

    // Enter sample data into the fields
    cy.get('#wallet').type('TestWallet')
    cy.get('#password').type('testPW!')
    cy.get('#api-key').type('demoAPIkey')

    // Verify values were entered correctly
    cy.get('#wallet').should('have.value', 'TestWallet')
    cy.get('#password').should('have.value', 'testPW!')
    cy.get('#api-key').should('have.value', 'demoAPIkey')

    // Test remember me checkbox
    cy.get('#remember').should('be.checked').and('have.value', 'remember')
    cy.get('#remember').uncheck()

    // Try to login
    cy.intercept({
      method: 'POST',
      url: 'https://dev-k8s.treetracker.org/wallet/v2/auth',
    }).as('loginRequest')

    cy.get('#submit').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)

    cy.get(".MuiAlert-message").should('be.visible')

  })
})