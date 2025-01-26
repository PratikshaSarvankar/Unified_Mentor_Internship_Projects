// Firebase configuration for the project
var firebaseConfig = {
  apiKey: "AIzaSyC6FTLhB02p04g97KPNCkxjzUkCLTtVx_Y",
  authDomain: "student-teacher-booking-dccca.firebaseapp.com",
  projectId: "student-teacher-booking-dccca",
  storageBucket: "student-teacher-booking-dccca.appspot.com",
  messagingSenderId: "681670673624",
  appId: "1:681670673624:web:someappid",
  measurementId: "G-measurement-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
