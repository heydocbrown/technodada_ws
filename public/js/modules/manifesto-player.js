// MANIFESTO PLAYER MODULE
// Handles text display with temporal playback and multi-speaker support

import { loadManifestoData } from '../utils/data-loader.js';

export class ManifestoPlayer {
  constructor(container) {
    this.container = container;
    this.data = null;
    this.isPlaying = false;
    this.currentSegmentIndex = 0;
    this.typingInterval = null;
    this.charIndex = 0;
    this.playStartTime = null;
    this.elapsedTime = 0;

    // UI Elements
    this.outputTerminal = null;
    this.voiceModules = null;
    this.playBtn = null;
    this.pauseBtn = null;
    this.rebootBtn = null;

    this.init();
  }

  async init() {
    console.log('> INITIALIZING MANIFESTO_PLAYER...');
    this.data = await loadManifestoData();
    this.setupUI();
    this.bindEvents();
    console.log('> MANIFESTO_PLAYER READY');
  }

  setupUI() {
    // Find existing elements
    this.outputTerminal = document.getElementById('outputTerminal');
    this.voiceModules = document.querySelectorAll('.voice-module');
    this.playBtn = document.getElementById('playBtn');
    this.pauseBtn = document.getElementById('pauseBtn');
    this.rebootBtn = document.getElementById('rebootBtn');
  }

  bindEvents() {
    // Control buttons only - no voice module selection
    this.playBtn?.addEventListener('click', () => this.play());
    this.pauseBtn?.addEventListener('click', () => this.pause());
    this.rebootBtn?.addEventListener('click', () => this.reboot());
  }

  highlightSpeakers(speakers) {
    // Clear all active states
    this.voiceModules.forEach(m => {
      m.classList.remove('active', 'glitch');
    });

    // Handle speaker array or single speaker
    const speakerList = Array.isArray(speakers) ? speakers : [speakers];

    // Highlight active speakers
    speakerList.forEach(speaker => {
      if (speaker === 'all') {
        // Highlight all speakers with glitch effect
        this.voiceModules.forEach(m => {
          m.classList.add('active', 'glitch');
        });
      } else {
        const module = document.querySelector(
          `[data-voice="${speaker.toUpperCase()}"]`,
        );
        if (module) {
          module.classList.add('active');
          // Add glitch effect for multi-speaker segments
          if (speakerList.length > 1) {
            module.classList.add('glitch');
          }
        }
      }
    });
  }

  play() {
    if (!this.isPlaying && this.data) {
      this.isPlaying = true;
      this.playBtn?.classList.add('active');
      this.playStartTime = Date.now() - this.elapsedTime;
      this.startPlayback();
    }
  }

  pause() {
    this.isPlaying = false;
    this.playBtn?.classList.remove('active');
    this.stopTyping();
    // Save elapsed time for resume
    if (this.playStartTime) {
      this.elapsedTime = Date.now() - this.playStartTime;
    }
  }

  reboot() {
    this.outputTerminal.innerHTML = '> REBOOTING REALITY...\n> PLEASE WAIT...\n> ';
    this.pause();
    this.elapsedTime = 0;
    this.currentSegmentIndex = 0;
    this.charIndex = 0;

    // Clear all speaker highlights
    this.voiceModules.forEach(m => {
      m.classList.remove('active', 'glitch');
    });

    setTimeout(() => {
      this.outputTerminal.innerHTML =
        '> REALITY REBOOT FAILED\n> DEFAULTING TO CHAOS MODE\n> <span class="cursor"></span>';
    }, 2000);
  }

  startPlayback() {
    if (!this.isPlaying) return;

    const currentTime = (Date.now() - this.playStartTime) / 1000; // Convert to seconds

    // Check if we're still typing the current segment
    if (this.typingInterval && this.currentSegmentIndex < this.data.segments.length) {
      // Continue with current typing, don't interrupt
      setTimeout(() => this.startPlayback(), 100);
      return;
    }

    // Find the next segment to start based on current time
    let nextSegmentIndex = -1;
    for (let i = 0; i < this.data.segments.length; i++) {
      if (
        currentTime >= this.data.segments[i].startTime &&
        i > this.currentSegmentIndex
      ) {
        nextSegmentIndex = i;
        break;
      }
    }

    if (nextSegmentIndex === -1) {
      // Check if we've finished all segments
      const lastSegment = this.data.segments[this.data.segments.length - 1];
      if (
        this.currentSegmentIndex >= this.data.segments.length - 1 &&
        !this.typingInterval
      ) {
        // Remove cursor before adding completion message
        const existingCursor = this.outputTerminal.querySelector('.cursor');
        if (existingCursor) {
          existingCursor.remove();
        }
        this.outputTerminal.innerHTML +=
          '\n> MANIFESTO INCOMPLETE\n> REALITY DADA: -100%\n> <span class="cursor"></span>';
        this.pause();
        this.elapsedTime = 0;
        return;
      }
      // Wait for next segment or current typing to finish
      setTimeout(() => this.startPlayback(), 100);
      return;
    }

    // Start the new segment
    const segment = this.data.segments[nextSegmentIndex];
    this.currentSegmentIndex = nextSegmentIndex;
    this.charIndex = 0;

    // Highlight active speakers
    this.highlightSpeakers(segment.speaker);

    // Start typing the segment
    this.startTypingSegment(segment);

    // Continue playback loop
    setTimeout(() => this.startPlayback(), 100);
  }

  startTypingSegment(segment) {
    if (!this.isPlaying) return;

    // Clear any existing typing interval
    this.stopTyping();

    // Remove any existing cursor
    const existingCursor = this.outputTerminal.querySelector('.cursor');
    if (existingCursor) {
      existingCursor.remove();
    }

    // Add newline if not at start
    if (this.currentSegmentIndex > 0 && this.charIndex === 0) {
      const textNode = document.createTextNode('\n');
      this.outputTerminal.appendChild(textNode);
    }

    // Apply effects for multi-speaker segments
    const hasGlitchEffect =
      segment.effects?.includes('glitch') ||
      (Array.isArray(segment.speaker) && segment.speaker.length > 1);

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    this.typingInterval = setInterval(() => {
      if (this.charIndex < segment.displayText.length) {
        let char = segment.displayText[this.charIndex];

        // Apply glitch effect randomly
        if (hasGlitchEffect && Math.random() < 0.1) {
          char = this.glitchChar(char);
        }

        // Insert character before cursor (with artistic error handling)
        const textNode = document.createTextNode(char);
        try {
          this.outputTerminal.insertBefore(textNode, cursor);
        } catch (error) {
          // Reality has diverged - cursor is not where we expected
          // Append to terminal instead and recreate cursor
          console.log('DOM.REALITY = UNCERTAIN, cursor lost in quantum state');
          this.outputTerminal.appendChild(textNode);

          // Remove old cursor if it exists
          const oldCursor = this.outputTerminal.querySelector('.cursor');
          if (oldCursor) {
            oldCursor.remove();
          }

          // Create new cursor
          const newCursor = document.createElement('span');
          newCursor.className = 'cursor';
          newCursor.textContent = '█';
          this.outputTerminal.appendChild(newCursor);
          cursor = newCursor;
        }

        this.charIndex++;
        this.outputTerminal.scrollTop = this.outputTerminal.scrollHeight;
      } else {
        // Segment typing complete
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
    }, 50);

    // Add cursor to terminal
    this.outputTerminal.appendChild(cursor);
  }

  glitchChar(char) {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?█▓▒░';
    return Math.random() < 0.5
      ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
      : char;
  }

  stopTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }
}
