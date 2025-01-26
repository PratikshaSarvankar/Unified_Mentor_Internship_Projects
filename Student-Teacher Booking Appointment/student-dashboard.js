// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const logoutButton = document.getElementById("logout");
  const searchBox = document.getElementById("searchBox");
  const teacherList = document.getElementById("teacherList");
  const calendarEl = document.getElementById("calendar");
  const approvedAppointments = document.getElementById("approvedAppointments");
  const messageList = document.getElementById("messageList");
  const messageInput = document.getElementById("messageInput");
  const sendMessageButton = document.getElementById("sendMessage");

  // Global variables
  let studentId = null; // To store the logged-in student's ID
  let teacherId = null; // To store the selected teacher's ID
  let isLoggingOut = false; // Prevent duplicate redirects during logout

  // Firebase Auth: Listener to check authentication state
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      studentId = user.uid; // Save the student's UID
      fetchApprovedAppointments(); // Load approved appointments for the student
      fetchMessages(); // Load messages for the student
    } else {
      if (!isLoggingOut) { // Redirect to login only if not in logout process
        alert("User not authenticated. Redirecting to login.");
        window.location.href = "login.html";
      }
    }
  });

  // Logout functionality
  logoutButton.addEventListener("click", () => {
    isLoggingOut = true; // Set flag to prevent multiple redirects
    firebase.auth().signOut()
      .then(() => {
        studentId = null; // Clear studentId after logout
        window.location.href = "login.html"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout Error: ", error);
        isLoggingOut = false; // Reset flag if logout fails
      });
  });

  // Search for teachers by name or department
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim().toLowerCase(); // Normalize input
    teacherList.innerHTML = ""; // Clear previous search results

    if (!query) return; // Exit if search query is empty

    // Fetch teachers from Firestore
    db.collection("users")
      .where("role", "==", "Teacher") // Only fetch users with role 'Teacher'
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const teacher = doc.data();
          // Match teachers by name or department
          if (
            teacher.name.toLowerCase().includes(query) ||
            teacher.department.toLowerCase().includes(query)
          ) {
            const li = document.createElement("li");
            li.textContent = `${teacher.name} - ${teacher.department}`;
            li.dataset.id = doc.id; // Store teacher ID for future reference
            li.addEventListener("click", () => loadTeacherCalendar(doc.id)); // Load teacher's calendar on click
            teacherList.appendChild(li); // Add to the list
          }
        });
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  });

  // Load teacher's availability calendar
  const loadTeacherCalendar = (teacherIdParam) => {
    teacherId = teacherIdParam; // Save the selected teacher's ID
    calendarEl.innerHTML = ""; // Clear previous calendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth", // Monthly view
      events: async (fetchInfo, successCallback, failureCallback) => {
        try {
          // Fetch availability from Firestore
          const teacherSnapshot = await db
            .collection("teachers")
            .doc(teacherId)
            .collection("availability")
            .get();

          const events = teacherSnapshot.docs.map((doc) => ({
            title: "Available", // Show available slots
            start: doc.data().date, // Date of availability
          }));
          successCallback(events); // Load events into calendar
        } catch (error) {
          failureCallback(error); // Handle errors
        }
      },
      dateClick: (info) => {
        // Create an appointment on date click
        const appointment = {
          studentId,
          teacherId,
          date: info.dateStr, // Date clicked
        };
        db.collection("appointments")
          .add(appointment) // Save appointment to Firestore
          .then(() => alert("Appointment scheduled!"))
          .catch((error) => console.error("Error scheduling appointment:", error));
      },
    });

    calendar.render(); // Render the calendar
  };

  // Fetch and display approved appointments
  const fetchApprovedAppointments = () => {
    if (!studentId) return; // Exit if no student ID

    db.collection("appointments")
      .where("studentId", "==", studentId) // Filter by logged-in student
      .where("status", "==", "approved") // Fetch only approved appointments
      .onSnapshot((snapshot) => {
        approvedAppointments.innerHTML = ""; // Clear old appointments

        snapshot.forEach(async (doc) => {
          const appointment = doc.data();
          // Fetch teacher's name using teacherId
          const teacherDoc = await db.collection("users").doc(appointment.teacherId).get();
          const teacherName = teacherDoc.exists ? teacherDoc.data().name : "Unknown Teacher";

          const li = document.createElement("li");
          li.textContent = `${appointment.date} with teacher: ${teacherName}`;
          approvedAppointments.appendChild(li); // Add to the list
        });
      });
  };

  // Send a message to the selected teacher
  sendMessageButton.addEventListener("click", () => {
    const message = messageInput.value.trim(); // Get input value

    if (message && studentId && teacherId) {
      const messageData = {
        senderId: studentId, // Logged-in student
        receiverId: teacherId, // Selected teacher
        text: message, // Message content
      };

      db.collection("messages")
        .add(messageData) // Save message to Firestore
        .then(() => {
          messageInput.value = ""; // Clear input field
          fetchMessages(); // Refresh messages
          alert("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          alert("Error sending message.");
        });
    } else {
      alert("Please enter a message before sending.");
    }
  });

  // Fetch messages for the logged-in student
  const fetchMessages = () => {
    if (!studentId) return; // Exit if no student ID

    db.collection("messages")
      .where("receiverId", "==", studentId) // Filter by recipient ID
      .onSnapshot((snapshot) => {
        messageList.innerHTML = ""; // Clear old messages

        snapshot.forEach((doc) => {
          const message = doc.data();

          db.collection("users")
            .doc(message.senderId) // Get sender details
            .get()
            .then((studentDoc) => {
              if (studentDoc.exists) {
                const studentName = studentDoc.data().name;
                const messageDiv = document.createElement("div");
                messageDiv.textContent = `${studentName}: ${message.text}`;
                messageList.appendChild(messageDiv); // Add to the list
              } else {
                console.error("Student not found");
              }
            })
            .catch((error) => console.error("Error fetching sender name:", error));
        });
      });
  };
});
