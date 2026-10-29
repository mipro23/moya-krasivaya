document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Catalog Category Filter
  // ==========================================================================
  const catButtons = document.querySelectorAll('.cat-tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('catalogSearchInput');
  const searchClear = document.getElementById('catalogSearchClear');

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      filterProducts(filter, searchInput ? searchInput.value.trim().toLowerCase() : '');
    });
  });

  // ==========================================================================
  // 2. Real-Time Catalog Search
  // ==========================================================================
  function filterProducts(categoryFilter, query) {
    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesCat = (categoryFilter === 'all' || cardCat === categoryFilter);
      const matchesQuery = (!query || text.includes(query));

      if (matchesCat && matchesQuery) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    if (searchClear) {
      searchClear.style.display = query ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.cat-tab-btn.active');
      const activeCat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      filterProducts(activeCat, e.target.value.trim().toLowerCase());
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        const activeBtn = document.querySelector('.cat-tab-btn.active');
        const activeCat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        filterProducts(activeCat, '');
        searchInput.focus();
      }
    });
  }

  // ==========================================================================
  // 3. FAQ Accordion
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================================================
  // 4. Mobile Burger Navigation
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
  // 5. Order Modal with Dynamic WhatsApp / Telegram Links
  // ==========================================================================
  const orderModal = document.getElementById('orderModal');
  const orderModalClose = document.getElementById('orderModalClose');
  const orderModalOverlay = document.getElementById('orderModalOverlay');
  const orderModalSubtitle = document.getElementById('orderModalSubtitle');
  const waOrderLink = document.getElementById('waOrderLink');

  const openOrderModal = (itemName) => {
    if (orderModal) {
      if (itemName) {
        orderModalSubtitle.textContent = 'Выбран товар: ' + itemName;
        const msg = encodeURIComponent('Здравствуйте! Хочу заказать в BLOOM: ' + itemName + '. Подскажите по наличию и доставке?');
        if (waOrderLink) {
          waOrderLink.href = 'https://wa.me/79260470047?text=' + msg;
        }
      } else {
        orderModalSubtitle.textContent = 'Выберите удобный способ связи с дежурным флористом';
        if (waOrderLink) {
          waOrderLink.href = 'https://wa.me/79260470047?text=' + encodeURIComponent('Здравствуйте! Хочу проконсультироваться и заказать цветы в BLOOM.');
        }
      }
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeOrderModal = () => {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.open-order-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openOrderModal();
    });
  });

  document.querySelectorAll('.order-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute('data-item');
      openOrderModal(itemName);
    });
  });

  if (orderModalClose) orderModalClose.addEventListener('click', closeOrderModal);
  if (orderModalOverlay) orderModalOverlay.addEventListener('click', closeOrderModal);

  // ==========================================================================
  // 6. Escape Key
  // ==========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrderModal();
      if (mainNav) mainNav.classList.remove('active');
    }
  });

  console.log('Сайт цветочной мастерской BLOOM успешно инициализирован.');
});
