// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const expertsGrid = document.querySelector('.experts-grid');
const contactForm = document.getElementById('contactForm');
const reviewModal = document.getElementById('reviewModal');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Experts Data
const experts = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        title: "Former Pharma Executive",
        category: "healthcare",
        description: "20+ years in pharmaceutical R&D, regulatory affairs, and market access strategy.",
        specialties: ["Biotech", "Regulatory", "Market Access"],
        icon: "fa-user-md"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        title: "SaaS Product Strategist",
        category: "technology",
        description: "Former VP of Product at leading SaaS companies with expertise in scaling products.",
        specialties: ["SaaS", "Product Strategy", "Enterprise Software"],
        icon: "fa-laptop-code"
    },
    {
        id: 3,
        name: "James Wilson",
        title: "Investment Banking Director",
        category: "finance",
        description: "15 years in M&A and capital markets with focus on fintech and financial services.",
        specialties: ["M&A", "Fintech", "Capital Markets"],
        icon: "fa-chart-bar"
    },
    {
        id: 4,
        name: "Dr. Emily Park",
        title: "Medical Device Expert",
        category: "healthcare",
        description: "Former Chief Medical Officer with expertise in FDA approvals and clinical trials.",
        specialties: ["Medical Devices", "FDA", "Clinical Trials"],
        icon: "fa-stethoscope"
    },
    {
        id: 5,
        name: "Alex Thompson",
        title: "Clean Energy Consultant",
        category: "energy",
        description: "10+ years in renewable energy projects and sustainable infrastructure development.",
        specialties: ["Renewable Energy", "Sustainability", "Infrastructure"],
        icon: "fa-solar-panel"
    },
    {
        id: 6,
        name: "Lisa Martinez",
        title: "Retail Strategy Director",
        category: "consumer",
        description: "Former retail executive with expertise in omnichannel strategy and consumer behavior.",
        specialties: ["Retail", "E-commerce", "Consumer Insights"],
        icon: "fa-shopping-cart"
    },
    {
        id: 7,
        name: "Robert Kim",
        title: "Manufacturing Operations Expert",
        category: "industrial",
        description: "20+ years optimizing manufacturing processes and supply chain management.",
        specialties: ["Manufacturing", "Supply Chain", "Operations"],
        icon: "fa-industry"
    },
    {
        id: 8,
        name: "Jennifer Lee",
        title: "Cybersecurity Specialist",
        category: "technology",
        description: "Former CISO with expertise in enterprise security and risk management.",
        specialties: ["Cybersecurity", "Risk Management", "Compliance"],
        icon: "fa-shield-alt"
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize expert filtering
    initExpertFiltering();
    
    // Load experts
    loadExperts();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize modal
    initModal();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Show review modal after delay
    setTimeout(showReviewModal, 10000);
});

// Mobile Navigation
function initMobileNav() {
    mobileToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Expert Filtering
function initExpertFiltering() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            filterExperts(filterValue);
        });
    });
}

function filterExperts(category) {
    const expertCards = document.querySelectorAll('.expert-card');
    
    expertCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function loadExperts() {
    expertsGrid.innerHTML = '';
    
    experts.forEach(expert => {
        const expertCard = document.createElement('div');
        expertCard.className = 'expert-card';
        expertCard.setAttribute('data-category', expert.category);
        
        expertCard.innerHTML = `
            <div class="expert-image">
                <i class="fas ${expert.icon}"></i>
            </div>
            <div class="expert-info">
                <h3>${expert.name}</h3>
                <div class="expert-title">${expert.title}</div>
                <p>${expert.description}</p>
                <div class="expert-specialties">
                    ${expert.specialties.map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        expertsGrid.appendChild(expertCard);
    });
}

// Contact Form
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.company || !data.industry || !data.expertise) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real application, you would send this data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Thank you! Your request has been submitted. We\'ll contact you within 2 business hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show review modal
            showReviewModal();
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#38a169' : '#e53e3e'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
        
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Modal
function initModal() {
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            reviewModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
            reviewModal.classList.remove('active');
        }
    });
}

function showReviewModal() {
    // Only show if user hasn't submitted a review recently
    const hasSubmittedReview = localStorage.getItem('protomindx_review_submitted');
    
    if (!hasSubmittedReview) {
        // Set a timeout to show the modal
        setTimeout(() => {
            reviewModal.classList.add('active');
        }, 1000);
    }
}

// Scroll Effects
function initScrollEffects() {
    // Header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Trustpilot Review Integration
function submitTrustpilotReview(userData) {
    // This function would integrate with Trustpilot API
    // For demo purposes, we'll simulate the process
    
    const trustpilotUrl = `https://www.trustpilot.com/review/protomindx.com?name=${encodeURIComponent(userData.name)}&email=${encodeURIComponent(userData.email)}`;
    
    // Open Trustpilot in new window
    window.open(trustpilotUrl, '_blank');
    
    // Mark as submitted
    localStorage.setItem('protomindx_review_submitted', 'true');
    
    // Close modal
    reviewModal.classList.remove('active');
    
    // Show thank you message
    showNotification('Thank you for sharing your experience!', 'success');
}

// Add Trustpilot widget dynamically
function loadTrustpilotWidget() {
    // This would load the actual Trustpilot widget
    // For demo, we're using a static representation
}

// Initialize Trustpilot when DOM is loaded
window.addEventListener('load', loadTrustpilotWidget);