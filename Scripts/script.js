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

// Parallax effect for hero image (moves up and scales down on scroll)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroDevice = document.querySelector('.hero-device');
    const heroSection = document.querySelector('.hero');
    
    if (heroImage && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (scrolled < heroBottom) {
            const maxScroll = heroBottom - window.innerHeight / 2;
            const scrollProgress = Math.min(scrolled / maxScroll, 1);
            const scale = 1 - (scrollProgress * 0.1); // Scale from 1 to 0.7

            const parallaxOffset = Math.max(80 - (scrolled * 0.1), -100);
            heroImage.style.transform = `translateY(${parallaxOffset}px) translateX(4.5%)`;
            heroDevice.style.transform = `scale(${scale})`;
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