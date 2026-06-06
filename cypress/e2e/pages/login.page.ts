import { LOGIN_SELECTORS } from "../../support/constants/selectors/login.selectors";
import { URLS } from "../../support/constants/urls";
import { LoginData } from "../../support/types/login.type";

import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  visit() {
    cy.visit(URLS.LOGIN);
  }

  fillEmail(email: string) {
    cy.get(LOGIN_SELECTORS.emailInput).clear().type(email);
  }

  fillPassword(password: string) {
    cy.get(LOGIN_SELECTORS.passwordInput).clear().type(password);
  }

  fillLoginForm({ email, password }: LoginData) {
    this.fillEmail(email);
    this.fillPassword(password);
  }

  submitLogin() {
    cy.get(LOGIN_SELECTORS.submitButton).click();
  }

  login(data: LoginData) {
    this.visit();
    this.fillLoginForm(data);
    this.submitLogin();
  }

  loginWithDefaultUser() {
    cy.env(["DEFAULT_USER_EMAIL", "DEFAULT_USER_PASSWORD"]).then((env) => {
      loginPage.login({
        email: env.DEFAULT_USER_EMAIL,
        password: env.DEFAULT_USER_PASSWORD,
      });
    });
  }

  clickCreateAccount() {
    cy.get(LOGIN_SELECTORS.createAccountButton).click();
  }

  validateSubmitButtonState(enabled: boolean) {
    const assertion = enabled ? "not.be.disabled" : "be.disabled";

    cy.get(LOGIN_SELECTORS.submitButton).should(assertion);
  }
}

export const loginPage = new LoginPage();
