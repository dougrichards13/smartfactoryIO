/**
 * WandaVision Universal Intelligence - Core Package
 * Framework-agnostic content detection and management system
 */

// Export all types
export * from './types';

// Export main scanner
export { UniversalContentScanner } from './scanner';

// Core API
export {
  generateId,
  createEditableContent,
  generateSelector,
  getElementAttributes
} from './types';

// Version info
export const VERSION = '0.1.0';
export const PACKAGE_NAME = '@smartfactory/wandavision-core';

// Main factory function for easy initialization
export function createWandaVisionScanner() {
  return new UniversalContentScanner();
}

// Feature flags for progressive enhancement
export const FEATURES = {
  UNIVERSAL_SCANNING: true,
  METRICS_DETECTION: true,
  PORTFOLIO_DETECTION: true,
  TESTIMONIAL_DETECTION: true,
  AI_OPTIMIZATION: false, // Future feature
  CLOUD_SYNC: false       // Future feature
} as const;

// Public API surface
export interface WandaVisionCore {
  scanner: UniversalContentScanner;
  version: string;
  features: typeof FEATURES;
}

export function createWandaVision(): WandaVisionCore {
  return {
    scanner: new UniversalContentScanner(),
    version: VERSION,
    features: FEATURES
  };
}