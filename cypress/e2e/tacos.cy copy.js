// cypress/integration/search.spec.js

describe('Search functionality', () => {
    it('should search for "tacos"', () => {
      cy.visit('http://localhost:3000/');

      cy.get('input[type="text"]').type('tacos');

      cy.get('input[type="text"]').type('{enter}');

      cy.get('.food-truck-card').should('have.length.greaterThan', 0);
    });
  });
