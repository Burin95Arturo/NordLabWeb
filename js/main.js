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
