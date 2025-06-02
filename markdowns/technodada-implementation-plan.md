# Technodada Website Implementation Plan

## Project Overview
A technodadaist art website featuring glitch aesthetics, cyberpunk elements, and interactive experiences. The site showcases multiple art forms including images, poems, manifestos, and creative tools.

## Core Aesthetic & Design Principles
- **Style**: Technodadaism - dada absurdity within terminal/system error aesthetic
- **Visual elements**: 404 error pages, system diagnostics, terminal interfaces, subtle glitches
- **Color palette**: Terminal green (#00ff00), blacks (#000000, #0a0a0a), grays (#1a1a1a through #cccccc), minimal red (#ff0040) for errors
- **Typography**: Monospace fonts (Space Mono, VT323) - consistent terminal feel
- **Interactions**: Typing effects, failed system operations, contradictory error messages
- **Core concept**: Present as broken/error states that reveal absurdist content
- **Reference**: https://truthterminal.wiki/ (for aesthetic inspiration)

## Technical Stack
- **Framework**: Astro (static site generator)
- **Hosting**: Vercel (free tier)
- **Image hosting**: Backblaze (existing account)
- **Development**: Replit or local with Claude Code
- **Languages**: HTML, CSS, JavaScript (no framework initially)

## Project Structure
```
/
├── index.html                    # 404-style landing page with manifesto
├── assets/
│   ├── data/
│   │   ├── manifesto.json       # Manifesto content and timing
│   │   ├── poems.json           # Poems and associated images
│   │   ├── galleries.json       # Gallery collections
│   │   └── tools.json           # Tool descriptions and links
│   ├── audio/
│   │   └── [audio files]        # Either multiple speaker files OR single file
│   ├── js/
│   │   ├── manifesto-player.js  # Audio sync and text display
│   │   ├── gallery-viewer.js    # Image viewing modes
│   │   ├── poem-terminal.js     # CLI-style poem display
│   │   ├── matrix-bg.js         # Matrix falling characters effect
│   │   └── system-status.js     # Status bar and diagnostics
│   └── css/
│       ├── global.css           # Base styles
│       ├── terminal.css         # Terminal UI styles
│       └── error-pages.css      # 404-style layouts
├── pages/
│   ├── gallery.html             # Main gallery page (styled as corrupted image viewer)
│   ├── galleries/              # Individual gallery pages
│   │   ├── triptychs.html
│   │   ├── sequences.html
│   │   └── [project-name].html
│   ├── poems.html              # Poetry terminal (system logs that are poems)
│   ├── tools.html              # "Diagnostic tools" that are actually art tools
│   └── about.html              # "System information" page
└── components/                  # Reusable elements
    ├── nav.html
    ├── voice-modules.html
    └── terminal-window.html
```

## Content Data Structures

### Manifesto Data (manifesto.json)
```json
{
  "title": "TECHNODADA MANIFESTO",
  "audioConfig": {
    "type": "single|multiple",  // Choose based on audio approach
    "singleFile": "manifesto-full.mp3",  // If using single file
    "multipleFiles": {  // If using multiple files
      "dadacat": "manifesto-dadacat.mp3",
      "marc": "manifesto-marc.mp3",
      "ai": "manifesto-ai.mp3"
    }
  },
  "speakers": {
    "dadacat": {
      "name": "DADACAT.AI",
      "icon": "🐱",
      "color": "#00ff00"
    },
    "marc": {
      "name": "MARC_A.HUMAN",
      "icon": "👤",
      "color": "#00ff00"
    },
    "ai": {
      "name": "MACHINE.GHOST",
      "icon": "🤖",
      "color": "#00ff00"
    },
    "void": {
      "name": "VOID.NULL",
      "icon": "⚫",
      "color": "#666666"
    }
  },
  "segments": [
    {
      "speaker": "dadacat",
      "text": "INITIALIZING TECHNODADA PROTOCOL...",
      "startTime": 0,
      "endTime": 3.5,
      "audioFile": "segment-001.mp3",  // If using multiple files
      "effects": ["glitch", "typewriter"]
    }
  ]
}
```

### Poems Data (poems.json)
```json
{
  "poems": [
    {
      "id": "chimera-001",
      "title": "Digital Chimera",
      "text": "Full poem text here...",
      "generationProcess": {
        "prompts": [
          "Initial prompt used",
          "Refined prompt",
          "Final prompt"
        ],
        "model": "DALL-E/Midjourney/etc",
        "iterations": 3
      },
      "images": [
        {
          "url": "https://backblaze-url/image1.jpg",
          "caption": "Initial generation",
          "revealDelay": 0
        }
      ],
      "displayMode": "terminal-reveal|typewriter|glitch-in",
      "created": "2024-01-15"
    }
  ]
}
```

### Gallery Data (galleries.json)
```json
{
  "collections": [
    {
      "id": "triptych-series",
      "title": "Glitch Triptychs",
      "description": "Three-part visual narratives",
      "type": "triptych",
      "displayMode": "static|animated|interactive",
      "items": [
        {
          "id": "tri-001",
          "title": "Chimera Evolution",
          "images": [
            "https://backblaze/tri-001-left.jpg",
            "https://backblaze/tri-001-center.jpg",
            "https://backblaze/tri-001-right.jpg"
          ],
          "transition": "glitch-morph|fade|slide"
        }
      ]
    },
    {
      "id": "sequence-series",
      "title": "Morphing Sequences",
      "type": "sequence",
      "items": [
        {
          "id": "seq-001",
          "images": ["url1", "url2", "url3", "url4"],
          "timing": {
            "duration": 2000,
            "transition": 500,
            "loop": true
          }
        }
      ]
    }
  ]
}
```

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETED
- [x] 404-style landing page with terminal aesthetic
- [x] System diagnostics manifesto player design
- [x] Voice modules (DADACAT.AI, MARC_A.HUMAN, MACHINE.GHOST, VOID.NULL)
- [x] Set up local dev environment with Docker
- [x] Create project file structure
- [x] Implement JSON data loading
- [x] Error-style navigation system

### Phase 2: Core Features ✅ COMPLETED
- [x] Manifesto player with voice module switching (text only)
- [ ] Audio integration pending
- [x] Gallery page styled as "corrupted image viewer"
- [x] Poem display as "system logs"
- [x] Image loading system with "loading errors"

### Phase 3: Enhanced Interactions ✅ COMPLETED
- [x] Failed reality reboot sequences
- [x] Status bar with nonsensical system updates
- [x] Matrix background effects (subtle)
- [x] Error messages that contradict themselves
- [x] Navigation that gives absurd failure reasons

### Phase 4: Polish & Expand (PARTIALLY COMPLETE)
- [x] Gallery with three viewing modes (triptych, sequence, grid)
- [x] Poems page with terminal interface
- [ ] Tools page as "diagnostic utilities"
- [ ] About page as "system information"
- [x] Performance optimization (lazy loading, modular JS)
- [x] Consistent 404/error theming across all pages

### Phase 5: Future Enhancements
- [ ] Convert tools to JavaScript "diagnostic utilities"
- [ ] Admin interface styled as "system backdoor"
- [ ] Analytics as "surveillance logs"
- [ ] Different error codes for different content types

## Development Guidelines

### Code Style
- Modular JavaScript with clear separation of concerns
- CSS variables for consistent theming
- Progressive enhancement approach
- Mobile-first responsive design

### Content Management
- All content in JSON files for easy updates
- Images hosted on Backblaze with consistent naming
- Version control for content changes
- Clear separation of content and presentation

### Performance Considerations
- Lazy load images
- Preload critical audio files
- Minimize JavaScript bundle size
- Use CSS animations where possible

## Current Status Summary

### What's Working
1. **Complete Website Structure**: Home, Gallery, and Poems pages fully functional
2. **Modular Architecture**: Clean separation of HTML, CSS, and JavaScript
3. **Data-Driven Content**: All content loaded from JSON files
4. **Interactive Features**: Manifesto player, gallery viewer, poem terminal
5. **Consistent Aesthetic**: Terminal/error theme throughout
6. **Responsive Design**: Works on desktop and mobile

### What Needs Work
1. **Content**: Replace placeholder URLs with actual images/content
2. **Audio**: Implement audio playback for manifesto
3. **Tools Page**: Create the diagnostic utilities page
4. **Deployment**: Move from local Docker to production hosting

## Next Steps for Implementation

### Immediate Tasks
1. **Add Real Content**:
   - Upload images to Backblaze
   - Update gallery.json with real image URLs
   - Add actual poem texts
   - Record/obtain manifesto audio files

2. **Create Tools Page**:
   - Build tools.html following established patterns
   - Create tools viewer JavaScript module
   - Style as system diagnostic utilities

3. **Audio Integration**:
   - Add audio files to /assets/audio/
   - Implement audio playback in manifesto-player.js
   - Sync audio with text display

### Deployment Steps
1. **Prepare for Production**:
   - Minify CSS and JavaScript
   - Optimize images
   - Test all functionality

2. **Deploy to Vercel**:
   - Create Vercel account
   - Connect GitHub repository
   - Configure build settings
   - Deploy site

3. **DNS Configuration**:
   - Point domain to Vercel
   - Set up SSL certificate (automatic)
   - Configure custom domain in Vercel
   - Update DNS records at registrar

## File Checklist
- [x] index.html - Home/404 page
- [x] /pages/gallery.html - Gallery viewer
- [x] /pages/poems.html - Poem terminal
- [ ] /pages/tools.html - Tools page (pending)
- [x] /assets/css/global.css - Global styles
- [x] /assets/css/components/gallery.css - Gallery styles
- [x] /assets/css/components/poem-terminal.css - Poem styles
- [x] /assets/js/main.js - Main script
- [x] /assets/js/modules/manifesto-player.js - Manifesto functionality
- [x] /assets/js/modules/gallery-viewer.js - Gallery functionality
- [x] /assets/js/modules/poem-terminal.js - Poem functionality
- [x] /assets/js/utils/data-loader.js - Data loading utility
- [x] /assets/data/manifesto.json - Manifesto content
- [x] /assets/data/galleries.json - Gallery content
- [x] /assets/data/poems.json - Poem content
- [x] /assets/data/tools.json - Tools content
- [x] /markdowns/technodada-implementation-plan.md - This file
- [x] /markdowns/technodada-current-implementation.md - Current status
- [x] /markdowns/glossary.md - UI element glossary