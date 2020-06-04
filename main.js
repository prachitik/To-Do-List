const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");
const clearButton = document.getElementById("clearButton");
let myTodos = document.getElementById("myTodos");
let myTodosList = [];
let id = 0;
let restoredList = localStorage.getItem("todos");
let activeElement = "";
let eId = 0;
let edit = false;
if( restoredList){
    myTodosList = JSON.parse(restoredList);
    loadMyTodos(myTodosList);
    id = myTodosList.length;
}
else{
    myTodosList = [];
    id = 0;
}

function loadMyTodos(arr){
    arr.forEach((item) => {
        addItem(item.name, item.id,item.edit, item.remove); 
      })
}

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

function addItem(item, id,edit,del){
    if(del){
        return;
    }
    const task = `<li class="item">
    <input type="text" id="todoText" value="${item}" disabled> 
    <button class="editButton" id="${id}" onclick="editTask(this)">Edit</button>
    <button class="deleteButton" id="${id}" onclick="deleteTask(this)">Delete</button>
    </li>`;

    myTodos.insertAdjacentHTML("beforeend", task);
}

clearButton.addEventListener('click',function(event){
    localStorage.clear();
    location.reload();
})

saveButton.addEventListener('click',function(event){
    if(edit){
        myTodosList[eId].name = activeElement.value;
        edit = false;

    }
    //myTodos = document.getElementById("myTodos");
    activeElement.disabled = !activeElement.disabled;
    localStorage.setItem("todos", JSON.stringify(myTodosList));
    //alert(activeElement);
    
})

function editTask(element){
    element.previousElementSibling.disabled = !element.previousElementSibling.disabled;
    activeElement = element.previousElementSibling;
    edit = true;
    //myTodosList[name] = element.previousElementSibling.value;
    myTodosList[element.id].edit = true;
    eId = element.id;
    /*localStorage.setItem("todos", JSON.stringify(myTodosList));*/
}


function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    myTodosList[element.id].remove = true;
    localStorage.setItem("todos", JSON.stringify(myTodosList));
}

