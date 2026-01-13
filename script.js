// ============================================
// NAVIGATION & SECTION MANAGEMENT
// ============================================

let currentSection = 0;
const totalSections = 10;

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypingEffect();
    initializeConfetti();
    initializeScrollListener();
    initializeFirstPageEffects();
    initializeAllPageInteractivity();
    initializeParticleSystems();
    initializeScrollAnimations();
    
    // Show first section and make all sections visible
    showSection(0);
    // Make all sections visible for normal scrolling
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('active');
    });
});

// ============================================
// FIRST PAGE ENHANCED EFFECTS
// ============================================

function initializeFirstPageEffects() {
    // Trigger party popper on page load
    setTimeout(() => {
        createPartyPopper();
    }, 500);
    
    // Add floating particles
    createFloatingParticles();
    
    // Make photo frame interactive
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        photoFrame.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.photo-overlay');
            if (overlay) {
                overlay.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });
    }
    
    // Add click effect to summary card
    const summaryCard = document.querySelector('.summary-card');
    if (summaryCard) {
        summaryCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

// Party Popper Animation
function createPartyPopper() {
    const container = document.getElementById('partyPopper');
    if (!container) return;
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'party-confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Create emoji party elements
    const emojis = ['🎉', '🎊', '🎈', '🎁', '🎂', '🎀', '💗', '✨', '⭐', '🌟'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'party-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '50%';
            emoji.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 2500);
        }, i * 50);
    }
    
    // Remove container after animation
    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 1000);
    }, 3000);
}

function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particles = ['✨', '💫', '⭐', '🌟', '💗', '💕'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'absolute';
            particle.style.fontSize = '1.5rem';
            particle.style.opacity = '0';
            particle.style.pointerEvents = 'none';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${15 + Math.random() * 10}s infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.style.opacity = '0.6';
            }, 100);
        }, i * 500);
    }
}

// Navigation dots click handlers
function initializeNavigation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToSection(index);
        });
    });
}

// Navigate to specific section
function navigateToSection(index) {
    if (index >= 0 && index < totalSections) {
        const targetSection = document.getElementById(`section-${index}`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            currentSection = index;
            updateNavigationDots();
            
            // Trigger section-specific animations
            triggerSectionAnimations(index);
        }
    }
}

