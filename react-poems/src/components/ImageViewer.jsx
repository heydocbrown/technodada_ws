import { useState, useEffect, useRef } from 'react';

const IMAGE_REVEAL_SPEED = 10; // milliseconds per row

function ImageViewer({ imageUrl, startReveal }) {
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
        if (startReveal && imageLoaded && imageHeight > 0) {
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
    }, [startReveal, imageLoaded, imageHeight]);

    const handleImageLoad = (e) => {
        setImageLoaded(true);
        setImageHeight(e.target.naturalHeight);
    };

    if (!imageUrl) {
        return (
            <div className="image-section">
                <div className="terminal-window">
                    <div className="terminal-header">
                        &gt; VISUAL_CORTEX.DAT
                    </div>
                    <div className="image-viewer">
                        <div className="prompt-terminal" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="prompt-text" style={{ textAlign: 'center' }}>
                                &gt; NO VISION LOADED<br/>
                                &gt; RETINAL_BUFFER EMPTY
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
                    &gt; MANIFESTING VISUAL_THOUGHTFORM...
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
                                style={{ 
                                    height: `${revealHeight}%`,
                                    bottom: 0,
                                    top: 'auto'
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageViewer;