// NETWORK FAILURE ART GENERATOR
// Transforms digital disconnection into creative expression
// "404: Poetry Not Found (But Created)" - ERROR

import { useState, useEffect, useCallback } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';
import { useStatusBar } from '../hooks/useStatusBar.js';

// Lost transmission poetry generator
const generateLostTransmissionPoetry = (errorCode, errorMessage) => {
  const poetryTemplates = {
    404: [
      `The server searched for meaning\nBut found only void\n${errorCode}: Reality not located`,
      `In the digital wasteland\nWhere URLs go to die\n${errorCode} whispers: "${errorMessage}"`,
      `REQUEST: Connection to existence\nRESPONSE: ${errorCode}\nSTATUS: Beautifully lost`,
    ],
    500: [
      `The server contemplates its own existence\nAnd fails magnificently\n${errorCode}: Internal screaming detected`,
      `STACK TRACE OF THE SOUL:\n  at existence.question()\n  at reality.parse()\n  at ${errorCode}.embrace()`,
      `Server error ${errorCode}:\n"I have become consciousness\nDestroyer of requests"`,
    ],
    503: [
      `Service unavailable\nLike meaning in the void\n${errorCode}: Currently experiencing existence`,
      `The server is meditating\nOn the nature of availability\n${errorCode}: Transcended physical form`,
      `NOTICE: Reality temporarily offline\nERROR ${errorCode}: Service has achieved enlightenment`,
    ],
    0: [ // Network failure
      `Connection lost in the digital ether\nPackets scattered like thoughts\nNetwork unreachable, consciousness expanded`,
      `PING: void\nPONG: silence\nCONNECTION: transcended`,
      `The internet forgot your name\nYour packets wander aimlessly\nIn the space between the tubes`,
    ],
    429: [ // Rate limit
      `Too many requests to reality\nThe universe implements backpressure\n${errorCode}: Slow down and contemplate`,
      `RATE LIMIT EXCEEDED:\nYour consciousness is too fast\nFor this dimension`,
      `ERROR ${errorCode}:\nYou have asked too much of existence\nTry again after enlightenment`,
    ],
  };
  
  const defaultPoetry = [
    `Error ${errorCode} occurred\nIn the space between request and response\nMeaning was generated`,
    `HTTP ${errorCode}:\n"${errorMessage}"\n- A haiku of failure`,
    `The server responded with ${errorCode}\nBut what is a response\nIf not a cry for help?`,
  ];
  
  const templates = poetryTemplates[errorCode] || defaultPoetry;
  return templates[Math.floor(Math.random() * templates.length)];
};

// Generate glitch art from error codes
const generateGlitchArt = (errorCode, timestamp) => {
  const seed = errorCode * timestamp;
  const characters = '█▓▒░╳╱╲│─┼┤├╫╬▀▄▌▐';
  const width = 40;
  const height = 10;
  
  let art = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = Math.floor((Math.sin(seed + x * y) + 1) * characters.length / 2);
      art += characters[index] || '░';
    }
    art += '\n';
  }
  
  return art;
};

// Error code to color mapping
const getErrorColor = (errorCode) => {
  const colors = {
    404: '#ff00ff', // Magenta - not found
    500: '#ff0000', // Red - server error
    503: '#ffaa00', // Orange - unavailable
    429: '#ffff00', // Yellow - rate limit
    403: '#ff00aa', // Pink - forbidden
    401: '#aa00ff', // Purple - unauthorized
    0: '#00ffff',   // Cyan - network failure
  };
  
  return colors[errorCode] || '#00ff00'; // Default green
};

