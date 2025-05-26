// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add visible class to hero section immediately
    document.getElementById('hero').classList.add('visible');
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section:not(#hero)');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Create and animate floating elements
    createFloatingElements();
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Function to create floating elements in the background
function createFloatingElements() {
    const floatingClouds = document.querySelector('.floating-clouds');
    const numClouds = 6;
    
    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Randomize cloud properties
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * 10;
        
        // Apply cloud styles
        cloud.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size / 2}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            filter: blur(10px);
            animation: floatCloud ${duration}s infinite linear;
            animation-delay: -${delay}s;
            z-index: -1;
        `;
        
        floatingClouds.appendChild(cloud);
    }
    
    // Add keyframes for cloud animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatCloud {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-10px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(10px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
        }
    `;
    
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add some interactive elements to the page
function addInteractiveElements() {
    // Get coin title for animation
    const coinTitle = document.querySelector('.coin-title');
    
    // Make the title respond to mouse movement
    document.addEventListener('mousemove', function(e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        coinTitle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
        coinTitle.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}

// Call interactive elements function
addInteractiveElements(); 