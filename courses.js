// all courses script here API json fetching.

var javascript = document.getElementById('javascript-courses');
var javascriptFile = 'courses/javascript.json';

var html = document.getElementById('html-courses');
var htmlFile = 'courses/javascript.json';

var css = document.getElementById('css-courses');
var cssFile = 'courses/javascript.json';

var jquery = document.getElementById('jquery-courses');
var jqueryFile = 'courses/javascript.json';

let cursor = document.getElementById('pointer');


// mouse pointer 
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
})




function getAllCourses(container, filename,) {
    let http = new XMLHttpRequest();
    http.open('get', `${filename}`, true);
    http.send();
    http.onload = function () {

        if (this.readyState == 4 && this.status == 200){
            let courseData = JSON.parse(this.responseText);
            let output = '';

            for (let item of courseData) {
                output += `                    
                        <div class="other-course-box detail-course-box">
                                    <div class=" col-12">
                                        <div class="other-video-secreen">
    
                                            <iframe width="560" height="315" src="${item.iframe}"
                                                title="YouTube video player" frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                        </div>
                                    </div>
    
                                    <div class="row">
                                        <div class="col-12">
                                            <h2 class="other-course-headline">${item.title}</h2>
                                        </div>
                                    </div>
                                </div>                 
                            `;
            }

            container.innerHTML = output;
        }
    }
}

getAllCourses(javascript, javascriptFile);
getAllCourses(html, htmlFile);
getAllCourses(css, cssFile);
getAllCourses(jquery, jqueryFile);