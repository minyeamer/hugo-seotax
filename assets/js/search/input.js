(function () {
  'use strict';

  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-input-results');

  if (!searchInput) {
    return
  }

  searchInput.addEventListener('focus', init);           // Initialize search index on first focus
  searchInput.addEventListener('keyup', search);         // Perform search on key input
  searchInput.addEventListener('keydown', handleEscape); // Clear results on ESC key
  searchInput.addEventListener('blur', clearResults);    // Clear results when input loses focus

  // Global hotkey listener to focus search input
  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

  /**
   * Focus search input when hotkey is pressed anywhere on the page.
   * @param {Event} event - Keypress event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    searchInput.focus();
    event.preventDefault();
  }

  /**
   * Check if the pressed character matches the configured hotkey.
   * @param {string} character
   * @returns {boolean}
   */
  function isHotkey(character) {
    const dataHotkeys = searchInput.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  /**
   * Handle ESC key to clear search results and blur input.
   * @param {KeyboardEvent} event - Keydown event
   */
  function handleEscape(event) {
    if (event.key === 'Escape') {
      clearResults();
      searchInput.blur();
    }
  }

  /**
   * Clear all search results from the results container.
   */
  function clearResults() {
    searchResults.replaceChildren();
  }

  /**
   * Initialize search index on first focus.
   */
  function init() {
    searchInput.removeEventListener('focus', init);
    searchInput.required = true;

    window.siteSearch.initIndex()
      .then(() => searchInput.required = false)
      .then(search);
  }

  /**
   * Perform search and display preview results (upto 3 items).
   */
  function search() {
    clearResults();

    if (!searchInput.value) {
      return;
    }

    const searchHits = window.siteSearch.index.search(searchInput.value);
    const searchPreview = searchHits.slice(0, 3);
    const fragment = document.createDocumentFragment();

    // Display top 3 search results as preview
    searchPreview.forEach(page => {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = page.item.href;
      a.textContent = page.item.title;

      li.appendChild(a);
      fragment.appendChild(li);
    });

    // Show "more" link if there are additional results
    if (searchHits.length > 3) {
      const li = document.createElement('li');
      li.className = 'search-more';

      const a = document.createElement('a');
      a.href = `{{ "/search/" | relURL }}?query=${encodeURIComponent(searchInput.value)}`;
      const moreLabel = `{{ printf (i18n "More Label") | default "See all %d results" }}`;
      a.textContent = moreLabel.replace('%d', searchHits.length);

      li.appendChild(a);
      fragment.appendChild(li);
      searchResults.appendChild(fragment);
    }
  }
})();