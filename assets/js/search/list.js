document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.pathname.startsWith('/search/')) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const state = {
    query: params.get('query') || '',
    category1: (params.get('category1') || '').toLowerCase(),
    category2: (params.get('category2') || '').toLowerCase(),
    tags: (params.get('tags')
      ? params.get('tags').split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag)
      : []),
    tagsOp: params.get('tagsOp') || 'and',
    page: Math.max(1, parseInt(params.get('page')) || 1),
    pageSize: Math.max(1, parseInt(params.get('pageSize')) || 10)
  };
  const searchData = document.querySelector('#search-data');
  const searchResults = document.querySelector('#search-results');
  const noResults = document.querySelector('#search-no-results');

  switch (getSearchType(state)) {

    case 'search':
      window.siteSearch.initIndex().then(() => {
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
      window.siteSearch.initIndex().then(() => {
        clearHeader();
        appendListHeader('{{ i18n "Search Results" | default "Search results" }}', 'fa-magnifying-glass', 0, '');
        displayResults(new Set());
      });
      break;
  }

  /**
   * Determine the type of search based on the current state.
   * @param {Object} state - The current search state
   * @returns {'search'|'category1'|'category2'|'tags'|'combined'|'none'} - The search type
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
      else return 'none';
    }
  }

  /**
   * URL-encode a string value for use in query parameters.
   * @param {string} value - The string to encode
   * @returns {string} - The URL encoded string
   */
  function urlencode(value) {
    return value ? encodeURIComponent(value.toLowerCase())
      .replace(/[!'()*~]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    }) : '';
  }

  /**
   * Capitalize the first letter of each word in a string.
   * @param {string} value - The string to capitalize
   * @returns {string} The capitalized string
   */
  function capitalize(value) {
    return value ? value.split(' ').map(v => v ? v.charAt(0).toUpperCase() + v.slice(1) : '').join(' ') : '';
  }

  /**
   * Clear the list header and taxonomy section.
   */
  function clearHeader() {
    const header = document.querySelector('#list-header');
    header.replaceChildren();

    const section = document.querySelector('#taxonomy-section');
    if (section.classList.contains('hidden')) {
      section.classList.add('hidden');
      section.replaceChildren();
    }
  }

  /**
   * Append a header to the list with title, icon, and result count.
   * @param {string} titleText - The title text to display
   * @param {string} titleIcon - The Font Awesome icon class
   * @param {number} pageCount - The number of results
   * @param {string} [query=''] - The search query (optional)
   */
  function appendListHeader(titleText, titleIcon, pageCount, query = '') {
    const fragment = document.createDocumentFragment();
    const header = document.querySelector('#list-header');

    const title = document.createElement('h1');
    title.innerHTML = `<i class="fa-solid ${titleIcon}"></i> ${titleText}`;
    fragment.appendChild(title);

    const subtitle = document.createElement('p');
    const countLabel = `<em class="list-count">${pageCount}</em>`;
    if (query) {
      const searchLabel = '{{ i18n "Search Label" | default `%s results for "%q"` }}'.replace('%q', query)
      subtitle.innerHTML = searchLabel.replace('%s', countLabel);
    } else {
      subtitle.innerHTML = '{{ i18n "List Label" | default "%s posts" }}'.replace('%s', countLabel);
    }

    fragment.appendChild(subtitle);
    header.appendChild(fragment);
  }

  /**
   * Append a taxonomy section with category or tag chips.
   * @param {string} labelText - The section label text
   * @param {Object[]} taxonomies - Array of taxonomy objects to display
   */
  function appendTaxonomySection(labelText, taxonomies) {
    const fragment = document.createDocumentFragment();
    const section = document.querySelector('#taxonomy-section');
    section.classList.remove('hidden');

    const label = document.createElement('h2');
    label.textContent = labelText;
    fragment.appendChild(label);

    const chips = document.createElement('div');
    chips.className = 'taxonomy-chips';

    taxonomies.forEach(taxonomy => {
      const chip = createTaxonomyChip(taxonomy);
      chips.appendChild(chip);
    });

    fragment.appendChild(chips);
    section.appendChild(fragment);
  }

  /**
   * Create a single taxonomy chip element with link and count.
   * @param {Object} options - The chip configuration
   * @param {string} options.text - The chip text
   * @param {string} options.icon - The Font Awesome icon class
   * @param {string} options.href - The link URL
   * @param {number} options.pageCount - The number of pages in this taxonomy
   * @returns {HTMLElement} The created chip element
   */
  function createTaxonomyChip({text, icon, href, pageCount}) {
    const chip = document.createElement('div');
    chip.className = 'taxonomy-chip';

    const a = document.createElement('a');
    a.href = href;
    a.className = 'taxonomy-link';

    const span = document.createElement('span');
    const countLabel = `<span class="taxonomy-count">(${pageCount})</span>`;
    span.className = 'taxonomy-name';
    span.innerHTML = `<i class="fa-solid ${icon}"></i> ${text} ${countLabel}`;

    a.appendChild(span);
    chip.appendChild(a);
    return chip;
  }

  /**
   * Search for posts matching the query string.
   * @param {Object} state - The current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {number[]} Array of matching post IDs
   */
  function searchQuery(state, appendHeader = false) {
    const searchHits = window.siteSearch.index.search(state.query);
    const searchPosts = new Set(searchHits.map(result => result.item.id));

    if (appendHeader) {
      clearHeader();
      appendListHeader('{{ i18n "Search Results" | default "Search results" }}', 'fa-magnifying-glass', searchPosts.size, state.query);
    }

    return searchPosts;
  }

  /**
   * Search for posts in a specific parent category.
   * @param {Object} state - The current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchCategory1(state, appendHeader = false) {
    const category1 = window.siteSearch.categories[state.category1];
    const hasCategory1 = (category1 instanceof Object) && (Object.keys(category1).length > 0);
    const category1Name = hasCategory1 ? category1['A']['name'] : capitalize(state.category1);
    const category1Posts = hasCategory1 ? category1['A']['ids'] : [];

    if (appendHeader) {
      clearHeader();
      appendListHeader(category1Name, "fa-folder", category1Posts.length);

      const taxonomies = Object.keys(category1).toSorted()
        .filter(key => (key !== 'A') && (category1[key] instanceof Object))
        .map(key => ({
          text: category1[key]['name'],
          icon: 'fa-file',
          href: `/search/?category1=${category1Name}&category2=${category1[key]['name']}`,
          pageCount: category1[key]['ids'].length,
        }));
      if (taxonomies.length > 0) {
        appendTaxonomySection('{{ i18n "Category Child" | default "Child Category" }}', taxonomies);
      }
    }

    return new Set(category1Posts);
  }

  /**
   * Search for posts in a specific child category.
   * @param {Object} state - The current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchCategory2(state, appendHeader = false) {
    const category1 = window.siteSearch.categories[state.category1];
    const hasCategory1 = (category1 instanceof Object) && (Object.keys(category1).length > 0);
    const category1Name = hasCategory1 ? category1['A']['name'] : '';

    const category2 = hasCategory1 ? category1[state.category2] : null;
    const hasCategory2 = hasCategory1 && (category2 instanceof Object) && (Object.keys(category2).length > 0);
    const category2Name = hasCategory2 ? category2['name'] : capitalize(state.category2);
    const category2Posts = hasCategory2 ? category2['ids'] : [];

    if (appendHeader) {
      clearHeader();
      appendListHeader(category2Name, "fa-file", category2Posts.length);

      if (category1Name) {
        taxonomy = {
          text: category1Name,
          icon: 'fa-folder-open',
          href: `/search/?category1=${category1Name}`,
          pageCount: category1['A']['ids'].length,
        };
        appendTaxonomySection('{{ i18n "Category Parent" | default "Parent Category" }}', [taxonomy]);
      }
    }

    return new Set(category2Posts);
  }

  /**
   * Search for posts matching specific tags (AND/OR operation).
   * @param {Object} state - The current search state
   * @param {boolean} [appendHeader=false] - Whether to append the header
   * @returns {Set.<number>} Set of matching post IDs
   */
  function searchTags(state, appendHeader = false) {
    const tags = window.siteSearch.tags;
    const union = (state.tagsOp === 'or');
    const tagNames = new Array();
    let tagPosts = new Set();

    state.tags.forEach((t, index) => {
      const tag = tags[t];
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
      const hasSingleTag = (tagNames.length === 1);
      const title = hasSingleTag ? tagNames[0] : '{{ i18n "Search Results" | default "Search Results" }}';
      const icon = hasSingleTag ? 'fa-tag' : 'fa-tags';
      appendListHeader(title, icon, tagPosts.size);

      if (!hasSingleTag) {
        const taxonomies = tagNames.toSorted()
          .map(tag => ({
            text: tag,
            icon: 'fa-tag',
            href: `/search/?tags=${tag}`,
            pageCount: tags[tag.toLowerCase()]['ids'].length,
          }));
        if (taxonomies.length > 0) {
          appendTaxonomySection('{{ i18n "Search Tags" | default "Search Tags" }}', taxonomies);
        }
      }
    }

    return tagPosts;
  }

  /**
   * Perform a combined search with query, categories, and tags.
   * @param {Object} state - The current search state
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
      appendListHeader('{{ i18n "Search Results" | default "Search results" }}', 'fa-magnifying-glass', searchPosts.size, state.query);
    }

    return searchPosts;
  }

  /**
   * Clear all search results from the results container.
   */
  function clearResults() {
    searchResults.replaceChildren();
    searchResults.classList.add('hidden');
    noResults.classList.remove('hidden');
  }

  /**
   * Display search results for the current page with pagination.
   * @param {Set.<number>} ids - Set of post IDs to display
   * @param {Object} state - The current search state with page and pageSize
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
   * @param {Object} options - The pagination configuration
   * @param {number} options.cur - The current page number
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
      if (prev !== null) {
        const prevLink = document.createElement('a');
        prevLink.href = createPageUrl(prev);
        prevLink.classList.add('pagination-nav', 'pagination-link');
        prevLink.innerHTML = `<i class="fa-solid fa-backward"></i> {{ i18n "Previous Page" | default "PREV" }}`;
        fragment.appendChild(prevLink);
      } else {
        const prevSpan = document.createElement('span');
        prevSpan.classList.add('pagination-nav', 'disabled');
        prevSpan.innerHTML = `<i class="fa-solid fa-backward"></i> {{ i18n "Previous Page" | default "PREV" }}`;
        fragment.appendChild(prevSpan);
      }
    })();

    (function appendPageLinks() {
      const pagesDiv = document.createElement('div');
      pagesDiv.classList.add('pagination-pages');

      pages.forEach(page => {
        if (page === cur) {
          const currentSpan = document.createElement('span');
          currentSpan.classList.add('pagination-page', 'current');
          currentSpan.id = 'current-page';
          currentSpan.textContent = page;
          pagesDiv.appendChild(currentSpan);
        } else {
          const pageLink = document.createElement('a');
          pageLink.href = createPageUrl(page);
          pageLink.classList.add('pagination-page', 'pagination-link');
          pageLink.textContent = page;
          pagesDiv.appendChild(pageLink);
        }
      });

      fragment.appendChild(pagesDiv);
    })();

    (function appendNextLink() {
      if (next !== null) {
        const nextLink = document.createElement('a');
        nextLink.href = createPageUrl(next);
        nextLink.classList.add('pagination-nav', 'pagination-link');
        nextLink.innerHTML = `{{ i18n "Next Page" | default "NEXT" }} <i class="fa-solid fa-forward"></i>`;
        fragment.appendChild(nextLink);
      } else {
        const nextSpan = document.createElement('span');
        nextSpan.classList.add('pagination-nav', 'disabled');
        nextSpan.innerHTML = `{{ i18n "Next Page" | default "NEXT" }} <i class="fa-solid fa-forward"></i>`;
        fragment.appendChild(nextSpan);
      }
    })();

    paginationNav.replaceChildren(fragment);
    paginationNav.classList.remove('hidden');
  }
});