// GALLERY VIEWER MODULE
// Handles image loading, display modes, and glitch effects

import { loadGalleryData } from '../utils/data-loader.js';

export class GalleryViewer {
    constructor() {
        this.galleries = null;
        this.currentMode = 'triptych';
        this.currentFilter = 'all';
        this.sequenceIntervals = new Map();
        this.imageCount = 0;
        this.memoryLeak = 0;
        
        this.init();
    }
    
    async init() {
        console.log('> INITIALIZING GALLERY_VIEWER...');
        console.log('> WARNING: Images may attempt to escape containment');
        
        const data = await loadGalleryData();
        this.galleries = data.collections || [];
        
        this.setupUI();
        this.bindEvents();
        this.loadGalleries();
        
        // Start memory leak counter
        this.startMemoryLeak();
        
        console.log('> GALLERY_VIEWER LOADED. CONTAINMENT STATUS: QUESTIONABLE');
    }
    
    setupUI() {
        this.contentElement = document.getElementById('galleryContent');
        this.modalElement = document.getElementById('imageViewerModal');
        this.modalImage = document.getElementById('modalImage');
        this.imageCountElement = document.getElementById('imageCount');
        this.memoryLeakElement = document.getElementById('memoryLeak');
    }
    
    bindEvents() {
        // View mode buttons
        document.querySelectorAll('.view-mode').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });
        
        // Filter select
        document.getElementById('errorFilter')?.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.loadGalleries();
        });
        
        // Modal close
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Click outside modal to close
        this.modalElement?.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                this.closeModal();
            }
        });
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        document.querySelectorAll('.view-mode').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        this.loadGalleries();
    }
    
    loadGalleries() {
        // Clear existing content
        this.contentElement.innerHTML = '';
        this.clearSequenceIntervals();
        
        // Filter galleries
        const filtered = this.currentFilter === 'all' 
            ? this.galleries 
            : this.galleries.filter(g => g.errorCode === this.currentFilter);
        
        // Display based on mode
        if (filtered.length === 0) {
            this.showError('NO_IMAGES_FOUND: Reality buffer is empty');
            return;
        }
        
        filtered.forEach(gallery => {
            if (gallery.type === this.currentMode || this.currentMode === 'grid') {
                this.renderGallery(gallery);
            }
        });
        
        // Update image count
        this.updateImageCount();
    }
    
    renderGallery(gallery) {
        if (this.currentMode === 'grid') {
            this.renderGridGallery(gallery);
        } else if (gallery.type === 'triptych') {
            this.renderTriptychGallery(gallery);
        } else if (gallery.type === 'sequence') {
            this.renderSequenceGallery(gallery);
        }
    }
    
    renderTriptychGallery(gallery) {
        gallery.items.forEach(item => {
            const container = document.createElement('div');
            container.className = 'gallery-item triptych';
            container.dataset.error = item.errorMessage;
            
            item.images.forEach((imgUrl, index) => {
                const img = document.createElement('img');
                img.className = 'gallery-image';
                img.src = imgUrl;
                img.alt = `SEGMENT_${index}_CORRUPTED`;
                img.loading = 'lazy';
                
                // Random glitch effect
                if (Math.random() > 0.7) {
                    setTimeout(() => {
                        img.classList.add('glitching');
                    }, Math.random() * 5000);
                }
                
                img.addEventListener('click', () => this.openModal(imgUrl, item));
                container.appendChild(img);
            });
            
            this.contentElement.appendChild(container);
        });
    }
    
    renderSequenceGallery(gallery) {
        gallery.items.forEach(item => {
            const container = document.createElement('div');
            container.className = 'gallery-item sequence';
            container.dataset.error = item.errorMessage;
            
            const sequenceContainer = document.createElement('div');
            sequenceContainer.className = 'sequence-container';
            
            // Create images
            item.images.forEach((imgUrl, index) => {
                const img = document.createElement('img');
                img.className = 'sequence-image';
                img.src = imgUrl;
                img.alt = `FRAME_${index}_DROPPED`;
                img.loading = 'lazy';
                
                if (index === 0) img.classList.add('active');
                
                img.addEventListener('click', () => this.openModal(imgUrl, item));
                sequenceContainer.appendChild(img);
            });
            
            // Create indicators
            const controls = document.createElement('div');
            controls.className = 'sequence-controls';
            
            item.images.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = 'sequence-indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    this.jumpToSequenceImage(sequenceContainer, index);
                });
                controls.appendChild(indicator);
            });
            
            container.appendChild(sequenceContainer);
            container.appendChild(controls);
            
            const metadata = document.createElement('div');
            metadata.className = 'item-metadata';
            metadata.innerHTML = `
                <div class="item-title">${item.title}</div>
                <div class="item-error">${item.errorMessage}</div>
            `;
            container.appendChild(metadata);
            
            this.contentElement.appendChild(container);
            
            // Start sequence animation
            if (item.timing && item.timing.loop) {
                this.startSequence(sequenceContainer, item.timing.duration);
            }
        });
    }
    
    renderGridGallery(gallery) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'gallery-grid';
        
        gallery.items.forEach(item => {
            const container = document.createElement('div');
            container.className = 'gallery-item grid';
            
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = item.images[0];
            img.alt = 'PIXEL_DATA_LOST';
            img.loading = 'lazy';
            
            const metadata = document.createElement('div');
            metadata.className = 'item-metadata';
            metadata.innerHTML = `
                <div class="item-title">${item.title}</div>
                <div class="item-error">${item.errorMessage}</div>
            `;
            
            container.appendChild(img);
            container.appendChild(metadata);
            
            container.addEventListener('click', () => this.openModal(item.images[0], item));
            
            gridContainer.appendChild(container);
        });
        
        this.contentElement.appendChild(gridContainer);
    }
    
    startSequence(container, duration) {
        const images = container.querySelectorAll('.sequence-image');
        const indicators = container.parentElement.querySelectorAll('.sequence-indicator');
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            images[currentIndex].classList.remove('active');
            indicators[currentIndex].classList.remove('active');
            
            currentIndex = (currentIndex + 1) % images.length;
            
            images[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');
        }, duration);
        
        this.sequenceIntervals.set(container, interval);
    }
    
    jumpToSequenceImage(container, index) {
        const images = container.querySelectorAll('.sequence-image');
        const indicators = container.parentElement.querySelectorAll('.sequence-indicator');
        
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }
    
    clearSequenceIntervals() {
        this.sequenceIntervals.forEach(interval => clearInterval(interval));
        this.sequenceIntervals.clear();
    }
    
    openModal(imageUrl, item) {
        if (this.modalElement && this.modalImage) {
            this.modalImage.src = imageUrl;
            this.modalElement.classList.add('active');
            
            // Update metadata
            document.getElementById('entropyLevel').textContent = 
                Math.floor(Math.random() * 100) + '%';
            document.getElementById('glitchProb').textContent = 
                (Math.random() * 100).toFixed(1) + '%';
        }
    }
    
    closeModal() {
        if (this.modalElement) {
            this.modalElement.classList.remove('active');
            this.modalImage.src = '';
        }
    }
    
    updateImageCount() {
        this.imageCount = this.contentElement.querySelectorAll('img').length;
        if (this.imageCountElement) {
            this.imageCountElement.textContent = this.imageCount;
        }
    }
    
    startMemoryLeak() {
        setInterval(() => {
            this.memoryLeak += Math.floor(Math.random() * 50);
            if (this.memoryLeakElement) {
                this.memoryLeakElement.textContent = this.memoryLeak + 'KB';
            }
        }, 1000);
    }
    
    showError(message) {
        this.contentElement.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 60px;">
                <p>> ${message}</p>
                <p>> Try adjusting filter parameters</p>
            </div>
        `;
    }
}

// Initialize gallery viewer
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.page === 'gallery') {
        new GalleryViewer();
    }
});