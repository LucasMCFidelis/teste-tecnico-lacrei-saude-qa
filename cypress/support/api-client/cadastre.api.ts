import { API_PATHS } from "../constants/api-paths";
import { RegistrationData } from "../types/cadastre.type";

import { BaseClient } from "./base-client.api";

class CadastreApi extends BaseClient {
  createUser(
    userData: RegistrationData,
  ): Cypress.Chainable<Cypress.Response<any>> {
    return cy.request({
      method: "POST",
      url: `${this.apiUrl}${API_PATHS.CADASTRE}`,
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
      body: {
        accepted_privacy_document: true,
        email: userData.email,
        password1: userData.password,
        password2: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        is_18_years_old_or_more: true,
      },
    });
  }
}

export const cadastreApi = new CadastreApi();
