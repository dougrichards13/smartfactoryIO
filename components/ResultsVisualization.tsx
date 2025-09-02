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

// Portfolio growth data showing 847% increase over 5 years
const portfolioGrowthData = [
  { year: 'Year 1', value: 100, label: 'Baseline' },
  { year: 'Year 2', value: 185, label: '85% Growth' },
  { year: 'Year 3', value: 340, label: '240% Growth' },
  { year: 'Year 4', value: 620, label: '520% Growth' },
  { year: 'Year 5', value: 947, label: '847% Growth' }
];

// Valuation comparison data
const valuationData = [
  { phase: 'Initial', value: 410, label: '$410M' },
  { phase: 'Exit', value: 1700, label: '$1.7B' }
];

// Revenue impact timeline
const impactTimelineData = [
  { quarter: 'Q1', revenue: 2.1, efficiency: 15 },
  { quarter: 'Q2', revenue: 3.8, efficiency: 28 },
  { quarter: 'Q3', revenue: 6.2, efficiency: 45 },
  { quarter: 'Q4', revenue: 8.7, efficiency: 67 },
  { quarter: 'Q5', revenue: 12.4, efficiency: 85 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#232632] border border-primary/30 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
        <p className="text-white font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 100 
              ? `${entry.value.toLocaleString()}${entry.dataKey === 'value' && entry.payload.phase ? 'M' : '%'}` 
              : `${entry.value}${entry.dataKey.includes('revenue') ? 'B' : '%'}`}
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
          tickFormatter={(value) => `$${value}M`}
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
          tickFormatter={(value) => `${value}B`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="revenue"
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
        return { title: 'Portfolio Growth Trajectory', subtitle: '847% growth over 5-year engagement' };
      case 'valuation':
        return { title: 'Valuation Transformation', subtitle: '4.1x increase: $410M → $1.7B exit' };
      case 'impact':
        return { title: 'Revenue & Efficiency Impact', subtitle: 'Dual-metric transformation timeline' };
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
              <div className="text-2xl font-black text-primary">847%</div>
              <div className="text-xs text-white/70">Total Growth</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">5 Years</div>
              <div className="text-xs text-white/70">Partnership</div>
            </div>
          </>
        )}
        
        {activeChart === 'valuation' && (
          <>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">4.1x</div>
              <div className="text-xs text-white/70">Multiplier</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">$1.3B</div>
              <div className="text-xs text-white/70">Value Created</div>
            </div>
          </>
        )}
        
        {activeChart === 'impact' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">12.4B</div>
              <div className="text-xs text-white/70">Revenue Peak</div>
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
