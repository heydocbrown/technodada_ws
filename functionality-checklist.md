# Functionality Checklist - Pre-Migration Verification

## Homepage (index.html)

- [ ] 404 aesthetic displays correctly
- [ ] Matrix background animation works
- [ ] Manifesto player loads and plays
- [ ] Voice switching between DADACAT.AI, MARC_A.HUMAN, MACHINE.GHOST, VOID.NULL
- [ ] Navigation links to all pages work
- [ ] Status bar elements (REALITY_STATUS, UPTIME) animate correctly
- [ ] Console easter eggs appear

## Gallery (gallery.html)

- [ ] Three viewing modes work:
  - [ ] TRIPLE_FAULT (triptych view)
  - [ ] INFINITE_LOOP (sequence view)
  - [ ] MEMORY_DUMP (grid view)
- [ ] Images load from Backblaze B2
- [ ] Modal viewer opens on image click
- [ ] Modal close button works
- [ ] Filters (ALL_ERRORS, 0xTR1P, 0xL00P, 0xDUMP) function correctly
- [ ] Status bar shows image count and memory leak counter

## React Apps - poems.html

- [ ] Page loads without errors
- [ ] DADACAT/TRUTHTERMINAL project buttons work
- [ ] Dropdown populates with artwork list
- [ ] Text typing effect works (character by character)
- [ ] Image progressive reveal works (top to bottom)
- [ ] Timing synchronization between text and image
- [ ] Data loads from Backblaze index.json

## React Apps - poem2.html

- [ ] Page loads without errors
- [ ] DADACAT/GOATSE GNOSIS project buttons work
- [ ] Thumbnail grid displays (8 per page)
- [ ] Pagination works (PREV/NEXT buttons)
- [ ] Thumbnail click triggers text/image display
- [ ] Gallery hides during animation
- [ ] Gallery reappears after completion

## React Apps - poem3.html

- [ ] Page loads without errors
- [ ] DADACAT/TRUTH TERMINAL project buttons work
- [ ] Thumbnail grid displays
- [ ] TOP→BOTTOM reveal mode works
- [ ] RANDOM_PIXELS reveal mode works
- [ ] Text overlays with image correctly
- [ ] Timing sequence (3s delay, 7s reveal) works

## Interactive Features - tsdadacat.html

- [ ] Page loads without errors
- [ ] DadaCat interface displays
- [ ] dadacat-lambda-pipeline integration works
- [ ] Image generation requests succeed
- [ ] Generated images display correctly

## Data Loading

- [ ] Manifesto data loads from /assets/data/manifesto.json
- [ ] Poems data loads from /assets/data/poems.json
- [ ] Gallery data loads from /assets/data/galleries.json
- [ ] Tools data loads from /assets/data/tools.json
- [ ] Live art data loads from https://f005.backblazeb2.com/file/td-website/index.json

## Global Elements

- [ ] CSS styles apply correctly across all pages
- [ ] VT323 font loads and displays
- [ ] Navigation error messages display correctly
- [ ] Terminal window styling consistent
- [ ] Button hover effects work

## Build & Deploy

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] Built files work with `npm run preview`
- [ ] No console errors in production build
