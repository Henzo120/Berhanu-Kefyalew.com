document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('modern-form');
    const notification = document.getElementById('notification');
    
    // Real-time validation
    form.addEventListener('input', function(e) {
      const input = e.target;
      validateField(input);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        showNotification('Please fill all required fields correctly', 'error');
        return;
      }
      
      const submitBtn = form.querySelector('.modern-btn');
      const btnText = submitBtn.querySelector('span');
      const originalText = btnText.textContent;
      
      // Show loading state
      btnText.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          showNotification('Message sent successfully!', 'success');
          form.reset();
          resetFormFields();
        } else {
          throw new Error('Failed to send message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
      })
      .finally(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
    
    // Field validation function
    function validateField(field) {
      const formGroup = field.closest('.form-group');
      const errorMessage = formGroup.querySelector('.error-message');
      
      // Reset state
      formGroup.classList.remove('error');
      errorMessage.textContent = '';
      
      // Check validity
      if (field.required && !field.value.trim()) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'This field is required';
        return false;
      }
      
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Please enter a valid email';
        return false;
      }
      
      if (field.type === 'tel' && field.value && !/^[0-9+]{10,15}$/.test(field.value)) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Please enter a valid phone number';
        return false;
      }
      
      if (field.tagName === 'SELECT' && field.required && !field.value) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Please select an option';
        return false;
      }
      
      if (field.type === 'checkbox' && field.required && !field.checked) {
        formGroup.classList.add('error');
        errorMessage.textContent = 'This agreement is required';
        return false;
      }
      
      return true;
    }
    
    // Show notification
    function showNotification(message, type) {
      notification.textContent = message;
      notification.className = `notification ${type}`;
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-notification';
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = () => notification.classList.add('hidden');
      notification.appendChild(closeBtn);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 5000);
    }
    
    // Reset form fields visual state
    function resetFormFields() {
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const input = group.querySelector('input, textarea, select');
        if (input) input.value = '';
      });
    }
  });