// ===================================
// ACOUSTIC REEF - REEF PULSE INSPIRED
// Clean, Minimal Interactivity
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. SMOOTH SCROLLING FOR NAV LINKS
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#') && href !== '#streamlit-app-link') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ==========================================
    // 2. NAVBAR BACKGROUND CHANGE ON SCROLL
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // ==========================================
    // 3. HAMBURGER MENU TOGGLE
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
    // ==========================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize scroll reveal elements
    scrollRevealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // ==========================================
    // 5. AUTO-PAUSE OTHER AUDIO PLAYERS
    // ==========================================
    const audioPlayers = document.querySelectorAll('audio');
    
    audioPlayers.forEach(audio => {
        audio.addEventListener('play', function() {
            audioPlayers.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });
    });

    // ==========================================
    // 6. BACK TO TOP BUTTON
    // ==========================================
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 7. SOUND CARD HOVER EFFECTS
    // ==========================================
    const soundCards = document.querySelectorAll('.rp-sound-card');
    
    soundCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.rp-sound-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.rp-sound-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ==========================================
    // 8. CTA BUTTON RIPPLE EFFECT
    // ==========================================
    const ctaButtons = document.querySelectorAll('.rp-cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ==========================================
    // 9. ACHIEVEMENT CARD PARALLAX HOVER
    // ==========================================
    const achievementCards = document.querySelectorAll('.rp-achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            const image = this.querySelector('.rp-achievement-image');
            if (image) {
                image.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.rp-achievement-image');
            if (image) {
                image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            }
        });
    });

    // ==========================================
    // 10. ACTIVE SECTION HIGHLIGHTING IN NAV
    // ==========================================
    const sections = document.querySelectorAll('section[class*="rp-section"]');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        if (section.id) {
            navObserver.observe(section);
        }
    });

    // ==========================================
    // 11. SCROLL ARROW ANIMATION
    // ==========================================
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 12. STEP CARDS SEQUENTIAL REVEAL
    // ==========================================
    const steps = document.querySelectorAll('.rp-step');
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });

    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.5s ease';
        stepObserver.observe(step);
    });

    // ==========================================
    // 13. IMAGE FADE-IN ON LOAD (FIXED)
    // ==========================================
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        // If image is already loaded (cached), show it immediately
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            // Otherwise, fade in when it loads
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // ==========================================
    // CONSOLE MESSAGE
    // ==========================================
    console.log('🌊 Acoustic Reef - Reef Pulse Design Loaded');
    console.log('🎵 AI-Powered Coral Reef Monitoring');
});
