
// Progress bar functionality
function updateProgressBar() {
const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrolled = (window.scrollY / windowHeight) * 100;
document.getElementById('progress-bar').style.width = scrolled + '%';
}

// Intersection Observer for section animations
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
observer.observe(section);
});

// Navigation active state
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
let currentSection = '';
sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
    }
});

navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-section') === currentSection) {
        item.classList.add('active');
    }
});
}

// Smooth scrolling for navigation
navItems.forEach(item => {
item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.getElementById(item.getAttribute('data-section'));
    targetSection.scrollIntoView({ behavior: 'smooth' });
});
});

// Temperature slider functionality
const tempSlider = document.getElementById('tempSlider');
const tempValue = document.getElementById('tempValue');
const tempEffect = document.getElementById('tempEffect');

const temperatureEffects = {
0: "No warming: Current baseline conditions",
0.5: "0.5°C warming: Subtle changes in weather patterns",
1.0: "1.0°C warming: Noticeable increase in extreme weather",
1.1: "1.1°C warming (current): Increased extreme weather, melting ice caps, rising sea levels",
1.5: "1.5°C warming: Significant ecosystem disruption, coral reef decline",
2.0: "2.0°C warming: Major food security issues, frequent extreme weather",
3.0: "3.0°C warming: Widespread ecosystem collapse, massive sea level rise",
4.0: "4.0°C warming: Catastrophic impacts, uninhabitable regions",
5.0: "5.0°C warming: Severe global consequences, major civilization threats"
};

tempSlider.addEventListener('input', (e) => {
const value = parseFloat(e.target.value);
tempValue.textContent = value;

// Find closest temperature effect
const closestTemp = Object.keys(temperatureEffects)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);

tempEffect.innerHTML = `<p>${temperatureEffects[closestTemp]}</p>`;
});

// Quiz functionality
const quizOptions = document.querySelectorAll('.quiz-option');
const quizResult = document.querySelector('.quiz-result');

quizOptions.forEach(option => {
option.addEventListener('click', () => {
    // Remove previous states
    quizOptions.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    // Add appropriate class
    if (option.getAttribute('data-answer') === 'correct') {
        option.classList.add('correct');
        quizResult.className = 'quiz-result show correct';
        quizResult.querySelector('p').textContent = 'Correct! Human activities, especially burning fossil fuels, are the primary driver of current climate change.';
    } else {
        option.classList.add('incorrect');
        // Show correct answer
        quizOptions.forEach(opt => {
            if (opt.getAttribute('data-answer') === 'correct') {
                opt.classList.add('correct');
            }
        });
        quizResult.className = 'quiz-result show incorrect';
        quizResult.querySelector('p').textContent = 'Not quite. The correct answer is human activities, particularly burning fossil fuels, which release greenhouse gases into the atmosphere.';
    }
});
});

// Effect card hover animations
const effectCards = document.querySelectorAll('.effect-card');
effectCards.forEach(card => {
card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px) scale(1.02)';
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
});
});

// Event listeners
window.addEventListener('scroll', () => {
updateProgressBar();
updateActiveNav();
});

// Initialize
updateProgressBar();
updateActiveNav();

// Add some interactive animations on load
window.addEventListener('load', () => {
setTimeout(() => {
    document.querySelector('.hero-title').style.transform = 'scale(1.05)';
    setTimeout(() => {
        document.querySelector('.hero-title').style.transform = 'scale(1)';
    }, 200);
}, 500);
});