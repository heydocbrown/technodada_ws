import { useEffect, useState } from 'react';
import './RealityTear.css';

// Small reality tears during navigation (100-300ms)
export default function RealityTear({ type = 'glitch' }) {
  const [tearPhase, setTearPhase] = useState(0);

  useEffect(() => {
    // Create progressive tear effect
    const phases = [1, 2, 3];
    phases.forEach((phase, index) => {
      setTimeout(() => setTearPhase(phase), index * 50);
    });
  }, []);

  const renderTear = () => {
    switch (type) {
      case 'glitch':
        return (
          <>
            <div className="tear-scanlines" />
            <div className="tear-noise" />
            <div className="tear-distortion">
              {Array(tearPhase)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="glitch-slice"
                    style={{
                      transform: `translateX(${Math.random() * 20 - 10}px)`,
                      opacity: Math.random(),
                    }}
                  />
                ))}
            </div>
          </>
        );

      case 'pixelate':
        return (
          <div className="tear-pixels">
            {Array(tearPhase * 10)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="pixel-block"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 50 + 10}px`,
                    height: `${Math.random() * 50 + 10}px`,
                    backgroundColor: `rgb(${Math.random() * 255}, 0, ${Math.random() * 255})`,
                  }}
                />
              ))}
          </div>
        );

      case 'temporal':
        return (
          <div className="tear-temporal">
            <div className="past-echo" style={{ opacity: tearPhase * 0.3 }}>
              {new Date(Date.now() - Math.random() * 31536000000).toLocaleString()}
            </div>
            <div className="future-echo" style={{ opacity: tearPhase * 0.3 }}>
              {new Date(Date.now() + Math.random() * 31536000000).toLocaleString()}
            </div>
            <div className="temporal-message">TIME.LINEARITY = FALSE</div>
          </div>
        );

      case 'void':
        return (
          <div className="tear-void">
            <div
              className="void-message"
              style={{
                transform: `scale(${1 + tearPhase * 0.1})`,
                opacity: 1 - tearPhase * 0.3,
              }}
            >
              NULL.POINTER.EXCEPTION
            </div>
            {Array(tearPhase)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="void-particle"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
          </div>
        );

      case 'cascade':
        return (
          <div className="tear-cascade">
            {Array(tearPhase * 3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="cascade-line"
                  style={{
                    left: `${i * 33}%`,
                    animationDelay: `${i * 0.05}s`,
                    height: `${Math.random() * 100}%`,
                  }}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`reality-tear reality-tear-${type} phase-${tearPhase}`}>
      {renderTear()}
      <div className="tear-static" />
    </div>
  );
}
