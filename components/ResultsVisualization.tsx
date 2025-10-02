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

// Doug's Track Record: Company scaling achievements
const portfolioGrowthData = [
  { year: 'CFA Start', value: 100, label: 'Baseline Revenue', company: 'CFA' },
  { year: 'Year 2', value: 247, label: '147% Growth', company: 'CFA' },
  { year: 'Year 3', value: 456, label: '356% Growth', company: 'CFA' },
  { year: 'Year 4', value: 678, label: '578% Growth', company: 'CFA' },
  { year: 'Year 5', value: 847, label: '747% Growth', company: 'CFA' }
];

// Company Transformation: Millions to Billions Journey
const valuationData = [
  { phase: 'Patient Billing Co.', value: 100, label: 'Starting Valuation', exit: '11.2x Exit' },
  { phase: 'Post-Transformation', value: 1120, label: '1,120% Increase', exit: '11.2x Exit' },
  { phase: 'Insurance Co. (AI)', value: 360, label: '$3.6M Baseline', exit: '$32M Exit' },
  { phase: 'Post-AI Integration', value: 3200, label: '$32M Valuation', exit: '889% Growth' }
];

// Smart Factory Evolution: 15 Years of Success
const impactTimelineData = [
  { year: '2010', clients: 5, revenue: 250, methodology: 'Traditional Consulting' },
  { year: '2013', clients: 15, revenue: 850, methodology: 'Act as If Developed' },
  { year: '2016', clients: 25, revenue: 2100, methodology: 'Smart Suite Launch' },
  { year: '2019', clients: 35, revenue: 4200, methodology: 'AI Integration' },
  { year: '2022', clients: 45, revenue: 7500, methodology: 'AI Accelerator' },
  { year: '2025', clients: 18, revenue: 12000, methodology: 'Elite Partnership Model' }
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
          dataKey="year" 
          stroke="#8FA0BF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          yAxisId="clients"
          orientation="left"
          stroke="#3EB7FF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis 
          yAxisId="revenue"
          orientation="right"
          stroke="#36F997" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          yAxisId="clients"
          type="monotone"
          dataKey="clients"
          stroke="#3EB7FF"
          strokeWidth={3}
          dot={{ fill: '#3EB7FF', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, stroke: '#3EB7FF', strokeWidth: 2 }}
          animationDuration={2000}
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
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
        return { title: 'Proven Scaling Track Record', subtitle: 'CFA: 847% growth in 5 years - real results, real company' };
      case 'valuation':
        return { title: 'Exit Success Stories', subtitle: 'Transformations that created billions in value for stakeholders' };
      case 'impact':
        return { title: 'Smart Factory Evolution', subtitle: '15 years: From traditional consulting to elite partnership model' };
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
              <div className="text-xs text-white/70">CFA Growth</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">5 Years</div>
              <div className="text-xs text-white/70">Proven Timeline</div>
            </div>
          </>
        )}
        
        {activeChart === 'valuation' && (
          <>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">11.2x</div>
              <div className="text-xs text-white/70">Best Exit Multiple</div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">$32M</div>
              <div className="text-xs text-white/70">AI Transformation</div>
            </div>
          </>
        )}
        
        {activeChart === 'impact' && (
          <>
            <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-black text-primary">&lt;20</div>
              <div className="text-xs text-white/70">Elite Clients</div>
            </div>
            <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="text-2xl font-black text-secondary">100+</div>
              <div className="text-xs text-white/70">Expert Consultants</div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
