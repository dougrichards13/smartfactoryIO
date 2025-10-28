# ToDo.md - Smart Factory Website Completion

**Current Status**: ~90% Complete | **Target**: Production Deployment on GoDaddy  
**Repository**: [https://github.com/dougrichards13/smartfactoryIO](https://github.com/dougrichards13/smartfactoryIO)

---

## 🎬 Priority 1: Video Optimization (Critical)

The hero video is currently **72.48 MB** and needs optimization for web performance.

### Video Optimization Strategy
```bash
# Current file: public/assets/videos/hero-video.mov (72.48 MB)
# Target: Multiple optimized formats for web delivery
```

### Recommended Approach:
1. **Create Multiple Formats & Resolutions**
   ```bash
   # Use FFmpeg to create optimized versions
   ffmpeg -i hero-video.mov -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k hero-video-1080p.mp4
   ffmpeg -i hero-video.mov -c:v libx264 -crf 30 -preset medium -vf scale=1280:720 -c:a aac -b:a 96k hero-video-720p.mp4
   ffmpeg -i hero-video.mov -c:v libwebm -crf 30 -b:v 1M hero-video-1080p.webm
   ```

2. **Target Specifications**:
   - **1080p MP4**: ~3-5MB (primary)
   - **720p MP4**: ~2-3MB (fallback)
   - **WebM format**: ~2-4MB (modern browsers)
   - **Poster image**: 1920x1080 JPEG, ~200KB

3. **Implementation Updates**:
   - Update `HeroSection.tsx` to use `<video>` with multiple sources
   - Add poster image for faster initial load
   - Implement progressive loading strategy
   - Add preload="metadata" for performance

### File Structure:
```
public/assets/videos/
├── hero-video-1080p.mp4    # Primary format
├── hero-video-720p.mp4     # Mobile fallback  
├── hero-video-1080p.webm   # Modern browsers
└── hero-poster.jpg         # Poster image
```

---

## 🚀 Priority 2: Production Preparation

### Code Quality & Performance
- [ ] **Run performance audit**
  ```bash
  npm run build
  npm run preview
  # Test with Lighthouse for performance metrics
  ```

- [ ] **Optimize bundle size**
  ```bash
  # Analyze bundle composition
  npx vite-bundle-analyzer
  ```

- [ ] **Final content review**
  - [ ] Verify all business metrics are current
  - [ ] Review all copy for accuracy and professionalism
  - [ ] Test all interactive elements
  - [ ] Validate contact form functionality

- [ ] **Cross-browser testing**
  - [ ] Chrome/Edge (primary)
  - [ ] Firefox
  - [ ] Safari
  - [ ] Mobile browsers (iOS/Android)

### SEO & Analytics
- [ ] **Google Analytics setup**
  - [ ] Replace current GTM-WH9J4JJ if needed
  - [ ] Verify tracking implementation
  - [ ] Set up conversion goals

- [ ] **Search Console preparation**
  - [ ] Generate sitemap.xml
  - [ ] Create robots.txt
  - [ ] Verify structured data

---

## 🏢 Priority 3: GoDaddy Deployment

### Current Site Analysis
The existing https://smartfactory.io shows:
- Old branding and messaging
- Kansas City/Saint Louis focus (needs updating)
- Outdated phone number: 1-816-866-9955
- Old contact email: contact@smartfactory.io
- Traditional consulting approach (not AI-focused)

### Pre-Deployment Steps
- [ ] **Backup current site**
  ```bash
  # Download current site files from GoDaddy
  # Save to archive folder for reference
  ```

- [ ] **Update contact information**
  - [ ] Verify correct phone number for new site
  - [ ] Confirm email address (leadership@smartfactory.io vs contact@smartfactory.io)
  - [ ] Update business address/locations if needed

- [ ] **Content migration checklist**
  - [ ] Review what content from old site needs preservation
  - [ ] Check for any SEO-valuable pages to redirect
  - [ ] Identify any client testimonials worth incorporating

### GoDaddy Deployment Process
1. **Build production version**
   ```bash
   git clone https://github.com/dougrichards13/smartfactoryIO.git
   cd smartfactoryIO
   npm install
   npm run build
   ```

2. **GoDaddy cPanel Steps**
   - [ ] Log into GoDaddy cPanel
   - [ ] Navigate to File Manager
   - [ ] Backup current public_html folder
   - [ ] Clear public_html contents
   - [ ] Upload dist/ folder contents to public_html
   - [ ] Set correct file permissions (644 for files, 755 for directories)

3. **Domain & SSL Configuration**
   - [ ] Verify DNS settings point to correct hosting
   - [ ] Ensure SSL certificate is active
   - [ ] Test HTTPS redirect functionality
   - [ ] Verify www vs non-www redirect preference

4. **Post-deployment testing**
   - [ ] Test all pages load correctly
   - [ ] Verify all assets (images, videos, CSS, JS) load
   - [ ] Test contact form submission
   - [ ] Check mobile responsiveness
   - [ ] Validate SSL certificate

---

## 🔧 Priority 4: Technical Enhancements

### Performance Optimizations
- [ ] **Image optimization**
  ```bash
  # Compress all images without quality loss
  # Consider WebP format for modern browsers
  # Implement lazy loading for non-critical images
  ```

- [ ] **Code splitting optimization**
  - [ ] Review component lazy loading opportunities
  - [ ] Optimize chunk sizes for faster loading
  - [ ] Implement service worker for caching

### Monitoring & Analytics
- [ ] **Set up monitoring**
  - [ ] Configure uptime monitoring
  - [ ] Set up performance monitoring
  - [ ] Implement error tracking

- [ ] **Business analytics**
  - [ ] Track contact form submissions
  - [ ] Monitor metrics dashboard interactions
  - [ ] Set up conversion funnels

---

## 📧 Priority 5: Content & Business Updates

### Contact Information Updates
Current site shows outdated info - verify/update:
- [ ] **Phone**: Currently shows 1-816-866-9955
- [ ] **Email**: Currently shows contact@smartfactory.io  
- [ ] **Location**: Update from Kansas City/Saint Louis focus
- [ ] **Business focus**: Shift from general consulting to AI specialization

### Legal & Compliance
- [ ] **Privacy policy** (if collecting contact data)
- [ ] **Terms of service** (if applicable)
- [ ] **Cookie consent** (for EU visitors)
- [ ] **Professional disclaimers** (verify current content)

---

## 🎯 Priority 6: Post-Launch Activities

### SEO & Marketing
- [ ] **Submit to search engines**
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools
  - [ ] Submit updated sitemap

- [ ] **Social media updates**
  - [ ] LinkedIn company page
  - [ ] Update social media links if needed
  - [ ] Share launch announcement

### Ongoing Maintenance
- [ ] **Set up regular backups**
- [ ] **Monitor site performance**
- [ ] **Track conversion metrics**
- [ ] **Plan content updates schedule**

---

## 🛠️ Development Environment Setup (New Machine)

For working on a different machine:

```bash
# Clone the repository
git clone https://github.com/dougrichards13/smartfactoryIO.git
cd smartfactoryIO

# Install dependencies
npm install

# Start development server
npm run dev

# Available commands
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Code linting
```

### Key Files to Review:
- `WARP.md` - Development documentation
- `README.md` - Project overview
- `PROGRESS.md` - Development history
- `METRICS_GUIDE.md` - How to update business metrics

---

## ⚠️ Critical Notes

1. **Video is essential** - The hero video significantly impacts the premium feel. Optimization is mandatory before deployment.

2. **Business continuity** - The current smartfactory.io site is live and serving customers. Coordinate deployment timing carefully.

3. **Contact information** - Verify all contact details are current before deployment to avoid missed business opportunities.

4. **Performance first** - The target audience (C-suite executives) expects fast, professional experiences. Performance is non-negotiable.

5. **Mobile optimization** - Ensure flawless mobile experience as executives often browse on mobile devices.

---

## 📅 Recommended Timeline

**Week 1**: Video optimization and performance tuning  
**Week 2**: Content review and final testing  
**Week 3**: GoDaddy deployment and post-launch monitoring

**Success Metrics**: 
- Page load time < 3 seconds
- Mobile performance score > 90
- Zero broken links or missing assets
- Professional appearance matching design specifications

---

*Last updated: 2025-01-09*  
*Next review: After video optimization completion*
