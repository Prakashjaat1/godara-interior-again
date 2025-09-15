
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    }
});

// 3D Tilt Effect for Cards
function addTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Mouse Parallax Effect for Hero
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const translateX = (x - 0.5) * speed * 20;
            const translateY = (y - 0.5) * speed * 20;
            
            shape.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        });
    });
}

// Scroll-triggered 3D animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(20deg)';
        card.style.transition = `all 0.8s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) rotateY(20deg)';
        item.style.transition = `all 0.8s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px) rotateY(20deg)';
        item.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// 3D Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.includes('+') ? '+' : 
                      element.textContent.includes('%') ? '%' : '';
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Enhanced stats observer with 3D animation
function addStatsAnimation() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                const target = parseInt(statNumber.textContent);
                
                // Add 3D animation to stat
                entry.target.style.transform = 'translateY(0) rotateX(0) scale(1)';
                entry.target.style.opacity = '1';
                
                // Animate counter
                setTimeout(() => {
                    animateCounter(statNumber, target);
                }, 300);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) rotateX(20deg) scale(0.8)';
        stat.style.transition = 'all 0.8s ease';
        statsObserver.observe(stat);
    });
}

// Enhanced contact form handling with 3D feedback
function enhanceContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const service = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !service) {
            showFormFeedback('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormFeedback('Please enter a valid email address.', 'error');
            return;
        }
        
        // Animate button
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.querySelector('span').textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            submitBtn.querySelector('span').textContent = originalText;
            showFormFeedback('Thank you! We will get back to you within 24 hours.', 'success');
            this.reset();
        }, 1500);
    });
}

function showFormFeedback(message, type) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : 'background: linear-gradient(45deg, #f44336, #e53935);'}
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        feedback.style.transform = 'translateX(400px)';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// Add floating animation to shapes based on scroll
function addScrollBasedFloating() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Rotate 3D hero container based on scroll
        const hero3D = document.querySelector('.hero-3d-container');
        if (hero3D) {
            const rotation = scrollY * 0.1;
            hero3D.style.transform = `rotateY(${rotation}deg) rotateX(15deg)`;
        }
    });
}

// Add loading animation for page
function addPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroDescription) {
            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 500);
        }
        
        if (heroButtons) {
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 700);
        }
        
        if (heroVisual) {
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 900);
        }
    });
}

// Initialize page animations
function initPageAnimations() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Set initial states for hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        heroTitle.style.transition = 'all 0.8s ease';
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        heroDescription.style.transition = 'all 0.8s ease';
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        heroButtons.style.transition = 'all 0.8s ease';
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(100px)';
        heroVisual.style.transition = 'all 1s ease';
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    addTiltEffect();
    addParallaxEffect();
    addScrollAnimations();
    addStatsAnimation();
    enhanceContactForm();
    addScrollBasedFloating();
    addPageLoadAnimation();
});

// Add resize handler for responsive 3D effects
window.addEventListener('resize', () => {
    // Recalculate tilt effects on resize
    addTiltEffect();
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});
