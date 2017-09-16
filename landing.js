$(function()
{

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

    $("#login-button").click(function()
    {
        var email = $('#input-email').val();
        var password = $('#input-password').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function()
            {
                window.location = 'dashboard.html'
            }).catch(function(error)
            {
                console.log(error);
            });
    });

    $("#signup-button").click(function()
    {
        $('#error-message').hide();

        var email = $('#input-email').val();
        var password = $('#input-password').val();

        var error = false;

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(e)
        {
            console.log(e);
            error = e;
            $('#error-message').text(e.message);
            $('#error-message').show();
        });


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
