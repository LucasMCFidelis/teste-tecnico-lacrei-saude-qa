import { randomUUID } from "crypto";

import puppeteer from "puppeteer";

import { CADASTRE_SELECTORS } from "../cypress/support/constants/selectors/cadastre.selectors.js";

import { CONFIG } from "./config.js";
import { ResultadoCarga } from "./result-test.interface.js";
import { runWithConcurrency } from "./run-with-concurrency.js";

async function executarCadastro(id: number) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const resultado: ResultadoCarga = {
    usuario: id,
    fluxo: "Cadastro",
  };

  const email = `qa-${Date.now()}-${randomUUID()}@mailinator.com`;

  try {
    const inicio = Date.now();
    const urlCadastro = `${CONFIG.baseUrl}saude/paciente/cadastrar`;

    await page.goto(urlCadastro, {
      waitUntil: "networkidle2",
    });

    await page.waitForSelector(CADASTRE_SELECTORS.firstNameInput, {
      timeout: CONFIG.timeout,
    });

    await page.type(CADASTRE_SELECTORS.firstNameInput, `Usuario${id}`);
    await page.type(CADASTRE_SELECTORS.lastNameInput, "Teste");

    await page.type(CADASTRE_SELECTORS.emailInput, email);
    await page.type(CADASTRE_SELECTORS.confirmEmailInput, email);

    await page.type(CADASTRE_SELECTORS.passwordInput, "SenhaSegura123!");
    await page.type(CADASTRE_SELECTORS.confirmPasswordInput, "SenhaSegura123!");

    await page.click(CADASTRE_SELECTORS.acceptedPrivacyCheckbox);
    await page.click(CADASTRE_SELECTORS.is18YearsOldOrMoreCheckbox);

    await page.click(CADASTRE_SELECTORS.submitButton);

    resultado["tempoMs"] = Date.now() - inicio;
    resultado["status"] = "✅ OK";
  } catch (error: any) {
    resultado["status"] = `❌ ${error.message}`;
  } finally {
    await browser.close();
  }

  return resultado;
}

async function executarCargaCadastro() {
  console.log(`🚀 Simulando ${CONFIG.users} usuários no fluxo de Cadastro`);

  console.log(`⚙️ Concorrência máxima: ${CONFIG.concurrency}`);

  const resultados = await runWithConcurrency(
    CONFIG.users,
    CONFIG.concurrency,
    executarCadastro,
  );

  console.table(resultados);
}

executarCargaCadastro();
