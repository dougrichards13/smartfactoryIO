import { motion } from 'framer-motion';
import { MetricsDashboard } from './MetricsDashboard';
import { InteractiveResultsChart } from './InteractiveResultsChart';

export function AboutSection() {

  const clientLogos = [
    "Fortune 500 Companies",
    "Global Technology Leaders", 
    "Enterprise Innovators",
    "Industry Disruptors"
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Enhanced background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            THE FACTORY APPROACH TO
            <span className="block text-gradient mt-2">ENTERPRISE TRANSFORMATION</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            Since <span className="text-secondary font-bold">2010</span>, Smart Factory has redefined enterprise consulting by driving measurable results for owners, leaders, investors, stakeholders, and teams. Our <span className="text-accent font-bold">C-level experts, engineers, QA leaders</span> and recently, our AI-driven methods, consistently deliver <span className="text-secondary font-bold">scalable results</span> that change the trajectory of organizations and the lives behind them. This is enterprise transformation, engineered for visionaries.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Vision & Differentiation */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MetricsDashboard />
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 backdrop-blur-sm border border-border/50 h-full">
              <InteractiveResultsChart />
            </div>
          </motion.div>
        </div>

        {/* Client Trust Section */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Trusted by Industry Leaders</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our clients represent the most innovative and forward-thinking organizations across industries, 
            all committed to transforming their businesses through strategic AI implementation.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30"
              >
                <div className="text-sm font-medium text-white/70">{client}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-6">
            Client names and specific case studies available under NDA upon qualification.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
