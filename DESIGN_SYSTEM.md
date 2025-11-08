# OYATZ Design System
## Apple-Level Craft: Premium Hair Salon Website

### Information Architecture

```
Home (Single Page)
├── Hero (Full-screen video with liquid glass overlay)
├── Story/About (Values + narrative)
├── Gallery (Masonry grid with lightbox)
├── Booking CTA (Liquid glass card)
└── FAQ (Accordion)
```

**Rationale:** Clean, linear flow that guides users from awareness → interest → action. Minimal cognitive load with clear hierarchy.

---

## Design Tokens

### Colors
```css
Brand (Mocha Mousse - Pantone 17-1230):
- 50: #f5f0ed (lightest tint)
- 500: #a47864 (primary)
- 900: #482420 (darkest shade)

Neutrals:
- Background: #F6F7F9 (soft white)
- Text Primary: #0B0B0C (near black)
- Text Secondary: #5a5a5a (medium gray)
```

### Typography Scale
- **Display (Playfair Display):** Headlines H1-H2
- **Body (Inter):** All body text, UI elements
- **Scale:** 4xl → 5xl → 6xl → 7xl → 8xl → 9xl (responsive)

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Section padding: 64px → 96px → 128px (mobile → tablet → desktop)

### Border Radius
- Small: 8px (buttons, chips)
- Medium: 12px (cards)
- Large: 24px (containers)
- Full: 9999px (pills)

### Shadows (Apple-style layered)
```css
.shadow-sm: 0 1px 2px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.03)
.shadow-md: ...up to 8px
.shadow-lg: ...up to 16px
.shadow-xl: ...up to 32px
```

### Liquid Glass Surfaces
```css
Glass Light: rgba(255,255,255,0.7) + blur(20px) saturate(180%)
Glass Dark: rgba(0,0,0,0.3) + blur(20px) saturate(180%)
Border: 1px solid rgba(255,255,255,0.2-0.3)
```

---

## Component Architecture

### Core Components
1. **Header** - Sticky, translucent on scroll, smooth transitions
2. **Hero** - Full-screen video + liquid glass card overlay
3. **Section** - Container with shaped borders, scroll reveals
4. **Feature Cards** - Liquid glass hover effects
5. **Gallery** - Masonry grid + keyboard-accessible lightbox
6. **CTA Button** - Magnetic hover, spring physics
7. **FAQ Accordion** - Smooth expand/collapse, accessible
8. **Footer** - Minimal, clear navigation

### Animation Principles
- **Duration:** 0.4-0.8s (subtle, not distracting)
- **Distance:** Max 60px (low movement)
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (Apple standard)
- **Spring Physics:** Stiffness 300-400, damping 25-30
- **Respect `prefers-reduced-motion`:** Disable heavy effects

---

## Accessibility Checklist
- ✅ Semantic HTML5 landmarks
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ✅ Focus states visible (2px solid, 4px offset)
- ✅ Alt text on all images
- ✅ Contrast ratios ≥ 4.5:1 (WCAG AA)
- ✅ Screen reader announcements

---

## Performance Targets
- Lighthouse Score: ≥ 95 (all categories)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

