describe("Login Flow", () => {
    it("opens login modal from navbar", () => {
      cy.visit("/");
  
      // Click the hamburger menu
      cy.get(".hamburger").click();
  
      // Click "Log In"
      cy.contains("Log In").click();
  
      // Check for modal heading
      cy.contains("Welcome Back").should("be.visible");
    });
  });
  