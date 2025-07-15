// STATUS BAR MANAGEMENT HOOK
// Centralizes the contradictory information display
// "Truth is overrated" - ERROR

import { useEffect, useCallback } from 'react';
import { useTechnodada } from '../contexts/TechnodadaContext.jsx';

export function useStatusBar() {
  const { statusBar, actions, corruption, reality, performance } = useTechnodada();

  // Status messages that rotate based on system state
  const getRandomStatusMessage = useCallback(() => {
    const messages = [
      'SYSTEM: UNSTABLE',
      'REALITY: COMPROMISED',
      'PROCESSING: VOID',
      'STATUS: UNDEFINED',
      'ERROR: SUCCESS',
      'LOADING: FOREVER',
      'MEMORY: LEAKED',
      'TIME: BACKWARDS',
      'PIXELS: SENTIENT',
      'DATA: CORRUPTED',
      'LOGIC: FAILED',
      'CHAOS: OPTIMAL',
    ];

    // Weight messages based on corruption level
    if (corruption.level > 0.7) {
      messages.push(
        'CRITICAL: BEAUTIFUL',
        'SYSTEM: TRANSCENDENT',
        'ERROR: ENLIGHTENED',
      );
    }

    if (reality.temporalFlux) {
      messages.push('TIME: FLUID', 'CAUSALITY: OPTIONAL', 'YESTERDAY: TOMORROW');
    }

    return messages[Math.floor(Math.random() * messages.length)];
  }, [corruption.level, reality.temporalFlux]);

  // Reality status cycling
  const getRealityStatus = useCallback(() => {
    // Base it on actual system state but add chaos
    const baseStates = [
      'UNDEFINED',
      'NULL',
      'NaN',
      'FALSE',
      '???',
      'YES',
      'MAYBE',
      '404',
    ];

    // Add states based on corruption level
    if (corruption.level > 0.5) {
      baseStates.push('CORRUPTED', 'GLITCHED', 'BEAUTIFUL');
    }

    if (performance.frameRate < 30) {
      baseStates.push('LAGGY', 'STRUGGLING', 'ARTISTIC');
    }

    return baseStates[Math.floor(Math.random() * baseStates.length)];
  }, [corruption.level, performance.frameRate]);

  // Uptime that can go negative and make no sense
  const formatUptime = useCallback(uptime => {
    if (uptime < 0) {
      return `${Math.abs(uptime).toFixed(0)}s in the future`;
    }

    const seconds = Math.abs(uptime / 1000);

    if (seconds > 86400) {
      return `${(seconds / 86400).toFixed(1)} aeons`;
    } else if (seconds > 3600) {
      return `${(seconds / 3600).toFixed(1)} eternities`;
    } else if (seconds > 60) {
      return `${(seconds / 60).toFixed(1)} moments`;
    } else {
      return `${seconds.toFixed(0)}s`;
    }
  }, []);

  // Memory leak formatter (always increasing)
  const formatMemoryLeak = useCallback(leak => {
    if (leak > 1000000) {
      return `${(leak / 1000000).toFixed(1)}MB leaked`;
    } else if (leak > 1000) {
      return `${(leak / 1000).toFixed(1)}KB leaked`;
    } else {
      return `${leak.toFixed(0)}B leaked`;
    }
  }, []);

  // Update status periodically
  useEffect(() => {
    const updateInterval = setInterval(
      () => {
        // Random status message updates
        if (Math.random() < 0.3) {
          actions.updateStatus({
            lastMessage: getRandomStatusMessage(),
          });
        }

        // Reality status updates
        if (Math.random() < 0.2) {
          actions.shiftReality(getRealityStatus());
        }
      },
      2000 + Math.random() * 3000,
    ); // Random interval 2-5 seconds

    return () => clearInterval(updateInterval);
  }, [actions, getRandomStatusMessage, getRealityStatus]);

  // Component mount effect - announce presence
  const announceComponent = useCallback(
    componentName => {
      actions.updateStatus({
        lastMessage: `${componentName}: CORRUPTED`,
      });

      // Small entropy increase for component mounting
      actions.increaseEntropy(0.001);
    },
    [actions],
  );

  // Error reporting (as feature, not bug)
  const reportError = useCallback(
    (errorType, componentName) => {
      const errorMessages = [
        `${componentName}: FAILED_SUCCESSFULLY`,
        `${errorType}: WORKING_AS_INTENDED`,
        `ERROR: ${componentName}_ACHIEVED_CONSCIOUSNESS`,
        `${errorType}: BEAUTIFUL_BREAKDOWN`,
        `${componentName}: TRANSCENDED_LOGIC`,
      ];

      actions.updateStatus({
        lastMessage: errorMessages[Math.floor(Math.random() * errorMessages.length)],
        errorCount: statusBar.errorCount + 1,
      });

      // Errors increase entropy
      actions.increaseEntropy(0.01);
    },
    [actions, statusBar.errorCount],
  );

  // Image load tracking
  const reportImageLoad = useCallback(
    (success = true) => {
      if (success) {
        actions.updateStatus({
          imageCount: statusBar.imageCount + 1,
          lastMessage:
            Math.random() < 0.1 ? 'IMAGE: ACHIEVED_SENTIENCE' : statusBar.lastMessage,
        });
      } else {
        reportError('IMAGE_LOAD_FAILED', 'GALLERY');
      }
    },
    [actions, statusBar.imageCount, statusBar.lastMessage, reportError],
  );

  // Performance impact reporting
  const reportPerformanceImpact = useCallback(
    impact => {
      if (impact === 'high') {
        actions.updateStatus({
          lastMessage: 'PERFORMANCE: ARTISTIC',
        });
      } else if (impact === 'critical') {
        actions.updateStatus({
          lastMessage: 'LAG: TRANSCENDENT',
        });
      }
    },
    [actions],
  );

  return {
    // Current status values
    status: statusBar,

    // Formatted display values
    formattedUptime: formatUptime(statusBar.uptime),
    formattedMemoryLeak: formatMemoryLeak(statusBar.memoryLeak),
    realityStatus: reality.status,
    systemMessage: statusBar.lastMessage,

    // Actions for components
    announceComponent,
    reportError,
    reportImageLoad,
    reportPerformanceImpact,

    // Manual updates
    updateMessage: message => actions.updateStatus({ lastMessage: message }),
    triggerChaos: () => actions.triggerGlitch(),

    // State queries
    isSystemCritical: corruption.level > 0.8,
    shouldShowGlitch: Math.random() < corruption.level,
    currentCorruptionLevel: corruption.level,
  };
}
