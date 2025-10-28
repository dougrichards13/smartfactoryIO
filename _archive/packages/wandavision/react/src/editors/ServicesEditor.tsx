/**
 * WandaVision Universal Intelligence - Services Editor
 * Intelligently detects and edits service descriptions, methodology explanations, and capability highlights
 */

import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Settings, Wrench, Target, Lightbulb, Eye, GripVertical, Plus, X, CheckCircle } from 'lucide-react';
import { ContentType } from '@smartfactory/wandavision-core';
import { useUniversalContent } from '../UniversalContentProvider';

interface ServicesEditorProps {
  onContentChange: () => void;
}

interface DetectedService {
  id: string;
  title: string;
  description: string;
  category: 'operational' | 'digital' | 'strategic' | 'consulting' | 'other';
  keyPoints: string[];
  methodology?: string;
  deliverables: string[];
  timeframe?: string;
  element: HTMLElement;
  isEditable: boolean;
  order: number;
  isHighlighted: boolean;
}

export function ServicesEditor({ onContentChange }: ServicesEditorProps) {
  const { updateDetectedContent, scanForContent, isScanning, detectedContent } = useUniversalContent();
  
  // Filter for services content
  const detectedServices = detectedContent.filter(content => content.content.type === ContentType.SERVICES);
  
  const [processedServices, setProcessedServices] = useState<DetectedService[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // ============================================================================
  // PROCESS DETECTED SERVICES
  // ============================================================================

  useEffect(() => {
    const processed = detectedServices.map((content, index) => {
      const element = content.element;
      const textContent = element.textContent || '';
      
      // Extract service information
      let title = 'Service Offering';
      let description = 'Service description';
      let category: DetectedService['category'] = 'other';
      let keyPoints: string[] = [];
      let methodology = '';
      let deliverables: string[] = [];
      let timeframe = '';
      let isHighlighted = false;

      // Smart Factory specific services
      if (textContent.toLowerCase().includes('operational excellence') || textContent.toLowerCase().includes('lean transformation')) {
        title = 'Operational Excellence & Lean Transformation';
        description = 'Comprehensive operational transformation using proven lean methodologies to eliminate waste, optimize processes, and drive sustainable performance improvements';
        category = 'operational';
        keyPoints = [
          'Value stream mapping and optimization',
          'Waste elimination and process improvement',
          'Continuous improvement culture development',
          'Performance measurement and KPI systems'
        ];
        methodology = 'Smart Factory Lean Excellence Framework';
        deliverables = [
          'Current state assessment and gap analysis',
          'Detailed transformation roadmap',
          'Process optimization recommendations',
          'Team training and capability development',
          'Ongoing performance monitoring system'
        ];
        timeframe = '6-18 months';
        isHighlighted = true;
      } else if (textContent.toLowerCase().includes('digital transformation') || textContent.toLowerCase().includes('digital strategy')) {
        title = 'Digital Transformation & Strategy';
        description = 'End-to-end digital transformation including technology strategy, platform modernization, automation, and data analytics implementation';
        category = 'digital';
        keyPoints = [
          'Digital strategy and roadmap development',
          'Technology platform assessment and selection',
          'Process automation and digitization',
          'Data analytics and business intelligence'
        ];
        methodology = 'Digital Transformation Accelerator';
        deliverables = [
          'Digital maturity assessment',
          'Technology architecture design',
          'Implementation project plans',
          'Change management strategy',
          'Success metrics and monitoring'
        ];
        timeframe = '12-24 months';
        isHighlighted = true;
      } else if (textContent.toLowerCase().includes('strategic') || textContent.toLowerCase().includes('growth')) {
        title = 'Strategic Growth & Performance';
        description = 'Strategic advisory services focused on sustainable growth, market positioning, and performance optimization';
        category = 'strategic';
        keyPoints = [
          'Market analysis and competitive positioning',
          'Growth strategy development',
          'Business model optimization',
          'Performance management systems'
        ];
        methodology = 'Strategic Excellence Framework';
        deliverables = [
          'Strategic assessment and market analysis',
          'Growth strategy and business plan',
          'Implementation roadmap',
          'Performance dashboards',
          'Executive coaching and support'
        ];
        timeframe = '3-12 months';
      } else if (textContent.toLowerCase().includes('consulting') || textContent.toLowerCase().includes('advisory')) {
        title = 'Management Consulting & Advisory';
        description = 'Expert advisory services providing strategic guidance, problem-solving, and implementation support across all business functions';
        category = 'consulting';
        keyPoints = [
          'Executive advisory and coaching',
          'Problem-solving and decision support',
          'Change management and implementation',
          'Best practice knowledge transfer'
        ];
        methodology = 'Collaborative Advisory Approach';
        deliverables = [
          'Situation analysis and recommendations',
          'Implementation support and guidance',
          'Team development and training',
          'Knowledge transfer and documentation'
        ];
        timeframe = '1-6 months';
      }

      // Extract service points from lists or bullet points
      const extractedPoints = extractServicePoints(textContent);
      if (extractedPoints.length > 0) {
        keyPoints = [...keyPoints, ...extractedPoints];
      }

      // Enhance with context-based information
      const contextInfo = extractContextInfo(element);
      if (contextInfo.title) title = contextInfo.title;
      if (contextInfo.timeframe) timeframe = contextInfo.timeframe;

      return {
        id: content.id,
        title,
        description,
        category,
        keyPoints: [...new Set(keyPoints)], // Remove duplicates
        methodology,
        deliverables,
        timeframe,
        element,
        isEditable: content.isEditable,
        order: index,
        isHighlighted
      };
    });

    setProcessedServices(processed);
    console.log('🔧 Processed services:', processed);
  }, [detectedServices]);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function extractServicePoints(text: string): string[] {
    const points: string[] = [];
    
    // Look for bullet points or list items
    const patterns = [
      /[•·▪▫-]\s*([^•·▪▫\n\r]{10,100})/g,
      /\d+\.\s*([^0-9\n\r]{10,100})/g,
      /\*\s*([^\*\n\r]{10,100})/g
    ];

    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const cleaned = match.replace(/^[•·▪▫\-\d\.\*\s]+/, '').trim();
          if (cleaned.length > 10 && cleaned.length < 100) {
            points.push(cleaned);
          }
        });
      }
    });

    return points;
  }

  function extractContextInfo(element: HTMLElement): { title?: string; timeframe?: string } {
    const parent = element.closest('section, article, div, .service, .offering');
    if (!parent) return {};

    // Look for headings
    const headings = parent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const title = Array.from(headings)
      .find(h => h.textContent && h.textContent.trim().length > 5 && h.textContent.trim().length < 80)
      ?.textContent?.trim();

    // Look for timeframe indicators
    const text = parent.textContent?.toLowerCase() || '';
    const timePatterns = [
      /(\d+-\d+)\s*(months?|weeks?)/gi,
      /(weeks?|months?|days?)\s*(\d+-\d+)/gi
    ];

    let timeframe = '';
    for (const pattern of timePatterns) {
      const match = text.match(pattern);
      if (match && match[0]) {
        timeframe = match[0];
        break;
      }
    }

    return { title, timeframe };
  }

  function updateService(id: string, field: string, value: any) {
    setProcessedServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, [field]: value }
          : service
      )
    );

    // Update in universal content
    updateDetectedContent(id, {
      content: {
        ...detectedServices.find(s => s.id === id)?.content,
        data: {
          ...detectedServices.find(s => s.id === id)?.content.data,
          [field]: value
        }
      }
    });

    onContentChange();
  }

  function addKeyPoint(serviceId: string, point: string) {
    const service = processedServices.find(s => s.id === serviceId);
    if (service && point.trim()) {
      const newPoints = [...service.keyPoints, point.trim()];
      updateService(serviceId, 'keyPoints', newPoints);
    }
  }

  function removeKeyPoint(serviceId: string, pointIndex: number) {
    const service = processedServices.find(s => s.id === serviceId);
    if (service) {
      const newPoints = service.keyPoints.filter((_, index) => index !== pointIndex);
      updateService(serviceId, 'keyPoints', newPoints);
    }
  }

  function addDeliverable(serviceId: string, deliverable: string) {
    const service = processedServices.find(s => s.id === serviceId);
    if (service && deliverable.trim()) {
      const newDeliverables = [...service.deliverables, deliverable.trim()];
      updateService(serviceId, 'deliverables', newDeliverables);
    }
  }

  function removeDeliverable(serviceId: string, deliverableIndex: number) {
    const service = processedServices.find(s => s.id === serviceId);
    if (service) {
      const newDeliverables = service.deliverables.filter((_, index) => index !== deliverableIndex);
      updateService(serviceId, 'deliverables', newDeliverables);
    }
  }

  function reorderServices(newOrder: DetectedService[]) {
    const reordered = newOrder.map((service, index) => ({ ...service, order: index }));
    setProcessedServices(reordered);
    onContentChange();
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'operational': return Settings;
      case 'digital': return Lightbulb;
      case 'strategic': return Target;
      case 'consulting': return Wrench;
      default: return Settings;
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'operational': return 'text-blue-500 bg-blue-500/10';
      case 'digital': return 'text-purple-500 bg-purple-500/10';
      case 'strategic': return 'text-green-500 bg-green-500/10';
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
          <Settings className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Services & Capabilities</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for services content...</p>
        </div>
      </div>
    );
  }

  if (processedServices.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Services & Capabilities</h3>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <div className="text-center text-white/60">
            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-2">No services content detected</p>
            <p className="text-sm text-white/40">
              WandaVision automatically detects service descriptions, capabilities, and methodology content.
            </p>
            <button
              onClick={scanForContent}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-sm"
            >
              Scan for Services Content
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
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Services & Capabilities</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {processedServices.length} services
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

      {/* Services List */}
      <Reorder.Group
        axis="y"
        values={processedServices}
        onReorder={reorderServices}
        className="space-y-4"
      >
        {processedServices.map((service, index) => {
          const IconComponent = getCategoryIcon(service.category);
          const colorClasses = getCategoryColor(service.category);
          const isExpanded = expandedItems.has(service.id);

          return (
            <Reorder.Item
              key={service.id}
              value={service}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div className={`bg-slate-800 rounded-lg border overflow-hidden ${service.isHighlighted ? 'border-primary' : 'border-slate-600'}`}>
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
                        <div className="flex items-center space-x-2">
                          <h4 className="text-white font-medium">{service.title}</h4>
                          {service.isHighlighted && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-white/60 text-sm">
                          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                          {service.timeframe && ` • ${service.timeframe}`}
                          {service.methodology && ` • ${service.methodology}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpanded(service.id)}
                      className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-700"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  {/* Key Points Preview */}
                  {service.keyPoints.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.keyPoints.slice(0, 3).map((point, idx) => (
                        <span key={idx} className="bg-slate-700 text-white/80 px-2 py-1 rounded text-xs">
                          {point.length > 30 ? point.substring(0, 30) + '...' : point}
                        </span>
                      ))}
                      {service.keyPoints.length > 3 && (
                        <span className="text-white/60 text-xs">+{service.keyPoints.length - 3} more</span>
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
                      <div className="space-y-4">
                        <div className="bg-slate-900 rounded p-4">
                          <h5 className="text-white font-semibold mb-3">{service.title}</h5>
                          <p className="text-white/80 text-sm mb-4">{service.description}</p>
                          
                          {service.keyPoints.length > 0 && (
                            <div className="mb-4">
                              <h6 className="text-white/90 font-medium mb-2">Key Capabilities</h6>
                              <ul className="text-white/70 text-sm space-y-1">
                                {service.keyPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {service.deliverables.length > 0 && (
                            <div>
                              <h6 className="text-white/90 font-medium mb-2">Deliverables</h6>
                              <ul className="text-white/70 text-sm space-y-1">
                                {service.deliverables.map((deliverable, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <div className="w-3 h-3 border border-primary rounded mt-0.5 flex-shrink-0" />
                                    <span>{deliverable}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Service Title</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => updateService(service.id, 'title', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Category</label>
                            <select
                              value={service.category}
                              onChange={(e) => updateService(service.id, 'category', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            >
                              <option value="operational">Operational Excellence</option>
                              <option value="digital">Digital Transformation</option>
                              <option value="strategic">Strategic Advisory</option>
                              <option value="consulting">Management Consulting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-white/80 text-sm mb-1">Description</label>
                          <textarea
                            value={service.description}
                            onChange={(e) => updateService(service.id, 'description', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2 min-h-[80px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Methodology</label>
                            <input
                              type="text"
                              value={service.methodology || ''}
                              onChange={(e) => updateService(service.id, 'methodology', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                              placeholder="Framework or approach"
                            />
                          </div>
                          <div>
                            <label className="block text-white/80 text-sm mb-1">Timeframe</label>
                            <input
                              type="text"
                              value={service.timeframe || ''}
                              onChange={(e) => updateService(service.id, 'timeframe', e.target.value)}
                              className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                              placeholder="e.g., 3-6 months"
                            />
                          </div>
                        </div>

                        {/* Key Points Management */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Key Capabilities</label>
                          <div className="space-y-2">
                            {service.keyPoints.map((point, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={point}
                                  onChange={(e) => {
                                    const newPoints = [...service.keyPoints];
                                    newPoints[idx] = e.target.value;
                                    updateService(service.id, 'keyPoints', newPoints);
                                  }}
                                  className="flex-1 bg-white border-slate-300 text-black rounded px-3 py-1 text-sm"
                                />
                                <button
                                  onClick={() => removeKeyPoint(service.id, idx)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addKeyPoint(service.id, '')}
                              className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Key Point</span>
                            </button>
                          </div>
                        </div>

                        {/* Deliverables Management */}
                        <div>
                          <label className="block text-white/80 text-sm mb-2">Deliverables</label>
                          <div className="space-y-2">
                            {service.deliverables.map((deliverable, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={deliverable}
                                  onChange={(e) => {
                                    const newDeliverables = [...service.deliverables];
                                    newDeliverables[idx] = e.target.value;
                                    updateService(service.id, 'deliverables', newDeliverables);
                                  }}
                                  className="flex-1 bg-white border-slate-300 text-black rounded px-3 py-1 text-sm"
                                />
                                <button
                                  onClick={() => removeDeliverable(service.id, idx)}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addDeliverable(service.id, '')}
                              className="flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Deliverable</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={service.isHighlighted}
                              onChange={(e) => updateService(service.id, 'isHighlighted', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-white/80 text-sm">Featured Service</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Element Info */}
                    <div className="text-xs text-white/40 pt-2 border-t border-slate-600">
                      DOM: {service.element.tagName.toLowerCase()}
                      {service.element.className && ` .${service.element.className.split(' ')[0]}`}
                      • Order: #{service.order + 1}
                      {service.isHighlighted && ' • Featured'}
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
          <Settings className="w-4 h-4 mr-2" />
          Services Management
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Drag services using grip handles to reorder presentation</li>
          <li>• Edit service descriptions, capabilities, and deliverables</li>
          <li>• Add methodology information and project timeframes</li>
          <li>• Mark services as featured to highlight core offerings</li>
          <li>• Categories help organize different types of services</li>
        </ul>
      </div>

      {/* Scan Status */}
      <div className="text-center">
        <button
          onClick={scanForContent}
          disabled={isScanning}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Re-scan for Services Content'}
        </button>
      </div>
    </div>
  );
}