// Ensure db is declared only once


// Function to fetch and display patient details
function displayPatientDetails() {
    const patientListDiv = document.getElementById('patientList');
    patientListDiv.innerHTML = ''; // Clear previous data

    db.collection('patients').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const patientDiv = document.createElement('div');
            patientDiv.classList.add('patient-item');
            patientDiv.innerHTML = `
                <p><strong>Name:</strong> ${patient.name}</p>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Contact:</strong> ${patient.contact}</p>
                <p><strong>Reason for Visit:</strong> ${patient.visitReason}</p>
                <p><strong>Token:</strong> ${patient.token}</p>
            `;
            patientListDiv.appendChild(patientDiv);
        });
    }).catch((error) => {
        console.error('Error fetching patient details:', error);
    });
}

// Function to populate the patient dropdown for prescriptions
function populatePatientDropdown() {
    const patientSelect = document.getElementById('patientSelect');
    patientSelect.innerHTML = '<option value="">-- Select Patient --</option>'; // Clear previous options

    db.collection('patients').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = patient.name;
            patientSelect.appendChild(option);
        });
    }).catch((error) => {
        console.error('Error populating patient dropdown:', error);
    });
}

// Function to save a prescription
document.getElementById('savePrescriptionButton').addEventListener('click', () => {
    const patientID = document.getElementById('patientSelect').value;
    const prescription = document.getElementById('prescriptionInput').value;

    if (!patientID) {
        alert('Please select a patient.');
        return;
    }
    if (!prescription) {
        alert('Please enter a prescription.');
        return;
    }

    // Add prescription to the patient's record
    db.collection('patients').doc(patientID).update({
        prescriptions: firebase.firestore.FieldValue.arrayUnion(prescription),
    }).then(() => {
        alert('Prescription saved successfully!');
        document.getElementById('prescriptionInput').value = ''; // Clear the input field
    }).catch((error) => {
        console.error('Error saving prescription:', error);
    });
});

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error during logout:', error);
    });
}

// Call functions to initialize data on page load
displayPatientDetails();
populatePatientDropdown();
