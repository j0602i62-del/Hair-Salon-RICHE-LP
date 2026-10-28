/**
 * Hair Salon RICHE (表参道)
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Header Scroll Effect
     ========================================================================== */
  const header = document.querySelector('.site-header');
  
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ==========================================================================
     2. Hamburger Menu & Mobile Navigation
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-reserve');

  const toggleMobileNav = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileNav.classList.contains('is-open');
    if (shouldOpen) {
      hamburger.classList.add('is-active');
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      hamburger.classList.remove('is-active');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => toggleMobileNav());

    // Close when clicking mobile nav links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileNav(false);
      });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        toggleMobileNav(false);
      }
    });
  }

  /* ==========================================================================
     3. Scroll Reveal Animation (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     4. Reservation Modal
     ========================================================================== */
  const reserveButtons = document.querySelectorAll('.js-open-reserve');
  const reserveModal = document.querySelector('#reservationModal');
  const modalCloseBtn = document.querySelector('.js-modal-close');
  const reserveForm = document.querySelector('#reservationForm');

  const openReserveModal = (preselectedMenu = '') => {
    if (!reserveModal) return;
    reserveModal.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    // If preselected menu is given, select it
    if (preselectedMenu && reserveForm) {
      const menuSelect = reserveForm.querySelector('#reserveMenu');
      if (menuSelect) {
        menuSelect.value = preselectedMenu;
      }
    }
  };

  const closeReserveModal = () => {
    if (!reserveModal) return;
    reserveModal.classList.remove('is-visible');
    if (!mobileNav || !mobileNav.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
  };

  reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const menuValue = btn.dataset.menu || '';
      openReserveModal(menuValue);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeReserveModal);
  }

  if (reserveModal) {
    // Click outside modal content to close
    reserveModal.addEventListener('click', (e) => {
      if (e.target === reserveModal) {
        closeReserveModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && reserveModal.classList.contains('is-visible')) {
        closeReserveModal();
      }
    });
  }

  // Handle Form Submission (Simulation)
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = reserveForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '送信中...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('【WEB予約の受付】\nご予約のリクエストを受け付けました。\nサロンより確認のメールをお送りいたします。ご来店を心よりお待ちしております。');
        reserveForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeReserveModal();
      }, 700);
    });
  }

  /* ==========================================================================
     5. Image Lightbox for Gallery
     ========================================================================== */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.querySelector('#galleryLightbox');
  const lightboxImg = document.querySelector('#lightboxImage');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close-btn');

  if (galleryCards.length && lightbox && lightboxImg) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.gallery-caption');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'RICHE Gallery';
          if (lightboxCaption) {
            lightboxCaption.textContent = caption ? caption.textContent : '';
          }
          lightbox.classList.add('is-visible');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('is-visible');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-visible')) {
        closeLightbox();
      }
    });
  }

});
