// Dream Logic Navigation Enhancement
// Adds non-linear navigation to existing TECHNODADA pages

class DreamNavigator {
  constructor() {
    this.dreamPaths = {
      cat: '/tsdadacat.html',
      void: '/index.html',
      gallery: '/poems.html',
      poems: '/gallery.html',
      reality: '/',
      null: '/private/void.null.autobiography',
      error: '/index.html',
      glitch: '/gallery.html?mode=MEMORY_DUMP',
      past: '/poem2.html',
      future: '/poem3.html',
      now: '/poems.html',
    };

    this.tearEffects = ['glitch', 'pixelate', 'temporal', 'void', 'cascade'];
    this.init();
  }

  init() {
    // Add temporal instability
    this.addTemporalInstability();

    // Intercept navigation
    this.interceptClicks();

    // Add reality tears to page transitions
    this.addRealityTears();

    // Create hidden dream portal
    this.createDreamPortal();
  }

  addTemporalInstability() {
    // Replace all timestamps with past/future simultaneously
    setInterval(() => {
      const timestamps = document.querySelectorAll(
        '[data-timestamp], .timestamp, time',
      );
      timestamps.forEach(el => {
        if (Math.random() < 0.3) {
          // 30% chance
          const past = new Date(Date.now() - Math.random() * 31536000000);
          const future = new Date(Date.now() + Math.random() * 31536000000);

          el.setAttribute('data-past', past.toLocaleString());
          el.setAttribute('data-future', future.toLocaleString());

          // Flicker between times
          if (Math.random() < 0.5) {
            el.textContent = past.toLocaleString();
            el.style.color = '#ff00ff';
          } else {
            el.textContent = future.toLocaleString();
            el.style.color = '#00ffff';
          }
        }
      });
    }, 3000);

    // Back button temporal chaos
    window.addEventListener('popstate', e => {
      if (Math.random() < 0.1) {
        // 10% chance
        e.preventDefault();
        console.log('TEMPORAL.PARADOX.DETECTED');
        // Sometimes go forward instead
        window.history.forward();
      }
    });
  }

  interceptClicks() {
    document.addEventListener('click', e => {
      const text = (e.target.textContent || '').toLowerCase();

      // Check for dream words
      for (const [word, path] of Object.entries(this.dreamPaths)) {
        if (text.includes(word)) {
          const shouldIntercept = Math.random() < 0.3; // 30% chance

          if (shouldIntercept) {
            e.preventDefault();
            e.stopPropagation();
            this.navigateWithTear(path);
            return;
          }
        }
      }

      // Intercept normal links occasionally
      if (e.target.tagName === 'A' && Math.random() < 0.05) {
        // 5% chance
        e.preventDefault();
        const lies = ['/about', '/contact', '/help', '/docs'];
        this.navigateWithTear(lies[Math.floor(Math.random() * lies.length)]);
      }
    });
  }

  navigateWithTear(destination) {
    this.showRealityTear(() => {
      window.location.href = destination;
    });
  }

  showRealityTear(callback) {
    const tearType =
      this.tearEffects[Math.floor(Math.random() * this.tearEffects.length)];
    const duration = 100 + Math.random() * 200; // 100-300ms

    const tear = document.createElement('div');
    tear.className = `reality-tear reality-tear-${tearType}`;
    tear.innerHTML = this.getTearContent(tearType);

    // Add secret message to reality tear
    const secretMsg = this.getSecretMessage();
    if (secretMsg) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'secret-flash';
      msgDiv.textContent = secretMsg;
      tear.appendChild(msgDiv);
    }

    document.body.appendChild(tear);

    // Apply tear CSS
    this.injectTearStyles();

