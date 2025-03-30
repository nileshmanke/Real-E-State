
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

(function(){
    emailjs.init("O9IFE8zq5fjh3gYYw"); // Replace with your EmailJS Public Key
})();

function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // Send Email via EmailJS
    emailjs.send("service_b810lei", "template_ywcyiyj", formData)
    .then(function(response) {
        alert("Message Sent Successfully! ✅");
        document.getElementById("contact-form").reset(); // Clear form
    }, function(error) {
        alert("Failed to Send Message ❌, Try Again!");
    });
}
