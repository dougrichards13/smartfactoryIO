import React from 'react';
import { Building2, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

interface AboutEditorProps {
  onContentChange: () => void;
}

export function AboutEditor({ onContentChange }: AboutEditorProps) {
  const { content: globalContent, updateAboutContent } = useContent();
  const content = globalContent.about;

  const updateContent = (path: string, value: string) => {
    const keys = path.split('.');
    // Deep clone to avoid mutating context directly
    const newContent: any = JSON.parse(JSON.stringify(content));
    let current: any = newContent;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    updateAboutContent(newContent);
    onContentChange();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <Building2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">About Section</h3>
      </div>

      {/* Section Title */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title-1" className="text-white/80 text-sm">
            Section Title
          </Label>
          <Input
            id="title-1"
            value={content.header.title.line1}
            onChange={(e) => updateContent('header.title.line1', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Type to change section title"
          />
        </div>

        <div>
          <Label htmlFor="title-2" className="text-white/80 text-sm">
            Highlighted Title
          </Label>
          <Input
            id="title-2"
            value={content.header.title.line2}
            onChange={(e) => updateContent('header.title.line2', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Type to change highlighted title"
          />
        </div>
      </div>

      {/* Main Description */}
      <div>
        <Label htmlFor="description" className="text-white/80 text-sm">
          Description
        </Label>
        <Textarea
          id="description"
          value={content.header.description}
          onChange={(e) => updateContent('header.description', e.target.value)}
          className="bg-white border-slate-300 text-black mt-1 min-h-[120px]"
          placeholder="Type to change description"
        />
        <div className="text-xs text-white/50 mt-1">
          {content.header.description.length} characters
        </div>
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="founding-year" className="text-white/80 text-sm">
            Founding Year
          </Label>
          <Input
            id="founding-year"
            value={content.header.foundingYear}
            onChange={(e) => updateContent('header.foundingYear', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="2010"
          />
        </div>

        <div>
          <Label htmlFor="expertise-types" className="text-white/80 text-sm">
            Expertise Types
          </Label>
          <Input
            id="expertise-types"
            value={content.header.expertiseTypes}
            onChange={(e) => updateContent('header.expertiseTypes', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="C-level experts, engineers, QA leaders"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="key-outcome" className="text-white/80 text-sm">
          Key Outcome
        </Label>
        <Input
          id="key-outcome"
          value={content.header.keyOutcome}
          onChange={(e) => updateContent('header.keyOutcome', e.target.value)}
          className="bg-white border-slate-300 text-black mt-1"
          placeholder="scalable results"
        />
      </div>

      {/* Portfolio Summary Stats */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Portfolio Summary</h4>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
            <Label className="text-white/80 text-sm">Total Impact</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input
                value={content.portfolioSummary.totalImpact.value}
                onChange={(e) => updateContent('portfolioSummary.totalImpact.value', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="$5B+"
              />
              <Input
                value={content.portfolioSummary.totalImpact.title}
                onChange={(e) => updateContent('portfolioSummary.totalImpact.title', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="Total Portfolio Impact"
              />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
            <Label className="text-white/80 text-sm">Major Enterprises</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input
                value={content.portfolioSummary.majorEnterprises.value}
                onChange={(e) => updateContent('portfolioSummary.majorEnterprises.value', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="25+"
              />
              <Input
                value={content.portfolioSummary.majorEnterprises.title}
                onChange={(e) => updateContent('portfolioSummary.majorEnterprises.title', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="Major Enterprises"
              />
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
            <Label className="text-white/80 text-sm">Client Success</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input
                value={content.portfolioSummary.clientRetention.value}
                onChange={(e) => updateContent('portfolioSummary.clientRetention.value', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="98%"
              />
              <Input
                value={content.portfolioSummary.clientRetention.title}
                onChange={(e) => updateContent('portfolioSummary.clientRetention.title', e.target.value)}
                className="bg-white border-slate-300 text-black"
                placeholder="Client Success"
              />
            </div>
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
          <li>• Description supports placeholders: {'{foundingYear}'}, {'{expertiseTypes}'}, {'{keyOutcome}'}</li>
          <li>• Stats appear in colored cards on the website</li>
          <li>• Title line 2 will be highlighted in gradient colors</li>
          <li>• Changes appear instantly on the main website</li>
        </ul>
      </div>
    </div>
  );
}
