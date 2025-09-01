import { Users2, Settings, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export function ServicesSection() {
  const consultantTypes = [
    {
      icon: Users2,
      title: "Smart Architects™",
      subtitle: "C-Suite Fractional Leadership",
      description: "Strategic technology leaders who integrate seamlessly with your C-suite to drive digital transformation, AI strategy, and operational excellence initiatives.",
      features: [
        "Fractional CTO/CIO Services",
        "Technology Strategy & Roadmapping", 
        "Digital Transformation Leadership",
        "Board-Level Technology Advisory",
        "M&A Technology Due Diligence",
        "Innovation Portfolio Management"
      ],
      investment: "$50K - $200K/quarter",
      duration: "3-12 months",
      color: "primary",
      cta: "Engage a Smart Architect™"
    },
    {
      icon: Settings,
      title: "Smart Engineers™", 
      subtitle: "AI-Empowered Technology Experts",
      description: "Multi-disciplinary technology specialists leveraging AI to accelerate integration, implementation, data science, and technical delivery across your enterprise.",
      features: [
        "AI Solution Development",
        "Enterprise System Integration", 
        "Data Science & Analytics",
        "Cloud Architecture & Migration",
        "Automation & Process Optimization",
        "Technical Team Augmentation"
      ],
      investment: "$100K - $500K/project",
      duration: "2-9 months",
      color: "secondary", 
      cta: "Deploy Smart Engineers™"
    },
    {
      icon: ShieldCheck,
      title: "Smart Assurance™",
      subtitle: "AI-Driven Quality & Testing",
      description: "Quality and testing professionals utilizing AI-driven methodologies to ensure ISO standards compliance, automated testing, and risk-managed implementations.",
      features: [
        "AI-Powered Quality Assurance",
        "ISO Standards Implementation",
        "Automated Testing Frameworks",
        "Risk Assessment & Mitigation",
        "Compliance & Governance",
        "Continuous Quality Monitoring"
      ],
      investment: "$25K - $150K/engagement",
      duration: "1-6 months",
      color: "accent",
      cta: "Secure Smart Assurance™"
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/5 dark:bg-primary/10',
          border: 'border-primary/20',
          icon: 'text-primary',
          badge: 'bg-primary/10 text-primary border-primary/20',
          gradient: 'gradient-primary'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/5 dark:bg-secondary/10',
          border: 'border-secondary/20',
          icon: 'text-secondary',
          badge: 'bg-secondary/10 text-secondary border-secondary/20',
          gradient: 'gradient-secondary'
        };
      case 'accent':
        return {
          bg: 'bg-accent/5 dark:bg-accent/10',
          border: 'border-accent/20',
          icon: 'text-accent dark:text-accent-light',
          badge: 'bg-accent/10 text-accent-foreground border-accent/20',
          gradient: 'gradient-accent'
        };
      default:
        return {
          bg: 'bg-muted/50',
          border: 'border-border',
          icon: 'text-foreground',
          badge: 'bg-muted text-white/80 border-border',
          gradient: 'gradient-primary'
        };
    }
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Enhanced background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Smart Factory Consultant Types</span>
          </motion.div>
          
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            THREE PILLARS OF ENTERPRISE
            <span className="block text-gradient mt-2">TRANSFORMATION EXCELLENCE</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            Our <span className="text-accent font-bold">specialized consultant types</span> work seamlessly together or independently to deliver 
            comprehensive enterprise transformation with <span className="text-secondary font-bold">measurable ROI</span> and strategic impact.
          </p>
        </motion.div>

        {/* Consultant Types Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {consultantTypes.map((consultant, index) => {
            const colorClasses = getColorClasses(consultant.color);
            const IconComponent = consultant.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full group overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10 hover:border-secondary/30 backdrop-blur-sm transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 relative z-10">
                    {/* Enhanced Icon & Title */}
                    <div className="text-center mb-8">
                      <div className="relative mx-auto mb-6">
                        <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary to-primary-light' : consultant.color === 'secondary' ? 'from-secondary to-secondary-light' : 'from-accent to-accent-light'} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary/40 to-primary-light/40' : consultant.color === 'secondary' ? 'from-secondary/40 to-secondary-light/40' : 'from-accent/40 to-accent-light/40'} rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-wider">{consultant.title}</h3>
                      <p className="text-lg text-white/80 font-semibold">{consultant.subtitle}</p>
                    </div>

                    {/* Enhanced Description */}
                    <p className="text-white/85 leading-relaxed mb-8 text-center text-lg">
                      {consultant.description}
                    </p>

                    {/* Enhanced Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 text-white uppercase tracking-wider text-center">Core Capabilities</h4>
                      <div className="space-y-3">
                        {consultant.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                            <div className={`w-2 h-2 rounded-full ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} shadow-lg`}></div>
                            <span className="text-sm text-white/80 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Investment & Duration */}
                    <div className="space-y-4 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Investment:</span>
                        <Badge className={`px-3 py-1 ${consultant.color === 'primary' ? 'bg-primary/20 text-primary border-primary/30' : consultant.color === 'secondary' ? 'bg-secondary/20 text-secondary border-secondary/30' : 'bg-accent/20 text-accent border-accent/30'} border font-bold`}>
                          {consultant.investment}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Timeline:</span>
                        <span className="text-sm text-white/90 font-semibold">{consultant.duration}</span>
                      </div>
                    </div>

                    {/* Enhanced CTA */}
                    <Button 
                      onClick={scrollToContact}
                      className={`w-full py-4 text-lg font-bold uppercase tracking-wider bg-gradient-to-r ${consultant.color === 'primary' ? 'from-primary to-primary-light' : consultant.color === 'secondary' ? 'from-secondary to-secondary-light' : 'from-accent to-accent-light'} text-white hover:shadow-2xl transition-all duration-300 group border border-white/20`}
                      style={{
                        boxShadow: consultant.color === 'primary' ? '0 4px 20px rgba(17, 100, 102, 0.4)' : consultant.color === 'secondary' ? '0 4px 20px rgba(217, 128, 140, 0.4)' : '0 4px 20px rgba(255, 203, 154, 0.4)'
                      }}
                    >
                      {consultant.cta}
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                    
                    {/* Geometric accent */}
                    <div className={`absolute top-4 right-4 w-3 h-3 ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary/10 to-primary-light/10' : consultant.color === 'secondary' ? 'from-secondary/10 to-secondary-light/10' : 'from-accent/10 to-accent-light/10'} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Assembly Line Concept */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">The Smart Factory Assembly Line</h3>
          <p className="text-white/80 mb-6 max-w-3xl mx-auto">
            Like a precision manufacturing facility, our three consultant types work in orchestrated 
            harmony to transform your enterprise. Smart Architects™ design the strategy, Smart Engineers™ 
            build the solutions, and Smart Assurance™ guarantees quality outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="gradient-primary text-white px-8 py-4 hover:shadow-xl transition-all duration-300"
            >
              Design Your Factory Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 border-2"
            >
              View Assembly Process
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

