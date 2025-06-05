import { useState } from 'react';
import ThumbnailSelector from './components/ThumbnailSelector';
import PromptDisplay from './components/PromptDisplay';
import ImageViewer from './components/ImageViewer';
import './App.css';

function App2() {
    const [selectedArt, setSelectedArt] = useState(null);
    const [typingComplete, setTypingComplete] = useState(false);
    const [syncDuration, setSyncDuration] = useState(null);
    const [showThumbnails, setShowThumbnails] = useState(true);

    const handleArtSelect = (art) => {
        setSelectedArt(art);
        setTypingComplete(false);
        setShowThumbnails(false); // Hide thumbnails when selection is made
        
        // Calculate synchronized duration (aim for 8-12 seconds total)
        const promptLength = art.cleaned_prompt.length;
        const targetDuration = Math.max(8000, Math.min(12000, promptLength * 40)); // 40ms per character baseline
        setSyncDuration(targetDuration);
        
        // Reset gnosis level
        const gnosisLevel = document.getElementById('gnosisLevel');
        if (gnosisLevel) {
            gnosisLevel.textContent = '0%';
        }
        
        // Show thumbnails again after the typing/reveal completes
        setTimeout(() => {
            // Save current scroll position
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            setShowThumbnails(true);
            
            // Restore scroll position after React re-render
            setTimeout(() => {
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'instant'
                });
            }, 0);
        }, targetDuration + 1000); // Add 1 second buffer
    };

    const handleTypingComplete = () => {
        setTypingComplete(true);
    };

    return (
        <div className="art-viewer-container">
            <header className="art-viewer-header">
                <h1 className="glitch">TECHNODADA_GALLERY</h1>
                <p className="error-message">WARNING: Visual reality interpretation may vary</p>
            </header>

            <ThumbnailSelector onArtSelect={handleArtSelect} isVisible={showThumbnails} />

            {selectedArt && (
                <div className="content-display">
                    <PromptDisplay 
                        prompt={selectedArt?.cleaned_prompt || null}
                        syncDuration={syncDuration}
                        onTypingComplete={handleTypingComplete}
                    />
                    <ImageViewer 
                        imageUrl={selectedArt ? `https://f005.backblazeb2.com/file/td-website/${selectedArt.backblaze_path}` : null}
                        startReveal={selectedArt !== null}
                        syncDuration={syncDuration}
                    />
                </div>
            )}

            {/* Navigation */}
            <nav className="error-nav" style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/" className="error-link">[RETURN_TO_404]</a>
                <a href="/pages/poems.html" className="error-link">[TEXT_VIEWER]</a>
                <a href="/pages/gallery.html" className="error-link">[BROWSE_GALLERY]</a>
                <a href="/pages/tools.html" className="error-link">[ACCESS_TOOLS]</a>
            </nav>
        </div>
    );
}

export default App2;