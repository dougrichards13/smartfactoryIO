import React, { useEffect } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

interface ContactEditorProps {
  onContentChange: () => void;
}

export function ContactEditor({ onContentChange }: ContactEditorProps) {
  const { content: globalContent, updateContactContent } = useContent();
  const content = globalContent.contact;

  useEffect(() => {
    onContentChange();
  }, [content, onContentChange]);

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateContactContent(newContent);
  };

  const updateContactItem = (contactIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.contactMethods[contactIndex][field] = value;
    updateContactContent(newContent);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Phone className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Contact Section</h3>
      </div>

      {/* Header Content */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="header-badge" className="text-white/80 text-sm">
            Header Badge
          </Label>
          <Input
            id="header-badge"
            value={content.header?.badge || ''}
            onChange={(e) => updateContent('header.badge', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Let's Talk"
          />
        </div>

        <div>
          <Label htmlFor="header-title-line1" className="text-white/80 text-sm">
            Title Line 1
          </Label>
          <Input
            id="header-title-line1"
            value={content.header?.title?.line1 || ''}
            onChange={(e) => updateContent('header.title.line1', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Talk to a Smart Architect™"
          />
        </div>

        <div>
          <Label htmlFor="header-title-line2" className="text-white/80 text-sm">
            Title Line 2
          </Label>
          <Input
            id="header-title-line2"
            value={content.header?.title?.line2 || ''}
            onChange={(e) => updateContent('header.title.line2', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Strategic Consultation Awaits"
          />
        </div>

        <div>
          <Label htmlFor="header-description" className="text-white/80 text-sm">
            Header Description
          </Label>
          <Textarea
            id="header-description"
            value={content.header?.description || ''}
            onChange={(e) => updateContent('header.description', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1 min-h-[100px]"
            placeholder="Description text..."
          />
        </div>
      </div>

      {/* Contact Methods */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Contact Methods</h4>
        
        {content.contactMethods?.map((method, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">{method.title}</h5>
              <span className="text-xl">📞</span>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Title</Label>
              <Input
                value={method.title}
                onChange={(e) => updateContactItem(index, 'title', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="AI-Powered Qualification"
              />
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Description</Label>
              <Textarea
                value={method.description || ''}
                onChange={(e) => updateContactItem(index, 'description', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1 min-h-[60px]"
                placeholder="Description of this contact method..."
              />
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Action Text</Label>
              <Input
                value={method.action || ''}
                onChange={(e) => updateContactItem(index, 'action', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1"
                placeholder="Start Conversation"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Editing Tips
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Changes appear instantly on the main website</li>
          <li>• Edit header content, contact methods, and action text</li>
          <li>• Contact methods include title, description, and action</li>
          <li>• Keep action text short and clear for better conversion</li>
        </ul>
      </div>
    </div>
  );
}
