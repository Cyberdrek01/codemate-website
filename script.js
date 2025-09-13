document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selections ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const typewriterElement = document.getElementById('typewriter-text');
    const heroSection = document.getElementById('home');
    const heroContent = document.getElementById('hero-content');
    const eventCards = document.querySelectorAll('.event-card');
    const modal = document.getElementById('event-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const revealElements = document.querySelectorAll('.reveal');

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Typewriter Effect ---
    if (typewriterElement) {
        const textToType = "Welcome to Codemate Club, a community for developers, designers, and tech enthusiasts to learn, build, and grow together.";
        let index = 0;
        typewriterElement.innerHTML = ''; // Clear initial text
        
        function type() {
            if (index < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(index);
                index++;
                setTimeout(type, 50);
            } else {
                typewriterElement.classList.remove('typing');
            }
        }
        typewriterElement.classList.add('typing');
        type();
    }

    // --- 3D Tilt Effect on Hero Content ---
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

    // --- Event Modal Logic ---
    if (modal) {
        eventCards.forEach(card => {
            card.addEventListener('click', () => {
                modalImage.src = card.dataset.image;
                modalTitle.textContent = card.dataset.title;
                modalDescription.textContent = card.dataset.description;
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // --- Intersection Observer for Reveal and Counter Animations ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle reveal animation
                entry.target.classList.add('active');

                // Find a counter element within the revealed element
                const counter = entry.target.querySelector('.counter');

                // If a counter is found and it hasn't been animated yet, animate it
                if (counter && !counter.dataset.animated) {
                    counter.dataset.animated = 'true'; // Mark as animated

                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // Animation duration in ms

                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const currentValue = Math.floor(progress * target);
                        counter.textContent = currentValue + suffix;
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                }
                
                // We're done with this element, so stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    revealElements.forEach(el => observer.observe(el));


    // --- Particles.js Initialization ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#fb923c", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true
        });
    }
});

