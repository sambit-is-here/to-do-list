// DOM Elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(todoList.children).map((li) => li.firstChild.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task Function
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  addTaskToDOM(taskText);
  saveTasks();
  todoInput.value = ""; // Clear input field
}

// Add Task to DOM
function addTaskToDOM(taskText) {
  const listItem = document.createElement("li");
  listItem.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    listItem.remove();
    saveTasks();
  };

  listItem.appendChild(deleteBtn);
  todoList.appendChild(listItem);
}

// Event Listeners
addBtn.addEventListener("click", addTask);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initialize
loadTasks();