// Show section with smooth transition
function showSection(index) {
    // Ensure target section is visible
    const targetSection = document.getElementById(`section-${index}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Update navigation dots
function updateNavigationDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// ============================================
// TYPING EFFECT FOR APOLOGY SECTION
// ============================================

function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    let hasTyped = false;
    
    // Use Intersection Observer to trigger typing when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                const elements = entry.target.parentElement.querySelectorAll('.typing-text');
                elements.forEach((element, index) => {
                    const text = element.getAttribute('data-text');
                    element.textContent = '';
                    
                    setTimeout(() => {
                        typeText(element, text, 50);
                    }, index * 2000);
                });
            }
        });
    }, { threshold: 0.3 });
    
    // Observe the apology section
    const apologySection = document.getElementById('section-1');
    if (apologySection) {
        observer.observe(apologySection);
    }
}

function typeText(element, text, speed) {
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // Remove cursor after typing completes
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 500);
        }
    }, speed);
}

// ============================================
// CONFETTI ANIMATION FOR BIRTHDAY SECTION
// ============================================

function initializeConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (!confettiContainer) return;
    
    const colors = ['#FFB6C1', '#DDA0DD', '#E6E6FA', '#FFC0CB', '#FFF8DC'];
    let confettiStarted = false;
    
    // Use Intersection Observer to trigger confetti when birthday section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !confettiStarted) {
                confettiStarted = true;
                // Create confetti pieces
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        createConfettiPiece(confettiContainer, colors);
                    }, i * 100);
                }
            }
        });
    }, { threshold: 0.3 });
    
    // Observe the birthday section
    const birthdaySection = document.getElementById('section-4');
    if (birthdaySection) {
        observer.observe(birthdaySection);
    }
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 5 + 's';
    confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 8000);
}

// ============================================
// SCROLL LISTENER FOR NAVIGATION
// ============================================

function initializeScrollListener() {
    // Update active section based on scroll position
    let ticking = false;
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = index;
                updateNavigationDots();
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveSection);
            ticking = true;
        }
    });
    
    // Initial check
    updateActiveSection();
    
    // Keyboard navigation (optional - for jumping between sections)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            if (currentSection < totalSections - 1) {
                e.preventDefault();
                navigateToSection(currentSection + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            if (currentSection > 0) {
                e.preventDefault();
                navigateToSection(currentSection - 1);
            }
        }
    });
}

// ============================================
// SECTION-SPECIFIC ANIMATIONS
// ============================================

function triggerSectionAnimations(sectionIndex) {
    switch(sectionIndex) {
        case 4: // Birthday section
            startBirthdayAnimations();
            break;
        case 7: // Choice section
            resetChoiceButtons();
            break;
        case 8: // Surprise section
            startSurpriseAnimations();
            break;
    }
}

function startBirthdayAnimations() {
    // Reinitialize confetti when entering birthday section
    const confettiContainer = document.querySelector('.confetti-container');
    if (confettiContainer) {
        confettiContainer.innerHTML = '';
        const colors = ['#FFB6C1', '#DDA0DD', '#E6E6FA', '#FFC0CB', '#FFF8DC'];
        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfettiPiece(confettiContainer, colors);
            }, i * 100);
        }
    }
}

function startSurpriseAnimations() {
    // Add sparkle effect
    const sparkles = document.querySelector('.sparkles');
    if (sparkles) {
        sparkles.style.animation = 'sparkle 15s infinite';
    }
}

// ============================================
// INTERACTIVE CHOICE HANDLING
// ============================================

function handleChoice(choice) {
    const responseDiv = document.getElementById('choice-response');
    const buttons = document.querySelectorAll('.choice-btn');
    
    // Disable buttons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.6';
    });
    
    // Show response
    setTimeout(() => {
        responseDiv.innerHTML = '';
        
        if (choice === 'forgive') {
            responseDiv.innerHTML = `
                <p style="font-size: 2rem; margin-bottom: 20px;">💗</p>
                <p>Thank you, from the bottom of my heart.</p>
                <p>Your forgiveness means everything to me.</p>
                <p>I promise to do better and show you every day how much you mean to me.</p>
                <p style="margin-top: 20px; font-style: italic;">I love you more than words can express.</p>
            `;
        } else {
            responseDiv.innerHTML = `
                <p style="font-size: 2rem; margin-bottom: 20px;">💔</p>
                <p>I understand, and I respect your feelings.</p>
                <p>I know I hurt you, and I'm truly sorry.</p>
                <p>I'll give you the space you need, but I want you to know that I'm here whenever you're ready.</p>
                <p style="margin-top: 20px;">I'll keep trying to make things right, because you're worth it.</p>
            `;
        }
        
        responseDiv.classList.add('show');
        
        // After showing response, navigate to next section after a delay
        setTimeout(() => {
            if (currentSection < totalSections - 1) {
                setTimeout(() => {
                    navigateToSection(currentSection + 1);
                }, 3000);
            }
        }, 2000);
    }, 500);
}

function resetChoiceButtons() {
    const responseDiv = document.getElementById('choice-response');
    const buttons = document.querySelectorAll('.choice-btn');
    
    responseDiv.classList.remove('show');
    responseDiv.innerHTML = '';
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'all';
        btn.style.opacity = '1';
    });
}

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

// Add fade transitions between sections
function addTransitionEffects() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.addEventListener('transitionend', () => {
            // Trigger animations when section becomes active
            if (section.classList.contains('active')) {
                const animatedElements = section.querySelectorAll('.fade-in-up, .feeling-card, .importance-item, .wish-item, .promise-item');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

// Initialize transition effects
addTransitionEffects();

// ============================================
// MOBILE TOUCH SUPPORT
// ============================================

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - next section
            if (currentSection < totalSections - 1) {
                navigateToSection(currentSection + 1);
            }
        } else {
            // Swipe down - previous section
            if (currentSection > 0) {
                navigateToSection(currentSection - 1);
            }
        }
    }
}

// ============================================
// INTERACTIVE FEATURES
// ============================================

// Show card message on click
function showCardMessage(card, message) {
    // Create or update message bubble
    let messageBubble = card.querySelector('.card-message-bubble');
    if (!messageBubble) {
        messageBubble = document.createElement('div');
        messageBubble.className = 'card-message-bubble';
        card.appendChild(messageBubble);
    }
    
    messageBubble.textContent = message;
    messageBubble.style.display = 'block';
    messageBubble.style.opacity = '0';
    messageBubble.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        messageBubble.style.opacity = '1';
        messageBubble.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide after 4 seconds
    setTimeout(() => {
        messageBubble.style.opacity = '0';
        setTimeout(() => {
            messageBubble.style.display = 'none';
        }, 300);
    }, 4000);
}

// Show importance message on click
function showImportanceMessage(item, message) {
    let messageBubble = item.querySelector('.item-message-bubble');
    if (!messageBubble) {
        messageBubble = document.createElement('div');
        messageBubble.className = 'item-message-bubble';
        item.appendChild(messageBubble);
    }
    
    messageBubble.textContent = message;
    messageBubble.style.display = 'block';
    messageBubble.style.opacity = '0';
    
    setTimeout(() => {
        messageBubble.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        messageBubble.style.opacity = '0';
        setTimeout(() => {
            messageBubble.style.display = 'none';
        }, 300);
    }, 5000);
}

// Expand wish on click
function expandWish(wishItem) {
    const wishDetail = wishItem.querySelector('.wish-detail');
    if (wishDetail) {
        wishItem.classList.toggle('expanded');
        createClickSparkle(event.clientX, event.clientY);
        // The CSS handles the expansion with max-height transition
    }
}

// Replay typing effect
function replayTyping(button) {
    const paragraph = button.previousElementSibling;
    const text = paragraph.getAttribute('data-text');
    if (text) {
        paragraph.textContent = '';
        paragraph.classList.remove('typing-complete');
        typeText(paragraph, text, 50);
    }
}

// Show apology extra message
function showApologyMessage() {
    const messageDiv = document.getElementById('apology-extra-message');
    if (messageDiv) {
        messageDiv.innerHTML = `
            <div class="extra-message-content">
                <h3>💗 More from my heart...</h3>
                <p>Sonam, I want you to know that this mistake doesn't define how I feel about you. You are the most important person in my life, and I will do everything to make sure you never feel unimportant again.</p>
                <p>Your happiness means everything to me, and I'm committed to being better, for you.</p>
            </div>
        `;
        messageDiv.style.display = 'block';
        messageDiv.style.animation = 'fadeInUp 0.8s ease forwards';
    }
}

// Show birthday wish
function showBirthdayWish() {
    const messageDiv = document.getElementById('birthday-wish-message');
    if (messageDiv) {
        messageDiv.innerHTML = `
            <div class="birthday-wish-content">
                <h3>🎂 A Special Birthday Wish</h3>
                <p>Sonam, on your special day, I wish for you to feel loved, cherished, and celebrated. Even though I messed up, I want you to know that you deserve all the happiness in the world.</p>
                <p>May this year bring you everything you've ever dreamed of, and may all your wishes come true. You are amazing, beautiful, and so loved.</p>
                <p>Happy Birthday, my love! 💗</p>
            </div>
        `;
        messageDiv.style.display = 'block';
        messageDiv.style.animation = 'fadeInUp 0.8s ease forwards';
    }
}

// Show final message
function showFinalMessage() {
    const messageDiv = document.getElementById('final-extra-message');
    if (messageDiv) {
        messageDiv.innerHTML = `
            <div class="final-extra-content">
                <h3>💌 One Last Thing...</h3>
                <p>Sonam, thank you for being patient with me. Thank you for giving me a chance to make things right.</p>
                <p>I know I'm not perfect, but I promise to keep trying, to keep learning, and to keep loving you with everything I have.</p>
                <p>You are my everything, and I will always be here for you.</p>
                <p>Forever yours,<br>Your Kuchupuchu 💗</p>
            </div>
        `;
        messageDiv.style.display = 'block';
        messageDiv.style.animation = 'fadeInUp 0.8s ease forwards';
    }
}

// Create heart burst effect
function createHeartBurst(element) {
    const hearts = ['💗', '💕', '💖', '💝', '💓', '💞'];
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'burst-heart';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.position = 'fixed';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 100 + Math.random() * 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

// Add interactive title effects
document.addEventListener('DOMContentLoaded', function() {
    // Make titles interactive
    const interactiveTitles = document.querySelectorAll('.interactive-title');
    interactiveTitles.forEach(title => {
        title.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    });
    
    // Make greeting lines interactive
    const greetingLines = document.querySelectorAll('.interactive-greeting');
    greetingLines.forEach((line, index) => {
        line.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = '#FFB6C1';
        });
        line.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '';
        });
    });
    
    // Make hearts interactive
    const interactiveHearts = document.querySelectorAll('.interactive-heart, .interactive-heart-small');
    interactiveHearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    });
});

// ============================================
// FULL INTERACTIVITY & ANIMATIONS
// ============================================

function initializeAllPageInteractivity() {
    // Add ripple effects to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Add click animations to all cards
    document.querySelectorAll('.feeling-card-large, .feeling-card-medium, .feeling-card-wide, .wish-card-large, .wish-card-medium, .wish-card-wide, .promise-card-timeline, .importance-item').forEach(card => {
        card.addEventListener('click', function(e) {
            createClickSparkle(e.clientX, e.clientY);
        });
    });
    
    // Add hover sound effects (visual feedback)
    document.querySelectorAll('.interactive-card, .interactive-wish, .interactive-item').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add floating animation to icons
    document.querySelectorAll('.card-icon-large, .card-icon-medium, .wish-icon-large, .wish-icon-medium').forEach(icon => {
        icon.style.animation = 'floatIcon 3s ease-in-out infinite';
        icon.style.animationDelay = Math.random() * 2 + 's';
    });
    
    // Add parallax effect to sections
    window.addEventListener('scroll', handleParallax);
    
    // Add mouse follower effect
    initializeMouseFollower();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createClickSparkle(x, y) {
    const sparkles = ['✨', '⭐', '💫', '🌟', '💗', '💕'];
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.opacity = '0';
        sparkle.className = 'click-sparkle';
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 6;
        const distance = 50 + Math.random() * 30;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        sparkle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(1)`, opacity: 1, offset: 0.5 },
            { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

function initializeParticleSystems() {
    // Create floating particles for each section
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index !== 0) { // Skip first section as it already has particles
            createSectionParticles(section);
        }
    });
}

