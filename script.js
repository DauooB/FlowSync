// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const resetFormBtn = document.getElementById('resetFormBtn');

// ===== NAVBAR: Scroll Effect =====
// Add a subtle border and shadow when the user scrolls down
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU: Hamburger Toggle =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  // Prevent body scroll when mobile menu is open
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== SMOOTH SCROLL for all anchor links =====
// This enhances the CSS `scroll-behavior: smooth` with offset handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip logo link

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FORM VALIDATION & SUBMISSION =====

/**
 * Validates an email address using a standard regex pattern.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Shows an error message for a specific form field.
 * @param {HTMLElement} input - The input element.
 * @param {HTMLElement} errorEl - The error message span element.
 * @param {string} message - The error message to display.
 */
function showError(input, errorEl, message) {
  input.classList.add('invalid');
  errorEl.textContent = message;
}

/**
 * Clears the error message for a specific form field.
 * @param {HTMLElement} input - The input element.
 * @param {HTMLElement} errorEl - The error message span element.
 */
function clearError(input, errorEl) {
  input.classList.remove('invalid');
  errorEl.textContent = '';
}

// Real-time validation: clear error when user starts typing
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

nameInput.addEventListener('input', () => clearError(nameInput, nameError));
emailInput.addEventListener('input', () => clearError(emailInput, emailError));

// Handle form submission
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  // Validate Full Name — must not be empty and at least 2 characters
  const nameValue = nameInput.value.trim();
  if (!nameValue) {
    showError(nameInput, nameError, 'Full name is required.');
    isValid = false;
  } else if (nameValue.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters.');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Validate Email — must be a valid email format
  const emailValue = emailInput.value.trim();
  if (!emailValue) {
    showError(emailInput, emailError, 'Email address is required.');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // If all validations pass, show success message
  if (isValid) {
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
  }
});

// Reset form and show it again when "Submit Another Request" is clicked
resetFormBtn.addEventListener('click', () => {
  contactForm.reset();
  contactForm.style.display = 'block';
  successMessage.classList.remove('show');
  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
});

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
// Animate elements into view as the user scrolls
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animateOnScroll.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Apply initial hidden state and observe elements
const animatedElements = document.querySelectorAll(
  '.feature-card, .step, .pricing-card, .contact-info, .contact-form'
);

animatedElements.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
  animateOnScroll.observe(el);
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
// Highlight the current section in the navbar as the user scrolls
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        link.style.color = 'var(--primary)';
      } else {
        link.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', highlightNavLink);
highlightNavLink(); // Run once on load

