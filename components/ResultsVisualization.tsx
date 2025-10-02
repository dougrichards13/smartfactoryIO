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

// Enterprise Transition Success by Industry Cluster
const portfolioGrowthData = [
  { industry: 'Healthcare', success: 94, projects: 8, challenge: 'Regulatory Compliance', outcome: 'Digital Transformation' },
  { industry: 'Financial Services', success: 96, projects: 12, challenge: 'Risk Management', outcome: 'Process Excellence' },
  { industry: 'FinTech', success: 92, projects: 6, challenge: 'Scale Rapidly', outcome: 'Infrastructure Build' },
  { industry: 'Government', success: 89, projects: 7, challenge: 'Bureaucracy Reform', outcome: 'Efficiency Gains' },
  { industry: 'Technology', success: 95, projects: 9, challenge: 'Innovation Speed', outcome: 'Competitive Edge' },
  { industry: 'Agriculture', success: 91, projects: 4, challenge: 'Supply Chain', outcome: 'Operational Excellence' },
  { industry: 'Education', success: 88, projects: 5, challenge: 'Digital Learning', outcome: 'Student Experience' },
  { industry: 'International', success: 93, projects: 11, challenge: 'Cultural Integration', outcome: 'Global Standards' }
];

// Global Enterprise Transformation: Geographic & Contract Scope
const valuationData = [
  { region: 'North America', projects: 28, avgContract: 3.2, complexity: 'Enterprise', value: 95 },
  { region: 'International', projects: 15, avgContract: 4.8, complexity: 'Government', value: 92 },
  { region: 'Financial Centers', projects: 18, avgContract: 2.1, complexity: 'Compliance', value: 97 },
  { region: 'Healthcare Systems', projects: 12, avgContract: 5.5, complexity: 'Mission Critical', value: 94 }
];

// C-Suite Evolution: The Transition Crisis Timeline
const impactTimelineData = [
  { stage: 'Founder-Led', challenge: 'Outmatched Leadership', success: 45, description: 'CFO was accountant, CTO ran help desk' },
  { stage: 'Transition Crisis', challenge: 'Scale or Fail', success: 35, description: 'Mid-size to enterprise transition' },
  { stage: 'Smart Factory Engaged', challenge: 'Executive Evolution', success: 75, description: 'Board-level transformation begins' },
  { stage: 'Leadership Transformed', challenge: 'Enterprise Ready', success: 94, description: 'C-suite matches company needs' },
  { stage: 'Sustained Growth', challenge: 'Market Leadership', success: 96, description: '1-10 year partnerships deliver results' }
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                  <p className="text-white font-semibold text-sm mb-2">{data.industry}</p>
                  <p className="text-primary text-sm">Success Rate: {data.success}%</p>
                  <p className="text-secondary text-sm">Projects: {data.projects}</p>
                  <p className="text-accent text-xs mt-1">Challenge: {data.challenge}</p>
                  <p className="text-white/70 text-xs">Outcome: {data.outcome}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="success" 
          fill="#3EB7FF"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderValuationChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={valuationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="region" 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
                  <p className="text-white font-semibold text-sm mb-2">{data.region}</p>
                  <p className="text-secondary text-sm">Projects: {data.projects}</p>
                  <p className="text-primary text-sm">Avg Contract: {data.avgContract} years</p>
                  <p className="text-accent text-xs mt-1">Complexity: {data.complexity}</p>
                  <p className="text-white/70 text-xs">Success: {data.value}%</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="projects" 
          fill="#36F997"
          radius={[8, 8, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderImpactChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={impactTimelineData}>
        <defs>
          <linearGradient id="crisisGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
            <stop offset="50%" stopColor="#FFE66D" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#36F997" stopOpacity={0.8}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="stage" 
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
                <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl max-w-xs">
                  <p className="text-white font-semibold text-sm mb-2">{data.stage}</p>
                  <p className="text-primary text-sm">Success Rate: {data.success}%</p>
                  <p className="text-accent text-xs mt-1 font-semibold">{data.challenge}</p>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">{data.description}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="success"
          stroke="#36F997"
          strokeWidth={3}
          fill="url(#crisisGradient)"
          animationDuration={2500}
        />
        <ReferenceLine y={50} stroke="#FF6B6B" strokeDasharray="3 3" opacity={0.7} label={{ value: "Crisis Point", position: "topRight" }} />
      </AreaChart>
    </ResponsiveContainer>
  );

  const getChartTitle = () => {
    switch (activeChart) {
      case 'portfolio':
        return { title: 'Enterprise Transition Success', subtitle: 'Industry clusters: When mid-size companies need to scale to enterprise' };
      case 'valuation':
        return { title: 'Global Transformation Reach', subtitle: 'Multi-year partnerships spanning continents and complexities' };
      case 'impact':
        return { title: 'C-Suite Evolution Crisis', subtitle: 'The harsh reality: Founder leadership must transform or companies fail' };
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
      <div className="h-80 w-full">
        <motion.div
          key={activeChart}
          className="h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeChart === 'portfolio' && renderPortfolioChart()}
          {activeChart === 'valuation' && renderValuationChart()}
          {activeChart === 'impact' && renderImpactChart()}
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
              <div className="text-2xl font-black text-primary">8 Industries</div>
              <div className="text-xs text-white/70">Proven Success</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">90%+</div>
              <div className="text-xs text-white/70">Transition Success</div>
            </div>
          </>
        )}
        
        {activeChart === 'valuation' && (
          <>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">1-10 Years</div>
              <div className="text-xs text-white/70">Contract Duration</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">5 Continents</div>
              <div className="text-xs text-white/70">Global Reach</div>
            </div>
          </>
        )}
        
        {activeChart === 'impact' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">CEO/Board</div>
              <div className="text-xs text-white/70">Engagement Level</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">96%</div>
              <div className="text-xs text-white/70">Leadership Success</div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
