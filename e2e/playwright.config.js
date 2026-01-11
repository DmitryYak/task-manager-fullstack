const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.spec.js"],
  use: {
    baseURL: "http://localhost:5500",
    headless: false,
  },
});
