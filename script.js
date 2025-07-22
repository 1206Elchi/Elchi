});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project click handler
function openProject(url) {
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Dieses Projekt ist nicht öffentlich verfügbar, aber ich kann Ihnen gerne mehr darüber auf Discord erzählen! 💬');
    }
}

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Add some interactive elements
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Konami Code aktiviert! Sie haben das Easter Egg gefunden! 🎉');
        }, 2000);
    }
});

// DOM Content Loaded - Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded! 🚀');
    
    // Add some startup animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});

// Smooth hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Discord card click interaction
document.querySelector('.discord-card').addEventListener('click', function() {
    // Copy Discord username to clipboard
    navigator.clipboard.writeText('elchi_sam').then(() => {
        // Visual feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<div style="font-size: 2rem;">✅</div><div>Discord Username kopiert!</div><p>Jetzt können Sie mich auf Discord anschreiben</p>';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback if clipboard API doesn't work
        alert('Discord Username: elchi_sam\n\nKopieren Sie diesen Namen und suchen Sie mich auf Discord!');
    });
});

// Add typing effect for the hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero .subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 30);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
});

// Add intersection observer for skill tags animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const skillTags = entry.target.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, i) => {
                setTimeout(() => {
                    tag.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    tag.style.opacity = '1';
                }, i * 100);
            });
        }
    });
});

// Observe skills section
document.querySelectorAll('.skills').forEach(skills => {
    skillsObserver.observe(skills);
});

// Add click sound effect (optional - requires user interaction)
function playClickSound() {
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to interactive elements
document.querySelectorAll('.btn, .project-card').forEach(element => {
    element.addEventListener('click', () => {
        try {
            playClickSound();
        } catch (e) {
            // Audio API might not work in all browsers/contexts
            console.log('Audio not available');
        }
    });
});
