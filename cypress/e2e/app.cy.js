// cypress/integration/app.spec.js

describe('San Francisco Food Trucks App', () => {
  it('should display the heading "San Francisco Food Trucks"', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('San Francisco Food Trucks').should('exist'); // Assert that the heading exists
  });
});
