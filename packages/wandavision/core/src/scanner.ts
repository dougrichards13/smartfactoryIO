/**
 * WandaVision Universal Intelligence - Content Scanner
 * Automatically detects and analyzes all content on any webpage
 */

import {
  ContentType,
  ContentPriority,
  DetectionConfidence,
  EditableContent,
  MetricData,
  PortfolioEntry,
  TestimonialData,
  ContentMap,
  ContentSection,
  ContentMetadata,
  ScanStatistics,
  DetectionStrategy,
  DetectionResult,
  generateId,
  createEditableContent,
  generateSelector
} from './types';

// ============================================================================
// CONTENT PATTERNS & SIGNATURES
// ============================================================================

const METRIC_PATTERNS = {
  financial: [
    /\$[0-9,]+(\.[0-9]+)?[BMK]?\+?/g,        // $5B+, $2.1M, $100K+
    /[0-9,]+(\.[0-9]+)?\s*(\$|USD|dollars?)/gi // 100 million dollars
  ],
  multiplier: [
    /[0-9]+(\.[0-9]+)?x/g,                   // 4.1x, 10x
    /[0-9]+(\.[0-9]+)?\s*times/gi            // 4.1 times
  ],
  percentage: [
    /[0-9]+(\.[0-9]+)?%/g,                   // 847%, 98.5%
    /[0-9]+(\.[0-9]+)?\s*percent/gi          // 85 percent
  ],
  years: [
    /[0-9]+\+?\s*(years?|yrs?)/gi,           // 15+ years, 10 yrs
    /(since|established|founded)\s*[0-9]{4}/gi // since 2010
  ],
  count: [
    /[0-9,]+\+?\s*(clients?|customers?|companies)/gi, // 500+ clients
    /[0-9,]+\+?\s*(projects?|engagements?)/gi         // 100+ projects
  ]
};

const CONTENT_SIGNATURES = {
  [ContentType.METRICS_DASHBOARD]: {
    selectors: [
      '[class*="metric"]', '[data-metric]', '[class*="kpi"]',
      '[class*="stat"]', '[class*="counter"]', '[class*="number"]',
      '[class*="result"]', '[class*="achievement"]'
    ],
    textPatterns: Object.values(METRIC_PATTERNS).flat(),
    classNamePatterns: [
      /metric/i, /kpi/i, /stat/i, /counter/i, /number/i,
      /result/i, /achievement/i, /impact/i, /growth/i
    ],
    positionIndicators: ['prominent', 'header', 'hero', 'top'],
    contextClues: ['proven', 'results', 'impact', 'growth', 'success']
  },

  [ContentType.PORTFOLIO_SHOWCASE]: {
    selectors: [
      '[class*="portfolio"]', '[class*="client"]', '[class*="case-study"]',
      '[class*="showcase"]', '[class*="project"]', '[class*="work"]'
    ],
    textPatterns: [
      /client/gi, /portfolio/gi, /case\s*study/gi, /project/gi,
      /fortune\s*500/gi, /enterprise/gi, /success\s*story/gi
    ],
    classNamePatterns: [
      /portfolio/i, /client/i, /case[-_]study/i, /showcase/i,
      /project/i, /work/i, /enterprise/i
    ],
    contextClues: ['clients', 'portfolio', 'projects', 'enterprise', 'success']
  },

  [ContentType.TESTIMONIALS]: {
    selectors: [
      '[class*="testimonial"]', '[class*="review"]', '[class*="quote"]',
      '[class*="feedback"]', '[class*="recommendation"]'
    ],
    textPatterns: [
      /\".+\"/g, /testimonial/gi, /review/gi, /feedback/gi,
      /recommendation/gi, /(ceo|cto|cfo|president|director)/gi
    ],
    classNamePatterns: [
      /testimonial/i, /review/i, /quote/i, /feedback/i,
      /recommendation/i, /social[-_]proof/i
    ],
    contextClues: ['testimonial', 'review', 'feedback', 'quote', 'clients say']
  },

  [ContentType.TEAM_PROFILES]: {
    selectors: [
      '[class*="team"]', '[class*="staff"]', '[class*="employee"]',
      '[class*="member"]', '[class*="leadership"]', '[class*="founder"]'
    ],
    textPatterns: [
      /(ceo|cto|cfo|founder|president|director|manager)/gi,
      /team/gi, /leadership/gi, /staff/gi
    ],
    classNamePatterns: [
      /team/i, /staff/i, /employee/i, /member/i,
      /leadership/i, /founder/i, /executive/i
    ],
    contextClues: ['team', 'leadership', 'staff', 'founders', 'executives']
  }
};

