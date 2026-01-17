// Click a <pre><code> block to select and copy its contents to the clipboard (unused).
(function () {
  /**
   * Select all text content within an element
   * @param {HTMLElement} element - The element whose content should be selected
   */
  function select(element) {
    const selection = window.getSelection();

    const range = document.createRange();
    range.selectNodeContents(element);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  document.querySelectorAll("pre code").forEach(code => {
    code.addEventListener("click", function (event) {
      if (window.getSelection().toString()) {
        return;
      }
      select(code.parentElement);

      if (navigator.clipboard) {
        navigator.clipboard.writeText(code.parentElement.textContent);
      }
    });
  });
})();