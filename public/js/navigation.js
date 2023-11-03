const mediaQuery = window.matchMedia("(max-width: 992px)");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".internal-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

navLinks.addEventListener("click", function () {
    if (mediaQuery.matches) {
        navLinks.classList.toggle("show");
    }
});
