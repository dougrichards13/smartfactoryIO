/**
 * WandaVision Smart Factory Adapter
 * Site-specific content detection and management for Smart Factory IO
 */

import { 
  ContentType, 
  ContentSignature,
  DetectionStrategy,
  ContentMap,
  UniversalContentScanner,
  ScanResult,
  EditableContent
} from '@smartfactory/wandavision-core';

/**
 * Smart Factory specific content signatures
 */
export const SMARTFACTORY_SIGNATURES: Record<ContentType, ContentSignature[]> = {
  [ContentType.METRICS]: [
    {
      patterns: [/847%/g, /8\.47x/g, /847 percent/gi],
      contextKeywords: ['growth', 'portfolio', 'engagement', 'client'],
      requiredProximity: 200,
      confidence: 0.95
    },
    {
      patterns: [/\$5B\+/g, /\$5 billion/gi, /five billion/gi],
      contextKeywords: ['value', 'creation', 'impact', 'total', 'cumulative'],
      requiredProximity: 150,
      confidence: 0.95
    },
    {
      patterns: [/4\.1x/g, /4\.1 multiplier/gi],
      contextKeywords: ['valuation', 'acquisition', 'multiplier', 'transformation'],
      requiredProximity: 100,
      confidence: 0.95
    },
    {
      patterns: [/15\+\s*(years?|yrs?)/gi, /fifteen years/gi],
      contextKeywords: ['experience', 'excellence', 'enterprise', 'delivery'],
      requiredProximity: 100,
      confidence: 0.9
    }
  ],

  [ContentType.PORTFOLIO]: [
    {
      patterns: [/\$410M.*\$1\.7B/gi, /acquisition.*multiplier/gi],
      contextKeywords: ['acquisition', 'transformation', 'valuation', 'exit'],
      requiredProximity: 300,
      confidence: 0.9
    },
    {
      patterns: [/manufacturing.*optimization/gi, /supply.*chain/gi],
      contextKeywords: ['efficiency', 'lean', 'operational', 'improvement'],
      requiredProximity: 200,
      confidence: 0.8
    },
    {
      patterns: [/digital.*transformation/gi, /platform.*modernization/gi],
      contextKeywords: ['technology', 'cloud', 'automation', 'digital'],
      requiredProximity: 250,
      confidence: 0.8
    }
  ],

  [ContentType.TESTIMONIALS]: [
    {
      patterns: [/"[^"]{50,300}"/g],
      contextKeywords: ['ceo', 'cto', 'president', 'director', 'testimonial'],
      requiredProximity: 150,
      confidence: 0.8
    },
    {
      patterns: [/Smart Factory.*exceptional/gi, /exceeded.*expectations/gi],
      contextKeywords: ['client', 'feedback', 'results', 'satisfaction'],
      requiredProximity: 200,
      confidence: 0.85
    }
  ],

  [ContentType.SERVICES]: [
    {
      patterns: [/operational.*excellence/gi, /lean.*transformation/gi],
      contextKeywords: ['consulting', 'services', 'methodology'],
      requiredProximity: 150,
      confidence: 0.8
    },
    {
      patterns: [/digital.*strategy/gi, /technology.*implementation/gi],
      contextKeywords: ['services', 'solutions', 'capabilities'],
      requiredProximity: 180,
      confidence: 0.8
    }
  ]
};

/**
 * Smart Factory specific disclaimers and professional statements
 */
export const SMARTFACTORY_DISCLAIMERS = {
  metrics: {
    '847%': 'Results documented through client engagement metrics. Individual results may vary based on business context, market conditions, and implementation scope.',
    '$5B+': 'Cumulative documented project impact across all client engagements since 2010. Impact calculated using client-reported metrics and verified third-party assessments.',
    '4.1x': 'Specific acquisition case study: $410M → $1.7B transformation. Results reflect documented valuation improvement through operational excellence and strategic positioning.',
    '15+ years': 'Consistent enterprise delivery track record since 2010. Verified through client testimonials and project completion records.'
  },
  portfolio: {
    manufacturing: 'Manufacturing optimization results vary by industry, facility size, and existing operational maturity. Typical engagements show 15-40% efficiency improvements.',
    digital: 'Digital transformation outcomes depend on legacy system complexity, organizational readiness, and implementation timeline. Success metrics verified through client reporting.'
  }
};

/**
 * Enhanced Smart Factory Content Scanner
 */
export class SmartFactoryContentScanner extends UniversalContentScanner {
  constructor() {
    super();
    this.enhanceWithSmartFactorySignatures();
  }

  private enhanceWithSmartFactorySignatures(): void {
    // Merge Smart Factory signatures with base signatures
    Object.entries(SMARTFACTORY_SIGNATURES).forEach(([type, signatures]) => {
      const contentType = type as ContentType;
      this.signatures[contentType] = [
        ...(this.signatures[contentType] || []),
        ...signatures
      ];
    });
  }

  /**
   * Smart Factory specific content scanning with enhanced context detection
   */
  public scanSmartFactoryContent(container?: HTMLElement): ContentMap {
    const baseResult = super.scan(container);
    
    // Enhance detected content with Smart Factory specific context
    const enhancedContent: ContentMap = {
      ...baseResult,
      sections: baseResult.sections.map(content => 
        this.enhanceContentWithSmartFactoryContext(content)
      )
    };

    return enhancedContent;
  }

