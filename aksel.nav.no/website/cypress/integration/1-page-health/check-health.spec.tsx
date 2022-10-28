/// <reference types="cypress"/>

import urls from "../../test-urls.json";

describe("Testing health for all pages", () => {
  urls.forEach((url) => {
    it(`No errorboundary, not 404 and no deprecated components: ${url}`, () => {
      cy.visit(url);
      cy.wait(200);
      cy.get(".vk-errorboundary").should("not.exist");
      cy.get(".should-not-be-found").should("not.exist");
      cy.get("#vk-notFoundId").should("not.exist");
      cy.contains("a", "/[object%20Object]").should("not.exist");
    });
  });
});

export = {};
