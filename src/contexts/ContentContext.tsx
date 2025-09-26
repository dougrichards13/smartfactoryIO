import React, { createContext, useContext, ReactNode } from 'react';

// Import all content files
import heroContent from '../../content/hero.json';
import aboutContent from '../../content/about.json';
import servicesContent from '../../content/services.json';
import contactContent from '../../content/contact.json';
import globalContent from '../../content/global.json';
import resultsContent from '../../content/results.json';
import teamContent from '../../content/team.json';

// Define content structure (read-only)
interface ContentState {
  hero: typeof heroContent;
  about: typeof aboutContent;
  services: typeof servicesContent;
  contact: typeof contactContent;
  global: typeof globalContent;
  results: typeof resultsContent;
  team: typeof teamContent;
}

interface ContentContextType {
  content: ContentState;
}

// Create context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Static content (read-only)
const staticContent: ContentState = {
  hero: heroContent,
  about: aboutContent,
  services: servicesContent,
  contact: contactContent,
  global: globalContent,
  results: resultsContent,
  team: teamContent,
};

// Provider component (simplified for production)
export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider value={{
      content: staticContent
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
