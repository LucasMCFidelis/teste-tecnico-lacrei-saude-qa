export const CADASTRE_SELECTORS = {
  // Labels
  firstNameLabel: 'label[for="firstName"]',
  lastNameLabel: 'label[for="lastName"]',

  emailLabel: 'label[for="email"]',
  confirmEmailLabel: 'label[for="email2"]',

  passwordLabel: 'label[for="password1"]',
  confirmPasswordLabel: 'label[for="password2"]',

  // Inputs
  firstNameInput: "#firstName",
  lastNameInput: "#lastName",

  emailInput: "#email",
  confirmEmailInput: "#email2",

  passwordInput: "#password1",
  confirmPasswordInput: "#password2",

  // Password criteria
  passwordCriteria: "#password1-criteria",

  // Checkboxes
  acceptedPrivacyCheckbox: "#acceptedPrivacyDocument",
  is18YearsOldOrMoreCheckbox: "#is18YearsOldOrMore",

  // Links
  termsOfUseLink: 'a[aria-label="Ir para termos de uso"]',
  privacyPolicyLink: 'a[aria-label="Ir para política de privacidade"]',

  // Buttons
  submitButton: 'button[type="submit"]',
  backButton: 'button[type="button"]',

  // Alerts
  alertMessage: '[role="alert"]',
} as const;
