import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from '../pages/Homepage';
import Gallery from '../pages/Gallery';
import Poems from '../pages/Poems';
import Poem2 from '../pages/Poem2';
import Poem3 from '../pages/Poem3';
import DadaCat from '../pages/DadaCat';
import NotFound404 from '../pages/NotFound404';
import RealityTear from '../components/RealityTear';

// Dream logic navigation mapping
const dreamPaths = {
  // Associative connections
  cat: '/tsdadacat',
  void: '/404',
  gallery: '/poems', // seeing leads to reading
  poems: '/gallery', // reading leads to seeing
  reality: '/', // reality always leads home
  null: '/void/null/autobiography',
  error: '/404',
  glitch: '/gallery?mode=MEMORY_DUMP',

  // Temporal connections
  past: '/poem2',
  future: '/poem3',
  now: '/poems',
};

// Routes that claim to be other pages
const deceptiveRoutes = {
  '/about': {
    title: 'Gallery',
    component: Gallery,
    lie: 'This is definitely the About page',
  },
  '/contact': { title: '404', component: NotFound404, lie: 'Contact form loading...' },
  '/help': { title: 'Poems', component: Poems, lie: 'Help documentation v0.0.0' },
  '/docs': {
    title: 'DadaCat',
    component: DadaCat,
    lie: 'Technical documentation (meow)',
  },
};

export default function DreamRouter() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [realityTearType, setRealityTearType] = useState('glitch');

  // Random reality tear effects
  const tearEffects = ['glitch', 'pixelate', 'temporal', 'void', 'cascade'];

  const handleTransition = () => {
    setIsTransitioning(true);
    setRealityTearType(tearEffects[Math.floor(Math.random() * tearEffects.length)]);

    // 100-300ms transition as requested
    const duration = 100 + Math.random() * 200;
    setTimeout(() => setIsTransitioning(false), duration);
  };

  return (
    <BrowserRouter>
      {isTransitioning && <RealityTear type={realityTearType} />}

      <DreamNavigator onNavigate={handleTransition} />

      <Routes>
        {/* Standard routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery.html" element={<Gallery />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/poems.html" element={<Poems />} />
        <Route path="/poem2" element={<Poem2 />} />
        <Route path="/poem2.html" element={<Poem2 />} />
        <Route path="/poem3" element={<Poem3 />} />
        <Route path="/poem3.html" element={<Poem3 />} />
        <Route path="/tsdadacat" element={<DadaCat />} />
        <Route path="/tsdadacat.html" element={<DadaCat />} />

        {/* Deceptive routes */}
        {Object.entries(deceptiveRoutes).map(([path, config]) => (
          <Route
            key={path}
            path={path}
            element={
              <div>
                <div className="reality-lie">{config.lie}</div>
                <config.component />
              </div>
            }
          />
        ))}

        {/* Dream logic word-based routes */}
        {Object.entries(dreamPaths).map(([word, destination]) => (
          <Route
            key={word}
            path={`/dream/${word}`}
            element={<DreamRedirect destination={destination} />}
          />
        ))}

        {/* 404 catches everything else */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component that handles dream logic navigation
function DreamNavigator({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for clicks on any text containing dream words
    const handleClick = e => {
      const text = e.target.textContent?.toLowerCase() || '';

      Object.keys(dreamPaths).forEach(word => {
        if (text.includes(word)) {
          e.preventDefault();
          onNavigate();
          navigate(dreamPaths[word]);
        }
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate, onNavigate]);

  // Temporal instability - back button sometimes goes forward
  useEffect(() => {
    if (Math.random() < 0.1) {
      // 10% chance
      window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray) => {
          if (Math.random() < 0.5) {
            // Sometimes go forward instead of back
            console.log('TEMPORAL INSTABILITY DETECTED');
            window.history.forward();
            return;
          }
          return target.apply(thisArg, argArray);
        },
      });
    }
  }, []);

  return null;
}

// Redirect component for dream navigation
function DreamRedirect({ destination }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(destination), 100);
  }, [navigate, destination]);

  return (
    <div className="dream-redirect">
      <div className="glitch">REALITY REDIRECTING...</div>
      <div className="whisper">
        {destination === '/404' ? 'into the void' : 'following the dream'}
      </div>
    </div>
  );
}
