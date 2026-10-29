document.addEventListener('DOMContentLoaded', () => {
  // --- Service Tabs ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

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
    });
  });

  // --- Mobile Navigation ---
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking link
    mainNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // --- Booking Modal ---
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-btn');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  const openModal = () => {
    if (bookingModal) bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (bookingModal) bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
      closeModal();
    }
  });

  console.log('Сайт "Моя красивая" успешно инициализирован.');
});
