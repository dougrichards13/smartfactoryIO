import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RotateCcw, Eye, EyeOff, Settings, Zap, BarChart3, Briefcase, MessageCircle, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { useEditMode } from '../src/contexts/EditModeContext';
import { HeroEditor } from './editors/HeroEditor';
import { AboutEditor } from './editors/AboutEditor';
import { ServicesEditor } from './editors/ServicesEditor';
import { ContactEditor } from './editors/ContactEditor';
import { GlobalEditor } from './editors/GlobalEditor';
import { ResultsEditor } from './editors/ResultsEditor';
import { TeamEditor } from './editors/TeamEditor';
import { useContent } from '../src/contexts/ContentContext';

// Import WandaVision Lite editors
// TODO: Re-enable when WandaVision editors are available
// import { 
//   WandaMetricsEditor,
//   WandaTestimonialsEditor
// } from '../src/wandavision/WandaVisionLite';

const classicSectionOptions = [
  { id: 'hero', label: 'Hero Section', scrollTarget: 'top', icon: Eye },
  { id: 'about', label: 'About Section', scrollTarget: 'about', icon: Settings },
  { id: 'results', label: 'Proven Impact & Results', scrollTarget: 'results', icon: BarChart3 },
  { id: 'team', label: 'Elite Client Portfolio', scrollTarget: 'team', icon: Briefcase },
  { id: 'services', label: 'Services Section', scrollTarget: 'services', icon: Wrench },
  { id: 'contact', label: 'Contact Section', scrollTarget: 'contact', icon: MessageCircle },
  { id: 'global', label: 'Global Settings', scrollTarget: null, icon: Settings },
];

const wandaVisionSectionOptions = [
  { id: 'wanda-metrics', label: 'Smart Metrics', scrollTarget: 'results', icon: BarChart3 },
  { id: 'wanda-testimonials', label: 'Smart Testimonials', scrollTarget: 'results', icon: MessageCircle },
];

