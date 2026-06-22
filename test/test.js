function validateForm(form, event) {
    event.preventDefault(); // Stop page reload

    // Extract form type directly from data-type attribute
    const formType = form.dataset.type; 
    
    // Scrape error div relative to the current form
    const errorDiv = form.querySelector('.error-message');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Common fields used by both forms
    // Note: If you remove IDs from HTML, change these to queryBy attribute/type
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // 1. Common Validation Rule for both forms
    if (!emailRegex.test(email)) {
        errorDiv.textContent = "Please enter a valid email address.";
        return false;
    }
    if (password.length < 6) {
        errorDiv.textContent = "Password must be at least 6 characters long.";
        return false;
    }

    // 2. Conditional Form Specific Rules
    if (formType === 'register') {
        const name = form.querySelector('input[type="text"]').value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

        if (name.trim() === "") {
            errorDiv.textContent = "Full name is required.";
            return false;
        }
        if (password !== confirmPassword) {
            errorDiv.textContent = "Passwords do not match.";
            return false;
        }
    }

    // 3. Clear errors and handle success
    errorDiv.textContent = "";
    alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} validation successful!`);
    
    // You can now reuse a single fetch statement for both flows
    // sendDataToServer(formType, { email, password }); 
    return true;
}
