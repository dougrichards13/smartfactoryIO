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
                <Card className="relative h-full group overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.15] rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-10 relative z-10">
                    {/* Premium glass layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent rounded-3xl opacity-60"></div>
                    
                    {/* Enhanced Icon & Title */}
                    <div className="text-center mb-10">
                      <div className="relative mx-auto mb-8">
                        <div className={`w-28 h-28 mx-auto bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary via-primary-light to-primary' : consultant.color === 'secondary' ? 'from-secondary via-secondary-light to-secondary' : 'from-accent via-accent-light to-accent'} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500`}
                             style={{
                               boxShadow: consultant.color === 'primary' ? '0 20px 40px rgba(17, 100, 102, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : consultant.color === 'secondary' ? '0 20px 40px rgba(217, 128, 140, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : '0 20px 40px rgba(255, 203, 154, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                             }}>
                          <IconComponent className="w-14 h-14 text-white drop-shadow-lg" />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary/60 to-primary-light/60' : consultant.color === 'secondary' ? 'from-secondary/60 to-secondary-light/60' : 'from-accent/60 to-accent-light/60'} rounded-3xl blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      </div>
                      <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-[0.1em] leading-tight">{consultant.title}</h3>
                      <p className="text-xl text-white/90 font-bold">{consultant.subtitle}</p>
                    </div>

                    {/* Enhanced Description */}
                    <p className="text-white/90 leading-relaxed mb-10 text-center text-xl font-medium">
                      {consultant.description}
                    </p>

                    {/* Enhanced Features */}
                    <div className="mb-10">
                      <h4 className="text-xl font-black mb-6 text-white uppercase tracking-[0.1em] text-center">Core Capabilities</h4>
                      <div className="space-y-4">
                        {consultant.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group/feature">
                            <div className={`w-3 h-3 rounded-full ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} shadow-lg group-hover/feature:shadow-xl transition-shadow duration-300`}
                                 style={{
                                   boxShadow: consultant.color === 'primary' ? '0 2px 8px rgba(17, 100, 102, 0.6)' : consultant.color === 'secondary' ? '0 2px 8px rgba(217, 128, 140, 0.6)' : '0 2px 8px rgba(255, 203, 154, 0.6)'
                                 }}></div>
                            <span className="text-base text-white/85 font-semibold">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Premium Investment & Duration */}
                    <div className="space-y-5 mb-10 p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/[0.1] backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-black text-white uppercase tracking-[0.1em]">Investment:</span>
                        <Badge className={`px-4 py-2 text-base font-bold ${consultant.color === 'primary' ? 'bg-gradient-to-r from-primary to-primary-light text-white' : consultant.color === 'secondary' ? 'bg-gradient-to-r from-secondary to-secondary-light text-white' : 'bg-gradient-to-r from-accent to-accent-light text-white'} border-0 shadow-lg`}
                               style={{
                                 boxShadow: consultant.color === 'primary' ? '0 4px 12px rgba(17, 100, 102, 0.4)' : consultant.color === 'secondary' ? '0 4px 12px rgba(217, 128, 140, 0.4)' : '0 4px 12px rgba(255, 203, 154, 0.4)'
                               }}>
                          {consultant.investment}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-black text-white uppercase tracking-[0.1em]">Timeline:</span>
                        <span className="text-base text-white/95 font-bold">{consultant.duration}</span>
                      </div>
                    </div>

                    {/* Premium CTA */}
                    <Button 
                      onClick={scrollToContact}
                      className={`relative w-full py-5 text-xl font-black uppercase tracking-[0.1em] bg-gradient-to-r ${consultant.color === 'primary' ? 'from-primary via-primary-light to-primary' : consultant.color === 'secondary' ? 'from-secondary via-secondary-light to-secondary' : 'from-accent via-accent-light to-accent'} text-white transition-all duration-500 group border-0 rounded-2xl overflow-hidden`}
                      style={{
                        boxShadow: consultant.color === 'primary' ? '0 8px 32px rgba(17, 100, 102, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : consultant.color === 'secondary' ? '0 8px 32px rgba(217, 128, 140, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : '0 8px 32px rgba(255, 203, 154, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {consultant.cta}
                        <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Button>
                    
                    {/* Premium geometric accents */}
                    <div className={`absolute top-8 right-8 w-4 h-4 ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300`}
                         style={{
                           boxShadow: consultant.color === 'primary' ? '0 4px 12px rgba(17, 100, 102, 0.6)' : consultant.color === 'secondary' ? '0 4px 12px rgba(217, 128, 140, 0.6)' : '0 4px 12px rgba(255, 203, 154, 0.6)'
                         }}></div>
                    <div className={`absolute bottom-8 left-8 w-2 h-2 ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} rounded-full opacity-20 group-hover:opacity-80 transition-all duration-500`}></div>
                    
                    {/* Premium hover effects */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary/8 via-primary/4 to-transparent' : consultant.color === 'secondary' ? 'from-secondary/8 via-secondary/4 to-transparent' : 'from-accent/8 via-accent/4 to-transparent'} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl`}></div>
                    
                    {/* Enhanced border glow */}
                    <div className={`absolute -inset-[1px] bg-gradient-to-br ${consultant.color === 'primary' ? 'from-primary/30 to-primary/10' : consultant.color === 'secondary' ? 'from-secondary/30 to-secondary/10' : 'from-accent/30 to-accent/10'} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`}></div>
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

