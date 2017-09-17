/**
 * Landing Page
 */

$(function()
{

    //Init Firebase
    firebase.initializeApp
    (
        {
            apiKey: "AIzaSyC5nMI6ctCwOfCr7UPBlpCdrP4Ky2MzDuQ",
            authDomain: "htn-ea844.firebaseapp.com",
            databaseURL: "https://htn-ea844.firebaseio.com",
            projectId: "htn-ea844",
            storageBucket: "htn-ea844.appspot.com",
            messagingSenderId: "250290051676"
        }
    );

    //Login Button Listener
    $("#login-button").click(function()
    {
        //Inputs
        var email = $('#input-email').val();
        var password = $('#input-password').val();

        //Firebase Auth and Redirect
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function()
            {
                window.location = 'dashboard.html'
            }).catch(function(error)
            {
                console.log(error);
            });
    });

    //Signup Listener
    $("#signup-button").click(function()
    {
        //Hide error message by default
        $('#error-message').hide();

        //Inputs
        var email = $('#input-email').val();
        var password = $('#input-password').val();

        var error = false;

        //Save error if one happens on auth
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(e)
        {
            console.log(e);
            error = e;
            $('#error-message').text(e.message);
            $('#error-message').show();
        });


        //Auto redirect upon successful registration
        if(!error)
        {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function()
                {
                    window.location = 'dashboard.html'
                }).catch(function(error)
                {
                    console.log(error);
                });
        }

    });



    

});
