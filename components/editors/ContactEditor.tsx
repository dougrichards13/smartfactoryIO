import React, { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

// Import current contact content
import contactContent from '../../content/contact.json';

interface ContactEditorProps {
  onContentChange: () => void;
}

export function ContactEditor({ onContentChange }: ContactEditorProps) {
  const [content, setContent] = useState(contactContent);

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

  const updateContactItem = (contactIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.contactMethods[contactIndex][field] = value;
    setContent(newContent);
    onContentChange();
  };

  const updateOfficeItem = (officeIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.offices[officeIndex][field] = value;
    setContent(newContent);
    onContentChange();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Phone className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Contact Section</h3>
      </div>

      {/* Section Title */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="contact-title" className="text-white/80 text-sm">
            Current Section Title
          </Label>
          <Input
            id="contact-title"
            value={content.title}
            onChange={(e) => updateContent('title', e.target.value)}
            className="bg-slate-800 border-slate-600 text-white mt-1"
            placeholder="Get in Touch"
          />
        </div>

        <div>
          <Label htmlFor="contact-subtitle" className="text-white/80 text-sm">
            Current Subtitle
          </Label>
          <Textarea
            id="contact-subtitle"
            value={content.subtitle}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            className="bg-slate-800 border-slate-600 text-white mt-1 min-h-[80px]"
            placeholder="Type to change subtitle"
          />
        </div>
      </div>

      {/* Contact Methods */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Contact Methods</h4>
        
        {content.contactMethods?.map((method, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">{method.type}</h5>
              <span className="text-xl">{method.icon}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Type</Label>
                <Input
                  value={method.type}
                  onChange={(e) => updateContactItem(index, 'type', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="Email, Phone, etc."
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Icon (Emoji)</Label>
                <Input
                  value={method.icon}
                  onChange={(e) => updateContactItem(index, 'icon', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="📧"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Value</Label>
                <Input
                  value={method.value}
                  onChange={(e) => updateContactItem(index, 'value', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="contact@company.com"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Link (optional)</Label>
                <Input
                  value={method.link || ''}
                  onChange={(e) => updateContactItem(index, 'link', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="mailto:contact@company.com"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/80 text-sm">Description</Label>
              <Textarea
                value={method.description || ''}
                onChange={(e) => updateContactItem(index, 'description', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[60px]"
                placeholder="Best way to reach us for..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Office Locations */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Office Locations</h4>
        
        {content.offices?.map((office, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">{office.city}</h5>
              <span className="text-xl">🏢</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">City</Label>
                <Input
                  value={office.city}
                  onChange={(e) => updateOfficeItem(index, 'city', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Country</Label>
                <Input
                  value={office.country}
                  onChange={(e) => updateOfficeItem(index, 'country', e.target.value)}
                  className="bg-slate-700 border-slate-500 text-white mt-1"
                  placeholder="USA"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Address</Label>
              <Textarea
                value={office.address}
                onChange={(e) => updateOfficeItem(index, 'address', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[60px]"
                placeholder="Full address"
              />
            </div>

            <div>
              <Label className="text-white/80 text-sm">Timezone</Label>
              <Input
                value={office.timezone || ''}
                onChange={(e) => updateOfficeItem(index, 'timezone', e.target.value)}
                className="bg-slate-700 border-slate-500 text-white mt-1"
                placeholder="EST, PST, etc."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Form Settings */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Contact Form</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label htmlFor="form-title" className="text-white/80 text-sm">
              Form Title
            </Label>
            <Input
              id="form-title"
              value={content.form?.title || ''}
              onChange={(e) => updateContent('form.title', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Send us a message"
            />
          </div>
          
          <div>
            <Label htmlFor="form-description" className="text-white/80 text-sm">
              Form Description
            </Label>
            <Textarea
              id="form-description"
              value={content.form?.description || ''}
              onChange={(e) => updateContent('form.description', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1 min-h-[60px]"
              placeholder="Fill out the form and we'll get back to you"
            />
          </div>
          
          <div>
            <Label htmlFor="form-button" className="text-white/80 text-sm">
              Submit Button Text
            </Label>
            <Input
              id="form-button"
              value={content.form?.submitText || ''}
              onChange={(e) => updateContent('form.submitText', e.target.value)}
              className="bg-slate-700 border-slate-500 text-white mt-1"
              placeholder="Send Message"
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
          <li>• Use appropriate emojis for contact method icons</li>
          <li>• Link field can be mailto:, tel:, or https:// URLs</li>
          <li>• Office information helps build trust with prospects</li>
          <li>• Form settings customize the contact form appearance</li>
        </ul>
      </div>
    </div>
  );
}
