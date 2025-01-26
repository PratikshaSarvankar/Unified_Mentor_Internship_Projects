// Ensure Firestore and Auth are initialized
const auth = firebase.auth();

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Sign out the user and redirect to login page
      auth.signOut().then(() => {
        window.location.href = "login.html";
      });
    });
  }
});

// Fetch appointments for the logged-in teacher and include student names
const fetchAppointments = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    // Fetch all appointments for the logged-in teacher from Firestore
    const querySnapshot = await db
      .collection("appointments")
      .where("teacherId", "==", user.uid)
      .get(); // Removed the status filter to fetch all appointments

    const appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = "";

    if (querySnapshot.empty) {
      appointmentList.innerHTML = "<p>No appointments found.</p>";
      return;
    }

    // Iterate through each appointment to display it
    querySnapshot.forEach(async (doc) => {
      const appointment = doc.data();

      // Fetch student details using studentId
      const studentDoc = await db.collection("users").doc(appointment.studentId).get();
      const studentName = studentDoc.exists ? studentDoc.data().name : "Unknown Student";

      // Create list item with student name and appointment details
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>Student Name:</strong> ${studentName}<br>
        <strong>Appointment Date:</strong> ${appointment.date}<br>
        <strong>Status:</strong> ${appointment.status || "Pending"}<br>
        <button class="approve" data-id="${doc.id}" ${appointment.status === "approved" ? "disabled" : ""}>Approve</button>
        <button class="cancel" data-id="${doc.id}">Cancel</button>
      `;

      appointmentList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

// Approve/Cancel appointments
document.getElementById("appointmentList").addEventListener("click", async (event) => {
  const id = event.target.getAttribute("data-id");

  if (event.target.classList.contains("approve")) {
    try {
      // Approve the appointment in Firestore
      await db.collection("appointments").doc(id).update({ status: "approved" });
      alert("Appointment approved!");
      fetchAppointments(); // Refresh the list after approval
    } catch (error) {
      console.error("Error approving appointment:", error);
    }
  } else if (event.target.classList.contains("cancel")) {
    try {
      // Cancel the appointment in Firestore
      await db.collection("appointments").doc(id).delete();
      alert("Appointment canceled!");
      fetchAppointments(); // Refresh the list after cancellation
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  }
});

// Fetch messages for the logged-in teacher
const fetchMessages = () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  // Listen to changes in the messages collection for the logged-in teacher
  db.collection("messages")
    .where("receiverId", "==", user.uid)
    .onSnapshot((querySnapshot) => {
      const messageList = document.getElementById("messageList");
      messageList.innerHTML = "";

      // Iterate through each message and display it
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        // Fetch student details using senderId
        db.collection("users").doc(message.senderId).get()
          .then((studentDoc) => {
            const studentName = studentDoc.exists ? studentDoc.data().name : "Unknown Student";

            // Create message item with student name and message text
            const messageItem = document.createElement("div");
            messageItem.innerHTML = `
              <p><strong>From Student:</strong> ${studentName}<br>
              <strong>Message:</strong> ${message.text}</p>
            `;

            messageList.appendChild(messageItem);
          })
          .catch((error) => {
            console.error("Error fetching student name:", error);
          });
      });
    });
};

// Fetch approved appointments for the teacher to display in "All Appointments"
const fetchApprovedAppointments = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated.");
    return;
  }

  try {
    // Fetch only approved appointments for the logged-in teacher
    const querySnapshot = await db
      .collection("appointments")
      .where("teacherId", "==", user.uid)
      .where("status", "==", "approved")
      .get();

    const allAppointmentsList = document.getElementById("allAppointmentsList");
    allAppointmentsList.innerHTML = "";

    if (querySnapshot.empty) {
      allAppointmentsList.innerHTML = "<p>No approved appointments.</p>";
      return;
    }

    // Iterate through each approved appointment and display it
    querySnapshot.forEach((doc) => {
      const appointment = doc.data();

      // Fetch student details using studentId
      db.collection("users").doc(appointment.studentId).get()
        .then((studentDoc) => {
          const studentName = studentDoc.exists ? studentDoc.data().name : "Unknown Student";

          // Create list item with student name and appointment details
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>Student Name:</strong> ${studentName}<br>
            <strong>Appointment Date:</strong> ${appointment.date}<br>
          `;

          allAppointmentsList.appendChild(listItem);
        })
        .catch((error) => {
          console.error("Error fetching student name:", error);
        });
    });
  } catch (error) {
    console.error("Error fetching approved appointments:", error);
  }
};

// Calendar setup
document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");

  // Initialize FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    editable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: async (fetchInfo, successCallback, failureCallback) => {
      const user = auth.currentUser;
      if (!user) {
        failureCallback("User not authenticated.");
        return;
      }

      try {
        // Fetch teacher availability from Firestore
        const snapshot = await db
          .collection("teachers")
          .doc(user.uid)
          .collection("availability")
          .get();

        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: "Available",
          start: doc.data().date,
        }));
        successCallback(events);
      } catch (error) {
        failureCallback(error);
      }
    },
    dateClick: async (info) => {
      const user = auth.currentUser;
      if (!user) {
        alert("User not authenticated.");
        return;
      }

      const availability = { date: info.dateStr };

      try {
        // Add the teacher's availability to Firestore
        await db.collection("teachers").doc(user.uid).collection("availability").add(availability);
        calendar.addEvent({ title: "Available", start: info.dateStr });
        alert("Availability added!");
      } catch (error) {
        console.error("Error adding availability:", error);
      }
    },
    eventClick: async (info) => {
      if (confirm("Do you want to remove this availability?")) {
        const user = auth.currentUser;
        if (!user) {
          alert("User not authenticated.");
          return;
        }

        try {
          // Remove teacher's availability from Firestore
          await db.collection("teachers").doc(user.uid).collection("availability").doc(info.event.id).delete();
          info.event.remove();
          alert("Availability removed!");
        } catch (error) {
          console.error("Error removing availability:", error);
        }
      }
    },
  });

  calendar.render();
});

// Initialize dashboard data when authentication state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    fetchAppointments(); // Fetch appointments for the teacher
    fetchMessages(); // Fetch messages for the teacher
    fetchApprovedAppointments(); // Fetch approved appointments for the teacher
  } else {
    console.error("User not authenticated. Redirecting to login.");
    window.location.href = "login.html"; // Redirect to login page if not authenticated
  }
});
