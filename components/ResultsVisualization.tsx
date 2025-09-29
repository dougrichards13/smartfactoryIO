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

// Client ROI progression showing typical 300%+ return
const portfolioGrowthData = [
  { year: 'Baseline', value: 100, label: 'Initial Investment' },
  { year: 'Q2', value: 180, label: '80% ROI' },
  { year: 'Q4', value: 250, label: '150% ROI' },
  { year: 'Year 2', value: 320, label: '220% ROI' },
  { year: 'Year 3', value: 400, label: '300% ROI' }
];

// Efficiency improvement data
const valuationData = [
  { phase: 'Before', value: 100, label: 'Baseline' },
  { phase: 'After', value: 140, label: '40% Improved' }
];

// Implementation and satisfaction timeline
const impactTimelineData = [
  { quarter: 'Month 1', satisfaction: 75, efficiency: 15 },
  { quarter: 'Month 2', satisfaction: 82, efficiency: 28 },
  { quarter: 'Month 3', satisfaction: 89, efficiency: 45 },
  { quarter: 'Month 6', satisfaction: 94, efficiency: 67 },
  { quarter: 'Year 1', satisfaction: 98, efficiency: 85 }
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
      <AreaChart data={portfolioGrowthData}>
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3EB7FF" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3EB7FF" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="year" 
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3EB7FF"
          strokeWidth={3}
          fill="url(#portfolioGradient)"
          animationDuration={2000}
        />
        <ReferenceLine y={100} stroke="#36F997" strokeDasharray="2 2" opacity={0.7} />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderValuationChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={valuationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="phase" 
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          fill="#36F997"
          radius={[8, 8, 0, 0]}
          animationDuration={1500}
        >
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderImpactChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={impactTimelineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="quarter" 
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
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="satisfaction"
          stroke="#3EB7FF"
          strokeWidth={3}
          dot={{ fill: '#3EB7FF', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#3EB7FF', strokeWidth: 2 }}
          animationDuration={2000}
        />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#36F997"
          strokeWidth={3}
          dot={{ fill: '#36F997', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#36F997', strokeWidth: 2 }}
          animationDuration={2500}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const getChartTitle = () => {
    switch (activeChart) {
      case 'portfolio':
        return { title: 'Client ROI Trajectory', subtitle: 'Typical client return progression over time' };
      case 'valuation':
        return { title: 'Efficiency Improvement', subtitle: 'Average operational efficiency gains' };
      case 'impact':
        return { title: 'Implementation Success', subtitle: 'Client satisfaction and efficiency timeline' };
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
              <div className="text-2xl font-black text-primary">300%+</div>
              <div className="text-xs text-white/70">Typical ROI</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">18 Months</div>
              <div className="text-xs text-white/70">Average Timeline</div>
            </div>
          </>
        )}
        
        {activeChart === 'valuation' && (
          <>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">40%</div>
              <div className="text-xs text-white/70">Avg Improvement</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">90 Days</div>
              <div className="text-xs text-white/70">Implementation</div>
            </div>
          </>
        )}
        
        {activeChart === 'impact' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">98%</div>
              <div className="text-xs text-white/70">Client Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">85%</div>
              <div className="text-xs text-white/70">Efficiency Gain</div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
