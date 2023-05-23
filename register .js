function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            alert("Registration successful!");
            window.location.href = "dashboard.html";
        })
        .catch(function(error) {
            var errorMessage = error.message;
            alert("Registration failed: " + errorMessage);
        });
}
