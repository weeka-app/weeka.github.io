// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero image (moves up on scroll)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroDevices = document.querySelector('.hero-devices');
    const heroSection = document.querySelector('.hero');
    
    if (heroDevices && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const isMobile = window.innerWidth <= 768;
        
        // Only apply parallax when hero is visible
        if (scrolled < heroBottom) {
            if (isMobile) {
                // Smaller movement on mobile: 40px to 20px
                const parallaxOffset = Math.max(40 - (scrolled * 0.05), 20);
                heroDevices.style.transform = `translateY(${parallaxOffset}px)`;
            } else {
                // Desktop: 80px to 40px
                const parallaxOffset = Math.max(80 - (scrolled * 0.1), 40);
                heroDevices.style.transform = `translateY(${parallaxOffset}px)`;
            }
        }
    }
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature sections and screenshots
document.querySelectorAll('.feature, .step, .screenshot').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-links a.active {
        color: var(--accent);
    }
`;
document.head.appendChild(style);