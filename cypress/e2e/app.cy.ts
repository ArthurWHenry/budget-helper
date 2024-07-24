describe("App", (): void => {
  it("should display the app", (): void => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });

  it("should display the app", (): void => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });

  it("should have a header with the correct text", (): void => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").should("contain", "Budget Helper");
  });
});
