// const { defineConfig } = require("@playwright/test");

// module.exports = defineConfig({
//   testDir: "./tests",
//   testMatch: ["**/*.spec.js"],
//   use: {
//     baseURL: "http://localhost:5500",
//     headless: false,
//   },
// });

import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.js"],
  use: {
    baseURL: "http://localhost:5500",
    headless: false,
  },
});
