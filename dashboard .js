// Check if user is logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userId = user.uid;
        var username = user.email;

        document.getElementById("username").textContent = username;

        // Retrieve and display user's blog posts from the database
        var blogPostsRef = firebase.firestore().collection("blogPosts");
        blogPostsRef.where("userId", "==", userId).get()
            .then(function(querySnapshot) {
                var blogPostsDiv = document.getElementById("blogPosts");
                querySnapshot.forEach(function(doc) {
                    var blogPost = doc.data();
                    var blogPostElement = document.createElement("div");
                    blogPostElement.innerHTML = `
                        <h3>${blogPost.title}</h3>
                        <p>${blogPost.content}</p>
                    `;
                    blogPostsDiv.appendChild(blogPostElement);
                });
            })
            .catch(function(error) {
                console.log("Error getting blog posts: ", error);
            });
    } else {
        // User is not logged in, redirect to login page
        window.location.href = "login.html";
    }
});

function createPost() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;

    // Get the currently logged-in user's ID
    var userId = firebase.auth().currentUser.uid;

    // Save the blog post to the database
    firebase.firestore().collection("blogPosts").add({
        userId: userId,
        title: title,
        content: content
    })
    .then(function() {
        alert("Blog post created successfully!");
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    })
    .catch(function(error) {
        console.log("Error creating blog post: ", error);
    });
}
