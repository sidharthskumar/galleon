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

    $('#logout').on('click', function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(function() {
            window.location = 'index.html'
        }, function(error) {
            // An error occurred
        });
    })

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // console.log(user);
            // do stuff with the user object
        }
    });
});
