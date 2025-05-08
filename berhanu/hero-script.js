// Mobile Menu Toggle
document.querySelector('.menu-btn').addEventListener('click', function() {
  document.querySelector('.navbar').classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('active');
  });
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0s';
        entry.target.style.animationDelay = delay;
        entry.target.style.opacity = 1;
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    observer.observe(el);
  });
});