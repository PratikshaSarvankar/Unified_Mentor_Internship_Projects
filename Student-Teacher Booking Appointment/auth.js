document.addEventListener("DOMContentLoaded", function () {
  const auth = firebase.auth(); // Initialize Firebase Authentication

  // Get references to the role select dropdown and the teacher-specific fields
  const roleSelect = document.getElementById("role");
  const teacherFields = document.getElementById("teacherFields");

  // Show/hide subject and department fields based on selected role
  roleSelect.addEventListener("change", function () {
    if (roleSelect.value === "Teacher") {
      teacherFields.style.display = "block";  // Show teacher fields (subject and department)
    } else {
      teacherFields.style.display = "none";  // Hide teacher fields for non-teacher roles
    }
  });

  // Handle form submission for user registration
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get input values from the registration form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    let subject = null;
    let department = null;

    // If the role is Teacher, collect subject and department fields
    if (role === "Teacher") {
      subject = document.getElementById("subject").value.trim();
      department = document.getElementById("department").value.trim();

      // Ensure both subject and department are filled for the teacher role
      if (!subject || !department) {
        alert("Please fill in both Subject and Department for the Teacher role.");
        return; // Exit the registration process if required fields are missing
      }
    }

    // Create a new user with email and password
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;

        // Update user profile with the provided name
        return userCredential.user.updateProfile({ displayName: name }).then(() => {
          // Prepare user data to store in Firestore (including name, email, role, subject, and department)
          const userData = { name, email, role };
          if (role === "Teacher") {
            userData.subject = subject; // Add subject for Teacher role
            userData.department = department; // Add department for Teacher role
          }
          if (role === "Student") {
            userData.department = ""; // Leave department empty for Student role
            userData.subject = ""; // Leave subject empty for Student role
          }

          // Store the user data in Firestore
          return firebase.firestore().collection("users").doc(userId).set(userData);
        });
      })
      .then(() => {
        // Show a success message and redirect to the login page after successful registration
        alert("Registration successful! Redirecting to the login page.");
        window.location.href = "login.html";
      })
      .catch((error) => {
        // Log and display error message in case of a registration failure
        console.error("Error during registration:", error.message);
        alert(error.message);
      });
  });

  // Trigger the change event on page load to initialize the visibility of teacher fields
  roleSelect.dispatchEvent(new Event("change"));
});
