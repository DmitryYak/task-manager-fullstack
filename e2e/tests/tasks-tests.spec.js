const { test, expect } = require("@playwright/test");

const API_URL = process.env.API_URL;

test.describe(`check tasks get`, () => {
  test(`check get tasks 200`, async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);
    expect(response.status()).toBe(200);
    console.log(response.status());
    console.log("check text in the terminal");
  });

  test(`check response time`, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API_URL}/tasks`);
    const duration = Date.now() - start;
    console.log(`response time ${API_URL}/tasks is ${duration} ms`);
    expect(duration).toBeLessThan(200);
    expect(response.status()).toBe(200);
  });

  test(`check that objects is there`, async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(1);
    expect(response.status()).toBe(200);
  });

  test(`check ${API_URL} response is array`, async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    console.log(body.length);
  });
  test(`check every object has keys`, async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    if (body.length > 0) {
      body.forEach((i) => {
        expect(i).toHaveProperty("id");
        expect(i).toHaveProperty("title");
        expect(i).toHaveProperty("completed");
        expect(typeof i.id).toBe("number");
        expect(typeof i.title).toBe("string");
        expect(typeof i.completed).toBe("boolean");
      });
    }
  });
});
