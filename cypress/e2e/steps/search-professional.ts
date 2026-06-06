import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import { searchProfessionalPage } from "../pages/search-professional.page";

Given("que estou na página de busca de profissionais", () => {
  searchProfessionalPage.visit();
});

When("submeto a busca sem preencher o campo", () => {
  searchProfessionalPage.submitSearch();
});

Then("devo visualizar a lista com todos os profissionais disponíveis", () => {
  searchProfessionalPage.searchResultSectionShouldBeVisible();
});
