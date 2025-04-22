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

  document.addEventListener("DOMContentLoaded", function () {
    // Check if elements exist before adding event listeners
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const sidebarClose = document.querySelector(".sidebar-close");
    const body = document.body;

    // Check if navbar elements exist
    if (!sidebarToggle || !sidebar) {
      console.error("Navbar elements not found. Check your HTML classes.");
      return; // Exit the function if elements don't exist
    }

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
      event.stopPropagation(); // Prevent event bubbling
      toggleSidebar();
    });

    // Close sidebar when X is clicked (if it exists)
    if (sidebarClose) {
      sidebarClose.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event bubbling
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

    // Hide sidebar on window resize if width becomes larger than 786px
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 787 && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        body.style.overflow = "";
      }
    });

    // Initialize sidebar state
    if (window.innerWidth < 787) {
      sidebar.classList.remove("open"); // Ensure closed on mobile by default
    }

    // Add visible class after DOM is fully loaded to enable transitions
    setTimeout(() => {
      sidebar.classList.add("sidebar-initialized");
    }, 100);
  });

  // Keep your other scripts (video player, testimonials, contact form) as they were
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

  // 5. ENHANCED USER EXPERIENCE
  (function () {
    // Add cursor pointer to all social media icons
    const socialIcons = document.querySelectorAll(".social-media img");
    socialIcons.forEach((icon) => {
      icon.style.cursor = "pointer";
    });

    // Email and phone click-to-action
    const allTextElements = document.querySelectorAll(".text-wrapper-22");

    // Find phone numbers and email addresses
    allTextElements.forEach((element) => {
      const text = element.textContent.trim();

      // Check if it's a phone number (contains parentheses or digits with dashes)
      if (text.includes("(") || /\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(text)) {
        element.addEventListener("click", () => {
          window.location.href = `tel:${text.replace(/[^0-9]/g, "")}`;
        });
        element.style.cursor = "pointer";
      }

      // Check if it's an email (contains @ symbol)
      else if (text.includes("@")) {
        element.addEventListener("click", () => {
          window.location.href = `mailto:${text}`;
        });
        element.style.cursor = "pointer";
      }
    });

    // Newsletter subscription validation
    const newsletterForm = document.querySelector(".mailing-input");
    const newsletterInput = document.querySelector(".input");
    const subscribeButton = document.querySelector(".text-button-wrapper");

    if (newsletterForm && newsletterInput && subscribeButton) {
      // Create validation message element
      const validationMessage = document.createElement("div");
      validationMessage.className = "validation-message";
      validationMessage.style.color = "red";
      validationMessage.style.fontSize = "0.8rem";
      validationMessage.style.marginTop = "0.3rem";
      validationMessage.style.position = "absolute";
      validationMessage.style.bottom = "-1.5rem";
      validationMessage.style.left = "0";

      // Add validation message after the input
      newsletterInput.parentElement.style.position = "relative";
      newsletterInput.parentElement.appendChild(validationMessage);

      // Validate email format
      function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      // Handle newsletter form submission
      subscribeButton.addEventListener("click", (e) => {
        const email = newsletterInput.value.trim();

        if (email === "") {
          validationMessage.textContent = "Please enter your email address";
          validationMessage.classList.add("error");
          e.preventDefault();
          return false;
        } else if (!isValidEmail(email)) {
          validationMessage.textContent = "Please enter a valid email address";
          validationMessage.classList.add("error");
          e.preventDefault();
          return false;
        } else {
          validationMessage.textContent = "Subscription successful!";
          validationMessage.classList.remove("error");
          validationMessage.classList.add("success");
          validationMessage.style.color = "green";

          // Optional: Reset the form after successful submission
          setTimeout(() => {
            newsletterInput.value = "";
            validationMessage.textContent = "";
          }, 3000);
        }
      });

      // Clear validation message when user starts typing
      newsletterInput.addEventListener("input", () => {
        validationMessage.textContent = "";
        validationMessage.classList.remove("error", "success");
      });
    }

    // Form validation
    const contactForm = document.querySelector("form");
    if (contactForm) {
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector("textarea");
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Create error message elements
      function createErrorElement() {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "red";
        errorDiv.style.fontSize = "0.8rem";
        errorDiv.style.marginTop = "0.3rem";
        return errorDiv;
      }

      // Add error message below an input
      function showError(input, message) {
        // Remove any existing error message
        const existingError =
          input.parentElement.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }

        // Create and append new error message
        const errorDiv = createErrorElement();
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = "red";
      }

      // Clear error message
      function clearError(input) {
        const existingError =
          input.parentElement.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }
        input.style.borderColor = "";
      }

      // Input validation on blur
      if (nameInput) {
        nameInput.addEventListener("blur", () => {
          if (nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name");
          } else {
            clearError(nameInput);
          }
        });
      }

      if (emailInput) {
        emailInput.addEventListener("blur", () => {
          if (emailInput.value.trim() === "") {
            showError(emailInput, "Please enter your email");
          } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address");
          } else {
            clearError(emailInput);
          }
        });
      }

      if (messageInput) {
        messageInput.addEventListener("blur", () => {
          if (messageInput.value.trim() === "") {
            showError(messageInput, "Please enter your message");
          } else {
            clearError(messageInput);
          }
        });
      }

      // Form submit validation
      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          let isValid = true;

          // Validate name
          if (nameInput && nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name");
            isValid = false;
          }

          // Validate email
          if (emailInput) {
            if (emailInput.value.trim() === "") {
              showError(emailInput, "Please enter your email");
              isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
              showError(emailInput, "Please enter a valid email address");
              isValid = false;
            }
          }

          // Validate message
          if (messageInput && messageInput.value.trim() === "") {
            showError(messageInput, "Please enter your message");
            isValid = false;
          }

          if (!isValid) {
            e.preventDefault(); // Prevent form submission if validation fails
          }
        });
      }
    }

    // Add active state to buttons
    const buttons = document.querySelectorAll(
      "button, .master-button-5, .master-button-6, .text-button-wrapper"
    );
    buttons.forEach((button) => {
      button.addEventListener("mousedown", () => {
        button.style.transform = "scale(0.98)";
      });

      button.addEventListener("mouseup", () => {
        button.style.transform = "";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });
  })();
});
