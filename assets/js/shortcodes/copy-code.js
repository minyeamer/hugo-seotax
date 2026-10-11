/**
 * Copy code content from a code block to clipboard
 * @param {HTMLElement} button - The copy button that was clicked
 */
function copyCode(button) {
  const codeBlock = button.closest('.sc-codeblock');
  const code = codeBlock?.querySelector('.lntable td:last-child pre code')
    || codeBlock?.querySelector('pre code');

  if (!code) return;

  /**
   * Show success feedback after copying code (changes icon and text temporarily)
   * @param {HTMLElement} button - The copy button to show success state
   */
  function copySuccess(button) {
    const icon = button.querySelector('i');
    const textNode = Array.from(button.childNodes)
      .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());

    if (!icon || !textNode) return;

    const originalClass = icon.className;
    const originalText = textNode.textContent;

    icon.className = 'icon-check';
    textNode.textContent = 'COPIED';
    button.classList.add('copied');

    setTimeout(() => {
      icon.className = originalClass;
      textNode.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }

  /**
   * Fallback copy method using deprecated execCommand for older browsers
   * @param {string} text - The text content to copy
   * @param {HTMLElement} button - The copy button to show success state
   */
  function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0;';

    document.body.appendChild(textarea);
    textarea.select();

    try {
      if (document.execCommand('copy')) {
        copySuccess(button);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    }

    document.body.removeChild(textarea);
  }

  const codeLines = code.querySelectorAll('.hljs-ln-code');
  let text;
  if (codeLines.length) {
    text = Array.from(codeLines)
      .map(line => line.textContent || '')
      .join('\n');
  } else {
    const content = code.cloneNode(true);
    content.querySelectorAll('.lnt, .ln, .hljs-ln-numbers')
      .forEach(lineNumber => lineNumber.remove());
    text = content.textContent || '';
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => copySuccess(button))
      .catch(() => fallbackCopy(text, button));
  } else {
    fallbackCopy(text, button);
  }
}