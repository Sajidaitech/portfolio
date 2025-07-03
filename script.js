// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCertificateModal();
    initializeLogoChanger();
    initializeSmoothScrolling();
    initializeActiveSection();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Smooth scroll to top of main content
            document.querySelector('main').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Certificate modal functionality
function initializeCertificateModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="" alt="Certificate" id="modal-image">
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImage = modal.querySelector('#modal-image');
    const closeBtn = modal.querySelector('.close');
    
    // Add click event to all view certificate buttons
    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-img');
            modalImage.src = imageSrc;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Logo changer functionality
function initializeLogoChanger() {
    const logoChangeBtn = document.getElementById('change-logo-btn');
    const profileLogo = document.getElementById('profile-logo');
    const profilePhoto = document.querySelector('.profile-photo');
    
    // Array of logo options
    const logoOptions = [
        'assets/logo/logo.jpg',
        'assets/logo/logo2.jpg',
        'assets/logo/logo3.jpg',
        'assets/logo/logo4.jpg'
    ];
    
    let currentLogoIndex = 0;
    
    logoChangeBtn.addEventListener('click', function() {
        // Cycle through logos
        currentLogoIndex = (currentLogoIndex + 1) % logoOptions.length;
        const newLogo = logoOptions[currentLogoIndex];
        
        // Update both header logo and profile photo
        profileLogo.src = newLogo;
        if (profilePhoto) {
            profilePhoto.src = newLogo;
        }
        
        // Add animation effect
        profileLogo.style.transform = 'scale(0.8)';
        setTimeout(() => {
            profileLogo.style.transform = 'scale(1)';
        }, 150);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
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
}

// Active section detection on scroll
function initializeActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    function updateActiveSection() {
        // Find the currently visible section
        let currentSection = null;
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const sectionId = currentSection.getAttribute('id');
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    // Initial update
    updateActiveSection();
}

// Add loading animation to images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Add hover effects to cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.certificate-detail, .experience-detail, .blog-intro');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Add typewriter effect to tagline
function addTypewriterEffect() {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Add parallax effect to header
function addParallaxEffect() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add progress bar for page loading
function addProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add animation to skill items
function animateSkills() {
    const skillItems = document.querySelectorAll('.skills-list li');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add social media hover effects
function addSocialMediaEffects() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize additional effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addImageLoadingEffect();
        addHoverEffects();
        addTypewriterEffect();
        addParallaxEffect();
        addProgressBar();
        animateSkills();
        addSocialMediaEffects();
    }, 500);
});

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Update navigation layout on resize
    const nav = document.querySelector('nav');
    if (window.innerWidth < 768) {
        nav.classList.add('mobile-nav');
    } else {
        nav.classList.remove('mobile-nav');
    }
});

// Add error handling for broken images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: ${this.width || 200}px;
                height: ${this.height || 200}px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px dashed rgba(255, 255, 255, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
                border-radius: 10px;
            `;
            placeholder.textContent = 'Image not found';
            
            this.parentNode.insertBefore(placeholder, this);
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    const navLinks = document.querySelectorAll('nav a');
    const activeIndex = Array.from(navLinks).findIndex(link => link.classList.contains('active'));
    
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        navLinks[activeIndex - 1].click();
    } else if (e.key === 'ArrowRight' && activeIndex < navLinks.length - 1) {
        navLinks[activeIndex + 1].click();
    }
});

// Add page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});
