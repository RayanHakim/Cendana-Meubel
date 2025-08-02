// ===== MOBILE NAVIGATION TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===== WHATSAPP FUNCTIONS =====
// Nomor WhatsApp toko (ganti dengan nomor yang sesuai)
const whatsappNumber = '62895375718172'; // Format: 62 + nomor tanpa 0 di depan

function contactWhatsApp(productName) {
    let message = '';
    
    if (productName === 'Informasi Umum') {
        message = 'Halo, saya ingin mendapatkan informasi lebih lanjut tentang produk-produk Cendana Meubel.';
    } else if (productName === 'Halo, saya tertarik dengan produk Anda') {
        message = productName;
    } else {
        message = `Halo, saya tertarik dengan produk "${productName}". Bisakah Anda memberikan informasi lebih detail mengenai harga, ketersediaan, dan spesifikasinya?`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// ===== FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data form
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Validasi form
            if (!name || !email || !phone || !message) {
                alert('Mohon lengkapi semua field yang diperlukan!');
                return;
            }
            
            // Buat pesan WhatsApp dari form
            const whatsappMessage = `*Pesan dari Website Cendana Meubel*
            
Nama: ${name}
Email: ${email}
Telepon: ${phone}

Pesan:
${message}

---
Dikirim dari form kontak website`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Buka WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Tampilkan pesan sukses
            showNotification('Terima kasih! Pesan Anda akan diteruskan ke WhatsApp.', 'success');
        });
    }
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Hapus notifikasi yang ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Style untuk konten notifikasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    
    // Tambahkan style ke head jika belum ada
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Event listener untuk tombol close
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('.product-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state untuk animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger animation on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    // Trigger animation on load
    handleScrollAnimation();
});

// ===== PRODUCT CARD HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== LAZY LOADING SIMULATION =====
document.addEventListener('DOMContentLoaded', function() {
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    
    // Simulasi loading dengan delay
    placeholderImages.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.style.opacity = '0.7';
            placeholder.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                placeholder.style.opacity = '1';
                placeholder.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', function(e) {
    // ESC key untuk menutup mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ===== WHATSAPP FLOATING BUTTON ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Animasi bounce setiap 5 detik
        setInterval(() => {
            whatsappFloat.style.animation = 'none';
            setTimeout(() => {
                whatsappFloat.style.animation = 'bounce 0.6s ease';
            }, 10);
        }, 5000);
        
        // Tambahkan keyframe untuk bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 60%, 100% {
                    transform: translateY(0) scale(1);
                }
                40% {
                    transform: translateY(-10px) scale(1.1);
                }
                80% {
                    transform: translateY(-5px) scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Terjadi error:', e.error);
});

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisasi scroll event dengan debounce
const optimizedScrollHandler = debounce(handleScrollAnimation, 100);
window.removeEventListener('scroll', handleScrollAnimation);
window.addEventListener('scroll', optimizedScrollHandler);