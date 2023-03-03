
var courseList = document.getElementById("courseList");
var mainScreen = document.getElementById("mainScreen");

// todo list variables 
var taskInput = document.getElementById("input-task");
var addTaskBtn = document.getElementById("add-task");
var saveTaskBtn = document.getElementById("save-task");
var taskListBox = document.getElementById("show-task-box");
let saveIndex = document.getElementById('index');
let deleteAll = document.getElementById('delete-all');
let cursor = document.getElementById('pointer');


// mouse pointer 
// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.pageX + 'px';
//     cursor.style.top = e.pageY + 'px';
// })

document.querySelector('body').addEventListener('mousemove', eyeball);
// making function here 
function eyeball() {
    var eye = document.querySelectorAll('.eye');

    eye.forEach(function (eye) {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rot = (radian * (180 / Math.PI) * -1) + 230;
        eye.style.transform = "rotate(" + rot + "deg)";
    })
}




courseList.addEventListener('click', function (e) {
    var item = e.target.getAttribute('data-src');
    e.target.classList.add("activeThis");

    mainScreen.src = item;


});



// todo task function
showTask();
addTaskBtn.addEventListener("click", function () {
    let taskInputText = taskInput.value;
    let taskList = localStorage.getItem("savedTask");
    if (taskList == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(taskList);
    }

    if (taskInputText.trim() != 0) {
        taskObj.push(taskInputText);
        localStorage.setItem("savedTask", JSON.stringify(taskObj));

    }
    else {
        alert("Please Add Something in task !");
    }
    taskInput.value = '';

    showTask();

})


// show task function 
function showTask() {
    let taskList = localStorage.getItem("savedTask");
    if (taskList == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(taskList);
    }
    let taskTemplate = '';
    taskObj.forEach((item, index) => {
        taskTemplate += `<div class="show-task d-flex justify-content-start align-content-start">
                            <span>${index + 1}</span>
                            <p>${item}</p>
                            <button class="update task-btn" title="Edit Task" onclick="edittask(${index})"><i class="fa-duotone fa fas fa-pen-to-square"></i></button>
                            <button class="delete task-btn" title="Delete Task" onclick="deletetask(${index})"><i class="fa-solid fa fas fa-delete-left"></i></button>
                        </div>`
    });
    taskListBox.innerHTML = taskTemplate;
}

// edit task function 
function edittask(index) {
    let taskList = localStorage.getItem("savedTask");
    let taskObj = JSON.parse(taskList);
    taskInput.value = taskObj[index]
    saveIndex.value = index;
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

// save edited task function 
saveTaskBtn.addEventListener("click", function () {
    let taskList = localStorage.getItem("savedTask");
    let taskObj = JSON.parse(taskList);
    let indexValue = saveIndex.value;
    taskObj[indexValue] = taskInput.value;
    localStorage.setItem("savedTask", JSON.stringify(taskObj));
    showTask();
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
    taskInput.value = '';
})

// delete task function 
function deletetask(index) {
    let taskList = localStorage.getItem("savedTask");
    let taskObj = JSON.parse(taskList);
    taskObj.splice(index, 1);
    localStorage.setItem("savedTask", JSON.stringify(taskObj));
    showTask();

}

// delete all function 
deleteAll.addEventListener("click", function () {
    let taskList = localStorage.getItem("savedTask");
    let taskObj = JSON.parse(taskList);

    if (taskList == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(taskList);
        taskObj = [];
    }
    localStorage.setItem("savedTask", JSON.stringify(taskObj));
    showTask();

});


// profile edit functionality here 
var profileEditButton = document.getElementById('profile-edit-btn');
var profileEditFormCloseButton = document.getElementById('profile-form-close');
var saveProfileButton = document.getElementById('submit-edit');
var profileEditForm = document.getElementById('edit-profile-form');
var profilePicture = document.querySelector('#select-image');
var currentProfileImage = document.querySelector('#profile-img');
var userName = document.querySelector('#set-username');
var desplayUserName = document.querySelector('#display-username');

profileEditButton.addEventListener('click', function () {
    profileEditForm.classList.remove("d-none");
})
profileEditFormCloseButton.addEventListener('click', function () {
    profileEditForm.classList.add("d-none");
})

// adding user image in local storage 
profilePicture.addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        localStorage.setItem('profile-image', reader.result);
    });
    reader.readAsDataURL(this.files[0]);
})

// adding name of user in local storage 
saveProfileButton.addEventListener('click', () => {
    localStorage.setItem('username', JSON.stringify(userName.value)); 
    location.reload();
})




// retriving that stored image and username 
document.addEventListener('DOMContentLoaded', () => {
    const currentProfileImageUrl = localStorage.getItem('profile-image');
    const currentProfileName = localStorage.getItem('username');

    if (currentProfileImageUrl) {
        currentProfileImage.setAttribute('src', currentProfileImageUrl);
    }
    if (currentProfileName) {
        desplayUserName.innerHTML = JSON.parse(currentProfileName);;
    }
})


$(document).ready(function () {
    var url = window.location.href;
    var allCookies = document.cookie.split(';');
    var cookiesObject = allCookies.map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value])=>
            ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
            {});


    console.log(cookiesObject.authenticated);

    if(cookiesObject){
        if (!(cookiesObject.authenticated == 'true')) {

            newUrl = (url+ 'login-page.html');
            window.history.replaceState({}, document.title, newUrl);
            location.reload();
    
        }
    }    
});


