import { useState } from 'react';
import ArtSelector from './components/ArtSelector';
import PromptDisplay from './components/PromptDisplay';
import ImageViewer from './components/ImageViewer';
import './App.css';

function App() {
    const [selectedArt, setSelectedArt] = useState(null);
    const [typingComplete, setTypingComplete] = useState(false);
    const [syncDuration, setSyncDuration] = useState(null);

    const handleArtSelect = (art) => {
        setSelectedArt(art);
        setTypingComplete(false);
        
        // Calculate synchronized duration (aim for 8-12 seconds total)
        const promptLength = art.cleaned_prompt.length;
        const targetDuration = Math.max(8000, Math.min(12000, promptLength * 40)); // 40ms per character baseline
        setSyncDuration(targetDuration);
        
        // Reset gnosis level
        const gnosisLevel = document.getElementById('gnosisLevel');
        if (gnosisLevel) {
            gnosisLevel.textContent = '0%';
        }
    };

    const handleTypingComplete = () => {
        setTypingComplete(true);
    };

    return (
        <div className="art-viewer-container">
            <header className="art-viewer-header">
                <h1 className="glitch">TECHNODADA_VIEWER</h1>
                <p className="error-message">WARNING: Reality interpretation may vary</p>
            </header>

            <ArtSelector onArtSelect={handleArtSelect} />

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

            {/* Navigation */}
            <nav className="error-nav" style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/" className="error-link">[RETURN_TO_404]</a>
                <a href="/pages/gallery.html" className="error-link">[BROWSE_GALLERY]</a>
                <a href="/pages/tools.html" className="error-link">[ACCESS_TOOLS]</a>
            </nav>
        </div>
    );
}

export default App;
