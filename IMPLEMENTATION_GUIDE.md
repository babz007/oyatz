# OYATZ Redesign - Implementation Guide
## Apple-Level Craft: Complete Section Redesign

---

## ✅ Completed Redesigns

### 1. **Information Architecture**

```
Home (Single Page)
├── Hero (Liquid glass card overlay) ✅
├── Story/About (Values + narrative) ✅ REDESIGNED
├── Gallery (Masonry grid with lightbox) ✅ REDESIGNED
├── Booking CTA (Liquid glass card) ✅ REDESIGNED
└── FAQ (Accordion) ✅ REDESIGNED
```

**Rationale:** Clean, linear flow with consistent component architecture. All sections use modular, reusable components with centralized copy management.

---

## 🎨 Design Tokens (Enhanced)

### CSS Variables (`app/globals.css`)
```css
:root {
  /* Brand Palette */
  --brand-50 through --brand-900
  
  /* Typography Scale */
  /* Responsive: 4xl → 5xl → 6xl → 7xl → 8xl → 9xl */
  
  /* Spacing System */
  /* Section padding: 64px → 96px → 128px (mobile → tablet → desktop) */
  
  /* Border Radius */
  /* Small: 8px, Medium: 12px, Large: 24px, Full: 9999px */
}
```

### Shadow System
- `.shadow-apple-sm` - Subtle layered shadows
- `.shadow-apple-md` - Medium depth
- `.shadow-apple-lg` - Strong depth
- `.shadow-apple-xl` - Maximum depth

### Glass Surfaces
- `.glass-premium` - Light glass (white/70, blur 40px)
- `.glass-premium-dark` - Dark glass (black/30, blur 40px)

---

## 🧩 Component Architecture

### Core Components Created

1. **SectionWrapper** (`components/SectionWrapper.tsx`)
   - Consistent section container
   - Background variants (white, brand-50, gradient)
   - Max-width options (default, narrow, wide)
   - Automatic spacing and fade-in

2. **SectionHeader** (`components/SectionHeader.tsx`)
   - Eyebrow text (optional)
   - Title with responsive scale
   - Subtitle (optional)
   - Staggered animations

3. **FeatureCard** (`components/FeatureCard.tsx`)
   - 3D tilt on mouse movement
   - Liquid glass highlight effect
   - Image support with zoom
   - Icon support (alternative to image)
   - Respects `prefers-reduced-motion`

4. **LiquidGlassCard** (`components/LiquidGlassCard.tsx`)
   - Generic liquid glass container
   - Mouse-tracking highlight
   - Configurable blur/intensity
   - Accessible focus states

5. **CTABand** (`components/CTABand.tsx`)
   - Dedicated booking/CTA section
   - Liquid glass card with mouse tracking
   - Magnetic buttons integrated
   - Staggered content reveals

6. **Motion Presets** (`lib/motion.ts`)
   - Centralized animation presets
   - Respects `prefers-reduced-motion`
   - Consistent easing curves
   - Spring physics configurations

7. **Copy Management** (`lib/copy.ts`)
   - Centralized content
   - Easy to edit and maintain
   - Type-safe structure

---

## 📝 Section-by-Section Breakdown

### Story Section (About)
**Component:** `SectionWrapper` + `SectionHeader` + `FeatureCard`

**Features:**
- ✅ Values grid (6 cards) with liquid glass effects
- ✅ 3D tilt animations on hover
- ✅ Image zoom effects
- ✅ "Our Story" subsection with parallax image
- ✅ Glass overlay on image hover
- ✅ Staggered reveals

**Copy Source:** `lib/copy.ts` → `story`

---

### Gallery Section
**Component:** `SectionWrapper` + `SectionHeader` + `MasonryGallery`

**Features:**
- ✅ Consistent section wrapper
- ✅ Header with eyebrow/subtitle
- ✅ Existing masonry gallery maintained
- ✅ Keyboard-accessible lightbox

**Copy Source:** `lib/copy.ts` → `gallery`

---

### Booking Section (CTA)
**Component:** `CTABand`

**Features:**
- ✅ Liquid glass card with mouse tracking
- ✅ Animated highlight follows cursor
- ✅ Magnetic buttons
- ✅ Staggered content reveals
- ✅ Full glassmorphism treatment

**Copy Source:** `lib/copy.ts` → `booking`

---

### FAQ Section
**Component:** `SectionWrapper` + `SectionHeader` + `Accordion`

**Features:**
- ✅ Narrow max-width for readability
- ✅ Consistent header styling
- ✅ Accessible accordion (keyboard navigable)
- ✅ Smooth expand/collapse

**Copy Source:** `lib/copy.ts` → `faq`

---

## ⚡ Animation System

### Presets (`lib/motion.ts`)
- **fadeInUp:** Opacity + Y translate (30px max)
- **fadeIn:** Opacity only
- **scaleIn:** Scale + opacity
- **staggerContainer/Item:** Staggered children reveals

### Principles
- ✅ Duration: 0.4-0.8s
- ✅ Distance: Max 60px (reduced to 0 for reduced motion)
- ✅ Easing: `[0.25, 0.46, 0.45, 0.94]` (Apple standard)
- ✅ Spring: Stiffness 300-400, Damping 25-30
- ✅ **Respects `prefers-reduced-motion`**

---

## ♿ Accessibility

### Implemented
- ✅ Semantic HTML5 landmarks
- ✅ ARIA labels where needed
- ✅ Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ✅ Visible focus states (2px solid, 4px offset)
- ✅ Contrast ratios ≥ 4.5:1 (WCAG AA)
- ✅ Screen reader announcements
- ✅ Reduced motion support

---

## 🚀 Performance

### Optimizations
- ✅ `next/image` with blur placeholders
- ✅ Static export ready
- ✅ Optimized fonts (`display: swap`)
- ✅ Lazy-loaded animations (viewport triggers)
- ✅ Passive scroll listeners
- ✅ Code splitting by component

---

## 📝 How to Edit

### Update Content
Edit `lib/copy.ts`:
```typescript
export const story = {
  eyebrow: 'Your Eyebrow',
  title: 'Your Title',
  // ...
};
```

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --brand-500: #your-color;
}
```

### Tune Animations
Edit `lib/motion.ts`:
```typescript
export const transitions = {
  smooth: { duration: 0.6, ease: [...] },
  // ...
};
```

### Swap Images
Update `galleryImages` array in `app/page.tsx` or use the galleryImages mapping in FeatureCard.

---

## ✅ Acceptance Criteria Status

- ✅ **Zero TypeScript/ESLint errors**
- ✅ **Responsive:** 360px → 1440px+
- ✅ **Keyboard accessible:** Full navigation support
- ✅ **Liquid glass panels:** AA contrast maintained
- 🎯 **Lighthouse ≥ 95:** Ready for production (optimized)

---

## 📦 File Structure

```
/components
  ├── SectionWrapper.tsx      # Section container
  ├── SectionHeader.tsx       # Section titles
  ├── FeatureCard.tsx         # Value/feature cards
  ├── LiquidGlassCard.tsx     # Generic glass container
  ├── CTABand.tsx             # Booking/CTA section
  ├── MagneticButton.tsx      # Magnetic hover buttons
  └── [existing components]

/lib
  ├── motion.ts               # Animation presets
  └── copy.ts                 # Centralized content

/app
  ├── page.tsx                # Main page (refactored)
  └── globals.css              # Design tokens
```

---

**Status:** ✅ All sections redesigned with Apple-level craft
**Quality:** Production-ready, accessible, performant



