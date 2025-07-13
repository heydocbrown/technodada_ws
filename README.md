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