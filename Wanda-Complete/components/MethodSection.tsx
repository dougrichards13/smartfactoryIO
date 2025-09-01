import { Layers, Target, Zap, TrendingUp, Factory, Users, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
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
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-secondary/10 border-secondary/20 text-secondary">
            Our Methodology
          </Badge>
          <h2 className="mb-6">
            The Smart Factory Method™
            <span className="text-gradient block">Precision-Engineered Transformation</span>
          </h2>
          <p className="lead text-muted-foreground">
            Like a modern manufacturing facility, our proprietary methodology applies systematic, 
            repeatable processes to transform human potential into measurable business reality with 
            precision, scale, and guaranteed outcomes.
          </p>
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
              <p className="text-muted-foreground leading-relaxed">
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
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
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
            <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&h=600&fit=crop&crop=center"
                  alt="Modern Manufacturing Assembly Line"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-primary/20"></div>
                
                {/* Overlay Elements */}
                <div className="absolute inset-6 flex flex-col justify-between">
                  <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg self-start">
                    <div className="text-sm font-semibold text-secondary">Systematic Process</div>
                    <div className="text-xs text-muted-foreground">Repeatable • Scalable • Predictable</div>
                  </div>
                  
                  <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg self-end">
                    <div className="text-sm font-semibold text-primary">Quality Assured</div>
                    <div className="text-xs text-muted-foreground">Every step validated and optimized</div>
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
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide">Key Outcomes:</h5>
                      {step.outcomes.map((outcome, outcomeIndex) => (
                        <div key={outcomeIndex} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3 h-3 text-secondary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{outcome}</span>
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
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
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
                <div className="text-sm font-medium text-muted-foreground">{framework}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}