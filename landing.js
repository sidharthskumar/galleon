/**
 * Landing Page
 */

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

        if(!error)
        {
            //Login after 500ms if no error
            setTimeout(function()
            {
                //Firebase Auth and Redirect
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function()
                    {
                        firebase.auth().onAuthStateChanged(function(user) {
                          if (user)
                          {
                            //Successful Login - open the db and set some data
                            var database = firebase.database();
                            uid = user.uid

                             firebase.database().ref('users/' + uid).set(
                             {
                                  infoComplete: false
                            });

                            setTimeout(function(){window.location = 'demographics.html';}, 250);
                          } else
                          {
                            // No user is signed in.
                          }
                        });
                        
                    }).catch(function(error)
                    {
                        console.log(error);
                    });
            }, 250);
        }

    });


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
                //Wait for user object
                firebase.auth().onAuthStateChanged(function(user) {
                          if (user)
                          {
                            console.log(user.uid);
                          } else
                          {
                            // No user is signed in.
                          }
                });
            }).catch(function(error)
            {
                console.log(error);
            });
    });

   


    

});
