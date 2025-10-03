# AnimatedLogo Component Usage Guide

## Overview
The `AnimatedLogo` component brings your Smart Factory brand story to life with sequential word animations that communicate your value proposition: "Unblock → Ignite → Accelerate → Multiply → Transform → SMART FACTORY".

## Components Available

### 1. `AnimatedLogo` (Full Version)
Perfect for hero sections, about pages, or any area where you want maximum impact.

```tsx
// Auto-play version (great for hero sections)
<AnimatedLogo autoStart={true} />

// Hover-triggered version
<AnimatedLogo onHover={true} />

// Compact version
<AnimatedLogo compact={true} onHover={true} />
```

### 2. `CompactAnimatedLogo` (Navigation Version)
Optimized for headers/navigation - subtle but powerful.

```tsx
// Default hover animation (already integrated in Header.tsx)
<CompactAnimatedLogo onHover={true} />

// Always static version
<CompactAnimatedLogo onHover={false} />
```

## Implementation Strategy

### ✅ Currently Integrated
- **Header Navigation**: Hover-triggered compact animation
- **Responsive**: Adapts to mobile/desktop automatically

### 🎯 Recommended Additional Placements

#### About Section
```tsx
<AnimatedLogo autoStart={true} className="mb-8" />
```

#### Footer
```tsx
<CompactAnimatedLogo onHover={true} />
```

#### Loading States
```tsx
<AnimatedLogo autoStart={true} compact={true} />
```

## Props Reference

### AnimatedLogo Props
- `autoStart?: boolean` - Start animation immediately on mount
- `onHover?: boolean` - Trigger animation on mouse hover
- `compact?: boolean` - Use smaller text sizes
- `className?: string` - Additional CSS classes

### CompactAnimatedLogo Props
- `onHover?: boolean` - Enable/disable hover animation
- `className?: string` - Additional CSS classes

## Animation Sequence
1. **"Unblock"** (0ms) - Problem identification
2. **"Ignite"** (300ms) - Solution activation  
3. **"Accelerate"** (600ms) - Momentum building
4. **"Multiply"** (900ms) - Scale expansion
5. **"Transform"** (1200ms) - Final outcome
6. **"SMART FACTORY"** (1700ms) - Brand reveal with 360° rotation

## Performance Notes
- Pure CSS animations (no heavy libraries)
- Framer Motion integration for smooth transitions
- Respects `prefers-reduced-motion` settings
- Optimized for 60fps performance

## Customization
All animations use your existing theme colors:
- `text-primary` for "SMART"
- `text-white` for "FACTORY" 
- `text-white/90` for sequence words

## Best Practices
- Use `autoStart` sparingly (hero sections, about pages)
- Prefer `onHover` for navigation elements
- Test on mobile devices for touch interactions
- Consider reduced motion accessibility