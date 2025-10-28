import React, { useEffect } from 'react';
import { BarChart3, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useContent } from '../../src/contexts/ContentContext';

interface ResultsEditorProps {
  onContentChange: () => void;
}

export function ResultsEditor({ onContentChange }: ResultsEditorProps) {
  const { content: globalContent, updateResultsContent } = useContent();
  const content = globalContent.results;

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
    updateResultsContent(newContent);
  };

  const updateMetric = (metricIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent.impactMetrics[metricIndex][field] = value;
    updateResultsContent(newContent);
  };

  const updateTestimonial = (testimonialIndex: number, field: string, value: string | number) => {
    const newContent = { ...content };
    newContent.testimonials.items[testimonialIndex][field] = value;
    updateResultsContent(newContent);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-2 text-white">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Results Section</h3>
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
            placeholder="Proven Results & Impact"
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
            placeholder="Measurable Transformation"
          />
        </div>

        <div>
          <Label htmlFor="header-title-line2" className="text-white/80 text-sm">
            Title Line 2 (Highlighted)
          </Label>
          <Input
            id="header-title-line2"
            value={content.header?.title?.line2 || ''}
            onChange={(e) => updateContent('header.title.line2', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="Real Results, Real Impact"
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
            placeholder="Description of results and impact..."
          />
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Impact Metrics</h4>
        
        {content.impactMetrics?.map((metric, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">Metric #{index + 1}</h5>
              <span className="text-xl">📊</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Value</Label>
                <Input
                  value={metric.value}
                  onChange={(e) => updateMetric(index, 'value', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="$5B+"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Label</Label>
                <Input
                  value={metric.label}
                  onChange={(e) => updateMetric(index, 'label', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Project Impact"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Description</Label>
              <Textarea
                value={metric.description || ''}
                onChange={(e) => updateMetric(index, 'description', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1 min-h-[60px]"
                placeholder="Description of this metric..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Industry Impact */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Industry Impact</h4>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
          <div>
            <Label className="text-white/80 text-sm">Section Title</Label>
            <Input
              value={content.industryImpact?.title || ''}
              onChange={(e) => updateContent('industryImpact.title', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1"
              placeholder="Impact Across Industries"
            />
          </div>
          
          <div>
            <Label className="text-white/80 text-sm">Section Description</Label>
            <Textarea
              value={content.industryImpact?.description || ''}
              onChange={(e) => updateContent('industryImpact.description', e.target.value)}
              className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
              placeholder="Description of industry impact..."
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Client Testimonials</h4>
        
        <div>
          <Label className="text-white/80 text-sm">Section Title</Label>
          <Input
            value={content.testimonials?.title || ''}
            onChange={(e) => updateContent('testimonials.title', e.target.value)}
            className="bg-white border-slate-300 text-black mt-1"
            placeholder="What Enterprise Leaders Say"
          />
        </div>
        
        {content.testimonials?.items?.slice(0, 2).map((testimonial, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-white font-medium">Testimonial #{index + 1}</h5>
              <span className="text-xl">💬</span>
            </div>
            
            <div>
              <Label className="text-white/80 text-sm">Quote</Label>
              <Textarea
                value={testimonial.quote}
                onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                className="bg-white border-slate-300 text-black mt-1 min-h-[80px]"
                placeholder="Customer testimonial quote..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Author Name</Label>
                <Input
                  value={testimonial.author}
                  onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Title</Label>
                <Input
                  value={testimonial.title}
                  onChange={(e) => updateTestimonial(index, 'title', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Chief Executive Officer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Company</Label>
                <Input
                  value={testimonial.company}
                  onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="Fortune 500 Manufacturing"
                />
              </div>
              
              <div>
                <Label className="text-white/80 text-sm">Impact</Label>
                <Input
                  value={testimonial.impact}
                  onChange={(e) => updateTestimonial(index, 'impact', e.target.value)}
                  className="bg-white border-slate-300 text-black mt-1"
                  placeholder="$50M cost savings"
                />
              </div>
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
          <li>• Edit impact metrics, testimonials, and industry data</li>
          <li>• Keep metric values concise and impactful</li>
          <li>• Use specific numbers and percentages when possible</li>
        </ul>
      </div>
    </div>
  );
}