/// <reference types="cypress"/>

describe("Testing if pages returns 404", () => {
  [
    "/invalidpage",
    "/designsystem/invalidpage",
    "/designsystem/side/invalidpage",
    "/designsystem/side/button/invalid",
  ].forEach((url) => {
    it(`Returns 404: ${url}`, () => {
      cy.visit(url, { failOnStatusCode: false });
      cy.wait(100);
      cy.get("#vk-notFoundId").should("exist");
    });
  });
});

export = {};
