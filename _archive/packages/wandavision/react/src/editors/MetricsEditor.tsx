/**
 * WandaVision Universal Intelligence - Metrics Editor
 * Intelligently detects and edits hardcoded KPIs and metrics
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, DollarSign, TrendingUp, Award, Shield, MessageSquare, Eye } from 'lucide-react';
import { ContentType } from '@smartfactory/wandavision-core';
import { useUniversalContent, useDetectedMetrics } from '../UniversalContentProvider';

// Icon mapping for metrics
const iconMap = {
  BarChart3,
  DollarSign,
  TrendingUp,
  Award,
  Shield
};

interface MetricsEditorProps {
  onContentChange: () => void;
}

interface DetectedMetric {
  id: string;
  value: string;
  title: string;
  subtitle: string;
  category: 'financial' | 'multiplier' | 'percentage' | 'time' | 'count';
  element: HTMLElement;
  isEditable: boolean;
}

export function MetricsEditor({ onContentChange }: MetricsEditorProps) {
  const { updateDetectedContent, scanForContent, isScanning } = useUniversalContent();
  const detectedMetrics = useDetectedMetrics();
  
  const [processedMetrics, setProcessedMetrics] = useState<DetectedMetric[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // ============================================================================
  // PROCESS DETECTED METRICS
  // ============================================================================

  useEffect(() => {
    const processed = detectedMetrics.map(content => {
      // Extract metric information from detected content
      const element = content.element;
      const textContent = element.textContent || '';
      const detectedPatterns = content.content.data?.detectedPatterns || [];
      
      // Determine metric details
      let value = '';
      let title = 'Detected Metric';
      let subtitle = 'Automatically detected KPI';
      let category: DetectedMetric['category'] = 'count';
      
      // Extract primary metric value
      if (detectedPatterns.length > 0) {
        value = detectedPatterns[0];
      } else {
        // Fallback pattern matching
        const patterns = [
          { regex: /\$[0-9,]+[BMK]?\+?/g, category: 'financial' as const },
          { regex: /[0-9]+(\.[0-9]+)?x/g, category: 'multiplier' as const },
          { regex: /[0-9]+(\.[0-9]+)?%/g, category: 'percentage' as const },
          { regex: /[0-9]+\+?\s*(years?|yrs?)/gi, category: 'time' as const }
        ];
        
        for (const pattern of patterns) {
          const match = textContent.match(pattern.regex);
          if (match) {
            value = match[0];
            category = pattern.category;
            break;
          }
        }
      }
      
      // Enhance title and subtitle based on context
      const contextTitle = extractTitleFromContext(element);
      if (contextTitle) {
        title = contextTitle;
        subtitle = `${category} metric: ${value}`;
      }
      
      // Special handling for Smart Factory metrics
      if (value.includes('847%')) {
        title = 'Portfolio Growth';
        subtitle = 'Documented client engagement demonstrating sustained value creation';
        category = 'percentage';
      } else if (value.includes('$5B')) {
        title = 'Total Value Creation';
        subtitle = 'Cumulative documented project impact across all engagements';
        category = 'financial';
      } else if (value.includes('4.1x')) {
        title = 'Valuation Excellence';
        subtitle = 'Acquisition multiplier: $410M → $1.7B transformation story';
        category = 'multiplier';
      } else if (value.includes('15+') && value.toLowerCase().includes('year')) {
        title = 'Years of Excellence';
        subtitle = 'Consistent enterprise delivery since 2010';
        category = 'time';
      }

      return {
        id: content.id,
        value,
        title,
        subtitle,
        category,
        element,
        isEditable: content.isEditable
      };
    }).filter(metric => metric.value); // Only include metrics with values

    setProcessedMetrics(processed);
    console.log('📊 Processed metrics:', processed);
  }, [detectedMetrics]);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function extractTitleFromContext(element: HTMLElement): string {
    // Look for nearby headings or labels
    const parent = element.closest('section, article, div');
    if (!parent) return '';
    
    // Check for heading elements
    const headings = parent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (const heading of headings) {
      const text = heading.textContent?.trim();
      if (text && text.length > 3 && text.length < 50) {
        return text;
      }
    }
    
    // Check for elements with title-like classes
    const titleElements = parent.querySelectorAll(
      '[class*="title"], [class*="heading"], [class*="label"]'
    );
    for (const titleEl of titleElements) {
      const text = titleEl.textContent?.trim();
      if (text && text.length > 3 && text.length < 50) {
        return text;
      }
    }
    
    return '';
  }

  function updateMetric(id: string, field: string, value: string) {
    // Update in processed metrics
    setProcessedMetrics(prev => 
      prev.map(metric => 
        metric.id === id 
          ? { ...metric, [field]: value }
          : metric
      )
    );

    // Update in universal content
    updateDetectedContent(id, {
      content: {
        ...detectedMetrics.find(m => m.id === id)?.content,
        data: {
          ...detectedMetrics.find(m => m.id === id)?.content.data,
          [field]: value
        }
      }
    });

    // Update DOM element if editing value
    if (field === 'value') {
      const metric = processedMetrics.find(m => m.id === id);
      if (metric && metric.element) {
        // Find the text node containing the old value and replace it
        updateElementValue(metric.element, metric.value, value);
      }
    }

    onContentChange();
  }

  function updateElementValue(element: HTMLElement, oldValue: string, newValue: string) {
    // Simple text replacement - can be enhanced for more complex scenarios
    if (element.textContent?.includes(oldValue)) {
      element.textContent = element.textContent.replace(oldValue, newValue);
    }
    
    // Also update innerHTML if it contains the value
    if (element.innerHTML.includes(oldValue)) {
      element.innerHTML = element.innerHTML.replace(oldValue, newValue);
    }
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'financial': return DollarSign;
      case 'multiplier': return TrendingUp;  
      case 'percentage': return BarChart3;
      case 'time': return Award;
      default: return BarChart3;
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'financial': return 'text-green-500';
      case 'multiplier': return 'text-blue-500';
      case 'percentage': return 'text-purple-500';
      case 'time': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  if (isScanning) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Metrics & KPIs</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for metrics and KPIs...</p>
        </div>
      </div>
    );
  }

  if (processedMetrics.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Metrics & KPIs</h3>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <div className="text-center text-white/60">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-2">No metrics detected on this page</p>
            <p className="text-sm text-white/40">
              WandaVision automatically detects KPIs like percentages, dollar amounts, multipliers, and year ranges.
            </p>
            <button
              onClick={scanForContent}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-sm"
            >
              Re-scan for Metrics
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Metrics & KPIs</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {processedMetrics.length} detected
          </span>
        </div>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center space-x-1 text-white/70 hover:text-white text-sm"
        >
          <Eye className="w-4 h-4" />
          <span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
      </div>

      {/* Metrics List */}
      <div className="space-y-4">
        {processedMetrics.map((metric, index) => {
          const IconComponent = getCategoryIcon(metric.category);
          const colorClass = getCategoryColor(metric.category);

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-4 border border-slate-600 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`w-5 h-5 ${colorClass}`} />
                  <span className="text-white font-medium">
                    {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)} Metric
                  </span>
                </div>
                <span className="text-xs text-white/50">#{index + 1}</span>
              </div>

              {previewMode ? (
                // Preview Mode
                <div className="bg-slate-900 rounded p-3 space-y-2">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm font-medium text-white/90">{metric.title}</div>
                  <div className="text-xs text-white/70">{metric.subtitle}</div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-white/80 text-sm mb-1">Value</label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => updateMetric(metric.id, 'value', e.target.value)}
                      className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                      placeholder="e.g., 847%, $5B+, 4.1x"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-1">Title</label>
                    <input
                      type="text"
                      value={metric.title}
                      onChange={(e) => updateMetric(metric.id, 'title', e.target.value)}
                      className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                      placeholder="Metric title"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-1">Subtitle/Description</label>
                    <textarea
                      value={metric.subtitle}
                      onChange={(e) => updateMetric(metric.id, 'subtitle', e.target.value)}
                      className="w-full bg-white border-slate-300 text-black rounded px-3 py-2 min-h-[60px]"
                      placeholder="Brief description of the metric"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-1">Category</label>
                    <select
                      value={metric.category}
                      onChange={(e) => updateMetric(metric.id, 'category', e.target.value)}
                      className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                    >
                      <option value="financial">Financial ($)</option>
                      <option value="multiplier">Multiplier (x)</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="time">Time/Years</option>
                      <option value="count">Count/Number</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Element Info */}
              <div className="text-xs text-white/40 pt-2 border-t border-slate-600">
                DOM: {metric.element.tagName.toLowerCase()}
                {metric.element.className && ` .${metric.element.className.split(' ')[0]}`}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Auto-Detection Info
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• WandaVision automatically detects metrics like 847%, $5B+, 4.1x, 15+ years</li>
          <li>• Changes update the live website elements in real-time</li>
          <li>• Metrics are classified by type: financial, percentage, multiplier, time, count</li>
          <li>• Use the Preview mode to see how metrics appear on the website</li>
          <li>• DOM elements are preserved to maintain styling and layout</li>
        </ul>
      </div>

      {/* Scan Status */}
      <div className="text-center">
        <button
          onClick={scanForContent}
          disabled={isScanning}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Re-scan for New Metrics'}
        </button>
      </div>
    </div>
  );
}