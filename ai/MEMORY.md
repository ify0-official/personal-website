# Long-Term Memory

## Project Overview

**Project Type**: Personal Portfolio Website
**Tech Stack**: Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
**Design Philosophy**: Minimalist/brutalist aesthetic with keyboard-first navigation
**Target Audience**: Potential employers, collaborators, visitors interested in personal projects

**Site Structure**:
- `index.html` - Home page with personal introduction
- `works.html` - Project showcase with interactive image preview
- `roadmap.html` - Future plans (currently placeholder)
- `inquiries.html` - Q&A section with expandable answers
- `contacts.html` - Contact information page

**Key Features**:
- Procedural audio feedback on interactions (Web Audio API)
- Keyboard navigation (number keys 1-5, Tab key)
- Variable font implementation (Commit Mono)
- Custom hover/focus effects with visual feedback
- Responsive design for mobile devices

## Key Decisions

1. **No Framework Approach**: Chosen for simplicity, performance, and learning purposes
2. **Audio Feedback**: Unique differentiator providing tactile feedback on navigation
3. **Keyboard-First Navigation**: Accessibility-focused design with number key shortcuts
4. **Brutalist Aesthetic**: Intentional raw/minimal design choice
5. **Static Site**: No backend, all content is static HTML

## Patterns & Conventions

### File Organization
```
/workspace
├── ai/                    # AI session documentation
│   ├── CONTEXT.md        # Short-term session context
│   ├── MEMORY.md         # Long-term project knowledge
│   ├── CONVENTION.md     # Coding conventions
│   └── INSTRUCTION.md    # AI behavioral guidelines
├── assets/
│   ├── fonts/            # Variable fonts and fallbacks
│   └── images/           # WebP optimized images
├── *.html                # Individual page files
├── styles.css            # Global shared styles
├── works.css             # Works page specific styles
├── inquiries.css         # Inquiries page specific styles
├── scripts.js            # Shared JavaScript (audio, navigation)
└── package.json          # NPM configuration (minimal)
```

### Code Style
- **HTML**: Semantic elements, ARIA labels for accessibility
- **CSS**: CSS custom properties (variables), grid/flexbox layouts
- **JavaScript**: ES6+, DOMContentLoaded pattern, async/await for audio

### Naming Conventions
- Files: lowercase with hyphens (e.g., `works.html`, `styles.css`)
- CSS classes: kebab-case (e.g., `.bar-link`, `.project-pair`)
- CSS variables: kebab-case with semantic meaning (e.g., `--bgc`, `--fgc`)
- IDs: kebab-case with purpose prefix (e.g., `nav-1`, `main-content`)

### Documentation Standards
- AI directory contains all meta-documentation
- Inline comments for complex JavaScript logic
- CSS sectioned with comment headers

## Lessons Learned

### Current Issues Identified

#### Critical (Fix ASAP)
1. **Code Duplication**: Audio context code exists in both `scripts.js` and inline in `works.html` - violates DRY principle
2. **Inline JavaScript**: `works.html` contains ~200 lines of inline JS - should be extracted to separate file
3. **Navigation Duplication**: Same nav markup copied across 5 files - error-prone maintenance

#### High Priority
4. **SEO Gaps**: Missing meta descriptions, Open Graph tags, structured data
5. **Accessibility Issues**: 
   - Missing alt text on dynamic images
   - Skip link doesn't work properly on all pages
   - Focus management could be improved
6. **Performance**: 
   - Large image files not optimized (some >500KB)
   - Unused OTF font files taking space (~800KB total)
   - No lazy loading for images

#### Medium Priority
7. **Content Issues**:
   - Roadmap page is empty placeholder
   - Contact page has no actual contact mechanism
   - Some typos in content (e.g., "borned" → "born", "stuffs" → "stuff")
8. **JavaScript Architecture**:
   - No error handling for failed image loads
   - Audio context not properly cleaned up
   - Event listeners could leak on page navigation

#### Low Priority (Nice to Have)
9. **Developer Experience**:
   - No build process or bundler
   - No CSS preprocessing
   - No automated testing
   - No linting configuration
10. **Features**:
    - Dark/light mode toggle
    - Language switcher (Burmese/English)
    - Social media links
    - Blog section for thoughts/writings

### Technical Debt Summary
- **works.html**: Extract inline JS to `works.js` or integrate into `scripts.js`
- **Navigation**: Create reusable component or use server-side includes
- **Images**: Implement responsive images with srcset
- **Fonts**: Remove unused OTF files, keep only WOFF2
- **Audio**: Centralize audio logic, add proper error handling

## References

### External Resources
- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Variable Fonts Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Fonts - Manrope](https://fonts.google.com/specimen/Manrope)
- [Commit Mono Font](https://github.com/soverain/commit-mono)

### Browser Support Considerations
- Web Audio API: Requires user gesture to start audio (handled)
- Variable Fonts: Modern browsers only (fallback to regular monospace)
- CSS Grid/Flexbox: Universal support in modern browsers
- OKLCH Colors: Newer color space, check browser compatibility

---

**Note:** This file accumulates knowledge across sessions. Review periodically to remove outdated information.
