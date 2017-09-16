$(function ()
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

    $('#login-button').on('click', (function (e)
    {
        /*e.preventDefault();
        loginError.hide();
        var email = $('#email').val();
        var password = $('#password').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then (function () {
                window.location = 'dashboard.html'
            }).catch(function (error) {
                loginError.text(error.message);
                loginError.show();
            });*/
        console.log('button clicked');
    });
});
