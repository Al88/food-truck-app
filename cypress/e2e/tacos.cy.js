// cypress/integration/search.spec.js

describe('Search functionality', () => {
    it('should search for "tacos"', () => {
      cy.visit('http://localhost:3000/'); // Ajusta la URL según corresponda

      // Buscar el campo de búsqueda y escribir "tacos"
      cy.get('input[type="text"]').type('tacos');

      // Hacer clic en el botón de búsqueda (si lo tienes) o simular la pulsación de Enter
      // Dependiendo de cómo esté implementado tu botón de búsqueda
      // Por ejemplo, si tienes un botón de búsqueda con clase ".search-button":
      // cy.get('.search-button').click();
      // En este ejemplo, simulamos la pulsación de Enter
      cy.get('input[type="text"]').type('{enter}');

      // Verificar que se muestran resultados relacionados con "tacos"
      cy.get('.food-truck-card').should('have.length.greaterThan', 0);
    });
  });
