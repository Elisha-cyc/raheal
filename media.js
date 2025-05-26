document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const galleryTrack = document.querySelector('.gallery-track');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentIndex = 0;
    const slideCount = gallerySlides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateGallery() {
        galleryTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateGallery();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateGallery();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateGallery();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when hovering over gallery
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    

    
    // Add animation to fact cards when they come into view
    const factCards = document.querySelectorAll('.fact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    factCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
// media.js - Mobile responsiveness implementation

document.addEventListener('DOMContentLoaded', function() {
    // Set viewport meta tag dynamically if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(meta);
    }

    // Responsive adjustments
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust header and navigation
        const header = document.querySelector('header .container');
        const nav = document.querySelector('nav .container');
        if (isMobile) {
            if (header) header.style.padding = '1rem';
            if (nav) nav.style.padding = '0.5rem';
            
            // Make navigation items more compact
            const navItems = document.querySelectorAll('nav ul li');
            navItems.forEach(item => {
                item.style.margin = '0 0.5rem';
                item.style.padding = '0.3rem 0';
            });
        } else {
            if (header) header.style.padding = '';
            if (nav) nav.style.padding = '';
            
            const navItems = document.querySelectorAll('nav ul li');
            navItems.forEach(item => {
                item.style.margin = '';
                item.style.padding = '';
            });
        }
        
        // Adjust video grid layout
        const videoGrids = document.querySelectorAll('.video-grid');
        videoGrids.forEach(grid => {
            if (isMobile) {
                grid.style.gridTemplateColumns = '1fr';
                grid.style.gap = '1rem';
            } else {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                grid.style.gap = '2rem';
            }
        });
        
        // Adjust video iframe sizes
        const videoWrappers = document.querySelectorAll('.video-wrapper');
        videoWrappers.forEach(wrapper => {
            const iframe = wrapper.querySelector('iframe');
            if (iframe) {
                if (isMobile) {
                    iframe.style.width = '100%';
                    iframe.style.height = 'auto';
                    iframe.style.aspectRatio = '16/9';
                } else {
                    iframe.style.width = '560px';
                    iframe.style.height = '315px';
                    iframe.style.aspectRatio = '';
                }
            }
        });
        
        // Adjust facts container
        const factsContainer = document.querySelector('.facts-container');
        if (factsContainer) {
            if (isMobile) {
                factsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                factsContainer.style.gap = '1rem';
            } else {
                factsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
                factsContainer.style.gap = '2rem';
            }
        }
        
        // Adjust gallery controls
        const galleryControls = document.querySelector('.gallery-controls');
        if (galleryControls) {
            if (isMobile) {
                galleryControls.style.flexDirection = 'column';
                galleryControls.style.alignItems = 'center';
            } else {
                galleryControls.style.flexDirection = 'row';
                galleryControls.style.alignItems = '';
            }
        }
        
        // Adjust gallery slides
        const gallerySlides = document.querySelectorAll('.gallery-slide');
        gallerySlides.forEach(slide => {
            if (isMobile) {
                slide.style.minWidth = '80vw';
                slide.querySelector('img').style.maxHeight = '200px';
            } else {
                slide.style.minWidth = '400px';
                slide.querySelector('img').style.maxHeight = '300px';
            }
        });
    }
    
    // Initial adjustment
    adjustForMobile();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustForMobile);
    
    // Gallery functionality
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(document.querySelectorAll('.gallery-slide'));
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (track && slides.length > 0 && nextBtn && prevBtn) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        
        // Set initial position
        track.style.transform = 'translateX(0)';
        
        // Arrange slides next to each other
        slides.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });
        
        // Move to slide function
        function moveToSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
        }
        
        // Next slide
        nextBtn.addEventListener('click', function() {
            const lastIndex = slides.length - 1;
            currentIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
            moveToSlide(currentIndex);
        });
        
        // Previous slide
        prevBtn.addEventListener('click', function() {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
            moveToSlide(currentIndex);
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        track.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                // Swipe left - next
                const lastIndex = slides.length - 1;
                currentIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
                moveToSlide(currentIndex);
            } else if (touchEndX > touchStartX + threshold) {
                // Swipe right - previous
                currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
                moveToSlide(currentIndex);
            }
        }
    }
    
    // Create gallery dots if they don't exist
    const galleryDots = document.querySelector('.gallery-dots');
    if (galleryDots && galleryDots.children.length === 0 && slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(i));
            galleryDots.appendChild(dot);
        }
    }
    
    // Update active dot function
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Add smooth transitions
    document.querySelectorAll('section').forEach(section => {
        section.style.transition = 'all 0.3s ease';
    });
});