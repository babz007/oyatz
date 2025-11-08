# Assets Integration Guide

## File Structure

Place all downloaded assets in `/public/assets/` directory:

```
public/assets/
├── hero/
│   └── hero-video.mp4          # Hero video background (3-8s loop)
├── gallery/
│   ├── gallery-1.jpg           # Knotless braids portrait
│   ├── gallery-2.jpg           # Cornrows portrait
│   ├── gallery-3.jpg           # Locs/dreadlocks portrait
│   ├── gallery-4.jpg           # Twists (Senegalese/Marley) portrait
│   ├── gallery-5.jpg           # Natural afro hair portrait
│   ├── gallery-6.jpg           # Braids studio/portrait
│   ├── gallery-7.jpg           # Hair salon interior/stylist
│   └── gallery-8.jpg           # Natural hair model
└── story/
    └── story-image.jpg          # Salon interior or stylist at work
```

## Video Requirements

- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080p or 4K
- **Duration**: 3-8 seconds (looping)
- **Audio**: Muted (no sound)
- **Size**: Optimize for web (keep under 5MB if possible)

## Image Requirements

- **Format**: JPG or WebP
- **Resolution**: HD/4K (1920x1080 minimum, higher preferred)
- **Aspect Ratios**: Varies (portrait, square, landscape all work)
- **Optimization**: Compress before adding to reduce load times

## Recommended Downloads

### Hero Video (Priority)
Download from Pexels/Coverr:
- "Braiding action – outdoors" (great hero loop)
- Portrait loop with braids, smiling (tight crop)

Save as: `/public/assets/hero/hero-video.mp4`

### Gallery Images

1. **Knotless braids portrait** (close-up)
   - Save as: `gallery-1.jpg`
   - Alt: "Knotless braids styling - professional close-up portrait"

2. **Cornrows portrait**
   - Save as: `gallery-2.jpg`
   - Alt: "Elegant cornrows hairstyle portrait"

3. **Locs/dreadlocks portrait**
   - Save as: `gallery-3.jpg`
   - Alt: "Beautiful locs hairstyle portrait"

4. **Twists portrait** (Senegalese/Marley)
   - Save as: `gallery-4.jpg`
   - Alt: "Stylish twists hairstyle portrait"

5. **Natural afro hair portrait**
   - Save as: `gallery-5.jpg`
   - Alt: "Natural afro hair portrait showcasing texture and volume"

6. **Braids studio/portrait**
   - Save as: `gallery-6.jpg`
   - Alt: "Professional braids portrait in studio lighting"

7. **Hair salon interior/stylist**
   - Save as: `gallery-7.jpg`
   - Alt: "Professional stylist working in modern salon"

8. **Natural hair model** (varied looks)
   - Save as: `gallery-8.jpg`
   - Alt: "Natural hair model showcasing versatile styling"

### Story Image
- **Salon interior/stylist at work**
  - Save as: `story-image.jpg`
  - Alt: "Professional hairstylist working in modern salon setting"

## Quick Integration Steps

1. **Download assets** from:
   - Pexels: https://www.pexels.com
   - Unsplash: https://unsplash.com
   - Pixabay: https://pixabay.com
   - Coverr: https://coverr.co (for videos)
   - Mixkit: https://mixkit.co (for videos)

2. **Rename files** according to the guide above

3. **Place files** in the correct `/public/assets/` subdirectories

4. **Update `app/page.tsx`** if you add/remove gallery images (currently supports 6-8 images)

5. **Test locally**: Run `npm run dev` to see your assets

## License Notes

✅ **Commercial use allowed** (all recommended sources):
- Pexels: Free for commercial use, no attribution required
- Pixabay: Free for commercial use, no attribution required
- Unsplash: Unsplash License (commercial use allowed)
- Coverr: Free stock video (check individual clip terms)
- Mixkit: Free for commercial use with listed restrictions

⚠️ **Important**: For assets featuring recognizable people, ensure model releases are in place. Avoid using logos/brands in ways that imply endorsement.

## Video Integration in Hero

To use a video hero background:

1. Save your hero video as `/public/assets/hero/hero-video.mp4`
2. In `app/page.tsx`, find the hero section and replace:
   ```tsx
   <HeroBlock />
   ```
   with:
   ```tsx
   <HeroVideo videoSrc="/assets/hero/hero-video.mp4" />
   ```

## Adding Videos to Gallery

To add video loops to the gallery, add items like this:

```tsx
{
  id: 'video-1',
  src: '/assets/gallery/video-thumbnail.jpg',  // Optional thumbnail
  alt: 'Hair braiding in action',
  width: 800,
  height: 600,
  type: 'video' as const,
  videoSrc: '/assets/gallery/gallery-video-1.mp4',
},
```

Videos will auto-play, loop, and show a play button overlay in the gallery grid.

## Image Optimization Tips

Before uploading:
- Use tools like Squoosh (https://squoosh.app) to optimize
- Target file sizes: < 500KB for images, < 2MB for videos
- Maintain quality while reducing file size

