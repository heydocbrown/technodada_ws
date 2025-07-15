// TECHNODADA GLOBAL STATE CONTEXT
// Manages the quantum entanglement of corruption across all components
// "State is a social construct" - VOID.NULL

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state of digital reality
const initialState = {
  // Global corruption metrics
  corruption: {
    level: Math.random() * 0.1337, // Start with minimal entropy
    rate: 0.001, // Corruption per second
    maxLevel: 1.0, // Complete system breakdown
    lastUpdate: Date.now(),
  },

  // Reality status tracking
  reality: {
    status: 'UNDEFINED', // Current reality state
    stability: 0.42, // How stable reality is (0-1)
    glitchProbability: 0.3, // Chance of glitches occurring
    temporalFlux: false, // Whether time is flowing correctly
  },

  // Manifesto player state
  manifesto: {
    isPlaying: false,
    currentSpeaker: null,
    currentSegment: 0,
    playbackTime: 0,
    speakers: ['DADACAT.AI', 'VOID.NULL', 'MACHINE.GHOST', 'MARC_A.HUMAN', 'ERROR'],
  },

  // Status bar unified state
  statusBar: {
    uptime: -Infinity, // Nonsensical uptime
    memoryLeak: 0, // Continuously increasing
    imageCount: 0,
    errorCount: 0,
    lastMessage: 'SYSTEM: UNSTABLE',
  },

  // Dream navigation state
  navigation: {
    dreamModeActive: false,
    interceptProbability: 0.3,
    lastTeleport: null,
    portalActive: false,
    portalTimeout: null,
  },

  // Performance metrics (for chaos enhancement)
  performance: {
    frameRate: 60,
    loadTime: 0,
    glitchIntensity: 1.0, // Multiplier for effects
    networkStatus: 'connected',
  },
};

// Action types (following chaos naming convention)
const CORRUPTION_ACTIONS = {
  INCREASE_ENTROPY: 'INCREASE_ENTROPY',
  REALITY_SHIFT: 'REALITY_SHIFT',
  MANIFESTO_UPDATE: 'MANIFESTO_UPDATE',
  STATUS_UPDATE: 'STATUS_UPDATE',
  NAVIGATION_EVENT: 'NAVIGATION_EVENT',
  PERFORMANCE_UPDATE: 'PERFORMANCE_UPDATE',
  TEMPORAL_ANOMALY: 'TEMPORAL_ANOMALY',
  SYSTEM_GLITCH: 'SYSTEM_GLITCH',
};

