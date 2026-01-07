(function() {
  'use strict';

  const menuBreakpoint = 256 + 768 * 1.3;
  const storageKey = 'menu-expanded';
  let scrollPosition = 0;

  function isMenuExpanded() {
    const stored = localStorage.getItem(storageKey);
    return stored === null ? true : stored === 'true';
  }

  /**
   * Applies the desktop menu state (expanded/collapsed)
   * @param {boolean} isExpanded
   * @param {boolean} [animate=true] Whether to use CSS transitions
   */
  function applyDesktopState(isExpanded, animate = true) {
    const menuPanel = document.querySelector('.site-menu');
    const floatingToggle = document.querySelector('.menu-display-button');
    if (!menuPanel) return;

    if (!animate) {
      menuPanel.style.transition = 'none';
      if (floatingToggle) floatingToggle.style.transition = 'none';
    }

    if (isExpanded) {
      if (floatingToggle) floatingToggle.style.display = 'none';
      menuPanel.classList.remove('menu-hidden');
    } else {
      menuPanel.classList.add('menu-hidden');
      if (floatingToggle) {
        if (animate) {
          // Wait for menu transition (0.3s) before showing display button
          setTimeout(() => {
            if (!isMenuExpanded() && window.innerWidth > menuBreakpoint) {
              floatingToggle.style.display = 'block';
            }
          }, 300);
        } else {
          floatingToggle.style.display = 'block';
        }
      }
    }

    if (!animate) {
      // Force a reflow to apply 'transition: none' immediately before restoring
      menuPanel.offsetHeight;
      menuPanel.style.transition = '';
      if (floatingToggle) {
        floatingToggle.offsetHeight;
        floatingToggle.style.transition = '';
      }
    }
  }

  function toggleMenu(forceState) {
    const menuControl = document.getElementById('menu-control');
    const menuPanel = document.querySelector('.site-menu');

    if (!menuControl || !menuPanel) {
      return;
    }

    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > menuBreakpoint) {
      // Desktop: save state and animate toggle
      const currentState = isMenuExpanded();
      const nextState = forceState !== undefined ? forceState : !currentState;

      localStorage.setItem(storageKey, nextState);
      applyDesktopState(nextState, true);
    } else {
      // Mobile: use checkbox (no localStorage, no transition override needed here usually)
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
    const menuControl = document.getElementById('menu-control');
    const menuPanel = document.querySelector('.site-menu');
    const menuContent = document.querySelector('.site-menu .menu-content');

    // Create desktop menu toggle button (inside menu)
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
    if (menuPanel) {
      const menuDisplayBtn = document.createElement('button');
      menuDisplayBtn.className = 'menu-display-button';
      menuDisplayBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuDisplayBtn.setAttribute('aria-label', '{{ i18n "Open Menu" | default "Open Menu" }}');
      menuDisplayBtn.setAttribute('title', '{{ i18n "Open Menu" | default "Open Menu" }}');
      menuDisplayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(true); // Force open (animated)
      });
      document.body.appendChild(menuDisplayBtn);

      // Initial state application for Desktop (from localStorage, NO animation)
      if (window.innerWidth > menuBreakpoint) {
        applyDesktopState(isMenuExpanded(), false);
        // Remove initial guard class after JS takes over
        document.documentElement.classList.remove('menu-initial-collapsed');
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
      const isDesktop = window.innerWidth > menuBreakpoint;
      const isMenuOpen = isDesktop
        ? isMenuExpanded()
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
        if (window.innerWidth > menuBreakpoint) {
          // Desktop: reset mobile state and apply saved desktop state (NO animation)
          if (menuControl) menuControl.checked = false;
          applyDesktopState(isMenuExpanded(), false);
        } else {
          // Mobile: remove desktop class and hide toggle
          if (menuPanel) menuPanel.classList.remove('menu-hidden');
          const floatingToggle = document.querySelector('.menu-display-button');
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