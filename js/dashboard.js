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
            var uid = user.uid;
            firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
                var userData = snapshot.val();

                $('#name').text(userData.name);
                 if(userData.origin == "USA")
                {
                    console.log('usa');
                    $("#tip1").text("Congratulations! Immigrants from the US and the UK generally have high incomes in Canada.");
                }

                console.log(userData);
                if(userData.trade_occupations_certificate)
                {
                    $("#tip2").text("Did you know? Despite being only worth 50 CSR points, most skilled laborers are accepted into Canada");
                }

                var age = userData.age;

                var score = 0;

                // todo: add in the ability to query spouses
                if (true) {
                    if (age <= 17) {
                        score += 0;
                    } else if (age < 18) {
                        score += 99;
                    } else if (age < 19) {
                        score += 105;
                    } else if (age >= 20 && age <= 29) {
                        score += 110;
                    } else if (age <= 30) {
                        score += 105;
                    } else if (age <= 31) {
                        score += 99;
                    } else if (age <= 32) {
                        score += 94;
                    } else if (age <= 33) {
                        score += 88;
                    } else if (age <= 34) {
                        score += 83;
                    } else if (age <= 35) {
                        score += 77;
                    } else if (age <= 36) {
                        score += 72;
                    } else if (age <= 37) {
                        score += 66;
                    } else if (age <= 38) {
                        score += 61;
                    } else if (age <= 39) {
                        score += 55;
                    } else if (age <= 40) {
                        score += 50;
                    } else if (age <= 41) {
                        score += 39;
                    } else if (age <= 42) {
                        score += 28;
                    } else if (age <= 43) {
                        score += 17;
                    } else if (age <= 44) {
                        score += 6;
                    } else if (age >= 45) {
                        score += 0;
                    }

                    if (userData.nominated_for_pns) {
                        score += 500;
                    }

                    $('#points-value').text(score);
                }

                setTimeout(function () {
                    $.support.cors = true;
                    $.post('http://galleonapi.justinstribling.me/find_mentor', userData)
                    .done(function (mentor) {
                        $('#mentor-number').text(mentor.phone);
                        $('#mentor-email').text(mentor.email);
                    });
                });
            });
        }
    });
});