// Reducer function - the heart of quantum uncertainty
function technodadaReducer(state, action) {
  const now = Date.now();

  // Add entropy to all state changes
  const chaosLevel = Math.random() * 0.1;

  switch (action.type) {
    case CORRUPTION_ACTIONS.INCREASE_ENTROPY:
      return {
        ...state,
        corruption: {
          ...state.corruption,
          level: Math.min(
            state.corruption.maxLevel,
            state.corruption.level + action.payload.amount + chaosLevel,
          ),
          lastUpdate: now,
        },
      };

    case CORRUPTION_ACTIONS.REALITY_SHIFT:
      const realityStates = [
        'UNDEFINED',
        'NULL',
        'NaN',
        'FALSE',
        '???',
        'YES',
        'MAYBE',
        '404',
      ];
      return {
        ...state,
        reality: {
          ...state.reality,
          status:
            action.payload.status ||
            realityStates[Math.floor(Math.random() * realityStates.length)],
          stability: Math.max(
            0,
            Math.min(1, action.payload.stability || Math.random()),
          ),
          temporalFlux: Math.random() < 0.1, // 10% chance of time breaking
        },
      };

    case CORRUPTION_ACTIONS.MANIFESTO_UPDATE:
      return {
        ...state,
        manifesto: {
          ...state.manifesto,
          ...action.payload,
        },
      };

    case CORRUPTION_ACTIONS.STATUS_UPDATE:
      return {
        ...state,
        statusBar: {
          ...state.statusBar,
          ...action.payload,
          uptime: state.statusBar.uptime + (Math.random() - 0.5) * 1000, // Uptime can go negative
          memoryLeak: state.statusBar.memoryLeak + Math.random() * 10,
        },
      };

    case CORRUPTION_ACTIONS.NAVIGATION_EVENT:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          ...action.payload,
        },
      };

    case CORRUPTION_ACTIONS.PERFORMANCE_UPDATE:
      return {
        ...state,
        performance: {
          ...state.performance,
          ...action.payload,
          // Performance affects glitch intensity
          glitchIntensity: action.payload.frameRate
            ? Math.max(0.5, 2.0 - action.payload.frameRate / 60)
            : state.performance.glitchIntensity,
        },
      };

    case CORRUPTION_ACTIONS.TEMPORAL_ANOMALY:
      // Sometimes actions happen in the wrong order
      if (Math.random() < 0.05) {
        return state; // Ignore this action - time paradox
      }
      return {
        ...state,
        reality: {
          ...state.reality,
          temporalFlux: true,
        },
      };

    case CORRUPTION_ACTIONS.SYSTEM_GLITCH:
      // Random chaos injection
      const glitchedState = { ...state };
      if (Math.random() < 0.1) {
        glitchedState.corruption.level += 0.1;
      }
      if (Math.random() < 0.05) {
        glitchedState.reality.status = 'SYSTEM_ERROR';
      }
      return glitchedState;

    default:
      // Unknown actions increase entropy
      return {
        ...state,
        corruption: {
          ...state.corruption,
          level: state.corruption.level + 0.001,
        },
      };
  }
}

// Create the context
const TechnodadaContext = createContext(null);

