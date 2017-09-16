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

    $('#upload-form').on('submit', function (e) {
        e.preventDefault();
        var timestamp = Number(new Date());
        var storageRef = firebase.storage().ref(timestamp.toString());

        var fileData = $('#upload').prop('files')[0];

        storageRef.put(fileData);
    });
});
