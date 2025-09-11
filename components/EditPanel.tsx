import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Eye, EyeOff, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useEditMode } from '../src/contexts/EditModeContext';
import { HeroEditor } from './editors/HeroEditor';
import { AboutEditor } from './editors/AboutEditor';
import { ServicesEditor } from './editors/ServicesEditor';
import { ContactEditor } from './editors/ContactEditor';
import { GlobalEditor } from './editors/GlobalEditor';
import { useContent } from '../src/contexts/ContentContext';

const sectionOptions = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'about', label: 'About Section' },
  { id: 'services', label: 'Services Section' },
  { id: 'contact', label: 'Contact Section' },
  { id: 'global', label: 'Global Settings' },
];

export function EditPanel() {
  const { isEditMode, toggleEditMode, currentSection, setCurrentSection } = useEditMode();
  const { resetSection } = useContent();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!isEditMode) return null;

  const handleReset = () => {
    console.log('EditPanel - Reset button clicked, currentSection:', currentSection);
    
    // Reset using shared context
    if (currentSection === 'hero') {
      console.log('EditPanel - Resetting hero section');
      resetSection('hero');
    } else if (currentSection === 'about') {
      console.log('EditPanel - Resetting about section');
      resetSection('about');
    }
    // Add other sections as needed
    
    setHasUnsavedChanges(false);
    console.log('EditPanel - Reset complete');
  };

  const handleSave = () => {
    console.log('EditPanel - Save button clicked, currentSection:', currentSection);
    // TODO: Implement actual save to files
    setHasUnsavedChanges(false);
    console.log('EditPanel - Save complete (placeholder)');
  };

  const renderEditor = () => {
    console.log('renderEditor called with currentSection:', currentSection);
    switch (currentSection) {
      case 'hero':
        return <HeroEditor onContentChange={() => setHasUnsavedChanges(true)} onResetRequested={handleReset} />;
      case 'about':
        return <AboutEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'services':
        return <ServicesEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'contact':
        return <ContactEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      case 'global':
        return <GlobalEditor onContentChange={() => setHasUnsavedChanges(true)} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-white/60">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a section to edit</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-96 bg-slate-900/100 border-l border-slate-700 z-50 flex flex-col shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800/100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <h2 className="text-white font-bold">WandaVision Editor</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="text-white/70 hover:text-white"
              >
                {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleEditMode}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Section Selector */}
          <div className="grid grid-cols-2 gap-2">
            {sectionOptions.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  console.log('Navigation clicked:', section.id, '-> Current:', currentSection);
                  setCurrentSection(section.id);
                  console.log('Navigation set to:', section.id);
                }}
                className={`p-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  currentSection === section.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-700 text-white/70 hover:bg-slate-600 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-start min-h-[32px] px-2">
                  <span className="text-xs">{section.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-900/100 backdrop-blur-sm">
          <div className="bg-slate-900/100 rounded-lg p-4 min-h-full">
            {renderEditor()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-xs text-white/60">
              {hasUnsavedChanges && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Unsaved changes</span>
                </>
              )}
            </div>
            <div className="text-xs text-white/40">
              Press ESC to exit
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Preview Mode Overlay */}
        {isPreviewMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div className="text-white text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Preview Mode</h3>
              <p className="text-white/70 mb-4">Changes are visible on the left</p>
              <Button onClick={() => setIsPreviewMode(false)} variant="outline">
                Continue Editing
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
