import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, MessageSquare, Zap, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

// Import current hero content for fallback
import heroContent from '../../content/hero.json';

interface HeroEditorProps {
  onContentChange: () => void;
  onResetRequested?: () => void;
}

export function HeroEditor({ onContentChange, onResetRequested }: HeroEditorProps) {
  const { content: globalContent, updateHeroContent, resetSection } = useContent();
  const content = globalContent.hero;
  const [previewMode, setPreviewMode] = useState(false);

  // Debug: Log the loaded content
  useEffect(() => {
    console.log('HeroEditor - Loaded content:', content);
    console.log('HeroEditor - Headline line1:', content.headline?.line1);
  }, []);

  // Reset function to revert to original content
  const resetContent = () => {
    resetSection('hero');
    console.log('HeroEditor - Content reset to original');
  };

  // Register reset callback with parent
  useEffect(() => {
    // Always register the reset function when component mounts
    (window as any).heroEditorReset = resetContent;
    console.log('HeroEditor - Reset function registered');
  }, []);

  useEffect(() => {
    onContentChange();
  }, [content, onContentChange]);

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    // Set the value
    current[keys[keys.length - 1]] = value;
    
    // Update global context instead of local state
    updateHeroContent(newContent);
  };

  const updateTrustIndicator = (index: number, value: string) => {
    const newTrustIndicators = [...content.trustIndicators];
    newTrustIndicators[index] = value;
    updateHeroContent({
      ...content,
      trustIndicators: newTrustIndicators
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Type className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Hero Section</h3>
      </div>

      {/* Headlines */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="headline-1" className="text-white/80 text-sm">
            Current Main Headline
          </Label>
          <Input
            id="headline-1"
            value={content.headline.line1}
            onChange={(e) => updateContent('headline.line1', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Type to change main headline"
            maxLength={60}
          />
          <div className="text-xs text-white/50 mt-1">
            {content.headline.line1.length}/60 characters
          </div>
        </div>

        <div>
          <Label htmlFor="headline-2" className="text-white/80 text-sm">
            Current Sub-Headline (Highlighted)
          </Label>
          <Input
            id="headline-2"
            value={content.headline.line2}
            onChange={(e) => updateContent('headline.line2', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Type to change sub-headline"
            maxLength={60}
          />
          <div className="text-xs text-white/50 mt-1">
            {content.headline.line2.length}/60 characters
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-white/80 text-sm">
          Current Description
        </Label>
        <Textarea
          id="description"
          value={content.description}
          onChange={(e) => updateContent('description', e.target.value)}
          className="bg-white border-slate-300 text-black mt-1 min-h-[100px]"
          placeholder="Type to change description"
        />
        <div className="text-xs text-white/50 mt-1">
          {content.description.length} characters
        </div>
      </div>

      {/* Tagline */}
      <div>
        <Label htmlFor="tagline" className="text-white/80 text-sm">
          Current Tagline (Highlighted)
        </Label>
        <Input
          id="tagline"
          value={content.tagline}
          onChange={(e) => updateContent('tagline', e.target.value)}
          className="bg-white border-slate-300 text-black mt-1"
          placeholder="Type to change tagline"
          maxLength={100}
        />
        <div className="text-xs text-white/50 mt-1">
          {content.tagline.length}/100 characters
        </div>
      </div>

      {/* Trust Indicators */}
      <div>
        <Label className="text-white/80 text-sm">Current Trust Indicators</Label>
        <div className="space-y-2 mt-2">
          {content.trustIndicators.map((indicator, index) => (
            <div key={index}>
              <Input
                value={indicator}
                onChange={(e) => updateTrustIndicator(index, e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder={`Type to change indicator ${index + 1}`}
                maxLength={50}
              />
              <div className="text-xs text-white/50 mt-1">
                {indicator.length}/50 characters
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <Label htmlFor="cta-text" className="text-white/80 text-sm">
          Current Button Text
        </Label>
        <Input
          id="cta-text"
          value={content.ctaButton.text}
          onChange={(e) => updateContent('ctaButton.text', e.target.value)}
          className="bg-white border-slate-300 text-black mt-1"
          placeholder="Type to change button text"
          maxLength={40}
        />
        <div className="text-xs text-white/50 mt-1">
          {content.ctaButton.text.length}/40 characters
        </div>
      </div>

      {/* Preview */}
      <motion.div
        initial={false}
        animate={{ height: previewMode ? 'auto' : 0, opacity: previewMode ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Live Preview
          </h4>
          <div className="text-sm text-white/80 space-y-2">
            <div>
              <strong className="text-white">Headline:</strong><br />
              {content.headline.line1}<br />
              <span className="text-primary font-bold">{content.headline.line2}</span>
            </div>
            <div>
              <strong className="text-white">Description:</strong><br />
              {content.description.substring(0, 100)}...
            </div>
            <div>
              <strong className="text-white">Tagline:</strong><br />
              <span className="text-secondary font-bold">{content.tagline}</span>
            </div>
            <div>
              <strong className="text-white">Trust Indicators:</strong><br />
              {content.trustIndicators.map((indicator, i) => (
                <span key={i} className="inline-block bg-slate-700 px-2 py-1 rounded text-xs mr-2 mb-1">
                  ✓ {indicator}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preview Toggle */}
      <Button
        variant="outline"
        onClick={() => setPreviewMode(!previewMode)}
        className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
      >
        <Eye className="w-4 h-4 mr-2" />
        {previewMode ? 'Hide' : 'Show'} Preview
      </Button>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Editing Tips
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Changes appear instantly on the main website</li>
          <li>• Line 2 of headline will be highlighted in gradient colors</li>
          <li>• Tagline appears in blue highlighting</li>
          <li>• Keep button text short and action-oriented</li>
          <li>• Trust indicators show with green checkmarks</li>
        </ul>
      </div>
    </div>
  );
}
