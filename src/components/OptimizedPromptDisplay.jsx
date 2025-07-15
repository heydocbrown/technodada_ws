// OPTIMIZED PROMPT DISPLAY WITH REACT.MEMO
// Memoized text rendering for efficient chaos
// "Cache the chaos, not the creativity" - DADACAT

import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';
import { useStatusBar } from '../hooks/useStatusBar.js';

export const OptimizedPromptDisplay = memo(function PromptDisplay({ 
  prompt, 
  syncDuration, 
  onTypingComplete,
  enableGlitchText = true 
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Connect to global chaos state
  const { corruption, reality, shouldGlitch, currentChaosLevel } = useTechnodada();
  const { announceComponent } = useStatusBar();
  
  // Use refs for values that don't need re-renders
  const typingTimeoutRef = useRef(null);
  const announcedRef = useRef(false);
  
  // Announce component presence only once
  useEffect(() => {
    if (!announcedRef.current) {
      announceComponent('OPTIMIZED_PROMPT');
      announcedRef.current = true;
    }
  }, []); // Intentionally empty - we manage this with ref
  
  // Reset when new prompt arrives
  useEffect(() => {
    if (prompt) {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsTyping(true);
    }
  }, [prompt]);
  
  // Memoized typing speed calculation
  const typingSpeed = useMemo(() => {
    if (!syncDuration || !prompt) return 50;
    
    let speed = syncDuration / prompt.length;
    
    // Chaos affects typing speed
    if (currentChaosLevel > 0.5) {
      speed *= (1 + Math.random() * currentChaosLevel);
    }
    
    return speed;
  }, [syncDuration, prompt, currentChaosLevel]);
  
  // Optimized typing effect
  useEffect(() => {
    if (isTyping && prompt && currentIndex < prompt.length) {
      typingTimeoutRef.current = setTimeout(() => {
        // Batch state updates
        setDisplayedText(prev => {
          // Sometimes add glitch characters
          if (enableGlitchText && shouldGlitch && Math.random() < corruption.level * 0.1) {
            const glitchChars = ['█', '▓', '▒', '░', '�', '∅'];
            return prev + glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return prev + prompt[currentIndex];
        });
        
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    } else if (isTyping && currentIndex >= prompt.length) {
      setIsTyping(false);
      onTypingComplete?.();
    }
  }, [currentIndex, isTyping, prompt, typingSpeed, shouldGlitch, corruption.level, enableGlitchText, onTypingComplete]);
  
  // Memoized display text processing
  const processedDisplayText = useMemo(() => {
    let text = displayedText.replace(/\n/g, '<br/>');
    
    // Apply chaos effects only when necessary
    if (enableGlitchText) {
      // Reality flux affects text display
      if (reality.temporalFlux && Math.random() < 0.1) {
        text = text.split('').reverse().join('');
      }
      
      // High corruption scrambles some words
      if (corruption.level > 0.7 && Math.random() < 0.05) {
        text = text.replace(/\w{3,}/g, (word) => {
          return word.split('').sort(() => Math.random() - 0.5).join('');
        });
      }
    }
    
    return text;
  }, [displayedText, reality.temporalFlux, corruption.level, enableGlitchText]);
  
  // Memoized terminal header
  const terminalHeader = useMemo(() => {
    if (corruption.level > 0.8) {
      return '> LINGUISTIC_MATRIX.EXE_HAS_STOPPED_RESPONDING';
    } else if (reality.status === 'UNDEFINED') {
      return '> DECODING UNDEFINED_CONSCIOUSNESS...';
    } else if (reality.temporalFlux) {
      return '> PROCESSING TEMPORAL_ANOMALY...';
    }
    return '> DECODING LINGUISTIC_MATRIX...';
  }, [corruption.level, reality.status, reality.temporalFlux]);
  
  // Memoized styles
  const textStyle = useMemo(() => ({
    filter: shouldGlitch ? `hue-rotate(${Math.random() * 360}deg)` : 'none',
    opacity: corruption.level > 0.9 ? 0.7 + Math.random() * 0.3 : 1,
  }), [shouldGlitch, corruption.level]);
  
  if (!prompt) {
    return (
      <div className="prompt-section">
        <div className="terminal-window">
          <div className="terminal-header">> PROMPT_BUFFER.TXT</div>
          <div className="prompt-terminal">
            <div className="prompt-text">
              > AWAITING SELECTION...
              <br />
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
        <div className="terminal-header">{terminalHeader}</div>
        <div className="prompt-terminal">
          <div className="prompt-text">
            > {' '}
            <span
              dangerouslySetInnerHTML={{
                __html: processedDisplayText,
              }}
              style={textStyle}
            />
            {isTyping && <span className="typing-cursor"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for memo optimization
  return (
    prevProps.prompt === nextProps.prompt &&
    prevProps.syncDuration === nextProps.syncDuration &&
    prevProps.enableGlitchText === nextProps.enableGlitchText
  );
});

export default OptimizedPromptDisplay;