import React from 'react';
import { Zap, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

// Import current services content (fallback)
import servicesContent from '../../content/services.json';

interface ServicesEditorProps {
  onContentChange: () => void;
}

export function ServicesEditor({ onContentChange }: ServicesEditorProps) {
  const { content: globalContent, updateServicesContent } = useContent();
  const content = globalContent.services;

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    // Deep clone to avoid mutating context directly
    const newContent: any = JSON.parse(JSON.stringify(content));
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateServicesContent(newContent);
    onContentChange();
  };

  const updateServiceItem = (serviceIndex: number, field: string, value: string | string[]) => {
    // Deep clone to avoid mutating context directly
    const newContent: any = JSON.parse(JSON.stringify(content));
    newContent.consultantTypes[serviceIndex][field] = value;
    updateServicesContent(newContent);
    onContentChange();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Services Section</h3>
      </div>

      {/* Section Title */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="services-title" className="text-white/80 text-sm">
            Section Title
          </Label>
          <Input
            id="services-title"
            value={content.header?.title?.line1 || ''}
            onChange={(e) => updateContent('header.title.line1', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Our Services"
          />
        </div>

        <div>
          <Label htmlFor="services-subtitle" className="text-white/80 text-sm">
            Subtitle
          </Label>
          <Textarea
            id="services-subtitle"
            value={content.header?.description || ''}
            onChange={(e) => updateContent('header.description', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
            placeholder="Type to change subtitle"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Consultant Types</h4>
        
        {content.consultantTypes?.map((service, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">{service.title || `Service ${index + 1}`}</h5>
              <span className="text-sm text-white/60">#{index + 1}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Title</Label>
                <Input
                  value={service.title || ''}
                  onChange={(e) => updateServiceItem(index, 'title', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Smart Architects™"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Subtitle</Label>
                <Input
                  value={service.subtitle || ''}
                  onChange={(e) => updateServiceItem(index, 'subtitle', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="C-Suite Fractional Leadership"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Description</Label>
              <Textarea
                value={service.description || ''}
                onChange={(e) => updateServiceItem(index, 'description', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
                placeholder="Detailed service description"
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">Features (comma separated)</Label>
              <Textarea
                value={service.features ? service.features.join(', ') : ''}
                onChange={(e) => updateServiceItem(index, 'features', e.target.value.split(', ').filter(f => f.trim()))}
                className="bg-white border-slate-300 text-black mt-1 min-h-[60px]"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Investment</Label>
                <Input
                  value={service.investment || ''}
                  onChange={(e) => updateServiceItem(index, 'investment', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="$50K - $200K/quarter"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Duration</Label>
                <Input
                  value={service.duration || ''}
                  onChange={(e) => updateServiceItem(index, 'duration', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="3-12 months"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">CTA Button Text</Label>
              <Input
                value={service.cta || ''}
                onChange={(e) => updateServiceItem(index, 'cta', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="Engage a Smart Architect™"
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Call-to-Action</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="cta-title" className="text-white/80 text-sm">
              CTA Title
            </Label>
            <Input
              id="cta-title"
              value={content.cta?.title || ''}
              onChange={(e) => updateContent('cta.title', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Ready to get started?"
            />
          </div>
          
          <div>
            <Label htmlFor="cta-description" className="text-white/80 text-sm">
              CTA Description
            </Label>
            <Textarea
              id="cta-description"
              value={content.cta?.description || ''}
              onChange={(e) => updateContent('cta.description', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[60px]"
              placeholder="Contact us today to discuss your project"
            />
          </div>
          
          <div>
            <Label htmlFor="cta-button" className="text-white/80 text-sm">
              Button Text
            </Label>
            <Input
              id="cta-button"
              value={content.cta?.buttonText || ''}
              onChange={(e) => updateContent('cta.buttonText', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Get Started"
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
          <li>• Use emojis for service icons to keep them consistent</li>
          <li>• Keep service titles short and descriptive</li>
          <li>• Features are displayed as bullet points on the website</li>
          <li>• CTA appears at the bottom of the services section</li>
        </ul>
      </div>
    </div>
  );
}
