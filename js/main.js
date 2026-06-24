/* ================================================
   KEYUR VADSAK — INNOVATIVE PORTFOLIO JS
   Custom Cursor · 3D Tilt · Counters · Magnetic
   ================================================ */

(function () {
    'use strict';

    // ===== CUSTOM CURSOR =====
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    if (cursor && trail && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth trail follow
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            requestAnimationFrame(animateTrail);
        }
        animateTrail();

        // Cursor hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .tilt-card, .tech-badge, .skill-tags span, .project-tech-row span, .info-item');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                trail.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                trail.classList.remove('hover');
            });
        });
    }

    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.getElementById('scrollProgress');

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        if (progressBar) progressBar.style.width = progress + '%';
    }

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('.hero, .section');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const sy = window.scrollY;
        if (header) header.classList.toggle('scrolled', sy > 30);

        // Active nav link
        let current = '';
        sections.forEach(s => {
            const top = s.offsetTop - 120;
            if (sy >= top) current = s.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });

        // Back to top
        const btt = document.getElementById('backToTop');
        if (btt) btt.classList.toggle('visible', sy > 400);

        updateProgress();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== MOBILE MENU =====
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() {
        mobileMenu.classList.add('open');
        mobileOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TYPING EFFECT =====
    const typedEl = document.getElementById('typedText');
    if (typedEl) {
        const roles = [
            'AI-powered platforms',
            'scalable backend APIs',
            'real-time solutions',
            'data-driven software'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function type() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typedEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                speed = 60 + Math.random() * 40;

                if (charIndex === currentRole.length) {
                    speed = 2500;
                    isDeleting = true;
                }
            } else {
                typedEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                speed = 30;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    speed = 600;
                }
            }

            setTimeout(type, speed);
        }

        setTimeout(type, 1500);
    }

    // ===== SCROLL REVEAL =====
    const animElements = document.querySelectorAll('.anim-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px -30px 0px'
    });

    animElements.forEach(el => revealObserver.observe(el));

    // ===== ANIMATED NUMBER COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const duration = 2000;
                const step = target / (duration / 16);

                function updateCounter() {
                    current += step;
                    if (current >= target) {
                        el.textContent = target;
                    } else {
                        el.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    }
                }
                updateCounter();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ===== 3D TILT EFFECT =====
    const tiltCards = document.querySelectorAll('.tilt-card');

    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // ===== MAGNETIC BUTTONS =====
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    if (window.innerWidth > 768) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===== PARALLAX FLOATING ELEMENTS =====
    const floatEls = document.querySelectorAll('.float-el');

    if (window.innerWidth > 768 && floatEls.length) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            floatEls.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.03;
                const moveX = x * speed * 200;
                const moveY = y * speed * 200;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    if (formSuccess) {
                        formSuccess.classList.add('show');
                        contactForm.style.display = 'none';
                    }
                    contactForm.reset();
                } else {
                    alert('Something went wrong. Please try again or email me directly at keyurvadsak6@gmail.com');
                }
            } catch (error) {
                alert('Failed to send message. Please email me directly at keyurvadsak6@gmail.com');
            }

            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        });
    }

    // ===== INTERSECTION STAGGER FOR SKILL TAGS =====
    const skillTags = document.querySelectorAll('.skill-tags span');
    skillTags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = `all 0.4s ease ${i * 0.05}s`;
    });

    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tags span');
                tags.forEach(tag => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                });
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-card').forEach(card => tagObserver.observe(card));

})();