export function EditPanelEnhanced() {
  const { isEditMode, toggleEditMode, currentSection, setCurrentSection } = useEditMode();
  const { resetSection, saveSection, saveAllContent, hasUnsavedChanges: contextHasUnsavedChanges, clearUnsavedChanges } = useContent();
  const [localUnsavedChanges, setLocalUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editMode, setEditMode] = useState<'classic' | 'wandavision'>('classic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');

  // Helper function to scroll to sections on the main page
  const scrollToSection = (scrollTarget: string | null) => {
    if (!scrollTarget) return;
    
    if (scrollTarget === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isEditMode) return null;

  const handleReset = () => {
    console.log('EditPanel - Reset button clicked, currentSection:', currentSection);
    
    // Reset using shared context for classic sections
    if (['hero', 'about', 'services', 'results', 'team', 'contact', 'global'].includes(currentSection)) {
      resetSection(currentSection as keyof typeof resetSection);
    }
    // WandaVision sections handle their own reset
    
    setLocalUnsavedChanges(false);
    clearUnsavedChanges();
    setSaveMessage('');
    console.log('EditPanel - Reset complete');
  };

  const handleSave = async () => {
    console.log('EditPanel - Save button clicked, currentSection:', currentSection);
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      if (['hero', 'about', 'services', 'results', 'team', 'contact', 'global'].includes(currentSection)) {
        const result = await saveSection(currentSection as any);
        
        if (result.success) {
          setSaveMessage('✓ ' + result.message);
          setLocalUnsavedChanges(false);
          clearUnsavedChanges();
          
          // Clear success message after 3 seconds
          setTimeout(() => setSaveMessage(''), 3000);
        } else {
          setSaveMessage('✗ ' + (result.error || 'Save failed'));
        }
      } else {
        setSaveMessage('✗ Cannot save this section type');
      }
    } catch (error) {
      console.error('EditPanel - Save error:', error);
      setSaveMessage('✗ Save failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
    
    console.log('EditPanel - Save complete');
  };

  const renderEditor = () => {
    console.log('renderEditor called with currentSection:', currentSection);
    
    // Classic editors
    switch (currentSection) {
      case 'hero':
        return <HeroEditor onContentChange={() => setLocalUnsavedChanges(true)} onResetRequested={handleReset} />;
      case 'about':
        return <AboutEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      case 'services':
        return <ServicesEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      case 'results':
        return <ResultsEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      case 'team':
        return <TeamEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      case 'contact':
        return <ContactEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      case 'global':
        return <GlobalEditor onContentChange={() => setLocalUnsavedChanges(true)} />;
      
      // WandaVision Lite editors
      case 'wanda-metrics':
        return (
          <div className="text-white text-center py-8">
            <p>WandaVision Metrics Editor</p>
            <p className="text-sm text-white/60 mt-2">Coming soon...</p>
          </div>
        );
      case 'wanda-testimonials':
        return (
          <div className="text-white text-center py-8">
            <p>WandaVision Testimonials Editor</p>
            <p className="text-sm text-white/60 mt-2">Coming soon...</p>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full text-white/60">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a section to edit</p>
              <p className="text-xs mt-2 opacity-70">
                Choose from Classic or WandaVision editors
              </p>
            </div>
          </div>
        );
    }
  };

  const currentSectionOptions = editMode === 'classic' ? classicSectionOptions : wandaVisionSectionOptions;

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
              <div>
                <h2 className="text-white font-bold">WandaVision Editor</h2>
                <p className="text-xs text-white/60">
                  {editMode === 'classic' ? 'Classic Mode' : 'Smart Intelligence'}
                </p>
              </div>
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

          {/* Mode Toggle */}
          <div className="flex items-center space-x-2 mb-4 p-1 bg-slate-700 rounded-lg">
            <button
              onClick={() => {
                setEditMode('classic');
                setCurrentSection('hero'); // Reset to first classic section
              }}
              className={`flex items-center space-x-2 flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                editMode === 'classic'
                  ? 'bg-slate-600 text-white'
                  : 'text-white/70 hover:text-white hover:bg-slate-600/50'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>Classic</span>
            </button>
            <button
              onClick={() => {
                setEditMode('wandavision');
                setCurrentSection('wanda-metrics'); // Reset to first WandaVision section
              }}
              className={`flex items-center space-x-2 flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                editMode === 'wandavision'
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-primary/50'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>Smart AI</span>
            </button>
          </div>

          {/* Section Selector */}
          <div className="grid grid-cols-1 gap-2">
            {currentSectionOptions.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    console.log('Navigation clicked:', section.id, '-> Current:', currentSection);
                    setCurrentSection(section.id);
                    console.log('Navigation set to:', section.id);
                    
                    // Auto-scroll to the corresponding section on the main page
                    scrollToSection(section.scrollTarget);
                    console.log('Scrolling to:', section.scrollTarget);
                  }}
                  className={`p-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    currentSection === section.id
                      ? editMode === 'wandavision' 
                        ? 'bg-primary text-white' 
                        : 'bg-slate-600 text-white'
                      : 'bg-slate-700 text-white/70 hover:bg-slate-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-start space-x-3">
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs">{section.label}</span>
                  </div>
                </button>
              );
            })}
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
            <div className="flex items-center space-x-2 text-xs">
              {(contextHasUnsavedChanges || localUnsavedChanges) && (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-400">Unsaved changes</span>
                </>
              )}
              {saveMessage && (
                <span className={`text-xs ${
                  saveMessage.startsWith('✓') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {saveMessage}
                </span>
              )}
            </div>
            <div className="text-xs text-white/40">
              {editMode === 'wandavision' ? 'AI-Powered' : 'Classic'} • Press ESC to exit
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
              disabled={!(contextHasUnsavedChanges || localUnsavedChanges) || isSaving}
              className={`flex-1 text-white ${
                editMode === 'wandavision'
                  ? 'bg-primary hover:bg-primary/90'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            >
              <Save className={`w-4 h-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}