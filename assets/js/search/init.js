{{ $searchConfig := i18n "search.index.config" | default "{}" }}

window.siteSearch.getIndexConfig = function() {
  return Object.assign({{ $searchConfig }}, {
    includeScore: true,
    useExtendedSearch: true,
    fieldNormWeight: 1.5,
    threshold: 0.2,
    ignoreLocation: true,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'content',
        weight: 0.3
      }
    ]
  });
};

/**
 * Initialize Fuse search index
 * @returns {Promise<Fuse>}
 */
window.siteSearch.initIndex = async function() {
  if (window.siteSearch.index) {
    return Promise.resolve(window.siteSearch.index);
  }

  const indexConfig = window.siteSearch.getIndexConfig();

  return fetch(window.siteSearch.contentUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(pages => {
      window.siteSearch.index = new Fuse(pages, indexConfig);
      window.siteSearch.total = pages.length;
      return window.siteSearch.index;
    });
};

/**
 * Initialize categories data
 * @returns {Map}
 */
window.siteSearch.initCategories = async function() {
  if (window.siteSearch.categories) {
    return Promise.resolve(window.siteSearch.categories);
  }

  return fetch(window.siteSearch.categoriesUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(categories => {
      window.siteSearch.categories = categories;
      return window.siteSearch.categories;
    });
};

/**
 * Initialize tags data
 * @returns {Map}
 */
window.siteSearch.initTags = async function() {
  if (window.siteSearch.tags) {
    return Promise.resolve(window.siteSearch.tags);
  }

  return fetch(window.siteSearch.tagsUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(tags => {
      window.siteSearch.tags = tags;
      return window.siteSearch.tags;
    });
};