// Efficient Counter Animation
function initCounters() {
    const metricsSection = document.querySelector('.compact-metrics');
    const counters = document.querySelectorAll('.metric-value');
    let animated = false;
  
    function animateValue(el, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        el.textContent = value + (el.textContent.includes('+') ? '+' : '%');
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  
    function handleScroll() {
      const rect = metricsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          animateValue(counter, 0, target, 1500);
        });
        window.removeEventListener('scroll', handleScroll);
      }
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load if already visible
  }
  
  document.addEventListener('DOMContentLoaded', initCounters);