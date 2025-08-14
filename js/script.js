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
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        // Adiciona o botão ao header
        const headerContent = document.querySelector('.header-content');
        headerContent.appendChild(mobileMenuBtn);
        
        // Funcionalidade do menu mobile
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            this.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Fecha menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }

    // Adiciona estilos CSS para menu mobile via JavaScript
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #ff6b35, #f7931e);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            nav.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            nav ul {
                flex-direction: column;
                padding: 1rem 0;
                gap: 0;
            }
            
            nav li {
                width: 100%;
            }
            
            nav a {
                display: block;
                padding: 1rem 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
        }
    `;
    document.head.appendChild(mobileStyles);

    // Lazy loading para imagens
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Adiciona funcionalidade de busca (se houver campo de busca)
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Adiciona contador de visualizações (simulado)
    const viewCounters = document.querySelectorAll('.view-counter');
    viewCounters.forEach(counter => {
        const count = Math.floor(Math.random() * 1000) + 500;
        counter.textContent = `${count} visualizações`;
    });

    // Adiciona funcionalidade de compartilhamento
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback para navegadores que não suportam Web Share API
                navigator.clipboard.writeText(url).then(() => {
                    alert('Link copiado para a área de transferência!');
                });
            }
        });
    });

    // Adiciona efeito de typing para títulos especiais
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Inicia o efeito quando o elemento fica visível
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        });
        
        typingObserver.observe(element);
    });

    // Adiciona funcionalidade de favoritos (localStorage)
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const productId = btn.dataset.productId;
        const isFavorited = localStorage.getItem(`favorite_${productId}`) === 'true';
        
        if (isFavorited) {
            btn.classList.add('favorited');
            btn.innerHTML = '❤️';
        }
        
        btn.addEventListener('click', function() {
            const isCurrentlyFavorited = this.classList.contains('favorited');
            
            if (isCurrentlyFavorited) {
                this.classList.remove('favorited');
                this.innerHTML = '🤍';
                localStorage.removeItem(`favorite_${productId}`);
            } else {
                this.classList.add('favorited');
                this.innerHTML = '❤️';
                localStorage.setItem(`favorite_${productId}`, 'true');
            }
        });
    });

    // Adiciona tooltip para badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.title || 'Produto destacado';
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                transform: translateX(-50%);
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltip = tooltip;
        });
        
        badge.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                document.body.removeChild(this.tooltip);
                this.tooltip = null;
            }
        });
    });

    // Performance: adiciona loading lazy para elementos pesados
    const heavyElements = document.querySelectorAll('.heavy-content');
    const heavyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                heavyObserver.unobserve(entry.target);
            }
        });
    });
    
    heavyElements.forEach(el => heavyObserver.observe(el));

    console.log('🍳 Cozinha Prática da Melina - Site carregado com sucesso!');
});

