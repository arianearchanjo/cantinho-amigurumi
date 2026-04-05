/**
 * CANTINHO DO AMIGURUMI — main.js
 * Consolidated and refactored scripts for professional organization.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initProcessSteps();
    initMarquee();
    initCategoryFilters();
    initHeroParallax();
    initProductCards();
    initGallery();
    initScrollProgress();
    initWhatsAppTooltip();
    initDepoimentos();
    initBranding();
});

/**
 * Navbar shadow on scroll
 */
function initNavbar() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('shadow', window.scrollY > 40);
    }, { passive: true });
}

/**
 * Mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => {
            const open = navMobile.classList.toggle('open');
            menuToggle.classList.toggle('open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        navMobile.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navMobile.classList.remove('open');
                menuToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const href = a.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/**
 * Reveal elements on scroll using Intersection Observer
 */
function initScrollReveal() {
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.in-view)')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('in-view'), idx * 80);
            revealObs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

/**
 * Staggered animation for process steps
 */
function initProcessSteps() {
    const stepSection = document.querySelector('.processo-steps');
    if (!stepSection) return;

    const steps = document.querySelectorAll('.processo-step');
    steps.forEach(s => {
        s.style.opacity = '0';
        s.style.transform = 'translateY(24px)';
        s.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background var(--ease), box-shadow var(--ease)';
    });

    const stepObs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        steps.forEach((step, i) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, i * 150);
        });
        stepObs.disconnect();
    }, { threshold: 0.2 });

    stepObs.observe(stepSection);
}

/**
 * Pause marquee animation on hover
 */
function initMarquee() {
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }
}

/**
 * Category filter buttons behavior
 */
function initCategoryFilters() {
    // Standard category items (e.g., in products grid navigation)
    const pcatBtns = document.querySelectorAll('.pcat-btn');
    if (pcatBtns.length) {
        pcatBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Only for internal anchors
                if (this.getAttribute('href').startsWith('#')) {
                    pcatBtns.forEach(b => b.classList.remove('pcat-active'));
                    this.classList.add('pcat-active');
                }
            });
        });
    }

    // Standard category items (general)
    document.querySelectorAll('.cat-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Gallery specific filters
    const filterBtns = document.querySelectorAll('.gal-filter-btn');
    const bricks = document.querySelectorAll('.gal-brick');

    if (filterBtns.length && bricks.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                bricks.forEach(brick => {
                    const match = filter === 'todos' || brick.dataset.cat === filter;
                    brick.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    if (match) {
                        brick.style.display = 'block';
                        setTimeout(() => {
                            brick.style.opacity = '1';
                            brick.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        brick.style.opacity = '0';
                        brick.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            if (!match) brick.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Subtle parallax effect for hero images
 */
function initHeroParallax() {
    const heroImg = document.querySelector('.hero-img-frame');
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroImg.style.transform = `translateY(${scrollY * 0.04}px)`;
        }, { passive: true });
    }
}

/**
 * Product cards hover effects and grid stagger
 */
function initProductCards() {
    // Subtle lift on hover
    document.querySelectorAll('.prod-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const swatch = this.querySelector('.prod-char');
            if (swatch) swatch.style.animationPlayState = 'running';
        });
    });

    // Grid stagger entry
    const prodGrid = document.querySelector('.products-atelier-grid');
    if (prodGrid) {
        const gridObs = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;
            document.querySelectorAll('.prod-card').forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, background var(--ease)`;
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            });
            gridObs.disconnect();
        }, { threshold: 0.05 });
        gridObs.observe(prodGrid);
    }
}

/**
 * Gallery lightbox and item interactions
 */
function initGallery() {
    // Standard gallery items (Instagram link)
    document.querySelectorAll('.gal-item').forEach(item => {
        item.addEventListener('click', () => {
            window.open('https://www.instagram.com/cantinhodoamigurumi.atelie/', '_blank');
        });
    });

    // Masonry gallery with lightbox
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCap = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const bricks = document.querySelectorAll('.gal-brick');

    let currentIdx = 0;
    const getVisibleBricks = () => [...bricks].filter(b => b.style.display !== 'none');

    function openLightbox(idx) {
        const items = getVisibleBricks();
        if (!items[idx]) return;
        currentIdx = idx;
        const brick = items[idx];
        lightboxImg.src = brick.dataset.src || brick.querySelector('img').src;
        lightboxImg.alt = brick.dataset.label || '';
        lightboxCap.textContent = brick.dataset.label || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    bricks.forEach((brick) => {
        brick.addEventListener('click', () => {
            const visible = getVisibleBricks();
            const vIdx = visible.indexOf(brick);
            openLightbox(vIdx !== -1 ? vIdx : 0);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            const items = getVisibleBricks();
            openLightbox((currentIdx - 1 + items.length) % items.length);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            const items = getVisibleBricks();
            openLightbox((currentIdx + 1) % items.length);
        });
    }

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
}

/**
 * Scroll progress bar at the top of the page
 */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    bar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
        background: linear-gradient(90deg, #D4A99A, #9AB5A0);
        width: 0%; transition: width 0.1s linear; pointer-events: none;
    `;
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/**
 * WhatsApp floating button tooltip
 */
function initWhatsAppTooltip() {
    const waFloat = document.querySelector('.wa-float');
    if (waFloat) {
        const tip = document.createElement('span');
        tip.textContent = 'Encomendar';
        tip.style.cssText = `
            position: absolute; right: 64px; top: 50%; transform: translateY(-50%) translateX(6px);
            background: #1a1a1a; color: #fff; font-family: 'DM Sans', sans-serif;
            font-size: 0.72rem; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase;
            padding: 5px 12px; border-radius: 3px; white-space: nowrap;
            opacity: 0; pointer-events: none; transition: all 0.25s ease;
        `;
        waFloat.style.position = 'fixed';
        waFloat.appendChild(tip);

        waFloat.addEventListener('mouseenter', () => {
            tip.style.opacity = '1';
            tip.style.transform = 'translateY(-50%) translateX(0)';
        });
        waFloat.addEventListener('mouseleave', () => {
            tip.style.opacity = '0';
            tip.style.transform = 'translateY(-50%) translateX(6px)';
        });
    }
}

/**
 * Staggered entry for testimonials
 */
function initDepoimentos() {
    const depGrid = document.querySelector('.dep-grid');
    if (!depGrid) return;

    const cards = document.querySelectorAll('.dep-card');
    cards.forEach(c => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(20px)';
    });

    const depObs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background var(--ease)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 100);
        });
        depObs.disconnect();
    }, { threshold: 0.1 });

    depObs.observe(depGrid);
}

/**
 * Console branding for developers
 */
function initBranding() {
    console.log('%c Cantinho do Amigurumi ', 'background:#8B6252;color:#F5EDE3;font-family:serif;font-size:14px;padding:4px 8px;border-radius:2px;');
    console.log('%cAteliê artesanal · Campina Grande do Sul, PR', 'color:#B8897A;font-size:11px;');
}
