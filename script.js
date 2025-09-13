document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const textToType = "Welcome to Codemate Club, a community for developers, designers, and tech enthusiasts to learn, build, and grow together.";
        let index = 0;
        typewriterElement.classList.add('typing');
        function type() {
            if (index < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 40);
            } else {
                typewriterElement.classList.remove('typing');
            }
        }
        type();
    }

    // --- 3D Tilt Effect on Hero Content ---
    const heroSection = document.getElementById('home');
    const heroContent = document.getElementById('hero-content');
    if (heroSection && heroContent) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            const xRotation = 20 * ((clientY - offsetHeight / 2) / offsetHeight);
            const yRotation = 20 * ((clientX - offsetWidth / 2) / offsetWidth);
            heroContent.style.transform = `rotateX(${-xRotation}deg) rotateY(${yRotation}deg)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    // --- Scroll-Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated Counter ---
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 1500; // ms
                const stepTime = Math.abs(Math.floor(duration / target));

                let current = 0;
                const timer = setInterval(() => {
                    current += 1;
                    counter.innerText = current + suffix;
                    if (current === target) {
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });
    counters.forEach(counter => counterObserver.observe(counter));


    // --- Event Modal Logic ---
    const eventCards = document.querySelectorAll('.event-card');
    const modal = document.getElementById('event-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            modalImage.src = card.dataset.image;
            modalTitle.textContent = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            modal.classList.remove('hidden');
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // NOTE: This is a front-end demonstration.
            // A real form would require a backend service (like EmailJS, Formspree, or a custom server) to send an email.
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.classList.remove('hidden');
            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }


    // --- Particles.js Configuration ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": false }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#fb923c", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "out_mode": "out" } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "repulse": { "distance": 150 }, "push": { "particles_nb": 4 } } }, "retina_detect": true
        });
    }
});

