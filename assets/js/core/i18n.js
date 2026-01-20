/**
 * NOTE: Core i18n functions (initData, getLanguage, translate) are now defined inline in `head.html`
 * for immediate availability to all scripts. This file only handles DOM-based translations.
 */

/**
 * Apply i18n translations to DOM elements on DOMContentLoaded and handle language selector changes.
 */
window.addEventListener('DOMContentLoaded', function() {
  /**
   * Apply translations to elements with i18n id.
   * @param {string} lang
   */
  function setLanguage(lang) {
    const translations = window.siteI18n.data[lang];
    if (!translations) return;

    document.querySelectorAll('[data-i18n-id]').forEach(el => {
      const dataset = el.dataset;
      const text = translations[dataset.i18nId];
      if (!text) return;

      if ('i18nText' in dataset) {
        applyI18nText(el, text);
      }
      if ('i18nAttrs' in dataset) {
        applyI18nAttrs(el, text);
      }
      if ('i18nDatetime' in dataset) {
        applyI18nDatetime(el, text);
      }
    });
  }

  /**
   * @param {HTMLElement} el - Element with i18n id
   * @param {string} text - Translated text
   */
  function applyI18nText(el, text) {
    const value = el.dataset.i18nText;

    if (value !== '') {
      try {
        const params = JSON.parse(value || '{}');
        Object.keys(params).forEach(target => {
          let replaceTo = params[target];
          if ((typeof replaceTo === 'string') && replaceTo.startsWith('$')) {
            replaceTo = el.querySelector(replaceTo.slice(1)).outerHTML;
          }
          text = text.replace(target, replaceTo);
        });
        el.innerHTML = text;
      } catch (error) {
        console.error(error);
      }
    } else {
      el.textContent = text;
    }
  }

  /**
   * @param {HTMLElement} el - Element with i18n id
   * @param {string} text - Translated text
   */
  function applyI18nAttrs(el, text) {
    el.dataset.i18nAttrs.split(',').forEach(attr => {
      el.setAttribute(attr, text);
    });
  }

  /**
   * @param {HTMLElement} el - Element with i18n id
   * @param {string} fmt - Translated datetime format
   */
  function applyI18nDatetime(el, fmt) {
    const datetime = new Date(el.getAttribute('datetime'));
    el.textContent = strftime(fmt, datetime);
  }

  /**
   * Format a Date using Hugo format strings like "2006-01-02"
   * @param {string} fmt - Translated datetime format
   * @param {Date} date - Date instance to format
   * @returns {string} Translated datetime string
   */
  function strftime(fmt, date = new Date()) {
    const pad2 = n => String(n).padStart(2, '0');
    const yearFull = date.getFullYear();
    const year2 = String(yearFull).slice(-2);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours24 = date.getHours();
    const hours12 = ((hours24 + 11) % 12) + 1;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';

    // timezone short name if available
    const tzShort = (() => {
      try {
        const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(date);
        const tz = parts.find(p => p.type === 'timeZoneName');
        return tz ? tz.value : '';
      } catch (e) {
        return '';
      }
    })();

    // timezone offset e.g. -0700 or -07:00
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const offHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offMinutes = Math.abs(offsetMinutes) % 60;
    const tzNoColon = `${sign}${pad2(offHours)}${pad2(offMinutes)}`;
    const tzWithColon = `${sign}${pad2(offHours)}:${pad2(offMinutes)}`;

    // weekday/month names
    const weekdayShort = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date); // Mon
    const weekdayLong = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date); // Monday
    const monthShort = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date); // Jan
    const monthLong = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date); // January

    // token list sorted by length (longer first) to avoid partial replacements
    const tokens = {
      '2006': String(yearFull),
      '06': year2,
      'January': monthLong,
      'Jan': monthShort,
      '01': pad2(month),
      '1': String(month),
      '02': pad2(day),
      '2': String(day),
      '15': String(hours24),
      '03': pad2(hours12),
      '3': String(hours12),
      '04': pad2(minutes),
      '4': String(minutes),
      '05': pad2(seconds),
      '5': String(seconds),
      'PM': ampm,
      'pm': ampm.toLowerCase(),
      'MST': tzShort,
      '-0700': tzNoColon,
      '-07:00': tzWithColon,
      'Mon': weekdayShort,
      'Monday': weekdayLong
    };

    // build regex from tokens
    const keys = Object.keys(tokens).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const re = new RegExp(keys.join('|'), 'g');

    return String(fmt).replace(re, match => tokens[match] !== undefined ? tokens[match] : match);
  }

  const selector = document.getElementById('i18n-selector');
  const storageKey = 'site-language';

  window.siteI18n.initData()
  .then(() => {
    const lang = window.siteI18n.getLanguage(window.siteI18n.data);
    setLanguage(lang);

    // Setup i18n selector if exists
    if (selector) {
      selector.value = lang;
      selector.addEventListener('change', (e) => {
        localStorage.setItem(storageKey, e.target.value);
        setLanguage(e.target.value);
      });
    }

  })
  .catch(() => {
    if (selector) {
      selector.value = window.siteI18n.defaultLang;
    }
  });
});