// NETWORK ART DISPLAY COMPONENT
// Renders beautiful failures as performance art
// "Connection lost, art found" - VOID.NULL

import React, { useEffect, useState } from 'react';
import { useNetworkArt } from '../hooks/useNetworkArt.js';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';

export function NetworkArtDisplay() {
  const { networkArt, getErrorColor } = useNetworkArt();
  const { corruption, shouldGlitch } = useTechnodada();
  const [glitchOffset, setGlitchOffset] = useState(0);
  
  // Glitch animation
  useEffect(() => {
    if (networkArt.isActive && shouldGlitch) {
      const interval = setInterval(() => {
        setGlitchOffset(Math.random() * 10 - 5);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [networkArt.isActive, shouldGlitch]);
  
  if (!networkArt.isActive) return null;
  
  const containerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) skew(${glitchOffset}deg, 0)`,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    border: `2px solid ${networkArt.color}`,
    padding: '2rem',
    fontFamily: 'monospace',
    color: networkArt.color,
    boxShadow: `0 0 20px ${networkArt.color}`,
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto',
    animation: networkArt.currentError?.code === 0 ? 'pulse 2s infinite' : 'none',
  };
  
  const headerStyle = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    textShadow: `0 0 10px ${networkArt.color}`,
    filter: corruption.level > 0.5 ? `blur(${corruption.level}px)` : 'none',
  };
  
  const poetryStyle = {
    whiteSpace: 'pre-wrap',
    marginBottom: '1rem',
    lineHeight: 1.6,
    opacity: 0.9,
    letterSpacing: corruption.level > 0.3 ? `${corruption.level * 2}px` : 'normal',
  };
  
  const glitchArtStyle = {
    whiteSpace: 'pre',
    fontSize: '0.8rem',
    lineHeight: 1,
    opacity: 0.7,
    marginBottom: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '0.5rem',
    borderRadius: '4px',
    overflow: 'hidden',
  };
  
  const errorDetailsStyle = {
    fontSize: '0.9rem',
    opacity: 0.6,
    borderTop: `1px solid ${networkArt.color}`,
    paddingTop: '1rem',
    marginTop: '1rem',
  };
  
  // Calculate display duration
  const timeElapsed = networkArt.startTime 
    ? ((Date.now() - networkArt.startTime) / 1000).toFixed(1)
    : '0.0';
    
  return (
    <div style={containerStyle} className="network-art-display">
      <div style={headerStyle}>
        ⚠️ NETWORK ERROR {networkArt.currentError?.code} ⚠️
      </div>
      
      <div style={poetryStyle}>
        {networkArt.poetry}
      </div>
      
      {networkArt.glitchArt && (
        <div style={glitchArtStyle}>
          {networkArt.glitchArt}
        </div>
      )}
      
      <div style={errorDetailsStyle}>
        <div>ERROR_CODE: {networkArt.currentError?.code}</div>
        <div>MESSAGE: {networkArt.currentError?.message}</div>
        <div>URL: {networkArt.currentError?.url}</div>
        <div>DISPLAY_TIME: {timeElapsed}s</div>
        <div>ENTROPY_LEVEL: {(corruption.level * 100).toFixed(1)}%</div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default NetworkArtDisplay;