
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
    emailjs.init("O9IFE8zq5fjh3gYYw"); 

    let form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", sendEmail);
    }
});

let isSubmitting = false; 

function sendEmail(event) {
    event.preventDefault(); 

    if (isSubmitting) return; 
    isSubmitting = true; 

    let submitButton = document.getElementById("submit-btn");
    if (!submitButton) {
        console.error("Submit button not found!");
        return;
    }

   
    submitButton.disabled = true;
    submitButton.textContent = "Sending... ⏳";

   
    let formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

  
    if (!formData.name || !formData.email || !formData.message) {
        alert("Please fill in all required fields! ❌");
        resetFormState();
        return;
    }

   
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


function resetFormState() {
    let submitButton = document.getElementById("submit-btn");
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
    isSubmitting = false;
}
