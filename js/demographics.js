$(function()
{
    var config = {
        apiKey: "AIzaSyC5nMI6ctCwOfCr7UPBlpCdrP4Ky2MzDuQ",
        authDomain: "htn-ea844.firebaseapp.com",
        databaseURL: "https://htn-ea844.firebaseio.com",
        projectId: "htn-ea844",
        storageBucket: "htn-ea844.appspot.com",
        messagingSenderId: "250290051676"
    };

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
                var userData = snapshot.val();
                var names = userData.name.split(' ', 2);
                $('#input-first-name').val(names[0]);
                $('#input-last-name').val(names[1]);
                $('#input-sex').val('unknown');
                $('#input-age').val(userData.age);
            });
        }
    });

	$('.button').click(
		function(e)
		{
			var me = $(e.target);
			if(me.attr('data-value') == "0")
			{
				me.attr('data-value', "1");
				me.css('background-color', '#75B3FA');
				me.css('color', 'white');
			}
			else
			{
				me.attr('data-value', "0");
				me.css('background-color', 'white');
				me.css('color', '#75B3FA');
			}

			e.preventDefault();
		})
});
