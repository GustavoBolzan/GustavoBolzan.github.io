// Smooth scroll para links da navegação
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight do menu ativo ao rolar a página
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animação das barras de progresso quando visíveis
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const habilidadesSection = document.querySelector('#habilidades');
if (habilidadesSection) {
    progressObserver.observe(habilidadesSection);
}

// Animação de fade-in para os cards
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

// Observar cards de projetos e habilidades
document.querySelectorAll('.projeto-card, .habilidade-card, .contato-card, .formacao-item').forEach(card => {
    fadeObserver.observe(card);
});

// Adicionar efeito de digitação ao título (opcional)
const headerTitle = document.querySelector('header h1');
if (headerTitle) {
    const text = headerTitle.textContent;
    headerTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            headerTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Descomentar linha abaixo para ativar efeito de digitação
    // typeWriter();
}

// Botão de voltar ao topo (scroll to top)
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.classList.add('scroll-top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #38bdf8, #22d3ee);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

createScrollTopButton();

// Prevenir links quebrados de abrir
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Este link ainda não foi configurado. Por favor, adicione seu link real do GitHub/LinkedIn!');
    });
});

// Console log de boas-vindas
console.log('%c Olá! 👋', 'color: #38bdf8; font-size: 24px; font-weight: bold;');
console.log('%c Bem-vindo ao meu portfólio!', 'color: #22d3ee; font-size: 16px;');
console.log('%c Desenvolvido por Gustavo Bolzan Bitencourt', 'color: #94a3b8; font-size: 12px;');