function createSectionParticles(section) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'section-particles';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    particleContainer.style.overflow = 'hidden';
    
    section.style.position = 'relative';
    section.appendChild(particleContainer);
    
    const particles = ['💗', '💕', '✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.position = 'absolute';
            particle.style.fontSize = (1 + Math.random()) + 'rem';
            particle.style.opacity = '0.3';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${10 + Math.random() * 10}s infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particleContainer.appendChild(particle);
        }, i * 200);
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('feeling-card-large')) {
                    entry.target.style.animation = 'slideInFromLeft 0.8s ease forwards';
                }
                if (entry.target.classList.contains('wish-card-large')) {
                    entry.target.style.animation = 'slideInFromRight 0.8s ease forwards';
                }
                if (entry.target.classList.contains('promise-timeline-item')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.feeling-card-large, .feeling-card-medium, .feeling-card-wide, .wish-card-large, .wish-card-medium, .wish-card-wide, .promise-timeline-item, .importance-item').forEach(el => {
        observer.observe(el);
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function initializeMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.innerHTML = '💗';
    follower.style.position = 'fixed';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9998';
    follower.style.fontSize = '1.5rem';
    follower.style.opacity = '0';
    follower.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '0.6';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hide on sections without interactivity
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
}

// Add keyboard interactions
document.addEventListener('keydown', (e) => {
    // Space bar to create sparkles at random positions
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createClickSparkle(x, y);
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add ARIA labels for navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.setAttribute('aria-label', `Navigate to section ${index + 1}`);
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    
    dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToSection(index);
        }
    });
});

// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#section-0';
skipLink.textContent = 'Skip to content';
skipLink.className = 'skip-link';
skipLink.style.cssText = 'position: absolute; left: -9999px; z-index: 9999;';
document.body.insertBefore(skipLink, document.body.firstChild);

skipLink.addEventListener('focus', () => {
    skipLink.style.left = '20px';
    skipLink.style.top = '20px';
    skipLink.style.background = 'white';
    skipLink.style.padding = '10px 20px';
    skipLink.style.borderRadius = '5px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.color = 'var(--midnight-blue)';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.left = '-9999px';
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feeling-card, .importance-item, .wish-item, .promise-item').forEach(el => {
    observer.observe(el);
});

