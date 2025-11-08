# OYATZ Salon Website
## Premium Hair Salon Website with Apple-Level Craft

A high-performance, accessible single-page website built with Next.js 14, featuring liquid glass effects, sophisticated animations, and premium visual design inspired by Apple's design language.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Serve static export (for GitHub Pages)
npm run serve:static
```

Visit `http://localhost:3000` to see the site.

---

## 📁 Project Structure

```
oyatz/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx             # Main page (single-page app)
│   └── globals.css          # Design tokens & global styles
├── components/
│   ├── Header.tsx           # Sticky header with glass effect
│   ├── HeroLiquidGlass.tsx  # Hero with liquid glass card
│   ├── MagneticButton.tsx   # Magnetic hover button component
│   ├── HoverCard.tsx        # Interactive feature cards
│   ├── MasonryGallery.tsx   # Responsive gallery grid
│   ├── Lightbox.tsx         # Keyboard-accessible lightbox
│   ├── Accordion.tsx        # FAQ accordion
│   ├── Footer.tsx           # Footer with social links
│   └── ...                  # Additional components
├── lib/
│   └── palette.ts           # Color tokens & utilities
└── public/
    └── assets/              # Images & videos
```

---

## 🎨 Design System

### Colors
- **Brand:** Mocha Mousse (Pantone 17-1230) - `#a47864`
- **Background:** Soft white - `#F6F7F9`
- **Text:** Near black - `#0B0B0C`

### Typography
- **Display:** Playfair Display (headlines)
- **Body:** Inter (UI & body text)

### Key Features
- ✅ Liquid glass effects with mouse-tracking highlights
- ✅ Magnetic button interactions
- ✅ Smooth parallax scrolling
- ✅ Scroll-triggered reveals
- ✅ Keyboard accessibility (WCAG AA)
- ✅ Responsive (mobile-first)
- ✅ Performance optimized (Lighthouse ≥ 95 target)

---

## 🖼️ Customization

### Replace Images/Videos

1. **Hero Video:** Replace `/public/assets/7507183-hd_1920_1080_25fps.mp4`
2. **Gallery Images:** Update the `galleryImages` array in `app/page.tsx`
3. **Story Images:** Modify image sources in the Story section

### Update Content

Edit text content directly in `app/page.tsx`:
- Hero headline & subtitle
- Story section content
- FAQ items
- Footer links

### Change Colors

Update CSS variables in `app/globals.css`:
```css
:root {
  --brand-500: #a47864; /* Change to your brand color */
  /* ... */
}
```

---

## ⚙️ Configuration

### Static Export (GitHub Pages)

The site is configured for static export. See `next.config.mjs`:
```javascript
output: 'export',
trailingSlash: true,
images: { unoptimized: true }
```

### Fonts

Fonts are optimized with `next/font`:
- Inter: UI & body text
- Playfair Display: Headlines

---

## ♿ Accessibility

- **Keyboard Navigation:** Full keyboard support (Tab, Enter, Escape, Arrow keys)
- **Screen Readers:** Semantic HTML5 + ARIA labels
- **Focus States:** Visible 2px outlines with 4px offset
- **Contrast:** WCAG AA compliant (≥ 4.5:1)
- **Reduced Motion:** Respects `prefers-reduced-motion`

---

## 🚀 Performance

### Optimizations
- ✅ `next/image` with blur placeholders
- ✅ Static export (no server runtime)
- ✅ Optimized fonts (`display: swap`)
- ✅ Lazy-loaded animations
- ✅ Passive scroll listeners

### Target Metrics
- Lighthouse Performance: ≥ 95
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Development

### Key Technologies
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **next/image**

### Adding New Components

1. Create component in `/components`
2. Use `'use client'` for interactivity
3. Import motion from `framer-motion` for animations
4. Respect `prefers-reduced-motion`
5. Add keyboard accessibility

### Animation Guidelines

- **Duration:** 0.4-0.8s
- **Distance:** Max 60px movement
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Spring Physics:** Stiffness 300-400, Damping 25-30

---

## 📄 License

This project is for OYATZ Salon. All rights reserved.

---

## 📚 Documentation

See `DESIGN_SYSTEM.md` for detailed design tokens, component architecture, and implementation notes.

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.
