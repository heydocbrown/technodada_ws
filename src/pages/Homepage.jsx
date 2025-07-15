import { useEffect } from 'react';

// Wrapper for existing homepage
export default function Homepage() {
  useEffect(() => {
    // Redirect to actual homepage
    window.location.href = '/index.html';
  }, []);

  return (
    <div
      style={{
        background: '#000',
        color: '#00ff00',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
      }}
    >
      REALITY.LOADING...
    </div>
  );
}
