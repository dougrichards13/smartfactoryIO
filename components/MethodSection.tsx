import { Layers, Target, Zap, TrendingUp, Factory, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MethodSection() {
  const methodPrinciples = [
    {
      icon: Factory,
      title: "Assembly Line Approach",
      description: "Systematic, repeatable processes that deliver consistent, predictable results at enterprise scale"
    },
    {
      icon: Layers,
      title: "Plug-and-Play Solutions", 
      description: "Modular frameworks and pre-built components that integrate seamlessly with existing systems"
    },
    {
      icon: Users,
      title: "'Act as If' Principle",
      description: "Our consultants immerse themselves in your operations, thinking and acting as integral team members"
    },
    {
      icon: Target,
      title: "Immersion in Operations",
      description: "Deep integration with client teams to understand nuanced challenges and opportunities"
    }
  ];

  const methodSteps = [
    {
      step: "01",
      title: "Innovation Discovery",
      description: "Identify transformational opportunities through strategic assessment and stakeholder immersion",
      outcomes: ["Innovation Roadmap", "Opportunity Analysis", "Stakeholder Alignment"]
    },
    {
      step: "02", 
      title: "Strategy Development",
      description: "Design comprehensive strategies with clear ROI pathways and implementation frameworks",
      outcomes: ["Strategic Framework", "Implementation Plan", "Success Metrics"]
    },
    {
      step: "03",
      title: "Quality Assurance", 
      description: "Implement rigorous quality controls and risk management throughout the transformation process",
      outcomes: ["Quality Framework", "Risk Mitigation", "Compliance Protocols"]
    },
    {
      step: "04",
      title: "Impact Delivery",
      description: "Execute with precision and measure results to ensure sustained business transformation",
      outcomes: ["Measurable Results", "Continuous Optimization", "Sustained Impact"]
    }
  ];

  return (
    <section id="method" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            Act as If
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Assembly Line Metaphor */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">The Assembly Line for Business Transformation</h3>
              <p className="text-white/80 leading-relaxed">
                Just as Henry Ford revolutionized manufacturing with the assembly line, Smart Factory 
                has revolutionized consulting with systematic, repeatable processes that deliver 
                predictable outcomes at enterprise scale.
              </p>
            </div>

            {/* Method Principles */}
            <div className="space-y-4">
              {methodPrinciples.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex space-x-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{principle.title}</h4>
                      <p className="text-sm text-white/80">{principle.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 backdrop-blur-sm border border-border/50">
              <div className="w-full relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-secondary/8 to-accent/15" style={{ height: '280px' }}>
                {/* Assembly Line Visualization */}
                <div className="absolute inset-0">
                  {/* Main conveyor belt line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-secondary/30 via-primary/40 to-accent/30 transform -translate-y-1/2"></div>
                  
                  {/* Processing stations */}
                  <div className="absolute top-1/2 left-[15%] w-8 h-12 bg-secondary/20 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-secondary/30"></div>
                  <div className="absolute top-1/2 left-1/2 w-8 h-12 bg-primary/20 rounded-lg transform -translate-y-1/2 -translate-x-1/2 border border-primary/30"></div>
                  <div className="absolute top-1/2 right-[15%] w-8 h-12 bg-accent/20 rounded-lg transform -translate-y-1/2 translate-x-1/2 border border-accent/30"></div>
                  
                  {/* Moving elements on the assembly line */}
                  {[0, 1, 2, 3, 4].map((index) => (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 w-3 h-3 bg-gradient-to-br from-secondary to-primary rounded-sm transform -translate-y-1/2 shadow-md"
                      style={{ left: '-20px' }}
                      animate={{
                        x: [0, 400]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 1.2
                      }}
                    />
                  ))}
                  
                  {/* Quality checkpoints with pulsing indicators */}
                  <motion.div
                    className="absolute top-[30%] left-[15%] w-3 h-3 bg-secondary rounded-full transform -translate-x-1/2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute top-[30%] left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.7
                    }}
                  />
                  
                  <motion.div
                    className="absolute top-[30%] right-[15%] w-3 h-3 bg-accent rounded-full transform translate-x-1/2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.4
                    }}
                  />
                  
                  {/* Process arrows - simplified */}
                  <div className="absolute top-1/2 left-[25%] w-8 h-0.5 bg-secondary/40 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 w-0 h-0 border-l-4 border-l-secondary/40 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2"></div>
                  </div>
                  
                  <div className="absolute top-1/2 right-[25%] w-8 h-0.5 bg-primary/40 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 w-0 h-0 border-l-4 border-l-primary/40 border-t-2 border-t-transparent border-b-2 border-b-transparent transform -translate-y-1/2"></div>
                  </div>
                  
                  {/* Subtle background flow */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Method Steps */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">Four-Stage Transformation Process</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {methodSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/20 group">
                  <CardContent className="p-6">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                      <span className="text-lg font-bold text-secondary">{step.step}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-3">{step.title}</h4>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{step.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide">Key Outcomes:</h5>
                      {step.outcomes.map((outcome, outcomeIndex) => (
                        <div key={outcomeIndex} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3 h-3 text-secondary flex-shrink-0" />
                          <span className="text-xs text-white/80">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Arrow Connection */}
                {index < methodSteps.length - 1 && (
                  <div className="hidden xl:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-secondary/30"></div>
                    <div className="w-0 h-0 border-l-4 border-l-secondary/30 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proprietary Frameworks */}
        <motion.div
          className="text-center bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Factory className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-4">Proprietary Frameworks & Tools</h3>
          <p className="text-white/80 mb-8 max-w-3xl mx-auto">
            Over 13 years, we've developed proprietary frameworks, assessment tools, and implementation 
            methodologies that ensure consistent, high-quality outcomes. Our "Act as If" principle means 
            our consultants become extensions of your team, thinking and acting with your organization's 
            best interests at heart.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              "Innovation Assessment Framework",
              "Strategic Transformation Toolkit", 
              "Quality Assurance Protocols",
              "Impact Measurement System"
            ].map((framework, index) => (
              <div 
                key={index}
                className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30"
              >
                <div className="text-sm font-medium text-white/80">{framework}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

