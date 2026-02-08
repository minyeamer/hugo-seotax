document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('#theme-toggle-button');
  const storageKey = 'hugo-dark-mode';

  /**
   * Set the theme and save preference to localStorage
   * @param {'dark'|'light'} name
   */
  function setTheme(name) {
    const root = document.documentElement;
    root.setAttribute('data-theme', name);
    localStorage.setItem(storageKey, name);
  }

  /**
   * Get user's preferred theme from localStorage or system preference
   * @returns {'dark'|'light'}
   */
  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark') {
      return 'dark';
    } else if (saved === 'light') {
      return 'light';
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return (isDark ? 'light' : 'dark');
    }
  }

  /**
   * Toggle between dark and light theme
   */
  function toggleDarkMode() {
    const isDark = (document.documentElement.getAttribute('data-theme') === 'dark');
    setTheme(isDark ? 'light' : 'dark');

    if (window.DISQUS && typeof window.reloadDisqus === 'function') {
      window.reloadDisqus();
    }
  }

  // Initialize theme on page load
  setTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  }

  // Keyboard shortcut: Cmd/Ctrl + Shift + S
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 's') {
      e.preventDefault();
      toggleDarkMode();
    }
  });
});