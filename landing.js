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

                             setTimeout(function() { window.location='demographics.html'; }, 150);


                            
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
                            var uid = user.uid;
                            console.log(uid);
                            firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
                              if(snapshot.val())
                              {
                                var complete = snapshot.val().infoComplete;
                                if(complete)
                                {
                                    window.location = 'dashboard.html';
                                }
                                else
                                {
                                    window.location = 'demographics.html';
                                }
                              }
                            });
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

    $("#google-button").click(function()
    {
        console.log('clicked');
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          var uid = user.uid;
            console.log(uid);
            firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
              console.log(snapshot);
              if(snapshot.val())
              {
                var complete = snapshot.val().infoComplete;
                if(complete)
                {
                    window.location = 'dashboard.html';
                }
                else
                {
                    window.location = 'demographics.html';
                }
              }
              else
              {
                firebase.database().ref('users/' + uid).set(
                             {
                                  infoComplete: false
                            });
                window.location = 'demographics.html';
              }
            });
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        
    });

   


    

});
