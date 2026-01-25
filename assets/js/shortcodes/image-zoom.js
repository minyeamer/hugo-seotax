(function() {
  'use strict';

  /**
   * Set image's orientation by comparing width and height.
   * @param {HTMLImageElement} img
   */
  function setImageOrientation(img) {
    if (img.naturalWidth >= img.naturalHeight) {
      img.classList.add('landscape');
      img.classList.remove('portrait');
    } else {
      img.classList.add('portrait');
      img.classList.remove('landscape');
    }
  }

  /**
   * Initialize orientation for all images.
   */
  function initImage() {
    document.querySelectorAll('.md-image img, .sc-image img').forEach(img => {
      if (img.complete && img.naturalWidth && img.naturalHeight) {
        setImageOrientation(img);
      } else {
        img.addEventListener('load', () => setImageOrientation(img), {once: true});
      }
    });
  }

  /**
   * Set up image toggle handlers for zooming.
   */
  function initImageZoom() {
    const container = document.querySelector('.image-overlay-wrap');
    const overlay = container.querySelector('.image-overlay');
    const checkbox = container.querySelector('input.toggle');

    document.querySelectorAll('.sc-image input.toggle, .md-image input.toggle').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const img = document.querySelector('#'+checkbox.id.replace('toggle-', ''));
        if (e.target.checked) {
          const selected = img.cloneNode(true);
          selected.id = 'image-selected';
          overlay.appendChild(selected);
          e.target.checked = false;
        }
      });
    });

    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        overlay.replaceChildren();
        e.target.checked = false;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.replaceChildren();
        e.target.checked = false;
      }
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImage);
    document.addEventListener('DOMContentLoaded', initImageZoom);
  } else {
    initImage();
    initImageZoom();
  }
})();