// Initialize EmailJS with your user ID
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (window.emailjs) {
        emailjs.init("1nQgt8wdX2oWi5sul");
    }

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    function showNotification(type, message) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Force reflow to trigger animation
        notification.offsetHeight;

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('fade-out');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';

        // Get form data directly without transforming field names
        const formData = {
            name: this.querySelector('#name').value.trim(),
            email: this.querySelector('#email').value.trim(),
            subject: this.querySelector('#subject').value.trim(),
            message: this.querySelector('#message').value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('error', 'Please fill in all fields');
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            return;
        }

        // Send email using EmailJS with the original service and template IDs
        // but passing form data directly without transforming field names
        emailjs.send('service_gtkvcm3', 'template_ofs3ghd', formData)
            .then(() => {
                showNotification('success', 'Message sent successfully!');
                this.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                showNotification('error', 'Failed to send message. Please try again or contact us directly.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
            });
    });
}); 