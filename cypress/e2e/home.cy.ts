describe("Home Page", () => {
    it("loads successfully", () => {
      cy.visit("/");
      cy.contains("Weaver").should("exist"); // replace with actual landing page text
    });
  });
  