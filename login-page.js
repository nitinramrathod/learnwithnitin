$(document).ready(function(){
    var userInformation;
    var loginUsername; 
    var loginPassword;

    var savedUsername; 
    var savedPassword; 

    var authenticated;
    var url = window.location.href;
    var newUrl;


    $('#register-form').css('display','none')

    $('.create-acc').on('click', function(){        
        $('#register-form').css('display','flex')
        $('#login-form').css('display','none')
    })
    $('.login-acc').on('click', function(){        
        $('#register-form').css('display','none')
        $('#login-form').css('display','flex')
    })

    $('#register-form').on('submit', function(e){
        e.preventDefault();
        var formData = $(this).serializeArray();
        localStorage.setItem('user', JSON.stringify(formData));
        $(this)[0].reset();

    });



    authenticated = sessionStorage.getItem('authenticated');  

    $('#login-form').on('submit', function(e){
        e.preventDefault();
        $('.error').text('')   

      
        loginUsername = $('#username').val()
        loginPassword = $('#password').val()
        userInformation = localStorage.getItem('user');
        var userInformationArray = JSON.parse(userInformation);
        
        if (userInformation) {
            savedUsername = userInformationArray[1].value;
            savedPassword = userInformationArray[3].value;
            if((loginUsername == savedUsername) && (loginPassword == savedPassword) ){   
                               
                
                document.cookie= "authenticated = true; max-age=172800";

               

                // var expiryTime = new Date().getTime() + (10 * 1000);
                // sessionStorage.setItem('authenticated', JSON.stringify({value: 'true', expiry: expiryTime}));
                location.reload();  
            }else{
                $('.error').text('Incorrect Password or Username')           
            }
            
        }else{
            $('.error').text('You not registered yet...')           
        }
          

    });

    var allCookies = document.cookie.split(';');
    var cookiesObject = allCookies.map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value])=>
            ({...accumulator, [key.trim()]: decodeURIComponent(value) }),
            {});

    console.log(cookiesObject);

    if(cookiesObject){

        if (cookiesObject.authenticated == 'true') {
            newUrl = url.replace('/login-page.html', '/index.html'); 
            window.history.replaceState({}, document.title, newUrl);
            location.reload();    
        }
    }
    




});