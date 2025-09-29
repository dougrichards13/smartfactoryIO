import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, BarChart3 } from 'lucide-react';
import { ResultsVisualization } from './ResultsVisualization';

const chartOptions = [
  {
    id: 'portfolio' as const,
    label: 'Client ROI Growth',
    description: '300%+ typical return',
    icon: TrendingUp,
    color: 'primary'
  },
  {
    id: 'valuation' as const,
    label: 'Efficiency Gains',
    description: '40% improvement',
    icon: Building2,
    color: 'secondary'
  },
  {
    id: 'impact' as const,
    label: 'Implementation',
    description: 'Client satisfaction',
    icon: BarChart3,
    color: 'accent'
  }
];

export function InteractiveResultsChart() {
  const [activeChart, setActiveChart] = useState<'portfolio' | 'valuation' | 'impact'>('portfolio');

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = "group cursor-pointer transition-all duration-300";
    
    if (isActive) {
      switch (color) {
        case 'primary':
          return `${baseClasses} bg-primary/20 border-primary/60 text-primary`;
        case 'secondary':
          return `${baseClasses} bg-secondary/20 border-secondary/60 text-secondary`;
        case 'accent':
          return `${baseClasses} bg-accent/20 border-accent/60 text-accent`;
        default:
          return `${baseClasses} bg-primary/20 border-primary/60 text-primary`;
      }
    } else {
      return `${baseClasses} bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chart Selector */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Interactive Results Dashboard</h3>
        <div className="grid grid-cols-3 gap-3">
          {chartOptions.map((option) => {
            const IconComponent = option.icon;
            const isActive = activeChart === option.id;
            
            return (
              <motion.button
                key={option.id}
                onClick={() => setActiveChart(option.id)}
                className={`p-4 rounded-2xl border backdrop-blur-sm ${getColorClasses(option.color, isActive)}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center text-center">
                  <IconComponent className="w-6 h-6 mb-2" />
                  <div className="text-sm font-bold">{option.label}</div>
                  <div className="text-xs opacity-80">{option.description}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="flex-1 relative bg-gradient-to-br from-white/5 to-white/10 rounded-3xl border border-white/10 backdrop-blur-sm p-8">
        <ResultsVisualization activeChart={activeChart} />
      </div>

      {/* Bottom Insights */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
          <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
            Interactive data visualization • Click metrics above to explore
          </span>
        </div>
      </motion.div>
    </div>
  );
}
