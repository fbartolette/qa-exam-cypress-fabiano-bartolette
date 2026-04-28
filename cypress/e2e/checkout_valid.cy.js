describe("Checkout valide avec plusieurs types de cartes", () => {

  beforeEach(() => {
    cy.intercept("POST", "/api/checkout", {
      statusCode: 200,
      body: { status: "CONFIRMED" }
    }).as("checkout");
  });

  it("Complète le paiement avec différentes cartes", () => {
    cy.fixture("cards").then((cards) => {

      cards.forEach((card) => {

        cy.visit("/checkout");

        // Adresse valide
        cy.get("#address").clear().type("123 Rue Test");

        // Données de carte provenant de la fixture
        cy.get("#card-number").clear().type(card.number);
        cy.get("#expiry").clear().type(card.expiry);
        cy.get("#cvv").clear().type(card.cvv);

        cy.get("#pay-now").click();
        cy.wait("@checkout");

        // Validation UI
        cy.get(".confirmation")
          .should("be.visible")
          .and("contain", "Merci pour votre achat");

        // Log dans Cypress pour montrer la carte utilisée
        cy.log(`Paiement validé avec : ${card.type}`);
      });
    });
  });
});
