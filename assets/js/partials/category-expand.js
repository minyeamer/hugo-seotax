(function() {
  'use strict';

  /**
   * Get category1/category2 for the current page.
   * Checks URL search params first, then falls back to the post's category link.
   * @returns {object} category1 and category2 strings (nullable)
   */
  function getCurrentCategory() {
    const currentUrl = new URL(window.location.href);

    // Search page: /search/?category1=...&category2=...
    const category1 = currentUrl.searchParams.get('category1');
    const category2 = currentUrl.searchParams.get('category2');
    if (category1 || category2) {
      return { category1, category2 };
    }

    // Post page: extract from the category link in the content header
    const categoryLink = document.querySelector('.content-category-link');
    if (categoryLink) {
      try {
        const linkUrl = new URL(categoryLink.getAttribute('href'), window.location.origin);
        return {
          category1: linkUrl.searchParams.get('category1'),
          category2: linkUrl.searchParams.get('category2'),
        };
      } catch (e) {
        // ignore malformed href
      }
    }

    return { category1: null, category2: null };
  }

  function initCategoryExpand() {
    const { category1, category2 } = getCurrentCategory();
    if (!category1) return;

    // Expand and activate parent category
    const parentLabel = document.querySelector(
      `.categories-label[data-category1="${CSS.escape(category1)}"].categories-toggle`
    );
    if (parentLabel) {
      const checkboxId = parentLabel.getAttribute('for');
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) checkbox.checked = true;
      parentLabel.classList.add('category-active');
    }

    // Activate child category item
    if (category2) {
      const childItem = document.querySelector(
        `.categories-label[data-category1="${CSS.escape(category1)}"][data-category2="${CSS.escape(category2)}"]`
      );
      if (childItem) childItem.classList.add('category-active');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryExpand);
  } else {
    initCategoryExpand();
  }
})();