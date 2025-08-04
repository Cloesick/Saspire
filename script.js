document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Sticky Navigation ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('nav-sticky');
        } else {
            header.classList.remove('nav-sticky');
        }
    });

    // --- Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.fade-in-up-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        countersAnimated = true;
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));


    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission
        
        // Basic validation
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (firstName && lastName && email && message) {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.classList.remove('hidden');
        } else {
            // Simple alert for demo purposes. A more robust solution would show inline errors.
            alert('Please fill out all required fields.');
        }
    });
});