// ============================================================================
// DETECTION STRATEGIES
// ============================================================================

class SemanticAnalysisStrategy implements DetectionStrategy {
  name = 'semantic-analysis';
  weight = 0.4;

  analyze(element: HTMLElement): DetectionResult {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.toLowerCase() || '';
    const reasoning: string[] = [];
    let score = 0;
    let contentType = ContentType.CUSTOM;

    // Semantic HTML analysis
    if (tagName === 'header' || element.closest('header')) {
      if (textContent.includes('hero') || textContent.includes('banner')) {
        contentType = ContentType.HERO_SECTION;
        score += 30;
        reasoning.push('Found in header/hero context');
      }
    }

    if (tagName === 'section' || tagName === 'article') {
      if (textContent.includes('about')) {
        contentType = ContentType.ABOUT_SECTION;
        score += 25;
        reasoning.push('Section with "about" content');
      }
      
      if (textContent.includes('service') || textContent.includes('offering')) {
        contentType = ContentType.SERVICES;
        score += 25;
        reasoning.push('Section with services content');
      }
    }

    if (tagName === 'footer' || element.closest('footer')) {
      contentType = ContentType.FOOTER;
      score += 35;
      reasoning.push('Located in footer element');
    }

    return {
      contentType,
      confidence: this.scoreToConfidence(score),
      score,
      reasoning
    };
  }

  private scoreToConfidence(score: number): DetectionConfidence {
    if (score >= 80) return DetectionConfidence.CERTAIN;
    if (score >= 60) return DetectionConfidence.LIKELY;
    if (score >= 40) return DetectionConfidence.POSSIBLE;
    return DetectionConfidence.UNCERTAIN;
  }
}

class PatternMatchingStrategy implements DetectionStrategy {
  name = 'pattern-matching';
  weight = 0.3;

  analyze(element: HTMLElement): DetectionResult {
    const className = element.className?.toLowerCase() || '';
    const textContent = element.textContent || '';
    const reasoning: string[] = [];
    let maxScore = 0;
    let bestType = ContentType.CUSTOM;

    // Check each content type signature
    for (const [type, signature] of Object.entries(CONTENT_SIGNATURES)) {
      let typeScore = 0;

      // Class name patterns
      for (const pattern of signature.classNamePatterns) {
        if (pattern.test(className)) {
          typeScore += 25;
          reasoning.push(`Class matches ${type} pattern: ${pattern.source}`);
        }
      }

      // Text content patterns  
      for (const pattern of signature.textPatterns) {
        const matches = textContent.match(pattern);
        if (matches && matches.length > 0) {
          typeScore += matches.length * 10;
          reasoning.push(`Text matches ${type} pattern: ${matches.join(', ')}`);
        }
      }

      // Context clues
      for (const clue of signature.contextClues) {
        if (textContent.toLowerCase().includes(clue)) {
          typeScore += 15;
          reasoning.push(`Contains context clue: ${clue}`);
        }
      }

      if (typeScore > maxScore) {
        maxScore = typeScore;
        bestType = type as ContentType;
      }
    }

    return {
      contentType: bestType,
      confidence: this.scoreToConfidence(maxScore),
      score: maxScore,
      reasoning
    };
  }

  private scoreToConfidence(score: number): DetectionConfidence {
    if (score >= 70) return DetectionConfidence.CERTAIN;
    if (score >= 50) return DetectionConfidence.LIKELY;
    if (score >= 30) return DetectionConfidence.POSSIBLE;
    return DetectionConfidence.UNCERTAIN;
  }
}

class PositionalAnalysisStrategy implements DetectionStrategy {
  name = 'positional-analysis';
  weight = 0.2;

