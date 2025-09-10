# Smart Factory - AI Consulting Website with WandaVision Editor

**Live Site**: [https://smartfactory.io](https://smartfactory.io)

A modern, high-performance React website showcasing Smart Factory's AI consulting services and enterprise AI transformation capabilities. Built with cutting-edge technologies and a professional tech-forward design aesthetic.

## 🎨 WandaVision Editor - Live Content Management System

**Status**: Phase 1 Complete ✅ | Phase 2 In Progress 🔧

### Live Inline Editing System
Revolutionary content editing experience that allows non-technical users to edit website content in real-time with immediate visual feedback.

#### ✅ Working Features (Phase 1)
- **`Ctrl+Shift+E`** - Keyboard shortcut to toggle editor mode
- **Split-Screen Interface** - Editor panel slides in from right, main site updates live on left
- **Real-Time Updates** - Changes appear instantly on main website as you type
- **Multi-Section Support** - Hero, About, Services, Contact, Global settings
- **User-Friendly Labels** - "Current..." labels instead of technical jargon
- **Pre-Populated Fields** - Form fields show actual content from JSON files
- **Character Counters** - Built-in limits and editing guidance

#### 🔧 In Development (Phase 2 - Tomorrow)
- **Reset Functionality** - Context connected, debugging reset logic
- **Save Changes** - File persistence implementation needed
- **Additional Sections** - About, Services, Contact editor integration

#### Technical Architecture
```
├── src/contexts/
│   ├── EditModeContext.tsx    # Editor toggle and keyboard shortcuts
│   └── ContentContext.tsx     # Shared content state management
├── components/editors/
│   ├── HeroEditor.tsx         # Hero section form editor
│   ├── AboutEditor.tsx        # About section editor
│   ├── ServicesEditor.tsx     # Services content editor
│   ├── ContactEditor.tsx      # Contact information editor
│   └── GlobalEditor.tsx       # Site-wide settings
└── content/
    ├── hero.json             # Hero section content
    ├── about.json            # About section content
    └── *.json               # Additional content files
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/dougrichards13/smartfactoryIO.git
cd smartfactoryIO

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the site locally.

## 🏗️ Tech Stack

- **React 18** with TypeScript
- **Vite 5.x** for lightning-fast development
- **Tailwind CSS** with custom design system
- **Framer Motion** for smooth animations
- **Lucide React** for consistent iconography
- **Recharts** for data visualizations
- **Radix UI** primitives for accessibility

## 🎨 Design Philosophy

The website embodies a **tech-forward professional aesthetic** targeting C-suite executives and enterprise decision-makers:

- **Color Palette**: Charcoal Blue backgrounds (#181C25), Electric Blue primary (#3EB7FF), Neon Green accents (#36F997)
- **Typography**: Inter font family with aggressive scaling and premium feel
- **Animations**: Performance-optimized scroll-triggered interactions
- **Responsiveness**: Mobile-first approach with seamless scaling

## 📁 Project Structure

```
├── App.tsx                     # Main application with SEO setup
├── src/main.tsx               # Application entry point
├── components/                # React components
│   ├── Header.tsx            # Glassmorphic navigation
│   ├── HeroSection.tsx       # Video background hero
│   ├── AboutSection.tsx      # Company overview
│   ├── ServicesSection.tsx   # Service offerings
│   ├── AIAcceleratorSection.tsx # AI platform showcase
│   ├── MethodSection.tsx     # Methodology presentation
│   ├── ResultsSection.tsx    # Results visualization
│   ├── MetricsDashboard.tsx  # Interactive metrics
│   ├── TeamSection.tsx       # Leadership profiles
│   └── ContactSection.tsx    # Contact form
├── data/metrics.json         # Configurable business metrics
├── lib/utils.ts             # Utility functions
├── styles/globals.css       # Design system & CSS variables
└── WARP.md                  # Development documentation
```

## 🛠️ Development Commands

```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## ✨ Key Features

### Professional Design System
- Comprehensive CSS variables system for consistent theming
- Custom Tailwind utilities for gradients and animations
- Glassmorphic UI elements with premium visual effects
- Dark mode support with refined color schemes

### Performance Optimized
- Vite for fast development and optimized builds
- Transform/opacity-based animations for 60fps performance
- Lazy loading patterns and code splitting
- Minimized bundle sizes with tree-shaking

### Content Management
- **Dynamic Metrics**: Update business metrics via `data/metrics.json`
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Professional Compliance**: Disclaimer systems for enterprise credibility

### Enterprise-Grade Features
- Accessible design meeting WCAG standards
- Professional disclaimer and verification systems
- Responsive design for all device sizes
- Schema.org structured data for search engines

## 📊 Metrics Dashboard

The interactive metrics dashboard showcases key business achievements:
- **847% Portfolio Growth** - Current Fortune 500 client success
- **4.1x Valuation Excellence** - $410M → $1.7B acquisition story
- **15+ Years Experience** - Consistent enterprise delivery since 2010
- **$5B+ Value Creation** - Total documented project impact

Metrics can be updated by editing `data/metrics.json`. See `METRICS_GUIDE.md` for detailed instructions.

## 🚀 Current Status

**Version 2.5** - Production Ready (~90% Complete)

### ✅ Completed Features
- Modern React + Vite architecture with TypeScript
- Complete design system with tech-forward professional palette
- All major sections implemented with premium animations
- Interactive metrics dashboard with professional content
- SEO optimization with comprehensive meta tags
- Mobile-responsive design across all breakpoints
- Professional disclaimer systems for enterprise compliance

### 🔄 In Development
- Final content review and optimization
- Performance auditing and minor refinements
- Deployment preparation and hosting setup

## 📝 Documentation

- **[WARP.md](./WARP.md)** - Comprehensive development guide for WARP terminal
- **[METRICS_GUIDE.md](./METRICS_GUIDE.md)** - How to update business metrics
- **[PROGRESS.md](./PROGRESS.md)** - Detailed development history and milestones

## 🎯 Target Audience

This website targets **C-level executives** and **enterprise decision-makers** with:
- Minimum $500k annual AI/innovation budgets
- Upper mid-market to early enterprise companies
- Strategic focus on AI transformation and digital innovation

## 📈 Business Goals

Primary conversion objectives:
1. **Generate qualified C-level leads** for consulting engagements
2. **Showcase AI Accelerator platform** capabilities
3. **Demonstrate proven track record** with Fortune 500 clients
4. **Position Smart Factory** as the premier AI consulting partner

## 🔒 Professional Standards

- **Confidentiality Compliant**: Protected client information with reference systems
- **Legally Reviewed**: Professional disclaimers and verification frameworks
- **Enterprise Ready**: Suitable for Fortune 500 client presentations
- **Performance Optimized**: Fast loading times for executive audiences

## 🛡️ Quality Assurance

- TypeScript strict mode for type safety
- ESLint configuration with React best practices
- Performance monitoring and optimization
- Accessibility compliance (WCAG 2.1 AA standards)
- Cross-browser testing and validation

## 📞 Support

For technical questions or deployment assistance:
- **Technical Lead**: Development team
- **Content Updates**: See METRICS_GUIDE.md for self-service options
- **Business Inquiries**: leadership@smartfactory.io

---

© 2025 Smart Factory. All rights reserved. | **Transforming human potential into business reality through AI-driven consulting since 2011.**
