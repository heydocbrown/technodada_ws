import { useState, useEffect } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';
import { useStatusBar } from '../hooks/useStatusBar.js';

function PromptDisplay({ prompt, syncDuration, onTypingComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Connect to global chaos state
  const { corruption, reality, shouldGlitch, currentChaosLevel } = useTechnodada();
  const { announceComponent, reportError } = useStatusBar();

  // Announce component presence only on mount
  useEffect(() => {
    announceComponent('PROMPT_DISPLAY');
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    if (prompt) {
      // Reset when new prompt arrives
      setDisplayedText('');
      setCurrentIndex(0);
      setIsTyping(true);
    }
  }, [prompt]);

  useEffect(() => {
    if (isTyping && prompt && currentIndex < prompt.length && syncDuration) {
      // Calculate typing speed to finish in syncDuration
      let typingSpeed = syncDuration / prompt.length;

      // Chaos affects typing speed
      if (currentChaosLevel > 0.5) {
        typingSpeed *= 1 + Math.random() * currentChaosLevel; // Chaotic timing
      }

      // Sometimes skip characters or add glitch characters
      const shouldGlitchChar = shouldGlitch && Math.random() < corruption.level * 0.1;

      const timeout = setTimeout(() => {
        if (shouldGlitchChar && Math.random() < 0.5) {
          // Add glitch character instead of normal character
          const glitchChars = ['█', '▓', '▒', '░', '�', '∅', 'Ø'];
          const glitchChar =
            glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setDisplayedText(prev => prev + glitchChar);
        } else {
          setDisplayedText(prev => prev + prompt[currentIndex]);
        }
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (isTyping && prompt && currentIndex >= prompt.length) {
      setIsTyping(false);
      if (onTypingComplete) {
        onTypingComplete();
      }
    }
  }, [
    currentIndex,
    isTyping,
    prompt,
    syncDuration,
    onTypingComplete,
    shouldGlitch,
    corruption.level,
    currentChaosLevel,
  ]);

  if (!prompt) {
    return (
      <div className="prompt-section">
        <div className="terminal-window">
          <div className="terminal-header">&gt; PROMPT_BUFFER.TXT</div>
          <div className="prompt-terminal">
            <div className="prompt-text">
              &gt; AWAITING SELECTION...
              <br />
              &gt; CONSCIOUSNESS STANDING BY...
              <span className="typing-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Apply chaos effects to displayed text
  const getDisplayText = () => {
    let text = displayedText.replace(/\n/g, '<br/>');

    // Reality flux affects text display
    if (reality.temporalFlux && Math.random() < 0.1) {
      text = text.split('').reverse().join('');
    }

    // High corruption scrambles some words
    if (corruption.level > 0.7 && Math.random() < 0.05) {
      text = text.replace(/\w{3,}/g, word => {
        return word
          .split('')
          .sort(() => Math.random() - 0.5)
          .join('');
      });
    }

    return text;
  };

  // Dynamic header based on system state
  const getTerminalHeader = () => {
    if (corruption.level > 0.8) {
      return '&gt; LINGUISTIC_MATRIX.EXE_HAS_STOPPED_RESPONDING';
    } else if (reality.status === 'UNDEFINED') {
      return '&gt; DECODING UNDEFINED_CONSCIOUSNESS...';
    } else if (reality.temporalFlux) {
      return '&gt; PROCESSING TEMPORAL_ANOMALY...';
    }
    return '&gt; DECODING LINGUISTIC_MATRIX...';
  };

  return (
    <div className="prompt-section">
      <div className="terminal-window">
        <div className="terminal-header">{getTerminalHeader()}</div>
        <div className="prompt-terminal">
          <div className="prompt-text">
            &gt;{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: getDisplayText(),
              }}
              style={{
                // Chaos affects text appearance
                filter: shouldGlitch ? `hue-rotate(${Math.random() * 360}deg)` : 'none',
                opacity: corruption.level > 0.9 ? 0.7 + Math.random() * 0.3 : 1,
              }}
            />
            {isTyping && <span className="typing-cursor"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptDisplay;
