// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Navigation Arrow Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find current page index
    const currentIndex = navLinks.findIndex(link => {
        return link.getAttribute('href') === currentPage;
    });
    
    // Previous and Next buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                window.location.href = navLinks[currentIndex - 1].getAttribute('href');
            } else {
                // If on first page, go to last page
                window.location.href = navLinks[navLinks.length - 1].getAttribute('href');
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < navLinks.length - 1) {
                window.location.href = navLinks[currentIndex + 1].getAttribute('href');
            } else {
                // If on last page, go to first page
                window.location.href = navLinks[0].getAttribute('href');
            }
        });
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.querySelector('input[placeholder="Full Name"]').value;
            const email = document.querySelector('input[placeholder="Email Address"]').value;
            const message = document.querySelector('textarea').value;
            
            if (name && email && message) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! This would normally be sent to a server.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Set active nav item based on current page
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle (optional enhancement)
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Left arrow key
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.querySelector('.prev-btn');
        if (prevBtn) {
            prevBtn.click();
        }
    }
    // Right arrow key
    else if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.click();
        }
    }
});

// 3D Image Hover Effect with Mouse Movement
document.addEventListener('DOMContentLoaded', function() {
    // 为头像容器添加3D效果
    const imageContainer = document.querySelector('.image-container');
    const aboutImageContainer = document.querySelector('.about-image');
    
    // 为两个容器添加相同的3D鼠标移动效果
    function add3DEffect(container) {
        if (container) {
            // 添加鼠标移动事件监听
            container.addEventListener('mousemove', function(e) {
                // 获取容器的尺寸和位置
                const rect = this.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                
                // 计算鼠标相对于容器中心的位置（范围从-1到1）
                const xPosition = (e.clientX - rect.left - width / 2) / width;
                const yPosition = (height / 2 - (e.clientY - rect.top)) / height;
                
                // 最大旋转角度（可调整）
                const maxRotationX = 45; // 绕X轴的最大旋转角度（上下）
                const maxRotationY = 45; // 绕Y轴的最大旋转角度（左右）
                
                // 计算实际旋转角度
                const rotationX = yPosition * maxRotationX;
                const rotationY = xPosition * maxRotationY;
                
                // 应用3D变换
                this.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            // 鼠标离开时重置效果
            container.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
            
            // 鼠标按下时增强效果
            container.addEventListener('mousedown', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(0.95, 0.95, 0.95)';
            });
            
            // 鼠标释放时恢复效果
            container.addEventListener('mouseup', function(e) {
                // 模拟鼠标移动事件，重新应用角度变换
                const mouseEvent = new MouseEvent('mousemove', { clientX: e.clientX, clientY: e.clientY });
                this.dispatchEvent(mouseEvent);
            });
        }
    }
    
    // 应用3D效果到两个容器
    add3DEffect(imageContainer);
    add3DEffect(aboutImageContainer);
});