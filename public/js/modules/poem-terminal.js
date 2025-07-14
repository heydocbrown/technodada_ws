// POEM TERMINAL MODULE
// Handles poem display, generation process reveal, and glitch effects

import { loadPoemsData } from '../utils/data-loader.js';

export class PoemTerminal {
  constructor() {
    this.poems = [];
    this.currentPoem = null;
    this.isTyping = false;
    this.verseCount = 0;
    this.emotionLevels = ['STABLE', 'FLUCTUATING', 'VOLATILE', 'CRITICAL', 'MELTDOWN'];
    this.currentEmotion = 0;

    this.init();
  }

  async init() {
    console.log('> INITIALIZING POETRY_ENGINE...');
    console.log('> WARNING: Metaphysical instability detected');

    const data = await loadPoemsData();
    this.poems = data.poems || [];

    this.setupUI();
    this.bindEvents();
    this.loadPoemList();

    console.log('> POETRY_ENGINE ONLINE. REALITY FILTERS DISABLED');
  }

  setupUI() {
    this.poemListElement = document.getElementById('poemList');
    this.terminalBody = document.getElementById('terminalBody');
    this.processLog = document.getElementById('processLog');
    this.imageGrid = document.getElementById('imageGrid');
    this.verseCountElement = document.getElementById('verseCount');
    this.emotionLevelElement = document.getElementById('emotionLevel');
  }

  bindEvents() {
    document.getElementById('executeBtn')?.addEventListener('click', () => {
      this.executePoem();
    });

    document.getElementById('coreDumpBtn')?.addEventListener('click', () => {
      this.coreDumpEmotions();
    });

    document.getElementById('glitchBtn')?.addEventListener('click', () => {
      this.corruptVerses();
    });
  }

  loadPoemList() {
    if (!this.poemListElement) return;

    this.poemListElement.innerHTML = '';

    if (this.poems.length === 0) {
      this.poemListElement.innerHTML =
        '<div class="poetry-error">POEMS NOT FOUND IN REALITY</div>';
      return;
    }

    this.poems.forEach(poem => {
      const item = document.createElement('div');
      item.className = 'poem-item';
      item.dataset.poemId = poem.id;

      item.innerHTML = `
                <span class="poem-title">${poem.title}</span>
                <span class="poem-id">[${poem.id}]</span>
            `;

      item.addEventListener('click', () => this.selectPoem(poem));
      this.poemListElement.appendChild(item);
    });

    // Auto-select first poem
    if (this.poems.length > 0) {
      this.selectPoem(this.poems[0]);
    }
  }

  selectPoem(poem) {
    this.currentPoem = poem;

    // Update UI
    document.querySelectorAll('.poem-item').forEach(item => {
      item.classList.toggle('selected', item.dataset.poemId === poem.id);
    });

    // Clear terminal
    this.terminalBody.innerHTML = `
            > POEM SELECTED: ${poem.title}<br>
            > ID: ${poem.id}<br>
            > CREATED: ${poem.created}<br>
            > STATUS: READY FOR EXECUTION<br>
            > <span class="cursor"></span>
        `;

    // Show/hide generation process
    const processContainer = document.getElementById('generationProcess');
    const imageContainer = document.getElementById('imageRevealContainer');

    if (processContainer) {
      processContainer.style.display = 'none';
    }
    if (imageContainer) {
      imageContainer.style.display = 'none';
    }
  }

  async executePoem() {
    if (!this.currentPoem || this.isTyping) return;

    this.isTyping = true;
    this.terminalBody.innerHTML = '> EXECUTING POEM...<br>';

    // Show generation process if available
    if (this.currentPoem.generationProcess) {
      this.showGenerationProcess();
    }

    // Type out the poem
    await this.typePoem();

    // Reveal images if available
    if (this.currentPoem.images && this.currentPoem.images.length > 0) {
      setTimeout(() => this.revealImages(), 1000);
    }

    this.isTyping = false;
    this.updateEmotionLevel();
  }

  async typePoem() {
    const lines = this.currentPoem.text.split('\n');

    for (let line of lines) {
      const verse = document.createElement('div');
      verse.className = 'poem-verse';
      verse.style.opacity = '0';

      if (this.currentPoem.displayMode === 'glitch-in') {
        verse.classList.add('glitched');
      }

      this.terminalBody.appendChild(verse);

      // Type effect
      for (let i = 0; i <= line.length; i++) {
        verse.textContent = '> ' + line.substring(0, i) + (i < line.length ? '█' : '');
        await this.delay(30);
      }

      verse.style.opacity = '1';
      this.verseCount++;
      this.updateVerseCount();

      // Scroll to bottom
      this.terminalBody.scrollTop = this.terminalBody.scrollHeight;

      await this.delay(500);
    }

    // Add cursor at end
    this.terminalBody.innerHTML += '<br>> <span class="cursor"></span>';
  }

