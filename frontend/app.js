const API_URL = "http://localhost:3000";
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const statusDiv = document.getElementById("status");

// Загрузка задач при старте
async function loadTasks() {
  statusDiv.innerHTML = '<div class="loading">Загрузка...</div>';
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    renderTasks(response.data);
    statusDiv.textContent = "";
  } catch (error) {
    statusDiv.innerHTML =
      '<div class="error">Ошибка загрузки: ' + error.message + "</div>";
  }
}

// Отрисовка списка
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.title}</span>
      <div class="actions">
        <button
          class="toggle-btn"
          onclick="toggleTask(${task.id})"
          title="Выполнить / вернуть"
        >
          ${task.completed ? "↶" : "✓"}
        </button>

        <button
          class="edit-btn"
          onclick="showEditModal(${task.id}, '${task.title.replace(/'/g, "\\'")}')"
          title="Редактировать"
        >
          ✏️
        </button>

        <button
          class="delete-btn"
          onclick="deleteTask(${task.id})"
          title="Удалить"
        >
          ❌
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Добавить задачу
addBtn.onclick = async () => {
  const title = taskInput.value.trim();
  if (!title) return;
  try {
    await axios.post(`${API_URL}/tasks`, { title });
    taskInput.value = "";
    loadTasks();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
};

// Toggle completed (нужен endpoint PUT /tasks/:id)
async function toggleTask(id) {
  try {
    const tasks = await axios.get(`${API_URL}/tasks`);
    const task = tasks.data.find((t) => t.id === id);
    await axios.put(`${API_URL}/tasks/${id}`, { completed: !task.completed });
    loadTasks();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}

// Удаление (нужен DELETE /tasks/:id)
async function deleteTask(id) {
  if (!confirm("Удалить задачу?")) return;
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
    loadTasks();
  } catch (error) {
    alert("Ошибка: " + error.message);
  }
}
let currentEditId = null;
let currentEditTitle = "";

function showEditModal(id, title) {
  currentEditId = id;
  currentEditTitle = title;
  document.getElementById("editInput").value = title;
  document.getElementById("editModal").style.display = "flex";
  document.getElementById("editInput").focus();
}

function hideEditModal() {
  document.getElementById("editModal").style.display = "none";
  currentEditId = null;
}

// Обработчики модала
document.addEventListener("DOMContentLoaded", () => {
  // Закрытие по крестику/отмена
  document.querySelector(".modal-close").onclick = hideEditModal;
  document.getElementById("cancelEdit").onclick = hideEditModal;

  // Сохранить
  document.getElementById("saveEdit").onclick = async () => {
    const newTitle = document.getElementById("editInput").value.trim();
    if (!newTitle || newTitle === currentEditTitle) {
      hideEditModal();
      return;
    }

    try {
      await axios.put(`${API_URL}/tasks/${currentEditId}`, { title: newTitle });
      loadTasks();
      hideEditModal();
    } catch (error) {
      alert("Ошибка: " + error.message); // Пока оставим для ошибок
    }
  };

  // Закрытие по клику вне модала / ESC
  document.getElementById("editModal").onclick = (e) => {
    if (e.target.classList.contains("modal")) hideEditModal();
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentEditId) hideEditModal();
  });
});

loadTasks(); // Автозагрузка[web:30][web:32][conversation_history:10]
