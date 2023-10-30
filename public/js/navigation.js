const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".internal-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});
