document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.querySelector('.scroll-progress-bar');

  if (!progressBar) return;

  /**
   * Update the scroll progress bar width based on current scroll position
   */
  function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = scrollProgress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
});