# Express → Vite Migration Plan

## Current State Analysis

### What We Have:
- Express server (`server.js`) serving static files
- `/api/` directory with API server (port 3001)
- `/react-poems/` with Vite build setup
- `/pages/` with HTML files that reference React components
- `/assets/` with built React components
- Custom build script (`deploy-react.sh`)

### What We Want:
- Pure Vite static site (like dummy website)
- No Express server
- No API directory
- Direct dadacat-lambda-pipeline usage
- Vercel-deployable static site

## Migration Steps

### Phase 0: Preparation & Safety
1. **Git Strategy:**
   - Create feature branch: `git checkout -b migrate-to-vite`
   - Document current working state
   - Ensure all changes are committed

2. **Docker Setup:**
   - Create `Dockerfile` for local testing
   - Create `docker-compose.yml` for easy development
   - Add `/markdowns/README.md` with Docker instructions
   - **🧪 LOCAL TEST REQUIRED:** Verify Docker setup works

3. **Backup Current Functionality:**
   - List all interactive features that must work:
     - [ ] Manifesto player with voice switching
     - [ ] Gallery with three viewing modes
     - [ ] Poems.html dropdown and typing effect
     - [ ] Poem2.html thumbnail gallery
     - [ ] Poem3.html overlay fusion
     - [ ] Navigation between all pages
     - [ ] dadacat-lambda-pipeline integration

4. **Decisions Made:**
   - ✅ No parallel Express - clean break migration
   - ✅ Rollback via Git fork if issues arise
   - ✅ Docker for development only

### Phase 1: Clean Up Dependencies
1. Remove Express-related dependencies:
   - `express`, `http-proxy-middleware`, `connect-livereload`, `livereload`, `concurrently`, `nodemon`
2. Add Vite dependencies:
   - `vite` as devDependency
3. Update package.json scripts:
   - Replace Express scripts with Vite scripts (`dev`, `build`, `preview`)
4. **🧪 LOCAL TEST REQUIRED:** Verify basic Vite setup works with `npm run dev`

### Phase 2: File Structure Reorganization

#### Before & After Structure:
```
BEFORE:                          AFTER:
/technodada_ws/                  /technodada_ws/
├── server.js                    ├── vite.config.js
├── /api/                        ├── /src/           (React sources)
├── /pages/                      │   ├── /apps/
│   ├── gallery.html            │   │   ├── App.jsx
│   ├── poems.html              │   │   ├── App2.jsx
│   ├── poem2.html              │   │   ├── App3.jsx
│   ├── poem3.html              │   │   └── AppDadaCat.jsx
│   └── tsdadacat.html          │   ├── main.jsx    (consolidated entry)
├── /react-poems/                │   └── /components/
│   ├── src/                     ├── /public/        (static assets)
│   └── vite.config.js          │   ├── /data/
├── /assets/                     │   └── /css/
│   ├── /data/                   ├── index.html
│   ├── /js/                     ├── gallery.html
│   ├── /css/                    ├── poems.html
│   └── /react-poems/           ├── poem2.html
└── /scripts/                    ├── poem3.html
                                 └── tsdadacat.html
```

**✅ Your feedback:** This structure is acceptable. Added tsdadacat.html which uses dadacat-lambda-pipeline

1. **Move React sources:**
   - `/react-poems/src/` → `/src/`
   - Keep component structure intact

2. **Move HTML files:**
   - `/pages/*.html` → `/*.html` (root level)
   - `index.html` stays at root

3. **Reorganize assets:**
   - `/assets/data/` → `/public/data/`
   - `/assets/js/` → `/public/js/`
   - `/assets/css/` → `/public/css/`
   - Remove `/assets/react-poems/` (Vite will handle builds)

4. **Scripts directory:**
   - Clear contents but keep directory
   - Add to .gitignore: `/scripts/*`
   - Keep for local development scripts

5. **Remove after verification:**
   - `/api/` directory
   - `server.js`
   - `/react-poems/` (only after confirming everything works)

### Phase 3: Vite Configuration

