import { Users2, Settings, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';

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
          badge: 'bg-muted text-muted-foreground border-border',
          gradient: 'gradient-primary'
        };
    }
  };

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-accent/10 border-accent/20 text-accent-foreground">
            Smart Factory Consultant Types
          </Badge>
          <h2 className="mb-6">
            Three Pillars of Enterprise 
            <span className="text-gradient block">Transformation Excellence</span>
          </h2>
          <p className="lead text-muted-foreground">
            Our specialized consultant types work seamlessly together or independently to deliver 
            comprehensive enterprise transformation with measurable ROI and strategic impact.
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
                <Card className={`h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 ${colorClasses.border} ${colorClasses.bg} group`}>
                  <CardContent className="p-8">
                    {/* Icon & Title */}
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-xl ${colorClasses.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-10 h-10 ${colorClasses.icon}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{consultant.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{consultant.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6 text-center">
                      {consultant.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-foreground">Core Capabilities:</h4>
                      <div className="space-y-2">
                        {consultant.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${consultant.color === 'primary' ? 'bg-primary' : consultant.color === 'secondary' ? 'bg-secondary' : 'bg-accent'}`}></div>
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Investment & Duration */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Investment:</span>
                        <Badge variant="outline" className={colorClasses.badge}>
                          {consultant.investment}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">Timeline:</span>
                        <span className="text-sm text-muted-foreground">{consultant.duration}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      onClick={scrollToContact}
                      className={`w-full ${colorClasses.gradient} text-white hover:shadow-lg transition-all duration-300 group`}
                    >
                      {consultant.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
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