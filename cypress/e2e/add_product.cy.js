describe("Ajouter un produit au panier", () => {
  it("Ajoute un produit avec succès", () => {
    cy.intercept("POST", "/api/cart/add", {
      statusCode: 200,
      body: { success: true }
    }).as("addProduct");

    cy.visit("/product/1");
    cy.get("#add-to-cart").click();

    cy.wait("@addProduct");

    cy.get("#cart-count")
      .should("be.visible")
      .and("contain", "1");

   cy.get(".item-total")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("10.00 $"); 
      });
  });
});
