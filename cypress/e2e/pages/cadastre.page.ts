import { PASSWORD_CRITERIA } from "../../support/constants/messages/cadastre.messages";
import { CADASTRE_SELECTORS } from "../../support/constants/selectors/cadastre.selectors";
import { URLS } from "../../support/constants/urls";
import { RegistrationData } from "../../support/types/cadastre.type";

import { BasePage } from "./base.page";

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

  validateAlertMessage({
    fieldSelector,
    message,
  }: {
    fieldSelector?: string | Array<string>;
    message: string;
  }) {
    if (!fieldSelector) {
      cy.contains(CADASTRE_SELECTORS.alertMessage, message).should(
        "be.visible",
      );
      return;
    }

    const selectors = Array.isArray(fieldSelector)
      ? fieldSelector
      : [fieldSelector];

    let found = false;

    cy.then(() => {
      selectors.forEach((selector) => {
        cy.get(selector)
          .parent()
          .find(CADASTRE_SELECTORS.alertMessage)
          .then(($alerts) => {
            const hasMessage = [...$alerts].some((alert) =>
              alert.textContent?.includes(message),
            );

            if (hasMessage) {
              found = true;
            }
          });
      });
    }).then(() => {
      expect(found, `Alert message "${message}" found`).to.eq(true);
    });
  }

  validatePasswordCriterion({
    criterion,
    stateError = false,
    hasUniqueError = false,
  }: {
    criterion: string;
    stateError?: boolean;
    hasUniqueError?: boolean;
  }) {
    if (hasUniqueError && !stateError) {
      throw new Error(
        "hasUniqueError só pode ser usado quando stateError for true",
      );
    }

    const criterionText = PASSWORD_CRITERIA[criterion];

    const passwordCriterion = cy
      .get(CADASTRE_SELECTORS.passwordCriteria)
      .contains(criterionText)
      .should("be.visible")
      .parent();

    passwordCriterion.find("svg").should(($svg) => {
      const hasError = $svg.attr("fill") === "error";
      expect(hasError, `Criterion "${criterion}" error state`).to.eq(
        stateError,
      );
    });

    if (hasUniqueError) {
      cy.get(CADASTRE_SELECTORS.passwordCriteria)
        .find("svg[fill='error']")
        .should("have.length", 1)
        .parent()
        .contains(criterionText)
        .should("be.visible");
    }
  }

  validateSubmitButtonState(enabled: boolean) {
    const assertion = enabled ? "not.be.disabled" : "be.disabled";
    cy.get(CADASTRE_SELECTORS.submitButton).should(assertion);
  }
}

export const cadastrePage = new CadastrePage();
