# MEMORY.md

Long-term memory for the project.

## Purpose
This file stores enduring knowledge about the project:
- Architecture decisions
- Key patterns and conventions
- Important learnings that persist across sessions
- Project history and evolution

## Structure

### Architecture
[Document key architectural decisions here]

### Patterns
[Record reusable patterns and approaches]

### Learnings
[Capture important insights gained during development]

### History
[Track significant milestones and changes]

### Session Notes

#### Current Session - SPA Keyboard Navigation Fix (Final Solution)
- **Issue:** Keyboard number keys (1-5) for page navigation were not working after migrating from multi-page to SPA setup
- **Root Cause:** The `showPage` function was defined in `app.js` but was not exposed globally, making it inaccessible from `scripts.js` where the keyboard event listener was defined
- **Fix Applied:**
  1. Added `window.showPage = showPage;` in `app.js` to expose the function globally
  2. Updated `scripts.js` to use `window.showPage` instead of `showPage`
  3. Added error logging (`console.error`) to help debug if the function is not found
  4. Ensured proper initialization order: `setupKeyboardNavigation()` is called after `loadAllPages()` completes
- **Files Modified:** `app.js`, `scripts.js`
- **Key Learning:** When converting from multi-page to SPA, ensure all cross-file function calls use the global `window` object or implement a proper module system

#### Previous Session - Navigation data-page Attributes Fix
- **Issue:** Keyboard number keys (1-5) for page navigation were not working in SPA mode
- **Root Cause:** Mismatch between `data-page` attribute values (HTML filenames like `index.html`) and the page section IDs expected by `showPage()` function (`home`, `works`, etc.)
- **Fix Applied:** Updated all navigation button `data-page` attributes in 5 HTML files to use consistent page name identifiers:
  - `data-page="home"` (was `index.html`)
  - `data-page="works"` (was `works.html`)  
  - `data-page="roadmap"` (was `roadmap.html`)
  - `data-page="inquiries"` (was `inquiries.html`)
  - `data-page="contacts"` (was `contacts.html`)
- **Files Modified:** `index.html`, `contacts.html`, `works.html`, `roadmap.html`, `inquiries.html`

#### Previous Session - suggestion/ Directory Creation
- Created `suggestion/` directory with structured feedback loop system
- Added 4 documentation files: ENTRY.md, SUGGESTION.md, SOLUTION.md, PROBLEM.md
- Identified 5 improvement suggestions for the portfolio website
- Updated CONTEXT.md with session summary
- **Important:** Fixed `.gitignore` to NOT include suggestion/ files - documentation should be tracked in git
- **Guideline:** Never add newly created documentation files/folders to `.gitignore`; only standard build artifacts, dependencies, and OS files should be ignored

---

*This file should grow organically as the project evolves.*
