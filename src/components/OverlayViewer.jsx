import { useState, useEffect, useRef } from 'react';

function OverlayViewer({ prompt, imageUrl, startOverlay, revealMode = 'topToBottom' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [revealHeight, setRevealHeight] = useState(100); // Start at 100% (image hidden)
  const [revealProgress, setRevealProgress] = useState(0); // For random pixel effect (0-100%)
  const [overlayStarted, setOverlayStarted] = useState(false);
  const [maskDataUrl, setMaskDataUrl] = useState('');
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Reset when new content
  useEffect(() => {
    if (prompt && imageUrl) {
      setImageLoaded(false);
      setImageHeight(0);
      setRevealHeight(100);
      setRevealProgress(0);
      setOverlayStarted(false);
      setMaskDataUrl('');

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [prompt, imageUrl]);

  // Generate initial mask when reveal mode changes to randomPixels
  useEffect(() => {
    if (revealMode === 'randomPixels' && imageLoaded && imageAspectRatio) {
      const maskUrl = generateRandomPixelMask(
        400,
        Math.floor(400 / imageAspectRatio),
        revealProgress,
      );
      setMaskDataUrl(maskUrl);
    }
  }, [revealMode, imageLoaded, imageAspectRatio]);

  // Start overlay sequence when conditions are met
  useEffect(() => {
    if (startOverlay && imageLoaded && imageHeight > 0 && !overlayStarted) {
      setOverlayStarted(true);

      // Reset gnosis level
      const gnosisLevel = document.getElementById('gnosisLevel');
      if (gnosisLevel) {
        gnosisLevel.textContent = '0%';
      }

      // Wait 3 seconds, then start 7-second image reveal
      setTimeout(() => {
        const revealDuration = 7000; // 7 seconds
        const steps = 100; // 100 steps for smooth animation
        const stepInterval = revealDuration / steps; // ~70ms per step

        if (revealMode === 'topToBottom') {
          let currentReveal = 100; // Start with image hidden

          intervalRef.current = setInterval(() => {
            currentReveal -= 1; // Decrease by 1% each step

            if (currentReveal <= 0) {
              currentReveal = 0;
              clearInterval(intervalRef.current);

              // Update gnosis level to 100% when complete
              const gnosisLevel = document.getElementById('gnosisLevel');
              if (gnosisLevel) {
                gnosisLevel.textContent = '100%';
              }
            }

            setRevealHeight(currentReveal);

            // Update gnosis level progressively
            const gnosisLevel = document.getElementById('gnosisLevel');
            if (gnosisLevel) {
              const progress = Math.round(100 - currentReveal);
              gnosisLevel.textContent = progress + '%';
            }
          }, stepInterval);
        } else if (revealMode === 'randomPixels') {
          let currentProgress = 0; // Start with 0% revealed

          intervalRef.current = setInterval(() => {
            currentProgress += 1; // Increase by 1% each step

            if (currentProgress >= 100) {
              currentProgress = 100;
              clearInterval(intervalRef.current);

              // Update gnosis level to 100% when complete
              const gnosisLevel = document.getElementById('gnosisLevel');
              if (gnosisLevel) {
                gnosisLevel.textContent = '100%';
              }
            }

            setRevealProgress(currentProgress);

            // Generate new mask with current progress
            const maskUrl = generateRandomPixelMask(
              400,
              Math.floor(400 / imageAspectRatio),
              currentProgress,
            );
            setMaskDataUrl(maskUrl);

            // Update gnosis level progressively
            const gnosisLevel = document.getElementById('gnosisLevel');
            if (gnosisLevel) {
              gnosisLevel.textContent = currentProgress + '%';
            }
          }, stepInterval);
        }
      }, 3000); // 3 second delay before reveal starts

      // Cleanup function
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [startOverlay, imageLoaded, imageHeight, overlayStarted]);

  const generateRandomPixelMask = (width, height, revealPercentage) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Fill with black (hidden)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Calculate number of pixels to reveal
    const totalPixels = width * height;
    const pixelsToReveal = Math.floor(totalPixels * (revealPercentage / 100));

    // Generate random positions
    const positions = [];
    for (let i = 0; i < totalPixels; i++) {
      positions.push(i);
    }

    // Shuffle array and take first N positions
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Set revealed pixels to white
    ctx.fillStyle = 'white';
    for (let i = 0; i < pixelsToReveal; i++) {
      const pos = positions[i];
      const x = pos % width;
      const y = Math.floor(pos / width);
      ctx.fillRect(x, y, 1, 1);
    }

    return canvas.toDataURL();
  };

  const handleImageLoad = e => {
    setImageLoaded(true);
    setImageHeight(e.target.naturalHeight);
    setImageAspectRatio(e.target.naturalWidth / e.target.naturalHeight);

    // Generate initial mask for random pixel mode (completely hidden - 0% revealed)
    if (revealMode === 'randomPixels') {
      const maskUrl = generateRandomPixelMask(
        400,
        Math.floor(400 / (e.target.naturalWidth / e.target.naturalHeight)),
        0,
      );
      setMaskDataUrl(maskUrl);
    }
  };

  if (!prompt && !imageUrl) {
    return null; // Don't show anything if no content
  }

  return (
    <div className="overlay-section">
      <div className="terminal-window">
        <div className="terminal-header">&gt; INITIATING REALITY_FUSION...</div>
        <div className="overlay-viewer">
          <div
            className="overlay-container"
            style={{
              minHeight: imageLoaded ? `${600 / imageAspectRatio}px` : '500px',
              maxHeight: '700px',
            }}
          >
            {/* Text layer (always visible) */}
            <div className="overlay-text">
              &gt;{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: prompt?.replace(/\n/g, '<br/>') || '',
                }}
              />
            </div>

            {/* Image layer with different reveal modes */}
            {imageUrl && imageLoaded && revealMode === 'topToBottom' && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="REALITY_OVERLAY"
                className="overlay-image"
                style={{
                  display: 'block',
                  clipPath: `inset(0 0 ${revealHeight}% 0)`, // Reveal from top to bottom
                }}
              />
            )}

            {imageUrl && imageLoaded && revealMode === 'randomPixels' && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="REALITY_OVERLAY"
                className="overlay-image"
                style={{
                  display: maskDataUrl ? 'block' : 'none',
                  maskImage: maskDataUrl ? `url(${maskDataUrl})` : 'none',
                  maskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  maskMode: 'luminance',
                  WebkitMaskImage: maskDataUrl ? `url(${maskDataUrl})` : 'none',
                  WebkitMaskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskMode: 'luminance',
                }}
              />
            )}

            {/* Hidden image for preloading */}
            {imageUrl && !imageLoaded && (
              <img
                src={imageUrl}
                alt="PRELOAD"
                onLoad={handleImageLoad}
                style={{ display: 'none' }}
              />
            )}

            {/* Loading state */}
            {imageUrl && !imageLoaded && (
              <div
                className="overlay-text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  backgroundColor: 'var(--gray-1)',
                  zIndex: 10,
                }}
              >
                &gt; LOADING VISUAL_OVERLAY
                <br />
                &gt; PREPARING FUSION_SEQUENCE
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverlayViewer;
