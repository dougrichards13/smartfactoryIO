<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
This project is a simple website that informs visitors about our company, Smart Factory. The URL is https://smartfactory.io . This website will be served from a GoDaddy server.

The project requirements:

# Smart Factory Website Rebuild: Explicit Requirements Document

## 1. Purpose & Audience

- The website must position Smart Factory as the premier AI and technology consulting partner for upper mid-size and early enterprise companies with a minimum $500k annual innovation/AI budget.
- All messaging and calls to action must target C-level decision-makers (CEO, CTO, CIO, COO, CFO, Board, etc.), not lower-level staff.
- The site’s primary conversion goal is to generate qualified C-level leads for consulting engagements and the AI Accelerator product.

---

## 2. Site Structure & Navigation

- The website must be a **single, modern, scroll-based page** (one-page design) with clearly defined, visually separated sections.
- Navigation must be persistent (sticky) and allow smooth scrolling to each section.
- Navigation items must include: About, Services, AI Accelerator, Method, Results, Team, Social, and Contact (chatbot).

---

## 3. Design Requirements

### 3.1 Visual Style

- The design must be **modern, bold, and minimal**, reflecting 2025 trends:
  - Use large blocks, vivid color contrasts, and bold expressive fonts.
  - Prioritize negative space, clean lines, and high visual clarity.
  - Use a soothing, rich, and sophisticated palette (e.g., digital blues, deep greens, warm neutrals, gold accents).
  - Typography must be a mix of high-contrast serif and sans-serif fonts, with oversized headlines for impact.
  - All imagery must be high-resolution, relevant, and reinforce AI, innovation, and enterprise scale.
  - Use custom iconography for each consultant type and the AI Accelerator product.
  - Incorporate subtle motion design: micro-animations on hover, scrolling effects, or animated transitions between sections.
  - Include dark mode toggle.

### 3.2 Responsiveness

- The site must be fully responsive:
  - All content, images, and interactive elements must scale and reflow seamlessly across desktop, tablet, and mobile devices.
  - Navigation must collapse into a mobile-friendly menu on small screens.
  - All touch targets must be appropriately sized for mobile use.
  - Animations and transitions must remain performant on all devices.

### 3.3 Accessibility

- The site must meet at least **WCAG 2.1 AA** accessibility standards.
- All images must have alt text.
- All interactive elements must be keyboard-accessible.
- Sufficient color contrast for all text and UI elements.

---

## 4. Content & Section Requirements

### 4.1 Hero Section

- Headline: “Transforming Human Potential into Business Reality”
- Subheadline: “AI-Driven Consulting for Visionary Leaders”
- Brief value prop for C-level audience.
- Prominent CTA button: “Talk to a Smart Architect™” (scrolls to chatbot/contact section).

### 4.2 About Smart Factory

- Brief company history and credentials (founded 2011, $5B+ in project impact, enterprise focus).
- Statement of vision and differentiation (Factory approach, C-level expertise, AI leadership).
- Logos or names of notable clients (if available and permitted).

### 4.3 Services / Consultant Types

- **Smart Architects™:** C-suite fractional leaders for technology, operations, digital transformation.
- **Smart Engineers™:** AI-empowered, multi-disciplinary technology experts (integration, implementation, data science, etc.).
- **Smart Assurance™:** Quality and testing professionals (AI-driven QA, ISO standards, automation).
- Each type must have a dedicated block with icon, headline, 1-2 sentence description, and relevant CTA.

### 4.4 AI Accelerator Product

- Headline: “Smart Factory AI Accelerator™”
- Description: Secure, private, enterprise-grade AI platform for rapid, risk-managed AI implementation.
- Key features: Data sovereignty, agentic AI, seamless integration, security, compliance.
- Visual: Custom illustration or animation of the AI Accelerator ecosystem.
- CTA: “Request a Demo” (scrolls to chatbot/contact).

### 4.5 Method / Approach

- “The Smart Factory Method™” section outlining:
  - Assembly line/plug-and-play metaphor.
  - Proprietary frameworks, “Act as If” principle, and immersion in client operations.
  - Bullet points for innovation, strategy, quality, and impact.

### 4.6 Results / Impact

- Metrics: $5B+ project impact, $2B+ M&A, 13+ years, global reach.
- 2-3 short client success stories or testimonials (real or placeholder).
- Visual: Data visualization or infographic of impact.

### 4.7 Team / Leadership

