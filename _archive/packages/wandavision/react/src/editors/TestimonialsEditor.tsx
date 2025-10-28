/**
 * WandaVision Universal Intelligence - Testimonials Editor
 * Intelligently detects and edits client testimonials with author management and credibility indicators
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, User, Building, Star, Eye, Quote, Plus, X, Shield, Check } from 'lucide-react';
import { ContentType } from '@smartfactory/wandavision-core';
import { useUniversalContent, useDetectedTestimonials } from '../UniversalContentProvider';

interface TestimonialsEditorProps {
  onContentChange: () => void;
}

interface DetectedTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  companyName: string;
  industry?: string;
  credibilityScore: number;
  isVerified: boolean;
  photoUrl?: string;
  linkedinUrl?: string;
  element: HTMLElement;
  isEditable: boolean;
}

export function TestimonialsEditor({ onContentChange }: TestimonialsEditorProps) {
  const { updateDetectedContent, scanForContent, isScanning } = useUniversalContent();
  const detectedTestimonials = useDetectedTestimonials();
  
  const [processedTestimonials, setProcessedTestimonials] = useState<DetectedTestimonial[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // ============================================================================
  // PROCESS DETECTED TESTIMONIALS
  // ============================================================================

  useEffect(() => {
    const processed = detectedTestimonials.map(content => {
      const element = content.element;
      const textContent = element.textContent || '';
      
      // Extract testimonial information
      let quote = '';
      let authorName = '';
      let authorTitle = '';
      let companyName = '';
      let industry = '';
      let credibilityScore = 0.5;
      let isVerified = false;

      // Extract quote - look for quoted text
      const quotePatterns = [
        /"([^"]{20,500})"/g,
        /'([^']{20,500})'/g,
        /["""]([^"""]{20,500})["""/g
      ];
      
      for (const pattern of quotePatterns) {
        const match = textContent.match(pattern);
        if (match && match[1]) {
          quote = match[1];
          break;
        }
      }

      // If no quoted text, take a reasonable portion
      if (!quote && textContent.length > 20) {
        quote = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
      }

      // Smart Factory specific testimonials
      if (textContent.toLowerCase().includes('smart factory') || textContent.toLowerCase().includes('exceeded expectations')) {
        if (!authorName) authorName = 'Manufacturing Executive';
        if (!authorTitle) authorTitle = 'Chief Operating Officer';
        if (!companyName) companyName = 'Fortune 500 Manufacturing';
        industry = 'Advanced Manufacturing';
        credibilityScore = 0.9;
        isVerified = true;
      }

      // Extract author info from context
      const contextInfo = extractAuthorInfo(element);
      if (contextInfo.name) authorName = contextInfo.name;
      if (contextInfo.title) authorTitle = contextInfo.title;
      if (contextInfo.company) companyName = contextInfo.company;
      if (contextInfo.industry) industry = contextInfo.industry;

      // Calculate credibility score
      credibilityScore = calculateCredibilityScore({
        hasFullName: authorName.includes(' '),
        hasTitle: authorTitle.length > 0,
        hasCompany: companyName.length > 0,
        hasIndustry: industry.length > 0,
        quoteLength: quote.length,
        hasSpecificDetails: quote.includes('%') || quote.includes('$') || quote.includes('month') || quote.includes('improvement')
      });

      return {
        id: content.id,
        quote,
        authorName: authorName || 'Client Executive',
        authorTitle: authorTitle || 'Leadership Role',
        companyName: companyName || 'Enterprise Client',
        industry,
        credibilityScore,
        isVerified,
        element,
        isEditable: content.isEditable
      };
    });

    setProcessedTestimonials(processed);
    console.log('💬 Processed testimonials:', processed);
  }, [detectedTestimonials]);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  function extractAuthorInfo(element: HTMLElement): { name?: string; title?: string; company?: string; industry?: string } {
    const parent = element.closest('section, article, div, .testimonial, .review, .quote');
    if (!parent) return {};

    const text = parent.textContent || '';
    
    // Look for name patterns
    const namePatterns = [
      /[-–—]\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
      /by\s+([A-Z][a-z]+ [A-Z][a-z]+)/gi,
      /([A-Z][a-z]+ [A-Z][a-z]+),?\s+(CEO|CTO|COO|President|Director|Manager)/gi
    ];

    let name = '';
    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        name = match[1];
        break;
      }
    }

    // Look for title patterns
    const titlePatterns = [
      /(CEO|CTO|COO|Chief [A-Z][a-z]+ Officer|President|Director|VP|Vice President|Manager)/gi
    ];

    let title = '';
    for (const pattern of titlePatterns) {
      const match = text.match(pattern);
      if (match && match[0]) {
        title = match[0];
        break;
      }
    }

    // Look for company patterns
    const companyPatterns = [
      /at\s+([A-Z][A-Za-z\s&]{2,30})/g,
      /,\s+([A-Z][A-Za-z\s&]{2,30})$/g
    ];

    let company = '';
    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        company = match[1];
        break;
      }
    }

    return { name, title, company };
  }

  function calculateCredibilityScore(factors: {
    hasFullName: boolean;
    hasTitle: boolean;
    hasCompany: boolean;
    hasIndustry: boolean;
    quoteLength: number;
    hasSpecificDetails: boolean;
  }): number {
    let score = 0.3; // Base score

    if (factors.hasFullName) score += 0.15;
    if (factors.hasTitle) score += 0.15;
    if (factors.hasCompany) score += 0.15;
    if (factors.hasIndustry) score += 0.1;
    if (factors.quoteLength > 50) score += 0.1;
    if (factors.hasSpecificDetails) score += 0.15;

    return Math.min(1.0, score);
  }

  function updateTestimonial(id: string, field: string, value: any) {
    setProcessedTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === id 
          ? { 
              ...testimonial, 
              [field]: value,
              // Recalculate credibility score when relevant fields change
              credibilityScore: field === 'authorName' || field === 'authorTitle' || field === 'companyName' || field === 'quote'
                ? calculateCredibilityScore({
                    hasFullName: (field === 'authorName' ? value : testimonial.authorName).includes(' '),
                    hasTitle: (field === 'authorTitle' ? value : testimonial.authorTitle).length > 0,
                    hasCompany: (field === 'companyName' ? value : testimonial.companyName).length > 0,
                    hasIndustry: testimonial.industry?.length > 0 || false,
                    quoteLength: (field === 'quote' ? value : testimonial.quote).length,
                    hasSpecificDetails: (field === 'quote' ? value : testimonial.quote).includes('%') || (field === 'quote' ? value : testimonial.quote).includes('$')
                  })
                : testimonial.credibilityScore
            }
          : testimonial
      )
    );

    // Update in universal content
    updateDetectedContent(id, {
      content: {
        ...detectedTestimonials.find(t => t.id === id)?.content,
        data: {
          ...detectedTestimonials.find(t => t.id === id)?.content.data,
          [field]: value
        }
      }
    });

    onContentChange();
  }

  function getCredibilityColor(score: number): string {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  }

  function getCredibilityLabel(score: number): string {
    if (score >= 0.8) return 'High Credibility';
    if (score >= 0.6) return 'Medium Credibility';
    return 'Low Credibility';
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
          <MessageCircle className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold">Client Testimonials</h3>
        </div>
        <div className="bg-slate-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/80">Scanning for testimonials...</p>
        </div>
      </div>
    );
  }

  if (processedTestimonials.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Client Testimonials</h3>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
          <div className="text-center text-white/60">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="mb-2">No testimonials detected</p>
            <p className="text-sm text-white/40">
              WandaVision automatically detects client testimonials, reviews, and quotes.
            </p>
            <button
              onClick={scanForContent}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-sm"
            >
              Scan for Testimonials
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
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Client Testimonials</h3>
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
            {processedTestimonials.length} testimonials
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

      {/* Testimonials List */}
      <div className="space-y-4">
        {processedTestimonials.map((testimonial, index) => {
          const isExpanded = expandedItems.has(testimonial.id);
          const credibilityColor = getCredibilityColor(testimonial.credibilityScore);

          return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-slate-700 rounded">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{testimonial.authorName}</h4>
                        {testimonial.isVerified && (
                          <div className="flex items-center space-x-1">
                            <Check className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500">Verified</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white/60 text-sm">
                        {testimonial.authorTitle}
                        {testimonial.companyName && ` at ${testimonial.companyName}`}
                        {testimonial.industry && ` • ${testimonial.industry}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Shield className={`w-4 h-4 ${credibilityColor}`} />
                      <span className={`text-xs ${credibilityColor}`}>
                        {Math.round(testimonial.credibilityScore * 100)}%
                      </span>
                    </div>
                    <button
                      onClick={() => toggleExpanded(testimonial.id)}
                      className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-slate-700"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                </div>

                {/* Quote Preview */}
                <div className="bg-slate-700 rounded p-3 relative">
                  <Quote className="w-4 h-4 text-primary absolute top-2 left-2" />
                  <p className="text-white/90 text-sm pl-6 italic">
                    {testimonial.quote.length > 120 
                      ? testimonial.quote.substring(0, 120) + '...' 
                      : testimonial.quote
                    }
                  </p>
                </div>
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
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white/60" />
                          </div>
                          <div className="flex-1">
                            <blockquote className="text-white italic text-lg mb-4">
                              "{testimonial.quote}"
                            </blockquote>
                            <div className="text-white/80">
                              <div className="font-semibold">{testimonial.authorName}</div>
                              <div className="text-sm">{testimonial.authorTitle}</div>
                              <div className="text-sm text-white/60">{testimonial.companyName}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Credibility Indicators */}
                      <div className="bg-slate-900 rounded p-3">
                        <h6 className="text-white/80 text-sm font-medium mb-2">Credibility Indicators</h6>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${testimonial.authorName.includes(' ') ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-white/60">Full Name</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${testimonial.authorTitle ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-white/60">Job Title</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${testimonial.companyName ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-white/60">Company Name</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${testimonial.quote.length > 50 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            <span className="text-white/60">Detailed Quote</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/80 text-sm mb-1">Testimonial Quote</label>
                        <textarea
                          value={testimonial.quote}
                          onChange={(e) => updateTestimonial(testimonial.id, 'quote', e.target.value)}
                          className="w-full bg-white border-slate-300 text-black rounded px-3 py-2 min-h-[100px]"
                          placeholder="Enter the client testimonial..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/80 text-sm mb-1">Author Name</label>
                          <input
                            type="text"
                            value={testimonial.authorName}
                            onChange={(e) => updateTestimonial(testimonial.id, 'authorName', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm mb-1">Job Title</label>
                          <input
                            type="text"
                            value={testimonial.authorTitle}
                            onChange={(e) => updateTestimonial(testimonial.id, 'authorTitle', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            placeholder="e.g., CEO, Director"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/80 text-sm mb-1">Company Name</label>
                          <input
                            type="text"
                            value={testimonial.companyName}
                            onChange={(e) => updateTestimonial(testimonial.id, 'companyName', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            placeholder="Company name"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm mb-1">Industry</label>
                          <input
                            type="text"
                            value={testimonial.industry || ''}
                            onChange={(e) => updateTestimonial(testimonial.id, 'industry', e.target.value)}
                            className="w-full bg-white border-slate-300 text-black rounded px-3 py-2"
                            placeholder="Industry (optional)"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={testimonial.isVerified}
                            onChange={(e) => updateTestimonial(testimonial.id, 'isVerified', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-white/80 text-sm">Verified Testimonial</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <Shield className={`w-4 h-4 ${credibilityColor}`} />
                          <span className={`text-sm ${credibilityColor}`}>
                            {getCredibilityLabel(testimonial.credibilityScore)} ({Math.round(testimonial.credibilityScore * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Element Info */}
                  <div className="text-xs text-white/40 pt-2 border-t border-slate-600">
                    DOM: {testimonial.element.tagName.toLowerCase()}
                    {testimonial.element.className && ` .${testimonial.element.className.split(' ')[0]}`}
                    • Credibility: {Math.round(testimonial.credibilityScore * 100)}%
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          Testimonial Management
        </h4>
        <ul className="text-xs text-white/60 space-y-1">
          <li>• Edit testimonial content, author details, and company information</li>
          <li>• Credibility scores are calculated based on completeness and detail</li>
          <li>• Mark testimonials as verified to display trust indicators</li>
          <li>• Use Preview mode to see how testimonials appear on the website</li>
          <li>• Higher credibility scores improve social proof and trust</li>
        </ul>
      </div>

      {/* Scan Status */}
      <div className="text-center">
        <button
          onClick={scanForContent}
          disabled={isScanning}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Re-scan for Testimonials'}
        </button>
      </div>
    </div>
  );
}