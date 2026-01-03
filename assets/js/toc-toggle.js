(function() {
  'use strict';

  const tocBreakpoint = 256 + 768 * 1.1 + 256;
  let scrollPosition = 0;

  // Toggle ToC with overlay
  function toggleToC(forceState) {
    const tocControl = document.getElementById('toc-control');
    const tocOverlay = document.getElementById('toc-overlay');
    const tocPanel = document.querySelector('.site-toc');

    if (!tocControl || !tocPanel) {
      return;
    }

    // Save current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (forceState !== undefined) {
      tocControl.checked = forceState;
    } else {
      tocControl.checked = !tocControl.checked;
    }

    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });

    // Toggle overlay and panel
    if (tocControl.checked) {
      if (tocOverlay) tocOverlay.classList.add('active');
      tocPanel.classList.add('overlay-mode');
    } else {
      if (tocOverlay) tocOverlay.classList.remove('active');
      tocPanel.classList.remove('overlay-mode');
    }
  }

  // Initialize on DOM ready
  function init() {
    // Create desktop ToC toggle button
    const tocContent = document.querySelector('.site-toc .toc-content');
    if (tocContent) {
      const tocToggleBtn = document.createElement('button');
      tocToggleBtn.className = 'toc-toggle-button';
      tocToggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      tocToggleBtn.setAttribute('aria-label', 'Toggle ToC');
      tocToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleToC();
      });
      tocContent.insertBefore(tocToggleBtn, tocContent.firstChild);
    }

    // Create ToC overlay
    const tocPanel = document.querySelector('.site-toc');
    if (tocPanel) {
      const overlay = document.createElement('div');
      overlay.id = 'toc-overlay';
      overlay.className = 'toc-overlay';
      overlay.addEventListener('click', () => {
        toggleToC(false);
      });
      document.body.appendChild(overlay);
    }

    // Handle mobile ToC icon clicks
    const tocLabel = document.querySelector('label[for="toc-control"]');
    if (tocLabel) {
      tocLabel.addEventListener('click', (e) => {
        e.preventDefault();
        toggleToC();
      });
    }

    // Close ToC on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const tocControl = document.getElementById('toc-control');
        if (tocControl && tocControl.checked) {
          toggleToC(false);
        }
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const tocControl = document.getElementById('toc-control');
        const tocOverlay = document.getElementById('toc-overlay');
        const tocPanel = document.querySelector('.site-toc');

        if (window.innerWidth > tocBreakpoint) {
          // Desktop: reset states
          if (tocControl) tocControl.checked = false;
          if (tocOverlay) tocOverlay.classList.remove('active');
          if (tocPanel) tocPanel.classList.remove('overlay-mode');
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