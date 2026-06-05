import puppeteer from "puppeteer";

import { LOGIN_SELECTORS } from "../cypress/support/constants/selectors/login.selectors";
import { SEARCH_SELECTORS } from "../cypress/support/constants/selectors/search.selectors";
import { URLS } from "../cypress/support/constants/urls";

import { CONFIG } from "./config";
import { ResultadoCarga } from "./result-test.interface";
import { runWithConcurrency } from "./run-with-concurrency";

async function executarBusca(id: number) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  const resultado: ResultadoCarga = {
    usuario: id,
    fluxo: "Busca Profissional",
  };

  try {
    const urlLogin = `${CONFIG.baseUrl}${URLS.LOGIN}`;
    await page.goto(urlLogin, { waitUntil: "networkidle2" });

    await page.waitForSelector(LOGIN_SELECTORS.emailInput, {
      timeout: CONFIG.timeout,
    });

    await page.type(LOGIN_SELECTORS.emailInput, CONFIG.loginEmail);

    await page.type(LOGIN_SELECTORS.passwordInput, CONFIG.loginPassword);

    await page.keyboard.press("Enter");

    await page.waitForSelector(SEARCH_SELECTORS.searchInput, {
      timeout: CONFIG.timeout,
    });

    const inicio = Date.now();

    await page.click(SEARCH_SELECTORS.searchButton);

    await page.waitForSelector(SEARCH_SELECTORS.mainSearchResultSection, {
      timeout: CONFIG.timeout,
    });

    resultado["tempoMs"] = Date.now() - inicio;
    resultado["status"] = "✅ OK";
  } catch (error: any) {
    resultado["status"] = `❌ ${error.message}`;
  } finally {
    await browser.close();
  }

  return resultado;
}

async function executarCargaBusca() {
  console.log(`🚀 Simulando ${CONFIG.users} usuários no fluxo de Busca`);

  console.log(`⚙️ Concorrência máxima: ${CONFIG.concurrency}`);

  const resultados = await runWithConcurrency(
    CONFIG.users,
    CONFIG.concurrency,
    executarBusca,
  );

  console.table(resultados);
}

executarCargaBusca();
