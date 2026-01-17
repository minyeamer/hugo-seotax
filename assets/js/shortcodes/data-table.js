/**
 * Generate CSV from data table and trigger a file download.
 * @param {HTMLButtonElement} button - Download button element
 */
function downloadCSV(button) {
  const fileName = button.dataset.filename;

  if (!fileName) return;
  const table = document.querySelector(`.data-table[data-filename="${fileName}"]`);
  if (!table) return;

  const delimiter = button.dataset.delimiter;
  const rows = table2rows(table);
  const csvContent = rows.map(row => {
    return row.map(value => escapeCSValue(value, delimiter)).join(',');
  }).join('\n');
  triggerCSVDownload(csvContent, fileName);
}

/**
 * Extract table headers and rows into a 2D array.
 * @param {HTMLTableElement} table - Table element to extract each rows
 * @returns {Array<Array<string>>} Array of rows, each row is an array of cell values
 */
function table2rows(table) {
  const rows = [];
  const headers = table.querySelectorAll('thead th');
  const valueRows = table.querySelectorAll('tbody tr');

  const headerRow = Array.from(headers).map(cell =>
    cell.getAttribute('title') || cell.textContent.trim()
  );
  rows.push(headerRow);

  valueRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const values = Array.from(cells).map(cell =>
      cell.getAttribute('title') || cell.textContent.trim()
    );
    rows.push(values);
  });

  return rows;
}

/**
 * Escape a cell value for CSV output.
 * @param {string} value - Cell value to escape
 * @param {string} delimiter - Original delimiter used in data table
 * @returns {string} Escaped cell value
 */
function escapeCSValue(value, delimiter) {
  const hasComma = value.includes(',');

  if (delimiter !== ',' && hasComma) {
    // If original delimiter is not comma, escape commas in values
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  else if (hasComma || value.includes('"') || value.includes('\n')) {
    // Standard CSV escaping: if contains comma, quote, or newline
    const escaped = value.replace(/"/g, '""');
    return `"${escaped}"`;
  }
  else {
    return value;
  }
}

/**
 * Trigger CSV file download
 * @param {string} csvContent - CSV content to download
 * @param {string} fileName - file name to save
 * @returns {void}
 */
function triggerCSVDownload(csvContent, fileName) {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Move caption out of the scrollable table to the wrapper when it overflows
 */
window.addEventListener('load', function() {
  const contentWrap = document.getElementById('content-wrap');
  if (!contentWrap) return;
  const wrapWidth = contentWrap.offsetWidth;

  document.querySelectorAll('.sc-data-table').forEach(wrapper => {
    const tableWidth = wrapper.querySelector('thead').offsetWidth;

    if (tableWidth > wrapWidth) {
      const caption = wrapper.querySelector('.data-table-caption');
      wrapper.insertBefore(caption, wrapper.firstChild);
      wrapper.classList.add('overflow');
    }
  });
});