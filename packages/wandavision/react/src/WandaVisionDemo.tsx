/**
 * WandaVision Universal Intelligence - Comprehensive Demo
 * Showcases all editors working together with the UniversalContentProvider
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Zap, 
  BarChart3, 
  Briefcase, 
  MessageCircle, 
  Settings, 
  Save, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

import { 
  UniversalContentProvider,
  useUniversalContent,
  MetricsEditor,
  PortfolioEditor,
  TestimonialsEditor,
  ServicesEditor
} from './index';

interface WandaVisionDemoProps {
  /** Initial page URL to scan (optional) */
  initialUrl?: string;
  /** Demo mode - shows sample data if no content detected */
  demoMode?: boolean;
  /** Callback when content changes */
  onContentChange?: (changes: any) => void;
  /** Custom styling */
  className?: string;
}

type EditorTab = 'metrics' | 'portfolio' | 'testimonials' | 'services' | 'overview';
type ViewMode = 'desktop' | 'tablet' | 'mobile';

export function WandaVisionDemo({ 
  initialUrl, 
  demoMode = true, 
  onContentChange,
  className 
}: WandaVisionDemoProps) {
  const [activeTab, setActiveTab] = useState<EditorTab>('overview');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleContentChange = (changes?: any) => {
    setHasUnsavedChanges(true);
    onContentChange?.(changes);
  };

  const handleSave = () => {
    // Simulate save operation
    setHasUnsavedChanges(false);
    setLastSaved(new Date());
    console.log('💾 Content saved:', new Date().toISOString());
  };

  const handleReset = () => {
    // Reset to original state
    setHasUnsavedChanges(false);
    console.log('🔄 Content reset');
  };

  return (
    <UniversalContentProvider initialUrl={initialUrl} demoMode={demoMode}>
      <div className={`min-h-screen bg-slate-900 ${className}`}>
        <WandaVisionHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          hasUnsavedChanges={hasUnsavedChanges}
          lastSaved={lastSaved}
          onSave={handleSave}
          onReset={handleReset}
        />
        
        <main className="container mx-auto px-6 py-8">
          <div className={`max-w-none transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-sm mx-auto' :
            viewMode === 'tablet' ? 'max-w-4xl mx-auto' :
            'max-w-7xl mx-auto'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <WandaVisionOverview onContentChange={handleContentChange} />
                )}
                {activeTab === 'metrics' && (
                  <MetricsEditor onContentChange={handleContentChange} />
                )}
                {activeTab === 'portfolio' && (
                  <PortfolioEditor onContentChange={handleContentChange} />
                )}
                {activeTab === 'testimonials' && (
                  <TestimonialsEditor onContentChange={handleContentChange} />
                )}
                {activeTab === 'services' && (
                  <ServicesEditor onContentChange={handleContentChange} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </UniversalContentProvider>
  );
}

interface WandaVisionHeaderProps {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  onSave: () => void;
  onReset: () => void;
}

function WandaVisionHeader({
  activeTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  hasUnsavedChanges,
  lastSaved,
  onSave,
  onReset
}: WandaVisionHeaderProps) {
  const tabs: Array<{ id: EditorTab; label: string; icon: React.ComponentType<any>; count?: number }> = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
    { id: 'services', label: 'Services', icon: Settings }
  ];

  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">WandaVision</h1>
              <p className="text-xs text-white/60">Universal Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id 
                    ? 'bg-primary text-white' 
                    : 'text-white/70 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* View Mode Switcher */}
            <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
              {[
                { mode: 'desktop' as ViewMode, icon: Monitor },
                { mode: 'tablet' as ViewMode, icon: Tablet },
                { mode: 'mobile' as ViewMode, icon: Smartphone }
              ].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => onViewModeChange(mode)}
                  className={`p-2 rounded ${
                    viewMode === mode 
                      ? 'bg-primary text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Save Status */}
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges ? (
                <div className="flex items-center space-x-1 text-yellow-500">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">Unsaved</span>
                </div>
              ) : lastSaved ? (
                <div className="flex items-center space-x-1 text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-white/60">
                  <Info className="w-4 h-4" />
                  <span className="text-xs">Ready</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onReset}
                disabled={!hasUnsavedChanges}
                className="flex items-center space-x-1 px-3 py-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
              <button
                onClick={onSave}
                disabled={!hasUnsavedChanges}
                className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

interface WandaVisionOverviewProps {
  onContentChange: () => void;
}

function WandaVisionOverview({ onContentChange }: WandaVisionOverviewProps) {
  const { detectedContent, isScanning, scanForContent, scanStats } = useUniversalContent();

  const contentCounts = {
    metrics: detectedContent.filter(c => c.content.type === 'METRICS').length,
    portfolio: detectedContent.filter(c => c.content.type === 'PORTFOLIO').length,
    testimonials: detectedContent.filter(c => c.content.type === 'TESTIMONIALS').length,
    services: detectedContent.filter(c => c.content.type === 'SERVICES').length
  };

  const totalContent = Object.values(contentCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          WandaVision Universal Intelligence
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Intelligently detect and manage content across your entire website. 
          From metrics and portfolio showcases to testimonials and services - 
          edit everything with professional precision.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Metrics & KPIs"
          count={contentCounts.metrics}
          icon={BarChart3}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
          description="Financial metrics, percentages, multipliers"
        />
        <StatCard
          title="Portfolio Items"
          count={contentCounts.portfolio}
          icon={Briefcase}
          color="text-green-500"
          bgColor="bg-green-500/10"
          description="Case studies and project highlights"
        />
        <StatCard
          title="Testimonials"
          count={contentCounts.testimonials}
          icon={MessageCircle}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
          description="Client testimonials and reviews"
        />
        <StatCard
          title="Services"
          count={contentCounts.services}
          icon={Settings}
          color="text-orange-500"
          bgColor="bg-orange-500/10"
          description="Service descriptions and capabilities"
        />
      </div>

      {/* Scan Status */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Content Detection Status</h3>
          <button
            onClick={scanForContent}
            disabled={isScanning}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Re-scan Content'}</span>
          </button>
        </div>

        {isScanning ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="ml-3 text-white/70">Analyzing website content...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded p-4">
              <div className="text-2xl font-bold text-white">{totalContent}</div>
              <div className="text-white/60 text-sm">Total Items Detected</div>
            </div>
            <div className="bg-slate-900 rounded p-4">
              <div className="text-2xl font-bold text-white">{scanStats?.elementsScanned || 0}</div>
              <div className="text-white/60 text-sm">Elements Analyzed</div>
            </div>
            <div className="bg-slate-900 rounded p-4">
              <div className="text-2xl font-bold text-white">{scanStats?.patternsMatched || 0}</div>
              <div className="text-white/60 text-sm">Patterns Matched</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard
            title="Manage Metrics"
            description="Edit KPIs, financial metrics, and performance indicators"
            icon={BarChart3}
            onClick={() => {/* Navigate to metrics */}}
            count={contentCounts.metrics}
          />
          <QuickActionCard
            title="Update Portfolio"
            description="Manage case studies and project showcases"
            icon={Briefcase}
            onClick={() => {/* Navigate to portfolio */}}
            count={contentCounts.portfolio}
          />
          <QuickActionCard
            title="Edit Testimonials"
            description="Manage client testimonials and credibility"
            icon={MessageCircle}
            onClick={() => {/* Navigate to testimonials */}}
            count={contentCounts.testimonials}
          />
          <QuickActionCard
            title="Adjust Services"
            description="Update service descriptions and capabilities"
            icon={Settings}
            onClick={() => {/* Navigate to services */}}
            count={contentCounts.services}
          />
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
        <h3 className="text-white font-semibold mb-4">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="Intelligent Detection"
            description="Automatically detects and categorizes content using advanced pattern matching"
          />
          <FeatureCard
            title="Live Preview"
            description="See exactly how changes appear on your website in real-time"
          />
          <FeatureCard
            title="Professional Context"
            description="Smart Factory-specific enhancements with professional disclaimers"
          />
          <FeatureCard
            title="Drag & Drop"
            description="Reorder content sections with intuitive drag-and-drop interface"
          />
          <FeatureCard
            title="Credibility Scoring"
            description="Automatic credibility assessment for testimonials and content"
          />
          <FeatureCard
            title="Multi-device Preview"
            description="Preview content across desktop, tablet, and mobile viewports"
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  description: string;
}

function StatCard({ title, count, icon: Icon, color, bgColor, description }: StatCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{count}</div>
          <div className="text-white/60 text-sm">detected</div>
        </div>
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-white/60 text-xs">{description}</p>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  count: number;
}

function QuickActionCard({ title, description, icon: Icon, onClick, count }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-slate-900 rounded-lg p-4 hover:bg-slate-700 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-5 h-5 text-primary" />
        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">{count}</span>
      </div>
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </button>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-900 rounded-lg p-4">
      <h4 className="text-white font-medium mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}