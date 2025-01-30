// Register a new patient
document.getElementById('patientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const contact = document.getElementById('patientContact').value;
    const visitReason = document.getElementById('visitReason').value;
    const token = 'Token-' + Math.floor(Math.random() * 1000000);
    // Validate phone number (must be exactly 10 digits)
    if (contact.length !== 10 || !/^\d{10}$/.test(contact)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }


    db.collection('patients').add({
        name,
        age,
        contact,
        visitReason,
        token,
        prescriptions: [],
        billing: {
            amount: 0,  // Set an initial billing amount
            status: 'Unpaid'  // Initial status
        }
    }).then(() => {
        document.getElementById('generatedToken').textContent = token;
        document.getElementById('patientForm').reset();
        alert('Patient registered successfully!');
    }).catch((error) => console.error('Error registering patient:', error));
});

// Get references to DOM elements
const billingPatientSelect = document.getElementById('billingPatientSelect');
const generateBillButton = document.getElementById('generateBillButton');

// Function to populate the Billing Dropdown (Only Patients with Prescriptions)
function populateBillingDropdown() {
    db.collection('patients').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const patient = doc.data();
            // Only add patients with prescriptions
            if (Array.isArray(patient.prescriptions) && patient.prescriptions.length > 0 && patient.billing && patient.billing.status === 'Unpaid') {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = patient.name;
                billingPatientSelect.appendChild(option);
            }
        });
    }).catch((error) => {
        console.error('Error populating Billing dropdown:', error);
    });
}

// Generate bill when the button is clicked
generateBillButton.addEventListener('click', () => {
    const patientID = billingPatientSelect.value;
    if (!patientID) {
        alert('Please select a patient.');
        return;
    }

    db.collection('patients').doc(patientID).get().then((doc) => {
        const patient = doc.data();

        // Ensure the patient has prescriptions
        if (!Array.isArray(patient.prescriptions) || patient.prescriptions.length === 0) {
            alert('This patient has no prescriptions. No bill can be generated.');
            return;
        }

        const billAmount = 100;
        const totalBill = billAmount;

        // Update the patient's billing info in Firestore
        db.collection('patients').doc(patientID).update({
            'billing.amount': totalBill,
            'billing.status': 'Paid'  // Set billing status to 'Paid'
        }).then(() => {
            // Show the generated bill details along with the prescriptions
            const billDetails = document.getElementById('billDetails');
            billDetails.innerHTML = `
                <strong>Bill for ${patient.name} (Token: ${patient.token})</strong><br>
                <strong>Total Bill: $${totalBill}</strong><br>
                <strong>Status: Paid</strong><br>
                <strong>Prescriptions:</strong><br>
                ${patient.prescriptions.join('<br>')}
            `;
        }).catch((error) => {
            console.error('Error updating billing information:', error);
        });
    }).catch((error) => {
        console.error('Error fetching patient details:', error);
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

// Populate the billing dropdown on page load
populateBillingDropdown();
