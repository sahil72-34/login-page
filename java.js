const loginTabBtn = document.getElementById('loginTabBtn');
const signupTabBtn = document.getElementById('signupTabBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTabBtn.addEventListener('click', () => {
    loginTabBtn.classList.add('active');
    signupTabBtn.classList.remove('active');
    loginForm.classList.add('active-form');
    signupForm.classList.remove('active-form');
});

signupTabBtn.addEventListener('click', () => {
    signupTabBtn.classList.add('active');
    loginTabBtn.classList.remove('active');
    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});

// PASSWORD VISIBILITY TOGGLE
function setupPasswordToggle(toggleId, inputId) {
    const toggleIcon = document.getElementById(toggleId);
    const passwordInput = document.getElementById(inputId);

    toggleIcon.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    });
}

setupPasswordToggle('toggleLoginPassword', 'loginPassword');
setupPasswordToggle('toggleSignupPassword', 'signupPassword');

// HELPER FUNCTION: TOAST NOTIFICATIONS
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    if (isError) {
        toast.classList.add('error-toast');
    } else {
        toast.classList.remove('error-toast');
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// EMAIL VALIDATION HELPER
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// LOGIN FORM VALIDATION & SUBMISSION
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    let isValid = true;

    // Email Check
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
    }

    // Password Check
    if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        passwordInput.classList.add('error');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
    }

    if (isValid) {
        showToast('Login successful!');
        
        // Wait 1 second so user sees the notification, then open home.html
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    }
});

// SIGN UP FORM VALIDATION & SUBMISSION
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('signupName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');

    const nameError = document.getElementById('signupNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');

    let isValid = true;

    // Name Check
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Full name is required.';
        nameInput.classList.add('error');
        isValid = false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
    }

    // Email Check
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required.';
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
    }

    // Password Check
    if (!passwordInput.value) {
        passwordError.textContent = 'Password is required.';
        passwordInput.classList.add('error');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordInput.classList.add('error');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
    }

    if (isValid) {
        showToast('Account created successfully!');
        console.log('Sign Up Payload:', {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        });
        signupForm.reset();
        
        // Switch to Login tab automatically after signup
        setTimeout(() => {
            loginTabBtn.click();
        }, 1200);
    }
});

// FORGOT PASSWORD LINK ACTION
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    if (email && isValidEmail(email)) {
        showToast(`Reset link sent to ${email}`);
    } else {
        showToast('Please enter your email above first.', true);
    }
});


    