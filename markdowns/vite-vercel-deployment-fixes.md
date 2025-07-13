# Vite + Vercel Deployment Fix Plan

## Current Issues

### Issue 1: Missing Static Assets (404 errors)
**Error:** `GET https://technodadaist-jwzu9honh-heydocbrowns-projects.vercel.app/assets/data/manifesto.json 404 (Not Found)`

**Root Cause:** Path mismatch between development and production
- Files are in `/public/data/` directory
- Code is looking for `/assets/data/` paths
- Vite serves public directory contents from root `/`

### Issue 2: React Vendor Bundle Error
**Error:** `Cannot read properties of undefined (reading 'unstable_scheduleCallback')`

**Root Cause:** React dependencies not properly bundled or loaded in wrong order

## Systematic Fix Plan

### Phase 1: Audit Current State
1. **File Structure Verification**
   - [ ] Map all static asset locations
   - [ ] Identify all data file references in code
   - [ ] Check HTML file script imports
   - [ ] Verify React app entry points

2. **Build Output Analysis**
   - [ ] Run local build and examine dist folder
   - [ ] Check asset paths in built files
   - [ ] Verify chunk generation

### Phase 2: Fix Static Asset Paths

#### Option A: Update Code References (Recommended)
Fix all hardcoded paths to match Vite's public directory behavior:

1. **Update data-loader.js**
   ```javascript
   // Change from: '/assets/data/manifesto.json'
   // Change to: '/data/manifesto.json'
   ```

2. **Search and Replace All Asset References**
   - Files to check:
     - `/public/js/utils/data-loader.js`
     - `/assets/js/utils/data-loader.js`
     - Any HTML files with direct asset references
     - Any CSS files with background images

3. **Update Image References**
   - Gallery images
   - Background images
   - Icon references

#### Option B: Configure Vite to Match Current Paths
Add path rewriting in vite.config.js (not recommended - adds complexity)

### Phase 3: Fix React Build Issues

1. **Verify React Dependencies**
   ```bash
   npm list react react-dom
   ```

2. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     // ... existing config
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             'react-vendor': ['react', 'react-dom'],
             // ... other chunks
           }
         }
       }
     },
     // Ensure proper module resolution
     resolve: {
       alias: {
         'react': 'react',
         'react-dom': 'react-dom'
       }
     }
   })
   ```

3. **Check HTML Script Loading Order**
   - Ensure React vendor chunk loads before app code
   - Verify module type attributes

### Phase 4: Comprehensive Path Mapping

Create a complete mapping of all file references:

| Current Path | New Path | Files Affected |
|--------------|----------|----------------|
| `/assets/data/*.json` | `/data/*.json` | data-loader.js |
| `/assets/js/` | `/js/` | HTML files |
| `/assets/css/` | `/css/` | HTML files |
| `/assets/images/` | `/images/` | CSS, JS files |

### Phase 5: Testing Strategy

1. **Local Development Testing**
   ```bash
   npm run dev
   ```
   - [ ] Verify all pages load
   - [ ] Check manifesto player works
   - [ ] Test gallery functionality
   - [ ] Verify React apps (poems, tsdadacat)

2. **Local Build Testing**
   ```bash
   npm run build
   npm run preview
   ```
   - [ ] Check built file paths
   - [ ] Test all functionality
   - [ ] Verify no 404 errors

3. **Vercel Preview Testing**
   ```bash
   vercel
   ```
   - [ ] Deploy to preview URL
   - [ ] Run full test suite
   - [ ] Check browser console for errors

### Phase 6: Implementation Order

1. **Fix data-loader.js paths** (Priority: Critical)
   - Update both `/public/` and `/assets/` versions
   - Remove `/assets/` prefix from all data paths

2. **Fix React vendor issue** (Priority: Critical)
   - Update vite.config.js chunking strategy
   - Verify React import order in HTML files

3. **Update all asset references** (Priority: High)
   - CSS background images
   - JS image references
   - HTML direct links

4. **Clean up duplicate files** (Priority: Medium)
   - Remove `/assets/` directory after migration
   - Keep only `/public/` assets

5. **Update deployment configuration** (Priority: Low)
   - Verify Vercel settings
   - Check build command and output directory

## Quick Fix Script

For immediate resolution, run these commands:

```bash
# Fix all data path references
find . -name "*.js" -type f -exec grep -l "/assets/data/" {} \; | \
  xargs sed -i '' 's|/assets/data/|/data/|g'

# Fix all JS path references  
find . -name "*.html" -type f -exec grep -l "/assets/js/" {} \; | \
  xargs sed -i '' 's|/assets/js/|/js/|g'

# Fix all CSS path references
find . -name "*.html" -type f -exec grep -l "/assets/css/" {} \; | \
  xargs sed -i '' 's|/assets/css/|/css/|g'
```

## Verification Checklist

After implementing fixes:

- [ ] No 404 errors in browser console
- [ ] Manifesto player loads and plays
- [ ] Gallery shows images in all modes
- [ ] React poems apps work (dropdown, typing effect)
- [ ] tsdadacat integrates with lambda pipeline
- [ ] All navigation works
- [ ] No React vendor errors

## Root Cause Summary

The migration from Express to Vite was incomplete:
1. Asset paths still reference Express's `/assets/` structure
2. Vite serves `/public/` contents from root `/`
3. React bundling needs proper configuration for Vite
4. Duplicate files in both `/assets/` and `/public/` causing confusion

## Next Steps

1. Implement Phase 1-2 fixes immediately (critical path issues)
2. Test locally with `npm run build && npm run preview`
3. Deploy to Vercel preview for verification
4. Complete remaining phases once core functionality works
5. Remove legacy `/assets/` directory after full migration