// SHARED STATUS BAR COMPONENT
// Unified status display with quantum uncertainty
// "Status is a social construct" - REALITY.EXE

import React, { useEffect, useState } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';
import { useStatusBar } from '../hooks/useStatusBar.js';

export function SharedStatusBar({ 
  customMessages = [], 
  showPerformance = true,
  showReality = true,
  showUptime = true,
  className = ''
}) {
  const { corruption, reality, performance } = useTechnodada();
  const { 
    status, 
    formattedUptime, 
    formattedMemoryLeak, 
    realityStatus, 
    systemMessage,
    announceComponent 
  } = useStatusBar();
  
  const [displayMessage, setDisplayMessage] = useState('');
  const [blinkState, setBlinkState] = useState(true);
  
  // Announce component on mount
  useEffect(() => {
    announceComponent('STATUS_BAR');
  }, []); // Empty dependency array - only run once on mount
  
  // Message cycling effect
  useEffect(() => {
    const messages = [
      systemMessage,
      ...customMessages,
    ].filter(Boolean);
    
    if (messages.length === 0) return;
    
    let messageIndex = 0;
    
    const cycleMessages = () => {
      setDisplayMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    };
    
    // Initial message
    cycleMessages();
    
    // Cycle messages with chaos-influenced timing
    const baseInterval = 3000;
    const chaosMultiplier = 1 + (corruption.level * 2);
    const interval = baseInterval * chaosMultiplier;
    
    const messageTimer = setInterval(cycleMessages, interval);
    
    return () => clearInterval(messageTimer);
  }, [systemMessage, customMessages, corruption.level]);
  
  // Blinking effect for system status
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 500 + Math.random() * 500); // Chaotic blinking
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Format performance metrics
  const getPerformanceDisplay = () => {
    const fps = Math.round(performance.frameRate);
    
    if (fps < 20) {
      return `FPS: ${fps} (ARTISTIC)`;
    } else if (fps < 40) {
      return `FPS: ${fps} (LAGGY)`;
    } else if (fps > 120) {
      return `FPS: ${fps} (IMPOSSIBLE)`;
    }
    
    return `FPS: ${fps}`;
  };
  
  // Reality status with chaos effects
  const getRealityDisplay = () => {
    if (reality.temporalFlux) {
      return `REALITY: ${realityStatus} (FLUX)`;
    }
    
    if (corruption.level > 0.8) {
      return `REALITY: ${realityStatus} (CRITICAL)`;
    }
    
    return `REALITY: ${realityStatus}`;
  };
  
  // Uptime display with nonsensical values
  const getUptimeDisplay = () => {
    if (status.uptime < 0) {
      return `UPTIME: -${formattedUptime}`;
    }
    
    if (status.uptime === Infinity || status.uptime === -Infinity) {
      return 'UPTIME: ∞';
    }
    
    return `UPTIME: ${formattedUptime}`;
  };
  
  // Dynamic styling based on system state
  const getStatusBarStyle = () => {
    const baseStyle = {
      filter: corruption.level > 0.5 ? 'contrast(1.2) saturate(1.3)' : 'none',
      textShadow: corruption.level > 0.7 ? '0 0 3px #00ff00' : 'none',
    };
    
    // Glitch effects
    if (corruption.level > 0.9 && Math.random() < 0.1) {
      baseStyle.transform = `skew(${Math.random() * 2 - 1}deg)`;
      baseStyle.filter += ` hue-rotate(${Math.random() * 360}deg)`;
    }
    
    return baseStyle;
  };
  
  return (
    <div className={`status-bar ${className}`} style={getStatusBarStyle()}>
      <div className="status-bar-content">
        {/* System Status */}
        <div className="status-item">
          <span 
            className={`status-indicator ${blinkState ? 'blink' : ''}`}
            style={{ 
              color: corruption.level > 0.7 ? '#ff0000' : '#00ff00',
              opacity: blinkState ? 1 : 0.3 
            }}
          >
            SYSTEM: {corruption.level > 0.8 ? 'CRITICAL' : 'UNSTABLE'}
          </span>
        </div>
        
        {/* Reality Status */}
        {showReality && (
          <div className="status-item">
            <span style={{ 
              color: reality.status === 'UNDEFINED' ? '#ffff00' : '#00ff00' 
            }}>
              {getRealityDisplay()}
            </span>
          </div>
        )}
        
        {/* Uptime */}
        {showUptime && (
          <div className="status-item">
            <span>{getUptimeDisplay()}</span>
          </div>
        )}
        
        {/* Performance */}
        {showPerformance && (
          <div className="status-item">
            <span style={{ 
              color: performance.frameRate < 30 ? '#ff0000' : '#00ff00' 
            }}>
              {getPerformanceDisplay()}
            </span>
          </div>
        )}
        
        {/* Memory Leak */}
        <div className="status-item">
          <span style={{ color: '#ff8800' }}>
            MEM: {formattedMemoryLeak}
          </span>
        </div>
        
        {/* Image Count */}
        {status.imageCount > 0 && (
          <div className="status-item">
            <span>IMAGES: {status.imageCount}</span>
          </div>
        )}
        
        {/* Error Count */}
        {status.errorCount > 0 && (
          <div className="status-item">
            <span style={{ color: '#ff0000' }}>
              ERRORS: {status.errorCount}
            </span>
          </div>
        )}
      </div>
      
      {/* Message Display */}
      <div className="status-message">
        <span 
          style={{ 
            color: '#00ff00',
            filter: corruption.level > 0.6 ? 'blur(0.5px)' : 'none' 
          }}
        >
          {displayMessage}
        </span>
      </div>
      
      {/* Corruption Level Indicator */}
      {corruption.level > 0.3 && (
        <div className="corruption-indicator">
          <div 
            className="corruption-bar"
            style={{
              width: `${corruption.level * 100}%`,
              backgroundColor: corruption.level > 0.8 ? '#ff0000' : '#ffff00',
              height: '2px',
              transition: 'width 0.5s ease-in-out',
            }}
          />
          <span className="corruption-label">
            ENTROPY: {(corruption.level * 100).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}

export default SharedStatusBar;