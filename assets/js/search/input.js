(function () {
  'use strict';

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
    searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.addEventListener('click', closeSearchModal);

    // Create modal
    searchModal = document.createElement('div');
    searchModal.className = 'search-modal';

    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'search-modal-header';

    const modalTitle = document.createElement('h3');
    modalTitle.textContent = '{{ i18n "Search" | default "Search" }}';
    modalHeader.appendChild(modalTitle);

    const closeButton = document.createElement('button');
    closeButton.className = 'search-modal-close';
    closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeButton.setAttribute('aria-label', '{{ i18n "Close" | default "Close" }}');
    closeButton.addEventListener('click', closeSearchModal);
    modalHeader.appendChild(closeButton);

    searchModal.appendChild(modalHeader);

    // Create modal search input
    const modalInputContainer = document.createElement('div');
    modalInputContainer.className = 'search-modal-input-container';

    modalSearchInput = document.createElement('input');
    modalSearchInput.type = 'text';
    modalSearchInput.id = 'search-modal-input';
    modalSearchInput.placeholder = '{{ i18n "Search Placeholder" | default "Type here to search" }}';
    modalSearchInput.setAttribute('aria-label', '{{ i18n "Search" | default "Search" }}');
    modalSearchInput.maxLength = 64;

    modalSearchInput.addEventListener('keyup', displayPreview);
    modalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearchModal();
      } else if (e.key === 'Enter' && modalSearchInput.value.trim()) {
        window.location.href = "/search/?query=" + encodeURIComponent(modalSearchInput.value.trim());
      }
    });

    modalInputContainer.appendChild(modalSearchInput);

    // Add search button
    const modalSearchButton = document.createElement('button');
    modalSearchButton.type = 'button';
    modalSearchButton.className = 'search-modal-button';
    modalSearchButton.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    modalSearchButton.setAttribute('aria-label', '{{ i18n "Search" | default "Search" }}');
    modalSearchButton.addEventListener('click', () => {
      if (modalSearchInput.value.trim()) {
        window.location.href = "/search/?query=" + encodeURIComponent(modalSearchInput.value.trim());
      }
    });

    modalInputContainer.appendChild(modalSearchButton);
    searchModal.appendChild(modalInputContainer);

    // Create modal results container
    modalSearchResults = document.createElement('ul');
    modalSearchResults.className = 'search-modal-results';
    searchModal.appendChild(modalSearchResults);

    // Create modal footer (for "more" link)
    const modalFooter = document.createElement('div');
    modalFooter.className = 'search-modal-footer';
    modalFooter.style.display = 'none';
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
      const li = document.createElement('li');
      li.className = 'search-result-item';

      const a = document.createElement('a');
      a.href = page.item.href;

      const titleDiv = document.createElement('div');
      titleDiv.className = 'search-result-title';
      titleDiv.textContent = page.item.title;
      a.appendChild(titleDiv);

      // Add content summary if available
      if (page.item.content) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'search-result-content';
        const truncated = page.item.content.length > 150 
          ? page.item.content.substring(0, 150) + '...' 
          : page.item.content;
        contentDiv.textContent = truncated;
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
      
      const moreDiv = document.createElement('div');
      moreDiv.className = 'search-more';

      const a = document.createElement('a');
      a.href = `/search/?query=${encodeURIComponent(modalSearchInput.value)}`;
      const moreLabel = `{{ i18n "More Label" | default "See all %d results" }}`;
      a.textContent = moreLabel.replace('%d', searchHits.length);

      moreDiv.appendChild(a);
      modalFooter.appendChild(moreDiv);
    } else {
      modalFooter.style.display = 'none';
    }
  }

})();