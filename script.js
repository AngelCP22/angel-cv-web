document.addEventListener('DOMContentLoaded', () => {
    // Terminal Animation
    const commands = [
        'show ip interface brief',
        'show vlan brief',
        'show spanning-tree summary',
        'show wireless client summary',
        'configure terminal',
        'interface vlan 10',
        'ip address 192.168.10.1 255.255.255.0',
        'no shutdown',
        'exit',
        'write memory'
    ];
    
    const terminal = document.getElementById('terminal-output');
    let cmdIndex = 0;
    
    function typeCommand() {
        if (cmdIndex < commands.length) {
            let currentCmd = commands[cmdIndex];
            let charIndex = 0;
            terminal.textContent = 'Switch# ';
            
            function typeChar() {
                if (charIndex < currentCmd.length) {
                    terminal.textContent += currentCmd[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    terminal.textContent += '\n';
                    cmdIndex++;
                    setTimeout(typeCommand, 800);
                }
            }
            typeChar();
        } else {
            setTimeout(() => {
                terminal.textContent = '';
                cmdIndex = 0;
                setTimeout(typeCommand, 1200);
            }, 2000);
        }
    }
    
    typeCommand();

    // Typewriter Effect
    const typewriterText = "Especialista en Infraestructura de Redes & Ciberseguridad";
    const typewriterElement = document.querySelector('.typewriter');
    let i = 0;
    
    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.textContent = typewriterText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    
    setTimeout(typeWriter, 1000);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.dataset.width;
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 300);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // MODIFICADO: Contact Form to WhatsApp
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Construir mensaje para WhatsApp
        const whatsappMessage = `*Nuevo mensaje desde tu CV Web*%0A%0A*Nombre:* ${nombre}%0A*Email:* ${email}%0A*Asunto:* ${asunto}%0A*Mensaje:*%0A${mensaje}`;
        
        // Número de WhatsApp (reemplaza si es diferente)
        const phoneNumber = '51924449893';
        
        // Abrir WhatsApp con el mensaje predefinido
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Limpiar formulario
        contactForm.reset();
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
