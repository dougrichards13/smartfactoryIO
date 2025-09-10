import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Import all content files
import heroContent from '../../content/hero.json';
import aboutContent from '../../content/about.json';

// Define content structure
interface ContentState {
  hero: typeof heroContent;
  about: typeof aboutContent;
}

interface ContentContextType {
  content: ContentState;
  updateHeroContent: (updates: Partial<typeof heroContent>) => void;
  updateAboutContent: (updates: Partial<typeof aboutContent>) => void;
  resetSection: (section: keyof ContentState) => void;
  resetAll: () => void;
}

// Create context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Original content for reset functionality
const originalContent: ContentState = {
  hero: heroContent,
  about: aboutContent,
};

// Provider component
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(originalContent);

  // Update hero content
  const updateHeroContent = (updates: Partial<typeof heroContent>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
    console.log('ContentContext - Hero updated:', updates);
  };

  // Update about content
  const updateAboutContent = (updates: Partial<typeof aboutContent>) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, ...updates }
    }));
    console.log('ContentContext - About updated:', updates);
  };

  // Reset specific section
  const resetSection = (section: keyof ContentState) => {
    setContent(prev => ({
      ...prev,
      [section]: originalContent[section]
    }));
    console.log('ContentContext - Reset section:', section);
  };

  // Reset all content
  const resetAll = () => {
    setContent(originalContent);
    console.log('ContentContext - Reset all content');
  };

  // Debug logging
  useEffect(() => {
    console.log('ContentContext - Content state updated:', content);
  }, [content]);

  return (
    <ContentContext.Provider value={{
      content,
      updateHeroContent,
      updateAboutContent,
      resetSection,
      resetAll
    }}>
      {children}
    </ContentContext.Provider>
  );
}

// Hook to use content context
export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
