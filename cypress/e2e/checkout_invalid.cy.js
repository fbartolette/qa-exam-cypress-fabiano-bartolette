describe("Paiement invalide", () => {
  it("Affiche une erreur si les infos sont invalides", () => {
    cy.intercept("POST", "/api/checkout", {
      statusCode: 400,
      body: { error: "Paiement invalide" }
    }).as("invalidPayment");

    cy.visit("/checkout");

    cy.get("#pay-now").click(); 

    cy.wait("@invalidPayment");

    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Paiement invalide");
  });
});
