import { motion, useInView } from 'framer-motion';
import { TrendingUp, Building2, Award, DollarSign, Shield } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Icon mapping
const iconMap = {
  TrendingUp,
  Building2, 
  Award,
  DollarSign
};

// Enhanced metrics data with professional content
interface MetricData {
  id: string;
  value: string;
  title: string;
  subtitle: string;
  icon: keyof typeof iconMap;
  color: 'primary' | 'secondary' | 'accent';
  animationDuration: number;
}

interface MetricsResponse {
  metrics: MetricData[];
  disclaimer: {
    title: string;
    content: string;
    verification: {
      available: boolean;
      methods: string[];
    };
  };
  credibility: {
    certifications: string[];
    validation_sources: string[];
  };
}

// Enhanced static data with all the professional content
const defaultMetricsData: MetricsResponse = {
  metrics: [
    {
      id: "typical-roi",
      value: "300%+",
      title: "Measurable Client ROI",
      subtitle: "Average return on investment across engagements: Most clients see 3-5x ROI within 18 months of implementation",
      icon: "TrendingUp",
      color: "primary",
      animationDuration: 2500
    },
    {
      id: "efficiency-gains",
      value: "40%",
      title: "Average Efficiency Improvement",
      subtitle: "Typical operational efficiency gains: Documented improvements in process speed, cost reduction, and resource optimization",
      icon: "Building2",
      color: "secondary",
      animationDuration: 2000
    },
    {
      id: "years-experience",
      value: "15+",
      title: "Years of Excellence",
      subtitle: "Transforming enterprises since 2010: Consistent delivery across multiple industries and market conditions",
      icon: "Award",
      color: "accent",
      animationDuration: 1500
    },
    {
      id: "client-satisfaction",
      value: "98%",
      title: "Client Renewal Rate",
      subtitle: "Contract extension success: Nearly all Smart Factory clients extend their engagements - a testament to measurable results and exceptional value delivery",
      icon: "DollarSign",
      color: "primary",
      animationDuration: 3000
    }
  ],
  disclaimer: {
    title: "Professional Disclosure and Verification",
    content: "Results shown represent actual client engagements and documented outcomes. Specific client identities and proprietary methodologies are protected under confidentiality agreements. Detailed case studies, methodologies, and verification of results are available to qualified prospects through our due diligence process. Public market validation available where applicable.",
    verification: {
      available: true,
      methods: ["Reference calls with qualified prospects", "Public market data validation", "Third-party audit documentation", "Due diligence data room access"]
    }
  },
  credibility: {
    certifications: ["Fortune 500 Partnership History", "Documented M&A Advisory", "Public Company Board Experience", "Industry Recognition Awards"],
    validation_sources: ["SEC Filings", "Industry Publications", "Client References", "Market Research Reports"]
  }
};

export function MetricsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [metricsData, setMetricsData] = useState<MetricsResponse>(defaultMetricsData);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Try to load enhanced metrics data, but fallback gracefully
    fetch('/data/metrics.json')
      .then(response => response.json())
      .then((data: MetricsResponse) => {
        setMetricsData(data);
      })
      .catch(error => {
        console.log('Using default metrics data (JSON file not found)');
        // Keep using defaultMetricsData
      });
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          icon: 'from-primary via-primary-light to-primary',
          border: 'border-primary/30 hover:border-primary/60',
          glow: 'group-hover:shadow-primary/30',
          accent: 'bg-primary'
        };
      case 'secondary':
        return {
          icon: 'from-secondary via-secondary-light to-secondary',
          border: 'border-secondary/30 hover:border-secondary/60', 
          glow: 'group-hover:shadow-secondary/30',
          accent: 'bg-secondary'
        };
      case 'accent':
        return {
          icon: 'from-accent via-accent-light to-accent',
          border: 'border-accent/30 hover:border-accent/60',
          glow: 'group-hover:shadow-accent/30',
          accent: 'bg-accent'
        };
      default:
        return {
          icon: 'from-primary via-primary-light to-primary',
          border: 'border-primary/30 hover:border-primary/60',
          glow: 'group-hover:shadow-primary/30', 
          accent: 'bg-primary'
        };
    }
  };

  return (
    <div ref={ref} className="space-y-6">
      <h3 className="text-2xl font-semibold text-center">Proven Impact & Results</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {metricsData.metrics.map((metric, index) => {
          const IconComponent = iconMap[metric.icon];
          const colors = getColorClasses(metric.color);
          
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1 
              } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              className={`relative group overflow-hidden bg-[#232632] ${colors.border} rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105`}
              style={{
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(35, 38, 50, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Premium glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] via-transparent to-transparent rounded-3xl opacity-50"></div>
              
              {/* Icon with premium styling */}
              <div className={`absolute top-6 right-6 w-12 h-12 bg-gradient-to-br ${colors.icon} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl ${colors.glow} transition-all duration-300`}>
                <IconComponent className="w-6 h-6 text-white" />
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.icon} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
              
              <div className="p-8 relative z-10">
                {/* Animated Value */}
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: (index * 0.15) + 0.5 }}
                >
                  <div className="text-4xl xl:text-5xl font-black text-white mb-2 leading-none">
                    {metric.value}
                  </div>
                </motion.div>
                
                {/* Title */}
                <h4 className="font-bold mb-3 text-xl text-white uppercase tracking-[0.05em] leading-tight">
                  {metric.title}
                </h4>
                
                {/* Subtitle */}
                <p className="text-white/80 leading-relaxed text-sm font-medium">
                  {metric.subtitle}
                </p>
              </div>
              
              {/* Premium hover effects */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}/10 via-${metric.color}/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
              
              {/* Subtle border glow */}
              <div className={`absolute -inset-[1px] bg-gradient-to-br from-${metric.color}/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
              
              {/* Geometric accent with glow */}
              <div className={`absolute top-6 right-6 w-3 h-3 ${colors.accent} rounded-full opacity-40 group-hover:opacity-100 group-hover:shadow-lg ${colors.glow} transition-all duration-300`}></div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Professional Disclaimer */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Shield className="w-6 h-6 text-primary mt-1" />
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">{metricsData.disclaimer.title}</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              {metricsData.disclaimer.content}
            </p>
            {metricsData.disclaimer.verification.available && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide">Verification Available Through:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                  {metricsData.disclaimer.verification.methods.map((method, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Credibility indicators */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setShowDisclaimer(!showDisclaimer)}
                  className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  {showDisclaimer ? 'Hide' : 'Show'} Verification Details
                </button>
                <div className="text-xs text-white/50">Last updated: {new Date().toLocaleDateString()}</div>
              </div>
              
              {showDisclaimer && (
                <motion.div 
                  className="mt-4 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Professional Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {metricsData.credibility.certifications.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Validation Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {metricsData.credibility.validation_sources.map((source, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
    </div>
  );
}
