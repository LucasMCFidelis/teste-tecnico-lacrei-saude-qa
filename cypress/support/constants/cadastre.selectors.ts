export const CADASTRE_SELECTORS = {
  firstNameInput: "#firstName",
  lastNameInput: "#lastName",

  emailInput: "#email",
  confirmEmailInput: "#email2",

  passwordInput: "#password1",
  confirmPasswordInput: "#password2",

  passwordCriteria: "#password1-criteria",

  acceptedPrivacyCheckbox: "#acceptedPrivacyDocument",
  is18YearsOldOrMoreCheckbox: "#is18YearsOldOrMore",

  termsOfUseLink: 'a[aria-label="Ir para termos de uso"]',
  privacyPolicyLink: 'a[aria-label="Ir para política de privacidade"]',

  submitButton: 'button[type="submit"]',
  backButton: 'button[type="button"]',
} as const;
