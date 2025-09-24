import React, { useEffect } from 'react';
import { Globe, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

interface GlobalEditorProps {
  onContentChange: () => void;
}

export function GlobalEditor({ onContentChange }: GlobalEditorProps) {
  const { content: globalContent, updateGlobalContent } = useContent();
  const content = globalContent.global;

  useEffect(() => {
    onContentChange();
  }, [content, onContentChange]);

  const updateContent = (path: string, value: string | number) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateGlobalContent(newContent);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Global Settings</h3>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Company Information</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="company-name" className="text-white/80 text-sm">
              Company Name
            </Label>
            <Input
              id="company-name"
              value={content.company?.name || ''}
              onChange={(e) => updateContent('company.name', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="Smart Factory"
            />
          </div>

          <div>
            <Label htmlFor="company-tagline" className="text-white/80 text-sm">
              Company Tagline
            </Label>
            <Textarea
              id="company-tagline"
              value={content.company?.tagline || ''}
              onChange={(e) => updateContent('company.tagline', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
              placeholder="Transforming human potential into business reality..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="founding-year" className="text-white/80 text-sm">
                Founding Year
              </Label>
              <Input
                id="founding-year"
                type="number"
                value={content.company?.foundingYear || 2011}
                onChange={(e) => updateContent('company.foundingYear', parseInt(e.target.value))}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="2011"
              />
            </div>
            
            <div>
              <Label htmlFor="current-year" className="text-white/80 text-sm">
                Current Year
              </Label>
              <Input
                id="current-year"
                type="number"
                value={content.company?.currentYear || 2025}
                onChange={(e) => updateContent('company.currentYear', parseInt(e.target.value))}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="2025"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Contact Information</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="contact-phone" className="text-white/80 text-sm">
              Phone
            </Label>
            <Input
              id="contact-phone"
              value={content.contact?.phone || ''}
              onChange={(e) => updateContent('contact.phone', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <Label htmlFor="contact-email" className="text-white/80 text-sm">
              Email
            </Label>
            <Input
              id="contact-email"
              value={content.contact?.email || ''}
              onChange={(e) => updateContent('contact.email', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="leadership@smartfactory.io"
            />
          </div>

          <div>
            <Label htmlFor="contact-website" className="text-white/80 text-sm">
              Website
            </Label>
            <Input
              id="contact-website"
              value={content.contact?.website || ''}
              onChange={(e) => updateContent('contact.website', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="https://smartfactory.io"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Social Media Links</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="linkedin" className="text-white/80 text-sm">
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              value={content.social?.linkedin || ''}
              onChange={(e) => updateContent('social.linkedin', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="https://linkedin.com/company/smartfactory"
            />
          </div>
          
          <div>
            <Label htmlFor="twitter" className="text-white/80 text-sm">
              Twitter
            </Label>
            <Input
              id="twitter"
              value={content.social?.twitter || ''}
              onChange={(e) => updateContent('social.twitter', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="https://twitter.com/smartfactoryio"
            />
          </div>
          
          <div>
            <Label htmlFor="youtube" className="text-white/80 text-sm">
              YouTube
            </Label>
            <Input
              id="youtube"
              value={content.social?.youtube || ''}
              onChange={(e) => updateContent('social.youtube', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="https://youtube.com/@smartfactory"
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
          <li>• Company information appears in headers and footers</li>
          <li>• Contact details are used throughout the site</li>
          <li>• Social links appear in footer and contact sections</li>
        </ul>
      </div>
    </div>
  );
}
