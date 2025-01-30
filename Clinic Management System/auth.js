document.addEventListener('DOMContentLoaded', () => {
    // Registration Logic
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value;

            // Register the user
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('User registered successfully:', user);

                    // Save additional user data to Firestore
                    const userData = {
                        name: name,
                        email: email,
                        phone: phone,
                        role: role,
                    };

                    firebase.firestore().collection('users').doc(user.uid).set(userData)
                        .then(() => {
                            console.log('User data saved to Firestore');
                            alert('Registration successful! Please log in.');
                            window.location.href = 'login.html'; // Redirect to login page
                        })
                        .catch((error) => {
                            console.error('Error saving user data to Firestore:', error);
                            alert('Error saving user data: ' + error.message);
                        });
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                    alert('Error registering user: ' + error.message);
                });
        });
    }

    // Login Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
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
    }
});
