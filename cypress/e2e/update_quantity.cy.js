describe("Mettre à jour la quantité", () => {
  it("Met à jour la quantité d’un produit", () => {
    cy.intercept("PUT", "/api/cart/update", {
      statusCode: 200,
      body: { success: true }
    }).as("updateQty");

    cy.visit("/cart");
    cy.get("input.quantity").clear().type("3");
    cy.get(".update-btn").click();

    cy.wait("@updateQty");
    cy.get(".item-total").should("exist");

    cy.get("input.quantity")
  .should("have.value", "3");

    cy.get(".item-total")
  .invoke("text")
  .then((text) => {
    expect(text.trim()).to.eq("30.00 $"); 
  });

  });
});
