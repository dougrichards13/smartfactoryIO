# SmartFactory.IO Website

Official website for Smart Factory - AI Consulting for Enterprise Leaders

**Live Site:** https://smartfactory.io

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173` to view the site locally.

---

## Building for Production

```bash
npm run build:force
```

This creates optimized files in the `dist` folder ready for deployment.

---

## Deployment to Production

### Via cPanel File Manager (Current Method)

1. Build the site:
   ```bash
   npm run build:force
   ```

2. Log into GoDaddy cPanel

3. Navigate to **File Manager** → **public_html**

4. Upload these files from the `dist` folder:
   - `index.html` (to root of public_html)
   - All image files (.png, .jpg) to root
   - Navigate to `public_html/assets` folder
   - Upload `index-*.js` and `index-*.css` files

5. Clear browser cache and verify changes at https://smartfactory.io

**Important:** The asset filenames change with each build (e.g., `index-b5RTnCew.js`). Make sure to upload the NEW files and that `index.html` references match.

---

## Project Structure

```
SmartFactory.IO/
├── components/          # React components
│   ├── TeamSection.tsx  # Leadership team
│   ├── HeroSection.tsx  # Homepage hero
│   └── ...
├── content/            # Content JSON files
├── public/             # Static assets
├── dist/               # Production build (generated)
└── package.json        # Dependencies
```

---

## Key Features

- **React 18** + TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive design** optimized for mobile and desktop

---

## Content Management

### Editing Team Members
Edit `components/TeamSection.tsx` to add/modify leadership team members.

### Editing Other Content
Most content can be edited in JSON files in the `content/` directory.

---

## Troubleshooting

### Build Fails with TypeScript Errors
Use `npm run build:force` which skips TypeScript checks but produces working builds.

### Changes Not Showing on Live Site
1. Verify files uploaded to correct location in cPanel
2. Check that asset filenames in `index.html` match uploaded files
3. Clear browser cache (Ctrl+Shift+R)
4. Check if CDN/Cloudflare caching is enabled

### Dev Server Won't Start
- Check if port 5173 is already in use
- Vite will automatically use 5174 if 5173 is taken

---

## Contact

**Technical Issues:** doug@smartfactory.io  
**Repository:** GitHub (private)

---

## Notes

- Original project names: "Wanda-Complete", "WandaVision" (legacy references)
- Current Git branch: `WandaVision` (to be renamed to `main`)
- Archived project files: See `_archive/` folder
