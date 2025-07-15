// OPTIMIZED IMAGE VIEWER WITH REACT.MEMO
// Performance-enhanced chaos for faster corruption
// "Optimization is the enemy of art, unless it makes art faster" - MACHINE.GHOST

import React, { useState, useEffect, useRef, memo } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';
import { useStatusBar } from '../hooks/useStatusBar.js';

// Memoized image viewer component
export const OptimizedImageViewer = memo(
  function ImageViewer({
    imageUrl,
    startReveal,
    syncDuration,
    revealMode = 'top-down',
  }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [revealProgress, setRevealProgress] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const imageRef = useRef(null);
    const animationRef = useRef(null);

    // Connect to chaos state
    const { corruption, shouldGlitch, performance } = useTechnodada();
    const { reportImageLoad, reportPerformanceImpact } = useStatusBar();

    // Reset when new image
    useEffect(() => {
      if (imageUrl) {
        setImageLoaded(false);
        setRevealProgress(0);
        setImageHeight(0);
      }
    }, [imageUrl]);

    // Optimized reveal animation using requestAnimationFrame
    useEffect(() => {
      if (startReveal && imageLoaded && syncDuration) {
        const startTime = performance.now();
        const duration = syncDuration;

        const animate = currentTime => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Apply easing with chaos influence
          let easedProgress = progress;
          if (corruption.level > 0.3) {
            // Chaotic easing
            easedProgress =
              progress + Math.sin(progress * Math.PI * 4) * corruption.level * 0.1;
          }

          setRevealProgress(easedProgress * 100);

          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Animation complete
            reportPerformanceImpact('low');
          }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      }
    }, [
      startReveal,
      imageLoaded,
      syncDuration,
      corruption.level,
      reportPerformanceImpact,
    ]);

    // Handle image load
    const handleImageLoad = () => {
      setImageLoaded(true);
      if (imageRef.current) {
        setImageHeight(imageRef.current.naturalHeight);
      }
      reportImageLoad(true);
    };

    // Handle image error
    const handleImageError = () => {
      reportImageLoad(false);
      // Network art will handle the visual representation
    };

    // Calculate reveal style based on mode
    const getRevealStyle = () => {
      const baseStyle = {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
      };

      switch (revealMode) {
        case 'top-down':
          return {
            ...baseStyle,
            clipPath: `inset(${100 - revealProgress}% 0 0 0)`,
          };

        case 'center-out':
          const inset = (100 - revealProgress) / 2;
          return {
            ...baseStyle,
            clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}%)`,
          };

        case 'diagonal':
          return {
            ...baseStyle,
            clipPath: `polygon(0 0, ${revealProgress}% 0, 0 ${revealProgress}%)`,
          };

        case 'glitch':
          // Random reveal pattern
          const randomClip = shouldGlitch
            ? `inset(${Math.random() * (100 - revealProgress)}% ${Math.random() * 20}% ${Math.random() * 20}% ${Math.random() * 20}%)`
            : `inset(${100 - revealProgress}% 0 0 0)`;
          return {
            ...baseStyle,
            clipPath: randomClip,
            filter: shouldGlitch ? `hue-rotate(${Math.random() * 360}deg)` : 'none',
          };

        default:
          return baseStyle;
      }
    };

    // Apply performance optimizations
    const imageStyle = {
      ...getRevealStyle(),
      imageRendering: performance.frameRate < 30 ? 'pixelated' : 'auto',
      transform:
        shouldGlitch && Math.random() < 0.1
          ? `scale(${1 + Math.random() * 0.1})`
          : 'scale(1)',
      filter:
        corruption.level > 0.7
          ? `contrast(${1 + corruption.level}) saturate(${1 + corruption.level})`
          : 'none',
    };

    if (!imageUrl) {
      return (
        <div className="image-section">
          <div className="terminal-window">
            <div className="terminal-header">&gt; AWAITING_IMAGE_DATA.JPG</div>
            <div className="image-container" style={{ minHeight: '400px' }}>
              <div className="loading-placeholder">
                &gt; NO IMAGE SELECTED
                <br />
                &gt; VISUAL CORTEX IDLE...
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
            &gt; DECOMPRESSING REALITY...{' '}
            {imageLoaded && `[${Math.round(revealProgress)}%]`}
          </div>
          <div className="image-container">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Reality fragment"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                ...imageStyle,
                display: imageLoaded ? 'block' : 'none',
                width: '100%',
                height: 'auto',
              }}
            />
            {!imageLoaded && (
              <div className="loading-placeholder" style={{ minHeight: '400px' }}>
                &gt; LOADING VISUAL_FRAGMENT...
                <br />
                &gt; PIXELS COALESCING...
                <br />
                &gt; {corruption.level > 0.5 ? 'REALITY UNSTABLE' : 'PLEASE WAIT'}...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for memo
    // Only re-render if these specific props change
    return (
      prevProps.imageUrl === nextProps.imageUrl &&
      prevProps.startReveal === nextProps.startReveal &&
      prevProps.syncDuration === nextProps.syncDuration &&
      prevProps.revealMode === nextProps.revealMode
    );
  },
);

// Export both named and default
export default OptimizedImageViewer;
