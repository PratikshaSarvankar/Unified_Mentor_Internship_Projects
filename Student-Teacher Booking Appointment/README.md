
# Student-Teacher Booking Appointment System



## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [Admin Dashboard Features](#admin-dashboard-features)
  - [Teacher Dashboard Features](#teacher-dashboard-features)
  - [Student Dashboard](#student-dashboard-features)
  - [Other Features](#other-features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Prerequisites/Setup](#prerequisitessetup)
- [Run Locally](#run-locally)
- [Deployment](#deployment)
- [Live Web App](#live-web-app)
- [Screenshot of the live application](#screenshot-of-the-live-application)
- [Acknowledgements](#acknowledgements)
- [Contact Information](#contact-information)
## Introduction
The **Student-Teacher Booking Appointment System** is a web-based application designed to facilitate smooth appointment scheduling and management between students and teachers. The system enables students to book appointments with teachers, communicate through messages, and manage their appointments. Teachers can view, approve, and manage appointments with students. The Admin is responsible for registering teachers, approving student registrations, and managing teacher and student data.

The system uses Firebase for authentication, real-time database management, and user roles (Admin, Teacher, and Student). The app is built with HTML, CSS, JavaScript, and Firebase as the backend to handle data storage and user authentication.

## Features
###  **Admin Dashboard Features**
- **Teacher Registration**: Admin can register new teachers by providing their information such as **Name**, **Email**, **Password**, **Subject**, and **Department**.
- **Teacher Information Management**: Admin can later **edit** or **delete** teacher information if needed.
- **Approve/Deny Student Registration**: Admin reviews and approves student registrations before they can access the system.
- **Student Management**: Admin has access to all registered and approved students. Admin can also **delete** students from the system.
- **Access to Teacher Dashboard**: Since Admin registers teachers, they have access to the **Teacher Dashboard** and know the teacher's credentials. Admin can view the teacher’s details and appointments.
- **No Access to Student Dashboard**: Admin does not have access to the **Student Dashboard**, as only students can manage their appointments and personal data after registration approval.

###  **Teacher Dashboard Features**
- **Set Availability (Date)**: Teachers can set their availability by selecting specific **dates** when they are available for appointments.
- **Approve/Cancel Appointments**: Teachers can approve or cancel student appointments based on their availability.
- **View Messages**: Teachers can view messages sent by students, allowing for better communication regarding appointments or other matters.
- **View Approved Appointments (Names)**: Teachers can see a list of all approved appointments, including the **names** of the students and the date of the appointment.

###  **Student Dashboard Features**
- **Search Teachers**: Students can search for teachers by **Name** or **Department** to find the right teacher for their needs.
- **View Teacher Availability**: Once a teacher is selected, the student can view the teacher's calendar, which shows the available **dates**.
- **Book Appointment**: After selecting an available date, students can book an appointment with the teacher for that specific date.
- **Send Message to Teacher**: Students can send messages to teachers for inquiries or to discuss appointment-related matters.
- **View Approved Appointments**: Students can see a list of all their **approved appointments**, including the appointment date and teacher name.

###  **Other Features**
- **Firebase Integration**: The system uses Firebase for storing real-time data, such as user registration details, appointment schedules, and messages. All data is synchronized across all devices.
- **Role-based Authentication**: Users are authenticated based on their role (Admin, Teacher, Student) to ensure appropriate access to features.
- **Registration Approval**: Students can only log in after their registration has been approved by the Admin.
- **Action Logs**: All user actions, such as registration, approval, and appointment scheduling, are logged for auditing purposes.
- **Error Notifications**: Clear notifications are displayed for errors or issues during user actions to guide users in resolving problems.


## Technologies Used

- **HTML**: Used for the structure and layout of the web pages, defining the elements like forms, buttons, and links.
- **CSS**: Used to style and design the web pages, ensuring they are visually appealing and user-friendly.
- **JavaScript**: Used to add interactivity to the web pages, such as handling user inputs, booking appointments, and dynamically displaying data.
- **Firebase**: Used for backend services, including user authentication (via Firebase Authentication) and real-time database management to store appointments, user data, and other details.
## System Architecture

This section provides an overview of the system architecture for the **Student-Teacher Booking Appointment System**. The system has three main roles: **Admin**, **Teacher**, and **Student**, each with different functionalities and access rights.

Below is the detailed architecture for the application:

![System Architecture](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/SystemArchitecture.png?raw=true)

The system involves:
- **Admin:** Registers teachers, approves student registration, and manages teacher/student data.
- **Teacher:** Sets availability, approves/cancels appointments, views approved appointments and views messages.
- **Student:** Searches for teachers, views availability, books appointments, sends messages, and views approved appointments.
## Prerequisites/Setup
Before you start, make sure you have the following prerequisites:

### 1.1 Required Tools

- **Text Editor**: You can use any text editor, but it's recommended to use:
  - [**Visual Studio Code (VSCode)**](https://code.visualstudio.com/)
  - [**Atom Text Editor**](https://atom.io/)

- **Node.js**: Make sure you have **Node.js** installed. If not, download and install it from [nodejs.org](https://nodejs.org/).
  - You can verify the installation by running:
    ```bash
    node -v
    ```

### 1.2 Firebase Setup

To use Firebase in this project, you need to set up Firebase services. Follow the complete guide for Firebase setup from the official Firebase documentation:

- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)

Make sure to:

- Create a Firebase project.
- Set up Firebase Authentication and Firestore Database as required by the project.

### 1.3 Firebase Configuration File

After setting up Firebase, you need to add your Firebase configuration details. Follow these steps:

- In your Firebase project settings, copy your **Firebase config**.
- Create a new file named `firebaseConfig.js` in your project’s folder.
- Paste your Firebase config into the `firebaseConfig.js` file:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   firebase.initializeApp(firebaseConfig);
## Run Locally

Clone the project

```bash
  git clone https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects.git
```

Go to the project directory

```bash
  cd Unified_Mentor_Internship_Projects
```

Install dependencies

```bash
  npm install
```
 **Reminder:**  
   Create and add your `firebaseConfig.js` file as mentioned in the [Firebase Setup](#firebase-setup) section.

Start the server

```bash
  npm run start
```

## Deployment

Follow these steps to deploy your project using Firebase Hosting:

### 1. Install Firebase CLI
Make sure Firebase CLI is installed. If not, install it globally using npm:

```bash
npm install -g firebase-tools
```

### 2. Log in to Firebase
Log in to your Firebase account from the terminal:

```bash
firebase login
```

### 3. Initialize Firebase Hosting
Go to your project directory:

```bash
cd <project-directory>
```
Initialize Firebase in your project:
```bash
firebase init
```

### 4. Deploy Your Project
Run the following command to deploy your project to Firebase Hosting:
```bash
firebase deploy
```




## Live Web App

You can visit the live web app by clicking on the link below:

[**Visit the Live Web App**](https://student-teacher-booking-25f1b.web.app/)
## Screenshot of the live application

Here is a screenshots of the live application:

### Registration Page
![Registration Page](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/RegistrationPage.png)
### Login Page
![Login Page](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/LoginPage.png)
### Admin Dashboard
![Admin Dashboard](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/AdminDashboard.png)
### Teacher Dashboard
![Teacher Dashboard](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/TeacherDashboard1.png)

![Teacher Dashboard](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/TeacherDashboard2.png)
### Student Dashboard
![Student Dashboard](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/StudentDashboard1.png)

![Student Dashboard](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Student-Teacher%20Booking%20Appointment/Screenshots/StudentDashboard2.png)


## Acknowledgements

- **[Firebase](https://firebase.google.com/)** - For providing the backend services for this application.
- **[Node.js](https://nodejs.org/)** - For enabling server-side JavaScript execution.
- **[GitHub](https://github.com/)** - For providing a platform to host and share the project.
- **[Markdown Guide](https://www.markdownguide.org/)** - For helping me understand how to format the README properly.
- **[Atom](https://atom.io/)** - For being the code editor of choice during development.
- **[README.so](https://readme.so/)** - For helping me create a well-structured and organized README file.
## Contact Information

If you have any questions or feedback, feel free to reach out to me at [pratiksha.s.1702@gmail.com](mailto:pratiksha.s.1702@gmail.com).

## License

[MIT](https://choosealicense.com/licenses/mit/)


