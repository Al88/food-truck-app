// cypress/integration/search.spec.js

describe('Search functionality', () => {
    it('should search for "tacos"', () => {
      cy.visit('http://localhost:3000/');

      cy.get('input[type="text"]').type('tacos');

      cy.get('input[type="text"]').type('{enter}');

      cy.get('.food-truck-card').should('have.length.greaterThan', 0);
    });
    it('should not find results in search for Colombian food', () => {
      cy.visit('http://localhost:3000/');

      cy.get('input[type="text"]').type('colombia');

      cy.get('input[type="text"]').type('{enter}');

      cy.get('.food-truck-card').should('have.length', 0);
    });
  });