  private enhanceContentWithSmartFactoryContext(content: EditableContent): EditableContent {
    const element = content.element;
    const textContent = element.textContent || '';
    
    // Add specific Smart Factory metadata
    const enhancedData = {
      ...content.content.data,
      disclaimers: this.extractRelevantDisclaimers(textContent),
      verificationDetails: this.extractVerificationDetails(textContent),
      smartFactorySpecific: true
    };

    // Enhance titles and descriptions for Smart Factory content
    if (content.content.type === ContentType.METRICS) {
      return this.enhanceMetricContent(content, enhancedData);
    }

    return {
      ...content,
      content: {
        ...content.content,
        data: enhancedData
      }
    };
  }

  private enhanceMetricContent(content: EditableContent, data: any): EditableContent {
    const textContent = content.element.textContent || '';
    let enhancedTitle = content.content.title;
    let enhancedDescription = content.content.description;

    // Smart Factory specific metric enhancements
    if (textContent.includes('847%')) {
      enhancedTitle = 'Portfolio Growth Excellence';
      enhancedDescription = 'Documented client engagement demonstrating sustained value creation through operational excellence methodology';
    } else if (textContent.includes('$5B')) {
      enhancedTitle = 'Total Value Creation';
      enhancedDescription = 'Cumulative documented project impact across all client engagements, verified through third-party assessments';
    } else if (textContent.includes('4.1x')) {
      enhancedTitle = 'Valuation Multiplier Achievement';
      enhancedDescription = 'Case study: $410M → $1.7B acquisition multiplier through strategic operational transformation';
    } else if (textContent.includes('15+') && textContent.toLowerCase().includes('year')) {
      enhancedTitle = 'Enterprise Excellence Track Record';
      enhancedDescription = 'Consistent high-value delivery since 2010, verified through client testimonials and completion records';
    }

    return {
      ...content,
      content: {
        ...content.content,
        title: enhancedTitle,
        description: enhancedDescription,
        data: {
          ...data,
          professionalContext: true
        }
      }
    };
  }

  private extractRelevantDisclaimers(textContent: string): string[] {
    const disclaimers: string[] = [];
    
    Object.entries(SMARTFACTORY_DISCLAIMERS.metrics).forEach(([pattern, disclaimer]) => {
      if (textContent.includes(pattern)) {
        disclaimers.push(disclaimer);
      }
    });

    return disclaimers;
  }

  private extractVerificationDetails(textContent: string): Record<string, any> {
    const verification: Record<string, any> = {};
    
    // Add verification context based on content patterns
    if (textContent.includes('847%')) {
      verification.method = 'Client engagement metrics analysis';
      verification.period = '2010-2024';
      verification.source = 'Third-party verified assessments';
    } else if (textContent.includes('$5B')) {
      verification.method = 'Cumulative project impact assessment';
      verification.period = '2010-2024';
      verification.source = 'Client-reported metrics and third-party verification';
    } else if (textContent.includes('4.1x')) {
      verification.method = 'Acquisition case study analysis';
      verification.period = 'Q2 2018 - Q4 2020';
      verification.source = 'Public acquisition records and transformation metrics';
    }

    return verification;
  }
}

/**
 * Smart Factory Content Integration Utilities
 */
export class SmartFactoryContentIntegration {
  private scanner: SmartFactoryContentScanner;

  constructor() {
    this.scanner = new SmartFactoryContentScanner();
  }

  /**
   * Scan and prepare Smart Factory content for WandaVision
   */
  public scanAndPrepareContent(): ContentMap {
    // Scan the entire page
    const contentMap = this.scanner.scanSmartFactoryContent();
    
    // Log scanning results for debugging
    console.log('🎯 Smart Factory Content Scan Complete:', {
      sectionsDetected: contentMap.sections.length,
      metricsSections: contentMap.sections.filter(s => s.content.type === ContentType.METRICS).length,
      portfolioSections: contentMap.sections.filter(s => s.content.type === ContentType.PORTFOLIO).length,
      testimonialSections: contentMap.sections.filter(s => s.content.type === ContentType.TESTIMONIALS).length,
      scanStats: contentMap.scanStats
    });

    return contentMap;
  }

  /**
   * Get professional disclaimers for display
   */
  public getDisclaimers(): typeof SMARTFACTORY_DISCLAIMERS {
    return SMARTFACTORY_DISCLAIMERS;
  }

  /**
   * Validate Smart Factory specific content
   */
  public validateSmartFactoryContent(content: EditableContent): boolean {
    // Add Smart Factory specific validation logic
    if (content.content.type === ContentType.METRICS) {
      return this.validateMetricContent(content);
    }
    
    return true;
  }

  private validateMetricContent(content: EditableContent): boolean {
    const data = content.content.data;
    
    // Ensure professional disclaimers are present for key metrics
    if (data?.detectedPatterns?.some((pattern: string) => 
      pattern.includes('847%') || pattern.includes('$5B') || pattern.includes('4.1x')
    )) {
      return data?.disclaimers && data.disclaimers.length > 0;
    }

    return true;
  }
}