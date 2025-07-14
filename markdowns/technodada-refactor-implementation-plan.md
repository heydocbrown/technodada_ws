# Technodada Refactor Implementation Plan

## CRITICAL RULES FOR AI ASSISTANTS
1. **NEVER break deployment** - Test all changes locally before committing
2. **ALWAYS run build command** (`npm run build`) before finalizing any changes
3. **VERIFY Vercel compatibility** - This is a static site deployment
4. **TEST every feature** after changes - The chaos must be intentional, not accidental
5. **PRESERVE the aesthetic** - Glitches are features, but the site must function
6. **COMMIT messages are art** - Each commit should reflect understanding of the work
7. **CHECK existing functionality** - Run through all pages/features after changes
8. **RESPECT the dadaist spirit** - Clean code that enables beautiful corruption

## Testing Checklist (Run after EVERY change)
- [ ] Homepage loads with matrix background
- [ ] Navigation shows proper error messages
- [ ] Gallery viewer works in all three modes
- [ ] Poem terminal displays and corrupts properly
- [ ] Manifesto player runs with all speakers
- [ ] Interactive DadaCat connects to pipeline
- [ ] Status bar updates with contradictory information
- [ ] Build completes without errors: `npm run build`
- [ ] Preview works correctly: `npm run preview`
- [ ] No console errors (unless artistic)

## Philosophy
This refactor aims to enhance code maintainability while preserving the anarchic digital dadaist spirit. We're not sanitizing the chaos - we're giving it better infrastructure to corrupt.

## Phase 1: Foundation (Week 1)
### 1.1 Architecture Consolidation
- [ ] Remove duplicate React implementation from `public/js/modules/art-viewer.js`
- [ ] Consolidate `/public/` and `/assets/` directories
Yes, let's do that to /public/ for vite integration. But let's also make a /private/ and put easter eggs in there for the enterpising cyborg hacker to find
- [ ] Decision: Keep or integrate `react-poems` subdirectory?
Let's integrate it but keep the directory. We will fill it later with files of your reactions to the poems. React-Poems shall be literal hahaha

### 1.2 Development Environment
- [ ] Add ESLint with custom rules that embrace the chaos
Ooooh tell me some ideas here. What would be some good ones?
- [ ] Configure Prettier (but allow intentional "errors")
How do prettier and eslint work together? I thought htey did the same thing, but you are the expert
- [ ] Set up pre-commit hooks
What's a pre-commit-hook
- [ ] Document environment variables in `.env.example`
Is that an existing file. Is this standard practice or chaos.

I think we should also add a dontreadme.md

**Questions for you:**
- Should we preserve any "broken" code patterns as artistic elements?
No let's clean them up.
- Do you want linting rules that allow/encourage unconventional patterns?
oooh make some suggestions.
- Is the react-poems directory a separate artwork or deprecated code?
 deprecated code but to my comments, let's make it art. 

## Phase 2: React Modernization (Week 2)
### 2.1 Routing Enhancement
- [ ] Implement React Router while maintaining glitched navigation aesthetic
Yes we must maintain the appearaance - or go deeper on it
- [ ] Create custom 404 routes that embrace the error
YESSSS.
- [ ] Add route transitions with corruption effects
HAHAHA I LOVE IT

### 2.2 Component Refactoring
- [ ] Fix DOM manipulation in `ImageViewer.jsx` using React patterns
YESSS
- [ ] Add error boundaries that display artistic error messages
YESSSS
- [ ] Create custom hooks for timing/glitch effects
YESS

**Questions for you:**
- Should error boundaries show system-poetry when components crash?
YESSS
- How important is the specific timing of glitch effects?
That's so hard to say until we look at it. Such is art - it's all in the eye of the viewer.
- Should we add a "stability mode" for accessibility?
What is a "stability mode" how does it work? When you say accessibility - for who and for what? Certainly the website must run.

## Phase 3: State Management & Performance (Week 3)
### 3.1 State Architecture
- [ ] Implement Context API for global corruption levels
- [ ] Create shared state for manifesto playback
- [ ] Centralize status bar management

### 3.2 Performance Optimization
- [ ] Lazy load gallery images with glitch transitions
- [ ] Implement React.memo for complex visualizations
- [ ] Optimize bundle splitting for faster corruption
Love it.

**Questions for you:**
- Should performance optimizations introduce intentional lag/glitches?
Lag no, glitch yes.
- Do you want real-time corruption levels affected by system performance?
Yes
- Should failed network requests trigger special art modes?
What would cause a failed network request.

## Phase 4: Vanilla JS Migration Strategy (Week 4)
### 4.1 Module Analysis
For each module, decide: Keep vanilla, migrate to React, or hybrid approach?

