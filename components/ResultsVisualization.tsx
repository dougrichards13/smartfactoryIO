import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';

// Enterprise Market Impact by Industry - Client Count and Value Growth
const portfolioGrowthData = [
  { industry: 'Healthcare', clients: 8, baseValue: 250, growthAdded: 850, challenge: 'Regulatory Compliance', outcome: 'Digital Transformation' },
  { industry: 'Financial Services', clients: 12, baseValue: 480, growthAdded: 1200, challenge: 'Risk Management', outcome: 'Process Excellence' },
  { industry: 'FinTech', clients: 6, baseValue: 120, growthAdded: 620, challenge: 'Scale Rapidly', outcome: 'Infrastructure Build' },
  { industry: 'Government', clients: 7, baseValue: 180, growthAdded: 420, challenge: 'Bureaucracy Reform', outcome: 'Efficiency Gains' },
  { industry: 'Technology', clients: 9, baseValue: 350, growthAdded: 940, challenge: 'Innovation Speed', outcome: 'Competitive Edge' },
  { industry: 'Agriculture', clients: 4, baseValue: 85, growthAdded: 280, challenge: 'Supply Chain', outcome: 'Operational Excellence' },
  { industry: 'Education', clients: 5, baseValue: 45, growthAdded: 180, challenge: 'Digital Learning', outcome: 'Student Experience' },
  { industry: 'International', clients: 11, baseValue: 720, growthAdded: 1800, challenge: 'Cultural Integration', outcome: 'Global Standards' }
];

// Executive Success Metrics: What CEOs/Boards Care About Most
const engagementSuccessData = [
  { metric: 'ROI Achievement', target: 200, actual: 340, description: 'Average ROI delivered vs. client expectations' },
  { metric: 'Timeline Performance', target: 100, actual: 115, description: 'Ahead of schedule delivery vs. industry standard' },
  { metric: 'Budget Performance', target: 100, actual: 92, description: 'Under budget delivery vs. initial estimates' },
  { metric: 'Scope Expansion', target: 100, actual: 278, description: 'Additional value opportunities identified and delivered' },
  { metric: 'Leadership Retention', target: 85, actual: 96, description: 'Client executive retention during transformation' },
  { metric: 'Contract Renewal', target: 70, actual: 100, description: 'Multi-year partnership conversion rate' }
];

