/**
 * All the functionalities for add, delete. edit, save to-do tasks are here.
 */

// globally declared variables
const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const editButton = document.getElementsByClassName("editButton");
const deleteButton = document.getElementsByClassName("deleteButton");
const clearButton = document.getElementById("clearButton");
const completeButton = document.getElementsByClassName("completeButton");

// myTodos will always have updated data
let myTodos = document.getElementById("myTodos");
let myTodosList = [];
let id = 0;

//localstoarage is used so that out todo list taks remain just as they were before refreshing the page.
let restoredList = localStorage.getItem("todos");

//To always capture the currently selected task
let activeElement = "";

//To track task to edit it
let eId = 0; //edit id
// flag to check if task is in edit mode or disabled
let edit = false;

//to-do list is restored and loaded from local-storage if localstorage has any
if( restoredList){
    myTodosList = JSON.parse(restoredList);
    loadMyTodos(myTodosList);
    id = myTodosList.length;
}
else{
    myTodosList = [];
    id = 0;
}

/**
 * Loads all the to-do tasks 
 * @param arr 
 */
function loadMyTodos(arr){
    arr.forEach((item) => {
        addItem(item.name, item.id,item.edit, item.remove); 
      })
}

/**
 * Add a task to list to display and also to localstorage
 */
addButton.addEventListener('click',function(event){
    if(input.value != ""){
        addItem(input.value, id, false); 
        myTodosList.push({name:input.value,
        id : id,
        edit : edit,
        remove : false});
    } 
    else{
        alert("write something to add");
    }
    localStorage.setItem("todos", JSON.stringify(myTodosList));
    input.value = "";
    id++;
})
/**Create and add a task to HTML template
 * 
 * @param {string} item 
 * @param {Number} id 
 * @param {Boolean} edit 
 * @param {Boolean} del 
 */
function addItem(item, id,edit,del){
    if(del){
        return;
    }
    const task = `<li class="item">
    <input type="text" id="todoText" value="${item}" disabled> 
    <button class="editButton" id="${id}" onclick="editTask(this)">Edit</button>
    <button class="deleteButton" id="${id}" onclick="deleteTask(this)">Delete</button>
    <button class="completeButton" id="${id}" onclick="completeTask(this)">Complete</button>
    </li>`;

    myTodos.insertAdjacentHTML("beforeend", task); // newly added task is added at the end of list
}
// Clear off entire list
clearButton.addEventListener('click',function(event){
    localStorage.clear();
    location.reload();
})

/**
 * Save all changes made to the entire list(all to-dos) including edit, add, delete.
 */
saveButton.addEventListener('click',function(event){
    if(edit){
        myTodosList[eId].name = activeElement.value;
        edit = false;

    }
    
    activeElement.disabled = !activeElement.disabled;
    localStorage.setItem("todos", JSON.stringify(myTodosList));// each time on save, add same list to local storage too.
    
})
/**
 * 
 * @param element - corresponding edit button HTML element
 */
function editTask(element){
    element.previousElementSibling.disabled = !element.previousElementSibling.disabled;
    activeElement = element.previousElementSibling;
    edit = true;
    myTodosList[element.id].edit = true;
    eId = element.id;
    
}
/**
 * 
 * @param element - corresponding delete button HTML element 
 */
function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    myTodosList[element.id].remove = true;
    localStorage.setItem("todos", JSON.stringify(myTodosList));
}
/**
 * 
 * @param e - corresponding complete button HTML element
 */
function completeTask(e){
    console.log(e.parentNode.firstElementChild);
    e.parentNode.firstElementChild.setAttribute("text-decoration", "line-through black");
}