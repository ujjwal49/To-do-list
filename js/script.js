
var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("a")[0];//first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
var allTask = document.getElementById("all-task"); //print total task counts
var completeTask = document.getElementById("complete-task"); //print complete task counts
var completeTaskCount = 0;
var allTaskCount = 0;



//New Task List item

var createNewTaskElement = function (taskString) {
  // create List Item
  var listItem = document.createElement("li");
  // input checkbox
  var checkBox = document.createElement("input");
  // label
  var label = document.createElement("label");
  // input (text)
  var editInput = document.createElement("input");
  // button.edit
  var editButton = document.createElement("a");
  // button.delete
  var deleteButton = document.createElement("a");

  //Each element needs modified 
  checkBox.type = "checkBox";
  editInput.type = "text";




  editButton.className = "edit";
  deleteButton.className = "delete";

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


//Add a new task
var addTask = function () {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";

  allTaskCount++;
  taskCount();
}

//Edit an existing task
var task_edit = function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");


  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);

  allTaskCount--;
  taskCount();
}

//Mark a task as complete
var taskCompleted = function () {
  console.log("Task Complete...");
  //When the Checkbox is checked 
  //Append the task list item to the #completed-tasks ul
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, task_incomplete);
  completeTaskCount++;


  taskCount();
}


//Mark a task as incomplete
var task_incomplete = function () {
  console.log("Task Incomplete...");
  //When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  completeTaskCount--;

  taskCount();

}


//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("a.edit");
  var deleteButton = taskListItem.querySelector("a.delete");
  //bind task_edit to edit button
  editButton.onclick = task_edit;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

}

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(completedTasksHolder.children[i], task_incomplete);
}

// print the tasks count details
function taskCount() {
  allTask.innerText = allTaskCount;
  completeTask.innerText = completeTaskCount;

}








