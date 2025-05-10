
if (window.innerWidth < 1024) {
    alert("📢 For full functionality, please enable desktop mode in your browser.");
}

window.addEventListener("DOMContentLoaded", () => {
    fetch("/session")
        .then(res => res.json())
        .then(data => {
            const loginArea = document.getElementById("login-area");
            if (!loginArea) {
                console.warn("Login area not found on this page.");
                return;
            }

            if (data.loggedIn && data.user) {
                loginArea.innerHTML = `
                    <div class="dropdown user-dropdown">
                        <button class="btn custom-btn dropdown-toggle" id="userDropdown">
                            ${data.user.firstName} ${data.user.lastName}
                        </button>
                        <ul class="dropdown-menu custom-logout-menu" id="logoutMenu">
                            <li><a class="dropdown-item logout-item" href="/logout">Logout</a></li>
                        </ul>
                    </div>
                `;

                const dropdown = document.querySelector(".user-dropdown");
                const menu = document.getElementById("logoutMenu");

                dropdown.addEventListener("mouseenter", () => {
                    menu.style.display = "block";
                });
                dropdown.addEventListener("mouseleave", () => {
                    menu.style.display = "none";
                });
            }
        })
        .catch(err => console.error("Session fetch error:", err));
});


document.getElementById("newsletterForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the page from reloading on form submission

    const email = document.getElementById("email").value.trim();
    const messageDiv = document.getElementById("message"); // A div to display the message

    try {
        const response = await fetch("/newsletter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });

        const result = await response.json();

        if (result.success) {
            messageDiv.innerHTML = result.message;
            messageDiv.style.color = "green";
        } else {
            messageDiv.innerHTML = result.message;
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerHTML = "An error occurred. Please try again.";
        messageDiv.style.color = "red";
    }
});






document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear any existing messages
    document.getElementById("error-message").innerText = "";
    document.getElementById("success-message").innerText = "";

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    try {
        // Make a POST request to the server
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        const responseData = await response.json();

        if (!response.ok) {
            // Display the error message in bold red text
            document.getElementById("error-message").innerHTML = `<strong>${responseData.errorMessage || "An Error Occurred."}</strong>`;
        } else {
            // Display the success message in bold green text
            document.getElementById("success-message").innerHTML = `<strong>${responseData.message || "Signup Successful!"}</strong>`;

            // Optionally redirect after a delay
            setTimeout(() => {
                window.location.href = "/";
            }, 2000); // 2-second delay before redirection
        }
    } catch (error) {
        // Handle fetch or network errors
        console.error("Error during signup:", error);
        document.getElementById("error-message").innerHTML = `<strong>An unexpected error occurred. Please try again.</strong>`;
    }
});

document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear any previous messages
    const errorMessage = document.getElementById("error-message-1");
    const successMessage = document.getElementById("success-message-1");
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());

    try {
        // Send a POST request to /contactus
        const response = await fetch("/contactus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject),
        });

        const responseData = await response.json();

        if (!response.ok) {
            errorMessage.innerText = responseData.errorMessage || "An error occurred.";
            errorMessage.style.display = "block";
        } else {
            successMessage.innerText = responseData.message || "Message Sent Successfully 🏆! Wait For Us To Get Back To You ⏳";
            successMessage.style.display = "block";

            // Optionally clear the form
            this.reset();
        }
    } catch (error) {
        console.error("Error submitting contact form:", error);
        errorMessage.innerText = "❌ An Unexpected Error Occurred. Please Try Again Later.";
        errorMessage.style.display = "block";
    }
});


let index = 0;
const testimonials = document.querySelector('.testimonial-wrapper');
const totalTestimonials = document.querySelectorAll('.testimonial').length;
const dotsContainer = document.getElementById('dots-container');
let interval;

// Create dots dynamically
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalTestimonials; i++) {
        let dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('onclick', `goToTestimonial(${i})`);
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateSlider() {
    testimonials.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

function updateDots() {
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextTestimonial() {
    index = (index + 1) % totalTestimonials;
    updateSlider();
}

function prevTestimonial() {
    index = (index - 1 + totalTestimonials) % totalTestimonials;
    updateSlider();
}

function goToTestimonial(slideIndex) {
    index = slideIndex;
    updateSlider();
}

function startSlider() {
    interval = setInterval(nextTestimonial, 3000);
}

function stopSlider() {
    clearInterval(interval);
}

document.getElementById('testimonial-container').addEventListener('mouseenter', stopSlider);
document.getElementById('testimonial-container').addEventListener('mouseleave', startSlider);

// Initialize slider
createDots();
startSlider();