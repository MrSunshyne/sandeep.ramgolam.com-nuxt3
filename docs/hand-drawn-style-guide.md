# Hand-Drawn Style Guide

This guide documents how to implement the organic, hand-drawn aesthetic used throughout the site.

## Core Concepts

### 1. SVG Paths with Quadratic Curves

The hand-drawn look comes from using **quadratic bezier curves** (Q and T commands) instead of straight lines. These create subtle wobbles that mimic hand-drawn strokes.

**Key SVG path commands:**
- `Q x1 y1, x y` - Quadratic curve with control point (x1,y1) to endpoint (x,y)
- `T x y` - Smooth quadratic curve (continues from previous curve)
- `L x y` - Line to (use sparingly, mainly for longer segments)

### 2. Path Structure for Rectangles

For a hand-drawn rectangle, create variations along each edge:

```svg
<path d="
  M12 6                          <!-- Start point with slight offset -->
  Q8 5 5 8 Q3 11 4 16            <!-- Top-left corner (wobbly) -->
  L4 18 Q2 50 5 80 T3 140...     <!-- Left edge with variations -->
  Q6 294 10 295                  <!-- Bottom-left corner -->
  L20 294 Q70 296 120 294...     <!-- Bottom edge -->
  Q394 294 396 290               <!-- Bottom-right corner -->
  L397 270 Q395 230 397 190...   <!-- Right edge -->
  Q398 10 394 7 Q390 4 385 5     <!-- Top-right corner -->
  L370 6 Q310 4 250 6...         <!-- Top edge -->
  Z                              <!-- Close path -->
" />
```

### 3. Organic Variations

Add subtle offsets (1-5 units) to break the rigidity:
- Corners: Use multiple Q curves instead of sharp angles
- Edges: Alternate between slight inward/outward bulges
- Control points: Offset by 2-5 units from the "perfect" position

## Implementation Patterns

### Hand-Drawn Border

```vue
<svg
  class="hand-drawn-border"
  viewBox="0 0 400 300"
  fill="none"
  preserveAspectRatio="none"
>
  <path
    class="border-path"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 6 Q8 5 5 8..."
  />
</svg>
```

**CSS:**
```css
.hand-drawn-border {
  position: absolute;
  inset: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: 0;
  pointer-events: none;
}

.border-path {
  color: #9ca3af;
  transition: color 0.4s ease-out, d 0.4s ease-out;
}
```

### Shape Morphing on Hover

Use CSS `d` property to animate between two path shapes:

```css
.element:hover .border-path {
  color: #3b82f6;
  d: path("M15 3 Q6 2 3 6...");  /* More exaggerated wobbles */
}
```

**Tips for morph targets:**
- Keep the same number of path commands
- Exaggerate the curves (larger offsets, more bulge)
- Make corners slightly rounder
- Push edges outward slightly

### Organic Image Masks

Use `clipPath` with `objectBoundingBox` units (0-1 range) for responsive masks:

```vue
<svg class="absolute w-0 h-0" aria-hidden="true">
  <defs>
    <clipPath :id="uniqueId" clipPathUnits="objectBoundingBox">
      <path d="M0.02 0.04 Q0.01 0.02 0.03 0.01..." />
    </clipPath>
  </defs>
</svg>

<div :style="`clip-path: url(#${uniqueId})`">
  <img ... />
</div>
```

**Important:** Use unique IDs when multiple instances exist on the same page.

### Stroke Animation (Draw Effect)

For animated "drawing" effect (used in site-menu-svg-menu-bg.vue):

```css
@keyframes draw-border {
  to {
    stroke-dashoffset: 0;
  }
}

.border-path {
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
}

.element:hover .border-path {
  animation: draw-border 0.8s ease-out forwards;
}
```

## Reference Components

- `components/site-menu-svg-menu-bg.vue` - Original hand-drawn implementation with draw animation
- `components/blog-card.vue` - Hand-drawn border with hover morph and organic image mask

## Creating New Shapes

1. **Start with a basic shape** in a tool like Figma or by hand
2. **Convert to path** and identify corners/edges
3. **Add wobble** by inserting Q/T curves along straight segments
4. **Test variations** - adjust control point offsets until it feels natural
5. **Create hover variant** - exaggerate the wobbles for the hover state

## Tips

- Keep wobbles subtle (2-5 units) for elegance
- Use `stroke-linecap: round` and `stroke-linejoin: round` for softer appearance
- `preserveAspectRatio="none"` allows borders to stretch with content
- Test at different sizes - some wobbles may need adjustment
- Dark mode: Use slightly muted colors (#6b7280 instead of #9ca3af)
