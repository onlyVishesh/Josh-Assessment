const contactForm = document.getElementById("contact-form");
const modal = document.getElementById("success-modal");
const closeBtn = document.querySelector(".close");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open"); // Toggle the 'open' class
});
