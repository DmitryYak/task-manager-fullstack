require("dotenv").config();
const { test, expect } = require("@playwright/test");

// import dotenv from "dotenv";
// import { test, expect } from "@playwright/test";

// dotenv.config();

const API_URL = process.env.API_URL || "http://localhost:3000";

test.describe("Tasks API", () => {
  let taskId;

  test("POST /tasks — создать задачу", async ({ request }) => {
    const response = await request.post(`${API_URL}/tasks`, {
      data: {
        title: "API test task",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty("id");
    expect(body.title).toBe("API test task");
    expect(body.completed).toBe(false);

    taskId = body.id;
  });

  test("GET /tasks — получить список задач", async ({ request }) => {
    const response = await request.get(`${API_URL}/tasks`);

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("PUT /tasks/:id — отметить задачу выполненной", async ({ request }) => {
    const response = await request.put(`${API_URL}/tasks/${taskId}`, {
      data: {
        completed: true,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(taskId);
    expect(body.completed).toBe(true);
  });

  test("DELETE /tasks/:id — удалить задачу", async ({ request }) => {
    const response = await request.delete(`${API_URL}/tasks/${taskId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe("Удалено");
  });

  // test.describe.only(`check get tasks`, () => {
  //   test(`check get tasks`, async ({ request }) => {
  //     const response = await request.get(`${API_URL}/tasks`);
  //     expect(response.status()).toBe(200);
  //   });
  // });
});
