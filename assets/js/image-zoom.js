(function() {
  'use strict';

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Find all checked image toggles and uncheck them
      const imageToggles = document.querySelectorAll('.sc-image input.toggle:checked, .md-image input.toggle:checked');
      imageToggles.forEach(function(toggle) {
        toggle.checked = false;
      });
    }
  });
})();
