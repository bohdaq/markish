// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Character counter for message textarea
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');

if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', () => {
        const count = messageTextarea.value.length;
        charCount.textContent = count;
        
        if (count > 950) {
            charCount.style.color = '#721c24';
        } else {
            charCount.style.color = '#333333';
        }
    });
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            // In a real implementation, you would send data to your backend
            // await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showFormMessage('Thank you for your inquiry! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            charCount.textContent = '0';
            
        } catch (error) {
            // Show error message
            showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function validateForm(data) {
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'service', 'location', 'date', 'referral'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showFormMessage('Please fill in all required fields.', 'error');
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showFormMessage('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Date validation (must be in the future)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showFormMessage('Please select a future date.', 'error');
        return false;
    }
    
    return true;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = 'none';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-wrapper');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Set minimum date for date picker to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Portfolio image lazy loading optimization
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// About Section Carousel functionality
const aboutCarouselTrack = document.querySelector('.about-carousel-track');
const aboutCarouselSlides = Array.from(document.querySelectorAll('.about-carousel-slide'));
const aboutCarouselContainer = document.querySelector('.about-carousel-track-container');

let aboutCurrentSlide = 0;
const aboutTotalSlides = aboutCarouselSlides.length;

function updateAboutCarousel() {
    if (aboutCarouselSlides.length === 0) return;
    const slideWidth = aboutCarouselSlides[0].getBoundingClientRect().width;
    aboutCarouselTrack.style.transform = `translateX(-${aboutCurrentSlide * slideWidth}px)`;
}

function nextAboutSlide() {
    aboutCurrentSlide = (aboutCurrentSlide + 1) % aboutTotalSlides;
    updateAboutCarousel();
}

function prevAboutSlide() {
    aboutCurrentSlide = (aboutCurrentSlide - 1 + aboutTotalSlides) % aboutTotalSlides;
    updateAboutCarousel();
}

// Click on left/right side of carousel to navigate
if (aboutCarouselContainer) {
    aboutCarouselContainer.addEventListener('click', (e) => {
        const rect = aboutCarouselContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const containerWidth = rect.width;
        
        // If clicked on left half, go to previous slide
        if (clickX < containerWidth / 2) {
            prevAboutSlide();
        } else {
            // If clicked on right half, go to next slide
            nextAboutSlide();
        }
    });
}

// Auto-play About carousel
let aboutAutoplayInterval = setInterval(nextAboutSlide, 4000);

// Pause autoplay on hover
const aboutCarousel = document.querySelector('.about-carousel');
if (aboutCarousel) {
    aboutCarousel.addEventListener('mouseenter', () => {
        clearInterval(aboutAutoplayInterval);
    });
    
    aboutCarousel.addEventListener('mouseleave', () => {
        aboutAutoplayInterval = setInterval(nextAboutSlide, 4000);
    });
}

// Portfolio Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevButton = document.querySelector('.carousel-btn-prev');
const nextButton = document.querySelector('.carousel-btn-next');
const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));

let currentSlide = 0;
const totalSlides = carouselSlides.length;

function updateCarousel() {
    if (carouselSlides.length === 0 || !carouselSlides[0]) return;
    const slideWidth = carouselSlides[0].getBoundingClientRect().width;
    carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Event listeners
if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
});

// Auto-play carousel (optional) - only if carousel exists
let autoplayInterval;
if (carouselSlides.length > 0) {
    autoplayInterval = setInterval(nextSlide, 5000);
}

// Pause autoplay on hover
const carousel = document.querySelector('.carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
}

// Update carousels on window resize
window.addEventListener('resize', () => {
    updateAboutCarousel();
    updateCarousel();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Console log for development
console.log('Marta Films website loaded successfully');
console.log('For inquiries, please fill out the contact form or email hello@martafilms.com');
