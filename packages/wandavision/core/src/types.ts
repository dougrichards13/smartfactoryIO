/**
 * WandaVision Universal Intelligence - Core Types
 * Framework-agnostic content detection and management system
 */

import { nanoid } from 'nanoid';

// ============================================================================
// CONTENT TYPES & CLASSIFICATION
// ============================================================================

export enum ContentType {
  HERO_SECTION = 'hero',
  ABOUT_SECTION = 'about', 
  SERVICES = 'services',
  METRICS_DASHBOARD = 'metrics',
  TESTIMONIALS = 'testimonials',
  TEAM_PROFILES = 'team',
  CONTACT_INFO = 'contact',
  PORTFOLIO_SHOWCASE = 'portfolio',
  FOOTER = 'footer',
  NAVIGATION = 'navigation',
  CTA_BUTTONS = 'cta',
  SOCIAL_MEDIA = 'social',
  CUSTOM = 'custom'
}

export enum ContentPriority {
  CRITICAL = 'critical',    // Hero, primary CTAs
  HIGH = 'high',           // About, Services, Contact
  MEDIUM = 'medium',       // Metrics, Testimonials
  LOW = 'low',             // Footer, Social
  OPTIONAL = 'optional'    // Custom sections
}

export enum DetectionConfidence {
  CERTAIN = 'certain',     // 95%+ confidence
  LIKELY = 'likely',       // 80-95% confidence  
  POSSIBLE = 'possible',   // 60-80% confidence
  UNCERTAIN = 'uncertain'  // <60% confidence
}

// ============================================================================
// CONTENT DETECTION & ANALYSIS
// ============================================================================

export interface DetectionStrategy {
  name: string;
  weight: number;
  analyze: (element: HTMLElement) => DetectionResult;
}

export interface DetectionResult {
  contentType: ContentType;
  confidence: DetectionConfidence;
  score: number; // 0-100
  reasoning: string[];
  metadata?: Record<string, any>;
}

export interface ContentSignature {
  selectors: string[];
  textPatterns: RegExp[];
  classNamePatterns: RegExp[];
  attributePatterns: Record<string, RegExp>;
  positionIndicators: string[];
  contextClues: string[];
}

// ============================================================================
// EDITABLE CONTENT STRUCTURES
// ============================================================================

export interface EditableContent {
  id: string;
  type: ContentType;
  priority: ContentPriority;
  confidence: DetectionConfidence;
  
  // DOM reference
  element: HTMLElement;
  selector: string;
  
  // Content data
  content: {
    text?: string;
    html?: string;
    attributes?: Record<string, string>;
    styles?: Record<string, string>;
    data?: Record<string, any>;
  };
  
  // Editing metadata  
  isEditable: boolean;
  validationRules?: ValidationRule[];
  dependencies?: string[]; // Related content IDs
  lastModified?: Date;
  
  // Detection metadata
  detectionMethod: string;
  detectionScore: number;
  originalContent?: any; // For reset functionality
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value: any;
  message: string;
  validator?: (value: any) => boolean;
}

// ============================================================================
// METRICS & KPI DETECTION
// ============================================================================

export interface MetricData {
  id: string;
  value: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  color?: string;
  category: 'financial' | 'growth' | 'time' | 'percentage' | 'count' | 'custom';
  
  // Detection metadata
  element: HTMLElement;
  valueElement?: HTMLElement;
  titleElement?: HTMLElement;
  
  // Validation patterns
  valuePattern: RegExp;
  isEditable: boolean;
}

export interface MetricsSection {
  id: string;
  title: string;
  metrics: MetricData[];
  disclaimers?: DisclaimerData[];
  verification?: VerificationData;
}

export interface DisclaimerData {
  id: string;
  type: 'legal' | 'professional' | 'verification' | 'compliance';
  title: string;
  content: string;
  isExpandable: boolean;
  element?: HTMLElement;
}

export interface VerificationData {
  available: boolean;
  methods: string[];
  certifications: string[];
  sources: string[];
  lastUpdated: Date;
}

// ============================================================================
// PORTFOLIO & CLIENT SHOWCASE
// ============================================================================

export interface PortfolioEntry {
  id: string;
  category: string;
  description: string;
  publicClients: string[];
  privateClients: string[];
  impact: string;
  engagement: string;
  
  // UI elements
  element: HTMLElement;
  isHoverEnabled: boolean;
  expandedContent?: HTMLElement;
}

