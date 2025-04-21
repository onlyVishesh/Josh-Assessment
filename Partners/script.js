document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar-close");
  const body = document.body;

  // Function to toggle sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("open");

    // Prevent body scrolling when sidebar is open
    if (sidebar.classList.contains("open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Open sidebar when toggle button is clicked
  sidebarToggle.addEventListener("click", function () {
    toggleSidebar();
  });

  // Close sidebar when X is clicked
  sidebarClose.addEventListener("click", function () {
    toggleSidebar();
  });

  // Close sidebar when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !sidebarToggle.contains(event.target)
    ) {
      toggleSidebar();
    }
  });

  // Hide sidebar on window resize if width becomes larger than 786px
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 787 && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      body.style.overflow = "";
    }
  });
});
