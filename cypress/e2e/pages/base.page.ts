export abstract class BasePage {
  validateUrl(expectedUrl: string) {
    cy.url().should("include", expectedUrl);
  }
}
