describe("Supprimer un produit du panier", () => {
  it("Supprime un produit avec succès", () => {
    cy.intercept("DELETE", "/api/cart/remove/*", {
      statusCode: 200,
      body: { success: true }
    }).as("removeProduct");

    cy.visit("/cart");
    cy.get(".remove-item").first().click();

    cy.wait("@removeProduct");
    cy.get(".cart-item").should("have.length", 0);
  });
});
