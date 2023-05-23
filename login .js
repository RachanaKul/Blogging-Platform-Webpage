function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        })
        .catch(function(error) {
            var errorMessage = error.message;
            alert("Login failed: " + errorMessage);
        });
}
