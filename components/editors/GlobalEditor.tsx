import React, { useState } from 'react';
import { Globe, MessageSquare, Upload, Palette } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

// We'll create a global settings structure for common site-wide settings
const defaultGlobalSettings = {
  site: {
    title: "SmartFactory.IO",
    tagline: "Intelligent Manufacturing Solutions",
    description: "We help manufacturing companies implement smart factory solutions to optimize operations and increase efficiency.",
    logo: "/logo.svg",
    favicon: "/favicon.ico"
  },
  branding: {
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    accentColor: "#10b981"
  },
  social: {
    linkedin: "https://linkedin.com/company/smartfactory-io",
    twitter: "https://twitter.com/smartfactoryio",
    github: "",
    email: "contact@smartfactory.io"
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "manufacturing, smart factory, IoT, automation, Industry 4.0",
    ogImage: "/og-image.jpg"
  },
  analytics: {
    googleAnalyticsId: "",
    facebookPixelId: "",
    hotjarId: ""
  }
};

interface GlobalEditorProps {
  onContentChange: () => void;
}

export function GlobalEditor({ onContentChange }: GlobalEditorProps) {
  const [content, setContent] = useState(defaultGlobalSettings);

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
    onContentChange();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Global Settings</h3>
      </div>

      {/* Site Information */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Site Information</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="site-title" className="text-white/80 text-sm">
              Site Title
            </Label>
            <Input
              id="site-title"
              value={content.site.title}
              onChange={(e) => updateContent('site.title', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="SmartFactory.IO"
            />
          </div>

          <div>
            <Label htmlFor="site-tagline" className="text-white/80 text-sm">
              Tagline
            </Label>
            <Input
              id="site-tagline"
              value={content.site.tagline}
              onChange={(e) => updateContent('site.tagline', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Intelligent Manufacturing Solutions"
            />
          </div>

          <div>
            <Label htmlFor="site-description" className="text-white/80 text-sm">
              Site Description
            </Label>
            <Textarea
              id="site-description"
              value={content.site.description}
              onChange={(e) => updateContent('site.description', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[80px]"
              placeholder="Brief description of your company"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-logo" className="text-white/80 text-sm">
                Logo Path
              </Label>
              <Input
                id="site-logo"
                value={content.site.logo}
                onChange={(e) => updateContent('site.logo', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="/logo.svg"
              />
            </div>
            
            <div>
              <Label htmlFor="site-favicon" className="text-white/80 text-sm">
                Favicon Path
              </Label>
              <Input
                id="site-favicon"
                value={content.site.favicon}
                onChange={(e) => updateContent('site.favicon', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="/favicon.ico"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Branding Colors */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center">
          <Palette className="w-4 h-4 mr-2" />
          Brand Colors
        </h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="primary-color" className="text-white/80 text-sm">
                Primary Color
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="primary-color"
                  type="color"
                  value={content.branding.primaryColor}
                  onChange={(e) => updateContent('branding.primaryColor', e.target.value)}
                  className="w-12 h-8 p-0 bg-slate-700 border-slate-500"
                />
                <Input
                  value={content.branding.primaryColor}
                  onChange={(e) => updateContent('branding.primaryColor', e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-500 text-white"
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-color" className="text-white/80 text-sm">
                Secondary Color
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="secondary-color"
                  type="color"
                  value={content.branding.secondaryColor}
                  onChange={(e) => updateContent('branding.secondaryColor', e.target.value)}
                  className="w-12 h-8 p-0 bg-slate-700 border-slate-500"
                />
                <Input
                  value={content.branding.secondaryColor}
                  onChange={(e) => updateContent('branding.secondaryColor', e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-500 text-white"
                  placeholder="#8b5cf6"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="accent-color" className="text-white/80 text-sm">
                Accent Color
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  id="accent-color"
                  type="color"
                  value={content.branding.accentColor}
                  onChange={(e) => updateContent('branding.accentColor', e.target.value)}
                  className="w-12 h-8 p-0 bg-slate-700 border-slate-500"
                />
                <Input
                  value={content.branding.accentColor}
                  onChange={(e) => updateContent('branding.accentColor', e.target.value)}
                  className="flex-1 bg-slate-700 border-slate-500 text-white"
                  placeholder="#10b981"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Social Media Links</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin" className="text-white/80 text-sm">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={content.social.linkedin}
                onChange={(e) => updateContent('social.linkedin', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            
            <div>
              <Label htmlFor="twitter" className="text-white/80 text-sm">
                Twitter
              </Label>
              <Input
                id="twitter"
                value={content.social.twitter}
                onChange={(e) => updateContent('social.twitter', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="github" className="text-white/80 text-sm">
                GitHub (Optional)
              </Label>
              <Input
                id="github"
                value={content.social.github}
                onChange={(e) => updateContent('social.github', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="https://github.com/..."
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white/80 text-sm">
                Contact Email
              </Label>
              <Input
                id="email"
                value={content.social.email}
                onChange={(e) => updateContent('social.email', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="contact@company.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">SEO Settings</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="meta-title" className="text-white/80 text-sm">
              Meta Title (leave empty to use site title)
            </Label>
            <Input
              id="meta-title"
              value={content.seo.metaTitle}
              onChange={(e) => updateContent('seo.metaTitle', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Custom page title for search engines"
            />
          </div>

          <div>
            <Label htmlFor="meta-description" className="text-white/80 text-sm">
              Meta Description
            </Label>
            <Textarea
              id="meta-description"
              value={content.seo.metaDescription}
              onChange={(e) => updateContent('seo.metaDescription', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[60px]"
              placeholder="Description that appears in search results"
            />
            <div className="text-xs text-white/50 mt-1">
              {content.seo.metaDescription.length}/160 characters (optimal: 150-160)
            </div>
          </div>

          <div>
            <Label htmlFor="keywords" className="text-white/80 text-sm">
              Keywords (comma separated)
            </Label>
            <Input
              id="keywords"
              value={content.seo.keywords}
              onChange={(e) => updateContent('seo.keywords', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <Label htmlFor="og-image" className="text-white/80 text-sm">
              Social Share Image
            </Label>
            <Input
              id="og-image"
              value={content.seo.ogImage}
              onChange={(e) => updateContent('seo.ogImage', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="/og-image.jpg"
            />
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Editing Tips
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Changes here affect the entire website</li>
          <li>• Colors use hex codes (e.g., #3b82f6) or color picker</li>
          <li>• Meta description should be 150-160 characters for best SEO</li>
          <li>• Social share image should be 1200x630px for best results</li>
        </ul>
      </div>
    </div>
  );
}