- Photos and bios of key leaders (with contact links).
- Emphasize C-level backgrounds and enterprise experience.

### 4.8 Social & Community

- Placeholder icons/links for LinkedIn, X (Twitter), YouTube, and future channels.
- Brief statement on Smart Factory’s commitment to diversity, inclusion, and social impact.

### 4.9 Contact / Lead Capture

- Prominent, persistent “Let’s Talk” button opens chatbot.
- No email forms; all inbound leads routed through AI-powered chatbot.
- Chatbot must:
  - Qualify leads (company size, C-level role, project budget).
  - Collect contact info (name, email, company, role).
  - Offer to schedule a call or demo.
  - Route urgent or high-value leads to designated internal contacts.

---

## 5. Technical & Functional Requirements

- Site must load in under 2 seconds on all major devices and browsers.
- Use secure HTTPS for all traffic.
- Integrate with analytics (Google Analytics or equivalent).
- All content must be manageable via a CMS (no hard-coded copy).
- SEO:
  - Unique title and meta description for each section.
  - Structured data for organization, product, and leadership.
  - Keyword focus: “AI consulting,” “enterprise AI implementation,” “fractional technology leadership,” “AI Accelerator,” “C-level digital transformation,” “AI for enterprise.”
- Include Open Graph and Twitter Card metadata for social sharing.
- All images and assets must be optimized for web performance.

---

## 6. Chatbot Requirements

- Must be a free or open-source, no-code or low-code AI chatbot (e.g., Elfsight AI Chatbot or comparable).
- Must be embeddable via script and visually match site branding.
- Must support:
  - Custom knowledge base (FAQs, services, team, product).
  - Lead qualification logic (role, company, budget).
  - Integration with calendar or email for scheduling.
  - Export of leads to CRM or email.
- Must be fully responsive and accessible.

---

## 7. Metadata & SEO Requirements

- Each section must have:
  - Title tag (≤ 60 chars, keyword-rich)
  - Meta description (≤ 155 chars, compelling)
  - Schema.org markup (Organization, Product, Person)
  - Canonical URL (single-page site)
  - Social sharing image and summary

---

## 8. Deliverables

- Figma or Sketch design files for all breakpoints (desktop, tablet, mobile)
- Fully functional, production-ready website
- Documentation for CMS and chatbot management
- SEO and analytics configuration
- Placeholder assets for social channels

---

## 9. Success Criteria

- Site is visually modern, bold, and differentiated from competitors.
- All content is accessible, clear, and targeted to C-level decision-makers.
- Site is fully responsive, fast, and accessible.
- At least 5% of unique visitors engage with the chatbot.
- At least 2% of visitors complete lead qualification via chatbot.

---

---

description: "The definitive brand guidelines for Smart Factory, the leader in AI-driven consulting and enterprise transformation."
keywords: 
  - Smart Factory
  - AI consulting
  - enterprise AI
  - digital transformation
  - technology consulting
  - brand guidelines
  - brand book
  - AI Accelerator
  - C-level consulting
  - quality assurance
  - innovation
  - Smart Architects
  - Smart Engineers
  - Smart Assurance
---

# Smart Factory Brand Guidebook

## 1. Brand Overview

**Brand Statement:**  
Smart Factory transforms human potential into business reality. Since 2011, we have pioneered the fusion of human expertise with advanced methodologies, delivering transformative solutions for upper mid-size and enterprise clients. With over $5 billion in successful projects, we are the partner of choice for C-level leaders seeking secure, scalable AI and digital transformation.

**Mission:**  
To empower visionary leaders by manufacturing intelligent solutions that fuse human expertise with advanced technology, driving measurable business outcomes.

**Vision:**  
Redefine technology consulting by making AI safe, accessible, and transformative for enterprises, ensuring our clients not only adapt to the future but help shape it.

**Core Values:**  
- Excellence in execution  
- Security and sovereignty  
- Innovation and adaptability  
- Partnership and accountability  
- Measurable impact

**Unique Value Proposition:**  
We deliver elite C-level expertise, proprietary AI tools, and a proven “Factory” method to accelerate growth, optimize operations, and secure your data.

---

## 2. Brand Architecture

### Brand Structure

- **Smart Factory** (parent brand)
  - **Smart Architects™**: Elite fractional leadership for C-suite technology, operations, and digital transformation.
  - **Smart Engineers™**: Multi-disciplinary, AI-empowered technology experts.
  - **Smart Assurance™**: Specialized quality and testing professionals.
  - **Smart Factory AI Accelerator™**: Secure, enterprise-grade AI platform for rapid, risk-managed implementation.

---

## 3. Visual Identity

### Logo

- The Smart Factory logo must always be used as provided, with clear space equal to the height of the “S” in the logo on all sides.
- Do not alter, stretch, recolor, or add effects to the logo.
- Use the full-color version on light backgrounds and the white or monochrome version on dark backgrounds.

### Color Palette

| Color           | HEX      | Usage                           |
|-----------------|----------|---------------------------------|
| Deep Blue       | #1A2340  | Primary, backgrounds, headers   |
| Emerald Green   | #2AD18B  | Accents, CTAs, highlights       |
| Slate Gray      | #505A6B  | Secondary backgrounds, text     |
| Gold Accent     | #FFD166  | Highlights, icons, buttons      |
| White           | #FFFFFF  | Backgrounds, text, contrast     |

### Typography

- **Headlines:** Inter, Bold, All Caps, tracking +2%
- **Body Text:** Inter, Regular, sentence case
- **Emphasis:** Inter, SemiBold, Italic
- Minimum font size: 16px for body, 32px for main headlines

### Imagery

- Use high-resolution images that reflect innovation, enterprise scale, and human expertise.
- Favor authentic team and client interaction photos over stock imagery.
- Use custom iconography for each consultant type and the AI Accelerator.

### Iconography & Illustration

- All icons must be custom, flat, and line-based, using the primary color palette.
- Illustrations should be minimal, geometric, and reinforce the “Factory” and “AI” themes.

---

## 4. Messaging & Voice

### Tone of Voice

- Authoritative, direct, and confident
- Aspirational but grounded in measurable outcomes
- Speaks to C-level decision-makers and visionaries
- Avoid jargon and buzzwords; focus on clarity and impact

### Sample Messaging

- **Tagline:** Transforming Human Potential into Business Reality
- **Elevator Pitch:**  
  "Smart Factory partners with C-level leaders to deliver secure, scalable AI and digital transformation, driving measurable business outcomes across industries."

---

## 5. Application Guidelines

### Logo Usage

- Always maintain clear space.
- Never place the logo on visually cluttered backgrounds.
- Use only approved logo files.

### Color Usage

- Primary color (Deep Blue) must dominate backgrounds and headers.
- Emerald Green and Gold Accent are for highlights and calls to action only.
- Maintain high contrast for accessibility.

### Typography Usage

- Headlines should be bold and prominent.
- Body text must be legible and concise.
- Never use decorative or script fonts.

### Layout

- Use a single-page, scroll-based layout with clear section breaks.
- Navigation should be sticky and allow smooth scrolling.
- All CTAs must be prominent and use the accent colors.

### Responsiveness

- All brand assets must scale and reflow seamlessly across desktop, tablet, and mobile.
- Minimum touch target size: 48x48px.

### Accessibility

- All text and visual elements must meet WCAG 2.1 AA standards.
- Provide alt text for all images and icons.

---

## 6. Social Presence

- Social icons for LinkedIn, X (Twitter), and YouTube must appear in the footer.
- Use only approved icon files and brand colors.
- Messaging on social channels must align with the brand voice.

---

## 7. Contact & Lead Capture

- All inbound contact must be routed through the AI-powered chatbot.
- Chatbot must qualify leads by role, company size, and budget.
- No email forms; all CTAs direct to chatbot.

---

## 8. Brand Governance

- For questions about brand usage, contact: brand@smartfactory.io
- Only use assets from the official brand asset library.
- All external vendors and partners must adhere to these guidelines.

---

## 9. Metadata & SEO

- Each section and asset must include:
  - Title tag (≤ 60 characters, using primary keywords)
  - Meta description (≤ 155 characters)
  - Schema.org markup for Organization, Product, and Person
  - Open Graph and Twitter Card metadata for social sharing

**Primary Keywords:**  
Smart Factory, AI consulting, enterprise AI, digital transformation, C-level consulting, AI Accelerator, quality assurance, innovation, technology consulting

---

## 10. Brand Book Maintenance

- This brand book is a living document.  
- Updates will be issued quarterly or as needed.  
- The latest version is always available at smartfactory.io/brandbook

---

**End of Smart Factory Brand Guidebook**
>>>>>>> e4d1c5b8242363e5100ca57a51cbcc5916a19ede
