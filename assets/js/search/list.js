document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.pathname.startsWith('/search/')) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const state = {
    query: params.get('query') || '',
    category1: params.get('category1') || '',
    category2: params.get('category2') || '',
    tags: (params.get('tags')
      ? [...new Set(params.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag))]
      : []),
    tagsOp: params.get('tagsOp') || 'and',
    page: Math.max(1, parseInt(params.get('page')) || 1),
    pageSize: Math.max(1, parseInt(params.get('pageSize')) || 10)
  };
  const searchType = getSearchType(state);
  const STORAGE_KEY = 'search-filter-expanded';

  const I18N = {
    'search.action.label': '{{ i18n "search.action.label" | default "Search" }}',
    'search.input.placeholder': '{{ i18n "search.input.placeholder" | default "Type here to search" }}',
    'search.results.title': '{{ i18n "search.results.title" | default "Search results" }}',
    'search.count.label': '{{ i18n "search.count.label" | default `%s results for "%q"` }}',
    'search.tags.title': '{{ i18n "search.tags.title" | default `Search Tags` }}',
    'list.count.label': '{{ i18n "list.count.label" | default "%s posts" }}',
    'categories.parent.subtutle': '{{ i18n "categories.parent.subtutle" | default "Parent Category" }}',
    'categories.child.subtutle': '{{ i18n "categories.child.subtutle" | default "Child Category" }}',
    'tags.terms.title': '{{ i18n "tags.terms.title" | default "Tags" }}',
    'tags.op.checkbox': '{{ i18n "tags.op.checkbox" | default "Match all" }}',
    'search.filters.toggle': '{{ i18n "search.filters.toggle" | default "Advanced Filters" }}',
    'post.prev.link': '{{ i18n "post.prev.link" | default "PREV" }}',
    'post.next.link': '{{ i18n "post.next.link" | default "NEXT" }}'
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

  const searchData = document.querySelector('#search-data');
  const searchResults = document.querySelector('#search-results');
  const noResults = document.querySelector('#search-no-results');
  const listHeader = document.querySelector('#list-header');

  switch (searchType) {

    case 'search':
      Promise.all([
        window.siteSearch.initIndex(),
        window.siteSearch.initCategories(),
        window.siteSearch.initTags()
      ]).then(() => {
        const ids = searchQuery(state, true);
        displayResults(ids, state);
      });
      break;

    case 'category1':
      window.siteSearch.initCategories().then(() => {
        const ids = searchCategory1(state, true);
        displayResults(ids, state);
      });
      break;

    case 'category2':
      window.siteSearch.initCategories().then(() => {
        const ids = searchCategory2(state, true);
        displayResults(ids, state);
      });
      break;

    case 'tags':
      window.siteSearch.initTags().then(() => {
        const ids = searchTags(state, true);
        displayResults(ids, state);
      });
      break;

    case 'combined':
      Promise.all([
        window.siteSearch.initIndex(),
        window.siteSearch.initCategories(),
        window.siteSearch.initTags()
      ]).then(() => {
        const ids = searchCombined(state, true);
        displayResults(ids, state);
      });
      break;

    default:
      Promise.all([
        window.siteSearch.initIndex(),
        window.siteSearch.initCategories(),
        window.siteSearch.initTags()
      ]).then(() => {
        clearHeader();
        createListHeader({i18nId: 'search.results.title', icon: 'icon-file-lines'}, 0, '');
        displayResults(new Set());
      });
      break;
  }

  /**
   * Determine type of search based on current state.
   * @param {Object} state - Current search state
   * @returns {'search'|'category1'|'category2'|'tags'|'combined'|'none'} - Search type
   */
  function getSearchType(state) {
    const hasQuery = (state.query.length > 0);
    const hasCategory1 = (state.category1.length > 0);
    const hasCategory2 = (state.category2.length > 0);
    const hasTags = (state.tags.length > 0);

    if (hasQuery) {
      if (hasCategory1 | hasTags) return 'combined';
      else return 'search';
    } else {
      if (hasCategory1) return hasCategory2 ? 'category2' : 'category1';
      else if (hasTags) return 'tags';
      else return 'search';
    }
  }

  /**
   * Capitalize first letter of each word in a string.
   * @param {string} value - String to capitalize
   * @returns {string} Capitalized string
   */
  function capitalize(value) {
    return value ? value.split(' ').map(v => v ? v.charAt(0).toUpperCase() + v.slice(1) : '').join(' ') : '';
  }

  /**
   * Build search URL from current filter state.
   * @param {boolean} [preserveTaxonomy=false] - Preserve current taxonomy params (for simple search)
   * @returns {string} Search URL with parameters
   */
  function buildSearchUrl(preserveTaxonomy = false) {
    const params = new URLSearchParams();

    const queryInput = document.querySelector('#search-query-input');
    if (queryInput !== null) {
      params.set('query', queryInput.value.trim());
    }

    if (preserveTaxonomy) {
      if (state.category1) params.set('category1', state.category1);
      if (state.category2) params.set('category2', state.category2);
      if (state.tags.length > 0) {
        params.set('tags', state.tags.join(','));
        params.set('tagsOp', state.tagsOp);
      }
    } else {
      const category1Chips = document.querySelector('#filter-category1-chips');
      const category1Chip = category1Chips?.querySelector('.search-filter-chip');
      if (category1Chip) {
        params.set('category1', category1Chip.dataset.name);

        const category2Chips = document.querySelector('#filter-category2-chips');
        const category2Chip = category2Chips?.querySelector('.search-filter-chip');
        if (category2Chip) {
          params.set('category2', category2Chip.dataset.name);
        }
      }

      const tagsChips = document.querySelector('#filter-tags-chips');
      const tagChips = tagsChips?.querySelectorAll('.search-filter-chip');
      if (tagChips && tagChips.length > 0) {
        const tagNames = Array.from(tagChips).map(chip => chip.dataset.name);
        params.set('tags', tagNames.join(','));

        const tagsOpCheckbox = document.querySelector('#filter-tagsOp');
        if (tagsOpCheckbox) {
          params.set('tagsOp', tagsOpCheckbox.checked ? 'and' : 'or');
        }
      }
    }

    return `/search/?${params.toString()}`;
  }

  /**
   * Clear list header and taxonomy section.
   */
  function clearHeader() {
    listHeader.replaceChildren();

    const section = document.querySelector('#taxonomy-section');
    if (section.classList.contains('hidden')) {
      section.classList.add('hidden');
      section.replaceChildren();
    }
  }

  /**
   * Create header contents (title, icon, and result count)
   * and append to list header.
   * @param {Object} titleInfo - {i18nId?:string, icon?:string, text?:string}
   * @param {number} pageCount - The number of results
   * @param {string} [query=''] - Search query (optional)
   */
  function createListHeader(titleInfo, pageCount, query = '') {
    const fragment = document.createDocumentFragment();

    const title = createElement('h1');
    if (titleInfo.icon) {
      title.appendChild(createElement('i', {className: `${titleInfo.icon}`}))
      title.appendChild(document.createTextNode(' '));
    }
    if (titleInfo.i18nId) {
      title.appendChild(createElement('span', {
        text: translate(titleInfo.i18nId),
        dataset: {i18nId: titleInfo.i18nId, i18nText: ''}
      }));
    } else {
      title.appendChild(createElement('span', {text: titleInfo.text || ''}));
    }
    fragment.appendChild(title);

    const subtitleI18nId = query ? 'search.count.label' : 'list.count.label';
    const subtitleI18nParams = query ? `{"%q": "${query}", "%s": "$.list-count"}` : '{"%s": "$.list-count"}';
    const countLabel = translate(subtitleI18nId);
    const listCount = `<em class="list-count">${pageCount}</em>`;
    fragment.appendChild(createElement('p', {
      html: (query ? countLabel.replace('%q', query) : countLabel).replace('%s', listCount),
      dataset: {i18nId: subtitleI18nId, i18nText: subtitleI18nParams}
    }));

    listHeader.appendChild(fragment);
  }

  /**
   * Create a taxonomy section with category or tag chips
   * and append to list header.
   * @param {string} i18nId - i18n Id for section label text
   * @param {Object[]} taxonomies - Array of taxonomy objects to display
   */
  function createTaxonomySection(i18nId, taxonomies) {
    const fragment = document.createDocumentFragment();
    const section = document.querySelector('#taxonomy-section');
    section.classList.remove('hidden');

    const label = createElement('h2', {
      text: translate(i18nId),
      dataset: {i18nId: i18nId, i18nText: ''}
    });
    const chips = createElement('div', {className: 'taxonomy-chips'});
    taxonomies.forEach(taxonomy => {
      chips.appendChild(createTaxonomyChip(taxonomy));
    });

    fragment.appendChild(label);
    fragment.appendChild(chips);
    section.appendChild(fragment);
  }

  /**
   * Create a single taxonomy chip element with link and count.
   * @param {Object} options - Chip configuration
   * @param {string} options.text - Chip text
   * @param {string} options.icon - Font Awesome icon class
   * @param {string} options.href - Link URL
   * @param {number} options.pageCount - The number of pages in this taxonomy
   * @returns {HTMLElement} Created chip element
   */
  function createTaxonomyChip({text, icon, href, pageCount}) {
    const chip = createElement('div', {className: 'taxonomy-chip'});

    const a = createElement('a', {className: 'taxonomy-link', attrs: {href: href}});
    const countLabel = `<span class="taxonomy-count">(${pageCount})</span>`;
    a.appendChild(createElement('span', {
      className: 'taxonomy-name',
      html: `<i class="${icon}"></i> ${text} ${countLabel}`
    }));

    chip.appendChild(a);
    return chip;
  }

  /**
   * Create a query filter with input and button.
   * @param {string} [options.queryValue=''] - Initial query value
   * @returns {DocumentFragment} Query filter element
   */
  function createQueryFilter(queryValue = '') {
    const queryRow = createElement('div', {className: 'search-query-row'});
    const inputWrapper = createElement('div', {className: 'query-input-wrapper'});

    const queryIcon = createElement('i', {className: 'icon-search search-query-icon'});
    inputWrapper.appendChild(queryIcon);

    const placeholder = translate('search.input.placeholder');
    const queryInput = createElement('input', {
      id: 'search-query-input',
      className: 'search-query-input',
      attrs: {type: 'text', maxLength: 64, placeholder: placeholder, value: queryValue},
      dataset: {i18nId: 'search.input.placeholder', i18nAttrs: 'placeholder'}
    });
    inputWrapper.appendChild(queryInput);

    const queryButton = createElement('button', {
      className: 'search-query-button',
      text: translate('search.action.label'),
      attrs: {type: 'button'},
      dataset: {i18nId: 'search.action.label', i18nText: ''}
    });
    inputWrapper.appendChild(queryButton);
    queryRow.appendChild(inputWrapper);

    const toggleButton = createElement('button', {className: 'search-filter-toggle', attrs: {type: 'button'}});
    toggleButton.appendChild(createElement('i', {className: 'icon-caret-up'}))
    toggleButton.appendChild(document.createTextNode(' '));
    toggleButton.appendChild(createElement('span', {
      text: translate('search.filters.toggle'),
      dataset: {i18nId: 'search.filters.toggle', i18nText: ''}
    }))
    queryRow.appendChild(toggleButton);

    return queryRow;
  }

  /**
   * Setup event listeners for query row in search filter.
   * @param {boolean} [preserveTaxonomy=false] - Preserve taxonomy params when searching
   */
  function setupQueryFilterEvents(preserveTaxonomy = false) {
    const queryInput = document.querySelector('#search-query-input');
    const queryButton = document.querySelector('.search-query-button');

    const performSearch = () => {
      const url = buildSearchUrl(preserveTaxonomy);
      window.location.href = url;
    };

    queryInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });

    queryButton.addEventListener('click', performSearch);
  }

  /**
   * Create a category filter.
   * @param {string} type - Filter type ('category1' or 'category2')
   * @param {boolean} [disabled=false] - Whether input should be disabled
   * @returns {HTMLElement} Taxonomy filter element
   */
  function createCategoryFilter(type, disabled = false) {
    const isCategory2 = (type === 'category2');
    const i18nId = isCategory2 ? 'categories.child.subtutle' : 'categories.parent.subtutle';
    const filterLabel = translate(i18nId);

    const taxonomyFilter = createElement('div', {className: 'taxonomy-filter'});
    taxonomyFilter.appendChild(createElement('label', {
      text: filterLabel,
      attrs: {for: `filter-${type}`},
      dataset: {i18nId: i18nId, i18nText: ''}
    }));

    const inputWrapper = createElement('div', {className: 'taxonomy-input-wrapper'});

    const input = createElement('input', {
      id: `filter-${type}`,
      className: 'search-filter-input',
      attrs: {type: 'text', placeholder: filterLabel, autocomplete: 'off'},
      dataset: {i18nId: i18nId, i18nAttrs: 'placeholder'}
    });
    if (disabled) input.disabled = true;
    inputWrapper.appendChild(input);

    const dropdown = createElement('div', {
      id: `filter-${type}-dropdown`,
      className: 'search-filter-dropdown hidden'
    });
    inputWrapper.appendChild(dropdown);

    taxonomyFilter.appendChild(inputWrapper);

    const selected = createElement('div', {
      id: `filter-${type}-chips`,
      className: 'search-filter-chips'
    });
    taxonomyFilter.appendChild(selected);

    return taxonomyFilter;
  }

  /**
   * Create a tags filter.
   * @returns {HTMLElement} Taxonomy filter element
   */
  function createTagsFilter() {
    const taxonomyFilter = createElement('div', {className: 'taxonomy-filter taxonomy-filter-wide'});

    const filterLabel = translate('tags.terms.title');
    taxonomyFilter.appendChild(createElement('label', {
      text: filterLabel,
      attrs: {for: 'filter-tags'},
      dataset: {i18nId: 'tags.terms.title', i18nText: ''}
    }));

    const inputWrapper = createElement('div', {className: 'taxonomy-input-wrapper'});

    const input = createElement('input', {
      id: 'filter-tags',
      className: 'search-filter-input',
      attrs: {type: 'text', placeholder: filterLabel, autocomplete: 'off'},
      dataset: {i18nId: 'tags.terms.title', i18nAttrs: 'placeholder'}
    });
    inputWrapper.appendChild(input);

    const dropdown = createElement('div', {
      id: 'filter-tags-dropdown',
      className: 'search-filter-dropdown hidden'
    });
    inputWrapper.appendChild(dropdown);

    taxonomyFilter.appendChild(inputWrapper);

    const selected = createElement('div', {
      id: 'filter-tags-chips',
      className: 'search-filter-chips search-filter-chips-wrap'
    });
    taxonomyFilter.appendChild(selected);

    return taxonomyFilter;
  }

  /**
   * Create tags operation checkbox.
   * @returns {HTMLElement} Taxonomy filter element
   */
  function createTagsOpCheckbox() {
    const taxonomyFilter = createElement('div', {className: 'taxonomy-filter tags-op-checkbox'});
    const label = createElement('label', {className: 'tags-op-label'});

    const checkbox = createElement('input', {
      id: 'filter-tagsOp',
      attrs: {type: 'checkbox'}
    });
    checkbox.checked = (state.tagsOp === 'and');
    label.appendChild(checkbox);

    label.appendChild(createElement('span', {
      text: translate('tags.op.checkbox'),
      dataset: {i18nId: 'tags.op.checkbox', i18nText: ''}
    }));

    taxonomyFilter.appendChild(label);
    return taxonomyFilter;
  }

  /**
   * Create a search filter without taxonomy filters and append to list header. (deprecated)
   */
  function createSimpleSearchBar() {
    const fragment = document.createDocumentFragment();
    const searchFilter = createElement('div', {className: 'search-filter'});
    const queryFilter = createQueryFilter();

    searchFilter.appendChild(queryFilter);
    fragment.appendChild(searchFilter);
    listHeader.appendChild(fragment);

    setupQueryFilterEvents(true);
  }

  /**
   * Create a search filter with taxonomy filters and append to list header.
   * @param {Set.<number>} ids - Set of post IDs from search results
   * @param {'ture'|'false'|null} [isExpanded=null] - Initial expanded state
   */
  function createSearchFilter(ids, isExpanded=null) {
    const fragment = document.createDocumentFragment();
    const searchFilter = createElement('div', {className: 'search-filter'});

    const queryFilter = createQueryFilter(state.query);
    searchFilter.appendChild(queryFilter);

    const taxonomiesRow = createElement('div', {className: 'search-taxonomies-row'});
    if (!(state.category1 || state.category2 || (state.tags && state.tags.length > 0))) {
      taxonomiesRow.classList.add('hidden');
    }

    const categoriesFilter = createElement('div', {className: 'search-categories-filter'});
    categoriesFilter.appendChild(createCategoryFilter('category1'));
    categoriesFilter.appendChild(createCategoryFilter('category2', true));
    taxonomiesRow.appendChild(categoriesFilter);

    const tagsFilter = createElement('div', {className: 'search-tags-filter'});
    tagsFilter.appendChild(createTagsFilter());
    tagsFilter.appendChild(createTagsOpCheckbox());
    taxonomiesRow.appendChild(tagsFilter);

    searchFilter.appendChild(taxonomiesRow);
    fragment.appendChild(searchFilter);
    listHeader.appendChild(fragment);

    setupQueryFilterEvents(false);
    setupFilterToggle(isExpanded);
    setupTaxonomyFilterEvents(ids);
    initFiltersFromState();
  }

  /**
   * Setup event listener for advanced filter toggle button.
   * @param {'ture'|'false'|null} [isExpanded=null] - Initial expanded state
   */
  function setupFilterToggle(isExpanded=null) {
    const filterToggle = document.querySelector('.search-filter-toggle');
    const taxonomiesRow = document.querySelector('.search-taxonomies-row');
    const isCombinedSearch = (searchType === 'combined');

    isExpanded = isExpanded ?? localStorage.getItem(STORAGE_KEY);
    if (isCombinedSearch || (isExpanded === 'true')) {
      taxonomiesRow.classList.remove('hidden');
      filterToggle.classList.add('expanded');
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      taxonomiesRow.classList.add('hidden');
      filterToggle.classList.remove('expanded');
    }

    filterToggle.addEventListener('click', function() {
      const isHidden = taxonomiesRow.classList.contains('hidden');

      if (isHidden) {
        taxonomiesRow.classList.remove('hidden');
        filterToggle.classList.add('expanded');
        localStorage.setItem(STORAGE_KEY, 'true');
      } else {
        taxonomiesRow.classList.add('hidden');
        filterToggle.classList.remove('expanded');
        localStorage.setItem(STORAGE_KEY, 'false');
      }
    });
  }

  /**
   * Setup event listeners for taxonomy filter inputs and dropdowns.
   * @param {Set.<number>} ids - Set of post IDs from search results
   */
  function setupTaxonomyFilterEvents(ids) {
    const category1Input = document.querySelector('#filter-category1');
    const category1Dropdown = document.querySelector('#filter-category1-dropdown');
    const category2Input = document.querySelector('#filter-category2');
    const category2Dropdown = document.querySelector('#filter-category2-dropdown');
    const tagsInput = document.querySelector('#filter-tags');
    const tagsDropdown = document.querySelector('#filter-tags-dropdown');

    let activeIndex = -1;
    let activeDropdown = null;

    category1Input.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      const matches = filterCategories1(query, ids);

      if (matches.length > 0) {
        renderDropdownFilter(category1Dropdown, matches, 'category1');
        category1Dropdown.classList.remove('hidden');
        activeDropdown = category1Dropdown;
        activeIndex = -1;
      } else {
        category1Dropdown.classList.add('hidden');
        activeDropdown = null;
        activeIndex = -1;
      }
    });

    category1Input.addEventListener('focus', function() {
      // Close other dropdowns
      category2Dropdown.classList.add('hidden');
      tagsDropdown.classList.add('hidden');

      const query = this.value.trim().toLowerCase();
      const matches = filterCategories1(query, ids);
      if (matches.length > 0) {
        renderDropdownFilter(category1Dropdown, matches, 'category1');
        category1Dropdown.classList.remove('hidden');
        activeDropdown = category1Dropdown;
      }
    });

    category2Input.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      const matches = filterCategories2(query, ids);

      if (matches.length > 0) {
        renderDropdownFilter(category2Dropdown, matches, 'category2');
        category2Dropdown.classList.remove('hidden');
        activeDropdown = category2Dropdown;
        activeIndex = -1;
      } else {
        category2Dropdown.classList.add('hidden');
        activeDropdown = null;
        activeIndex = -1;
      }
    });

    category2Input.addEventListener('focus', function() {
      if (this.disabled) return;

      // Close other dropdowns
      category1Dropdown.classList.add('hidden');
      tagsDropdown.classList.add('hidden');

      const query = this.value.trim().toLowerCase();
      const matches = filterCategories2(query, ids);
      if (matches.length > 0) {
        renderDropdownFilter(category2Dropdown, matches, 'category2');
        category2Dropdown.classList.remove('hidden');
        activeDropdown = category2Dropdown;
      }
    });

    tagsInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      const matches = filterTags(query, ids);

      if (matches.length > 0) {
        renderDropdownFilter(tagsDropdown, matches, 'tags');
        tagsDropdown.classList.remove('hidden');
        activeDropdown = tagsDropdown;
        activeIndex = -1;
      } else {
        tagsDropdown.classList.add('hidden');
        activeDropdown = null;
        activeIndex = -1;
      }
    });

    tagsInput.addEventListener('focus', function() {
      // Close other dropdowns
      category1Dropdown.classList.add('hidden');
      category2Dropdown.classList.add('hidden');

      const query = this.value.trim().toLowerCase();
      const matches = filterTags(query, ids);
      if (matches.length > 0) {
        renderDropdownFilter(tagsDropdown, matches, 'tags');
        tagsDropdown.classList.remove('hidden');
        activeDropdown = tagsDropdown;
      }
    });

    // Keyboard navigation for all inputs
    [category1Input, category2Input, tagsInput].forEach(input => {
      input.addEventListener('keydown', function(e) {
        if (!activeDropdown || activeDropdown.classList.contains('hidden')) {
          return;
        }

        const items = activeDropdown.querySelectorAll('.search-filter-dropdown-item');
        if (items.length === 0) return;

        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActiveItem(items, activeIndex);
            break;
          case 'ArrowUp':
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActiveItem(items, activeIndex);
            break;
          case 'Enter':
            e.preventDefault();
            if (items.length > 0) {
              if (activeIndex >= 0 && activeIndex < items.length) {
                items[activeIndex].click();
              } else {
                // Select first item if no item is active
                items[0].click();
              }
            }
            break;
          case 'Escape':
            e.preventDefault();
            activeDropdown.classList.add('hidden');
            activeDropdown = null;
            activeIndex = -1;
            break;
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.taxonomy-filter')) {
        [category1Dropdown, category2Dropdown, tagsDropdown].forEach(dropdown => {
          dropdown.classList.add('hidden');
        });
        activeDropdown = null;
        activeIndex = -1;
      }
    });
    
    // TagsOp checkbox change listener
    const tagsOpCheckbox = document.querySelector('#filter-tagsOp');
    tagsOpCheckbox.addEventListener('change', function() {
      // Only trigger search if there are selected tags
      const tagsChips = document.querySelector('#filter-tags-chips');
      const tagChips = tagsChips?.querySelectorAll('.search-filter-chip');
      if (tagChips && tagChips.length > 0) {
        window.location.href = buildSearchUrl();
      }
    });

    /**
     * Update active item styling in dropdown
     */
    function updateActiveItem(items, index) {
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
          item.scrollIntoView({block: 'nearest'});
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  /**
   * Initialize filter chips from URL parameters.
   */
  function initFiltersFromState() {
    const categories = window.siteSearch.categories;
    const tags = window.siteSearch.tags;

    if (state.category1) {
      const category1Data = categories[state.category1.toLowerCase()];
      if (category1Data && category1Data['A']) {
        const chipsContainer = document.querySelector('#filter-category1-chips');
        const chip = createFilterChip(category1Data['A']['name'], state.category1, 'category1');
        chipsContainer.appendChild(chip);

        const category2Input = document.querySelector('#filter-category2');
        category2Input.disabled = false;

        if (state.category2) {
          const category2Data = category1Data[state.category2.toLowerCase()];
          if (category2Data) {
            const category2Chips = document.querySelector('#filter-category2-chips');
            const chip2 = createFilterChip(category2Data['name'], state.category2, 'category2');
            category2Chips.appendChild(chip2);
          }
        }
      }
    }

    if (state.tags && state.tags.length > 0) {
      const tagsChips = document.querySelector('#filter-tags-chips');
      state.tags.forEach(tagKey => {
        const tagData = tags[tagKey.toLowerCase()];
        if (tagData) {
          const chip = createFilterChip(tagData['name'], tagKey, 'tags');
          tagsChips.appendChild(chip);
        }
      });
    }
  }

  /**
   * Filter parent categories based on query string and search result ids.
   * @param {string} query - Search query
   * @param {Set.<number>} ids - Set of post IDs from search results
   * @returns {Array} Array of matching categories with name and count
   */
  function filterCategories1(query, ids) {
    const categories = window.siteSearch.categories;
    const matches = [];

    for (const key in categories) {
      const category = categories[key];
      if (category['A'] && category['A']['name']) {
        const name = category['A']['name'];
        // Calculate intersection count
        const categoryIds = new Set(category['A']['ids']);
        const intersectionCount = [...ids].filter(id => categoryIds.has(id)).length;

        // Only include if there's at least one match and name matches query
        if (intersectionCount > 0 && name.toLowerCase().includes(query)) {
          matches.push({
            name: name,
            count: intersectionCount,
            key: key
          });
        }
      }
    }

    return matches.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Filter child categories based on query string, selected parent, and search result ids.
   * @param {string} query - Search query
   * @param {Set.<number>} ids - Set of post IDs from search results
   * @returns {Array} Array of matching categories with name and count
   */
  function filterCategories2(query, ids) {
    // Get selected parent category from chips or state
    const category1Chips = document.querySelector('#filter-category1-chips');
    const selectedChip = category1Chips?.querySelector('.search-filter-chip');
    if (!selectedChip) return [];

    const parentKey = selectedChip.dataset.key.toLowerCase();
    const categories = window.siteSearch.categories;
    const parentCategory = categories[parentKey];
    if (!parentCategory) return [];

    const matches = [];
    for (const key in parentCategory) {
      if (key === 'A') continue;
      const category = parentCategory[key];
      if (category && category['name']) {
        const name = category['name'];
        // Calculate intersection count
        const categoryIds = new Set(category['ids']);
        const intersectionCount = [...ids].filter(id => categoryIds.has(id)).length;

        // Only include if there's at least one match and name matches query
        if (intersectionCount > 0 && name.toLowerCase().includes(query)) {
          matches.push({
            name: name,
            count: intersectionCount,
            key: key
          });
        }
      }
    }

    return matches.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Filter tags based on query string and search result ids.
   * @param {string} query - Search query
   * @param {Set.<number>} ids - Set of post IDs from search results
   * @returns {Array} Array of matching tags with name and count
   */
  function filterTags(query, ids) {
    const tags = window.siteSearch.tags;
    const matches = [];
    const selectedTags = new Set(state.tags.map(t => t.toLowerCase()));

    for (const key in tags) {
      if (selectedTags.has(key.toLowerCase())) continue;

      const tag = tags[key];
      if (tag && tag['name']) {
        const name = tag['name'];
        // Calculate intersection count
        const tagIds = new Set(tag['ids']);
        const intersectionCount = [...ids].filter(id => tagIds.has(id)).length;

        // Only include if there's at least one match and name matches query
        if (intersectionCount > 0 && name.toLowerCase().includes(query)) {
          matches.push({
            name: name,
            count: intersectionCount,
            key: key
          });
        }
      }
    }

    return matches.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Render dropdown items for autocomplete.
   * @param {HTMLElement} dropdown - Dropdown container
   * @param {Array} items - Array of items to display
   * @param {string} type - Type of filter ('category1', 'category2', 'tags')
   */
  function renderDropdownFilter(dropdown, items, type) {
    dropdown.replaceChildren();
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      const div = createElement('div', {
        className: 'search-filter-dropdown-item',
        dataset: {key: item.key, name: item.name}
      });

      div.appendChild(createElement('span', {
        className: 'dropdown-item-name',
        text: item.name
      }));

      div.appendChild(createElement('span', {
        className: 'dropdown-item-count',
        text: `(${item.count})`
      }));

      div.addEventListener('click', function() {
        handleDropdownSelection(type, item);
      });

      fragment.appendChild(div);
    });

    dropdown.appendChild(fragment);
  }

  /**
   * Handle selection from dropdown.
   * @param {string} type - Type of filter
   * @param {Object} item - Selected item
   */
  function handleDropdownSelection(type, item) {
    const dropdown = document.querySelector(`#filter-${type}-dropdown`);
    const input = document.querySelector(`#filter-${type}`);
    const chipsContainer = document.querySelector(`#filter-${type}-chips`);

    dropdown.classList.add('hidden');
    input.value = '';

    if (type === 'category1') {
      chipsContainer.replaceChildren();

      const chip = createFilterChip(item.name, item.key, type);
      chipsContainer.appendChild(chip);

      const category2Input = document.querySelector('#filter-category2');
      category2Input.disabled = false;

      const category2Chips = document.querySelector('#filter-category2-chips');
      category2Chips.replaceChildren();

    } else if (type === 'category2') {
      chipsContainer.replaceChildren();

      const chip = createFilterChip(item.name, item.key, type);
      chipsContainer.appendChild(chip);
    } else if (type === 'tags') {
      const existingChips = chipsContainer.querySelectorAll('.search-filter-chip');
      for (const existingChip of existingChips) {
        if (existingChip.dataset.key === item.key) {
          return;
        }
      }

      const chip = createFilterChip(item.name, item.key, type);
      chipsContainer.appendChild(chip);
    }

    // Navigate to search URL with updated filters
    window.location.href = buildSearchUrl();
  }

  /**
   * Create a filter chip element with remove button.
   * @param {string} name - Display name
   * @param {string} key - Data key
   * @param {string} type - Filter type
   * @returns {HTMLElement} Chip element
   */
  function createFilterChip(name, key, type) {
    const chip = createElement('div', {
      className: 'search-filter-chip',
      dataset: {key: key, name: name},
      styles: {cursor: 'pointer'}
    });

    chip.appendChild(createElement('span', {
      className: 'chip-name',
      text: name
    }));

    chip.appendChild(createElement('button', {
      className: 'chip-remove',
      html: '&times;'
    }));

    chip.addEventListener('click', function(e) {
      handleChipRemove(type, chip);
    });

    return chip;
  }

  /**
   * Handle chip removal.
   * @param {string} type - Filter type
   * @param {HTMLElement} chip - Chip element to remove
   */
  function handleChipRemove(type, chip) {
    chip.remove();

    if (type === 'category1') {
      // Disable and clear category2
      const category2Input = document.querySelector('#filter-category2');
      category2Input.disabled = true;
      category2Input.value = '';

      const category2Chips = document.querySelector('#filter-category2-chips');
      category2Chips.replaceChildren();

      const category2Dropdown = document.querySelector('#filter-category2-dropdown');
      category2Dropdown.classList.add('hidden');
    }

    // Navigate to search URL with updated filters
    window.location.href = buildSearchUrl();
  }

  /**
   * Search for posts matching query string.
   * @param {Object} state - Current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {number[]} Array of matching post IDs
   */
  function searchQuery(state, appendHeader = false) {
    let searchPosts = new Set();
    if (state.query) {
      const searchHits = window.siteSearch.index.search(state.query);
      searchPosts = new Set(searchHits.map(result => result.item.id));
    } else {
      const total = window.siteSearch.total;
      searchPosts = new Set(Array.from({length: total}, (_, i) => i));
    }

    if (appendHeader) {
      clearHeader();
      createListHeader({i18nId: 'search.results.title', icon: 'icon-file-text'}, searchPosts.size, state.query);
      createSearchFilter(searchPosts);
    }

    return searchPosts;
  }

  /**
   * Search for posts in a specific parent category.
   * @param {Object} state - Current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchCategory1(state, appendHeader = false) {
    const category1 = window.siteSearch.categories[state.category1.toLowerCase()];
    const hasCategory1 = (category1 instanceof Object) && (Object.keys(category1).length > 0);
    const category1Name = hasCategory1 ? category1['A']['name'] : capitalize(state.category1);
    const category1Posts = hasCategory1 ? category1['A']['ids'] : [];

    if (appendHeader) {
      clearHeader();
      createListHeader({text: category1Name, icon: 'icon-folder'}, category1Posts.length);
      createSearchFilter(category1Posts, 'false');

      const taxonomies = Object.keys(category1).toSorted()
        .filter(key => (key !== 'A') && (category1[key] instanceof Object))
        .map(key => ({
          text: category1[key]['name'],
          icon: 'icon-file',
          href: `/search/?category1=${category1Name}&category2=${category1[key]['name']}`,
          pageCount: category1[key]['ids'].length,
        }));
      if (taxonomies.length > 0) {
        createTaxonomySection('categories.child.subtutle', taxonomies);
      }
    }

    return new Set(category1Posts);
  }

  /**
   * Search for posts in a specific child category.
   * @param {Object} state - Current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchCategory2(state, appendHeader = false) {
    const category1 = window.siteSearch.categories[state.category1.toLowerCase()];
    const hasCategory1 = (category1 instanceof Object) && (Object.keys(category1).length > 0);
    const category1Name = hasCategory1 ? category1['A']['name'] : '';

    const category2 = hasCategory1 ? category1[state.category2.toLowerCase()] : null;
    const hasCategory2 = hasCategory1 && (category2 instanceof Object) && (Object.keys(category2).length > 0);
    const category2Name = hasCategory2 ? category2['name'] : capitalize(state.category2);
    const category2Posts = hasCategory2 ? category2['ids'] : [];

    if (appendHeader) {
      clearHeader();
      createListHeader({text: category2Name, icon: 'icon-file'}, category2Posts.length);
      createSearchFilter(category2Posts, 'false');

      if (category1Name) {
        taxonomy = {
          text: category1Name,
          icon: 'icon-folder-open',
          href: `/search/?category1=${category1Name}`,
          pageCount: category1['A']['ids'].length,
        };
        createTaxonomySection('categories.parent.subtutle', [taxonomy]);
      }
    }

    return new Set(category2Posts);
  }

  /**
   * Search for posts matching specific tags (AND/OR operation).
   * @param {Object} state - Current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchTags(state, appendHeader = false) {
    const tags = window.siteSearch.tags;
    const union = (state.tagsOp === 'or');
    const tagNames = new Array();
    const hasSingleTag = (state.tags.length === 1);
    let tagPosts = new Set();

    state.tags.forEach((t, index) => {
      const tag = tags[t.toLowerCase()];
      if (tag instanceof Object) {
        tagNames.push(tag['name']);
        const ids = new Set(tag['ids']);
        if (union) {
          ids.forEach(id => tagPosts.add(id));
        } else {
          if (index === 0) {
            tagPosts = ids;
          } else {
            tagPosts = new Set([...tagPosts].filter(id => ids.has(id)));
          }
        }
      }
    });

    if (appendHeader) {
      clearHeader();
      if (hasSingleTag) {
        createListHeader({text: tagNames[0], icon: 'icon-tag'}, tagPosts.size);
      } else {
        createListHeader({i18nId: 'search.results.title', icon: 'icon-tags'}, tagPosts.size);
      }
      createSearchFilter(tagPosts, 'false');

      if (!hasSingleTag) {
        const taxonomies = tagNames.toSorted()
          .map(tag => ({
            text: tag,
            icon: 'icon-tag',
            href: `/search/?tags=${tag}`,
            pageCount: tags[tag.toLowerCase()]['ids'].length,
          }));
        if (taxonomies.length > 0) {
          createTaxonomySection('search.tags.title', taxonomies);
        }
      }
    }

    return tagPosts;
  }

  /**
   * Perform a combined search with query, categories, and tags.
   * @param {Object} state - Current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchCombined(state, appendHeader = false) {
    const searchHits = window.siteSearch.index.search(state.query);
    let searchPosts = new Set(searchHits.map(result => result.item.id));

    if ((searchPosts.size > 0) && state.category1) {
      if (state.category2) {
        const category2Posts = searchCategory2(state, false);
        searchPosts = new Set([...searchPosts].filter(id => category2Posts.has(id)));
      } else {
        const category1Posts = searchCategory1(state, false);
        searchPosts = new Set([...searchPosts].filter(id => category1Posts.has(id)));
      }
    }

    if ((searchPosts.size > 0) && (state.tags.length > 0)) {
      const tagPosts = searchTags(state, false);
      searchPosts = new Set([...searchPosts].filter(id => tagPosts.has(id)));
    }

    if (appendHeader) {
      clearHeader();
      createListHeader({i18nId: 'search.results.title', icon: 'icon-file-lines'}, searchPosts.size, state.query);
      createSearchFilter(searchPosts);
    }

    return searchPosts;
  }

  /**
   * Clear all search results from results container.
   */
  function clearResults() {
    searchResults.replaceChildren();
    searchResults.classList.add('hidden');
    noResults.classList.remove('hidden');
  }

  /**
   * Display search results for current page with pagination.
   * @param {Set.<number>} ids - Set of post IDs to display
   * @param {Object} state - Current search state with page and pageSize
   */
  function displayResults(ids, state) {
    clearResults();
    const totalPosts = ids.size;

    if (totalPosts === 0) {
      return;
    }

    const fragment = document.createDocumentFragment();
    const sortedIds = Array.from(ids).toSorted((a, b) => a - b);
    const searchItems = searchData.querySelectorAll('.search-item');

    const totalPages = Math.ceil(totalPosts / state.pageSize);

    if (state.page > totalPages) {
      const redirectParams = new URLSearchParams(params);
      redirectParams.set('page', totalPages);
      window.location.href = `${window.location.pathname}?${redirectParams.toString()}#pagination-anchor`;
      return;
    }

    const startIndex = (state.page - 1) * state.pageSize;
    const endIndex = Math.min(startIndex + state.pageSize, totalPosts);

    for (let i = startIndex; i < endIndex; i++) {
      const curIndex = sortedIds[i];
      fragment.appendChild(searchItems[curIndex].cloneNode(true));
    }

    noResults.classList.add('hidden');
    searchResults.classList.remove('hidden');
    searchResults.appendChild(fragment);

    if (totalPages > 1) {
      const groupNumber = Math.floor((state.page - 1) / 10);
      const groupStart = groupNumber * 10 + 1;
      const groupEnd = Math.min(groupStart + 9, totalPages);

      const pages = Array.from(
        { length: groupEnd - groupStart + 1 }, 
        (_, i) => groupStart + i
      );

      const prev = groupStart > 1 ? groupStart - 1 : null;
      const next = groupEnd < totalPages ? groupEnd + 1 : null;

      displayPagination({
        cur: state.page,
        prev: prev,
        next: next,
        pages: pages,
      });
    } else {
      const paginationNav = document.querySelector('#pagination');
      if (paginationNav) {
        paginationNav.classList.add('hidden');
      }
    }
  }

  /**
   * Display pagination controls with page numbers and prev/next links.
   * @param {Object} options - Pagination configuration
   * @param {number} options.cur - Current page number
   * @param {number[]} options.pages - Array of page numbers to display
   * @param {number|null} [options.prev=null] - Previous group page number (null if none)
   * @param {number|null} [options.next=null] - Next group page number (null if none)
   */
  function displayPagination({cur, pages, prev = null, next = null}) {
    const paginationNav = document.querySelector('#pagination');

    if (!paginationNav) {
      return;
    }

    const fragment = document.createDocumentFragment();

    const createPageUrl = (page) => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', page);
      return `/search/?${newParams.toString()}#pagination-anchor`;
    };

    (function appendPrevLink() {
      let nav;
      if (prev !== null) {
        nav = createElement('a', {className: 'pagination-nav pagination-link', attrs: {href: createPageUrl(prev)}});
      } else {
        nav = createElement('span', {className: 'pagination-nav disabled'});
      }
      nav.appendChild(createElement('i', {className: 'icon-backward'}));
      nav.appendChild(document.createTextNode(' '));
      nav.appendChild(createElement('span', {
        text: translate('post.prev.link'),
        dataset: {i18nId: 'post.prev.link', i18nText: ''}
      }));
      fragment.appendChild(nav);
    })();

    (function appendPageLinks() {
      const pagesDiv = createElement('div', {className: 'pagination-pages'});
      pages.forEach(page => {
        if (page === cur) {
          pagesDiv.appendChild(createElement('span', {
            id: 'current-page',
            className: 'pagination-page current',
            text: page.toString()
          }));
        } else {
          pagesDiv.appendChild(createElement('a', {
            className: 'pagination-page pagination-link',
            text: page.toString(),
            attrs: {href: createPageUrl(page)}
          }));
        }
      });
      fragment.appendChild(pagesDiv);
    })();

    (function appendNextLink() {
      let nav;
      if (next !== null) {
        nav = createElement('a', {className: 'pagination-nav pagination-link', attrs: {href: createPageUrl(next)}});
      } else {
        nav = createElement('span', {className: 'pagination-nav disabled'});
      }
      nav.appendChild(createElement('span', {
        text: translate('post.next.link'),
        dataset: {i18nId: 'post.next.link', i18nText: ''}
      }));
      nav.appendChild(document.createTextNode(' '));
      nav.appendChild(createElement('i', {className: 'icon-forward'}));
      fragment.appendChild(nav);
    })();

    paginationNav.replaceChildren(fragment);
    paginationNav.classList.remove('hidden');
  }
});