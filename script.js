document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Service Tabs Switching
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const searchInput = document.getElementById('serviceSearchInput');
  const searchClear = document.getElementById('serviceSearchClear');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      button.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // If user switches tab, clear or re-apply search within the tab
      if (searchInput && searchInput.value.trim() !== '') {
        filterServices(searchInput.value.trim().toLowerCase());
      }
    });
  });

  // ==========================================================================
  // 2. Real-Time Service Search
  // ==========================================================================
  function filterServices(query) {
    const allServiceRows = document.querySelectorAll('.service-row');
    
    if (!query) {
      allServiceRows.forEach(row => row.classList.remove('hidden'));
      if (searchClear) searchClear.style.display = 'none';
      return;
    }

    if (searchClear) searchClear.style.display = 'block';

    let foundInActiveTab = false;
    allServiceRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        row.classList.remove('hidden');
        // If row is in an inactive tab, we can also check if we should show parent tab
      } else {
        row.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterServices(e.target.value.trim().toLowerCase());
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        filterServices('');
        searchInput.focus();
      }
    });
  }

  // ==========================================================================
  // 3. Gallery Category Filters
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 4. Lightbox Modal for Gallery
  // ==========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  const openLightbox = (imgSrc, captionText) => {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imgSrc;
      if (lightboxCaption) lightboxCaption.textContent = captionText || '';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.getAttribute('data-img');
      const caption = card.getAttribute('data-caption');
      openLightbox(img, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // ==========================================================================
  // 5. FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================================================
  // 6. Mobile Navigation
  // ==========================================================================
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    mainNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // 7. Booking Modal
  // ==========================================================================
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  const openBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.open-booking-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeBookingModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeBookingModal);

  // ==========================================================================
  // 8. Global Escape Key Listener
  // ==========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeBookingModal();
      if (mainNav) mainNav.classList.remove('active');
    }
  });

  console.log('Сайт "Моя красивая" полностью загружен и готов.');
});
