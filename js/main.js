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
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
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
    itemDate.innerText = item.dueDate.toString();
    var itemDiv = document.createElement("div");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
}
function getInput(id) {
    return document.getElementById(id);
}
