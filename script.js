// script.js

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const loader = document.querySelector('.loader');
const resumeBtn = document.getElementById('resumeBtn');

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Back to Top Button
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to Top Button
backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation
const typed = new Typed('.typing-text', {
    strings: ['Viraj Dhas', 'a Full Stack Developer', 'a Data Analyst', 'a Cloud Engineer'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true
});

// Animate Stats Counter
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('#about');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        const increment = target / 100;
        
        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 20);
        } else {
            stat.innerText = target;
        }
    });
};

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skills progress bars
            if (entry.target.id === 'skills') {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const percent = bar.parentElement.parentElement.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                });
            }
            
            // Animate stats counter
            if (entry.target.id === 'about') {
                animateStats();
            }
            
            // Add animation class
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Submission
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
    contactForm.reset();
});

// Resume Button
resumeBtn.addEventListener('click', e => {
    e.preventDefault();
    // Replace with your actual resume link
    alert('Downloading resume...');
    // window.open('path/to/your/resume.pdf', '_blank');
});

// Tooltip for Tech Icons
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = icon.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = icon.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.bottom + 10}px`;
    });
    
    icon.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Project Demo Button
document.querySelectorAll('.project-demo').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        alert('Project demo would open here');
    });
});

// Initialize skill bars to 0
document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0';
});