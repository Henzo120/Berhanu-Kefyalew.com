// JavaScript for infinite scrolling and hover effects
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const originalCards = track.querySelectorAll('.testimonial-card:not(:last-child)');
    
    // Clone cards for infinite loop
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
    
    // Navigation dots functionality
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
        const gap = 24; // 1.5rem gap in pixels
        
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
        
        dots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
        
        setTimeout(() => {
          track.style.transition = '';
        }, 500);
      });
    });
  });