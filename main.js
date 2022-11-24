// My Tasks Basic

// HTML Elements
let tasksInputEl = document.getElementById("task-input");
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = loadTasks();
displayAll();

// Go Btn - Menu Listener
tasksInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
    if (e.code === "Enter") {
      // Add Submitted Task
      let userTask = tasksInputEl.value;
      tasks.push(newTask(userTask));
      saveTasks();
      displayAll();
      tasksInputEl.value = "";
    }
}

// MENU FUNCTIONS
// Toggle completed status of a task
function toggleTask() {
  let index = +prompt("Enter # of task: ")
  let task = tasks[index];
  if (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = "";
  }
  saveTasks();
  displayAll();
}

// Remove a task by index
function removeTask() {
  let index = +prompt("Enter a number of a task to remove:");
    // Valid Index -> Remove
    tasks.splice(index, 1);
    saveTasks();
    displayAll();
}

// Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayAll();
}

// HELPER FUNCTIONS
// Load tasks from local storage
function loadTasks() {
  let tasksStr = localStorage.getItem("tasks");
  return JSON.parse(tasksStr) ?? [];
}

// Display all tasks in global tasks array
function displayAll() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTMLStr(tasks[i], i))
  }
}

function newTask(taskDescription) {
  return {
    description: taskDescription, 
    completed: false,
  };
}

// Save global tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get html for given task
function getTaskHTMLStr(task, index) {
  // Use JavaScript to build the Task <div>

  // Check Box Element
  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.dataset.index = index;
  checkBoxEl.checked = task.completed;
  checkBoxEl.addEventListener("input", checkBoxHandler);

  // Task Description Text Node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTML = task.description;
  if (task.completed) {
    textSpanEl.className = "completed";
  }

  // Remove button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);

  // Add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkBoxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

// Event Functions
function checkBoxHandler(e) {
  // Get index of tasks to toggle
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayAll();
}

function removeBtnHandler(e) {
  // Get index of task to remove
  let index = e.target.dataset.index;
  tasks.splice(index, 1);
  saveTasks();
  displayAll();
}