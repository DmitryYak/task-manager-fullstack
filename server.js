const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "tasks",
  password: "pass",
  port: 5432,
});
pool
  .query(
    `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
  )
`
  )
  .then(() => {
    console.log("✅ Таблица tasks готова");
  })
  .catch(console.error);

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *",
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Toggle completed
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Задача не найдена" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удаление
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Задача не найдена" });
    res.json({ message: "Удалено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend: http://localhost:${PORT}`);
  pool
    .query("SELECT NOW()")
    .then(() => console.log("✅ БД подключена"))
    .catch((err) => console.error("❌ БД ошибка:", err.message));
});
