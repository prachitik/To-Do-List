const input = document.getElementById("input");
const addButton = document.getElementById("addButton");
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");
const clearButton = document.getElementById("clearButton");
let myTodos = document.getElementById("myTodos");
let myTodosList = [];
let id = 0;
let restoredList = localStorage.getItem("todos");
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
        addItem(item.name, item.id,item.remove); 
      })
}

addButton.addEventListener('click',function(event){
    if(input.value != ""){
        addItem(input.value, id, false); 
        myTodosList.push({name:input.value,
        id : id,
        remove : false});
    } 
    else{
        alert("write something to add");
    }
    localStorage.setItem("todos", JSON.stringify(myTodosList));
    input.value = "";
    id++;
})

function addItem(item, id,del){
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
    //myTodos = document.getElementById("myTodos");

})

function editTask(element){
    /*element.previousElementSibling.disabled = !element.previousElementSibling.disabled;
    myTodosList[element.id].name = element.previousElementSibling.value;
    localStorage.setItem("todos", JSON.stringify(myTodosList));*/
}


function deleteTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    myTodosList[element.id].remove = true;
    localStorage.setItem("todos", JSON.stringify(myTodosList));
}

