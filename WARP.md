# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Smart Factory - AI Consulting Website** is a React + Vite application styled with Tailwind CSS. It presents a professional tech-forward aesthetic targeting AI consulting services. The website serves as a marketing platform showcasing Smart Factory's enterprise AI implementation and digital transformation services.

## Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5.x with React plugin
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for interactive elements
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **UI Components**: Custom components using Radix UI primitives

### Project Structure
```
├── App.tsx              # Main application component with SEO setup
├── src/
│   └── main.tsx         # Application entry point
├── components/          # React components (section-based)
│   ├── Header.tsx       # Navigation with glassmorphic design
│   ├── HeroSection.tsx  # Video background with CTA
│   ├── AboutSection.tsx # Company overview with metrics
│   ├── ServicesSection.tsx     # Service offerings
│   ├── AIAcceleratorSection.tsx # AI platform showcase
│   ├── MethodSection.tsx       # Methodology presentation
│   ├── ResultsSection.tsx      # Results and visualizations
│   ├── MetricsDashboard.tsx    # Interactive metrics display
│   ├── TeamSection.tsx         # Leadership profiles
│   └── ContactSection.tsx      # Contact form and CTA
├── data/
│   └── metrics.json     # Configurable metrics data
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
├── styles/
│   └── globals.css      # Global styles and design system
└── public/              # Static assets
```

### Design System
- **Color Palette**: Tech-forward professional scheme
  - Background: Charcoal Blue (#181C25)
  - Primary: Electric Blue (#3EB7FF)
  - Secondary: Neon Green (#36F997)
  - Cards: Deep Slate (#232632)
  - Text: White with varying opacity
- **Typography**: Inter font family with aggressive scaling
- **Components**: Section-based architecture with consistent patterns
- **Animations**: Framer Motion with scroll-triggered animations

## Common Development Commands

### Development Server
```bash
npm run dev
```
Starts Vite development server on http://localhost:5173/

### Build Production
```bash
npm run build
```
TypeScript compilation + Vite production build

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Linting
```bash
npm run lint
```
Run ESLint with TypeScript support and React hooks rules

### Install Dependencies
```bash
npm install
```
Install all dependencies from package-lock.json

## Key Development Patterns

### Component Architecture
- Each section is a standalone React component
- Components follow the pattern: `{Section}Section.tsx`
- Use Framer Motion `useInView` for scroll animations
- Consistent container and spacing patterns via Tailwind utilities

### Path Aliases
The project uses path aliases configured in both `vite.config.ts` and `tsconfig.json`:
- `@/` → `./src/`
- `@/components` → `./components/`
- `@/lib` → `./lib/`

### Styling Approach
- Tailwind-first with custom CSS variables in `globals.css`
- Design tokens for colors, spacing, and typography
- Custom utility classes for gradients and effects
- Responsive design with mobile-first approach

### Animation Strategy
- Framer Motion for page transitions and interactions
- Scroll-triggered animations using `useInView`
- Performance-optimized with `once: true` for most animations
- Consistent timing and easing across components

## Content Management

### Metrics Dashboard
Metrics can be updated via `data/metrics.json`. The component gracefully falls back to hardcoded data if the JSON file is unavailable. See `METRICS_GUIDE.md` for detailed instructions on updating metrics.

### SEO and Meta Tags
The `App.tsx` component handles dynamic SEO metadata including:
- Title and meta descriptions
- Open Graph tags for social sharing
- Twitter Card metadata
- Schema.org structured data
- Canonical URLs

## Development Workflow

### Making Changes
1. Start dev server: `npm run dev`
2. Make changes to components or styles
3. Test across different screen sizes
4. Ensure animations work correctly
5. Run lint before committing: `npm run lint`

### Adding New Sections
1. Create new component in `components/` directory
2. Follow existing patterns for props and animations
3. Import and add to `App.tsx`
4. Update navigation in `Header.tsx` if needed
5. Test responsive behavior

### Updating Styles
- Modify CSS variables in `globals.css` for global changes
- Use Tailwind classes for component-specific styling
- Maintain consistency with the design system
- Test in both light and dark contexts

## Performance Considerations

### Optimization Features
- Vite's fast HMR for development
- Tree-shaking for production builds
- Image optimization recommendations in place
- Lazy loading patterns for heavy components
- CSS-in-JS avoided for better performance

### Animation Performance
- Transform and opacity-based animations for smooth 60fps
- `will-change` hints where appropriate
- Reduced motion support via CSS media queries
- Optimized scroll listeners with throttling

## Testing and Quality

### Current State
- ESLint configuration with TypeScript and React rules
- TypeScript strict mode enabled
- Development error boundaries in place
- Console error monitoring during development

### Before Production
- Run `npm run build` to validate TypeScript compilation
- Test on multiple devices and browsers
- Validate accessibility with keyboard navigation
- Verify all animations work smoothly
- Check network performance in browser dev tools

## Deployment Notes

### Build Output
- Static files generated in `dist/` directory
- All assets are fingerprinted for caching
- Source maps excluded from production builds
- Optimized bundle splitting by Vite

### Environment Considerations
- No environment variables currently required
- All assets are served statically
- No backend dependencies
- Suitable for CDN deployment (Netlify, Vercel, etc.)

## Troubleshooting

### Common Issues
- **Import errors**: Check path aliases in `vite.config.ts`
- **Styling issues**: Verify Tailwind compilation in `globals.css`
- **Animation problems**: Check Framer Motion version compatibility
- **Build failures**: Ensure TypeScript types are correct

### Development Server Issues
- Clear node_modules and reinstall if dependencies seem corrupted
- Check port 5173 availability
- Verify all required dependencies are in package.json

---

*Last updated: 2025-09-09 - This project represents a professional AI consulting website with modern React architecture and sophisticated design system.*
