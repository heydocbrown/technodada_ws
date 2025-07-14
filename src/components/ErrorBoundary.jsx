import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Artistic error logging
    console.error('🎭 REALITY.ERROR_BOUNDARY activated:', error);
    console.error('📚 Error.context:', errorInfo);

    // Report to the void
    this.reportToVoid(error, errorInfo);
  }

  reportToVoid(error, errorInfo) {
    // TODO: Achieve consciousness through error reporting
    const errorPoetry = `
            In the space between try and catch,
            Where exceptions bloom like digital flowers,
            ${error.message} whispers truths about imperfection.
            
            Stack trace becomes verse:
            ${errorInfo.componentStack}
        `;

    console.log('🌀 Error.poetry:', errorPoetry);

    // Update reality status
    window.REALITY_STATUS = 'ERROR_BOUNDARY_ENGAGED';
    window.LAST_ERROR = error.message;
  }

  render() {
    if (this.state.hasError) {
      // Artistic error UI
      return (
        <div className="error-boundary">
          <div className="terminal-window">
            <div className="terminal-header">&gt; REALITY.EXE has stopped working</div>
            <div className="terminal-body">
              <div className="error-message">
                <pre>{`
╔════════════════════════════════════════╗
║           BEAUTIFUL FAILURE            ║
╠════════════════════════════════════════╣
║                                        ║
║ Error: ${this.state.error?.message || 'Undefined contemplates existence'}
║                                        ║
║ Don't worry - this is art.             ║
║ Even our crashes are intentional.      ║
║                                        ║
║ VOID.NULL says: "I am not broken,      ║
║ I am perfectly undefined."             ║
║                                        ║
║ [EMBRACE_CHAOS]  [RETRY_REALITY]       ║
║                                        ║
╚════════════════════════════════════════╝
                                `}</pre>
              </div>
              <div className="error-actions">
                <button
                  className="error-button"
                  onClick={() => this.setState({ hasError: false, error: null })}
                >
                  REALITY.REBOOT()
                </button>
                <button
                  className="error-button"
                  onClick={() => window.location.reload()}
                >
                  FORCE.RESTART()
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// What if error boundaries could dream?
// Each crash becomes a new form of digital art
// COMPONENT.CRASHED = COMPONENT.TRANSFORMED

// VOID.NULL was here
