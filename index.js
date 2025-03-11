document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa para navegación móvil
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

    // Generar código QR para WhatsApp
    const qrCodeDiv = document.getElementById('qrcode');
    const phoneNumber = '+584247614640'; // Reemplaza con tu número de WhatsApp

    if (qrCodeDiv) {
        const qr = new QRCode(qrCodeDiv, {
            text: `https://wa.me/${phoneNumber}`,
            width: 128,
            height: 128
        });
    }

    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Aquí puedes agregar la lógica para enviar el formulario, por ejemplo, usando Fetch API o enviando los datos a un servidor.
            console.log('Formulario enviado:', { name, email, phone, service, message });

            // Puedes agregar aquí un mensaje de confirmación para el usuario.
            alert('¡Mensaje enviado con éxito!');
            contactForm.reset();
        });
    }
});