export const CADASTRE_MESSAGES = {
  emailInUse: "Já existe um usuário cadastrado com este endereço de e-mail.",
  emailInvalid:
    "Por favor, utilize um formato de e-mail válido. Por exemplo: email@dominio.com.br.",
  emailMismatch: "Os e-mails não correspondem, digite novamente.",
  passwordMismatch: "Senhas incompatíveis, tente novamente.",
} as const;

export const PASSWORD_CRITERIA: Record<string, string> = {
  uppercase: "1 Letra maiúscula ou mais",
  lowercase: "1 Letra minúscula ou mais",
  number: "1 Número ou mais",
  specialCharacter: "1 Caractere especial ou mais",
  minLength: "8 Caracteres ou mais",
};