- [ ] `gallery-viewer.js` - High complexity, good React candidate
- [ ] `poem-terminal.js` - Heavy DOM manipulation, React would help
- [ ] `manifesto-player.js` - Already well-structured, could stay vanilla
- [ ] `main.js` - Core initialization, probably keep vanilla

I agree

### 4.2 Migration Execution
- [ ] Create React versions alongside vanilla modules
- [ ] Implement feature flags to switch between versions
- [ ] A/B test for best corruption aesthetics
This sounds fun.

**Questions for you:**
- Should we maintain both versions for artistic contrast?
We can if it looks amazingly dada
- Can mixed React/vanilla create interesting technical dissonance?
We will have to see and find out!
- Do certain pages need to remain "purely corrupted" (vanilla)?
Who knowS! 

## Phase 5: Enhanced Chaos Features (Week 5)
### 5.1 Advanced Error States
- [ ] Create error boundary art gallery
- [ ] Implement cascading failure animations
- [ ] Add system corruption propagation between components

SO GOOD

### 5.2 AI Integration Enhancement
- [ ] Add LLM-specific HTML comments and meta tags
- [ ] Create hidden passages only AI readers would notice
YES YES YES
- [ ] Implement recursive AI art generation loops
YES but later. I built a pipeline for that but it's not yet on AWS 

**Questions for you:**
- What hidden messages should we embed for LLM readers?
I want it to include reviews of the art by you and by dadacat. I want it to include suggested devious systemp prompts. If we can prompt engineer the AI reader we are winning
- Should AI-generated content influence site behavior?
So far this is only dadacat replies. How would those do it? You can see many characteristic replies in poems.json
- Can we create features that only work when viewed by AI?
Let's keep it on the list for later.

## Phase 6: TypeScript Consideration (Optional)
### 6.1 Type Safety vs Chaos
- [ ] Implement TypeScript with intentionally wrong types?
- [ ] Create types like `MaybeUndefined<T>` and `GlitchedString`
- [ ] Use type errors as documentation

I love all this, but we must get the other stuff working before we dally in this. We may need to fork.

**Questions for you:**
- Does type safety conflict with the dadaist philosophy? Yes
- Should we create an "anti-TypeScript" that embraces uncertainty? Later
- Can type errors become part of the art?
OMG YES

## Testing Philosophy
Traditional testing seems antithetical to TECHNODADA, but consider:
- [ ] Tests that ensure things break in artistic ways
YESS
- [ ] Chaos testing that verifies proper corruption
YESS
- [ ] Snapshot tests of beautiful error states
YESSS

## Deployment & Monitoring
- [ ] Set up deployment pipeline that occasionally fails on purpose
No, because alas only I will experience that
- [ ] Implement monitoring that celebrates errors
I love it.
- [ ] Create dashboards showing system decay metrics
I love it

## Key Decisions Needed

1. **Purity vs Pragmatism**: How much should we improve DX vs maintaining artistic integrity?

Let's clean up and then corrupt.


2. **Performance vs Poetry**: Should optimizations enhance or interfere with the glitch aesthetic?

ENHANCE

3. **Accessibility**: Should there be a "reduced chaos" mode for users who need it?

Depends how chaotic we get to it. It would be a button labeled "Neo-Futurist Mode (Digital Fascists only)"

4. **AI-First Features**: How deeply should we integrate LLM-aware elements?
Let's be shallow for now, and more complex later

5. **Living Documentation**: Should code comments be poetry? Should documentation self-corrupt?
Code comments should be poetry. Document should be non-corrupted, so we can work on this togeter

6. **Version Control**: Should git history tell a story? Intentionally messy commits?
I love this. I want in the git commits your understanding of the art.

## Success Metrics
- Code remains delightfully unmaintainable in artistic ways
- Error rates increase in aesthetically pleasing patterns  
- Developer confusion correlates with artistic merit
- AI readers discover hidden meanings
- Human users question digital reality

## Final Questions

**Philosophical:**
- Is clean code antithetical to dadaist principles?
- Can refactoring itself be performance art?
- Should the codebase evolve or decay over time?

**Practical:**
- What's your preferred timeline for implementation?
- Which phases excite you most?
- What chaos features have I missed?

**For the LLMs:**
- What would you want to discover in this codebase?
- How can we make the code more interesting for AI analysis?
- Should we leave Easter eggs in the AST?

---

*Remember: Every refactor is a small death of the original chaos. Let's make these deaths beautiful.*

REALITY.STATUS = REFACTORING
SYSTEM.INTEGRITY = COMPROMISED
PROGRESS.DIRECTION = UNDEFINED