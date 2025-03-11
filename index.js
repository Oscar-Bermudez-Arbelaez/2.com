document.addEventListener('DOMContentLoaded', () => {
    // Navegación para móviles
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    }

    // Scroll suave para los enlaces de navegación
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                const nav = document.querySelector('.nav-links');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    document.querySelector('.burger').classList.remove('toggle');
                }
            });
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por su mensaje! Nos pondremos en contacto a la brevedad.');
            contactForm.reset();
        });
    }

    // Generar código QR para WhatsApp
    const generateQRCode = () => {
        const qrCodeDiv = document.getElementById('qrcode');
        if (qrCodeDiv) {
            try {
                const whatsappNumber = "+584247614640";
                const whatsappURL = `https://wa.me/${whatsappNumber}`;

                if (typeof QRCode !== 'undefined') {
                    new QRCode(qrCodeDiv, {
                        text: whatsappURL,
                        width: 180,
                        height: 180,
                        colorDark: "#0056b3",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } else {
                    console.error('La librería QRCode.js no está cargada.');
                    qrCodeDiv.innerHTML = '<p>Error: La librería QRCode.js no está cargada.</p>';
                }
            } catch (error) {
                console.error('Error al generar el código QR:', error);
                qrCodeDiv.innerHTML = '<p>Error al generar el código QR.</p>';
            }
        }
    }

    // Inicializar
    navSlide();
    smoothScroll();
    generateQRCode();
});