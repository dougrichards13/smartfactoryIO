/**
 * WandaVision Universal Intelligence - React Provider
 * Extends existing ContentContext with universal content detection
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UniversalContentScanner, 
  ContentMap, 
  ContentType, 
  EditableContent,
  createWandaVisionScanner
} from '@smartfactory/wandavision-core';

// ============================================================================
// UNIVERSAL CONTENT CONTEXT
// ============================================================================

export interface UniversalContentState {
  // Auto-detected content from scanner
  detectedContent: ContentMap | null;
  isScanning: boolean;
  scanError: string | null;
  
  // Scanner instance
  scanner: UniversalContentScanner;
  
  // Universal content operations
  scanForContent: () => Promise<void>;
  updateDetectedContent: (contentId: string, updates: Partial<EditableContent>) => void;
  getContentByType: (type: ContentType) => EditableContent[];
  getContentById: (id: string) => EditableContent | null;
  
  // Feature flags
  features: {
    universalScanning: boolean;
    metricsDetection: boolean;
    portfolioDetection: boolean;
  };
}

const UniversalContentContext = createContext<UniversalContentState | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface UniversalContentProviderProps {
  children: ReactNode;
  enableUniversalScan?: boolean;
  autoScanOnMount?: boolean;
  features?: {
    universalScanning?: boolean;
    metricsDetection?: boolean;
    portfolioDetection?: boolean;
  };
}

export function UniversalContentProvider({
  children,
  enableUniversalScan = true,
  autoScanOnMount = true,
  features = {}
}: UniversalContentProviderProps) {
  // State
  const [detectedContent, setDetectedContent] = useState<ContentMap | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanner] = useState(() => createWandaVisionScanner());

  // Merged features
  const mergedFeatures = {
    universalScanning: features.universalScanning ?? true,
    metricsDetection: features.metricsDetection ?? true,
    portfolioDetection: features.portfolioDetection ?? true,
  };

  // ============================================================================
  // SCANNING OPERATIONS
  // ============================================================================

  const scanForContent = async (): Promise<void> => {
    if (!enableUniversalScan || isScanning) return;
    
    setIsScanning(true);
    setScanError(null);
    
    try {
      console.log('🚀 UniversalContentProvider - Starting content scan...');
      const contentMap = await scanner.scanAllContent();
      setDetectedContent(contentMap);
      
      console.log('✅ Universal scan complete:', {
        sections: Object.keys(contentMap.sections).length,
        items: contentMap.scanStats.contentItemsFound,
        editableItems: contentMap.scanStats.editableItemsFound
      });
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('wandavision:content-detected', {
        detail: { contentMap }
      }));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown scan error';
      setScanError(errorMessage);
      console.error('❌ Universal scan failed:', error);
      
    } finally {
      setIsScanning(false);
    }
  };

  // ============================================================================
  // CONTENT OPERATIONS
  // ============================================================================

  const updateDetectedContent = (contentId: string, updates: Partial<EditableContent>): void => {
    if (!detectedContent) return;

    const updatedContentMap = { ...detectedContent };
    let updated = false;

    // Find and update the content item
    Object.values(updatedContentMap.sections).flat().forEach(section => {
      const itemIndex = section.items.findIndex(item => item.id === contentId);
      if (itemIndex !== -1) {
        section.items[itemIndex] = { ...section.items[itemIndex], ...updates };
        updated = true;
      }
    });

    if (updated) {
      setDetectedContent(updatedContentMap);
      console.log('📝 Updated detected content:', contentId, updates);
      
      // Dispatch update event
      window.dispatchEvent(new CustomEvent('wandavision:content-updated', {
        detail: { contentId, updates }
      }));
    }
  };

  const getContentByType = (type: ContentType): EditableContent[] => {
    if (!detectedContent || !detectedContent.sections[type]) return [];
    return detectedContent.sections[type].flatMap(section => section.items);
  };

  const getContentById = (id: string): EditableContent | null => {
    if (!detectedContent) return null;

    for (const sections of Object.values(detectedContent.sections)) {
      for (const section of sections) {
        const item = section.items.find(item => item.id === id);
        if (item) return item;
      }
    }
    return null;
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Auto-scan on mount
  useEffect(() => {
    if (autoScanOnMount && enableUniversalScan) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        scanForContent();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoScanOnMount, enableUniversalScan]);

  // Listen for DOM changes and re-scan if needed
  useEffect(() => {
    if (!enableUniversalScan || !mergedFeatures.universalScanning) return;

    const observer = new MutationObserver((mutations) => {
      const hasSignificantChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).textContent && 
          (node as Element).textContent.length > 20
        )
      );

      if (hasSignificantChanges) {
        console.log('🔄 Significant DOM changes detected, re-scanning...');
        // Debounce re-scanning
        clearTimeout((observer as any).timer);
        (observer as any).timer = setTimeout(scanForContent, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
      clearTimeout((observer as any).timer);
    };
  }, [enableUniversalScan, mergedFeatures.universalScanning]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: UniversalContentState = {
    detectedContent,
    isScanning,
    scanError,
    scanner,
    scanForContent,
    updateDetectedContent,
    getContentByType,
    getContentById,
    features: mergedFeatures
  };

  return (
    <UniversalContentContext.Provider value={contextValue}>
      {children}
    </UniversalContentContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useUniversalContent(): UniversalContentState {
  const context = useContext(UniversalContentContext);
  if (!context) {
    throw new Error('useUniversalContent must be used within UniversalContentProvider');
  }
  return context;
}

// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================

export function useDetectedMetrics() {
  const { getContentByType } = useUniversalContent();
  return getContentByType(ContentType.METRICS_DASHBOARD);
}

export function useDetectedPortfolio() {
  const { getContentByType } = useUniversalContent();
  return getContentByType(ContentType.PORTFOLIO_SHOWCASE);
}

export function useDetectedTestimonials() {
  const { getContentByType } = useUniversalContent();
  return getContentByType(ContentType.TESTIMONIALS);
}

export function useContentScanner() {
  const { scanner, scanForContent, isScanning } = useUniversalContent();
  return { scanner, scanForContent, isScanning };
}

// ============================================================================
// STATUS COMPONENT (DEBUGGING)
// ============================================================================

export function UniversalContentStatus() {
  const { detectedContent, isScanning, scanError, features } = useUniversalContent();

  if (!features.universalScanning) {
    return (
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded text-xs z-50">
        WandaVision: Universal scanning disabled
      </div>
    );
  }

  if (scanError) {
    return (
      <div className="fixed top-4 right-4 bg-red-800 text-white p-2 rounded text-xs z-50">
        WandaVision Error: {scanError}
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="fixed top-4 right-4 bg-blue-800 text-white p-2 rounded text-xs z-50 animate-pulse">
        🔍 WandaVision: Scanning content...
      </div>
    );
  }

  if (!detectedContent) {
    return (
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded text-xs z-50">
        WandaVision: No content detected yet
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-800 text-white p-2 rounded text-xs z-50">
      ✅ WandaVision: {detectedContent.scanStats.contentItemsFound} items detected
    </div>
  );
}