  analyze(element: HTMLElement): DetectionResult {
    const reasoning: string[] = [];
    let score = 0;
    let contentType = ContentType.CUSTOM;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isAboveFold = rect.top < viewportHeight;
    const isTopOfPage = rect.top < viewportHeight * 0.3;

    if (isTopOfPage && isAboveFold) {
      contentType = ContentType.HERO_SECTION;
      score += 40;
      reasoning.push('Located in top 30% of viewport (hero position)');
    }

    // Check if element is prominently positioned
    const isProminentSize = rect.width > window.innerWidth * 0.8 && rect.height > 100;
    if (isProminentSize) {
      score += 20;
      reasoning.push('Element has prominent size dimensions');
    }

    return {
      contentType,
      confidence: score >= 40 ? DetectionConfidence.LIKELY : DetectionConfidence.UNCERTAIN,
      score,
      reasoning
    };
  }
}

// ============================================================================
// MAIN CONTENT SCANNER
// ============================================================================

export class UniversalContentScanner {
  private strategies: DetectionStrategy[];
  private scanStartTime: number = 0;

  constructor() {
    this.strategies = [
      new SemanticAnalysisStrategy(),
      new PatternMatchingStrategy(), 
      new PositionalAnalysisStrategy()
    ];
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  async scanAllContent(): Promise<ContentMap> {
    this.scanStartTime = performance.now();
    console.log('🔍 WandaVision Universal Scanner - Starting full content scan...');

    const contentMap: ContentMap = {
      id: generateId(),
      url: window.location.href,
      title: document.title,
      detectedAt: new Date(),
      sections: {} as Record<ContentType, ContentSection[]>,
      metadata: this.extractMetadata(),
      scanStats: {
        elementsScanned: 0,
        contentItemsFound: 0,
        editableItemsFound: 0,
        confidenceDistribution: {
          [DetectionConfidence.CERTAIN]: 0,
          [DetectionConfidence.LIKELY]: 0,
          [DetectionConfidence.POSSIBLE]: 0,
          [DetectionConfidence.UNCERTAIN]: 0
        },
        typeDistribution: {} as Record<ContentType, number>,
        scanDuration: 0
      }
    };

    // Initialize section arrays
    Object.values(ContentType).forEach(type => {
      contentMap.sections[type] = [];
    });

    // Scan for metrics (priority for Smart Factory site)
    const metricsSection = await this.scanMetricsSection();
    if (metricsSection) {
      contentMap.sections[ContentType.METRICS_DASHBOARD] = [metricsSection];
      contentMap.scanStats.contentItemsFound += metricsSection.items.length;
    }

    // Scan for portfolio content
    const portfolioSection = await this.scanPortfolioSection();
    if (portfolioSection) {
      contentMap.sections[ContentType.PORTFOLIO_SHOWCASE] = [portfolioSection];
      contentMap.scanStats.contentItemsFound += portfolioSection.items.length;
    }

    // Scan for testimonials
    const testimonialSections = await this.scanTestimonialSections();
    contentMap.sections[ContentType.TESTIMONIALS] = testimonialSections;
    testimonialSections.forEach(section => {
      contentMap.scanStats.contentItemsFound += section.items.length;
    });

    // Update scan statistics
    contentMap.scanStats.scanDuration = performance.now() - this.scanStartTime;
    this.updateScanStatistics(contentMap);

    console.log('✅ WandaVision scan complete:', {
      sections: Object.keys(contentMap.sections).length,
      items: contentMap.scanStats.contentItemsFound,
      duration: `${contentMap.scanStats.scanDuration.toFixed(2)}ms`
    });

    return contentMap;
  }

  // ============================================================================
  // SMART FACTORY SPECIFIC SCANNERS
  // ============================================================================

  async scanMetricsSection(): Promise<ContentSection | null> {
    console.log('🔍 Scanning for metrics dashboard...');

    // Look for hardcoded metrics in ResultsSection and MetricsDashboard
    const metricsElements = document.querySelectorAll(
      // Target specific Smart Factory patterns
      '[class*="metric"], [data-metric], ' +
      '[class*="impact"], [class*="result"], ' +
      '[class*="dashboard"], [class*="kpi"], ' +
      // Look for large numbers/percentages
      '*:contains("847%"), *:contains("$5B"), *:contains("4.1x"), *:contains("15+")'
    );

    const detectedMetrics: EditableContent[] = [];
    const processedElements = new Set<HTMLElement>();

    // Also scan text content for metric patterns
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let textNode;
    while (textNode = walker.nextNode()) {
      const parentElement = textNode.parentElement;
      if (!parentElement || processedElements.has(parentElement)) continue;

      const textContent = textNode.textContent || '';
      
      // Check for Smart Factory specific metrics
      const metricMatches = [
        textContent.match(/847%/),
        textContent.match(/\$5B\+?/),
        textContent.match(/4\.1x/),
        textContent.match(/15\+?\s*(years?|yrs?)/i),
        textContent.match(/\$[0-9,]+[BMK]\+?/),
        textContent.match(/[0-9]+(\.[0-9]+)?%/),
        textContent.match(/[0-9]+\+?\s*(years?|clients?|projects?)/i)
      ].filter(Boolean);

      if (metricMatches.length > 0) {
        processedElements.add(parentElement);
        
        const editableContent = createEditableContent(
          parentElement,
          ContentType.METRICS_DASHBOARD,
          {
            priority: ContentPriority.HIGH,
            confidence: DetectionConfidence.CERTAIN,
            detectionMethod: 'pattern-matching-metrics',
            detectionScore: 95,
            content: {
              text: parentElement.textContent || '',
              html: parentElement.innerHTML,
              data: {
                detectedPatterns: metricMatches.map(match => match?.[0]).filter(Boolean),
                metricType: this.classifyMetric(textContent)
              }
            }
          }
        );

        detectedMetrics.push(editableContent);
        console.log('📊 Found metric:', {
          text: textContent.substring(0, 50) + '...',
          patterns: metricMatches.map(m => m?.[0]).filter(Boolean)
        });
      }
    }

    if (detectedMetrics.length === 0) {
      console.log('❌ No metrics found');
      return null;
    }

    return {
      id: generateId(),
      type: ContentType.METRICS_DASHBOARD,
      priority: ContentPriority.HIGH,
      confidence: DetectionConfidence.CERTAIN,
      items: detectedMetrics,
      title: 'Metrics Dashboard',
      element: detectedMetrics[0].element.closest('section') || detectedMetrics[0].element,
      selector: 'metrics-section'
    };
  }

  async scanPortfolioSection(): Promise<ContentSection | null> {
    console.log('🔍 Scanning for portfolio showcase...');

    // Look for Elite Client Portfolio in AboutSection
    const portfolioElements = document.querySelectorAll(
      '[class*="portfolio"], [class*="client"], [class*="case-study"], ' +
      '[class*="showcase"], [class*="enterprise"], ' +
      // Smart Factory specific
      '*:contains("Elite Client"), *:contains("Fortune 500"), *:contains("portfolio")'
    );

    const detectedPortfolio: EditableContent[] = [];
    
    // Look for hover-enabled portfolio cards
    const hoverCards = document.querySelectorAll('[class*="hover"], [class*="group"]');
    hoverCards.forEach(card => {
      const textContent = card.textContent?.toLowerCase() || '';
      
      if (textContent.includes('client') || 
          textContent.includes('portfolio') ||
          textContent.includes('fortune') ||
          textContent.includes('enterprise')) {
        
        const editableContent = createEditableContent(
          card as HTMLElement,
          ContentType.PORTFOLIO_SHOWCASE,
          {
            priority: ContentPriority.HIGH,
            confidence: DetectionConfidence.LIKELY,
            detectionMethod: 'portfolio-pattern-matching',
            detectionScore: 80,
            content: {
              data: {
                isHoverEnabled: card.classList.toString().includes('hover'),
                hasExpandedContent: !!card.querySelector('[class*="expand"], [class*="hover"]')
              }
            }
          }
        );

        detectedPortfolio.push(editableContent);
        console.log('🏢 Found portfolio entry:', {
          classes: card.className,
          preview: textContent.substring(0, 50) + '...'
        });
      }
    });

    if (detectedPortfolio.length === 0) {
      console.log('❌ No portfolio content found');
      return null;
    }

    return {
      id: generateId(),
      type: ContentType.PORTFOLIO_SHOWCASE,
      priority: ContentPriority.HIGH,
      confidence: DetectionConfidence.LIKELY,
      items: detectedPortfolio,
      title: 'Elite Client Portfolio',
      element: detectedPortfolio[0].element.closest('section') || detectedPortfolio[0].element,
      selector: 'portfolio-section'
    };
  }

  async scanTestimonialSections(): Promise<ContentSection[]> {
    console.log('🔍 Scanning for testimonials...');

    const testimonialElements = document.querySelectorAll(
      '[class*="testimonial"], [class*="review"], [class*="quote"], ' +
      '[class*="feedback"], [class*="client-say"]'
    );

    const detectedTestimonials: EditableContent[] = [];

    // Also look for quote patterns in text
    const quotePattern = /["'""]([^"'""]*)["'""][\s\S]*?[-–—]\s*([^,\n]*),?\s*([^,\n]*)/g;
    const bodyText = document.body.textContent || '';
    const quotes = bodyText.match(quotePattern);

    if (quotes && quotes.length > 0) {
      // Find elements containing these quotes
      quotes.forEach(quote => {
        const elements = document.querySelectorAll('*');
        for (const element of elements) {
          if (element.textContent?.includes(quote.substring(0, 20))) {
            const editableContent = createEditableContent(
              element as HTMLElement,
              ContentType.TESTIMONIALS,
              {
                priority: ContentPriority.MEDIUM,
                confidence: DetectionConfidence.LIKELY,
                detectionMethod: 'quote-pattern-matching',
                detectionScore: 75,
                content: {
                  data: {
                    detectedQuote: quote,
                    hasAuthorInfo: quote.includes(',') || quote.includes('—')
                  }
                }
              }
            );

            detectedTestimonials.push(editableContent);
            console.log('💬 Found testimonial:', quote.substring(0, 50) + '...');
            break;
          }
        }
      });
    }

    if (detectedTestimonials.length === 0) {
      return [];
    }

    return [{
      id: generateId(),
      type: ContentType.TESTIMONIALS,
      priority: ContentPriority.MEDIUM,
      confidence: DetectionConfidence.LIKELY,
      items: detectedTestimonials,
      title: 'Client Testimonials',
      element: detectedTestimonials[0].element.closest('section') || detectedTestimonials[0].element,
      selector: 'testimonials-section'
    }];
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private classifyMetric(text: string): string {
    if (METRIC_PATTERNS.financial.some(pattern => pattern.test(text))) return 'financial';
    if (METRIC_PATTERNS.multiplier.some(pattern => pattern.test(text))) return 'multiplier';
    if (METRIC_PATTERNS.percentage.some(pattern => pattern.test(text))) return 'percentage';
    if (METRIC_PATTERNS.years.some(pattern => pattern.test(text))) return 'time';
    if (METRIC_PATTERNS.count.some(pattern => pattern.test(text))) return 'count';
    return 'custom';
  }

  private extractMetadata(): ContentMetadata {
    const titleEl = document.querySelector('title');
    const descEl = document.querySelector('meta[name="description"]');
    const keywordsEl = document.querySelector('meta[name="keywords"]');
    
    return {
      framework: this.detectFramework(),
      language: document.documentElement.lang || 'en',
      charset: document.characterSet || 'UTF-8',
      title: titleEl?.textContent || '',
      description: descEl?.getAttribute('content') || '',
      keywords: keywordsEl?.getAttribute('content')?.split(',').map(k => k.trim()) || []
    };
  }

  private detectFramework(): ContentMetadata['framework'] {
    // Simple framework detection
    if (document.querySelector('#__next')) return 'react';
    if (document.querySelector('[data-reactroot]')) return 'react';
    if (document.querySelector('[data-v-]')) return 'vue';
    if (document.querySelector('[ng-version]')) return 'angular';
    if (document.querySelector('#wp-admin-bar-root')) return 'wordpress';
    return 'unknown';
  }

  private updateScanStatistics(contentMap: ContentMap): void {
    const stats = contentMap.scanStats;
    
    // Count items by confidence and type
    Object.values(contentMap.sections).flat().forEach(section => {
      section.items.forEach(item => {
        stats.confidenceDistribution[item.confidence]++;
        stats.typeDistribution[item.type] = (stats.typeDistribution[item.type] || 0) + 1;
        if (item.isEditable) stats.editableItemsFound++;
      });
    });

    console.log('📈 Scan Statistics:', {
      duration: `${stats.scanDuration.toFixed(2)}ms`,
      contentItems: stats.contentItemsFound,
      editableItems: stats.editableItemsFound,
      confidence: stats.confidenceDistribution,
      types: stats.typeDistribution
    });
  }
}