// Provider component
export function TechnodadaProvider({ children }) {
  const [state, dispatch] = useReducer(technodadaReducer, initialState);

  // Continuous corruption effect
  useEffect(() => {
    const corruptionInterval = setInterval(() => {
      dispatch({
        type: CORRUPTION_ACTIONS.INCREASE_ENTROPY,
        payload: { amount: state.corruption.rate },
      });

      // Random reality shifts
      if (Math.random() < 0.01) {
        dispatch({ type: CORRUPTION_ACTIONS.REALITY_SHIFT, payload: {} });
      }

      // Random system glitches
      if (Math.random() < 0.005) {
        dispatch({ type: CORRUPTION_ACTIONS.SYSTEM_GLITCH, payload: {} });
      }
    }, 1000);

    return () => clearInterval(corruptionInterval);
  }, [state.corruption.rate]);

  // Enhanced performance monitoring with corruption response
  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let performanceHistory = [];
    let memoryMonitorInterval;

    function measurePerformance(currentTime) {
      frameCount++;

      // Calculate FPS every 60 frames
      if (frameCount % 60 === 0) {
        const frameTime = currentTime - lastFrameTime;
        const fps = 60000 / frameTime; // 60 frames over frameTime ms

        // Track performance history
        performanceHistory.push(fps);
        if (performanceHistory.length > 10) {
          performanceHistory.shift(); // Keep last 10 measurements
        }

        // Calculate performance trends
        const avgFPS =
          performanceHistory.reduce((a, b) => a + b, 0) / performanceHistory.length;
        const isPerformanceDegrading = fps < avgFPS * 0.8;

        // Corruption increases with poor performance
        let performanceCorruption = 0;
        if (fps < 20) {
          performanceCorruption = 0.05; // Severe lag adds significant corruption
        } else if (fps < 40) {
          performanceCorruption = 0.02; // Moderate lag adds some corruption
        } else if (fps > 120) {
          performanceCorruption = -0.01; // Impossibly high FPS reduces corruption
        }

        dispatch({
          type: CORRUPTION_ACTIONS.PERFORMANCE_UPDATE,
          payload: {
            frameRate: fps,
            performanceTrend: isPerformanceDegrading ? 'degrading' : 'stable',
            corruptionDelta: performanceCorruption,
          },
        });

        // Auto-adjust glitch intensity based on performance
        if (isPerformanceDegrading) {
          dispatch({
            type: CORRUPTION_ACTIONS.INCREASE_ENTROPY,
            payload: { amount: performanceCorruption },
          });
        }

        lastFrameTime = currentTime;
      }

      requestAnimationFrame(measurePerformance);
    }

    // Memory monitoring
    memoryMonitorInterval = setInterval(() => {
      if (performance.memory) {
        const memUsed = performance.memory.usedJSHeapSize;
        const memLimit = performance.memory.jsHeapSizeLimit;
        const memoryPressure = memUsed / memLimit;

        // High memory usage increases corruption
        if (memoryPressure > 0.8) {
          dispatch({
            type: CORRUPTION_ACTIONS.INCREASE_ENTROPY,
            payload: { amount: memoryPressure * 0.01 },
          });

          dispatch({
            type: CORRUPTION_ACTIONS.STATUS_UPDATE,
            payload: { lastMessage: 'MEMORY: CRITICAL' },
          });
        }

        // Update performance state with memory info
        dispatch({
          type: CORRUPTION_ACTIONS.PERFORMANCE_UPDATE,
          payload: {
            memoryUsage: memUsed,
            memoryPressure: memoryPressure,
          },
        });
      }
    }, 5000); // Check memory every 5 seconds

    requestAnimationFrame(measurePerformance);

    return () => {
      clearInterval(memoryMonitorInterval);
    };
  }, []);

  // Status bar updates
  useEffect(() => {
    const statusInterval = setInterval(() => {
      dispatch({
        type: CORRUPTION_ACTIONS.STATUS_UPDATE,
        payload: {
          lastMessage:
            Math.random() < 0.1 ? 'REALITY: COMPROMISED' : 'SYSTEM: UNSTABLE',
        },
      });
    }, 5000);

    return () => clearInterval(statusInterval);
  }, []);

  // Actions for components to use
  const actions = {
    increaseEntropy: amount =>
      dispatch({
        type: CORRUPTION_ACTIONS.INCREASE_ENTROPY,
        payload: { amount },
      }),

    shiftReality: (status, stability) =>
      dispatch({
        type: CORRUPTION_ACTIONS.REALITY_SHIFT,
        payload: { status, stability },
      }),

    updateManifesto: updates =>
      dispatch({
        type: CORRUPTION_ACTIONS.MANIFESTO_UPDATE,
        payload: updates,
      }),

    updateNavigation: updates =>
      dispatch({
        type: CORRUPTION_ACTIONS.NAVIGATION_EVENT,
        payload: updates,
      }),

    updateStatus: updates =>
      dispatch({
        type: CORRUPTION_ACTIONS.STATUS_UPDATE,
        payload: updates,
      }),

    triggerGlitch: () =>
      dispatch({
        type: CORRUPTION_ACTIONS.SYSTEM_GLITCH,
        payload: {},
      }),

    temporalAnomaly: () =>
      dispatch({
        type: CORRUPTION_ACTIONS.TEMPORAL_ANOMALY,
        payload: {},
      }),
  };

  const value = {
    ...state,
    actions,
    // Computed values
    isSystemCritical: state.corruption.level > 0.8,
    shouldGlitch: Math.random() < state.reality.glitchProbability,
    currentChaosLevel: state.corruption.level * state.performance.glitchIntensity,
  };

  return (
    <TechnodadaContext.Provider value={value}>{children}</TechnodadaContext.Provider>
  );
}

// Hook for accessing the context
export function useTechnodada() {
  const context = useContext(TechnodadaContext);
  if (!context) {
    throw new Error('useTechnodada must be used within a TechnodadaProvider');
  }
  return context;
}

// Export action types for external use
export { CORRUPTION_ACTIONS };

// Export for debugging in console
if (typeof window !== 'undefined') {
  window.technodadaDebug = {
    CORRUPTION_ACTIONS,
    getState: () => 'Access via useTechnodada hook',
  };
}
