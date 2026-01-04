(function() {
  'use strict';

  const menuBreakpoint = 256 + 768 * 1.3;
  let scrollPosition = 0;

  function toggleMenu(forceState) {
    const menuControl = document.getElementById('menu-control');
    const menuPanel = document.querySelector('.site-menu');
    const floatingToggle = document.querySelector('.menu-display-button');

    if (!menuControl || !menuPanel) {
      return;
    }

    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > menuBreakpoint) {
      // Desktop: toggle class on menu panel
      if (forceState !== undefined) {
        if (forceState) {
          // Opening menu: hide button immediately
          if (floatingToggle) floatingToggle.style.display = 'none';
          menuPanel.classList.remove('menu-hidden');
        } else {
          // Closing menu: wait for transition to complete
          menuPanel.classList.add('menu-hidden');
          if (floatingToggle) {
            // Wait for CSS transition (0.3s)
            setTimeout(() => {
              floatingToggle.style.display = 'block';
            }, 300);
          }
        }
      } else {
        const isHiding = !menuPanel.classList.contains('menu-hidden');
        menuPanel.classList.toggle('menu-hidden');
        if (floatingToggle) {
          if (isHiding) {
            // Closing: delay button appearance
            setTimeout(() => {
              floatingToggle.style.display = 'block';
            }, 300);
          } else {
            // Opening: hide button immediately
            floatingToggle.style.display = 'none';
          }
        }
      }
    } else {
      // Mobile: use checkbox
      if (forceState !== undefined) {
        menuControl.checked = forceState;
      } else {
        menuControl.checked = !menuControl.checked;
      }
    }

    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  }

  // Initialize on DOM ready
  function init() {
    // Create desktop menu toggle button (inside menu)
    const menuContent = document.querySelector('.site-menu .menu-content');
    if (menuContent) {
      const menuToggleBtn = document.createElement('button');
      menuToggleBtn.className = 'menu-toggle-button';
      menuToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuToggleBtn.setAttribute('aria-label', '{{ i18n "Toggle Menu" | default "Toggle Menu" }}');
      menuToggleBtn.setAttribute('title', '{{ i18n "Toggle Menu" | default "Toggle Menu" }}');
      menuToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
      });
      menuContent.insertBefore(menuToggleBtn, menuContent.firstChild);
    }

    // Create menu display button (outside menu, for when collapsed)
    const menuPanel = document.querySelector('.site-menu');
    if (menuPanel) {
      const menuDisplayBtn = document.createElement('button');
      menuDisplayBtn.className = 'menu-display-button';
      menuDisplayBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuDisplayBtn.setAttribute('aria-label', '{{ i18n "Open Menu" | default "Open Menu" }}');
      menuDisplayBtn.setAttribute('title', '{{ i18n "Open Menu" | default "Open Menu" }}');
      menuDisplayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(true); // Force open
      });
      document.body.appendChild(menuDisplayBtn);

      // Initial state: hide if menu is visible
      if (!menuPanel.classList.contains('menu-hidden')) {
        menuDisplayBtn.style.display = 'none';
      }
    }

    // Handle mobile menu icon clicks with scroll preservation
    const menuLabel = document.querySelector('label[for="menu-control"]');
    if (menuLabel) {
      menuLabel.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
      });
    }

    // Handle menu overlay clicks - using event delegation
    document.addEventListener('click', (e) => {
      const menuControl = document.getElementById('menu-control');
      const menuPanel = document.querySelector('.site-menu');
      const isDesktop = window.innerWidth > menuBreakpoint;

      const isMenuOpen = isDesktop 
        ? (menuPanel && !menuPanel.classList.contains('menu-hidden'))
        : (menuControl && menuControl.checked);

      if (!isMenuOpen) {
        return;
      }

      const isClickInsideMenu = menuPanel && menuPanel.contains(e.target);
      const isMenuToggleBtn = e.target.closest('.menu-toggle-button, .menu-display-button, label[for="menu-control"]');

      // Only close on outside click in mobile mode
      if (!isClickInsideMenu && !isMenuToggleBtn && !isDesktop) {
        toggleMenu(false);
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      const isDesktop = window.innerWidth > menuBreakpoint;

      if (!isDesktop && (e.key === 'Escape')) {
        const menuControl = document.getElementById('menu-control');
        const isMenuOpen = menuControl && menuControl.checked;

        if (isMenuOpen) {
          toggleMenu(false);
        }
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const menuControl = document.getElementById('menu-control');
        const menuPanel = document.querySelector('.site-menu');
        const floatingToggle = document.querySelector('.menu-display-button');

        if (window.innerWidth > menuBreakpoint) {
          // Desktop: reset states
          if (menuControl) menuControl.checked = false;
          if (menuPanel) menuPanel.classList.remove('menu-hidden');
          if (floatingToggle) floatingToggle.style.display = 'none';
        } else {
          // Mobile: remove desktop class
          if (menuPanel) menuPanel.classList.remove('menu-hidden');
          if (floatingToggle) floatingToggle.style.display = 'none';
        }
      }, 250);
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();