import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import all app components
import App from './apps/App.jsx';
import App2 from './apps/App2.jsx';
import App3 from './apps/App3.jsx';
import AppDadaCat from './apps/AppDadaCat.jsx';

// Determine which app to render based on the current page
const getAppComponent = () => {
  const path = window.location.pathname;

  if (path.includes('poems.html')) {
    return <App />;
  } else if (path.includes('poem2.html')) {
    return <App2 />;
  } else if (path.includes('poem3.html')) {
    return <App3 />;
  } else if (path.includes('tsdadacat.html')) {
    return <AppDadaCat />;
  }

  // Default fallback
  return <div>No React app configured for this page</div>;
};

// Check if there's a root element on this page
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>{getAppComponent()}</React.StrictMode>,
  );
} // trigger redeploy
