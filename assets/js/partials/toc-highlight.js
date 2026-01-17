document.addEventListener('DOMContentLoaded', function() {
  /**
   * Get headings based on ToC config start and end levels
   * @returns {NodeList} - The headings to observe
   */
  const config = document.querySelector('#toc-config');
  if (!config) return;

  function getHeadings() {
    const start = parseInt(config.dataset.start) || 2;
    const end = parseInt(config.dataset.end) || 3;
    const selectors = Array.from({ length: end - start + 1 }, (_, i) => `h${start + i}[id]`);
    return document.querySelectorAll(selectors.join(', '));
  }

  /**
   * Get the visible Table of Contents element
   * @returns {HTMLElement} - The visible ToC element
   */
  function getVisibleToc() {
    const toc = document.querySelector('.site-toc');

    if (toc) {
      const style = window.getComputedStyle(toc);
      if (style.visibility === 'visible') {
        return toc.querySelector('#TableOfContents');
      }
    }

    return document.querySelector('#TableOfContents');
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const toc = getVisibleToc()
      const tocLinks = toc.querySelectorAll('a');
      const tocLinkActive = toc.querySelector(`a[href="#${id}"]`);

      if (tocLinkActive) {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => link.classList.remove('active'));
          tocLinkActive.classList.add('active');
        }
      }
    });
  }, {
    rootMargin: '0px 0px -70% 0px'
  });

  getHeadings().forEach(heading => {
    observer.observe(heading);
  });
});