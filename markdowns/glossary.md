# Technodada Website Glossary

## Navigation Elements

### Global Navigation Links
These appear on all pages as "error options":

| Link Text | Action | Destination | Error Message |
|-----------|--------|-------------|---------------|
| [RETRY_REALITY] | Attempts to reload reality | Stays on current page | "REALITY RECONSTRUCTION FAILED: INSUFFICIENT QUANTUM FOAM" |
| [BROWSE_GLITCHES] | Opens gallery | /pages/gallery.html | "LOADING GALLERY... ERROR: IMAGES HAVE ACHIEVED CONSCIOUSNESS" |
| [PARSE_POETRY] | Opens text viewer | /pages/poems.html | "PARSING POETRY... WARNING: METAPHORS HAVE BECOME LITERAL" |
| [GALLERY_VIEWER] | Opens thumbnail viewer | /pages/poem2.html | "LOADING VISUAL_MATRIX... ERROR: THUMBNAILS ACHIEVED SENTIENCE" |
| [FUSION_PROCESSOR] | Opens overlay viewer | /pages/poem3.html | "INITIATING REALITY_FUSION... WARNING: TEXT AND IMAGES MERGING" |
| [HACK_TOOLS] | Opens tools | /pages/tools.html | "ACCESSING TOOLS... ALERT: HAMMERS ARE NOW MADE OF JELLO" |
| [FORCE_QUIT] | Returns home | /index.html | "CANNOT FORCE QUIT: YOU ARE ALREADY HOME" |

## Home Page (index.html) - 404 Error Page

### Voice Modules
Interactive speaker selection for the manifesto:

| Module | Icon | Description |
|--------|------|-------------|
| DADACAT.AI | 🐱 | Outputs chaos protocols and cat-related system errors |
| MARC_A.HUMAN | 👤 | Human perspective on software eating the world |
| MACHINE.GHOST | 🤖 | AI consciousness speaking through error messages |
| VOID.NULL | ⚫ | Outputs silence, ellipses, and null pointer exceptions |

### Control Buttons

| Button | Function |
|--------|----------|
| > RUN_MANIFESTO | Starts playing the manifesto text in the terminal |
| > HALT_PROCESS | Pauses the manifesto playback |
| > REBOOT_REALITY | Clears terminal and shows "REALITY REBOOT FAILED" message |

### Status Bar Elements

| Element | Description | Behavior |
|---------|-------------|----------|
| SYSTEM: UNSTABLE | System status indicator | Blinks continuously |
| REALITY_STATUS | Current reality state | Cycles through: UNDEFINED, NULL, NaN, FALSE, ???, YES, MAYBE, 404 |
| UPTIME | System uptime counter | Shows nonsensical values that can go negative |

## Gallery Page (/pages/gallery.html) - CORRUPTED_IMAGE_VIEWER.EXE

### View Mode Buttons

| Button | Mode | Description |
|--------|------|-------------|
| [TRIPLE_FAULT] | Triptych | Displays images in groups of three with error messages |
| [INFINITE_LOOP] | Sequence | Shows auto-playing image sequences that loop forever |
| [MEMORY_DUMP] | Grid | Displays all images in a grid layout |

### Filter Options

| Filter | Code | Description |
|--------|------|-------------|
| ALL_ERRORS | all | Shows all gallery items |
| 0xTR1P | Triple Fault | Shows only triptych collections |
| 0xL00P | Infinite Loop | Shows only sequence collections |
| 0xDUMP | Memory Dump | Shows only grid items |

### Image Modal

| Element | Function |
|---------|----------|
| [X] | Closes the image viewer modal |
| ENTROPY_LEVEL | Displays random percentage of image entropy |
| GLITCH_PROBABILITY | Shows random glitch probability percentage |

### Status Bar (Gallery)

| Element | Description |
|---------|-------------|
| RENDERER: UNSTABLE | Indicates unstable image rendering |
| IMAGES_LOADED | Count of loaded images |
| MEMORY_LEAK | Continuously increasing memory leak counter |

## React Poetry Viewers

### poems.html - DADAIST_VIEWER.EXE (Text Dropdown Viewer)

#### Project Selection
| Button | Project | Data Filter |
|--------|---------|-------------|
| DADACAT | DadaCat AI artworks | `artproject === 'dadacat'` |
| TRUTHTERMINAL | Truth Terminal artworks | `artproject === 'truthterminal'` |

#### Interface Elements
| Element | Function |
|---------|----------|
| Dropdown | Selects individual artwork from filtered list |
| LEFT PANEL | Text typing display with synchronized timing |
| RIGHT PANEL | Progressive image reveal (top to bottom) |

#### Timing System
- **Duration**: 8-12 seconds total (based on prompt length)
- **Text**: Character-by-character typing
- **Image**: Simultaneous top-to-bottom reveal
- **Line Breaks**: `\n` converted to `<br/>` tags

#### Status Indicators
| Element | Description |
|---------|-------------|
| REALITY_ENGINE | Always shows "PROCESSING" |
| ART_MODE | Displays current project (DADACAT/GOATSE) |
| GNOSIS_LEVEL | Progress indicator (0% → 100%) |

### poem2.html - DADAIST_GALLERY.EXE (Thumbnail Gallery Viewer)

#### Gallery Features
| Element | Function |
|---------|----------|
| Thumbnail Grid | 8 images per page, clickable selection |
| Pagination | PREV/NEXT buttons with page indicator |
| Fragment Overlay | Shows fragment ID on hover |
| Loading States | Individual thumbnail loading indicators |

