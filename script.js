
document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll(".nav-link");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("O9IFE8zq5fjh3gYYw"); // Replace with your EmailJS Public Key

    let form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", sendEmail);
    }
});

let isSubmitting = false; // Flag to prevent duplicate submissions

function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    if (isSubmitting) return; // Stop if already submitting
    isSubmitting = true; // Set flag to prevent multiple submissions

    let submitButton = document.getElementById("submit-btn");
    if (!submitButton) {
        console.error("Submit button not found!");
        return;
    }

    // Disable button & show loading text
    submitButton.disabled = true;
    submitButton.textContent = "Sending... ⏳";

    // Get form values
    let formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
        alert("Please fill in all required fields! ❌");
        resetFormState();
        return;
    }

    // Send Email via EmailJS
    emailjs.send("service_b810lei", "template_ywcyiyj", formData)
        .then(function () {
            alert("Message Sent Successfully! ✅");
            document.getElementById("contact-form").reset();
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);
            alert("Failed to Send Message ❌, Try Again!");
        })
        .finally(resetFormState);
}

// Function to reset button & submission state
function resetFormState() {
    let submitButton = document.getElementById("submit-btn");
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
    isSubmitting = false; // Allow new submissions
}
