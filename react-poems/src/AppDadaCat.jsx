import { useState } from 'react';
import ArtSelectorDadaCat from './components/ArtSelectorDadaCat';
import InteractiveDadaCatPipeline from './components/InteractiveDadaCatPipeline';
import PromptDisplay from './components/PromptDisplay';
import ImageViewer from './components/ImageViewer';
import pipelineConfig from './config/pipelineConfig';
import './App.css';

function AppDadaCat() {
    const [selectedArt, setSelectedArt] = useState(null);
    const [typingComplete, setTypingComplete] = useState(false);
    const [syncDuration, setSyncDuration] = useState(null);
    const [mode, setMode] = useState('browse'); // 'browse' or 'interactive'

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
                <h1 className="glitch">DADACAT_VIEWER</h1>
                <p className="error-message">WARNING: DadaCat visions only</p>
            </header>

            <div className="mode-selector">
                <button 
                    className={`mode-button ${mode === 'browse' ? 'active' : ''}`}
                    onClick={() => setMode('browse')}
                >
                    BROWSE VISIONS
                </button>
                <button 
                    className={`mode-button ${mode === 'interactive' ? 'active' : ''}`}
                    onClick={() => setMode('interactive')}
                >
                    MANIFEST VISION
                </button>
            </div>

            {mode === 'browse' ? (
                <ArtSelectorDadaCat onArtSelect={handleArtSelect} />
            ) : (
                <InteractiveDadaCatPipeline 
                    onGenerate={handleArtSelect}
                    config={pipelineConfig}
                />
            )}

            <div className="content-display">
                <PromptDisplay 
                    prompt={selectedArt?.cleaned_prompt || null}
                    syncDuration={syncDuration}
                    onTypingComplete={handleTypingComplete}
                />
                <ImageViewer 
                    imageUrl={selectedArt ? (selectedArt.image_url || `https://f005.backblazeb2.com/file/td-website/${selectedArt.backblaze_path}`) : null}
                    startReveal={selectedArt !== null}
                    syncDuration={syncDuration}
                />
            </div>

            {/* Navigation */}
            <nav className="error-nav" style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/" className="error-link">[RETURN_TO_404]</a>
                <a href="/pages/gallery.html" className="error-link">[BROWSE_GALLERY]</a>
                <a href="/pages/poems.html" className="error-link">[ALL_VISIONS]</a>
            </nav>
        </div>
    );
}

export default AppDadaCat;