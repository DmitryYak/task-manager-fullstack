const { defineConfig } = require("@playwright/test");
require("dotenv").config();

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.js"],
  use: {
    baseURL: "http://localhost:5500",
    headless: false,
  },
});

// const { defineConfig } = require("@playwright/test");

// module.exports = defineConfig({
//   testDir: "./tests",
//   testMatch: ["**/*.spec.js"],
//   fullyParallel: true,
//   use: {
//     baseURL: "http://localhost:5500",
//     // headless: false,  ← УДАЛИ ЭТУ СТРОКУ!
//     trace: "on-first-retry",
//   },
// });

// import { defineConfig } from "@playwright/test";
// import dotenv from "dotenv";

// dotenv.config();

// export default defineConfig({
//   testDir: "./tests",
//   testMatch: ["**/*.spec.js"],
//   use: {
//     baseURL: "http://localhost:5500",
//     headless: false,
//   },
// });

// /** @type {import('@playwright/test').PlaywrightTestConfig} */
// const { defineConfig } = require("@playwright/test");

// module.exports = defineConfig({
//   testDir: "./tests",
//   testMatch: ["**/*.spec.?([cm])[jt]s?(x)?"], // Все .spec файлы
//   fullyParallel: true,
//   use: {
//     baseURL: process.env.BASE_URL || "http://localhost:5500",
//     trace: "on-first-retry",
//   },
// });
