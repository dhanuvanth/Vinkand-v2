// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling function
    function smoothScroll(targetId) {
        const element = document.getElementById(targetId);
        if (!element) return;

        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Mobile Menu Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Mobile Menu Functionality
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinksItems.forEach((link, index) => {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && 
                !navLinks.contains(e.target) && 
                navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (!navLinks?.classList.contains('active')) {
                if (scrollTop > lastScrollTop && scrollTop > 80) {
                    navbar.style.transform = 'translateY(-100%)';
                    navLinks?.classList.remove('active');
                    mobileMenuBtn?.classList.remove('active');
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            navbar.style.background = scrollTop > 50 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)';
            lastScrollTop = scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Initialize animations
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .platform-card, .portfolio-item, .testimonial-card').forEach(element => {
        observer.observe(element);
    });

    // Project filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}); 