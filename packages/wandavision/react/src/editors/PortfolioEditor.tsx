/**
 * WandaVision Universal Intelligence - Portfolio Editor
 * Intelligently detects and edits portfolio showcases, case studies, and project highlights
 */

import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Briefcase, TrendingUp, Building2, Zap, Image, Eye, GripVertical, Plus, X } from 'lucide-react';
import { ContentType } from '@smartfactory/wandavision-core';
import { useUniversalContent, useDetectedPortfolio } from '../UniversalContentProvider';

interface PortfolioEditorProps {
  onContentChange: () => void;
}

interface DetectedPortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'acquisition' | 'manufacturing' | 'digital' | 'consulting' | 'other';
  metrics: string[];
  imageUrl?: string;
  clientName?: string;
  industry?: string;
  timeline?: string;
  element: HTMLElement;
  isEditable: boolean;
  order: number;
}

export function PortfolioEditor({ onContentChange }: PortfolioEditorProps) {
  const { updateDetectedContent, scanForContent, isScanning } = useUniversalContent();
  const detectedPortfolio = useDetectedPortfolio();
  
  const [processedPortfolio, setProcessedPortfolio] = useState<DetectedPortfolioItem[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // ============================================================================
  // PROCESS DETECTED PORTFOLIO
  // ============================================================================

  useEffect(() => {
    const processed = detectedPortfolio.map((content, index) => {
      const element = content.element;
      const textContent = element.textContent || '';
      
      // Extract portfolio information
      let title = 'Portfolio Item';
      let description = 'Project description';
      let category: DetectedPortfolioItem['category'] = 'other';
      let metrics: string[] = [];
      let clientName = '';
      let industry = '';
      let timeline = '';

      // Smart Factory specific portfolio items
      if (textContent.includes('$410M') && textContent.includes('$1.7B')) {
        title = 'Acquisition Transformation Excellence';
        description = 'Strategic operational transformation delivering 4.1x valuation multiplier through systematic excellence implementation';
        category = 'acquisition';
        metrics = ['$410M → $1.7B', '4.1x multiplier', '24 months transformation'];
        clientName = 'Manufacturing Conglomerate';
        industry = 'Advanced Manufacturing';
        timeline = '2018-2020';
      } else if (textContent.toLowerCase().includes('manufacturing') && textContent.toLowerCase().includes('optimization')) {
        title = 'Manufacturing Excellence Initiative';
        description = 'Comprehensive lean transformation and operational efficiency optimization across multiple production facilities';
        category = 'manufacturing';
        metrics = ['35% efficiency gain', '60% waste reduction', '15-month implementation'];
        industry = 'Discrete Manufacturing';
      } else if (textContent.toLowerCase().includes('digital') && textContent.toLowerCase().includes('transformation')) {
        title = 'Digital Platform Modernization';
        description = 'End-to-end digital transformation including cloud migration, automation, and data analytics implementation';
        category = 'digital';
        metrics = ['50% process automation', '75% faster reporting', '12-month delivery'];
        industry = 'Technology Services';
      } else if (textContent.toLowerCase().includes('supply') && textContent.toLowerCase().includes('chain')) {
        title = 'Supply Chain Optimization';
        description = 'Global supply chain redesign and optimization delivering improved resilience and cost efficiency';
        category = 'manufacturing';
        metrics = ['25% cost reduction', '40% lead time improvement', '18-month program'];
        industry = 'Global Manufacturing';
      }

      // Extract metrics from text content
      const extractedMetrics = extractMetricsFromText(textContent);
      if (extractedMetrics.length > 0) {
        metrics = [...metrics, ...extractedMetrics];
      }

      // Enhance with context-based information
      const contextInfo = extractContextInfo(element);
      if (contextInfo.title) title = contextInfo.title;
      if (contextInfo.industry) industry = contextInfo.industry;

      return {
        id: content.id,
        title,
        description,
        category,
        metrics: [...new Set(metrics)], // Remove duplicates
        clientName,
        industry,
        timeline,
        element,
        isEditable: content.isEditable,
        order: index
      };
    });

    setProcessedPortfolio(processed);
    console.log('💼 Processed portfolio:', processed);
  }, [detectedPortfolio]);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function extractMetricsFromText(text: string): string[] {
    const metrics: string[] = [];
    const patterns = [
      /\d+(\.\d+)?%\s*(increase|improvement|growth|reduction)/gi,
      /\$\d+[BMK]?(\.\d+[BMK]?)?/g,
      /\d+(\.\d+)?x\s*(multiplier|growth|increase)/gi,
      /\d+-\d+\s*(months?|years?)/gi
    ];

    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        metrics.push(...matches);
      }
    });

    return metrics;
  }

  function extractContextInfo(element: HTMLElement): { title?: string; industry?: string } {
    const parent = element.closest('section, article, div, .portfolio-item, .case-study');
    if (!parent) return {};

    // Look for headings
    const headings = parent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const title = Array.from(headings)
      .find(h => h.textContent && h.textContent.trim().length > 5 && h.textContent.trim().length < 100)
      ?.textContent?.trim();

    // Look for industry indicators
    const industryKeywords = ['manufacturing', 'technology', 'healthcare', 'finance', 'retail', 'automotive'];
    const text = parent.textContent?.toLowerCase() || '';
    const industry = industryKeywords.find(keyword => text.includes(keyword));

    return { title, industry };
  }

  function updatePortfolioItem(id: string, field: string, value: any) {
    setProcessedPortfolio(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, [field]: value }
          : item
      )
    );

    // Update in universal content
    updateDetectedContent(id, {
      content: {
        ...detectedPortfolio.find(p => p.id === id)?.content,
        data: {
          ...detectedPortfolio.find(p => p.id === id)?.content.data,
          [field]: value
        }
      }
    });

    onContentChange();
  }

  function addMetric(itemId: string, metric: string) {
    const item = processedPortfolio.find(p => p.id === itemId);
    if (item && metric.trim()) {
      const newMetrics = [...item.metrics, metric.trim()];
      updatePortfolioItem(itemId, 'metrics', newMetrics);
    }
  }

  function removeMetric(itemId: string, metricIndex: number) {
    const item = processedPortfolio.find(p => p.id === itemId);
    if (item) {
      const newMetrics = item.metrics.filter((_, index) => index !== metricIndex);
      updatePortfolioItem(itemId, 'metrics', newMetrics);
    }
  }

  function reorderPortfolio(newOrder: DetectedPortfolioItem[]) {
    const reordered = newOrder.map((item, index) => ({ ...item, order: index }));
    setProcessedPortfolio(reordered);
    onContentChange();
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'acquisition': return TrendingUp;
      case 'manufacturing': return Building2;
      case 'digital': return Zap;
      case 'consulting': return Briefcase;
      default: return Briefcase;
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'acquisition': return 'text-green-500 bg-green-500/10';
      case 'manufacturing': return 'text-blue-500 bg-blue-500/10';
      case 'digital': return 'text-purple-500 bg-purple-500/10';
      case 'consulting': return 'text-orange-500 bg-orange-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  }

  function toggleExpanded(itemId: string) {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  if (isScanning) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <Briefcase className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Portfolio & Case Studies</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for portfolio content...</p>
        </div>
      </div>
    );
  }

  if (processedPortfolio.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Portfolio & Case Studies</h3>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <div className="text-center text-white/60">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-2">No portfolio content detected</p>
            <p className="text-sm text-white/40">
              WandaVision automatically detects case studies, project highlights, and portfolio showcases.
            </p>
            <button
              onClick={scanForContent}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-sm"
            >
              Scan for Portfolio Content
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
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Portfolio & Case Studies</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {processedPortfolio.length} items
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

      {/* Portfolio Items */}
      <Reorder.Group
        axis="y"
        values={processedPortfolio}
        onReorder={reorderPortfolio}
        className="space-y-4"
      >
        {processedPortfolio.map((item, index) => {
          const IconComponent = getCategoryIcon(item.category);
          const colorClasses = getCategoryColor(item.category);
          const isExpanded = expandedItems.has(item.id);

          return (
            <Reorder.Item
              key={item.id}
              value={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
                {/* Header */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <GripVertical className="w-4 h-4 text-white/40 cursor-grab" />
                        <div className={`p-2 rounded ${colorClasses}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-white/60 text-sm">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          {item.industry && ` • ${item.industry}`}
                          {item.timeline && ` • ${item.timeline}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-700"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  {/* Metrics Preview */}
                  {item.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.metrics.slice(0, 3).map((metric, idx) => (
                        <span key={idx} className="bg-slate-700 text-white/80 px-2 py-1 rounded text-xs">
                          {metric}
                        </span>
                      ))}
                      {item.metrics.length > 3 && (
                        <span className="text-white/60 text-xs">+{item.metrics.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-600 p-4 space-y-4"
                  >
                    {previewMode ? (
                      // Preview Mode
                      <div className="space-y-3">
                        <div className="bg-slate-900 rounded p-4">
                          <h5 className="text-white font-semibold mb-2">{item.title}</h5>
                          <p className="text-white/80 text-sm mb-3">{item.description}</p>
                          {item.clientName && (
                            <p className="text-white/60 text-xs">Client: {item.clientName}</p>
                          )}
                        </div>
                        {item.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {item.metrics.map((metric, idx) => (
                              <div key={idx} className="bg-slate-900 rounded p-2 text-center">
                                <div className="text-primary font-semibold text-sm">{metric}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Category</label>
                            <select
                              value={item.category}
                              onChange={(e) => updatePortfolioItem(item.id, 'category', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            >
                              <option value="acquisition">Acquisition</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="digital">Digital Transformation</option>
                              <option value="consulting">Consulting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-1">Description</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updatePortfolioItem(item.id, 'description', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2 min-h-[80px]"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Client Name</label>
                            <input
                              type="text"
                              value={item.clientName || ''}
                              onChange={(e) => updatePortfolioItem(item.id, 'clientName', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                              placeholder="Optional"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Industry</label>
                            <input
                              type="text"
                              value={item.industry || ''}
                              onChange={(e) => updatePortfolioItem(item.id, 'industry', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                              placeholder="Optional"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Timeline</label>
                            <input
                              type="text"
                              value={item.timeline || ''}
                              onChange={(e) => updatePortfolioItem(item.id, 'timeline', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                              placeholder="e.g., 2020-2022"
                            />
                          </div>
                        </div>

                        {/* Metrics Management */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Key Metrics & Results</label>
                          <div className="space-y-2">
                            {item.metrics.map((metric, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={metric}
                                  onChange={(e) => {
                                    const newMetrics = [...item.metrics];
                                    newMetrics[idx] = e.target.value;
                                    updatePortfolioItem(item.id, 'metrics', newMetrics);
                                  }}
                                  className="flex-1 bg-white border-slate-300 text-black rounded px-3 py-1 text-sm"
                                />
                                <button
                                  onClick={() => removeMetric(item.id, idx)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addMetric(item.id, '')}
                              className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Metric</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Element Info */}
                    <div className="text-xs text-white/40 pt-2 border-t border-slate-600">
                      DOM: {item.element.tagName.toLowerCase()}
                      {item.element.className && ` .${item.element.className.split(' ')[0]}`}
                      • Order: #{item.order + 1}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <Briefcase className="w-4 h-4 mr-2" />
          Portfolio Management
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Drag items using the grip handles to reorder portfolio showcases</li>
          <li>• Edit titles, descriptions, and key metrics for each project</li>
          <li>• Add client information and timelines for professional context</li>
          <li>• Use Preview mode to see how items appear on the website</li>
          <li>• Categories help organize and style different types of work</li>
        </ul>
      </div>

      {/* Scan Status */}
      <div className="text-center">
        <button
          onClick={scanForContent}
          disabled={isScanning}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Re-scan for Portfolio Content'}
        </button>
      </div>
    </div>
  );
}