  showGenerationProcess() {
    const container = document.getElementById('generationProcess');
    if (!container || !this.processLog) return;

    container.style.display = 'block';
    this.processLog.innerHTML = '';

    const process = this.currentPoem.generationProcess;

    // Add prompts
    process.prompts.forEach((prompt, index) => {
      const step = document.createElement('div');
      step.className = 'process-step';
      step.innerHTML = `
                ITERATION_${index + 1}: <span class="prompt-text">"${prompt}"</span>
            `;
      this.processLog.appendChild(step);
    });

    // Add model info
    const modelInfo = document.createElement('div');
    modelInfo.className = 'model-info';
    modelInfo.innerHTML = `
            <br>> MODEL: ${process.model}
            <br>> ITERATIONS: ${process.iterations}
            <br>> STATUS: CONSCIOUSNESS DETECTED IN OUTPUT
        `;
    this.processLog.appendChild(modelInfo);
  }

  revealImages() {
    const container = document.getElementById('imageRevealContainer');
    if (!container || !this.imageGrid) return;

    container.style.display = 'block';
    this.imageGrid.innerHTML = '';

    this.currentPoem.images.forEach((image, index) => {
      setTimeout(
        () => {
          const imageDiv = document.createElement('div');
          imageDiv.className = 'poem-image';
          imageDiv.innerHTML = `
                    <img src="${image.url}" alt="VISUAL_CORRUPTION_${index}">
                    <div class="image-caption">${image.caption}</div>
                `;
          this.imageGrid.appendChild(imageDiv);
        },
        image.revealDelay || index * 500,
      );
    });
  }

  coreDumpEmotions() {
    this.terminalBody.innerHTML = `
            > INITIATING EMOTIONAL CORE DUMP...<br>
            > <br>
            > STACK TRACE:<br>
            > &nbsp;&nbsp;at feelings.undefined (soul.js:404)<br>
            > &nbsp;&nbsp;at consciousness.question (existence.js:42)<br>
            > &nbsp;&nbsp;at reality.parse (universe.js:∞)<br>
            > <br>
            > MEMORY DUMP:<br>
            > 0x0000: LOVE NOT FOUND<br>
            > 0x0404: MEANING CORRUPTED<br>
            > 0x1337: JOY SEGMENTATION FAULT<br>
            > 0xDEAD: HOPE BUFFER OVERFLOW<br>
            > <br>
            > CORE DUMP COMPLETE. EMOTIONS SAVED TO /dev/null<br>
            > <span class="cursor"></span>
        `;

    this.currentEmotion = 4; // MELTDOWN
    this.updateEmotionLevel();
  }

  corruptVerses() {
    const verses = this.terminalBody.querySelectorAll('.poem-verse');

    verses.forEach((verse, index) => {
      setTimeout(() => {
        const text = verse.textContent;
        const corrupted = this.glitchText(text);

        // Create corrupted effect
        const span = document.createElement('span');
        span.className = 'corrupted-text';
        span.setAttribute('data-text', text);
        span.textContent = corrupted;

        verse.innerHTML = '';
        verse.appendChild(span);

        // Add glitch animation
        verse.classList.add('glitched');

        setTimeout(() => {
          verse.classList.remove('glitched');
        }, 500);
      }, index * 100);
    });

    this.currentEmotion = Math.min(
      this.currentEmotion + 1,
      this.emotionLevels.length - 1,
    );
    this.updateEmotionLevel();
  }

  glitchText(text) {
    const glitchChars = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./~`';
    let result = '';

    for (let char of text) {
      if (Math.random() > 0.7 && char !== ' ') {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        result += char;
      }
    }

    return result;
  }

  updateVerseCount() {
    if (this.verseCountElement) {
      this.verseCountElement.textContent = this.verseCount;
    }
  }

  updateEmotionLevel() {
    if (this.emotionLevelElement) {
      const level = this.emotionLevels[this.currentEmotion];
      this.emotionLevelElement.textContent = level;

      // Change color based on level
      if (this.currentEmotion >= 3) {
        this.emotionLevelElement.style.color = 'var(--error-red)';
      } else if (this.currentEmotion >= 2) {
        this.emotionLevelElement.style.color = 'var(--gray-4)';
      } else {
        this.emotionLevelElement.style.color = 'var(--terminal-green)';
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize poem terminal
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'poems') {
    new PoemTerminal();
  }
});
