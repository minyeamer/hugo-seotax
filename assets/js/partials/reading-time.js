(function() {
  'use strict';

  /**
   * Safely get translation for the given i18n id using the initial language.
   * @param {string} id
   * @param {string} [defaults='']
   * @returns {string}
   */
  function translate(id, defaults = '') {
    return (window.siteI18n && typeof window.siteI18n.translate === 'function')
      ? window.siteI18n.translate(id, defaults)
      : defaults;
  }

  /**
   * Estimates the reading time of a given element based on its content.
   * @param {HTMLElement} element - The content element to analyze
   * @returns {number} Estimated reading time in seconds
   */
  function estimateReadingTime(element) {
    const AVG_WORD_LEN = 4.7;
    const sum = (a) => a.reduce((acc, cur) => acc + cur, 0);

    // 1. Proximity Detection & Text Preparation
    const contentClone = element.cloneNode(true);

    // Handle Tabbed content: Only keep the first tab content to avoid double counting hidden text
    contentClone.querySelectorAll('.sc-tabs').forEach(tabContainer => {
      const contents = tabContainer.querySelectorAll('.sc-tabs-content');
      contents.forEach((content, idx) => {
        if (idx > 0) content.remove();
      });
    });

    // Remove excluded elements
    const EXCLUDE_SELECTORS = '.sc-bookmark-card, .data-table, .sc-button, .sc-badge, i.fa-solid, i.fa-regular';
    contentClone.querySelectorAll(EXCLUDE_SELECTORS).forEach(el => el.remove());

    const elements = contentClone.querySelectorAll('pre, img, table, iframe');
    const items = [];

    elements.forEach((el, i) => {
      const tagName = el.tagName.toLowerCase();
      // Treat 'pre' and 'table' as 'block', 'iframe' as 'media', 'img' as 'img'
      let type;
      if (tagName === 'pre' || tagName === 'table') {
        type = 'block';
      } else if (tagName === 'iframe') {
        type = 'media';
      } else {
        type = 'img';
      }
      const item = { type, i };

      item.words = el.textContent.split(/\s+/).filter(Boolean).length;
      if (tagName === 'pre') {
        item.lines = el.textContent.split('\n').length;
      } else if (tagName === 'table') {
        item.lines = el.querySelectorAll('tr').length;
      }

      items.push(item);

      const marker = document.createTextNode(`__MARKER_${i}__`);
      el.parentNode.replaceChild(marker, el);
    });

    const fullText = contentClone.textContent;
    let blockSeconds = 0;
    let imageSeconds = 0;

    items.forEach((item, idx) => {
      const currentMarker = `__MARKER_${item.i}__`;
      let isConsecutive = false;

      if (idx > 0) {
        const prevMarker = `__MARKER_${items[idx-1].i}__`;
        const start = fullText.indexOf(prevMarker) + prevMarker.length;
        const end = fullText.indexOf(currentMarker);
        const textBetween = fullText.substring(start, end);
        // If text between same-type elements is very short (< 10 chars), consider them consecutive
        if (textBetween.trim().length < 10 && items[idx-1].type === item.type) {
          isConsecutive = true;
        }
      }

      if (item.type === 'block') {
        // First block max 20s, consecutive blocks max 5s
        const maxTime = isConsecutive ? 5 : 20;
        const timeByLines = 3 + (item.lines * 0.5);
        const timeByWords = (item.words / 238) * 60;
        blockSeconds += Math.min(maxTime, timeByLines, timeByWords);
      } else if (item.type === 'media') {
        // Assign 30s for external media like YouTube
        blockSeconds += 20;
      } else {
        // First image 10s, consecutive images 2s
        imageSeconds += isConsecutive ? 2 : 10;
      }
    });

    // 2. Clean text for script analysis and URLs (starting with http:// or https://)
    const text = fullText.replace(/__MARKER_\d+__/g, '').replace(/https?:\/\/[^\s]+/g, '');

    // 3. Measure word/character counts by script
    const words = text.split(/\s+/).filter(Boolean);
    let latinWords = 0;
    let hangulWords = 0;

    words.forEach(w => {
      if (/\p{Script=Latin}/u.test(w)) latinWords++;
      else if (/\p{Script=Hangul}/u.test(w)) hangulWords++;
    });

    const hanChars = (text.match(/\p{Script=Han}/gu) || []).length;
    const kanaChars = (text.match(/[\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length;

    // 4. Other elements (math formulas)
    const maths = contentClone.querySelectorAll('.mjx-chtml, .katex');
    const mathsWords = sum(Array.from(maths).map(e => e.textContent.replace(/[^a-zA-Z0-9]+/gi, ' ').split(/\s+/).filter(Boolean).length));

    // 5. Calculate total time by applying WPM/CPM for each language
    // Latin: 238 WPM, Hangul: 160 WPM, Han (CN/JP Kanji): 160 CPM, Kana: 500 CPM
    const textMinutes = (
      (latinWords / 238) +
      (hangulWords / 160) +
      (hanChars / 200) +
      (kanaChars / 500) +
      (mathsWords / 238 / AVG_WORD_LEN));

    const totalSeconds = (textMinutes * 60) + blockSeconds + imageSeconds;
    return Math.round(totalSeconds);
  }

  /**
   * Formats the reading time in seconds into a localized string.
   * @param {number} seconds - Total reading time in seconds
   * @returns {HTMLSpanElement} Span element containing the formatted reading time
   */
  function createReadingTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const span = document.createElement('span');
    let i18nData;
    if (hours > 0) {
      i18nData = {id: 'reading.time.hour', params: `{"%h": ${hours}, "%m": ${minutes}}`};
      const readFormat = translate(i18nData.id, '%h hr %m min read');
      span.textContent = readFormat.replace('%h', hours).replace('%m', minutes);
    } else if (minutes > 0) {
      i18nData = {id: 'reading.time.min', params: `{"%m": ${minutes}}`};
      const readFormat = translate(i18nData.id, '%m min read');
      span.textContent = readFormat.replace('%m', minutes);
    } else {
      i18nData = {id: 'reading.time.sec', params: `{"%s": ${remainingSeconds}}`};
      const readFormat = translate(i18nData.id, '%s sec read');
      span.textContent = readFormat.replace('%s', remainingSeconds);
    }
    span.dataset['i18nId'] = i18nData.id;
    span.dataset['i18nText'] = i18nData.params;
    return span;
  }

  /**
   * Initializes the reading time calculation and updates the target element.
   */
  const init = () => {
    const content = document.querySelector('.content-wrap.markdown');
    const target = document.getElementById('reading-time');

    if (content && target) {
      const seconds = estimateReadingTime(content);
      target.textContent = ' • ';
      target.appendChild(createReadingTime(seconds));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();