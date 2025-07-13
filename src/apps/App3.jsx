import { useState } from 'react';
import ThumbnailSelector from '../components/ThumbnailSelector';
import OverlayViewer from '../components/OverlayViewer';
import '../App.css';

function App3() {
    const [selectedArt, setSelectedArt] = useState(null);
    const [showThumbnails, setShowThumbnails] = useState(true);
    const [revealMode, setRevealMode] = useState('topToBottom');

    const handleArtSelect = (art) => {
        setSelectedArt(art);
        setShowThumbnails(false); // Hide thumbnails when selection is made
        
        // Reset gnosis level
        const gnosisLevel = document.getElementById('gnosisLevel');
        if (gnosisLevel) {
            gnosisLevel.textContent = '0%';
        }
        
        // Show thumbnails again after the 10-second overlay sequence (3s delay + 7s reveal)
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
        }, 11000); // 10 second sequence + 1 second buffer
    };

    return (
        <div className="art-viewer-container">
            <header className="art-viewer-header">
                <h1 className="glitch">TECHNODADA_FUSION</h1>
                <p className="error-message">WARNING: Reality layers may merge unexpectedly</p>
                
                {/* Reveal Mode Settings */}
                <div className="reveal-settings" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '20px',
                    fontFamily: "'VT323', monospace"
                }}>
                    <span style={{ color: 'var(--terminal-green)', fontSize: '1.2rem' }}>
                        REVEAL_MODE:
                    </span>
                    <button
                        className={`project-button ${revealMode === 'topToBottom' ? 'active' : ''}`}
                        onClick={() => setRevealMode('topToBottom')}
                        style={{
                            minWidth: '150px',
                            padding: '8px 15px',
                            fontSize: '0.9rem'
                        }}
                    >
                        TOP→BOTTOM
                    </button>
                    <button
                        className={`project-button ${revealMode === 'randomPixels' ? 'active' : ''}`}
                        onClick={() => setRevealMode('randomPixels')}
                        style={{
                            minWidth: '150px',
                            padding: '8px 15px',
                            fontSize: '0.9rem'
                        }}
                    >
                        RANDOM_PIXELS
                    </button>
                </div>
            </header>

            {selectedArt && (
                <div className="content-display">
                    <OverlayViewer 
                        prompt={selectedArt?.cleaned_prompt || null}
                        imageUrl={selectedArt ? `https://f005.backblazeb2.com/file/td-website/${selectedArt.backblaze_path}` : null}
                        startOverlay={selectedArt !== null}
                        revealMode={revealMode}
                    />
                </div>
            )}

            <ThumbnailSelector onArtSelect={handleArtSelect} isVisible={showThumbnails} />

            {/* Navigation */}
            <nav className="error-nav" style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/" className="error-link">[RETURN_TO_404]</a>
                <a href="/pages/poems.html" className="error-link">[TEXT_VIEWER]</a>
                <a href="/pages/poem2.html" className="error-link">[GALLERY_VIEWER]</a>
                <a href="/pages/gallery.html" className="error-link">[BROWSE_GALLERY]</a>
                <a href="/pages/tools.html" className="error-link">[ACCESS_TOOLS]</a>
            </nav>
        </div>
    );
}

export default App3;