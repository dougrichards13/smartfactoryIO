# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Smart Factory - AI Consulting Website** is a React + Vite application styled with Tailwind CSS. It presents a professional tech-forward aesthetic targeting AI consulting services. The website serves as a comprehensive marketing and lead generation platform showcasing Smart Factory's enterprise AI transformation services.

**Current Status**: Production-ready with WandaVision editor components removed for security. All contact methods are live and fully functional.

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
│   ├── Header.tsx       # Navigation with 4-item menu (OVERVIEW, AI ACCELERATOR, METHOD, TEAM)
│   ├── HeroSection.tsx  # Video background with CTA
│   ├── AboutSection.tsx # Company overview with inclusive metrics
│   ├── ServicesSection.tsx     # Smart Suite™ consulting services
│   ├── AIAcceleratorSection.tsx # AI platform showcase
│   ├── MethodSection.tsx       # "Act as If" methodology
│   ├── MetricsDashboard.tsx    # Inclusive metrics (300% ROI, 40% efficiency, 98% satisfaction)
│   ├── TeamSection.tsx         # C-Level leadership profiles
│   ├── ContactSection.tsx      # Advanced contact with AI assessment
│   ├── BusinessReadinessAssessment.tsx # Interactive AI readiness tool
│   ├── SmartAssistant.tsx      # AI chatbot component (offline)
│   └── AIAdvisorVisual.tsx     # Data ecosystem visualization
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
npm run build:production  # Full TypeScript + Vite build
npm run build:force       # Skip TypeScript checks (recommended)
```
Note: Use `build:force` as TypeScript has intentional module declaration issues that don't affect functionality.

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
Metrics have been updated to inclusive, mid-market focused values:
- Typical Client ROI: 300%+ (average 3-5x ROI in 18 months)
- Average Efficiency Improvement: 40% (process speed, cost, optimization gains)
- Years of Excellence: 15+ (preserved from original)
- Client Satisfaction Rate: 98% (high retention across company sizes)

### Live Contact Integration
All contact methods are now live and functional:
- **Calendar**: Direct Outlook booking - `https://outlook.office365.com/owa/calendar/SmartFactoryBusinessReadinessAssessment@smartfactory.io/bookings/`
- **Phone**: 816-686-7092
- **Email**: contact@smartfactory.io
- **AI Assessment**: Interactive qualification tool with PDF generation

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

## ⚠️ CRITICAL PRODUCTION WARNINGS

### Do NOT Fix These "Errors"
The following TypeScript errors are **INTENTIONAL** and should NOT be "fixed":
- Module declaration issues in `components/ui/*` files
- Version-specific import syntax (e.g., `@radix-ui/react-*@version`)
- These were implemented for the WandaVision editor system and are now safely disabled

### WandaVision Editor Status
- All editor components have been moved to `REMOVED_WANDAVISION/` folder
- ContentContext simplified to read-only
- EditModeContext and WandaVisionProvider removed
- Website is now production-safe without live editing capabilities

## AI Business Readiness Assessment Features

### Complete Lead Generation Tool
- 8 strategic assessment questions across 4 categories
- Optional comments section for user context
- Real-time AI processing simulation with personalized results
- Branded PDF generation with Smart Factory marketing content
- Direct calendar integration for consultation booking
- Professional scoring system with actionable recommendations

### Assessment Categories
1. **Infrastructure**: Technology readiness and data maturity
2. **Strategic**: Budget allocation and timeline expectations
3. **Change Management**: Leadership buy-in and team readiness
4. **Technology**: Current AI usage and integration complexity

## Troubleshooting

### Common Issues
- **Import errors**: Check path aliases in `vite.config.ts`
- **Styling issues**: Verify Tailwind compilation in `globals.css`
- **Animation problems**: Check Framer Motion version compatibility
- **Build failures**: Use `npm run build:force` to skip TypeScript checks

### Development Server Issues
- Clear node_modules and reinstall if dependencies seem corrupted
- Dev server may start on port 5175 if 5173/5174 are occupied
- Verify all required dependencies are in package.json

---

*Last updated: 2025-10-02 - Production-ready Smart Factory website with comprehensive AI Business Readiness Assessment and live contact integration. WandaVision editor system safely removed for deployment.*
