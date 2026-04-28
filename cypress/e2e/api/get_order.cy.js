describe("API - Récupérer un achat (GET)", () => {

  it("Valide le retour d'un achat existant", () => {

    // Mock de la réponse GET
    cy.intercept("GET", "/api/orders/123", {
      statusCode: 200,
      body: {
        orderId: 123,
        status: "CONFIRMED",
        total: 89.99,
        items: [
          { id: 1, name: "Produit A", quantity: 2 },
          { id: 2, name: "Produit B", quantity: 1 }
        ]
      }
    }).as("getOrder");

   cy.request("/api/orders/123").as("apiResponse");

  cy.get("@apiResponse").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.orderId).to.eq(123);
      expect(response.body.status).to.eq("CONFIRMED");
      expect(response.body.total).to.eq(89.99);
      expect(response.body.items).to.have.length(2);
    });

    cy.wait("@getOrder");
  });
});
