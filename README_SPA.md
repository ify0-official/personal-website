# Single Page Application (SPA) Architecture

## Overview
The website has been refactored from multiple HTML files into a single-page application (SPA) architecture to fix the UX issue of page reloading on every navigation.

## New Structure

### Main Entry Point
- **`app.html`** - The main single HTML file that serves as the entry point for the entire application

### CSS Files (Separated Styling)
- **`styles.css`** - Base styles (typography, colors, layout, navigation bar)
- **`works.css`** - Works page specific styles (project grid, hover effects, shake animation)
- **`inquiries.css`** - Inquiries page specific styles (Q&A container, focus states)
- **`app.css`** - SPA-specific styles (page sections, transitions, animations)

### JavaScript Files (Separated Logic)
- **`scripts.js`** - Core functionality:
  - Procedural audio generator (tick sounds)
  - Audio context management
  - Keyboard navigation (1-5 keys)
  - Navigation button event handlers
  
- **`app.js`** - SPA-specific functionality:
  - Page content loading and management
  - Page switching logic
  - Works page dynamic rendering (projects, shuffle)
  - Super hover implementation
  - No-hire shake functionality

### Page Sections (Separated Content)
Located in `/workspace/pages/`:
- **`home.html`** - Home page content
- **`works.html`** - Works/projects page content
- **`roadmap.html`** - Roadmap page content
- **`inquiries.html`** - Q&A page content
- **`contacts.html`** - Contact page content

## How It Works

1. **Initial Load**: `app.html` loads with an empty `<main>` container
2. **Page Fetching**: `app.js` fetches all page section HTML files from `/pages/`
3. **Rendering**: All page sections are rendered into the DOM but hidden by default
4. **Navigation**: 
   - Clicking nav buttons or pressing 1-5 keys switches visible pages
   - No page reload - just CSS class toggling (`active` class)
   - Smooth fade-in transition animation on page switch
5. **Audio**: Procedural tick sounds play on navigation (preserved from original)

## Benefits

✅ **No Page Reloading** - Instant navigation without refresh
✅ **Better UX** - Smooth page transitions with fade animation
✅ **Maintainable** - Separated concerns (styling, logic, content)
✅ **Preserved Features** - All original functionality maintained:
   - Procedural audio ticks
   - Keyboard navigation (1-5)
   - Tab navigation
   - Focus states
   - Works page project shuffle
   - Super hover effect
   - No-hire shake animation

## Usage

Open `app.html` in a browser to use the new SPA version.

The old individual HTML files (`index.html`, `works.html`, etc.) are kept for reference but are no longer needed for the SPA version.
