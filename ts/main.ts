// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;

    constructor(desiredTitle:string, dueDate:Date, complete:boolean){
        this.title = desiredTitle;
        this.dueDate = dueDate;
        this.isCompleted = complete;
    }
}

//let item = new ToDoItem("Testing", new Date(2022, 5, 14), false);
//item.title = "Testing";
//item.dueDate = new Date(2022, 5, 14);
//item.isCompleted = false;

window.onload = function() {
    let addItem = document.getElementById("add");
    addItem.onclick = main;


    loadSavedItem();
}

function loadSavedItem() {
    let item = getToDo();
    displayToDoItem(item);
}

function main() {
    if(isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    clearErrorSpans();

    let titleInput = getInput("title").value;
    if(titleInput == ""){
        let titleMissing = <HTMLSpanElement>getInput("title").nextElementSibling;
        titleMissing.innerText = "Please enter a title";
        return false;
    }

    let dateInput = Date.parse(getInput("due-date").value);
    if(isNaN(dateInput)){
        let dateMissing = <HTMLSpanElement>getInput("due-date").nextElementSibling;
        dateMissing.innerText = "Please enter a valid date";
        return false;
    }

    return true;
}

/**
 * Get all input off form and wrap in
 * a ToDoItemObject
 */
function getToDoItem():ToDoItem{

    let titleInput = getInput("title").value;
    let dateInput = new Date(getInput("due-date").value);
    let isCompleted = getInput("is-complete").checked;

    let myItem = new ToDoItem(titleInput, dateInput, isCompleted);

    return myItem;
}

/**
 * @param item Display given ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void {
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    //itemDate.innerText = item.dueDate.toString();
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = document.getElementById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompletedToDos = document.getElementById("incomplete-items");
        incompletedToDos.appendChild(itemDiv);
    }
}

function markAsComplete() {
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items");
    console.log(completedItems);
    completedItems.appendChild(itemDiv);
}

function clearErrorSpans():void {
    let titleSpan = <HTMLSpanElement>getInput("title").nextElementSibling;
    titleSpan.innerText = "*";

    let dateSpan = <HTMLSpanElement>getInput("due-date").nextElementSibling;
    dateSpan.innerText = "*";
}

// Task: store ToDoItem in web storage
function saveToDo(item:ToDoItem):void {
    // Convert ToDoItem into JSON String
    let itemString = JSON.stringify(item);

    // Save string
    localStorage.setItem(todokey, itemString);
}

const todokey = "todo";

/**
 * Get stored ToDoItem or return null if none is found
 */
function getToDo():ToDoItem {
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem = JSON.parse(itemString);

    return item;
}

function getInput(id):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}