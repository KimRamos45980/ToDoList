var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem(desiredTitle, dueDate, complete) {
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isCompleted = complete;
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add");
    addItem.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        displayToDoItem(itemArray[i]);
    }
}
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function isValid() {
    clearErrorSpans();
    var titleInput = getInput("title").value;
    if (titleInput == "") {
        var titleMissing = getInput("title").nextElementSibling;
        titleMissing.innerText = "Please enter a title";
        return false;
    }
    var dateInput = Date.parse(getInput("due-date").value);
    if (isNaN(dateInput)) {
        var dateMissing = getInput("due-date").nextElementSibling;
        dateMissing.innerText = "Please enter a valid date";
        return false;
    }
    return true;
}
function getToDoItem() {
    var titleInput = getInput("title").value;
    var dateInput = new Date(getInput("due-date").value);
    var isCompleted = getInput("is-complete").checked;
    var myItem = new ToDoItem(titleInput, dateInput, isCompleted);
    return myItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompletedToDos = document.getElementById("incomplete-items");
        incompletedToDos.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}
function clearErrorSpans() {
    var titleSpan = getInput("title").nextElementSibling;
    titleSpan.innerText = "*";
    var dateSpan = getInput("due-date").nextElementSibling;
    dateSpan.innerText = "*";
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
function getInput(id) {
    return document.getElementById(id);
}
