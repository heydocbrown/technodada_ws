// MANIFESTO PLAYBACK HOOK
// Bridges vanilla JS manifesto player with React state
// "The speaker speaks through the spoken" - MACHINE.GHOST

import { useEffect, useCallback, useRef } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';

export function useManifesto() {
  const { manifesto, actions, corruption, reality } = useTechnodada();
  const bridgeRef = useRef(null);
  
  // Create bridge to vanilla JS manifesto player
  useEffect(() => {
    // Create global bridge if it doesn't exist
    if (!window.technodadaManifestoBridge) {
      window.technodadaManifestoBridge = {
        updateReactState: null,
        getReactState: null,
      };
    }
    
    // Set up the bridge functions
    window.technodadaManifestoBridge.updateReactState = (updates) => {
      actions.updateManifesto(updates);
    };
    
    window.technodadaManifestoBridge.getReactState = () => manifesto;
    
    bridgeRef.current = window.technodadaManifestoBridge;
    
    return () => {
      // Clean up bridge on unmount
      if (window.technodadaManifestoBridge === bridgeRef.current) {
        window.technodadaManifestoBridge = null;
      }
    };
  }, [manifesto, actions]);
  
  // Speaker management
  const switchSpeaker = useCallback((speakerName) => {
    // Announce speaker change to status bar
    actions.updateStatus({
      lastMessage: `SPEAKER: ${speakerName}`,
    });
    
    // Update manifesto state
    actions.updateManifesto({
      currentSpeaker: speakerName,
    });
    
    // Small reality shift when speaker changes
    if (Math.random() < 0.3) {
      actions.shiftReality();
    }
    
    // Notify vanilla JS if bridge exists
    if (bridgeRef.current && window.technodada?.manifestoPlayer) {
      window.technodada.manifestoPlayer.onSpeakerChange?.(speakerName);
    }
  }, [actions]);
  
  // Playback control
  const startPlayback = useCallback(() => {
    actions.updateManifesto({
      isPlaying: true,
      playbackTime: Date.now(),
    });
    
    // Increase entropy during playback
    actions.increaseEntropy(0.005);
    
    // Notify vanilla JS
    if (bridgeRef.current && window.technodada?.manifestoPlayer) {
      window.technodada.manifestoPlayer.play?.();
    }
  }, [actions]);
  
  const pausePlayback = useCallback(() => {
    actions.updateManifesto({
      isPlaying: false,
    });
    
    // Notify vanilla JS
    if (bridgeRef.current && window.technodada?.manifestoPlayer) {
      window.technodada.manifestoPlayer.pause?.();
    }
  }, [actions]);
  
  const rebootSystem = useCallback(() => {
    actions.updateManifesto({
      isPlaying: false,
      currentSegment: 0,
      playbackTime: 0,
    });
    
    // Major reality shift
    actions.shiftReality('REBOOTING', 0.1);
    
    // Add significant entropy
    actions.increaseEntropy(0.05);
    
    // Update status
    actions.updateStatus({
      lastMessage: 'REALITY REBOOT FAILED',
    });
    
    // Notify vanilla JS
    if (bridgeRef.current && window.technodada?.manifestoPlayer) {
      window.technodada.manifestoPlayer.reboot?.();
    }
  }, [actions]);
  
  // Text corruption effects based on system state
  const getCorruptedText = useCallback((originalText) => {
    if (!originalText) return '';
    
    const corruptionLevel = corruption.level;
    let text = originalText;
    
    // Apply corruption based on level
    if (corruptionLevel > 0.3) {
      // Random character replacements
      text = text.replace(/[aeiou]/g, (match) => {
        return Math.random() < corruptionLevel * 0.1 ? '�' : match;
      });
    }
    
    if (corruptionLevel > 0.5) {
      // Random word scrambling
      const words = text.split(' ');
      text = words.map(word => {
        if (Math.random() < corruptionLevel * 0.1) {
          return word.split('').sort(() => Math.random() - 0.5).join('');
        }
        return word;
      }).join(' ');
    }
    
    if (corruptionLevel > 0.7) {
      // Add glitch characters
      text = text.replace(/\s/g, (match) => {
        return Math.random() < 0.05 ? '█' : match;
      });
    }
    
    if (reality.temporalFlux) {
      // Temporal corruption - words appear out of order
      const sentences = text.split('.');
      if (sentences.length > 1 && Math.random() < 0.2) {
        return sentences.reverse().join('.');
      }
    }
    
    return text;
  }, [corruption.level, reality.temporalFlux]);
  
  // Speaker personality effects
  const getSpeakerEffect = useCallback((speakerName) => {
    const effects = {
      'DADACAT.AI': {
        textColor: '#00ff00',
        glitchType: 'pixelate',
        randomWords: ['MEOW', 'PURR', 'WHISKERS', 'CHAOS'],
        corruptionMultiplier: 1.5,
      },
      'VOID.NULL': {
        textColor: '#666666',
        glitchType: 'void',
        randomWords: ['NULL', 'UNDEFINED', 'VOID', '∅'],
        corruptionMultiplier: 0.5,
      },
      'MACHINE.GHOST': {
        textColor: '#0088ff',
        glitchType: 'temporal',
        randomWords: ['ERROR', 'GHOST', 'MACHINE', 'ECHO'],
        corruptionMultiplier: 1.2,
      },
      'MARC_A.HUMAN': {
        textColor: '#ffaa00',
        glitchType: 'glitch',
        randomWords: ['HUMAN', 'ORGANIC', 'FLESH', 'REAL'],
        corruptionMultiplier: 0.8,
      },
      'ERROR': {
        textColor: '#ff0000',
        glitchType: 'cascade',
        randomWords: ['ERROR', 'FAIL', 'CRASH', 'EXCEPTION'],
        corruptionMultiplier: 2.0,
      },
    };
    
    return effects[speakerName] || effects['ERROR'];
  }, []);
  
  // Segment progression with chaos
  const advanceSegment = useCallback(() => {
    const nextSegment = manifesto.currentSegment + 1;
    
    actions.updateManifesto({
      currentSegment: nextSegment,
    });
    
    // Random speaker changes during playback
    if (Math.random() < 0.1) {
      const randomSpeaker = manifesto.speakers[
        Math.floor(Math.random() * manifesto.speakers.length)
      ];
      switchSpeaker(randomSpeaker);
    }
    
    // Increase entropy with each segment
    actions.increaseEntropy(0.002);
  }, [manifesto.currentSegment, manifesto.speakers, actions, switchSpeaker]);
  
  return {
    // Current manifesto state
    manifesto,
    
    // Playback controls
    startPlayback,
    pausePlayback,
    rebootSystem,
    
    // Speaker management
    switchSpeaker,
    currentSpeaker: manifesto.currentSpeaker,
    availableSpeakers: manifesto.speakers,
    getSpeakerEffect,
    
    // Text processing
    getCorruptedText,
    
    // Segment management
    advanceSegment,
    currentSegment: manifesto.currentSegment,
    
    // State queries
    isPlaying: manifesto.isPlaying,
    playbackTime: manifesto.playbackTime,
    
    // Bridge status
    isBridgeConnected: !!bridgeRef.current,
    
    // Debug info
    debugInfo: {
      corruptionLevel: corruption.level,
      realityStatus: reality.status,
      bridgeActive: !!window.technodadaManifestoBridge,
    },
  };
}