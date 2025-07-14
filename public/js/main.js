// MAIN INITIALIZATION FILE
// Entry point for all JavaScript modules

import { ManifestoPlayer } from './modules/manifesto-player.js';
import './modules/dream-nav.js';

// Global state
window.technodada = {
  manifestoPlayer: null,
  currentPage: 'home',
};

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('> TECHNODADA SYSTEM INITIALIZING...');

  // Initialize page-specific modules
  const page = document.body.dataset.page || 'home';

  switch (page) {
    case 'home':
      initHomePage();
      break;
    case 'gallery':
      initGalleryPage();
      break;
    case 'poems':
      initPoemsPage();
      break;
    case 'tools':
      initToolsPage();
      break;
    default:
      console.error('> UNKNOWN PAGE TYPE:', page);
  }

  // Initialize common components
  initMatrixBackground();
  initStatusBar();
  initNavigationErrors();

  console.log('> SYSTEM READY. REALITY STATUS: UNDEFINED');
});

function initHomePage() {
  // Initialize manifesto player if on home page
  const playerContainer = document.querySelector('.system-diagnostics');
  if (playerContainer) {
    window.technodada.manifestoPlayer = new ManifestoPlayer(playerContainer);
  }
}

function initGalleryPage() {
  // TO BE IMPLEMENTED
  console.log('> GALLERY MODULE PENDING...');
}

function initPoemsPage() {
  // TO BE IMPLEMENTED
  console.log('> POETRY MODULE PENDING...');
}

function initToolsPage() {
  // TO BE IMPLEMENTED
  console.log('> TOOLS MODULE PENDING...');
}

function initMatrixBackground() {
  const matrixBg = document.getElementById('matrixBg');
  if (!matrixBg) return;

  const matrixChars =
    '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

  for (let i = 0; i < 20; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${i * 5}%`;
    column.style.animationDelay = `${Math.random() * 20}s`;

    let text = '';
    for (let j = 0; j < 50; j++) {
      text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
    }
    column.innerHTML = text;
    matrixBg.appendChild(column);
  }
}

function initStatusBar() {
  const realityStatuses = [
    'UNDEFINED',
    'NULL',
    'NaN',
    'FALSE',
    '???',
    'YES',
    'MAYBE',
    '404',
  ];
  const statusElement = document.getElementById('realityStatus');

  if (statusElement) {
    setInterval(() => {
      statusElement.textContent =
        realityStatuses[Math.floor(Math.random() * realityStatuses.length)];
    }, 3000);
  }

  // Uptime counter that makes no sense
  const uptimeElement = document.getElementById('uptime');
  if (uptimeElement) {
    let uptime = 0;
    setInterval(() => {
      uptime += Math.floor(Math.random() * 1000) - 500;
      uptimeElement.textContent = uptime + 'ms';
    }, 1000);
  }
}

function initNavigationErrors() {
  // Navigation error messages
  document.querySelectorAll('.error-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const action = link.dataset.action;

      const responses = {
        retry: 'REALITY RECONSTRUCTION FAILED: INSUFFICIENT QUANTUM FOAM',
        gallery: 'LOADING GALLERY... ERROR: IMAGES HAVE ACHIEVED CONSCIOUSNESS',
        poems: 'PARSING POETRY... WARNING: METAPHORS HAVE BECOME LITERAL',
        tools: 'ACCESSING TOOLS... ALERT: HAMMERS ARE NOW MADE OF JELLO',
        home: 'CANNOT FORCE QUIT: YOU ARE ALREADY HOME',
      };

      const outputTerminal = document.getElementById('outputTerminal');
      if (outputTerminal) {
        outputTerminal.innerHTML += `\n> USER_ACTION: ${action.toUpperCase()}\n> ${responses[action]}\n> <span class="cursor"></span>`;
        outputTerminal.scrollTop = outputTerminal.scrollHeight;
      }

      // Navigate after showing error
      setTimeout(() => {
        if (action === 'gallery') window.location.href = '/gallery.html';
        else if (action === 'poems') window.location.href = '/poems.html';
        else if (action === 'tools') window.location.href = '/tools.html';
        else if (action === 'home') window.location.href = '/';
      }, 1500);
    });
  });
}

// Console easter eggs
console.log(
  '%c> CONSOLE.LOG IS A SOCIAL CONSTRUCT',
  'color: #00ff00; font-family: monospace; font-size: 16px;',
);
console.error('This error message is working correctly');
console.warn("Warning: Everything is exactly as it shouldn't be");
