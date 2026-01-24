(async function () {
  'use strict';

  const I18N = {
    'search.action.label': '{{ i18n "search.action.label" | default "Search" }}',
    'search.close.tooltip': '{{ i18n "search.close.tooltip" | default "Close" }}',
    'search.input.placeholder': '{{ i18n "search.input.placeholder" | default "Type here to search" }}',
    'search.more.label': '{{ i18n "search.more.label" | default "See all %d results" }}'
  };

  /**
   * Safely get translation for the given i18n id using the initial language.
   * @param {string} id
   * @returns {string}
   */
  function translate(id) {
    return (window.siteI18n && typeof window.siteI18n.translate === 'function')
      ? window.siteI18n.translate(id, I18N[id])
      : I18N[id];
  }

  /**
   * Create a DOM element with specified properties.
   * @param {string} tag - HTML tag name
   * @param {Object} [options={}] - Element properties
   * @param {string} [options.text] - Text content
   * @param {string} [options.html] - HTML content
   * @param {string} [options.className] - CSS class names
   * @param {string} [options.id] - Element ID
   * @param {Object} [options.attrs] - HTML attributes as key-value pairs
   * @param {Object} [options.dataset] - Data attributes as key-value pairs
   * @param {Object} [options.styles] - Inline styles as key-value pairs
   * @returns {HTMLElement} Created element
   */
  function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.text) element.textContent = options.text;
    if (options.html) element.innerHTML = options.html;
    if (options.className) element.className = options.className;
    if (options.id) element.id = options.id;

    if (options.attrs) {
      Object.entries(options.attrs).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (options.dataset) {
      Object.entries(options.dataset).forEach(([key, value]) => {
        element.dataset[key] = value;
      });
    }

    if (options.styles) {
      Object.entries(options.styles).forEach(([key, value]) => {
        element.style[key] = value;
      });
    }

    return element;
  }

  const searchInput = document.querySelector('#search-input');
  const menuSearch = document.querySelector('.menu-search');
  const mobileSearch = document.querySelector('.mobile-search');
  let modalSearchInput;
  let modalSearchResults;
  let searchOverlay;
  let searchModal;

  if (!searchInput && !mobileSearch) {
    return
  }

  // Open overlay modal on menu search click
  if (menuSearch) {
    menuSearch.addEventListener('click', openSearchModal);
    menuSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSearchModal();
      }
    });
  }

  // Open overlay modal on mobile search click
  if (mobileSearch) {
    mobileSearch.addEventListener('click', openSearchModal);
    mobileSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSearchModal();
      }
    });
  }

  // Global hotkey listener to open search modal
  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

  /**
   * Create and open the search modal overlay
   */
  function openSearchModal() {
    // Create modal structure if it doesn't exist
    if (!searchModal) {
      createSearchModal();
    }

    // Initialize search index on first open
    if (!window.siteSearch || !window.siteSearch.index) {
      modalSearchInput.required = true;
      window.siteSearch.initIndex()
        .then(() => modalSearchInput.required = false);
    }

    // Show modal
    searchOverlay.classList.add('active');
    searchModal.classList.add('active');
    modalSearchInput.focus();
  }

  /**
   * Close the search modal overlay
   */
  function closeSearchModal() {
    if (!searchModal) return;

    searchOverlay.classList.remove('active');
    searchModal.classList.remove('active');
    modalSearchInput.value = '';
    clearModalResults();
  }

  /**
   * Create the search modal structure
   */
  function createSearchModal() {
    // Create overlay
    searchOverlay = createElement('div', {className: 'search-overlay'});
    searchOverlay.addEventListener('click', closeSearchModal);

    // Create modal
    searchModal = createElement('div', {className: 'search-modal'});

    // Create modal header
    const modalHeader = createElement('div', {className: 'search-modal-header'});

    const modalTitle = createElement('h3', {
      className: 'search-modal-title',
      text: translate('search.action.label'),
      dataset: {i18nId: 'search.action.label', i18nText: ''}
    });
    modalHeader.appendChild(modalTitle);

    const closeButton = createElement('button', {
      className: 'search-modal-close',
      html: '<i class="fa-solid fa-xmark"></i>',
      attrs: {'aria-label': translate('search.close.tooltip')},
      dataset: {i18nId: 'search.close.tooltip', i18nAttrs: 'aria-label'}
    });
    closeButton.addEventListener('click', closeSearchModal);
    modalHeader.appendChild(closeButton);

    searchModal.appendChild(modalHeader);

    // Create modal search input
    const modalInputContainer = createElement('div', {className: 'search-modal-input-container'});

    const placeholder = translate('search.input.placeholder');
    modalSearchInput = createElement('input', {
      className: 'search-modal-input',
      id: 'search-modal-input',
      attrs: {type: 'text', maxLength: 64,placeholder: placeholder},
      dataset: {i18nId: 'search.input.placeholder', i18nAttrs: 'placeholder'}
    });
    modalSearchInput.addEventListener('keyup', displayPreview);
    modalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchModal();
      } else if (e.key === 'Enter') {
        window.location.href = '/search/?query=' + encodeURIComponent(modalSearchInput.value.trim());
      }
    });

    modalInputContainer.appendChild(modalSearchInput);

    // Add search button
    const modalSearchButton = createElement('button', {
      className: 'search-modal-button',
      html: '<i class="fa-solid fa-magnifying-glass"></i>',
      attrs: {'aria-label': translate('search.action.label')},
      dataset: {i18nId: 'search.action.label', i18nAttrs: 'aria-label'}
    });
    modalSearchButton.addEventListener('click', () => {
      window.location.href = '/search/?query=' + encodeURIComponent(modalSearchInput.value.trim());
    });

    modalInputContainer.appendChild(modalSearchButton);
    searchModal.appendChild(modalInputContainer);

    // Create modal results container
    modalSearchResults = createElement('ul', {className: 'search-modal-results'});
    searchModal.appendChild(modalSearchResults);

    // Create modal footer (for "more" link)
    const modalFooter = createElement('div', {className: 'search-modal-footer', styles: {display: 'none'}});
    searchModal.appendChild(modalFooter);

    document.body.appendChild(searchOverlay);
    document.body.appendChild(searchModal);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearchModal();
      }
    });
  }

  /**
   * Focus search input when hotkey is pressed anywhere on the page.
   * @param {Event} event - Keypress event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (searchModal && searchModal.classList.contains('active')) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    openSearchModal();
    event.preventDefault();
  }

  /**
   * Check if the pressed character matches the configured hotkey.
   * @param {string} character
   * @returns {boolean}
   */
  function isHotkey(character) {
    if (searchInput) {
      const dataHotkeys = searchInput.getAttribute('data-hotkeys') || '';
      return dataHotkeys.indexOf(character) >= 0;
    }
    return false;
  }

  /**
   * Clear all search results from the modal results container.
   */
  function clearModalResults() {
    if (modalSearchResults) {
      modalSearchResults.replaceChildren();
    }
    if (searchModal) {
      const modalFooter = searchModal.querySelector('.search-modal-footer');
      if (modalFooter) {
        modalFooter.style.display = 'none';
      }
    }
  }

  /**
   * Perform search and display results in modal (up to 10 items).
   */
  function displayPreview() {
    clearModalResults();

    if (!modalSearchInput || !modalSearchInput.value) {
      return;
    }

    if (!window.siteSearch || !window.siteSearch.index) {
      return;
    }

    const searchHits = window.siteSearch.index.search(modalSearchInput.value);
    const maxResults = Math.min(searchHits.length, 10);
    const searchPreview = searchHits.slice(0, maxResults);
    const fragment = document.createDocumentFragment();

    // Display search results with title and content summary
    searchPreview.forEach(page => {
      const li = createElement('li', {className: 'search-result-item'});
      const a = createElement('a', {attrs: {href: page.item.href}});
      const titleDiv = createElement('div', {className: 'search-result-title', text: page.item.title});
      a.appendChild(titleDiv);

      // Add content summary if available
      if (page.item.content) {
        const truncated = page.item.content.length > 150
          ? page.item.content.substring(0, 150) + '...'
          : page.item.content;
        const contentDiv = createElement('div', {className: 'search-result-content', text: truncated});
        a.appendChild(contentDiv);
      }

      li.appendChild(a);
      fragment.appendChild(li);
    });

    modalSearchResults.appendChild(fragment);

    // Show or hide `more` link in footer
    const modalFooter = searchModal.querySelector('.search-modal-footer');
    if (searchHits.length >= 5) {
      modalFooter.style.display = 'block';
      modalFooter.innerHTML = '';

      const moreDiv = createElement('div', {className: 'search-more'});
      const moreLabel = translate('search.more.label');
      const a = createElement('a', {
        text: moreLabel.replace('%d', searchHits.length),
        attrs: {href: `/search/?query=${encodeURIComponent(modalSearchInput.value)}`},
        dataset: {i18nId: 'search.more.label', i18nText: `{"%d": ${searchHits.length}}`}
      });

      moreDiv.appendChild(a);
      modalFooter.appendChild(moreDiv);
    } else {
      modalFooter.style.display = 'none';
    }
  }

})();