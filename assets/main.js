
// A simple data store for our lists
const listData = {}; //simple database to hold all list created and get unique ID
let listCounter = 0; //counter each time we create list the number will increase it gives it unique name and ID

// Get references to the HTML elements
const createListBtn = document.getElementById('create-list-btn'); //find the button and create a refrence for it
const myListsContainer = document.getElementById('my-list'); //find a list of mylist 
const activeListDisplay = document.getElementById('activeList'); //find the div of the activelist 

// Function to create a new list
function createNewList() {  //function to work when create list button is clicked 
    listCounter++; //increase the counter by one so first click will be 0+1=1 and seccond click 1+1=2 etc..
    const listId = `list-${listCounter}`; //use the counter to create id 
    const listName = `List ${listCounter}`; //use counter to create name

    // Add the new list to our data store
    listData[listId] = { //this adds new entry to list data and store the name of list and array of task to be filled later
        name: listName,
        tasks: []
    };
// Create the HTML element for the new list
    const listItem = document.createElement('li'); //create new list element read to be added to the page
    listItem.classList.add('list-group-item'); // add class to make it look list item
    listItem.textContent = listName;  // set the name of list to be same as Id
    listItem.setAttribute('data-list-id', listId); //attribute used by event listener to know which list to display when click it

// Append the new list to the container
    myListsContainer.appendChild(listItem); //add the new list to the UL
    
    // Automatically display the new list
    displayList(listId); //used to display the new list on activelist area
}

// Function to display a selected list
function displayList(listId) { //takes the unique ID of clicked list
    const list = listData[listId]; //look up for the id of the listdata
    if (list) { //ensure if list exist before displaying it
        // Set the text content of the active list display area
        activeListDisplay.textContent = list.name;  //takes the list name and plae the text in the active list area
    }
}

// Event listener for the "Create List" button
createListBtn.addEventListener('click', createNewList); //listen to clickbutton and runs createnewlist fucntion 

// Event listener for clicks on the list container
myListsContainer.addEventListener('click', (event) => { //listen to any click on entire UL
    const listItem = event.target.closest('.list-group-item'); //figure out which list element was clicked
    if (listItem) {
        const listId = listItem.getAttribute('data-list-id'); 
        displayList(listId); //runs the display function with the correct ID to show clicked list
        console.log ('button clicked')
    }
});

// Initial display of the "List Name" heading
activeListDisplay.textContent = 'Select or Create a List'; //sets inetial text div in the active list when page loads 

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

//These are just placeholder lists i created to check the js function.
const lists = {
  listOne: {
    name: "List 1",
    items: ["item 1", "item 2", "item 3"],
  },
  listTwo: {
    name: "List 2",
    items: ["list2 item1", "list2 item2", "list2 item3"],
  },
  listThree: {
    name: "List 3",
    items: ["list3 item1", "list3 item2", "list3 item3"],
  },
};

function openList(listKey) {
  document.querySelectorAll(".list-card").forEach((card) => {
    card.classList.remove("active");
  });

  event.target.closest(".list-card").classList.add("active");

  const list = lists[listKey];

  const activeListDiv = document.getElementById("activeList");

  let itemsHtml = "";
  list.items.forEach((item) => {
    itemsHtml += `<li class="list-group-item">${item}</li>`;
  });

  activeListDiv.innerHTML = `
                <h4>${list.name}</h4>
                <ul class="list-group">
                    ${itemsHtml}
                </ul>
            `;
}
