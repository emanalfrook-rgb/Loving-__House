// Home Page - Hero Slider and Effects
document.addEventListener('DOMContentLoaded', function() {
    // Hero Video Auto-play
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        heroVideo.play().catch(e => {
            console.log('Auto-play was prevented');
        });
    }

    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});

// Services Page - Tabs Functionality
function initServicesTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Facilities Page - Interactive Effects
function initFacilitiesEffects() {
    const facilityItems = document.querySelectorAll('.facility-item');
    
    facilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Packages Page - Package Selection and Details
function initPackages() {
    const selectButtons = document.querySelectorAll('.select-package');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const message = `You selected the ${packageName.charAt(0).toUpperCase() + packageName.slice(1)} Package! Redirecting to contact page...`;
            
            // Show success message
            showNotification(message, 'success');
            
            // Store selected package in localStorage
            localStorage.setItem('selectedPackage', packageName);
            
            // Redirect to contact page after 2 seconds
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 2000);
        });
    });
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const packageDetails = getPackageDetails(packageName);
            showPackageDetails(packageDetails);
        });
    });
}

function getPackageDetails(packageName) {
    const details = {
        'day': {
            name: 'Day Package',
            price: '$25/day',
            features: [
                'Two daily walks in forest trails',
                'Access to outdoor play area',
                'Agility course activities',
                'Sand pit play time',
                'Basic grooming care',
                'Group socialization sessions',
                'Healthy treats and rewards',
                'Daily health monitoring'
            ]
        },
        'classic': {
            name: 'Classic Package',
            price: '$35/day',
            features: [
                'Three daily walks',
                'Indoor playpen access',
                'Relaxation area time',
                'Personal attention sessions',
                'Basic training reinforcement',
                'Evening cuddle time',
                'Photo updates every other day',
                'Specialized feeding schedule'
            ]
        },
        'premium': {
            name: 'Premium Package',
            price: '$50/day',
            features: [
                'Four daily walks',
                'Private grass area access',
                'Daily photos & updates',
                'Professional grooming session',
                'One-on-one training',
                'Specialized diet preparation',
                'Evening massage sessions',
                'Priority booking',
                'Extended pickup/drop-off times'
            ]
        }
    };
    
    return details[packageName] || null;
}

function showPackageDetails(details) {
    if (!details) return;
    
    const modal = document.createElement('div');
    modal.className = 'package-modal';
    modal.innerHTML = `
        <div class="package-modal-content">
            <span class="package-modal-close">&times;</span>
            <h3>${details.name}</h3>
            <p class="package-price">${details.price}</p>
            <ul>
                ${details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn" onclick="selectPackageFromModal('${details.name.toLowerCase().replace(' ', '-')}')">Select This Package</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.package-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function selectPackageFromModal(packageName) {
    localStorage.setItem('selectedPackage', packageName);
    window.location.href = 'contact.html';
}

// Gallery Page - Lightbox and Filtering
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    
    // Filtering functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            const caption = overlay.querySelector('h4').textContent;
            const description = overlay.querySelector('p').textContent;
            
            openLightbox(img.src, caption, description);
        });
    });
    
    if (lightbox) {
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(src, caption, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption h3');
    const lightboxDescription = lightbox.querySelector('.lightbox-caption p');
    
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightboxDescription.textContent = description;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// About Us Page - Fade-in Effects
function initAboutPage() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Contact Page - Form Validation and Google Maps
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Check for selected package from localStorage
    const selectedPackage = localStorage.getItem('selectedPackage');
    if (selectedPackage) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = selectedPackage + '-package';
        }
        localStorage.removeItem('selectedPackage');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const errors = {};
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
        const input = form.querySelector(`#${field}`);
        const value = input.value.trim();
        
        if (!value) {
            errors[field] = 'This field is required';
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    // Validate email format
    const emailInput = form.querySelector('#email');
    const emailValue = emailInput.value.trim();
    if (emailValue && !isValidEmail(emailValue)) {
        errors.email = 'Please enter a valid email address';
        emailInput.classList.add('error');
    }
    
    // Display errors
    displayFormErrors(form, errors);
    
    // If no errors, submit form
    if (Object.keys(errors).length === 0) {
        submitForm(form, formData);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayFormErrors(form, errors) {
    // Clear existing error messages
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    
    // Display new error messages
    Object.keys(errors).forEach(field => {
        const input = form.querySelector(`#${field}`);
        const errorDiv = document.createElement('span');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errors[field];
        input.parentNode.appendChild(errorDiv);
    });
}

function submitForm(form, formData) {
    // Show success message
    const successDiv = document.getElementById('formSuccess');
    if (successDiv) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successDiv.style.display = 'none';
        }, 5000);
    } else {
        // If no success div, show notification
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
    }
}

// FAQ Page - Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Mobile Navigation Toggle
function initMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    if (logo && window.innerWidth <= 768) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: block;
        `;
        
        logo.parentNode.insertBefore(mobileToggle, navLinks);
        
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Initialize all page-specific functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            // Home page functionality is handled in the main DOMContentLoaded above
            break;
        case 'services.html':
            initServicesTabs();
            break;
        case 'facilities.html':
            initFacilitiesEffects();
            break;
        case 'packages.html':
            initPackages();
            break;
        case 'gallery.html':
            initGallery();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
        case 'faq.html':
            initFAQ();
            break;
    }
    
    // Initialize common functionality
    initMobileNav();
});

// Add CSS for package modal
const packageModalStyles = `
    .package-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .package-modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }
    
    .package-modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 2rem;
        cursor: pointer;
        color: #333;
    }
    
    .package-modal h3 {
        color: #0a3c5f;
        margin-bottom: 1rem;
    }
    
    .package-price {
        font-size: 1.5rem;
        color: #ffe4f4;
        background-color: #0a3c5f;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        display: inline-block;
        margin-bottom: 1rem;
    }
    
    .package-modal ul {
        list-style: none;
        margin: 1rem 0;
    }
    
    .package-modal li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 20px;
    }
    
    .package-modal li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #0a3c5f;
    }
`;

// Add the modal styles to the head
const styleSheet = document.createElement('style');
styleSheet.textContent = packageModalStyles;
document.head.appendChild(styleSheet);
