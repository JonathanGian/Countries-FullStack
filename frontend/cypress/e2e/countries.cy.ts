import "../support/commands"
import "@testing-library/cypress/add-commands"

/// <reference types="cypress" />

import "../support/commands";
import "@testing-library/cypress/add-commands";


describe("Countries Page", () => {
    beforeEach(() => {
        // Start each test from the countries page
        cy.visit("/countries/all");
    });
    it("should display a list of countries", () => {
        cy.visit("/countries/all");
        cy.findByRole("heading", { name: /countries/i }).should("exist");
          cy.findByRole("list").should("exist");
        });
        it("more than 200 countries are displayed", () => {
            cy.findByRole("link", { name: "Countries"}).click();
            cy.get(".MuiCard-root").should("have.length.greaterThan", 8);
        })
})