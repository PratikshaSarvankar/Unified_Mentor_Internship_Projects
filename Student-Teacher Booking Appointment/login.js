// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const auth = firebase.auth(); // Firebase Authentication instance

  // Add event listener to the login form
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Retrieve user input
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Firebase Authentication: Sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Fetch user details from Firestore
        firebase.firestore().collection("users").doc(user.uid).get()
          .then((doc) => {
            if (doc.exists) {
              const userRole = doc.data().role; // Extract user role
              const isApproved = doc.data().approved; // Extract approval status

              // Redirect based on user role
              if (userRole === "Admin") {
                window.location.href = "admin-dashboard.html";
              } else if (userRole === "Teacher") {
                window.location.href = "teacher-dashboard.html";
              } else if (userRole === "Student") {
                if (isApproved) {
                  window.location.href = "student-dashboard.html";
                } else {
                  alert("Your registration is still pending approval.");
                }
              } else {
                alert("Unknown role. Please contact support.");
              }
            } else {
              alert("User document not found. Please contact support.");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data.");
          });
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(error.message); // Display the error message
      });
  });
});
