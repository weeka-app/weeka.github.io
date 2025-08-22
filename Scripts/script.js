let originalTopPadding = null;

document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        const computedStyle = window.getComputedStyle(heroImage);
        originalTopPadding = parseInt(computedStyle.paddingTop,10);
    }
});

// Parallax effect for hero image (moves up and scales down on scroll)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image');
    const heroSection = document.querySelector('.hero');
    
    if (heroImage && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (scrolled < heroBottom) {
            const parallaxOffset = Math.max(originalTopPadding - (scrolled * 0.1), 20);
            heroImage.style.paddingTop = `${parallaxOffset}px`;
        }
    }
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
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