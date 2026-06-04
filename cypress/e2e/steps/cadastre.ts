import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

import { cadastrePage } from "../pages/cadastre.page";
import { URLS } from "../../support/constants/urls";
import { cadastreApi } from "../../support/api-client/cadastre.api";
import { CADASTRE_MESSAGES } from "../../support/constants/messages/cadastre.messages";
import { CADASTRE_SELECTORS } from "../../support/constants/selectors/cadastre.selectors";

Given("que estou na página de cadastro como uma pessoa não cadastrada", () => {
  cadastrePage.visit();
});

Given("existe uma conta cadastrada com o e-mail {string}", (email: string) => {
  cadastreApi
    .createUser({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email,
      password: "SenhaSegura123!",
    })
    .then((response) => {
      expect([201, 409]).to.include(response.status);
    });
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

When(
  "preencho os campos {string} e {string} com {string}",
  (field: string, fieldConfirm: string, value: string) => {
    cadastrePage.fillEmail(value);
    cadastrePage.fillConfirmEmail(value);
  },
);

When(
  "preencho o campo {string} com um e-mail em formato inválido",
  (field: string) => {
    cadastrePage.fillEmail("email-invalido");
  },
);

When("preencho o campo Confirmação de e-mail com um valor diferente", () => {
  cadastrePage.fillConfirmEmail(faker.internet.email());
});

When("preencho o campo Confirme sua senha com um valor diferente", () => {
  cadastrePage.fillConfirmPassword("SenhaDiferente123!");
});

When("aceito apenas o checkbox de idade mínima", () => {
  cadastrePage.confirmAge();
});

When("aceito apenas os termos de uso e privacidade", () => {
  cadastrePage.acceptTerms();
});

When("submeto o formulário de cadastro", () => {
  cadastrePage.submitCadastre();
});

Then("devo permanecer na página de cadastro", () => {
  cadastrePage.validateUrl(URLS.CADASTRE);
});

Then("devo ser redirecionada para a página de confirmação de cadastro", () => {
  cadastrePage.validateUrl(URLS.CADASTRE_CONFIRMATION);
});

Then(
  "devo visualizar uma mensagem informando que o e-mail já está em uso",
  () => {
    cadastrePage.validateAlertMessage({
      message: CADASTRE_MESSAGES.emailInUse,
    });
  },
);

Then("devo visualizar a mensagem de e-mail inválido no campo E-mail", () => {
  cadastrePage.validateAlertMessage({
    fieldSelector: CADASTRE_SELECTORS.emailLabel,
    message: CADASTRE_MESSAGES.emailInvalid,
  });
});

Then(
  "devo visualizar uma mensagem informando que os e-mails não coincidem",
  () => {
    cadastrePage.validateAlertMessage({
      fieldSelector: CADASTRE_SELECTORS.confirmEmailLabel,

      message: CADASTRE_MESSAGES.emailMismatch,
    });
  },
);

Then(
  "devo visualizar uma mensagem informando que as senhas não coincidem",
  () => {
    cadastrePage.validateAlertMessage({
      fieldSelector: CADASTRE_SELECTORS.confirmPasswordLabel,

      message: CADASTRE_MESSAGES.passwordMismatch,
    });
  },
);

Then("o botão de submeter o formulário deve estar desabilitado", () => {
  cadastrePage.validateSubmitButtonState(false);
});
