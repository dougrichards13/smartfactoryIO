import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { saveContent, validateContent, createBackup, SaveContentResponse } from '../utils/saveContent';

// Import all content files
import heroContent from '../../content/hero.json';
import aboutContent from '../../content/about.json';
import servicesContent from '../../content/services.json';
import contactContent from '../../content/contact.json';
import globalContent from '../../content/global.json';
import resultsContent from '../../content/results.json';
import teamContent from '../../content/team.json';

// Define content structure
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
  updateHeroContent: (updates: Partial<typeof heroContent>) => void;
  updateAboutContent: (updates: Partial<typeof aboutContent>) => void;
  updateServicesContent: (updates: Partial<typeof servicesContent>) => void;
  updateContactContent: (updates: Partial<typeof contactContent>) => void;
  updateGlobalContent: (updates: Partial<typeof globalContent>) => void;
  updateResultsContent: (updates: Partial<typeof resultsContent>) => void;
  updateTeamContent: (updates: Partial<typeof teamContent>) => void;
  resetSection: (section: keyof ContentState) => void;
  resetAll: () => void;
  saveSection: (section: keyof ContentState) => Promise<SaveContentResponse>;
  saveAllContent: () => Promise<SaveContentResponse[]>;
  validateSection: (section: keyof ContentState) => { valid: boolean; errors: string[] };
  hasUnsavedChanges: boolean;
  clearUnsavedChanges: () => void;
}

// Create context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Original content for reset functionality
const originalContent: ContentState = {
  hero: heroContent,
  about: aboutContent,
  services: servicesContent,
  contact: contactContent,
  global: globalContent,
  results: resultsContent,
  team: teamContent,
};

// Provider component
export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(originalContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update hero content
  const updateHeroContent = (updates: Partial<typeof heroContent>) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Hero updated:', updates);
  };

  // Update about content
  const updateAboutContent = (updates: Partial<typeof aboutContent>) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - About updated:', updates);
  };

  // Update services content
  const updateServicesContent = (updates: Partial<typeof servicesContent>) => {
    setContent(prev => ({
      ...prev,
      services: { ...prev.services, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Services updated:', updates);
  };

  // Update contact content
  const updateContactContent = (updates: Partial<typeof contactContent>) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Contact updated:', updates);
  };

  // Update global content
  const updateGlobalContent = (updates: Partial<typeof globalContent>) => {
    setContent(prev => ({
      ...prev,
      global: { ...prev.global, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Global updated:', updates);
  };

  // Update results content
  const updateResultsContent = (updates: Partial<typeof resultsContent>) => {
    setContent(prev => ({
      ...prev,
      results: { ...prev.results, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Results updated:', updates);
  };

  // Update team content
  const updateTeamContent = (updates: Partial<typeof teamContent>) => {
    setContent(prev => ({
      ...prev,
      team: { ...prev.team, ...updates }
    }));
    setHasUnsavedChanges(true);
    console.log('ContentContext - Team updated:', updates);
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
    setHasUnsavedChanges(false);
    console.log('ContentContext - Reset all content');
  };

  // Save individual section
  const saveSection = async (section: keyof ContentState): Promise<SaveContentResponse> => {
    console.log(`ContentContext - Saving ${section} section`);
    
    // Create backup before saving
    createBackup(content);
    
    // Validate content before saving
    const validation = validateContent(section, content[section]);
    if (!validation.valid) {
      return {
        success: false,
        message: `Validation failed for ${section}`,
        error: validation.errors.join(', ')
      };
    }
    
    // Save the content
    const result = await saveContent({
      section,
      content: content[section]
    });
    
    if (result.success) {
      console.log(`ContentContext - ${section} saved successfully`);
    } else {
      console.error(`ContentContext - Failed to save ${section}:`, result.error);
    }
    
    return result;
  };

  // Save all content
  const saveAllContent = async (): Promise<SaveContentResponse[]> => {
    console.log('ContentContext - Saving all content');
    
    // Create backup before saving
    createBackup(content);
    
    const sections: Array<keyof ContentState> = ['hero', 'about', 'services', 'contact', 'global', 'results', 'team'];
    const results: SaveContentResponse[] = [];
    
    for (const section of sections) {
      const result = await saveSection(section);
      results.push(result);
    }
    
    // If all saves were successful, clear unsaved changes flag
    const allSuccessful = results.every(result => result.success);
    if (allSuccessful) {
      setHasUnsavedChanges(false);
      console.log('ContentContext - All content saved successfully');
    }
    
    return results;
  };

  // Validate section content
  const validateSection = (section: keyof ContentState) => {
    return validateContent(section, content[section]);
  };

  // Clear unsaved changes flag
  const clearUnsavedChanges = () => {
    setHasUnsavedChanges(false);
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
      updateServicesContent,
      updateContactContent,
      updateGlobalContent,
      updateResultsContent,
      updateTeamContent,
      resetSection,
      resetAll,
      saveSection,
      saveAllContent,
      validateSection,
      hasUnsavedChanges,
      clearUnsavedChanges
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
