const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add event listener for add task button
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function for adding tasks to list
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `<div class="task"><span>${taskText}</span></div>
    <div class="list-actions"><button type="button" class="btn btn-success btn-sm complete-btn">Mark as Complete</button>
    <button class="btn btn-danger btn-sm delete-task">Delete Task</button>
    </div>`;
    taskList.appendChild(listItem);
    taskInput.value = ""; // Clears text input

    // Add event listener for delete button
    const deleteButton = listItem.querySelector(".delete-task");
    deleteButton.addEventListener("click", () => {
      listItem.remove();
    });

    // Add event listener for complete button
    const completeButton = listItem.querySelector(".complete-btn");
    completeButton.addEventListener("click", () => {
      listItem.remove();
    });
  } else {
  }
}
