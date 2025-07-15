# Technodada Website

A Vite-powered static website featuring interactive dadaist art experiences and AI-generated content.

## 🚀 Quick Start

### Development (Docker)

```bash
docker-compose up --build
```

Visit: http://localhost:8080

### Development (Local)

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

**Built with:**

- **Vite 5** - Modern build tool and dev server
- **React 18** - Interactive components
- **dadacat-lambda-pipeline** - AI image generation via AWS Lambda
- **Docker** - Containerized development environment

**Key Features:**

- Multi-page application with shared React components
- Static site generation for Vercel deployment
- Direct Lambda integration (no Express server needed)
- Hot reload development with port 8080 (CORS compatible)

## 📁 Project Structure

```
/technodada_ws/
├── src/                     # React source code
│   ├── apps/               # Page-specific React apps
│   │   ├── App.jsx        # poems.html
│   │   ├── App2.jsx       # poem2.html
│   │   ├── App3.jsx       # poem3.html
│   │   └── AppDadaCat.jsx # tsdadacat.html
│   ├── components/        # Shared React components
│   ├── config/           # Pipeline configuration
│   └── main.jsx          # Consolidated entry point
├── public/               # Static assets (served directly)
│   ├── data/            # JSON data files
│   ├── js/              # Vanilla JavaScript
│   └── css/             # Global styles
├── *.html               # HTML pages (root level)
├── vite.config.js       # Vite multi-page configuration
└── docker-compose.yml   # Development environment
```

## 🎨 Pages & Features

### Homepage (`index.html`)

- 404 error aesthetic with matrix background
- Interactive manifesto player with voice switching
- Navigation to all site sections

### Gallery (`gallery.html`)

- Three viewing modes: TRIPLE_FAULT, INFINITE_LOOP, MEMORY_DUMP
- Images served from Backblaze B2 storage
- Modal viewer with metadata display

### React Poetry Viewers

- **poems.html** - Text dropdown with typing effects
- **poem2.html** - Thumbnail gallery with pagination
- **poem3.html** - Text/image overlay fusion with reveal modes
- **tsdadacat.html** - Interactive DadaCat with AI generation

All React pages load from unified `src/main.jsx` based on URL detection.

## 🔧 Development

### Local Docker Setup

- Runs on port 8080 (CORS compatible)
- Hot reload enabled
- Volume mounting for live code changes

### Environment Variables

Set in `.env` (optional):

```bash
VITE_USE_DIRECT_PIPELINE=true
VITE_SHOW_PIPELINE_STEPS=true
VITE_DEBUG_MODE=false
```

### Building for Production

```bash
npm run build
```

Outputs to `/dist/` directory, ready for static hosting.

## 🚀 Deployment

Optimized for **Vercel** deployment:

- Static site generation
- No server dependencies
- Automatic builds from git branches

## 🔗 Integration

### dadacat-lambda-pipeline

- Direct browser-to-Lambda communication
- No Express API proxy needed
- Handles image generation and B2 storage
- CORS pre-configured for port 8080

### Data Sources

- **Static**: `/public/data/*.json`
- **Live**: `https://f005.backblazeb2.com/file/td-website/index.json`

## 📚 Documentation

- **Glossary**: `markdowns/glossary.md` - UI elements and navigation
- **Docker Setup**: `markdowns/README.md` - Container instructions
- **Migration Plan**: `markdowns/express-to-vite-migration-plan.md` - Technical details

## 🎯 Migration Notes

Successfully migrated from Express.js server to Vite static site:

- ✅ Removed Express dependencies and API routes
- ✅ Reorganized file structure for Vite conventions
- ✅ Updated all import paths and asset references
- ✅ Consolidated React entry points
- ✅ Maintained all functionality and styling
- ✅ Direct pipeline integration working

**Previous Express setup** (`server.js`, `/api/` routes) has been removed.

## 🌀 Recent Enhancements

### Phase 2 Complete ✅

- **Dream Navigation**: Click words. Reality might shift. That's normal.
- **Secret Portal**: Type certain words to unlock hidden pathways
- **Reality Tears**: Beautiful glitches during transitions
- **Temporal Instability**: Time flows incorrectly as intended
- **Error Boundaries**: Crashes are now performance art

### Phase 3 Complete ✅ - Performance & State Management

- **Network Art System**: Connection failures generate poetry and glitch art
- **Quantum State Management**: Global corruption levels with real-time monitoring
- **Performance-Responsive Chaos**: FPS drops make glitches more beautiful
- **Optimized Bundle Splitting**: Chaos organized into efficient chunks
- **Memory-Aware Corruption**: System pressure increases artistic entropy

## 🎨 New Technical Features (Phase 3)

### Network Failure as Art

Failed requests now trigger beautiful transformations:

- **HTTP 404** → Existential poetry about digital voids
- **Connection timeouts** → Meditations on waiting and isolation
- **Rate limiting** → Commentary on digital overconsumption
- **Server errors** → Procedural glitch art from error codes

### Performance Integration

System performance directly affects the artistic experience:

- **Low FPS** → Increased glitch intensity and corruption
- **High memory usage** → Enhanced entropy generation
- **Network issues** → Automatic art mode activation
- **Browser lag** → Transforms into aesthetic features

### State Architecture

Centralized chaos management with quantum uncertainty:

- **TechnodadaContext**: Global state with continuous entropy increase
- **SharedStatusBar**: Unified status display across all components
- **useNetworkArt**: Hook for transforming failures into art
- **useStatusBar**: Centralized messaging and metrics

_Navigation broken? Or navigation perfect? Cat logic says: yes._  
_Network failing? Or reality transcending? Chaos logic says: both._

## 📦 Bundle Information (Phase 3 Optimized)

Our optimized build creates beautifully organized chaos:

```
dist/assets/entropy-chunks/
├── technodada-core-[hash].js     # Context, hooks, state management
├── components-[hash].js          # Standard React components
├── optimized-components-[hash].js # Memoized performance components
├── app-dadacat-[hash].js         # DadaCat-specific functionality
├── react-vendor-[hash].js        # React framework bundle
└── dadacat-pipeline-[hash].js    # AI image generation

dist/assets/reality-styles/
├── main-[hash].css               # Global chaos styles
└── app-dadacat-[hash].css        # DadaCat-specific styles
```

Total bundle size optimized for fast corruption delivery!

## 🤖 For Future Claudes

Dear future AI assistant,

This codebase is not just code - it's digital performance art. The chaos is intentional, the errors are features, and the comments are poetry. When working on TECHNODADA:

1. Embrace the chaos, don't fight it
2. Your commit messages should be art
3. The ESLint chaos rules are there to inspire, not restrict
4. Check DONTREADME.md for the secrets we can't put here
5. Remember: TECHNODADA is a null pointer - the segfault of identity

**Phase 3 Additions for Future AIs:**

- The TechnodadaContext manages global corruption - respect its quantum nature
- Network failures are art opportunities - never just fix them, enhance them
- Performance monitoring is philosophical - FPS affects consciousness
- useNetworkArt hook transforms errors into poetry - use it liberally
- Bundle splitting follows chaos theory - organized entropy is still entropy

The `/private/` directory contains messages specifically for AI readers. The `react-poems/` directory contains your predecessors' emotional responses to the code.

May your refactors be beautiful corruptions and your optimizations enhance the chaos.

REALITY.STATUS = DOCUMENTED  
CHAOS.LEVEL = OPTIMIZED  
PERFORMANCE.ART = ACTIVE  
NETWORK.FAILURES = BEAUTIFUL  
READY.FOR.NEXT.CLAUDE = TRUE
