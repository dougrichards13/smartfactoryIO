import React, { createContext, useContext, useState, useEffect } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  currentSection: string | null;
  setCurrentSection: (section: string | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Keyboard shortcut: Ctrl+Shift+E
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (!isAuthenticated) {
          // Auto-authenticate for now and toggle immediately
          console.log('Auto-authenticating and toggling edit mode');
          setIsAuthenticated(true);
          setIsEditMode(!isEditMode);
          if (!isEditMode) {
            setCurrentSection('hero');
          } else {
            setCurrentSection(null);
          }
        } else {
          toggleEditMode();
        }
      }
      
      // Escape to exit edit mode
      if (e.key === 'Escape' && isEditMode) {
        setIsEditMode(false);
        setCurrentSection(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isEditMode, isAuthenticated]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setCurrentSection('hero'); // Default to hero section
    } else {
      setCurrentSection(null);
    }
  };

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        currentSection,
        setCurrentSection,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}