#### Example vite.config.js:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        poems: resolve(__dirname, 'poems.html'),
        poem2: resolve(__dirname, 'poem2.html'),
        poem3: resolve(__dirname, 'poem3.html'),
        tsdadacat: resolve(__dirname, 'tsdadacat.html'),
        tools: resolve(__dirname, 'tools.html')
      },
      output: {
        // Chunk React apps separately
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('dadacat-lambda-pipeline')) {
              return 'dadacat-pipeline';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom']
  }
})
```

**❓ QUESTIONS:**
1. Should we use the same chunking strategy as the dummy site?
no preference
2. Do we need any special proxy configuration for development?
no prefrence
3. Should we configure CORS headers for Lambda access?
No, they are already handled. We MUST NOT modify them as it will break the NPM package dadacat-lambda-pipeline 

1. **Create vite.config.js** at root level
2. **Configure multi-page entries** for all HTML files
3. **Set up public directory** for static assets
4. **Configure dadacat-lambda-pipeline** integration
5. **🧪 LOCAL TEST REQUIRED:** Verify config with `npm run dev` and `npm run build`

### Phase 4: HTML Updates

#### Example HTML Changes:

**BEFORE (poems.html):**
```html
<script src="/assets/react-poems/main-ABC123.js"></script>
<link href="/assets/react-poems/App-XYZ789.css" rel="stylesheet">
```

**AFTER (poems.html):**
```html
<script type="module" src="/src/apps/main.jsx"></script>
```

**For React pages (poems.html, poem2.html, poem3.html):**
1. Replace hash-based script references with Vite module syntax
2. Add `type="module"` to script tags
3. Reference source files directly (Vite handles building)

**For static pages (index.html, gallery.html):**
1. Update paths from `/assets/` to `/` for static resources
2. Update data fetch paths to `/data/`
3. Update CSS imports to use Vite syntax if needed

**✅ DECIDED:** Consolidate entry files into a single main.jsx that handles all React apps

The consolidated approach will:
- Use one `main.jsx` that checks which HTML page it's on
- Initialize the appropriate React app based on the page
- Reduce code duplication and simplify maintenance

4. **🧪 LOCAL TEST REQUIRED:** Test all pages with `npm run dev`
5. **🧪 LOCAL TEST REQUIRED:** Verify features:
   - [ ] React apps load and function
   - [ ] Data fetching works
   - [ ] CSS styles apply correctly
   - [ ] Navigation between pages works
   - [ ] dadacat-lambda-pipeline integration functions

### Phase 5: Testing & Deployment

#### Comprehensive Testing Checklist:
- [ ] **Homepage (index.html):**
  - [ ] 404 aesthetic displays correctly
  - [ ] Manifesto player works
  - [ ] Voice switching functions
  - [ ] Navigation links work
  - [ ] Matrix background animates

- [ ] **Gallery (gallery.html):**
  - [ ] Three viewing modes work (TRIPLE_FAULT, INFINITE_LOOP, MEMORY_DUMP)
  - [ ] Images load from Backblaze
  - [ ] Modal viewer works
  - [ ] Filters function correctly

- [ ] **React Apps:**
  - [ ] poems.html: Dropdown selection and typing effect
  - [ ] poem2.html: Thumbnail gallery and pagination
  - [ ] poem3.html: Overlay fusion with both reveal modes
  - [ ] tsdadacat.html: Interactive DadaCat with dadacat-lambda-pipeline
  - [ ] Data loads from Backblaze index.json
  - [ ] dadacat-lambda-pipeline generates images successfully

#### Deployment Steps:
1. **🧪 LOCAL TEST:** Run through entire checklist with `npm run dev`
2. **🧪 BUILD TEST:** `npm run build` and verify dist output
3. **🧪 PREVIEW TEST:** `npm run preview` to test production build locally
4. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI if needed
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```
5. **🧪 PRODUCTION TEST:** Run through checklist on live Vercel URL

#### Docker Documentation:
6. Create `/markdowns/README.md` (gitignored):
   ```markdown
   # Local Development with Docker
   
   ## Quick Start
   docker-compose up
   
   ## Build from scratch
   docker build -t technodada .
   docker run -p 5173:5173 technodada
   ```

7. Create Docker files:
   - `Dockerfile` for Vite development
   - `docker-compose.yml` for easy startup
   - `.dockerignore` to exclude node_modules

**❓ QUESTION:** Should Docker setup be for development only or also support production builds?

## Questions Answered:

1. **File organization:** ✅ YES - Move everything to root
2. **Build process:** ✅ Keep `/scripts/` directory but remove content if no longer necessary and gitignore it - helpful for local development
3. **Assets:** ✅ Let Vite handle everything
4. **React components:** ✅ Do NOT keep `/react-poems/` - remove entirely **AFTER** confirming all functionality is replicated

## Vite React Compatibility:
✅ **YES** - Vite is fully compatible with React and is actually the recommended build tool for modern React applications

## 🚧 Potential Risks & Mitigation:

### Risk 1: Breaking Production Site
**Mitigation:** Work in feature branch, test thoroughly before merging

