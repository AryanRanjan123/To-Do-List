let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task" + (task.done ? " done" : "");

      const span = document.createElement("span");
      span.textContent = task.text;

      const actions = document.createElement("div");
      actions.className = "actions";

      const doneBtn = document.createElement("button");
      doneBtn.textContent = task.done ? "Undo" : "Done";
      doneBtn.className = "done-btn";
      doneBtn.onclick = () => toggleDone(index);

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => editTask(index);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete-btn";
      delBtn.onclick = () => deleteTask(index);

      actions.append(doneBtn, editBtn, delBtn);
      li.append(span, actions);
      list.appendChild(li);
    });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return alert("Please enter a task.");

  tasks.push({ text, done: false });
  input.value = "";
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderTasks(e.target.value);
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderTasks();
