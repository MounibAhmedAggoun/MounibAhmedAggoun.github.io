# Mounib Aggoun Portfolio Website

A fully responsive, production-ready portfolio website with a cyberpunk/futuristic aesthetic featuring neon effects, smooth animations, and modern web standards.

## 🚀 Features

- **Cyberpunk Aesthetic**: Neon colors, dark theme, glassmorphism effects
- **Smooth Animations**: GSAP-powered animations with CSS fallbacks
- **Fully Responsive**: Mobile-first design with breakpoints for all devices
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Performance Optimized**: Lazy loading, optimized assets, efficient animations
- **Interactive Elements**: Terminal widget, project cards with 3D effects, parallax hologram
- **Theme Toggle**: Switch between cyan, pink, and green neon accents
- **Reduced Motion**: Respects `prefers-reduced-motion` and includes manual toggle

## 📁 File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── scripts.js          # JavaScript functionality
├── README.md           # This file
└── assets/
    ├── logo.svg        # Animated SVG logo
    ├── favicon.svg     # Site favicon
    ├── noise.png       # Background noise texture (optional)
    ├── project1.svg    # Project 1 placeholder image
    ├── project2.svg    # Project 2 placeholder image
    └── project3.svg    # Project 3 placeholder image
```

## 🛠️ Technologies Used

### Core
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript (ES6+)**: No framework dependencies

### External Libraries (CDN)
- **GSAP 3.12.5**: Animation library for complex sequences
  - Core: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  - ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`

### Fonts (Google Fonts)
- **Orbitron**: Headline font (futuristic)
- **JetBrains Mono**: Monospace font for code/terminal
- **Inter**: Body text font (readable UI)

## 🎨 Design System

### Color Palette
- Background: `#05040a` (near-black)
- Panel: `#0d0b12` (slightly lighter)
- Text: `#e9eef6` (near-white)
- Muted: `#9aa4b2` (muted text)
- Neon Pink: `#ff2d95`
- Neon Cyan: `#00e5ff` (default accent)
- Neon Green: `#00ff9c`

### Typography
- Headlines: Orbitron (bold, uppercase)
- Body: Inter (regular)
- Code/Terminal: JetBrains Mono

## 📱 Responsive Breakpoints

- **Desktop**: ≥1200px - Full layout, 3-column hero
- **Tablet**: 768px - 1199px - 2-column layouts
- **Mobile**: ≤767px - Single column, optimized interactions

## 🚀 Getting Started

### Quick Start

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process required - works out of the box!

### Local Development

For local development with a server (recommended):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## ⚙️ Configuration

### Theme Colors

Toggle between theme colors using the theme button (top right), or modify in `scripts.js`:

```javascript
const themes = ['cyan', 'pink', 'green'];
```

### Reduced Motion

The site automatically respects `prefers-reduced-motion` system preference. Users can also manually toggle reduced motion using the button in the top right corner. The preference is saved in `localStorage`.

### Customization

#### Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --bg: #05040a;
    --accent: var(--neon-cyan);
    /* ... */
}
```

#### Content
Update content directly in `index.html`:
- Hero section: Lines ~40-60
- About section: Lines ~80-100
- Projects: Lines ~110-180
- Contact info: Lines ~350-370

## 📝 Content to Replace

### Sample Content (Replace with Real Data)

1. **Email Address**: Currently `mounib@example.com` - Update in:
   - Contact form section (line ~360)
   - Terminal commands (scripts.js, line ~280)
   - Social links (line ~365)

2. **GitHub/LinkedIn URLs**: Update in contact section (lines ~365-375)

3. **Project Images**: Replace placeholder SVG images in `/assets/` with actual project screenshots:
   - `project1.svg` - Password Strength Checker (replace with .webp/.jpg/.png)
   - `project2.svg` - Crypto Whale Tracker (replace with .webp/.jpg/.png)
   - `project3.svg` - Network Security Tool (replace with .webp/.jpg/.png or animated .gif)
   
   Update the `src` attributes in `index.html` accordingly.

4. **Project Links**: Update GitHub and demo links in project cards (lines ~130-180)

5. **About Section**: Update bio and facts (lines ~80-100)

6. **Timeline**: Update education and experience (lines ~280-320)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators with neon outlines
- Screen reader friendly
- Reduced motion support (system preference + manual toggle)
- Skip to main content link
- Proper heading hierarchy
- Form validation with error messages

## 🎯 Performance

### Optimizations
- Lazy loading for images
- CSS animations use `transform` and `opacity` (GPU accelerated)
- Debounced scroll/resize handlers
- Reduced animations on slow connections
- Minimal external dependencies

### Lighthouse Targets
- Performance: ≥80
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

## 🐛 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Fallbacks
- CSS animations work without GSAP
- Reduced motion mode disables complex animations
- Graceful degradation for older browsers

## 📄 License

This portfolio template is provided as-is. Feel free to modify and use for your own portfolio.

## 🤝 Contributing

This is a personal portfolio template. If you find bugs or have suggestions, feel free to open an issue or submit a pull request.

## 📧 Contact

- **Email**: mounib@example.com (replace with real email)
- **GitHub**: [github.com/nyxxaaris](https://github.com/nyxxaaris)
- **LinkedIn**: [linkedin.com/in/nyxxaaris](https://linkedin.com/in/nyxxaaris)

## 🎨 Animation Details

### Hero Section
- Logo: Stroke-dashoffset animation (2s)
- Headline: Typewriter effect (35ms/char)
- Hologram: Continuous 3D rotation with parallax

### Scroll Animations
- Project cards: Staggered fade-in with scale
- Skills: Circular progress rings animate on scroll
- Timeline: Slide-in from left with opacity

### Interactions
- Project cards: 3D tilt on hover, flip on click
- Buttons: Neon glow and scale on hover
- Form: Real-time validation with error states

## 🔧 Troubleshooting

### Animations not working?
- Check if reduced motion is enabled (button in top right)
- Ensure GSAP is loaded (check browser console)
- Verify JavaScript is enabled

### Images not loading?
- Check file paths in `index.html`
- Ensure images exist in `/assets/` directory
- Replace placeholder images with actual project screenshots

### Styling issues?
- Clear browser cache
- Check browser console for errors
- Verify CSS file is linked correctly

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Built with ❤️ for Mounib Aggoun**
