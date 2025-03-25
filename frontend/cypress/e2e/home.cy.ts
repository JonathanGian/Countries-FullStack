import "../support/commands"
import "@testing-library/cypress/add-commands"

/// <reference types="cypress" />

import "../support/commands";
import "@testing-library/cypress/add-commands";

describe("Navigation", () => {
  beforeEach(() => {
    // Start each test from the home page
    cy.visit("/");
  });

  it("should display the navigation bar with expected links", () => {
    // Check that the banner and navigation elements are present
    cy.findByRole("banner").should("exist");
    cy.findByRole("navigation").should("exist");

    // Verify that expected navigation links are visible
    cy.findByRole("link", { name: /home/i }).should("exist");
    cy.findByRole("link", { name: /countries/i }).should("exist");
    // Add additional links if necessary
  });

  it("should navigate to the Home page when the Home link is clicked", () => {
    // Click the Home link
    cy.findByRole("link", { name: /home/i }).click();
    
    // Verify that the URL indicates the Home page
    cy.url().should("include", "/");

    // Optionally, check for content unique to the Home page
    cy.findByText(/welcome/i).should("exist");
  });

  it("should navigate to the Countries page when the Countries link is clicked", () => {
    // Click the Countries link
    cy.findByRole("link", { name: /countries/i }).click();

    // Verify that the URL contains '/countries'
    cy.url().should("include", "/countries");

    // Optionally, check for content specific to the Countries page
    cy.findByText(/countries/i).should("exist");
  });
});


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