// Smooth scroll for anchor links
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

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('fade-in');
        }
    });
}, observerOptions);

// Observe all project and research cards, design items, and art items
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bg-white.rounded-xl');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// Handle image loading errors gracefully
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (!this.hasAttribute('data-error-handled')) {
            this.setAttribute('data-error-handled', 'true');
            const placeholder = document.createElement('div');
            placeholder.className = 'w-full h-[200px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg';
            placeholder.textContent = 'Image not available';
            this.parentNode.replaceChild(placeholder, this);
        }
    });
});

// Enhanced hover effects for design gallery items
document.querySelectorAll('.design-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