export interface PortfolioSection {
  id: string;
  title: string;
  entries: PortfolioEntry[];
  summary?: PortfolioSummary;
}

export interface PortfolioSummary {
  totalImpact: { value: string; title: string; subtitle?: string };
  majorEnterprises: { value: string; title: string; subtitle?: string };
  clientRetention: { value: string; title: string; subtitle?: string };
}

// ============================================================================
// TESTIMONIALS & SOCIAL PROOF
// ============================================================================

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating?: number;
  impact?: string;
  
  // Visual elements
  element: HTMLElement;
  avatar?: string;
  companyLogo?: string;
}

// ============================================================================
// CONTENT SCANNING & MAPPING
// ============================================================================

export interface ContentMap {
  id: string;
  url: string;
  title: string;
  detectedAt: Date;
  
  // Detected sections
  sections: Record<ContentType, ContentSection[]>;
  
  // Global content
  metadata: ContentMetadata;
  
  // Scan statistics
  scanStats: ScanStatistics;
}

export interface ContentSection {
  id: string;
  type: ContentType;
  priority: ContentPriority;
  confidence: DetectionConfidence;
  
  // Content items in this section
  items: EditableContent[];
  
  // Section metadata
  title?: string;
  element: HTMLElement;
  selector: string;
  
  // Relationships
  dependencies?: string[];
  children?: string[];
  parent?: string;
}

export interface ContentMetadata {
  framework?: 'react' | 'vue' | 'angular' | 'wordpress' | 'static' | 'unknown';
  language: string;
  charset: string;
  viewport?: string;
  
  // SEO metadata
  title?: string;
  description?: string;
  keywords?: string[];
  
  // Schema.org data
  structuredData?: Record<string, any>[];
  
  // Social metadata  
  openGraph?: Record<string, string>;
  twitterCard?: Record<string, string>;
}

export interface ScanStatistics {
  elementsScanned: number;
  contentItemsFound: number;
  editableItemsFound: number;
  confidenceDistribution: Record<DetectionConfidence, number>;
  typeDistribution: Record<ContentType, number>;
  scanDuration: number; // milliseconds
}

// ============================================================================
// PERSISTENCE & STATE MANAGEMENT
// ============================================================================

export interface ContentUpdate {
  contentId: string;
  field: string;
  value: any;
  timestamp: Date;
  userId?: string;
}

export interface PersistenceStrategy {
  name: string;
  save: (contentId: string, data: any) => Promise<void>;
  load: (contentId: string) => Promise<any>;
  delete: (contentId: string) => Promise<void>;
  list: () => Promise<string[]>;
}

// ============================================================================
// PLUGIN & EXTENSION INTERFACES  
// ============================================================================

export interface ContentDetectionPlugin {
  name: string;
  version: string;
  supports: ContentType[];
  priority: number;
  
  detect: (context: DetectionContext) => Promise<EditableContent[]>;
  validate?: (content: EditableContent) => ValidationResult;
  optimize?: (content: EditableContent) => OptimizationSuggestion[];
}

export interface DetectionContext {
  document: Document;
  url: string;
  framework?: string;
  metadata: ContentMetadata;
  existingContent: EditableContent[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface OptimizationSuggestion {
  type: 'seo' | 'conversion' | 'accessibility' | 'performance' | 'branding';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  implementation?: string;
  expectedImpact?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateId(): string {
  return nanoid();
}

export function createEditableContent(
  element: HTMLElement,
  type: ContentType,
  overrides: Partial<EditableContent> = {}
): EditableContent {
  return {
    id: generateId(),
    type,
    priority: ContentPriority.MEDIUM,
    confidence: DetectionConfidence.POSSIBLE,
    element,
    selector: generateSelector(element),
    content: {
      text: element.textContent || '',
      html: element.innerHTML,
      attributes: getElementAttributes(element),
    },
    isEditable: true,
    detectionMethod: 'manual',
    detectionScore: 50,
    lastModified: new Date(),
    ...overrides
  };
}

export function generateSelector(element: HTMLElement): string {
  // Simple selector generation - can be enhanced
  const id = element.id;
  if (id) return `#${id}`;
  
  const className = element.className;
  if (className && typeof className === 'string') {
    const classes = className.trim().split(/\s+/).slice(0, 2);
    return `.${classes.join('.')}`;
  }
  
  return element.tagName.toLowerCase();
}

export function getElementAttributes(element: HTMLElement): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    attrs[attr.name] = attr.value;
  }
  return attrs;
}