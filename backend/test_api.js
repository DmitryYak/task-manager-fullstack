const fetch = require("node-fetch");

async function test() {
  // GET
  const tasks = await fetch("http://localhost:3000/tasks").then((r) =>
    r.json()
  );
  console.log("GET:", tasks);
}
