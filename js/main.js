// Small bits of behavior can be added here as the site grows.

document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const serviceOptions = document.querySelectorAll(
  'input[name="service"]'
);

const fileUploadField = document.getElementById(
  "file-upload-field"
);

serviceOptions.forEach((option) => {

  option.addEventListener("change", () => {

    const needsFile =
      option.value === "3D Printing" ||
      option.value === "3D Modeling + Printing";

    fileUploadField.hidden = !needsFile;

  });

});

/* =========================
WHAT WE DO → CONTACT
========================= */

const serviceItems = document.querySelectorAll(
".service-item[data-service]"
);

const contactSection = document.getElementById("contact");

function selectService(service) {

const option = document.querySelector(
`input[name="service"][value="${service}"]`
);

if (!option) return;

option.checked = true;

option.dispatchEvent(
new Event("change", { bubbles: true })
);

contactSection.scrollIntoView({
behavior: "smooth",
block: "start"
});

}

serviceItems.forEach((item) => {

item.addEventListener("click", () => {


selectService(
  item.dataset.service
);


});

item.addEventListener("keydown", (event) => {


if (
  event.key === "Enter" ||
  event.key === " "
) {

  event.preventDefault();

  selectService(
    item.dataset.service
  );

}


});

});

/* =========================
   CONTACT FORM SUBMIT
   ========================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
      ".form-button"
    );

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "SENDING... →";

    try {

      const formData = new FormData(contactForm);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your inquiry."
        );
      }

      contactForm.reset();

      /* Hide optional file upload */

      if (fileUploadField) {
        fileUploadField.hidden = true;
      }

      /* Remove selected service */

      serviceOptions.forEach((option) => {
        option.checked = false;
      });

      showFormMessage(
        "Your inquiry has been sent successfully. We'll get back to you soon.",
        "success"
      );

    } catch (error) {

      console.error("Form submission error:", error);

      showFormMessage(
        error.message ||
        "Something went wrong. Please try again.",
        "error"
      );

    } finally {

      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;

    }

  });

}


/* =========================
   FORM MESSAGE
   ========================= */

function showFormMessage(message, type) {

  let messageElement = document.getElementById("form-message");

  if (!messageElement) {

    messageElement = document.createElement("p");

    messageElement.id = "form-message";
    messageElement.className = "form-message";

    const formSubmit = document.querySelector(".form-submit");

    if (formSubmit) {
      formSubmit.appendChild(messageElement);
    }

  }

  messageElement.textContent = message;
  messageElement.className = `form-message ${type}`;

}