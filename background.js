document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Orb class
    class Orb {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 300 + 200; // Large orbs
            this.speedX = (Math.random() - 0.5) * 0.2; // Very slow movement
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = 0.15; // Subtle opacity
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen with smooth transition
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }

        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );

            // Calculate color based on position
            const hue = (this.x / canvas.width) * 30 + 220; // Range from 220 to 250 (blue spectrum)
            const saturation = 80; // High saturation for vibrant colors
            const lightness = 50; // Medium lightness

            gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create orbs
    const orbs = [];
    const orbCount = 4; // Just a few large orbs

    for (let i = 0; i < orbCount; i++) {
        orbs.push(new Orb());
    }

    // Animation function
    function animate() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw orbs
        orbs.forEach(orb => {
            orb.update();
            orb.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});