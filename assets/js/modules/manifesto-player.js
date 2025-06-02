// MANIFESTO PLAYER MODULE
// Handles text display and audio synchronization

import { loadManifestoData } from '../utils/data-loader.js';

export class ManifestoPlayer {
    constructor(container) {
        this.container = container;
        this.data = null;
        this.currentSpeaker = 'dadacat';
        this.isPlaying = false;
        this.currentSegmentIndex = 0;
        this.typingInterval = null;
        this.charIndex = 0;
        
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
        // Voice module selection
        this.voiceModules.forEach(module => {
            module.addEventListener('click', () => this.switchVoice(module));
        });
        
        // Control buttons
        this.playBtn?.addEventListener('click', () => this.play());
        this.pauseBtn?.addEventListener('click', () => this.pause());
        this.rebootBtn?.addEventListener('click', () => this.reboot());
    }
    
    switchVoice(module) {
        // Update active state
        this.voiceModules.forEach(m => m.classList.remove('active'));
        module.classList.add('active');
        this.currentSpeaker = module.dataset.voice;
        
        // Filter segments for current speaker
        if (this.isPlaying) {
            this.pause();
            this.currentSegmentIndex = this.getNextSegmentIndex();
            this.play();
        }
    }
    
    getNextSegmentIndex() {
        // Find next segment for current speaker
        const segments = this.data.segments;
        for (let i = 0; i < segments.length; i++) {
            if (segments[i].speaker === this.currentSpeaker) {
                return i;
            }
        }
        return 0;
    }
    
    play() {
        if (!this.isPlaying && this.data) {
            this.isPlaying = true;
            this.playBtn?.classList.add('active');
            this.startTyping();
        }
    }
    
    pause() {
        this.isPlaying = false;
        this.playBtn?.classList.remove('active');
        this.stopTyping();
    }
    
    reboot() {
        this.outputTerminal.innerHTML = '> REBOOTING REALITY...\n> PLEASE WAIT...\n> ';
        setTimeout(() => {
            this.outputTerminal.innerHTML = '> REALITY REBOOT FAILED\n> DEFAULTING TO CHAOS MODE\n> <span class="cursor"></span>';
            this.currentSegmentIndex = 0;
            this.charIndex = 0;
            if (this.isPlaying) {
                this.pause();
                setTimeout(() => this.play(), 500);
            }
        }, 2000);
    }
    
    startTyping() {
        const segments = this.data.segments.filter(s => 
            this.currentSpeaker === 'all' || s.speaker === this.currentSpeaker
        );
        
        if (segments.length === 0) {
            this.outputTerminal.innerHTML += '\n> NO DATA FOR SPEAKER: ' + this.currentSpeaker.toUpperCase() + '\n> <span class="cursor"></span>';
            return;
        }
        
        const currentSegment = segments[this.currentSegmentIndex % segments.length];
        let displayText = this.outputTerminal.textContent.replace(/█$/, ''); // Remove cursor
        
        this.typingInterval = setInterval(() => {
            if (this.charIndex < currentSegment.displayText.length) {
                displayText += currentSegment.displayText[this.charIndex];
                this.outputTerminal.innerHTML = displayText + '<span class="cursor"></span>';
                this.charIndex++;
                this.outputTerminal.scrollTop = this.outputTerminal.scrollHeight;
            } else {
                displayText += '\n';
                this.outputTerminal.innerHTML = displayText + '<span class="cursor"></span>';
                this.charIndex = 0;
                this.currentSegmentIndex++;
                
                clearInterval(this.typingInterval);
                if (this.isPlaying) {
                    setTimeout(() => this.startTyping(), 1500);
                }
            }
        }, 50);
    }
    
    stopTyping() {
        clearInterval(this.typingInterval);
    }
}