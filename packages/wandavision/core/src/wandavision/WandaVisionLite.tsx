/**
 * WandaVision Lite - Direct Integration 
 * Simplified version integrated directly into Smart Factory project
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, MessageCircle, Settings } from 'lucide-react';

// Basic types for WandaVision content detection
interface DetectedContent {
  id: string;
  type: 'metrics' | 'portfolio' | 'testimonials' | 'services';
  element: HTMLElement;
  content: {
    title: string;
    description: string;
    data: Record<string, any>;
  };
  isEditable: boolean;
}

interface WandaVisionContextType {
  detectedContent: DetectedContent[];
  isScanning: boolean;
  scanForContent: () => void;
  updateContent: (id: string, updates: any) => void;
}

// Context
const WandaVisionContext = createContext<WandaVisionContextType | undefined>(undefined);

// Content scanner utility
class ContentScanner {
  static scan(): DetectedContent[] {
    const content: DetectedContent[] = [];
    
    // Smart Factory specific metrics detection
    const metricsPatterns = [
      { pattern: /\$5B\+/, type: 'financial' as const },
      { pattern: /847%/, type: 'percentage' as const },
      { pattern: /4\.1x/, type: 'multiplier' as const },
      { pattern: /13\+.*years?/i, type: 'time' as const }
    ];

    // Scan for metrics
    metricsPatterns.forEach((patternConfig, index) => {
      const elements = document.querySelectorAll('*');
      elements.forEach((element) => {
        if (element.textContent?.match(patternConfig.pattern)) {
          content.push({
            id: `metric-${index}-${Date.now()}`,
            type: 'metrics',
            element: element as HTMLElement,
            content: {
              title: `Detected ${patternConfig.type} metric`,
              description: element.textContent?.substring(0, 100) + '...' || '',
              data: { 
                pattern: patternConfig.pattern.source,
                type: patternConfig.type,
                value: element.textContent?.match(patternConfig.pattern)?.[0] || ''
              }
            },
            isEditable: true
          });
        }
      });
    });

    // Scan for testimonials (quoted text)
    const testimonialElements = document.querySelectorAll('*');
    testimonialElements.forEach((element, index) => {
      const text = element.textContent || '';
      if (text.match(/["'""].*["'""]/) && text.length > 50 && text.length < 500) {
        content.push({
          id: `testimonial-${index}-${Date.now()}`,
          type: 'testimonials',
          element: element as HTMLElement,
          content: {
            title: 'Detected testimonial',
            description: text.substring(0, 100) + '...',
            data: { quote: text }
          },
          isEditable: true
        });
      }
    });

    console.log('🎯 WandaVision Lite detected content:', content);
    return content;
  }
}

// Provider component
export function WandaVisionLiteProvider({ children }: { children: React.ReactNode }) {
  const [detectedContent, setDetectedContent] = useState<DetectedContent[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanForContent = async () => {
    setIsScanning(true);
    console.log('🔍 WandaVision Lite scanning...');
    
    // Simulate scan delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const content = ContentScanner.scan();
    setDetectedContent(content);
    setIsScanning(false);
    
    console.log('✅ WandaVision Lite scan complete:', content.length, 'items found');
  };

  const updateContent = (id: string, updates: any) => {
    setDetectedContent(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, content: { ...item.content, ...updates } }
          : item
      )
    );
  };

  useEffect(() => {
    // Auto-scan on mount
    scanForContent();
  }, []);

  return (
    <WandaVisionContext.Provider value={{
      detectedContent,
      isScanning,
      scanForContent,
      updateContent
    }}>
      {children}
    </WandaVisionContext.Provider>
  );
}

// Hook
export function useWandaVisionLite() {
  const context = useContext(WandaVisionContext);
  if (!context) {
    throw new Error('useWandaVisionLite must be used within WandaVisionLiteProvider');
  }
  return context;
}

// Simple Metrics Editor
export function WandaMetricsEditor({ onContentChange }: { onContentChange: () => void }) {
  const { detectedContent, isScanning, scanForContent } = useWandaVisionLite();
  const metrics = detectedContent.filter(item => item.type === 'metrics');

  if (isScanning) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Smart Metrics Detection</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Smart Metrics Detection</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {metrics.length} detected
          </span>
        </div>
        <button
          onClick={scanForContent}
          className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/80"
        >
          Re-scan
        </button>
      </div>

      {metrics.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50 text-white" />
          <p className="text-white/60 mb-2">No metrics detected</p>
          <p className="text-white/40 text-sm">WandaVision will automatically detect KPIs like $5B+, 847%, 4.1x</p>
        </div>
      ) : (
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-4 border border-slate-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-white font-medium">
                    {metric.content.data.type} metric
                  </span>
                </div>
                <span className="text-primary font-bold text-lg">
                  {metric.content.data.value}
                </span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-white/80 text-sm mb-1">Metric Value</label>
                  <input
                    type="text"
                    defaultValue={metric.content.data.value}
                    onChange={(e) => {
                      metric.element.textContent = e.target.value;
                      onContentChange();
                    }}
                    className="w-full bg-white text-black rounded px-3 py-2"
                  />
                </div>
                <div className="text-xs text-white/40">
                  DOM: {metric.element.tagName.toLowerCase()}
                  {metric.element.className && ` .${metric.element.className.split(' ')[0]}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2">WandaVision Lite</h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Automatically detects Smart Factory metrics: $5B+, 847%, 4.1x, 13+ years</li>
          <li>• Live editing updates the website elements in real-time</li>
          <li>• Professional context awareness for enterprise content</li>
        </ul>
      </div>
    </div>
  );
}

// Simple Testimonials Editor
export function WandaTestimonialsEditor({ onContentChange }: { onContentChange: () => void }) {
  const { detectedContent, isScanning, scanForContent } = useWandaVisionLite();
  const testimonials = detectedContent.filter(item => item.type === 'testimonials');

  if (isScanning) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <MessageCircle className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Smart Testimonials</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Smart Testimonials</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {testimonials.length} detected
          </span>
        </div>
        <button
          onClick={scanForContent}
          className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/80"
        >
          Re-scan
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50 text-white" />
          <p className="text-white/60 mb-2">No testimonials detected</p>
          <p className="text-white/40 text-sm">WandaVision will find quoted text and testimonials</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-4 border border-slate-600"
            >
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-white font-medium">Client Testimonial</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-white/80 text-sm mb-1">Quote</label>
                  <textarea
                    defaultValue={testimonial.content.data.quote}
                    onChange={(e) => {
                      testimonial.element.textContent = e.target.value;
                      onContentChange();
                    }}
                    className="w-full bg-white text-black rounded px-3 py-2 min-h-[80px]"
                  />
                </div>
                <div className="text-xs text-white/40">
                  DOM: {testimonial.element.tagName.toLowerCase()}
                  {testimonial.element.className && ` .${testimonial.element.className.split(' ')[0]}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2">WandaVision Lite</h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Automatically detects quoted text and testimonials</li>
          <li>• Live editing preserves the original styling and layout</li>
          <li>• Smart context detection for client feedback</li>
        </ul>
      </div>
    </div>
  );
}