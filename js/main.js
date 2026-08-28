// Small bits of behavior can be added here as the site grows.

document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});
