const items = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");
let toDoList = [];

// Function to initialize the to-do list when the page loads
const initializeToDoList = () => {
  toDoList = JSON.parse(localStorage.getItem("toDoList")) || [];
  renderToDoList();
};

// Function to render the to-do list items
const renderToDoList = () => {
  toDoBox.innerHTML = "";
  toDoList.forEach(item => {
    const listItem = createToDoItem(item);
    toDoBox.appendChild(listItem);
  });
};

// Function to create a new to-do list item
const createToDoItem = (item) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>`;
  
  listItem.addEventListener("click", function() {
    this.classList.toggle("done");
    updateLocalStorage();
  });

  listItem.querySelector("i").addEventListener("click", function() {
    listItem.remove();
    toDoList = toDoList.filter(todo => todo !== item);
    updateLocalStorage();
  });

  return listItem;
};

// Function to add a new item to the to-do list
const addToDo = (item) => {
  const listItem = createToDoItem(item);
  toDoBox.appendChild(listItem);
  toDoList.push(item);
  updateLocalStorage();
};

// Event listener for adding new items to the to-do list
items.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addToDo(this.value);
    this.value = "";
  }
});

// Function to update local storage with the current to-do list
const updateLocalStorage = () => {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
};

// Call the initializeToDoList function when the page loads
initializeToDoList();
