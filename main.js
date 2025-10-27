// Andromeda Ogrody - Main JavaScript File

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
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(248, 249, 240, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(45, 80, 22, 0.15)';
    } else {
        navbar.style.background = 'rgba(248, 249, 240, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(45, 80, 22, 0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 1rem;
            box-sizing: border-box;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        // KEY CHANGE: The box now has no fixed height or width. It will grow based on its content.
        lightboxContent.style.cssText = `
            position: relative;
            background: white;
            border-radius: 15px;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            max-width: 95%;
            max-height: 95%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        // KEY CHANGE: The image itself is now constrained, and its size will define the box's size.
        lightboxImg.style.cssText = `
            display: block;
            width: auto;
            height: auto;
            max-width: 90vw;
            max-height: 80vh;
        `;
        
        const lightboxInfo = lightbox.querySelector('.lightbox-info');
        lightboxInfo.style.cssText = `
            padding: 1.5rem;
            text-align: center;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 30px;
            color: black;
            cursor: pointer;
            z-index: 10001;
            text-shadow: 1px 1px 2px rgba(255,255,255,0.7);
        `;
        
        document.body.appendChild(lightbox);
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightboxContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const loading = submitButton.querySelector('.loading');
        
        // Show loading state
        buttonText.style.display = 'none';
        loading.style.display = 'inline-block';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual Formspree handling)
        setTimeout(() => {
            // Reset button
            buttonText.style.display = 'inline';
            loading.style.display = 'none';
            submitButton.disabled = false;
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="
                    background: #4CAF50;
                    color: white;
                    padding: 1rem;
                    border-radius: 10px;
                    margin-top: 1rem;
                    text-align: center;
                    animation: fadeInUp 0.5s ease;
                ">
                    <i class="fas fa-check-circle"></i> Dziękujemy za wiadomość! Skontaktujemy się z Tobą w ciągu 24 godzin.
                </div>
            `;
            
            this.appendChild(successMessage);
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 5000);
            
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service cards hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button when page is scrolled
let scrollToTopBtn = null;

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-green);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
                transition: all 0.3s ease;
                z-index: 1000;
                opacity: 0;
                transform: translateY(20px);
            `;
            
            scrollToTopBtn.addEventListener('click', scrollToTop);
            document.body.appendChild(scrollToTopBtn);
            
            // Animate in
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'translateY(0)';
            }, 10);
        }
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (scrollToTopBtn && scrollToTopBtn.parentNode) {
                scrollToTopBtn.parentNode.removeChild(scrollToTopBtn);
                scrollToTopBtn = null;
            }
        }, 300);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to page
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

// Console welcome message
console.log('%c🌿 Witamy w Andromeda Ogrody! 🌿', 'color: #2D5016; font-size: 16px; font-weight: bold;');
console.log('%cProfesjonalne usługi ogrodnicze w Końskie i województwie świętokrzyskim', 'color: #4A7C59; font-size: 14px;');
console.log('%cTel: 724-840-560 | Email: adam@andromedaogrody.pl', 'color: #8B4513; font-size: 12px;');