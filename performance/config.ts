import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  users: 15,
  concurrency: 5,

  baseUrl: process.env.BASE_URL || "http://localhost:8080",

  loginEmail: process.env.LOGIN_EMAIL!,
  loginPassword: process.env.LOGIN_PASSWORD!,

  timeout: 30000,
};
