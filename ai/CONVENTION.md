# CONVENTION.md

Project conventions and standards.

## Purpose
This file documents the coding conventions, style guidelines, and standards used in this project.

## Code Style

### HTML
- Use semantic HTML5 elements
- Maintain proper indentation (2 spaces)
- Include meaningful `alt` attributes for images
- Use lowercase for tags and attributes

### CSS
- Use BEM or similar naming convention for classes
- Organize styles: layout → typography → colors → utilities
- Use CSS custom properties (variables) for theming
- Mobile-first responsive design approach

### JavaScript
- Use ES6+ features (const/let, arrow functions, template literals)
- Follow consistent naming: camelCase for variables/functions, PascalCase for classes
- Add JSDoc comments for public functions
- Keep functions small and single-purpose

## File Organization
- Keep related files together
- Use descriptive, lowercase filenames with hyphens
- Separate concerns (styles, scripts, markup)

## Accessibility
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Use ARIA labels where appropriate
- Test with screen readers when possible

## Performance
- Minimize HTTP requests
- Optimize images before committing
- Use lazy loading for non-critical resources
- Defer non-essential JavaScript

## Version Control
- Write clear, descriptive commit messages
- Keep commits atomic (one logical change per commit)
- Create feature branches for significant changes

---
*Update this file as new conventions are adopted.*
