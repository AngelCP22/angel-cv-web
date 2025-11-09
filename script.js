// Smooth Scroll y Animaciones
document.addEventListener('DOMContentLoaded', () => {
    // Código de animación para el hero
    const codeLines = [
        'interface GigabitEthernet0/1',
        '  description Conexion a VLAN 10',
        '  switchport mode access',
        '  switchport access vlan 10',
        '  spanning-tree portfast',
        '  no shutdown',
        '!',
        'ip route 0.0.0.0 0.0.0.0 192.168.1.1',
        '!',
        'show ip interface brief',
        'show vlan brief'
    ];
    
    let codeDisplay = document.getElementById('code-display');
    let lineIndex = 0;
    
    function typeCode() {
        if (lineIndex < codeLines.length) {
            let currentLine = codeLines[lineIndex];
            let charIndex = 0;
            
            function typeChar() {
                if (charIndex < currentLine.length) {
                    codeDisplay.textContent += currentLine[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    codeDisplay.textContent += '\n';
                    lineIndex++;
                    setTimeout(typeCode, 500);
                }
            }
            typeChar();
        } else {
            setTimeout(() => {
                codeDisplay.textContent = '';
                lineIndex = 0;
                setTimeout(typeCode, 1000);
            }, 2000);
        }
    }
    
    typeCode();

    // Typewriter effect para el título
    const typewriterText = "Hola, soy Angel Cuchillo";
    const typewriterElement = document.querySelector('.typewriter');
    let i = 0;
    
    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.textContent = typewriterText.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar barras de habilidades
                if (entry.target.classList.contains('skill-category')) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach(bar => {
                        const percent = bar.dataset.skill;
                        const progressBar = bar.querySelector('.bar-progress');
                        setTimeout(() => {
                            progressBar.style.width = percent + '%';
                        }, 300);
                    });
                }
                
                // Animar números estadísticos
                if (entry.target.classList.contains('about-stats')) {
                    const stats = entry.target.querySelectorAll('.number');
                    stats.forEach(stat => {
                        const target = parseInt(stat.dataset.count);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target + (target === 500 ? '+' : '') + (target === 95 ? '%' : '');
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current) + (target === 500 ? '+' : '') + (target === 95 ? '%' : '');
                            }
                        }, 20);
                    });
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Menú móvil
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Modo oscuro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Me contactaré contigo pronto.');
        contactForm.reset();
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});
