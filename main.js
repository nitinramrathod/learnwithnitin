
var courseList = document.getElementById("courseList");
var mainScreen = document.getElementById("mainScreen");

courseList.addEventListener('click', function (e) {
    var item = e.target.getAttribute('data-src');
    e.target.classList.add("activeThis");

    mainScreen.src = item;


});
