// TECHNODADA ART VIEWER - React Component
// Displays prompts and images from Backblaze with typewriter and progressive reveal effects

const { useState, useEffect, useRef } = React;

// Constants
const BACKBLAZE_URL = 'https://f005.backblazeb2.com/file/td-website/index.json';
const TYPING_SPEED = 30; // milliseconds per character
const IMAGE_REVEAL_SPEED = 10; // milliseconds per row

// ArtSelector Component
function ArtSelector({ onArtSelect }) {
    const [artData, setArtData] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data on mount
    useEffect(() => {
        fetchArtData();
    }, []);

    // Filter data when project changes
    useEffect(() => {
        if (selectedProject && artData.length > 0) {
            const filtered = artData.filter(item => 
                item.artproject === selectedProject && item.on_website === 'yes'
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]);
        }
    }, [selectedProject, artData]);

    const fetchArtData = async () => {
        try {
            setLoading(true);
            const response = await fetch(BACKBLAZE_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch art data');
            }
            const data = await response.json();
            setArtData(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching art data:', err);
            setError('REALITY_FETCH_ERROR: Unable to retrieve art data');
            setLoading(false);
        }
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        onArtSelect(null); // Clear current selection
        
        // Update status
        const artMode = document.getElementById('artMode');
        if (artMode) {
            artMode.textContent = project === 'dadacat' ? 'DADACAT' : 'GOATSE';
        }
    };

    const handleArtSelect = (event) => {
        const selectedId = event.target.value;
        if (selectedId) {
            const selectedArt = artData.find(item => item.id === selectedId);
            if (selectedArt) {
                onArtSelect(selectedArt);
            }
        }
    };

    const getDropdownLabel = (item) => {
        // Get first 8 words of cleaned prompt
        const words = item.cleaned_prompt.split(' ').slice(0, 8);
        return words.join(' ') + (item.cleaned_prompt.split(' ').length > 8 ? '...' : '');
    };

    if (loading) {
        return (
            <div className="art-selector-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        > LOADING ART_DATABASE...<br/>
                        > ESTABLISHING BACKBLAZE_CONNECTION...
                    </div>
                    <div className="terminal-body">
                        <div className="loading">SCANNING REALITY_FRAGMENTS</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="art-selector-section">
                <div className="terminal-window">
                    <div className="terminal-header error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="art-selector-section">
            <div className="project-buttons">
                <button 
                    className={`project-button ${selectedProject === 'dadacat' ? 'active' : ''}`}
                    onClick={() => handleProjectSelect('dadacat')}
                >
                    thus spake DadaCat
                </button>
                <button 
                    className={`project-button ${selectedProject === 'truthterminal' ? 'active' : ''}`}
                    onClick={() => handleProjectSelect('truthterminal')}
                >
                    Warning: Goatse Gnosis
                </button>
            </div>

            {selectedProject && (
                <div className="dropdown-container">
                    <select 
                        className="art-dropdown"
                        onChange={handleArtSelect}
                        defaultValue=""
                    >
                        <option value="">
                            > SELECT VISION [{filteredData.length} AVAILABLE]
                        </option>
                        {filteredData.map(item => (
                            <option key={item.id} value={item.id}>
                                {getDropdownLabel(item)}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

// PromptDisplay Component
function PromptDisplay({ prompt, onTypingComplete }) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (prompt) {
            // Reset when new prompt arrives
            setDisplayedText('');
            setCurrentIndex(0);
            setIsTyping(true);
        }
    }, [prompt]);

    useEffect(() => {
        if (isTyping && prompt && currentIndex < prompt.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + prompt[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, TYPING_SPEED);

            return () => clearTimeout(timeout);
        } else if (isTyping && currentIndex >= prompt.length) {
            setIsTyping(false);
            if (onTypingComplete) {
                onTypingComplete();
            }
        }
    }, [currentIndex, isTyping, prompt, onTypingComplete]);

    if (!prompt) {
        return (
            <div className="prompt-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        > PROMPT_BUFFER.TXT
                    </div>
                    <div className="prompt-terminal">
                        <div className="prompt-text">
                            > AWAITING SELECTION...<br/>
                            > CONSCIOUSNESS STANDING BY...
                            <span className="typing-cursor"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="prompt-section">
            <div className="terminal-window">
                <div className="terminal-header">
                    > DECODING LINGUISTIC_MATRIX...
                </div>
                <div className="prompt-terminal">
                    <div className="prompt-text">
                        > {displayedText}
                        {isTyping && <span className="typing-cursor"></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ImageViewer Component
function ImageViewer({ imageUrl, shouldReveal }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [revealHeight, setRevealHeight] = useState(100); // Start at 100% (hidden)
    const [imageHeight, setImageHeight] = useState(0);
    const imageRef = useRef(null);
    const intervalRef = useRef(null);

    // Reset when new image
    useEffect(() => {
        if (imageUrl) {
            setImageLoaded(false);
            setRevealHeight(100);
            setImageHeight(0);
        }
    }, [imageUrl]);

    // Start reveal when conditions are met
    useEffect(() => {
        if (shouldReveal && imageLoaded && imageHeight > 0) {
            const rowsToReveal = imageHeight;
            const rowsPerInterval = 2; // Reveal 2 pixels at a time
            let currentReveal = 100;

            intervalRef.current = setInterval(() => {
                currentReveal -= (rowsPerInterval / imageHeight) * 100;
                
                if (currentReveal <= 0) {
                    currentReveal = 0;
                    clearInterval(intervalRef.current);
                    
                    // Update gnosis level
                    const gnosisLevel = document.getElementById('gnosisLevel');
                    if (gnosisLevel) {
                        gnosisLevel.textContent = '100%';
                    }
                }
                
                setRevealHeight(currentReveal);
                
                // Update gnosis level progressively
                const gnosisLevel = document.getElementById('gnosisLevel');
                if (gnosisLevel) {
                    gnosisLevel.textContent = Math.round(100 - currentReveal) + '%';
                }
            }, IMAGE_REVEAL_SPEED);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [shouldReveal, imageLoaded, imageHeight]);

    const handleImageLoad = (e) => {
        setImageLoaded(true);
        setImageHeight(e.target.naturalHeight);
    };

    if (!imageUrl) {
        return (
            <div className="image-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        > VISUAL_CORTEX.DAT
                    </div>
                    <div className="image-viewer">
                        <div className="prompt-terminal" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="prompt-text" style={{ textAlign: 'center' }}>
                                > NO VISION LOADED<br/>
                                > RETINAL_BUFFER EMPTY
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="image-section">
            <div className="terminal-window">
                <div className="terminal-header">
                    > MANIFESTING VISUAL_THOUGHTFORM...
                </div>
                <div className="image-viewer">
                    <div className="image-container">
                        <img 
                            ref={imageRef}
                            src={imageUrl} 
                            alt="VISUAL_MANIFESTATION"
                            className="art-image"
                            onLoad={handleImageLoad}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                        />
                        {!imageLoaded && (
                            <div className="prompt-terminal" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="loading">LOADING VISUAL_DATA</div>
                            </div>
                        )}
                        {imageLoaded && (
                            <div 
                                className="image-reveal-mask" 
                                style={{ height: `${revealHeight}%` }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main App Component
function ArtViewerApp() {
    const [selectedArt, setSelectedArt] = useState(null);
    const [typingComplete, setTypingComplete] = useState(false);

    const handleArtSelect = (art) => {
        setSelectedArt(art);
        setTypingComplete(false);
        
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
                    onTypingComplete={handleTypingComplete}
                />
                <ImageViewer 
                    imageUrl={selectedArt?.backblaze_path || null}
                    shouldReveal={typingComplete}
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

// Initialize React app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');
    console.log('React available:', typeof React !== 'undefined');
    console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');
    
    const root = document.getElementById('root');
    console.log('Root element found:', root !== null);
    
    if (root && typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
        try {
            console.log('ReactDOM.createRoot available:', typeof ReactDOM.createRoot === 'function');
            const reactRoot = ReactDOM.createRoot(root);
            reactRoot.render(React.createElement(ArtViewerApp));
            console.log('React app rendered successfully');
        } catch (error) {
            console.error('Error rendering React app:', error);
        }
    } else {
        console.error('Missing dependencies:', {
            root: root !== null,
            React: typeof React !== 'undefined',
            ReactDOM: typeof ReactDOM !== 'undefined'
        });
    }
});