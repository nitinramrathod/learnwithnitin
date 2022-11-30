// all courses script here API json fetching.

var javascript = document.getElementById('javascript-courses');
var javascriptFile = 'courses/javascript.json';

var html = document.getElementById('html-courses');
var htmlFile = 'courses/html.json';

var css = document.getElementById('css-courses');
var cssFile = 'courses/css.json';

var jquery = document.getElementById('jquery-courses');
var jqueryFile = 'courses/jquery.json';

let cursor = document.getElementById('pointer');


// mouse pointer 
// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.pageX + 'px';
//     cursor.style.top = e.pageY + 'px';
// })

document.querySelector('body').addEventListener('mousemove', eyeball);
// making function here 
function eyeball(){
    var eye = document.querySelectorAll('.eye');

    eye.forEach(function(eye){
        let x = (eye.getBoundingClientRect().left)+ (eye.clientWidth/2);
        let y = (eye.getBoundingClientRect().top)+ (eye.clientHeight/2);

        let radian = Math.atan2(event.pageX -x, event.pageY- y);
        let rot = (radian * (180/Math.PI) * -1)+ 230;
        eye.style.transform = "rotate("+rot+"deg)";
    })
}



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