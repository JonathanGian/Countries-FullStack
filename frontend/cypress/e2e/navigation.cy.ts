/// <reference types="cypress" />

import "../support/commands"
import "@testing-library/cypress/add-commands"

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

describe("Navigation - Responsive Behavior", () => {
  it("should display a hamburger menu on small screens", () => {
    // Adjust the viewport to simulate a mobile device
    cy.viewport("iphone-6");
    cy.visit("/");

    // Assume that on mobile a button with accessible name 'menu' is rendered
    cy.findByRole("button", { name: /menu/i }).should("exist");
  });

  it("should not display a hamburger menu on desktop screens", () => {
    // Set a desktop viewport
    cy.viewport(1280, 800);
    cy.visit("/");

    // The hamburger menu should not be present on larger screens
    cy.findByRole("button", { name: /menu/i }).should("not.exist");
  });
});

describe("Navigation - Active Link and Authentication State", () => {
  it("should highlight the active link for the current page", () => {
    cy.visit("/");
    // Assuming that the active link receives a class 'active'
    cy.findByRole("link", { name: /home/i })
      .should("have.class", "active");
  });

  it("should display a login button when not authenticated", () => {
    // For an unauthenticated user, expect a Login button to be visible
    cy.visit("/");
    cy.findByRole("button", { name: /login/i }).should("exist");
  });

  it("should display a logout button when authenticated", () => {
    // This test assumes that you have a way to simulate a logged-in state.
    // For example, you might set a cookie or local storage item, or visit a special route.
    // Below is an example that sets a local storage flag.
    cy.window().then((win) => {
      win.localStorage.setItem("auth", "true");
    });
    cy.visit("/");

    // Now the navigation should show a Logout button
    cy.findByRole("button", { name: /logout/i }).should("exist");

    // Optionally, clicking Logout should clear the auth state.
    cy.findByRole("button", { name: /logout/i }).click();
    cy.window().then((win) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(win.localStorage.getItem("auth")).to.be.null;
      });
  });
});