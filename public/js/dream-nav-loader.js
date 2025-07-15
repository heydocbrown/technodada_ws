// Dream Navigation Loader
// Loads dream navigation on all pages

(function () {
  // Create script element
  const script = document.createElement('script');
  script.type = 'module';
  script.src = '/js/modules/dream-nav.js';

  // Add to document
  document.head.appendChild(script);
})();
