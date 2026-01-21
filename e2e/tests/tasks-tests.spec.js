const { test, expect } = require("@playwright/test");
// import { test, expect } from "@playwright/test";

const API_URL = process.env.API_URL;
const URL_TASKS = `${API_URL}/tasks`;

test.describe(`check tasks get`, () => {
  test(`check get tasks 200`, async ({ request }) => {
    const response = await request.get(URL_TASKS);
    expect(response.status()).toBe(200);
    console.log(response.status());
    console.log("check text in the terminal");
  });

  test(`check response time`, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(URL_TASKS);
    const duration = Date.now() - start;
    console.log(`response time ${API_URL}/tasks is ${duration} ms`);
    expect(duration).toBeLessThan(2000);
    expect(response.status()).toBe(200);
  });

  test(`check that objects is there`, async ({ request }) => {
    const response = await request.get(URL_TASKS);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(1);
    expect(response.status()).toBe(200);
  });

  test(`check ${API_URL} response is array`, async ({ request }) => {
    const response = await request.get(URL_TASKS);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    console.log(body.length);
  });
  test(`check every object has keys`, async ({ request }) => {
    const response = await request.get(URL_TASKS);
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

  test(`checking for uniqueness`, async ({ request }) => {
    const response = await request.get(URL_TASKS);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    const ids = body.map((item) => item.id);
    const uniqueness = new Set(ids);
    console.log(
      `uniqueness size: ${uniqueness.size}, ids.lenght: ${uniqueness.size}`,
    );
    expect(uniqueness.size).toBe(ids.length);
  });
});

test.describe(`check post endpoint /tasks + delete`, () => {
  test(`check post ${URL_TASKS}`, async ({ request }) => {
    const randomNum = Math.floor(Math.random() * 1000);
    console.log(randomNum);
    const start = Date.now();
    const response = await request.post(URL_TASKS, {
      data: {
        title: `task check post Playwright #${randomNum}`,
      },
    });
    const duration = Date.now() - start;
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(duration).toBeLessThan(1000);
    const taskId = body.id;
    console.log(taskId);
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("title");
    expect(body).toHaveProperty("completed");
    expect(body.completed).toBe(false);
    expect(body.title).toBe(`task check post Playwright #${randomNum}`);
    expect(typeof body.id).toBe("number");
    const deleteTask = await request.delete(`${URL_TASKS}/${taskId}`);
    expect(deleteTask.status()).toBe(200);
    const deleteBody = await deleteTask.json();
    expect(deleteBody.message).toBe("Удалено");
  });
});

test.describe(`test describe check put /tasks`, () => {
  test(`check put method`, async ({ request }) => {
    const randomNum = Math.floor(Math.random() * 1000);
    const response = await request.post(URL_TASKS, {
      data: {
        title: `task check put Playwright #${randomNum}`,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe(`task check put Playwright #${randomNum}`);
    const taskId = body.id;
    const startPut = Date.now();
    const responsePut = await request.put(`${URL_TASKS}/${taskId}`, {
      data: {
        completed: true,
      },
    });
    const durationPut = Date.now() - startPut;
    expect(durationPut).toBeLessThan(1000);
    const bodyPut = await responsePut.json();
    expect(bodyPut.completed).toBe(true);
    const responseDel = await request.delete(`${URL_TASKS}/${taskId}`);
    const bodyDel = await responseDel.json();
    expect(bodyDel.message).toBe("Удалено");
  });
});
