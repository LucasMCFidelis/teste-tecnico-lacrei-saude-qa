import { defineConfig } from "cypress";
import dotenv from "dotenv";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || null,

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/json",
      overwrite: false,
      html: false,
      json: true,
    },

    supportFile: "cypress/support/e2e.ts",
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      config.env = {
        ...config.env,
        stepDefinitions: "cypress/e2e/steps/**/*.{js,ts}",
      };

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
  expose: {
    apiUrl: process.env.API_URL || "http://localhost:3000",
  },
});
