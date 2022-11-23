
var courseList = document.getElementById("courseList");
var mainScreen = document.getElementById("mainScreen");

// todo list variables 
var taskInput =  document.getElementById("input-task");
var addTaskBtn =  document.getElementById("add-task");
var taskListBox =  document.getElementById("show-task-box");

courseList.addEventListener('click', function (e) {
    var item = e.target.getAttribute('data-src');
    e.target.classList.add("activeThis");

    mainScreen.src = item;


});


// todo task function
showTask();
addTaskBtn.addEventListener("click", function(){
    let taskInputText = taskInput.value;
    let taskList = localStorage.getItem("savedTask");
    if (taskList == null) {
        taskObj = [];        
    }
    else{
        taskObj = JSON.parse(taskList);
    }

    if (!taskInputText == "") {
        taskObj.push(taskInputText);
        localStorage.setItem("savedTask", JSON.stringify(taskObj));
        showTask();
        
    }
    else{
        alert("Please Add Something in task !");
    }

    
})

function showTask() {

    let taskList = localStorage.getItem("savedTask");
    if (taskList == null){
        taskObj= [];        
    }
    else{
        taskObj = JSON.parse(taskList);
    }
    let taskTemplate = '';
    taskObj.forEach((item, index)=>{
        taskTemplate += `<div class="show-task d-flex justify-content-start align-content-start">
                            <span>${index+1}</span>
                            <p>${item}</p>
                            <button class="update task-btn"><i class="fa-duotone fa fas fa-pen-to-square"></i></button>
                            <button class="delete task-btn"><i class="fa-solid fa fas fa-delete-left"></i></button>
                        </div>`
    });
    taskListBox.innerHTML = taskTemplate;










    
}