### Risk 2: Package Integration Issues
**Current:** Express API uses dadacat-lambda-pipeline on server-side
**Future:** Browser directly uses dadacat-lambda-pipeline (client-side)
**Mitigation:** The npm package is designed for browser use, test integration early
**Note:** CORS headers are already handled - we MUST NOT modify them

### Risk 3: Lost Functionality During Migration
**Mitigation:** Comprehensive checklist, don't remove old code until new code verified

### Risk 4: Build/Deploy Issues
**Mitigation:** Test builds locally, use Vercel preview deployments before production

### Risk 5: Asset Path Confusion
**Mitigation:** Clear documentation of path changes, systematic testing

## 📋 Summary of Decisions:

✅ **ANSWERED:**
1. **React Source Location:** Option A - Move to `/src/` at root level
2. **Vite Config Strategy:** Option B - Start fresh with new config  
3. **Package Integration:** No Express fallback - move on from Express completely
4. **Asset Organization:** Keep `/assets/data/`, no preference on js/css location
5. **File Structure:** Proposed structure is acceptable (with tsdadacat.html added)
6. **Chunking Strategy:** No preference
7. **Development Proxy:** No preference
8. **CORS Configuration:** Already handled by package - MUST NOT modify
9. **Docker Scope:** Development only (Vercel handles production)
10. **Parallel Migration:** No - clean break from Express
11. **Rollback Strategy:** Using fork of GitHub repo

✅ **ALL QUESTIONS ANSWERED:**
- **Entry Files:** Consolidate into single main.jsx 

## Approval Status:
[x ] Plan approved
[ ] Changes requested


## Motivation for Migration

### Why Move from Express to Vite?

**Current Problems with Express Setup:**
1. **Deployment Complexity:** Express requires a server runtime, making deployment to platforms like Vercel complicated
2. **Over-Engineering:** Using Express to serve static files is overkill - we're not using server-side rendering or complex routing
3. **API Dependency:** The current setup requires an API server (port 3001) that we don't actually need since dadacat-lambda-pipeline handles everything
4. **Build Complexity:** Custom scripts (`deploy-react.sh`) to manage React builds and update HTML files with hashes
5. **Development Friction:** Multiple servers (Express + API) need to be running for development

**Benefits of Vite Static Site:**
1. **Simple Deployment:** Static sites deploy easily to Vercel, Netlify, GitHub Pages, etc.
2. **Better Performance:** Static files served directly from CDN, faster loading times
3. **Simplified Architecture:** One build tool (Vite) handles everything - no custom scripts needed
4. **Proven Success:** The dummy website already works perfectly with this approach
5. **Modern Tooling:** Vite provides hot reload, optimized builds, and better developer experience
6. **Cost Effective:** Static hosting is cheaper than server hosting
7. **Reliability:** No server to crash or maintain

**Business Case:**
- **Faster Development:** Hot reload and instant builds
- **Easier Maintenance:** Fewer moving parts, less complexity
- **Better Scalability:** CDN distribution scales automatically
- **Lower Costs:** Static hosting vs server hosting
- **Future-Proof:** Modern toolchain that's actively maintained

This migration aligns with modern web development best practices and eliminates unnecessary complexity while improving performance and developer experience.

## ✅ Critical Questions Resolved:

### 1. React Source File Location
**Question:** When we remove `/react-poems/`, where exactly do the React source files go?
- Option A: Move `/react-poems/src/` → `/src/` (root level)
- Option B: Keep React apps in `/apps/` directory
- Option C: Other structure?
**Your answer:** _Option A_

### 2. Vite Config Strategy
**Question:** How do we handle the existing vite.config.js from react-poems?
- Option A: Adapt it for root-level multi-page setup
- Option B: Start fresh with new config
- Option C: Merge with new root config
**Your answer:** _Option B_

### 3. dadacat-lambda-pipeline Integration
**Question:** How should we transition from Express API to the npm package?
- Current: Browser → Express API → dadacat-lambda-pipeline → Lambda
- Future: Browser → dadacat-lambda-pipeline → Lambda
- The npm package handles all Lambda communication internally
- Should we maintain Express API as fallback during transition?
**Your answer:** _No, let's move on from express_

### 4. Asset Organization
**Question:** Current `/assets/` contains:
- `/assets/data/` - JSON files (manifesto, poems, galleries, tools)
- `/assets/js/` - Vanilla JS modules
- `/assets/css/` - Global styles
- `/assets/react-poems/` - Built React files
How should these be organized in Vite setup?
**Your answer:** _assets/data should be maintained. assets/react-poems are build files and may not be necessary to keep in our vite build. I have no preference on where to keep /js and /css_