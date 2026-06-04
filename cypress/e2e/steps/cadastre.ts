import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

import { cadastrePage } from "../pages/cadastre.page";
import { URLS } from "../../support/constants/urls";


Given("que estou na página de cadastro como uma pessoa não cadastrada", () => {
  cadastrePage.visit();
});

When("preencho todos os campos obrigatórios com dados válidos", () => {
  cadastrePage.fillRegistrationForm({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: "SenhaSegura123!",
  });
});

When("aceito os termos nos checkboxes obrigatórios", () => {
  cadastrePage.acceptTerms();
  cadastrePage.confirmAge();
});

When("submeto o formulário de cadastro", () => {
  cadastrePage.submitCadastre();
});

Then("devo ser redirecionada para a página de confirmação de cadastro", () => {
  cadastrePage.validateUrl(URLS.CADASTRE_CONFIRMATION);
});
