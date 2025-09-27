// Global Variables - DOM //
let listData = {};
let listCounter = 0;
let currentSelectedList = "";
let taskToDelete = null;

const createListBtn = document.getElementById("create-list-btn");
const myListsContainer = document.getElementById("my-list");
const activeListDisplay = document.getElementById("activeList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
// ------------------- //

listData = JSON.parse(localStorage.getItem("My Task Lists")) || {};
for (const listId in listData) {
  const value = listData[listId];
  newListElement(value.name, listId);
  listCounter++;
}

function saveTaskLists() {
  localStorage.setItem("My Task Lists", JSON.stringify(listData));
}

function newListElement(listName, listId) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.textContent = listName;
  listItem.setAttribute("data-list-id", listId);

  myListsContainer.appendChild(listItem);
}

function createNewList() {
  listCounter++;
  const listId = `list-${listCounter}`;
  const listName = `List ${listCounter}`;

  listData[listId] = { name: listName, tasks: [] };

  newListElement(listName, listId);

  displayList(listId);

  updateTaskList();
  saveTaskLists();
}

function setCurrentList(listId) {
  currentSelectedList = listId;
}

function displayList(listId) {
  const list = listData[listId];
  if (list) {
    activeListDisplay.textContent = list.name;

    setCurrentList(listId);
    saveTaskLists();
  }
}

createListBtn.addEventListener("click", createNewList);

myListsContainer.addEventListener("click", (event) => {
  const listItem = event.target.closest(".list-group-item");
  if (listItem) {
    const listId = listItem.getAttribute("data-list-id");
    displayList(listId);
    updateTaskList();
    saveTaskLists();
  }
});

activeListDisplay.textContent = "Select or Create a List";

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask(event);
  }
});

function createTaskElement(taskText) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item task-item";
  listItem.innerHTML = `<div class="task"><span>${taskText}</span></div>
    <div class="list-actions"><button type="button" class="btn btn-success btn-sm complete-btn">Mark as Complete</button>
    <button class="btn btn-danger btn-sm delete-task">Delete Task</button>
    </div>`;
  taskList.appendChild(listItem);
  taskInput.value = "";

  const deleteButton = listItem.querySelector(".delete-task");
  deleteButton.addEventListener("click", () => {
    taskToDelete = listItem;
    const modal = new bootstrap.Modal(
      document.getElementById("deleteConfirmModal")
    );
    modal.show();
  });

  const completeButton = listItem.querySelector(".complete-btn");
  completeButton.addEventListener("click", () => {
    listItem.remove();
    let id;
    const elem = document.getElementById("animate");

    elem.style.display = "block";
    elem.style.top = "0px";
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
        elem.style.display = "none";
      } else {
        pos++;
        elem.style.top = pos + "px";
      }
    }
  });
}

function addTask() {
  const currentList = listData[currentSelectedList];
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    createTaskElement(taskText);
    currentList.tasks.push(taskText);
  } else {
  }
  saveTaskLists();
}

function updateTaskList() {
  const taskGroup = document.querySelectorAll(".task-item");
  taskGroup.forEach((task) => {
    task.remove();
  });

  const currentList = listData[currentSelectedList];
  currentList.tasks.forEach((task) => createTaskElement(task));
  saveTaskLists();
}

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (taskToDelete) {
    taskToDelete.remove();
    taskToDelete = null;
  }
  const modalEl = document.getElementById("deleteConfirmModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
  saveTaskLists();
});

document.getElementById("cancelDeleteBtn").addEventListener("click", () => {
  taskToDelete = null;
  const modalEl = document.getElementById("deleteConfirmModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
});
