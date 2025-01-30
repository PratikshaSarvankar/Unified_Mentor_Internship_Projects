
# Clinic Management System



## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
  - [Doctor Dashboard Features](#doctor-dashboard-features)
  - [Receptionist Dashboard Features](#receptionist-dashboard-features)
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
## Clinic Management System  

The **Clinic Management System** is a web-based application designed to streamline patient registration, doctor consultations, and billing management. The system enables **receptionists** to register new patients, manage appointments, and generate bills, while **doctors** can view patient details and provide prescriptions. Receptionists can enter patient details such as **Name, Age, Contact, and Reason for Visit**, generating a **unique token** for each patient. Once a doctor provides a prescription, the **Billing Section** allows receptionists to generate bills only for prescribed patients, including **patient details, prescription, and a fixed charge of ₹100**.  

The system uses **Firebase** for authentication, real-time database management, and role-based access control (**Doctor and Receptionist**). The application is built with **HTML, CSS, JavaScript, and Firebase** as the backend to handle data storage and user authentication efficiently.


## Features  

### **Doctor Dashboard Features**  
- **View Patient Details**: Doctors can see a list of patients with details such as **Name, Age, Contact, Reason for Visit, and Token Number**.  
- **Manage Prescriptions**: Doctors can select a patient and enter a **prescription** in the designated section.  
- **Save Prescriptions**: Once a prescription is entered, the doctor can **save** it, making the patient eligible for billing in the **Receptionist Dashboard**.  
- **Real-time Data Sync**: The doctor's actions are updated in real time using **Firebase**, ensuring seamless data management.  

### **Receptionist Dashboard Features**  
- **Register New Patients**: The receptionist can register new patients by entering **Name, Age, Contact, and Reason for Visit**. A **unique token** is generated for each patient upon registration.  
- **Generate Token for Patients**: Receptionists can assign a **unique token** to each registered patient, facilitating smooth patient identification and management.  
- **Manage Billing**: Receptionists can select patients who have been prescribed medication by the doctor, and generate a bill that includes **patient details, the doctor’s prescription**, and a **fixed charge of ₹100**.  
- **Real-time Prescription Access**: Receptionists can instantly access the doctor's prescription for billing purposes, ensuring an efficient and seamless workflow.  
- **No Access to Patient Records**: Receptionists cannot view or edit the personal records of patients, maintaining data privacy. They only have access to billing and token generation functionalities.

### **Other Features**  
- **Role-based Authentication**: Users (Doctor and Receptionist) have role-specific access, ensuring secure system usage and ensuring that sensitive data is restricted based on roles.  
- **Firebase Integration**: The system uses **Firebase** for real-time database management, user authentication, and data synchronization across devices.  
- **Automated Token Generation**: Each patient receives a unique **Token ID** upon registration to ensure proper queue management and easy identification.  
- **User-friendly Interface**: The system is designed with an intuitive and interactive user interface (UI), making it easy for both doctors and receptionists to navigate and perform their tasks efficiently.

## Technologies Used

- **HTML**: Used to structure the web pages, creating elements such as forms for patient registration, login, and prescription management.
- **CSS**: Used for styling and designing the web pages to make the application visually appealing and user-friendly for both doctors and receptionists.
- **JavaScript**: Adds interactivity to the system, including handling user inputs, generating unique tokens for patients, managing appointments, and dynamically displaying patient and prescription data.
- **Firebase**: Provides backend services, including **Firebase Authentication** for user login and role-based access, as well as **Firebase Realtime Database** to manage and synchronize patient details, doctor prescriptions, billing information, and token generation in real time.


## System Architecture

This section provides an overview of the system architecture for the **Student-Teacher Booking Appointment System**. The system has three main roles: **Admin**, **Teacher**, and **Student**, each with different functionalities and access rights.

Below is the detailed architecture for the application:

![System Architecture](assets/images/system_architecture.png)

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
   Create and add your `firebaseConfig.js` file as mentioned in the [Firebase Setup](#prerequisitessetup) section.

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

[**Visit the Live Web App**](https://clinicmanagementsystem-97d24.web.app//)
## Screenshot of the live application

Here is a screenshots of the live application:

![Web App Screenshot](./images/web-app-screenshot.png)


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


