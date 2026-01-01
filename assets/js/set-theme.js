document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('#theme-toggle-button');
  const storageKey = 'hugo-dark-mode';

  /**
   * Toggle between dark and light theme, reload highlight theme and Disqus if available
   */
  function toggleDarkMode() {
    setTheme(!isDarkTheme());
    loadHighlightTheme();

    if (window.DISQUS && typeof window.reloadDisqus === 'function') {
      window.reloadDisqus();
    }
  }

  /**
   * Set the theme and save preference to localStorage
   * @param {boolean} isDark - True for dark theme, false for light theme
   */
  function setTheme(isDark) {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
  }

  /**
   * Get user's preferred theme from localStorage or system preference
   * @returns {boolean} True if dark theme is preferred, false otherwise
   */
  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Check if the current theme is dark
   * @returns {boolean} True if current theme is dark, false otherwise
   */
  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  /**
   * Load appropriate highlight.js theme based on current dark/light mode
   */
  function loadHighlightTheme() {
    const existingThemes = document.querySelectorAll('link[href*="highlight.js"][href*="styles"]');
    existingThemes.forEach(theme => theme.remove());

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = isDarkTheme() 
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/vs2015.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/xcode.min.css';

    document.head.appendChild(link);
    link.onload = function() {
      if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code:not(.hljs)').forEach((block) => {
          hljs.highlightElement(block);
        });

        if (typeof hljs.initLineNumbersOnLoad === 'function') {
          hljs.initLineNumbersOnLoad();
        }
      }
    };
  }

  setTheme(getPreferredTheme());
  loadHighlightTheme();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  }

  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 's') {
      e.preventDefault();
      toggleDarkMode();
    }
  });
});