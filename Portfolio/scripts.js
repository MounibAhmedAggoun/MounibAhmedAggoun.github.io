/* ============================================
   Mounib Aggoun Portfolio - JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Configuration & State
    // ============================================
    
    const config = {
        reducedMotion: localStorage.getItem('reducedMotion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        theme: localStorage.getItem('theme') || 'cyan',
        particleCount: window.innerWidth < 768 ? 20 : 50,
        typewriterSpeed: 35
    };

    // ============================================
    // Initialize GSAP
    // ============================================
    
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Check if reduced motion is enabled
     */
    function prefersReducedMotion() {
        return config.reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Debounce function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * (1 + threshold) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ============================================
    // Reduced Motion Toggle
    // ============================================
    
    function initMotionToggle() {
        const toggle = document.querySelector('.motion-toggle');
        if (!toggle) return;

        // Update body class based on initial state
        if (config.reducedMotion) {
            document.body.classList.add('reduced-motion');
        }

        toggle.addEventListener('click', () => {
            config.reducedMotion = !config.reducedMotion;
            localStorage.setItem('reducedMotion', config.reducedMotion.toString());
            
            if (config.reducedMotion) {
                document.body.classList.add('reduced-motion');
            } else {
                document.body.classList.remove('reduced-motion');
            }

            // Reload animations if motion is re-enabled
            if (!config.reducedMotion) {
                initScrollAnimations();
            }
        });
    }

    // ============================================
    // Theme Toggle
    // ============================================
    
    function initThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        const themes = ['cyan', 'pink', 'green'];
        let currentIndex = themes.indexOf(config.theme);
        if (currentIndex === -1) currentIndex = 0;

        // Apply initial theme
        document.documentElement.setAttribute('data-theme', config.theme);

        toggle.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % themes.length;
            config.theme = themes[currentIndex];
            localStorage.setItem('theme', config.theme);
            document.documentElement.setAttribute('data-theme', config.theme);
        });
    }

    // ============================================
    // Hero Animations
    // ============================================
    
    function initHeroAnimations() {
        if (prefersReducedMotion()) return;

        const heroHeadline = document.querySelector('.hero-headline .typewriter-text');
        if (!heroHeadline) return;

        const text = heroHeadline.textContent;
        heroHeadline.textContent = '';
        heroHeadline.style.opacity = '1';

        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroHeadline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, config.typewriterSpeed);
            }
        }

        // Start typewriter after logo animation
        setTimeout(() => {
            typeWriter();
        }, 2000);
    }

    // ============================================
    // Hologram Card Parallax
    // ============================================
    
    function initHologramParallax() {
        if (prefersReducedMotion()) return;

        const hologramCard = document.querySelector('.hologram-card');
        if (!hologramCard) return;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        function animate() {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;

            const rotateX = targetY * 6;
            const rotateY = targetX * 6;

            hologramCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            requestAnimationFrame(animate);
        }

        animate();
    }

    // ============================================
    // Scroll Animations
    // ============================================
    
    function initScrollAnimations() {
        if (prefersReducedMotion()) {
            // Simple fade-in for reduced motion
            const elements = document.querySelectorAll('.project-card, .skill-item, .timeline-item, .about-text, .about-facts');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                            }, index * 50);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                observer.observe(el);
            });
            return;
        }

        // Use GSAP if available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Project cards animation
            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none none'
                    },
                    delay: index * 0.1
                });
            });

            // Skill items animation
            gsap.utils.toArray('.skill-item').forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    delay: index * 0.08
                });

                // Animate skill rings
                const progressRing = item.querySelector('.skill-ring-progress');
                if (progressRing) {
                    const value = parseInt(item.querySelector('.skill-value').textContent);
                    const circumference = 2 * Math.PI * 50;
                    const offset = circumference - (value / 100) * circumference;
                    
                    gsap.from(progressRing, {
                        strokeDashoffset: circumference,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    });
                }
            });

            // Timeline items animation
            gsap.utils.toArray('.timeline-item').forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    x: -50,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    delay: index * 0.1
                });
            });

            // Section titles animation
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    opacity: 0,
                    y: -20,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        } else {
            // Fallback: Intersection Observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = 'opacity 0.7s cubic-bezier(0.22, 0.9, 0.35, 1), transform 0.7s cubic-bezier(0.22, 0.9, 0.35, 1)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) translateX(0)';
                        }, index * 80);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.project-card, .skill-item, .timeline-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            });
        }
    }

    // ============================================
    // Project Card Interactions
    // ============================================
    
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const inner = card.querySelector('.project-card-inner');
            
            // 3D tilt on hover
            card.addEventListener('mousemove', (e) => {
                if (prefersReducedMotion()) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                inner.style.transform = `rotateY(180deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                inner.style.transform = 'rotateY(180deg)';
            });
        });
    }

    // ============================================
    // Terminal Widget
    // ============================================
    
    function initTerminal() {
        const terminalInput = document.getElementById('terminalInput');
        const terminalOutput = document.getElementById('terminalOutput');
        if (!terminalInput || !terminalOutput) return;

        const commands = {
            'help': 'Available commands: help, whoami, about, skills, experience, education, projects, opinion, contact, sections, clear',
            'whoami': 'mounib - Cybersecurity & Computer Science Student',
            'about': 'CS student focused on security tooling, OSINT, reverse engineering, and defensive automation.',
            'skills': 'Cybersecurity • Penetration Testing • Linux • Automation • OSINT',
            'experience': "Bachelor's + Master's in progress since 2023 at Abbes Laghrour University, Khenchela, Algeria.",
            'education': "Bachelor's + Master's in progress since 2023 at Abbes Laghrour University, Khenchela, Algeria.",
            'projects': 'password-checker/  whale-tracker/  network-tool/',
            'opinion': 'Privacy-first security with automation-driven defense and open-source tooling.',
            'contact': 'Email: mounib@example.com | GitHub: github.com/nyxxaaris | LinkedIn: linkedin.com/in/nyxxaaris',
            'sections': [
                'Hero: Cybersecurity & penetration testing and OSINT — building secure web, app, and game systems.',
                'About: CS student focused on security tooling, OSINT, reverse engineering, and automation.',
                'Skills: Cybersecurity • Penetration Testing • Linux • Automation • OSINT.',
                "Experience & Education: Bachelor's + Master's in progress since 2023 at Abbes Laghrour University, Khenchela, Algeria.",
                'Opinion: Privacy-first security with automation-driven defense.',
                'Contact: Email, GitHub, and LinkedIn for collaborations.'
            ].join('\\n'),
            'clear': () => {
                terminalOutput.innerHTML = '';
                return '';
            }
        };

        function addOutput(command, response) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-command">${command}</span>`;
            terminalOutput.appendChild(line);

            const responseDiv = document.createElement('div');
            responseDiv.className = 'terminal-response';
            responseDiv.textContent = response;
            terminalOutput.appendChild(responseDiv);

            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                if (!command) return;

                let response = 'Command not found. Type "help" for available commands.';
                
                if (commands[command]) {
                    if (typeof commands[command] === 'function') {
                        commands[command]();
                        return;
                    } else {
                        response = commands[command];
                    }
                }

                addOutput(command, response);
            }
        });

        // Make terminal commands clickable
        const clickableCommands = terminalOutput.querySelectorAll('.terminal-command');
        clickableCommands.forEach(cmd => {
            cmd.style.cursor = 'pointer';
            cmd.addEventListener('click', () => {
                const command = cmd.textContent.trim();
                terminalInput.value = command;
                terminalInput.focus();
            });
        });
    }

    // ============================================
    // Contact Form
    // ============================================
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = form.querySelector('.btn-submit');

        function validateField(field, errorElement) {
            const value = field.value.trim();
            const fieldGroup = field.closest('.form-group');
            
            if (!value) {
                fieldGroup.classList.add('error');
                errorElement.textContent = 'This field is required';
                return false;
            }

            if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                fieldGroup.classList.add('error');
                errorElement.textContent = 'Please enter a valid email address';
                return false;
            }

            fieldGroup.classList.remove('error');
            return true;
        }

        // Real-time validation
        [nameInput, emailInput, messageInput].forEach(input => {
            const errorElement = document.getElementById(input.id + 'Error');
            
            input.addEventListener('blur', () => {
                validateField(input, errorElement);
            });

            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.closest('.form-group').classList.remove('error');
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            const isNameValid = validateField(nameInput, nameError);
            const isEmailValid = validateField(emailInput, emailError);
            const isMessageValid = validateField(messageInput, messageError);

            if (isNameValid && isEmailValid && isMessageValid) {
                // Show success state
                submitBtn.classList.add('success');
                
                // In a real application, you would send the form data to a server
                console.log('Form submitted:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.classList.remove('success');
                }, 3000);
            }
        });
    }

    // ============================================
    // Smooth Scrolling
    // ============================================
    
    function initSmoothScrolling() {
        if (prefersReducedMotion()) return;

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Performance Optimizations
    // ============================================
    
    function initPerformanceOptimizations() {
        // Lazy load images
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Reduce animations on slow connections
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
                config.reducedMotion = true;
                document.body.classList.add('reduced-motion');
            }
        }
    }

    // ============================================
    // Keyboard Navigation
    // ============================================
    
    function initKeyboardNavigation() {
        // Skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main landmark if it doesn't exist
        const main = document.querySelector('main') || document.querySelector('.hero');
        if (main && !main.id) {
            main.id = 'main';
        }

        // Enhanced focus management
        document.addEventListener('keydown', (e) => {
            // Escape key to close modals/overlays
            if (e.key === 'Escape') {
                // Close any open project cards
                document.querySelectorAll('.project-card-inner').forEach(card => {
                    if (card.style.transform && card.style.transform.includes('180deg')) {
                        card.style.transform = '';
                    }
                });
            }
        });
    }

    // ============================================
    // Initialize Everything
    // ============================================
    
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initMotionToggle();
        initThemeToggle();
        initHeroAnimations();
        initHologramParallax();
        initScrollAnimations();
        initProjectCards();
        initTerminal();
        initContactForm();
        initSmoothScrolling();
        initPerformanceOptimizations();
        initKeyboardNavigation();

        // Update scroll animations on resize
        window.addEventListener('resize', debounce(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250));
    }

    // Start initialization
    init();

})();
