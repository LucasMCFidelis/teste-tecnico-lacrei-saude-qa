import { SEARCH_SELECTORS } from "../../support/constants/selectors/search-professional.selectors";
import { BasePage } from "../pages/base.page";

import { loginPage } from "./login.page";

export class SearchProfessionalPage extends BasePage {
  visit() {
    loginPage.loginWithDefaultUser();
    cy.get(SEARCH_SELECTORS.searchInput).should("be.visible");
  }

  fillSearch(searchTerm: string) {
    cy.get(SEARCH_SELECTORS.searchInput).clear().type(searchTerm);
  }

  submitSearch() {
    cy.get(SEARCH_SELECTORS.searchButton, {timeout: 10000}).should("be.visible").click();
  }

  search(searchTerm: string) {
    this.fillSearch(searchTerm);
    this.submitSearch();
  }

  validateNoResultsMessage(message: string) {
    cy.contains(message).should("be.visible");
  }

  searchResultSectionShouldBeVisible() {
    cy.get(SEARCH_SELECTORS.mainSearchResultSection).should("be.visible");
  }
}

export const searchProfessionalPage = new SearchProfessionalPage();
