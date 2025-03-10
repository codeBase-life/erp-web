/**
 * Main JavaScript file for the ERP website
 */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Initialize AOS animation library
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Header scroll behavior
  const header = document.getElementById("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add 'header-scrolled' class when scrolled
    if (scrollTop > 100) {
      header.classList.add("header-scrolled");

      // Hide header on scroll down, show on scroll up
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
      }
    } else {
      header.classList.remove("header-scrolled");
    }

    lastScrollTop = scrollTop;

    // Back to top button visibility
    toggleBackToTopButton();
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");

  function toggleBackToTopButton() {
    if (window.scrollY > 100) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  }

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mobile navigation toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      navbarToggler.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav item
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function () {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove("show");
        navbarToggler.classList.remove("active");
      }
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector("#header").offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Video section - Direct play when clicked
  const demoVideo = document.querySelector(".demo-video");
  const videoElement = document.querySelector(".demo-video video");
  const videoPlayBtn = document.querySelector(".video-play-btn");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Handle click on play button
  if (videoPlayBtn && videoElement) {
    videoPlayBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Toggle play/pause
      if (videoElement.paused) {
        // Play the video
        videoElement
          .play()
          .then(() => {
            // Hide the play button when video starts playing
            videoPlayBtn.style.opacity = "0";
            // Add controls once playing
            videoElement.setAttribute("controls", "true");
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      } else {
        // Pause the video
        videoElement.pause();
        // Show the play button
        videoPlayBtn.style.opacity = "1";
      }
    });

    // When video ends, show the play button again
    videoElement.addEventListener("ended", function () {
      videoPlayBtn.style.opacity = "1";
    });

    // When video is paused, show the play button
    videoElement.addEventListener("pause", function () {
      videoPlayBtn.style.opacity = "1";
    });

    // When video is playing, hide the play button
    videoElement.addEventListener("play", function () {
      videoPlayBtn.style.opacity = "0";
    });
  }

  // Auto-play video when in viewport (optional)
  let hasAutoPlayed = false;
  let scrollTimeout;

  window.addEventListener("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      if (
        demoVideo &&
        videoElement &&
        isInViewport(demoVideo) &&
        !hasAutoPlayed
      ) {
        // Try to autoplay when in viewport
        videoElement.muted = true; // Must be muted for autoplay
        videoElement
          .play()
          .then(() => {
            videoPlayBtn.style.opacity = "0";
            videoElement.setAttribute("controls", "true");
            hasAutoPlayed = true;
          })
          .catch((error) => {
            console.error("Autoplay prevented:", error);
          });
      }
    }, 200);
  });

  // Form submission handling
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would typically handle form submission via AJAX
      // For demonstration, we'll just show an alert
      alert(
        "Form submitted successfully! In a real implementation, this would be sent to the server."
      );

      // Reset the form
      form.reset();
    });
  });

  // Initialize any Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize any Bootstrap popovers
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});
