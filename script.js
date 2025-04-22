document.addEventListener("DOMContentLoaded", function () {
  // 1. SIDEBAR/NAVBAR FUNCTIONALITY
  (function () {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const sidebarClose = document.querySelector(".sidebar-close");
    const body = document.body;

    // Check if elements exist
    if (sidebarToggle && sidebar) {
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
      sidebarToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSidebar();
      });

      // Close sidebar when X is clicked
      if (sidebarClose) {
        sidebarClose.addEventListener("click", function (event) {
          event.stopPropagation();
          toggleSidebar();
        });
      }

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

      // Hide sidebar on window resize
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 787 && sidebar.classList.contains("open")) {
          sidebar.classList.remove("open");
          body.style.overflow = "";
        }
      });
    }
  })(); // Self-executing function to isolate scope

  // 2. VIDEO PLAYER FUNCTIONALITY
  (function () {
    const video = document.getElementById("feature-video");
    if (!video) return; // Skip if video doesn't exist

    const playButton = document.querySelector(".play-button");
    const progressBar = document.querySelector(".progress-bar");
    const progressContainer = document.querySelector(".progress-container");
    const timer = document.querySelector(".timer");

    // Format time from seconds to MM:SS
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      return `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    // Update progress bar and timer
    video.addEventListener("timeupdate", () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      // Update progress bar
      const progressPercent = (currentTime / duration) * 100;
      if (progressBar) progressBar.style.width = progressPercent + "%";
      // Update timer
      if (timer && !isNaN(duration)) {
        timer.textContent = `${formatTime(currentTime)}/${formatTime(
          duration
        )}`;
      }
    });

    // Play/pause when clicking on video or play button
    if (playButton) {
      playButton.addEventListener("click", togglePlay);
      video.addEventListener("click", togglePlay);
    }

    function togglePlay() {
      if (video.paused) {
        video.play();
        if (playButton) playButton.style.display = "none";
      } else {
        video.pause();
        if (playButton) playButton.style.display = "flex";
      }
    }

    // Show play button when video ends
    video.addEventListener("ended", () => {
      if (playButton) playButton.style.display = "flex";
    });

    // Allow seeking by clicking on progress bar
    if (progressContainer) {
      progressContainer.addEventListener("click", (e) => {
        const progressContainerWidth = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / progressContainerWidth) * duration;
      });
    }

    // Initialize timer display when video metadata is loaded
    video.addEventListener("loadedmetadata", () => {
      if (timer) timer.textContent = `00:00/${formatTime(video.duration)}`;
    });
  })();

  // 3. TESTIMONIAL SLIDER FUNCTIONALITY
  (function () {
    // Get references to necessary elements
    const testimonialWrapper = document.querySelector(
      ".testimonial-style-wrapper"
    );
    if (!testimonialWrapper) return; // Skip if wrapper doesn't exist

    const testimonials = document.querySelectorAll(".testimonial-style");
    const dots = document.querySelectorAll(".master-button");
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // Go to a specific slide by index
    function goToSlide(index) {
      if (index < 0) {
        index = totalTestimonials - 1;
      } else if (index >= totalTestimonials) {
        index = 0;
      }
      currentIndex = index;

      testimonialWrapper.style.transform = `translateX(-${
        currentIndex * (100 / totalTestimonials)
      }%)`;
      updateDots();
    }

    // Update the dot indicators
    function updateDots() {
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove("inactive");
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
          dot.classList.add("inactive");
        }
      });
    }

    // Go to the next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    // Timer variables
    let slideTimer;
    const slideInterval = 5000; // 5 seconds

    // Start the automatic slide timer
    function startTimer() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Reset the timer (for when a dot is clicked)
    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }

    // Initialize the slider
    function initSlider() {
      // Set up event listeners for the dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetTimer();
        });
      });

      // Start the automatic slide timer
      startTimer();
    }

    // Initialize the slider
    initSlider();
  })();

  // 4. CONTACT FORM AND MODAL FUNCTIONALITY
  (function () {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return; // Skip if form doesn't exist

    const modal = document.getElementById("success-modal");
    const closeBtn = document.querySelector(".close");

    // Form submission event
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!modal) return;

      // Display modal with animation
      modal.style.display = "flex";

      // Add a small delay before adding the show class for animation
      setTimeout(() => {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
      }, 10);
    });

    // Close modal function
    function closeModal() {
      if (!modal) return;

      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        if (contactForm) contactForm.reset(); // Reset the form after submission
      }, 400); // Match this to your CSS transition duration
    }

    // Close button event
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Click outside modal to close
    if (modal) {
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Add modal button functionality if it exists
    const modalButton = document.querySelector(".modal-button");
    if (modalButton) {
      modalButton.addEventListener("click", closeModal);
    }
  })();
});