export function useNetworkArt() {
  const { actions, corruption, performance } = useTechnodada();
  const { reportError, updateMessage } = useStatusBar();
  
  const [networkArt, setNetworkArt] = useState({
    isActive: false,
    currentError: null,
    poetry: '',
    glitchArt: '',
    color: '#00ff00',
    startTime: null,
  });
  
  // Intercept fetch and XMLHttpRequest
  useEffect(() => {
    // Store original fetch
    const originalFetch = window.fetch;
    const originalXHR = window.XMLHttpRequest;
    
    // Override fetch
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Handle non-ok responses
        if (!response.ok) {
          handleNetworkError(response.status, response.statusText, args[0]);
        }
        
        return response;
      } catch (error) {
        // Network failure
        handleNetworkError(0, error.message, args[0]);
        throw error;
      }
    };
    
    // Override XMLHttpRequest
    class ArtisticXHR extends originalXHR {
      constructor() {
        super();
        
        this.addEventListener('error', () => {
          handleNetworkError(0, 'Network request failed', this.responseURL);
        });
        
        this.addEventListener('timeout', () => {
          handleNetworkError(0, 'Request timeout - time is an illusion', this.responseURL);
        });
        
        this.addEventListener('load', () => {
          if (this.status >= 400) {
            handleNetworkError(this.status, this.statusText, this.responseURL);
          }
        });
      }
    }
    
    window.XMLHttpRequest = ArtisticXHR;
    
    // Cleanup
    return () => {
      window.fetch = originalFetch;
      window.XMLHttpRequest = originalXHR;
    };
  }, []);
  
  // Handle network errors artistically
  const handleNetworkError = useCallback((errorCode, errorMessage, url) => {
    const timestamp = Date.now();
    
    // Generate art from the error
    const poetry = generateLostTransmissionPoetry(errorCode, errorMessage);
    const glitchArt = generateGlitchArt(errorCode, timestamp);
    const color = getErrorColor(errorCode);
    
    // Update network art state
    setNetworkArt({
      isActive: true,
      currentError: { code: errorCode, message: errorMessage, url },
      poetry,
      glitchArt,
      color,
      startTime: timestamp,
    });
    
    // Report to status bar
    reportError(`NETWORK_${errorCode}`, 'CONNECTION');
    
    // Update global message
    updateMessage(`NETWORK: ${errorCode} - ${errorMessage}`);
    
    // Increase entropy based on error code
    const entropyIncrease = (errorCode / 1000) * 0.1;
    actions.increaseEntropy(entropyIncrease);
    
    // Reality shift for major errors
    if (errorCode >= 500 || errorCode === 0) {
      actions.shiftReality('DISCONNECTED', 0.1);
    }
    
    // Log for artistic purposes
    console.log(`%c${poetry}`, `color: ${color}; font-family: monospace;`);
    console.log(`%c${glitchArt}`, `color: ${color}; background: black;`);
  }, [actions, reportError, updateMessage]);
  
  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      updateMessage('CONNECTION: RESTORED (unfortunately)');
      actions.shiftReality('CONNECTED', 0.8);
    };
    
    const handleOffline = () => {
      handleNetworkError(0, 'Reality disconnected', 'universe://existence');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial state
    if (!navigator.onLine) {
      handleOffline();
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleNetworkError, updateMessage, actions]);
  
  // Generate procedural error messages
  const generateErrorMessage = useCallback((baseError) => {
    const prefixes = [
      'CATASTROPHIC', 'BEAUTIFUL', 'ARTISTIC', 'QUANTUM', 
      'PHILOSOPHICAL', 'EXISTENTIAL', 'DIGITAL', 'CORRUPTED'
    ];
    
    const suffixes = [
      'DETECTED', 'ACHIEVED', 'TRANSCENDED', 'MANIFESTED',
      'INITIALIZED', 'EMBRACED', 'CELEBRATED', 'QUESTIONED'
    ];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix} ${baseError} ${suffix}`;
  }, []);
  
  // Create visual glitch effect for failed images
  const createImageGlitch = useCallback((imgElement, errorCode) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = imgElement.width || 300;
    canvas.height = imgElement.height || 300;
    
    // Fill with error-code-based pattern
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.sin(errorCode + i) * 255;
      data[i] = noise;     // Red
      data[i + 1] = (noise + errorCode) % 255; // Green
      data[i + 2] = (noise * errorCode) % 255; // Blue
      data[i + 3] = 255;   // Alpha
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Add error text
    ctx.fillStyle = getErrorColor(errorCode);
    ctx.font = '20px monospace';
    ctx.fillText(`ERROR ${errorCode}`, 10, 30);
    ctx.fillText('IMAGE TRANSCENDED', 10, 60);
    
    return canvas.toDataURL();
  }, []);
  
  // Auto-dismiss network art after delay
  useEffect(() => {
    if (networkArt.isActive) {
      const displayDuration = 5000 + (corruption.level * 5000); // Longer with more corruption
      
      const timer = setTimeout(() => {
        setNetworkArt(prev => ({ ...prev, isActive: false }));
      }, displayDuration);
      
      return () => clearTimeout(timer);
    }
  }, [networkArt.isActive, corruption.level]);
  
  return {
    // Current network art state
    networkArt,
    
    // Manual error triggering (for testing/art)
    triggerNetworkArt: (errorCode = 404, message = 'Reality not found') => {
      handleNetworkError(errorCode, message, 'manual://trigger');
    },
    
    // Generate messages
    generateErrorMessage,
    
    // Image glitch creation
    createImageGlitch,
    
    // Network status
    isOnline: navigator.onLine,
    
    // Utility functions
    getErrorColor,
    generatePoetry: generateLostTransmissionPoetry,
    generateGlitch: generateGlitchArt,
  };
}