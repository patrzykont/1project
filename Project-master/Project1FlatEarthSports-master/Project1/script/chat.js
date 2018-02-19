 // Initialize Firebase
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyA6ivCV35AE3NkrcUbqhrnZA75Jx33bAlg",
    authDomain: "messageboard2-55935.firebaseapp.com",
    databaseURL: "https://messageboard2-55935.firebaseio.com",
    projectId: "messageboard2-55935"

    };
    var myFirebase; 
    var usernameInput = document.querySelector('#username');
    var textInput = document.querySelector('#text');
    var postButton = document.querySelector('#post');

    firebase.initializeApp(config);
    myFirebase = firebase.database();

    postButton.addEventListener("click", function() {
      var msgUser = usernameInput.value;
      var msgText = textInput.value;
      myFirebase.ref().child('users').push({username:msgUser, text:msgText});
      textInput.value = "";
    });
     var startListening = function() {
      myFirebase.ref('users').on('child_added', function(snapshot) {
        var msg = snapshot.val();
      
        var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = msg.username;
        
        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;
  
        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);
        msgElement.className = "msg";

        document.getElementById("results").appendChild(msgElement);
        console.log("Results have changes: " + msgElement);
      }, function(error) {
            console.log("Error: "  + error);
      });
    }

    // Begin listening for data
    startListening();