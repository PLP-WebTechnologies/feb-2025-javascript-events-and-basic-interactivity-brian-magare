// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. EVENT HANDLING SECTION
    // =============================================

    // Button click event
    const clickButton = document.getElementById('click-button');
    clickButton.addEventListener('click', function() {
        this.textContent = 'You clicked me!';
        this.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            this.textContent = 'Click Me Again!';
            this.style.backgroundColor = '#3498db';
        }, 1500);
    });

    // Hover effects
    const hoverDiv = document.getElementById('hover-div');
    hoverDiv.addEventListener('mouseenter', function() {
        this.textContent = 'Mouse is over me!';
        this.style.backgroundColor = '#f1c40f';
        this.style.color = '#2c3e50';
    });
    hoverDiv.addEventListener('mouseleave', function() {
        this.textContent = 'Hover Over Me!';
        this.style.backgroundColor = '#ecf0f1';
        this.style.color = '#333';
    });

    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });

    // Secret action (double-click or long press)
    const secretDiv = document.getElementById('secret-div');
    let longPressTimer;
    const longPressDuration = 1000; // 1 second

    secretDiv.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(() => {
            this.textContent = 'You held me down! Secret unlocked! 🎉';
            this.style.backgroundColor = '#9b59b6';
            this.style.color = 'white';
        }, longPressDuration);
    });

    secretDiv.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });

    secretDiv.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });

    secretDiv.addEventListener('dblclick', function() {
        this.textContent = 'You double-clicked me! Secret unlocked! 🎉';
        this.style.backgroundColor = '#e74c3c';
        this.style.color = 'white';
    });

    // Reset secret div after 3 seconds
    secretDiv.addEventListener('click', function() {
        setTimeout(() => {
            this.textContent = 'Try double-clicking or long-pressing me!';
            this.style.backgroundColor = '#ecf0f1';
            this.style.color = '#333';
        }, 3000);
    });

    // =============================================
    // 2. INTERACTIVE ELEMENTS SECTION
    // =============================================

    // Button that changes color
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;

    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
    });

    // Image gallery/slideshow
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;

    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }

    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 5000);

    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // =============================================
    // 3. FORM VALIDATION SECTION
    // =============================================

    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessages = document.querySelectorAll('.error-message');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
            // Reset all error messages
            errorMessages.forEach(msg => msg.textContent = '');
            // Reset password strength indicator
            updatePasswordStrength('');
        }
    });

    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const errorElement = nameInput.nextElementSibling;
        
        if (nameValue === '') {
            errorElement.textContent = 'Name is required';
            return false;
        } else if (nameValue.length < 2) {
            errorElement.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            errorElement.textContent = '';
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailValue)) {
            errorElement.textContent = 'Please enter a valid email address';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value;
        const errorElement = passwordInput.nextElementSibling;
        
        if (passwordValue === '') {
            errorElement.textContent = 'Password is required';
            updatePasswordStrength('');
            return false;
        } else if (passwordValue.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters';
            updatePasswordStrength(passwordValue);
            return false;
        } else {
            errorElement.textContent = '';
            updatePasswordStrength(passwordValue);
            return true;
        }
    }

    // Password strength indicator
    function updatePasswordStrength(password) {
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        
        if (!password) {
            strengthMeter.style.width = '0%';
            strengthMeter.style.backgroundColor = 'transparent';
            strengthText.textContent = '';
            return;
        }
        
        // Simple strength calculation
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^A-Za-z0-9]/)) strength += 1;
        
        const width = strength * 25;
        let color, text;
        
        switch(strength) {
            case 1:
                color = '#e74c3c';
                text = 'Weak';
                break;
            case 2:
                color = '#f39c12';
                text = 'Moderate';
                break;
            case 3:
                color = '#3498db';
                text = 'Strong';
                break;
            case 4:
                color = '#2ecc71';
                text = 'Very Strong';
                break;
            default:
                color = '#e74c3c';
                text = 'Very Weak';
        }
        
        strengthMeter.style.width = `${width}%`;
        strengthMeter.style.backgroundColor = color;
        strengthText.textContent = text;
        strengthText.style.color = color;
    }
});