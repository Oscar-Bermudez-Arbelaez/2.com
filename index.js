/**
 * Servicios Multifrios - JavaScript
 * Autor: Servicios Multifrios
 * Fecha: 2025
 */

// Esperar a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const serviceForm = document.getElementById('serviceForm');
    const mobileMenuBtn = document.createElement('button');
    
    // Inicializar todas las funciones
    initFormValidation();
    initScrollAnimation();
    initMobileMenu();
    initServiceCardInteraction();
    initWhatsAppContact();
    
    /**
     * Validación del formulario de contacto
     */
    function initFormValidation() {
        if (!serviceForm) return;
        
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener todos los campos del formulario
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const service = document.getElementById('service');
            const message = document.getElementById('message');
            
            // Validar campos
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Por favor ingrese su nombre');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Por favor ingrese su correo electrónico');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor ingrese un correo electrónico válido');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (!phone.value.trim()) {
                showError(phone, 'Por favor ingrese su teléfono');
                isValid = false;
            } else {
                removeError(phone);
            }
            
            if (!service.value) {
                showError(service, 'Por favor seleccione un servicio');
                isValid = false;
            } else {
                removeError(service);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Por favor ingrese su mensaje');
                isValid = false;
            } else {
                removeError(message);
            }
            
            // Si el formulario es válido, enviar los datos (simulado)
            if (isValid) {
                // Aquí iría la lógica para enviar los datos a un servidor
                // Por ahora, solo mostraremos un mensaje de éxito
                showSuccessMessage();
                serviceForm.reset();
            }
        });
    }
    
    /**
     * Función para validar el formato de email
     */
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    /**
     * Muestra mensaje de error debajo del campo
     */
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
    }
    
    /**
     * Elimina el mensaje de error
     */
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        input.style.borderColor = '';
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
    }
    
    /**
     * Muestra mensaje de éxito
     */
    function showSuccessMessage() {
        // Crear elemento para mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '¡Gracias por contactarnos! En breve nos comunicaremos contigo.';
        successMessage.style.backgroundColor = '#27ae60';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        
        // Insertar mensaje antes del botón de enviar
        const submitButton = serviceForm.querySelector('button[type="submit"]');
        serviceForm.insertBefore(successMessage, submitButton);
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            serviceForm.removeChild(successMessage);
        }, 5000);
    }
    
    /**
     * Animaciones al hacer scroll
     */
    function initScrollAnimation() {
        // Obtener todos los elementos que queremos animar
        const elementsToAnimate = document.querySelectorAll('.service-card, .about-content, .contact-form, .whatsapp-contact');
        
        // Función para verificar si un elemento es visible
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Función para animar elementos visibles
        function animateOnScroll() {
            elementsToAnimate.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    
                    // Usar setTimeout para crear un efecto escalonado
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }
        
        // Ejecutar animación al cargar la página
        animateOnScroll();
        
        // Ejecutar animación al hacer scroll
        window.addEventListener('scroll', animateOnScroll);
    }
    
    /**
     * Menú móvil para pantallas pequeñas
     */
    function initMobileMenu() {
        // Crear botón de menú móvil
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.position = 'fixed';
        mobileMenuBtn.style.top = '20px';
        mobileMenuBtn.style.right = '20px';
        mobileMenuBtn.style.zIndex = '1000';
        mobileMenuBtn.style.background = 'var(--primary-color)';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.borderRadius = '5px';
        mobileMenuBtn.style.padding = '10px';
        mobileMenuBtn.style.cursor = 'pointer';
        
        // Estilo para las líneas del botón hamburguesa
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.display = 'block';
            span.style.width = '25px';
            span.style.height = '3px';
            span.style.marginBottom = '5px';
            span.style.background = 'white';
            span.style.transition = 'all 0.3s ease';
        });
        
        // Agregar botón al body
        document.body.appendChild(mobileMenuBtn);
        
        // Mostrar/ocultar botón según el ancho de la pantalla
        function toggleMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
            }
        }
        
        // Verificar tamaño de pantalla al cargar y al redimensionar
        toggleMobileMenu();
        window.addEventListener('resize', toggleMobileMenu);
        
        // Funcionalidad del botón (en esta versión simplemente lleva al inicio)
        mobileMenuBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /**
     * Interacción mejorada con las tarjetas de servicio
     */
    function initServiceCardInteraction() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Añadir sombra más pronunciada al pasar el cursor
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            
            // Restaurar estado original al quitar el cursor
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            });
            
            // Agregar efecto de clic
            card.addEventListener('click', function() {
                // Seleccionar automáticamente este servicio en el formulario
                const serviceName = this.querySelector('h3').textContent;
                const serviceSelect = document.getElementById('service');
                
                if (serviceSelect) {
                    // Mapear el título del servicio al valor del select
                    const serviceMap = {
                        'Mantenimiento Preventivo': 'preventivo',
                        'Mantenimiento Correctivo': 'correctivo',
                        'Consultoría': 'consultoria',
                        'Instalación de Equipos Industriales': 'instalacion'
                    };
                    
                    if (serviceMap[serviceName]) {
                        serviceSelect.value = serviceMap[serviceName];
                    }
                    
                    // Desplazar a la sección de contacto
                    document.getElementById('contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Mejorar interacción con el código QR de WhatsApp
     */
    function initWhatsAppContact() {
        const qrCode = document.querySelector('.qr-code');
        
        if (qrCode) {
            // Añadir efecto de zoom al pasar el cursor
            qrCode.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.25)';
            });
            
            // Restaurar estado original al quitar el cursor
            qrCode.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
            });
        }
    }
    
    /**
     * Botones de navegación suave a las secciones
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /**
     * Contador de clientes satisfechos (simulado)
     * Se añadirá dinámicamente al HTML
     */
    function initCustomerCounter() {
        // Crear sección para el contador
        const counterSection = document.createElement('section');
        counterSection.className = 'counter-section';
        counterSection.style.backgroundColor = 'var(--primary-color)';
        counterSection.style.color = 'white';
        counterSection.style.padding = '3rem 0';
        counterSection.style.textAlign = 'center';
        
        // Crear contenedor
        const container = document.createElement('div');
        container.className = 'container';
        
        // Crear título
        const title = document.createElement('h2');
        title.textContent = 'Nuestros Números';
        title.style.marginBottom = '2rem';
        
        // Crear contenedor de estadísticas
        const statsContainer = document.createElement('div');
        statsContainer.style.display = 'flex';
        statsContainer.style.justifyContent = 'space-around';
        statsContainer.style.flexWrap = 'wrap';
        
        // Datos estadísticos
        const stats = [
            { number: '500+', text: 'Clientes Satisfechos' },
            { number: '10', text: 'Años de Experiencia' },
            { number: '1000+', text: 'Proyectos Completados' }
        ];
        
        // Crear cada estadística
        stats.forEach(stat => {
            const statDiv = document.createElement('div');
            statDiv.className = 'stat-item';
            statDiv.style.margin = '1rem';
            
            const number = document.createElement('div');
            number.className = 'stat-number';
            number.textContent = stat.number;
            number.style.fontSize = '3rem';
            number.style.fontWeight = 'bold';
            
            const text = document.createElement('div');
            text.className = 'stat-text';
            text.textContent = stat.text;
            text.style.fontSize = '1.2rem';
            
            statDiv.appendChild(number);
            statDiv.appendChild(text);
            statsContainer.appendChild(statDiv);
        });
        
        // Ensamblar sección
        container.appendChild(title);
        container.appendChild(statsContainer);
        counterSection.appendChild(container);
        
        // Insertar antes de la sección de contacto
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            document.body.insertBefore(counterSection, contactSection);
        }
    }
    
    // Iniciar contador después de un pequeño retraso
    setTimeout(initCustomerCounter, 500);
});