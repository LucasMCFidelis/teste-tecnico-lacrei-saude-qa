import { CADASTRE_SELECTORS } from "../../support/constants/cadastre.selectors";
import { URLS } from "../../support/constants/urls";

import { BasePage } from "./base.page";

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CadastrePage extends BasePage {
  visit() {
    cy.visit(URLS.CADASTRE);
  }

  fillFirstName(firstName: string) {
    cy.get(CADASTRE_SELECTORS.firstNameInput).clear().type(firstName);
  }

  fillLastName(lastName: string) {
    cy.get(CADASTRE_SELECTORS.lastNameInput).clear().type(lastName);
  }

  fillEmail(email: string) {
    cy.get(CADASTRE_SELECTORS.emailInput).clear().type(email);
  }

  fillConfirmEmail(email: string) {
    cy.get(CADASTRE_SELECTORS.confirmEmailInput).clear().type(email);
  }

  fillPassword(password: string) {
    cy.get(CADASTRE_SELECTORS.passwordInput).clear().type(password);
  }

  fillConfirmPassword(password: string) {
    cy.get(CADASTRE_SELECTORS.confirmPasswordInput).clear().type(password);
  }

  acceptTerms() {
    cy.get(CADASTRE_SELECTORS.acceptedPrivacyCheckbox).check();
  }

  confirmAge() {
    cy.get(CADASTRE_SELECTORS.is18YearsOldOrMoreCheckbox).check();
  }

  submitCadastre() {
    cy.get(CADASTRE_SELECTORS.submitButton).click();
  }

  clickBack() {
    cy.get(CADASTRE_SELECTORS.backButton).click();
  }

  fillRegistrationForm(data: RegistrationData) {
    this.fillFirstName(data.firstName);
    this.fillLastName(data.lastName);
    this.fillEmail(data.email);
    this.fillConfirmEmail(data.email);
    this.fillPassword(data.password);
    this.fillConfirmPassword(data.password);
  }
}

export const cadastrePage = new CadastrePage();
