// Listen for form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Log in the user
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in successfully:', user);

            // Fetch the user's role from Firestore
            firebase.firestore().collection('users').doc(user.uid).get()
                .then((doc) => {
                    console.log('Fetching user data for UID:', user.uid); // Log the UID being used
                    console.log('Document ID:', doc.id); // Log the document ID in Firestore
                    if (doc.exists) {
                        const role = doc.data().role;
                        console.log('User role:', role);

                        // Redirect based on user role
                        if (role === 'Doctor') {
                            window.location.href = 'doctor-dashboard.html'; // Redirect to Doctor's Dashboard
                        } else if (role === 'Receptionist') {
                            window.location.href = 'receptionist-dashboard.html'; // Redirect to Receptionist's Dashboard
                        } else {
                            alert('Unknown user role.');
                        }
                    } else {
                        console.log('User data not found in Firestore');
                        alert('User data not found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user role:', error);
                    alert('Error fetching user role.');
                });
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            alert('Error logging in: ' + error.message);
        });
});
