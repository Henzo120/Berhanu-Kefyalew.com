document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.querySelector('.project-modal');
    const modalImg = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalLocation = document.querySelector('.modal-location');
    const modalDesc = document.querySelector('.modal-description');
    const closeBtn = document.querySelector('.close-modal');
    const track = document.querySelector('.carousel-track');
  
    // Click handler for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const title = this.querySelector('h3').textContent;
        const location = this.querySelector('.location').textContent;
        const description = this.dataset.description;
        
        modalImg.src = imgSrc;
        modalImg.alt = title;
        modalTitle.textContent = title;
        modalLocation.textContent = location;
        modalDesc.textContent = description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Close modal
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Close when clicking outside modal
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // Pause animation when hovering
    const carousel = document.querySelector('.infinite-carousel');
    carousel.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  
    // Infinite loop logic
    function checkPosition() {
      const trackWidth = track.scrollWidth / 2;
      const currentPosition = track.getBoundingClientRect().left;
      
      if (currentPosition < -trackWidth) {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        setTimeout(() => {
          track.style.transition = 'transform 0s linear';
        });
      }
    }
    
    setInterval(checkPosition, 100);
  });