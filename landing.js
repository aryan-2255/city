// Landing Page JavaScript

// City name mappings
const CITY_MAPPINGS = {
    'london': 'london',
    'new york': 'newyork',
    'newyork': 'newyork',
    'tokyo': 'tokyo',
    'paris': 'paris',
    'delhi': 'delhi',
    'sydney': 'sydney',
    'mumbai': 'mumbai',
    'singapore': 'singapore',
    'dubai': 'dubai',
    'los angeles': 'losangeles',
    'chicago': 'chicago',
    'toronto': 'toronto',
    'berlin': 'berlin',
    'madrid': 'madrid',
    'rome': 'rome',
    'amsterdam': 'amsterdam',
    'barcelona': 'barcelona',
    'seoul': 'seoul',
    'beijing': 'beijing',
    'shanghai': 'shanghai',
    'hong kong': 'hongkong',
    'bangkok': 'bangkok',
    'istanbul': 'istanbul',
    'moscow': 'moscow',
    'são paulo': 'saopaulo',
    'mexico city': 'mexicocity'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupSearchForm();
    setupQuickCityButtons();
    animateStats();
});

// Setup Search Form
function setupSearchForm() {
    const form = document.getElementById('citySearchForm');
    const input = document.getElementById('cityInput');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cityName = input.value.trim();
        
        if (cityName) {
            navigateToDashboard(cityName);
        }
    });
    
    // Add enter key support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}

// Setup Quick City Buttons
function setupQuickCityButtons() {
    const cityButtons = document.querySelectorAll('.city-pill');
    
    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cityKey = button.getAttribute('data-city');
            const cityName = button.textContent;
            
            // Visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
                navigateToDashboard(cityName, cityKey);
            }, 150);
        });
    });
}

// Navigate to Dashboard
function navigateToDashboard(cityName, cityKey = null) {
    const normalizedName = cityName.toLowerCase().trim();
    const mappedCity = cityKey || CITY_MAPPINGS[normalizedName] || normalizedName.replace(/\s+/g, '');
    
    // Store city info in sessionStorage
    sessionStorage.setItem('selectedCity', mappedCity);
    sessionStorage.setItem('selectedCityName', cityName);
    
    // Navigate to dashboard with city parameter
    window.location.href = `dashboard.html?city=${encodeURIComponent(mappedCity)}&name=${encodeURIComponent(cityName)}`;
}

// Animate Stats
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate Number Counter
function animateNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, duration / steps);
}

// Add typing effect to search placeholder (optional enhancement)
function typewriterEffect() {
    const input = document.getElementById('cityInput');
    const texts = [
        'Enter city name (e.g., London, New York, Tokyo)',
        'Try Paris, Delhi, Sydney...',
        'Search any city worldwide...'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        input.setAttribute('placeholder', currentText.substring(0, charIndex));
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Uncomment to enable typewriter effect
    // setTimeout(type, 1000);
}

// Handle navigation highlighting
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Call on load
highlightCurrentNav();

// Add smooth scroll for better UX
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

// Add particle interaction on mouse move (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