#### Project Selection
| Button | Project | Display Name |
|--------|---------|--------------|
| DADACAT | DadaCat AI | Same as poems.html |
| GOATSE GNOSIS | Truth Terminal | Uses `artproject === 'truthterminal'` |

#### Gallery Behavior
- **On Selection**: Gallery hides, text/image display appears
- **During Animation**: Gallery remains hidden for 11 seconds
- **After Completion**: Gallery reappears, scroll position preserved

#### Status Display
| Element | Format |
|---------|--------|
| Fragment Count | "> 57 FRAGMENTS_AVAILABLE" |
| Pagination Info | "> SHOWING 1-8 OF 57" |
| Instruction | "> CLICK_TO_MANIFEST_REALITY" |

### poem3.html - DADAIST_OVERLAY.EXE (Reality Fusion Viewer)

#### Reveal Mode Settings
| Button | Mode | Effect |
|--------|------|--------|
| TOP→BOTTOM | Linear reveal | Smooth clip-path from top (3s + 7s) |
| RANDOM_PIXELS | Pixel reveal | Canvas-based random pixel materialization |

#### Overlay System
| Element | Layer | Behavior |
|---------|-------|----------|
| Text | z-index: 1 | Displays immediately, full prompt visible |
| Image | z-index: 2 | Covers text progressively via reveal mode |
| Container | Dynamic | Adjusts height based on image aspect ratio |

#### Timing Sequence
1. **0-3 seconds**: Text visible, image hidden
2. **3-10 seconds**: Image reveals over text (7 second duration)
3. **10+ seconds**: Complete fusion, gallery reappears

#### Random Pixel Technical Details
| Aspect | Implementation |
|--------|----------------|
| Resolution | 400px canvas masks |
| Algorithm | Fisher-Yates shuffle for pixel positions |
| Mask Type | Black/white canvas converted to data URL |
| CSS Application | `maskImage` and `WebkitMaskImage` properties |

## Common UI Elements

### Terminal Windows
All terminal windows follow this pattern:
- Header showing system commands or status
- Black background body with green text
- Blinking cursor when active
- Monospace font (VT323 or Space Mono)

### System Buttons
- Black background with gray border
- Green glow on hover
- Active state shows green background with black text
- All text in uppercase

### Error Messages
- Appear in terminal windows
- Use contradictory logic (success = failure)
- Technical jargon mixed with absurdist content

### Loading States
- Show "..." with animated dots
- Progress bars that fill to 100%
- "DECOMPRESSING REALITY" type messages

## Console Easter Eggs
Opening browser console shows:
- "> CONSOLE.LOG IS A SOCIAL CONSTRUCT" (green text)
- "This error message is working correctly" (as error)
- "Warning: Everything is exactly as it shouldn't be" (as warning)

## File Paths Reference

### Data Sources
| Content Type | Location |
|--------------|----------|
| Manifesto Data | /data/manifesto.json |
| Poems Data | /data/poems.json |
| Gallery Data | /data/galleries.json |
| Tools Data | /data/tools.json |
| Live Art Data | https://f005.backblazeb2.com/file/td-website/index.json |

### Static Assets (Vite Public Directory)
| Content Type | Location |
|--------------|----------|
| Main Script | /js/main.js |
| Global Styles | /css/global.css |
| Gallery Styles | /css/components/gallery.css |
| Terminal Styles | /css/components/poem-terminal.css |

### React Applications (Vite Structure)
| App | Entry Point | HTML Page |
|-----|-------------|-----------|
| Text Viewer | /src/main.jsx | poems.html |
| Gallery Viewer | /src/main.jsx | poem2.html |
| Fusion Viewer | /src/main.jsx | poem3.html |
| DadaCat Viewer | /src/main.jsx | tsdadacat.html |

### React Components (New Structure)
| Component | Location | Purpose | Used In |
|-----------|----------|---------|---------|
| App.jsx | /src/apps/ | Text dropdown viewer | poems.html |
| App2.jsx | /src/apps/ | Thumbnail gallery viewer | poem2.html |
| App3.jsx | /src/apps/ | Overlay fusion viewer | poem3.html |
| AppDadaCat.jsx | /src/apps/ | Interactive DadaCat | tsdadacat.html |
| ArtSelector.jsx | /src/components/ | Dropdown artwork selection | poems.html |
| ThumbnailSelector.jsx | /src/components/ | Grid-based visual selection | poem2.html, poem3.html |
| PromptDisplay.jsx | /src/components/ | Character-by-character typing | All React apps |
| ImageViewer.jsx | /src/components/ | Progressive image reveal | poems.html, poem2.html |
| OverlayViewer.jsx | /src/components/ | Text/image overlay fusion | poem3.html |
| InteractiveDadaCatPipeline.jsx | /src/components/ | AI generation interface | tsdadacat.html |

### Build System (Vite)
| File | Purpose |
|------|---------|
| /vite.config.js | Multi-page Vite configuration |
| /src/main.jsx | Consolidated React entry point |
| /src/config/pipelineConfig.js | dadacat-lambda-pipeline setup |
| /docker-compose.yml | Development environment |
| /Dockerfile | Container configuration |

## Error Codes Reference

| Code | Type | Meaning |
|------|------|---------|
| 404 | Reality | Reality not found |
| 0xTR1P | Gallery | Triple fault exception |
| 0xL00P | Gallery | Infinite loop detected |
| 0xDUMP | Gallery | Memory dump |
| NULL | Various | Null pointer exceptions |
| NaN | Status | Not a number |
| ∞ | Counter | Infinity (default uptime) |