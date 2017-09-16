$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyC5nMI6ctCwOfCr7UPBlpCdrP4Ky2MzDuQ",
        authDomain: "htn-ea844.firebaseapp.com",
        databaseURL: "https://htn-ea844.firebaseio.com",
        projectId: "htn-ea844",
        storageBucket: "htn-ea844.appspot.com",
        messagingSenderId: "250290051676"
    };

    firebase.initializeApp(config);

    var loginError = $('#login-error');

    loginError.hide();

    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        loginError.hide();
        var email = $('#email').val();
        var password = $('#password').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then (function () {
                window.location = 'dashboard.html'
            }).catch(function (error) {
                loginError.text(error.message);
                loginError.show();
            });
    });
});
