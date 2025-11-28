// Mobile Menu Toggle
console.log('Script loaded');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    console.log('Menu toggle and nav menu found');
    menuToggle.addEventListener('click', () => {
        console.log('Menu toggle clicked');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
} else {
    console.log('Menu toggle or nav menu not found');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Join buttons scroll to footer
const joinBtns = document.querySelectorAll('.navbar-cta, .navbar-cta-mobile');
joinBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const footer = document.querySelector('#footer');
        if (footer) {
            const headerOffset = 80;
            const elementPosition = footer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.review-card, .process-step, .partners-logos img');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Button Click Animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImages = document.querySelector('.hero-images');
    if (heroImages && scrolled < window.innerHeight) {
        heroImages.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroImages.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Review Slider
console.log('Window width:', window.innerWidth);
if (window.innerWidth < 768) {
  console.log('Enabling review slider');
  const reviewCards = document.querySelector('.review-cards');
  const prevBtn = document.querySelector('.review-nav-prev');
  const nextBtn = document.querySelector('.review-nav-next');
  console.log('Review cards:', reviewCards);
  console.log('Prev btn:', prevBtn);
  console.log('Next btn:', nextBtn);
  let currentIndex = 0;
  const totalCards = document.querySelectorAll('.review-card').length;
  console.log('Total cards:', totalCards);

  function updateSlide() {
    const cardWidth = document.querySelector('.review-card').offsetWidth;
    console.log('Card width:', cardWidth);
    reviewCards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    console.log('Prev clicked');
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
    updateSlide();
  });

  nextBtn.addEventListener('click', () => {
    console.log('Next clicked');
    currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
    updateSlide();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      updateSlide();
    } else {
      reviewCards.style.transform = 'translateX(0)';
    }
  });

  // Initialize
  updateSlide();
} else {
  console.log('Review slider not enabled, width >=768');
}

