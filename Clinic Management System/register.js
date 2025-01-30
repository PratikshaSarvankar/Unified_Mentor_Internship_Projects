document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    // Validate phone number (must be exactly 10 digits)
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Register the user using Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Save user data to Firestore
            firebase.firestore().collection('users').doc(user.uid).set({
                name: name,
                email: email,
                phone: phone,
                role: role
            })
            .then(() => {
                console.log('User registered successfully');
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect to login page after successful registration
            })
            .catch((error) => {
                console.error('Error saving user data to Firestore:', error);
                alert('Error during registration. Please try again.');
            });
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            alert('Error registering user: ' + error.message);
        });
});
