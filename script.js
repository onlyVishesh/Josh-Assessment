document.addEventListener("DOMContentLoaded", function () {
  // SIDEBAR/NAVBAR FUNCTIONALITY
  (function () {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const sidebarClose = document.querySelector(".sidebar-close");
    const sidebarLinks = document.querySelectorAll(
      ".sidebar-menu .content-item .text-wrapper a"
    );
    const body = document.body;

    if (sidebarToggle && sidebar) {
      function toggleSidebar() {
        sidebar.classList.toggle("open");
        if (sidebar.classList.contains("open")) {
          body.style.overflow = "hidden";
        } else {
          body.style.overflow = "";
        }
      }

      function closeSidebar() {
        sidebar.classList.remove("open");
        body.style.overflow = "";
      }

      sidebarToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleSidebar();
      });

      if (sidebarClose) {
        sidebarClose.addEventListener("click", function (event) {
          event.stopPropagation();
          toggleSidebar();
        });
      }

      // Add event listeners to sidebar menu links
      sidebarLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          closeSidebar();
        });
      });

      document.addEventListener("click", function (event) {
        if (
          sidebar.classList.contains("open") &&
          !sidebar.contains(event.target) &&
          !sidebarToggle.contains(event.target)
        ) {
          toggleSidebar();
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth >= 787 && sidebar.classList.contains("open")) {
          sidebar.classList.remove("open");
          body.style.overflow = "";
        }
      });
    }
  })();

  // VIDEO PLAYER FUNCTIONALITY
  (function () {
    const video = document.getElementById("feature-video");
    if (!video) return;

    const playButton = document.querySelector(".play-button");
    const progressBar = document.querySelector(".progress-bar");
    const progressContainer = document.querySelector(".progress-container");
    const timer = document.querySelector(".timer");
    const videoControls = document.querySelector(".video-controls");
    const videoContainer = document.querySelector(".overlap-group");

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      return `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    video.addEventListener("timeupdate", () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const progressPercent = (currentTime / duration) * 100;
      if (progressBar) progressBar.style.width = progressPercent + "%";
      if (timer && !isNaN(duration)) {
        timer.textContent = `${formatTime(currentTime)}/${formatTime(
          duration
        )}`;
      }
    });

    if (playButton) {
      playButton.addEventListener("click", togglePlay);
      video.addEventListener("click", togglePlay);

      playButton.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      });

      playButton.setAttribute("tabindex", "0");
      playButton.setAttribute("role", "button");
      playButton.setAttribute("aria-label", "Play video");
    }

    function togglePlay() {
      if (video.paused) {
        video.play();
        if (playButton) {
          playButton.style.display = "none";
          playButton.setAttribute("aria-label", "Pause video");
        }
        if (videoContainer) videoContainer.classList.add("video-playing");
      } else {
        video.pause();
        if (playButton) {
          playButton.style.display = "flex";
          playButton.setAttribute("aria-label", "Play video");
        }
        if (videoContainer) videoContainer.classList.remove("video-playing");
      }
    }

    video.addEventListener("ended", () => {
      if (playButton) {
        playButton.style.display = "flex";
        playButton.setAttribute("aria-label", "Replay video");
      }
      if (videoContainer) videoContainer.classList.remove("video-playing");
    });

    if (progressContainer) {
      progressContainer.addEventListener("click", (e) => {
        const progressContainerWidth = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = video.duration;
        video.currentTime = (clickX / progressContainerWidth) * duration;
      });

      progressContainer.setAttribute("tabindex", "0");
      progressContainer.setAttribute("role", "slider");
      progressContainer.setAttribute("aria-label", "Seek video timeline");

      progressContainer.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 5);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
        }
      });
    }

    video.addEventListener("loadedmetadata", () => {
      if (timer) timer.textContent = `00:00/${formatTime(video.duration)}`;
    });

    if (videoContainer) {
      videoContainer.addEventListener("mouseenter", () => {
        if (!video.paused && videoControls) {
          videoControls.style.opacity = "1";
        }
      });

      videoContainer.addEventListener("mouseleave", () => {
        if (!video.paused && videoControls) {
          videoControls.style.opacity = "0";
        }
      });
    }

    video.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        video.muted = !video.muted;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        video.volume = Math.min(1, video.volume + 0.1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        video.volume = Math.max(0, video.volume - 0.1);
      }
    });
  })();

  // TESTIMONIAL SLIDER FUNCTIONALITY
  (function () {
    const testimonialWrapper = document.querySelector(
      ".testimonial-style-wrapper"
    );
    if (!testimonialWrapper) return;

    const testimonials = document.querySelectorAll(".testimonial-style");
    const dots = document.querySelectorAll(".master-button");
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

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

      testimonials.forEach((testimonial, i) => {
        testimonial.setAttribute("aria-hidden", i !== currentIndex);
        if (i === currentIndex) {
          testimonial.setAttribute("tabindex", "0");
        } else {
          testimonial.setAttribute("tabindex", "-1");
        }
      });
    }

    function createLiveRegion() {
      const liveRegion = document.createElement("div");
      liveRegion.id = "slider-live-region";
      liveRegion.className = "sr-only";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      document.body.appendChild(liveRegion);
      return liveRegion;
    }

    function updateDots() {
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.remove("inactive");
          dot.classList.add("active");
          dot.setAttribute("aria-current", "true");
        } else {
          dot.classList.remove("active");
          dot.classList.add("inactive");
          dot.setAttribute("aria-current", "false");
        }
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    let slideTimer;
    const slideInterval = 5000;

    function startTimer() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }

    function initSlider() {
      testimonialWrapper.setAttribute("aria-roledescription", "carousel");
      testimonialWrapper.setAttribute("aria-live", "polite");

      testimonials.forEach((testimonial, index) => {
        testimonial.setAttribute("role", "group");
        testimonial.setAttribute("aria-roledescription", "slide");
        testimonial.setAttribute(
          "aria-label",
          `Testimonial ${index + 1} of ${totalTestimonials}`
        );
        testimonial.setAttribute("aria-hidden", index !== currentIndex);

        if (index === currentIndex) {
          testimonial.setAttribute("tabindex", "0");
        } else {
          testimonial.setAttribute("tabindex", "-1");
        }
      });

      dots.forEach((dot, index) => {
        dot.setAttribute("role", "button");
        dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
        dot.setAttribute("tabindex", "0");

        dot.addEventListener("click", () => {
          goToSlide(index);
          resetTimer();
        });

        dot.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToSlide(index);
            resetTimer();
          }
        });
      });

      testimonialWrapper.setAttribute("tabindex", "0");
      testimonialWrapper.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevSlide();
          resetTimer();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          nextSlide();
          resetTimer();
        }
      });

      let touchStartX = 0;
      let touchEndX = 0;

      testimonialWrapper.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      testimonialWrapper.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          nextSlide();
          resetTimer();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          prevSlide();
          resetTimer();
        }
      }

      startTimer();
    }

    initSlider();
  })();

  // CONTACT FORM AND MODAL FUNCTIONALITY
  (function () {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const modal = document.getElementById("success-modal");
    const closeBtn = document.querySelector(".close");

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const nameValidation = document.getElementById("name-validation");
    const emailValidation = document.getElementById("email-validation");
    const messageValidation = document.getElementById("message-validation");

    function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function showError(input, validationElement, message) {
      input.classList.add("error");
      input.classList.remove("success");
      validationElement.textContent = message;
      validationElement.className = "validation-message error";
      return false;
    }

    function showSuccess(input, validationElement) {
      input.classList.remove("error");
      input.classList.add("success");
      validationElement.textContent = "";
      validationElement.className = "validation-message success";
      return true;
    }

    function clearValidation(input, validationElement) {
      input.classList.remove("error", "success");
      validationElement.textContent = "";
      validationElement.className = "validation-message";
    }

    function validateName() {
      const value = nameInput.value.trim();
      if (value === "") {
        return showError(nameInput, nameValidation, "Please enter your name");
      } else if (value.length < 2) {
        return showError(
          nameInput,
          nameValidation,
          "Name must be at least 2 characters"
        );
      } else {
        return showSuccess(nameInput, nameValidation);
      }
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      if (value === "") {
        return showError(
          emailInput,
          emailValidation,
          "Please enter your email address"
        );
      } else if (!isValidEmail(value)) {
        return showError(
          emailInput,
          emailValidation,
          "Please enter a valid email address"
        );
      } else {
        return showSuccess(emailInput, emailValidation);
      }
    }

    function validateMessage() {
      const value = messageInput.value.trim();
      if (value === "") {
        return showError(
          messageInput,
          messageValidation,
          "Please enter your message"
        );
      } else if (value.length < 10) {
        return showError(
          messageInput,
          messageValidation,
          "Message must be at least 10 characters"
        );
      } else {
        return showSuccess(messageInput, messageValidation);
      }
    }

    if (nameInput) {
      nameInput.addEventListener("blur", validateName);
      nameInput.addEventListener("input", function () {
        if (nameInput.classList.contains("error")) {
          validateName();
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("blur", validateEmail);
      emailInput.addEventListener("input", function () {
        if (emailInput.classList.contains("error")) {
          validateEmail();
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener("blur", validateMessage);
      messageInput.addEventListener("input", function () {
        if (messageInput.classList.contains("error")) {
          validateMessage();
        }
      });
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        if (!modal) return;

        modal.style.display = "flex";

        setTimeout(() => {
          modal.classList.add("show");
          document.body.style.overflow = "hidden";
        }, 10);
      }
    });

    function closeModal() {
      if (!modal) return;

      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        if (contactForm) {
          contactForm.reset();

          if (nameInput) clearValidation(nameInput, nameValidation);
          if (emailInput) clearValidation(emailInput, emailValidation);
          if (messageInput) clearValidation(messageInput, messageValidation);
        }
      }, 400);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    const modalButton = document.querySelector(".modal-button");
    if (modalButton) {
      modalButton.addEventListener("click", closeModal);
    }
  })();

  // ENHANCED USER EXPERIENCE
  (function () {
    const socialIcons = document.querySelectorAll(".social-media img");
    socialIcons.forEach((icon) => {
      icon.style.cursor = "pointer";
    });

    const allTextElements = document.querySelectorAll(".text-wrapper-22");

    allTextElements.forEach((element) => {
      const text = element.textContent.trim();

      if (text.includes("(") || /\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(text)) {
        element.addEventListener("click", () => {
          window.location.href = `tel:${text.replace(/[^0-9]/g, "")}`;
        });
        element.style.cursor = "pointer";
      } else if (text.includes("@")) {
        element.addEventListener("click", () => {
          window.location.href = `mailto:${text}`;
        });
        element.style.cursor = "pointer";
      }
    });

    const newsletterForm = document.querySelector(".mailing-input");
    const newsletterInput = document.querySelector(".input");
    const subscribeButton = document.querySelector(".text-button-wrapper");

    if (newsletterForm && newsletterInput && subscribeButton) {
      const validationMessage = document.createElement("div");
      validationMessage.className = "validation-message";
      validationMessage.style.position = "absolute";
      validationMessage.style.bottom = "-1.5rem";
      validationMessage.style.left = "0";

      newsletterInput.parentElement.style.position = "relative";
      newsletterInput.parentElement.appendChild(validationMessage);

      subscribeButton.addEventListener("click", (e) => {
        const email = newsletterInput.value.trim();

        if (email === "") {
          validationMessage.textContent = "Please enter your email address";
          validationMessage.className = "validation-message error";
          newsletterInput.classList.add("error");
          e.preventDefault();
          return false;
        } else if (!isValidEmail(email)) {
          validationMessage.textContent = "Please enter a valid email address";
          validationMessage.className = "validation-message error";
          newsletterInput.classList.add("error");
          e.preventDefault();
          return false;
        } else {
          validationMessage.textContent = "Subscription successful!";
          validationMessage.className = "validation-message success";
          newsletterInput.classList.add("success");
          newsletterInput.classList.remove("error");

          setTimeout(() => {
            newsletterInput.value = "";
            validationMessage.textContent = "";
            newsletterInput.classList.remove("success");
          }, 3000);
        }
      });

      newsletterInput.addEventListener("input", () => {
        if (validationMessage.textContent !== "") {
          validationMessage.textContent = "";
          validationMessage.className = "validation-message";
          newsletterInput.classList.remove("error", "success");
        }
      });
    }

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
