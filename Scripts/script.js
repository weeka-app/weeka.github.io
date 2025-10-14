let originalTopPadding = null;

document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        const computedStyle = window.getComputedStyle(heroImage);
        originalTopPadding = parseInt(computedStyle.paddingTop,10);
    }

    // Hide navigation when ?app=true parameter is present
    const urlParams = new URLSearchParams(window.location.search);
    const isAppMode = urlParams.get('app') === 'true';

    if (isAppMode) {
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.style.display = 'none';
        }
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

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        // Enable the button (Apple has them disabled by default)
        button.removeAttribute('disabled');
        button.removeAttribute('aria-disabled');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const expanded = this.getAttribute('aria-expanded') === 'true';
            const item = this.closest('.accordion-item');
            const tray = document.getElementById(this.getAttribute('aria-controls'));
            const expandAnimation = this.querySelector('[data-accordion-animate="expand"]');
            const collapseAnimation = this.querySelector('[data-accordion-animate="collapse"]');
            
            // Toggle state
            this.setAttribute('aria-expanded', !expanded);
            
            if (!expanded) {
                // Expand
                item.classList.add('expanded');
                if (tray) {
                    tray.style.height = 'auto';
                    const height = tray.scrollHeight;
                    tray.style.height = '0';
                    // Force reflow
                    tray.offsetHeight;
                    tray.style.height = height + 'px';
                    tray.style.transitionDuration = '400ms';
                    
                    // After animation, set to auto for responsive behavior
                    setTimeout(() => {
                        tray.style.height = 'auto';
                    }, 400);
                }
                
                // Trigger SVG animation
                if (expandAnimation) {
                    expandAnimation.beginElement();
                }
            } else {
                // Collapse
                item.classList.remove('expanded');
                if (tray) {
                    const height = tray.scrollHeight;
                    tray.style.height = height + 'px';
                    // Force reflow
                    tray.offsetHeight;
                    tray.style.height = '0';
                    tray.style.transitionDuration = '400ms';
                }
                
                // Trigger SVG animation
                if (collapseAnimation) {
                    collapseAnimation.beginElement();
                }
            }
        });
    });
});