// Smart Factory Competitive Advantage: Why Choose Us vs Alternatives
const competitiveAdvantageData = [
  { advantage: 'Proven at Scale', smartFactory: 95, typical: 45, description: 'Enterprise transformation success rate vs industry average' },
  { advantage: 'Speed to Value', smartFactory: 90, typical: 60, description: 'Time to measurable ROI vs traditional consulting' },
  { advantage: 'Leadership Integration', smartFactory: 92, typical: 35, description: 'C-Suite adoption and sustained engagement' },
  { advantage: 'Technology Mastery', smartFactory: 88, typical: 40, description: 'AI/automation implementation success vs competitors' },
  { advantage: 'Risk Mitigation', smartFactory: 94, typical: 55, description: 'Project delivery certainty vs industry standard' },
  { advantage: 'Partnership Model', smartFactory: 100, typical: 25, description: 'Land-and-expand success vs one-time engagements' }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
        <p className="text-white font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' 
              ? `${entry.value}${entry.dataKey.includes('satisfaction') ? '%' : entry.dataKey === 'efficiency' ? '%' : entry.dataKey === 'value' ? '%' : '%'}` 
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ResultsVisualizationProps {
  activeChart: 'portfolio' | 'valuation' | 'impact';
}

export function ResultsVisualization({ activeChart }: ResultsVisualizationProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, [activeChart]);

  const renderPortfolioChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={portfolioGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="industry" 
          stroke="#8FA0BF" 
          fontSize={11}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value >= 1000 ? `$${(value/1000).toFixed(1)}B` : `$${value}M`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                  <p className="text-white font-semibold text-sm mb-2">{data.industry}</p>
                  <p className="text-secondary text-sm">Clients: {data.clients}</p>
                  <p className="text-primary text-sm">Base Value: ${data.baseValue >= 1000 ? (data.baseValue/1000).toFixed(1) + 'B' : data.baseValue + 'M'}</p>
                  <p className="text-accent text-sm">Growth Added: ${data.growthAdded >= 1000 ? (data.growthAdded/1000).toFixed(1) + 'B' : data.growthAdded + 'M'}</p>
                  <p className="text-white/70 text-xs mt-1">Challenge: {data.challenge}</p>
                  <p className="text-white/70 text-xs">Outcome: {data.outcome}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="baseValue" 
          fill="#8FA0BF"
          radius={[2, 2, 0, 0]}
          animationDuration={1000}
          name="Company Size at Start"
        />
        <Bar 
          dataKey="growthAdded" 
          fill="#3EB7FF"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          name="Value Growth Added"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderEngagementChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={engagementSuccessData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="metric" 
          stroke="#8FA0BF" 
          fontSize={11}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                  <p className="text-white font-semibold text-sm mb-2">{data.metric}</p>
                  <p className="text-accent text-sm">Target: {data.target}%</p>
                  <p className="text-secondary text-sm">Smart Factory: {data.actual}%</p>
                  <p className="text-white/70 text-xs mt-2">{data.description}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="target" 
          fill="#8FA0BF"
          radius={[2, 2, 0, 0]}
          animationDuration={1000}
          name="Industry Target"
        />
        <Bar 
          dataKey="actual" 
          fill="#36F997"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          name="Smart Factory Actual"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderAdvantageChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={competitiveAdvantageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="advantage" 
          stroke="#8FA0BF" 
          fontSize={11}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                  <p className="text-white font-semibold text-sm mb-2">{data.advantage}</p>
                  <p className="text-accent text-sm">Typical: {data.typical}%</p>
                  <p className="text-primary text-sm">Smart Factory: {data.smartFactory}%</p>
                  <p className="text-white/70 text-xs mt-2">{data.description}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="typical" 
          fill="#FF6B6B"
          radius={[2, 2, 0, 0]}
          animationDuration={1000}
          name="Industry Typical"
        />
        <Bar 
          dataKey="smartFactory" 
          fill="#3EB7FF"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
          name="Smart Factory"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const getChartTitle = () => {
    switch (activeChart) {
      case 'portfolio':
        return { title: 'Market Value Impact by Industry', subtitle: 'Company size at engagement vs. growth value delivered across 8 industry clusters' };
      case 'valuation':
        return { title: 'Executive Success Metrics', subtitle: 'What CEOs and Boards care about most - Smart Factory vs. industry targets' };
      case 'impact':
        return { title: 'Smart Factory Advantage', subtitle: 'Why we consistently outperform alternatives - quantified competitive edge' };
      default:
        return { title: 'Results Overview', subtitle: 'Choose a metric to explore' };
    }
  };

  const { title, subtitle } = getChartTitle();

  return (
    <motion.div 
      className="relative h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Chart Header */}
      <div className="mb-6">
        <motion.h4 
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h4>
        <motion.p 
          className="text-white/70 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <motion.div
          key={activeChart}
          className="h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeChart === 'portfolio' && renderPortfolioChart()}
          {activeChart === 'valuation' && renderEngagementChart()}
          {activeChart === 'impact' && renderAdvantageChart()}
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div 
        className="mt-6 grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {activeChart === 'portfolio' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">62 Clients</div>
              <div className="text-xs text-white/70">Across 8 Industries</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">$6.3B</div>
              <div className="text-xs text-white/70">Value Growth Added</div>
            </div>
          </>
        )}
        
        {activeChart === 'valuation' && (
          <>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">340%</div>
              <div className="text-xs text-white/70">Average ROI Delivered</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">100%</div>
              <div className="text-xs text-white/70">Contract Renewal Rate</div>
            </div>
          </>
        )}
        
        {activeChart === 'impact' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">2x Better</div>
              <div className="text-xs text-white/70">vs Industry Average</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">75%</div>
              <div className="text-xs text-white/70">Partnership Advantage</div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
