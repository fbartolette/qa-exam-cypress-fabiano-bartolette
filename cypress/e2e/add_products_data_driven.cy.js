describe("Ajouter plusieurs produits avec différentes quantités (Data-Driven)", () => {

  beforeEach(() => {
    cy.intercept("POST", "/api/cart/add", {
      statusCode: 200,
      body: { success: true }
    }).as("addProduct");
  });

  it("Ajoute plusieurs produits selon les données de la fixture", () => {
    cy.fixture("products").then((products) => {

      products.forEach((product) => {

        cy.visit(`/product/${product.id}`);

        // Sélection de la quantité
        cy.get("#quantity")
          .clear()
          .type(product.quantity);

        // Ajouter au panier
        cy.get("#add-to-cart").click();

        cy.wait("@addProduct");

        // Validation UI : compteur du panier mis à jour
        cy.get("#cart-count")
          .should("be.visible");

        // Log pour montrer quel produit a été testé
        cy.log(`Produit ajouté : ${product.name} (qty: ${product.quantity})`);
      });
    });
  });
});
