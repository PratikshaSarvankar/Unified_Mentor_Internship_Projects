document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth(); // Firebase authentication service
  const firestore = firebase.firestore(); // Firebase Firestore service

  // Add Teacher
  document.getElementById("teacherForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission to allow custom handling

    // Get values from input fields
    const teacherName = document.getElementById("teacherName").value.trim();
    const teacherEmail = document.getElementById("teacherEmail").value.trim();
    const teacherPassword = document.getElementById("teacherPassword").value;
    const subject = document.getElementById("subject").value.trim();
    const department = document.getElementById("department").value.trim();

    try {
      // Create a new teacher account with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(
        teacherEmail,
        teacherPassword
      );
      const userId = userCredential.user.uid; // Get user ID

      // Store teacher information in Firestore
      await firestore.collection("users").doc(userId).set({
        name: teacherName,
        email: teacherEmail,
        role: "Teacher", // Role is set to Teacher
        subject,
        department,
      });

      alert("Teacher registered successfully!"); // Show success message
      loadTeachers(); // Refresh the teacher list
    } catch (error) {
      console.error("Error registering teacher:", error.message); // Log error in console
      alert(error.message); // Show error message to user
    }
  });

  // Load Teachers
  function loadTeachers() {
    // Listen for changes to the 'users' collection where role is 'Teacher'
    firestore
      .collection("users")
      .where("role", "==", "Teacher")
      .onSnapshot((snapshot) => {
        const teachersList = document.getElementById("teachersList");
        teachersList.innerHTML = ""; // Clear existing teacher list

        // Loop through each teacher in the snapshot
        snapshot.forEach((doc) => {
          const teacher = doc.data();
          const teacherRow = document.createElement("tr"); // Create a table row for each teacher

          // Populate the table row with teacher information
          teacherRow.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.department}</td>
            <td>
              <button onclick="editTeacher('${doc.id}')">Edit</button>
              <button onclick="deleteTeacher('${doc.id}')">Delete</button>
            </td>
          `;

          // Append the row to the teacher list table
          teachersList.appendChild(teacherRow);
        });
      });
  }

  // Edit Teacher
  window.editTeacher = function (teacherId) {
    // Fetch the teacher's data from Firestore and populate the edit form
    firestore.collection("users").doc(teacherId).get().then((doc) => {
      if (doc.exists) {
        const teacher = doc.data();
        document.getElementById("editTeacherId").value = teacherId;
        document.getElementById("editTeacherName").value = teacher.name || ''; // Prevent undefined
        document.getElementById("editTeacherEmail").value = teacher.email || ''; // Prevent undefined
        document.getElementById("editTeacherSubject").value = teacher.subject || ''; // Prevent undefined
        document.getElementById("editTeacherDepartment").value = teacher.department || ''; // Prevent undefined

        // Show the edit form
        document.getElementById("editTeacherFormContainer").style.display = "block";
      } else {
        alert("Teacher not found!"); // Teacher does not exist
      }
    }).catch((error) => {
      console.error("Error fetching teacher data:", error.message);
    });
  };

  // Update Teacher
  document.getElementById("editTeacherForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission to allow custom handling

    // Get updated teacher information from the edit form
    const teacherId = document.getElementById("editTeacherId").value;
    const updatedName = document.getElementById("editTeacherName").value.trim();
    const updatedEmail = document.getElementById("editTeacherEmail").value.trim();
    const updatedSubject = document.getElementById("editTeacherSubject").value.trim();
    const updatedDepartment = document.getElementById("editTeacherDepartment").value.trim();

    const updatedData = {}; // Create an object to store updated fields

    // Add non-empty fields to updatedData
    if (updatedName) updatedData.name = updatedName;
    if (updatedEmail) updatedData.email = updatedEmail;
    if (updatedSubject) updatedData.subject = updatedSubject;
    if (updatedDepartment) updatedData.department = updatedDepartment;

    // If no fields are updated, show an alert
    if (Object.keys(updatedData).length === 0) {
      alert("Please update at least one field.");
      return;
    }

    try {
      // Update teacher data in Firestore
      await firestore.collection("users").doc(teacherId).update(updatedData);
      alert("Teacher updated successfully!");
      document.getElementById("editTeacherForm").reset(); // Clear the form
      document.getElementById("editTeacherFormContainer").style.display = "none"; // Hide the form
      loadTeachers(); // Refresh the teacher list
    } catch (error) {
      alert("Error updating teacher:", error.message); // Show error message
    }
  });

  // Delete Teacher
  window.deleteTeacher = function (teacherId) {
    if (confirm("Are you sure you want to delete this teacher?")) {
      // Confirm deletion before proceeding
      firestore
        .collection("users")
        .doc(teacherId)
        .delete() // Delete teacher from Firestore
        .then(() => {
          alert("Teacher deleted successfully!"); // Show success message
          loadTeachers(); // Refresh the teacher list
        })
        .catch((error) => {
          alert("Error deleting teacher:", error.message); // Show error message
        });
    }
  };

  // Load Students
  function loadStudents() {
    // Listen for changes to the 'users' collection where role is 'Student'
    firestore
      .collection("users")
      .where("role", "==", "Student")
      .onSnapshot((snapshot) => {
        const studentsList = document.getElementById("studentsList");
        studentsList.innerHTML = ""; // Clear existing student list

        snapshot.forEach((doc) => {
          const student = doc.data();
          const studentRow = document.createElement("tr"); // Create a table row for each student

          // Populate the table row with student information and actions
          studentRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.approved ? "Yes" : "No"}</td>
            <td>
              ${!student.approved ? `
                <button onclick="approveStudent('${doc.id}')">Approve</button>
                <button onclick="denyStudent('${doc.id}')">Deny</button>
              ` : `
                <span>Approved</span>
                <button onclick="deleteStudent('${doc.id}')">Delete</button>
              `}
            </td>
          `;

          // Append the row to the student list table
          studentsList.appendChild(studentRow);
        });
      });
  }

  // Approve Student
  window.approveStudent = function (studentId) {
    firestore
      .collection("users")
      .doc(studentId)
      .update({ approved: true }) // Update student as approved
      .then(() => {
        alert("Student approved!");
        loadStudents(); // Refresh the student list
      })
      .catch((error) => {
        alert(error.message); // Show error message
      });
  };

  // Deny Student (Flag as Denied or Delete)
  window.denyStudent = function (studentId) {
    if (confirm("Are you sure you want to deny this student registration?")) {
      firestore
        .collection("users")
        .doc(studentId)
        .update({ approved: false }) // Flag student as denied
        .then(() => {
          alert("Student registration denied!");
          loadStudents(); // Refresh the student list
        })
        .catch((error) => {
          alert(error.message); // Show error message
        });
    }
  };

  // Delete Student
  window.deleteStudent = function (studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
      firestore
        .collection("users")
        .doc(studentId)
        .delete() // Delete student from Firestore
        .then(() => {
          alert("Student deleted successfully!");
          loadStudents(); // Refresh the student list
        })
        .catch((error) => {
          alert(error.message); // Show error message
        });
    }
  };

  // Logout Functionality
  document.getElementById("logout").addEventListener("click", async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      alert("You have logged out successfully.");
      window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
      alert("Error logging out: " + error.message); // Show error message
    }
  });

  // Initial Load
  loadTeachers(); // Load teachers on page load
  loadStudents(); // Load students on page load
});