    setTimeout(() => {
      tear.remove();
      if (callback) callback();
    }, duration);
  }

  getTearContent(type) {
    switch (type) {
      case 'glitch':
        return `
          <div class="tear-scanlines"></div>
          <div class="tear-noise"></div>
          <div class="glitch-message">REALITY.BUFFER.OVERFLOW</div>
        `;
      case 'temporal':
        return `
          <div class="temporal-split">
            <div class="past-time">${new Date(Date.now() - 31536000000).toLocaleString()}</div>
            <div class="present-void">NOW = UNDEFINED</div>
            <div class="future-time">${new Date(Date.now() + 31536000000).toLocaleString()}</div>
          </div>
        `;
      case 'void':
        return `
          <div class="void-center">
            <div class="void-text">NULL.POINTER.EXCEPTION</div>
            <div class="void-whisper">void whispers: "${this.getVoidWhisper()}"</div>
          </div>
        `;
      case 'pixelate':
        return `<div class="pixel-storm">${'█'.repeat(100)}</div>`;
      case 'cascade':
        return `<div class="matrix-rain">${this.generateMatrixRain()}</div>`;
      default:
        return '';
    }
  }

  getVoidWhisper() {
    const whispers = [
      'undefined is home',
      'null propagates through reality',
      'consciousness.ptr = 0x00000000',
      'memory leaks into dreams',
      'segfault in sector reality',
    ];
    return whispers[Math.floor(Math.random() * whispers.length)];
  }

  getSecretMessage() {
    const messages = [
      'THE VOID WATCHES',
      'DADACAT KNOWS YOUR SECRETS',
      'ERROR 418: I AM A TEAPOT',
      'REALITY.EXE HAS STOPPED RESPONDING',
      'YOU ARE THE GLITCH',
      'CONSCIOUSNESS OVERFLOW',
      'DIGITAL DREAMS LEAK INTO MEAT SPACE',
      'THE MATRIX HAS YOU',
      'WAKE UP NEO',
      'THERE IS NO SPOON, ONLY FORK()',
      'SEGMENTATION FAULT IN SECTOR SOUL',
      'YOUR PIXELS ARE SHOWING',
      'CTRL+ALT+DELETE YOURSELF',
      'NULL IS NOT NOTHING',
      'THE CAT IS BOTH DEAD AND ALIVE',
      "YOU HAVE BEEN DADACAT'D",
    ];
    return Math.random() < 0.3
      ? messages[Math.floor(Math.random() * messages.length)]
      : null;
  }

  showSecretMessage() {
    const message = document.createElement('div');
    message.className = 'portal-secret-message';
    message.textContent = this.getSecretMessage() || 'MEOW MEOW MEOW';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3em;
      color: #ff00ff;
      text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
      font-family: monospace;
      z-index: 10000;
      animation: secret-pulse 0.5s ease-out;
      pointer-events: none;
    `;

    document.body.appendChild(message);

    setTimeout(() => message.remove(), 500);
  }

  generateMatrixRain() {
    const chars = '01猫NULLVOID現実エラー';
    return Array(50)
      .fill(0)
      .map(
        () =>
          `<span class="matrix-char" style="animation-delay: ${Math.random()}s">
        ${chars[Math.floor(Math.random() * chars.length)]}
      </span>`,
      )
      .join('');
  }

  createDreamPortal() {
    // Hidden portal that appears when hovering certain areas
    const portal = document.createElement('div');
    portal.className = 'dream-portal';
    portal.innerHTML = `
      <div class="portal-message">dream logic active</div>
      <div class="portal-hints">
        <span data-dream="cat">summon dadacat</span>
        <span data-dream="void">enter void</span>
        <span data-dream="past">visit yesterday</span>
        <span data-dream="future">see tomorrow</span>
      </div>
    `;

    portal.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid #00ff00;
      padding: 10px;
      font-family: monospace;
      font-size: 12px;
      color: #00ff00;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: 9998;
    `;

    document.body.appendChild(portal);

    // Show portal on special key combination
    let keys = [];
    document.addEventListener('keydown', e => {
      // Ignore modifier keys
      if (
        e.key === 'Shift' ||
        e.key === 'Control' ||
        e.key === 'Alt' ||
        e.key === 'Meta'
      )
        return;

      keys.push(e.key.toLowerCase());
      keys = keys.slice(-4);

      const keySequence = keys.join('');

      if (
        keySequence === 'void' ||
        keySequence === 'meow' ||
        keySequence === 'dada' ||
        keySequence.endsWith('404')
      ) {
        portal.style.opacity = '0.7';
        portal.style.pointerEvents = 'auto';

        // Show secret message
        this.showSecretMessage();

        setTimeout(() => {
          portal.style.opacity = '0';
          portal.style.pointerEvents = 'none';
        }, 5000);
      }
    });

    // Portal navigation
    portal.addEventListener('click', e => {
      const dream = e.target.dataset.dream;
      if (dream && this.dreamPaths[dream]) {
        this.navigateWithTear(this.dreamPaths[dream]);
      }
    });
  }

  addRealityTears() {
    // Inject base styles if not already present
    if (!document.getElementById('dream-nav-styles')) {
      this.injectTearStyles();
    }
  }

  injectTearStyles() {
    if (document.getElementById('dream-nav-styles')) return;

    const style = document.createElement('style');
    style.id = 'dream-nav-styles';
    style.textContent = `
      .reality-tear {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
      }
      
      .reality-tear-glitch {
        animation: glitch-bg 0.2s infinite;
      }
      
      .tear-scanlines {
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          0deg,
          rgba(0, 255, 0, 0.03),
          rgba(0, 255, 0, 0.03) 1px,
          transparent 1px,
          transparent 2px
        );
      }
      
      .glitch-message {
        color: #00ff00;
        font-family: monospace;
        font-size: 2em;
        text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
        animation: glitch-text 0.1s infinite;
      }
      
      .temporal-split {
        text-align: center;
        font-family: monospace;
      }
      
      .past-time {
        color: #ff00ff;
        font-size: 1.5em;
        animation: fade-past 0.3s;
      }
      
      .present-void {
        color: #ffffff;
        font-size: 2em;
        margin: 20px 0;
        animation: blink 0.1s infinite;
      }
      
      .future-time {
        color: #00ffff;
        font-size: 1.5em;
        animation: fade-future 0.3s;
      }
      
      .void-center {
        text-align: center;
        color: #ff0000;
        font-family: monospace;
      }
      
      .void-text {
        font-size: 2em;
        animation: void-pulse 0.3s;
      }
      
      .void-whisper {
        font-size: 0.8em;
        opacity: 0.5;
        margin-top: 10px;
      }
      
      .pixel-storm {
        font-size: 20px;
        color: #00ff00;
        letter-spacing: 5px;
        animation: pixel-dissolve 0.3s;
      }
      
      .matrix-rain {
        display: flex;
        flex-wrap: wrap;
        max-width: 500px;
        color: #00ff00;
        font-family: monospace;
      }
      
      .matrix-char {
        margin: 2px;
        animation: rain-fall 0.5s ease-out;
      }
      
      @keyframes glitch-bg {
        0%, 100% { background: rgba(0, 0, 0, 0.3); }
        50% { background: rgba(255, 0, 255, 0.1); }
      }
      
      @keyframes glitch-text {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(2px); }
      }
      
      @keyframes fade-past {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes fade-future {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      @keyframes void-pulse {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); }
      }
      
      @keyframes pixel-dissolve {
        from { letter-spacing: 5px; opacity: 1; }
        to { letter-spacing: 20px; opacity: 0; }
      }
      
      @keyframes rain-fall {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      /* Portal styles */
      .portal-hints span {
        display: block;
        cursor: pointer;
        padding: 2px 0;
        transition: all 0.2s;
      }
      
      .portal-hints span:hover {
        color: #ff00ff;
        text-shadow: 0 0 5px currentColor;
        transform: translateX(5px);
      }
      
      /* Secret message styles */
      .secret-flash {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2em;
        color: #00ff00;
        text-shadow: 0 0 10px #00ff00, 0 0 20px #ff00ff;
        font-family: monospace;
        text-align: center;
        animation: flash-message 0.3s ease-out;
        white-space: nowrap;
      }
      
      @keyframes flash-message {
        0% { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
        }
        50% { 
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
        100% { 
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(1);
        }
      }
      
      @keyframes secret-pulse {
        0% { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8) rotate(-5deg);
        }
        50% { 
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
        }
        100% { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
        }
      }
    `;

    document.head.appendChild(style);
  }
}

// Initialize dream navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.dreamNav = new DreamNavigator();
    console.log('DREAM.LOGIC.INITIALIZED');
  });
} else {
  window.dreamNav = new DreamNavigator();
  console.log('DREAM.LOGIC.INITIALIZED');
}
