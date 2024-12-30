class ContactForm {

    

    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.btnText = this.submitBtn.querySelector('.btn-text');
        this.btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        this.init();
    }

    init() {
        if (!window.emailjs) {
            console.error('EmailJS is not loaded');
            return;
        }
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);

        // Get form data
        const formData = {
            name: this.form.name.value,
            email: this.form.email.value,
            subject: this.form.subject.value,
            message: this.form.message.value
        };

        try {
            if (!window.emailjs) {
                throw new Error('EmailJS is not loaded');
            }
            emailjs.init("1nQgt8wdX2oWi5sul"); // Replace with your EmailJS public key

            // Send email using EmailJS
            const response = await emailjs.send(
                'service_gtkvcm3',
                'template_ofs3ghd',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: 'Vinkand Technologies' // Add recipient name
                }
            );

            if (response.status === 200) {
                this.showNotification('Message sent successfully!', 'success');
                this.form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            this.showNotification(
                'Failed to send message. Please try again or contact us directly.',
                'error'
            );
        } finally {
            // Hide loading state
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        if (this.submitBtn) {
            this.submitBtn.disabled = isLoading;
            this.btnText.style.display = isLoading ? 'none' : 'block';
            this.btnLoading.style.display = isLoading ? 'block' : 'none';
        }
    }

    showNotification(message, type) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

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
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 