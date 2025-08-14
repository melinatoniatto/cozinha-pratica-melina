// JavaScript para Cozinha Prática da Melina

// Animações de entrada quando elementos ficam visíveis
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animação fade-in aos elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observa todos os cards de produtos e seções de conteúdo
    const elementsToAnimate = document.querySelectorAll('.product-card, .content-section, .benefit-item');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adiciona efeito hover nos cards de produtos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Menu mobile responsivo
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Cria botão de menu mobile se não existir
