import { Users2, Settings, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { useContent } from '../src/contexts/ContentContext';

export function ServicesSection() {
  const { content } = useContent();
  
  // Map icons to consultant types
  const iconMap = [Users2, Settings, ShieldCheck];
  
  const consultantTypes = content.services.consultantTypes?.map((consultant, index) => ({
    ...consultant,
    icon: iconMap[index] || Users2
  })) || [
    {
      icon: Users2,
      title: "Smart Suite™",
      subtitle: "C-Suite Transformation Teams",
      description: "Elite consulting teams of strategic technology executives who integrate seamlessly with your C-suite. They work flexibly as part-time advisors, full-time consulting partners, or even as corporate officers while maintaining their consulting excellence and Smart Factory methodologies.",
      features: [
        "Flexible Engagement Models (Part-Time to Officer-Level)",
        "Technology Strategy & Enterprise Roadmapping", 
        "Digital Transformation Leadership Teams",
        "Board-Level Technology Advisory Services",
        "M&A Technology Due Diligence Excellence",
        "Corporate Officer Consulting Integration"
      ],
      investment: "$25K - $150K/engagement",
      duration: "1-5 years",
      color: "primary",
      cta: "Engage Smart Suite™"
    },
    {
      icon: Settings,
      title: "AI Synthesizer™",
      subtitle: "AI Accelerator Implementation Teams",
      description: "Revolutionary consulting teams who are the human intelligence behind our AI Accelerator platform. These specialists combine AI, creativity, engineering, and business processes in ways that don't exist elsewhere - synthesizing human ingenuity with machine intelligence to deliver transformational outcomes through our proprietary AI Accelerator methodology.",
      features: [
        "AI Accelerator Platform Implementation & Optimization",
        "Context-Aware AI System Design & Integration", 
        "Human-Machine Collaboration Architecture",
        "Creative Engineering & Advanced Process Innovation",
        "Advanced NLP & LLM Implementation Excellence",
        "Strategic Data Synthesis & Intelligent Visualization"
      ],
      investment: "$100K - $500K/project",
      duration: "12-36 months",
      color: "secondary", 
      cta: "Deploy AI Synthesizer™"
    },
    {
      icon: ShieldCheck,
      title: "Smart Assurance™",
      subtitle: "AI-Driven Quality & Testing Teams",
      description: "Specialized consulting teams of quality and testing professionals who utilize cutting-edge AI-driven methodologies to ensure ISO standards compliance, comprehensive automated testing frameworks, and enterprise-level risk-managed implementations. These teams work collaboratively to deliver bulletproof quality assurance across all transformation initiatives.",
      features: [
        "AI-Powered Quality Assurance",
        "ISO Standards Implementation",
        "Automated Testing Frameworks",
        "Risk Assessment & Mitigation",
        "Compliance & Governance",
        "Continuous Quality Monitoring"
      ],
      investment: "$25K - $150K/engagement",
      duration: "3-18 months",
      color: "accent",
      cta: "Secure Smart Assurance™"
    }
  ];

  // Create professional mailto links for each service
  const getMailtoLink = (consultantTitle: string) => {
    const email = 'contact@smartfactory.io';
    let subject = '';
    let body = '';

    switch (consultantTitle) {
      case 'Smart Suite™':
        subject = 'Smart Suite™ Executive Partnership Inquiry';
        body = 'Hello Smart Factory team,%0D%0A%0D%0AI am interested in exploring Smart Suite™ consulting services for our organization. We are looking for C-Suite level strategic technology leadership and would like to discuss:%0D%0A%0D%0A• Our current transformation challenges%0D%0A• Flexible engagement models%0D%0A• Executive partnership opportunities%0D%0A%0D%0APlease contact me to schedule a strategic consultation.%0D%0A%0D%0ABest regards';
        break;
      case 'AI Synthesizer™':
        subject = 'AI Synthesizer™ Implementation Partnership';
        body = 'Hello Smart Factory team,%0D%0A%0D%0AI am interested in exploring AI Synthesizer™ services for our AI transformation initiative. We need expert guidance on:%0D%0A%0D%0A• AI Accelerator platform implementation%0D%0A• Human-machine collaboration architecture%0D%0A• Strategic AI integration planning%0D%0A%0D%0APlease contact me to discuss our AI transformation roadmap.%0D%0A%0D%0ABest regards';
        break;
      case 'Smart Assurance™':
        subject = 'Smart Assurance™ Quality Partnership Inquiry';
        body = 'Hello Smart Factory team,%0D%0A%0D%0AI am interested in Smart Assurance™ services for our quality and compliance initiatives. We need expertise in:%0D%0A%0D%0A• AI-powered quality assurance%0D%0A• ISO standards implementation%0D%0A• Risk assessment and compliance%0D%0A%0D%0APlease contact me to discuss our quality assurance requirements.%0D%0A%0D%0ABest regards';
        break;
      default:
        subject = 'Smart Factory Partnership Inquiry';
        body = 'Hello Smart Factory team,%0D%0A%0D%0AI am interested in learning more about your consulting services. Please contact me to discuss our transformation needs.%0D%0A%0D%0ABest regards';
    }

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
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
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            {content.services.header?.title?.line1}
            <span className="block text-gradient mt-2">{content.services.header?.title?.line2}</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            {content.services.header?.description?.replace('{specializedTypes}', `<span class="text-accent font-bold">${content.services.header?.specializedTypes}</span>`)?.replace('{keyBenefit}', `<span class="text-secondary font-bold">${content.services.header?.keyBenefit}</span>`) && (
              <span dangerouslySetInnerHTML={{ __html: content.services.header.description.replace('{specializedTypes}', `<span class="text-accent font-bold">${content.services.header.specializedTypes}</span>`).replace('{keyBenefit}', `<span class="text-secondary font-bold">${content.services.header.keyBenefit}</span>`) }} />
            ) || (
              <>Our <span className="text-accent font-bold">specialized consultant types</span> work seamlessly together or independently to deliver 
              comprehensive enterprise transformation with <span className="text-secondary font-bold">measurable ROI</span> and strategic impact.</>
            )}
          </p>
        </motion.div>

        {/* Consultant Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 items-stretch">
          {consultantTypes.map((consultant, index) => {
            // const colorClasses = getColorClasses(consultant.color);
            const IconComponent = consultant.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card className="relative w-full group overflow-hidden bg-[#232632] border border-primary/25 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full min-h-[800px]">
                  {/* Futuristic Background Motion Effects */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    {/* Animated shimmer gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-20 animate-pulse ${
                      consultant.color === 'primary' ? 'from-primary/30 via-primary-light/10 to-transparent' :
                      consultant.color === 'secondary' ? 'from-secondary/30 via-secondary-light/10 to-transparent' :
                      'from-accent/30 via-accent-light/10 to-transparent'
                    }`}></div>
                    
                    {/* Moving light ray effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-1000 ${
                      consultant.color === 'primary' ? 'from-transparent via-primary/40 to-transparent' :
                      consultant.color === 'secondary' ? 'from-transparent via-secondary/40 to-transparent' :
                      'from-transparent via-accent/40 to-transparent'
                    }`} 
                    style={{
                      transform: 'translateX(-100%)',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }}></div>
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0">
                      <div className={`absolute w-1 h-1 rounded-full opacity-60 ${
                        consultant.color === 'primary' ? 'bg-primary' :
                        consultant.color === 'secondary' ? 'bg-secondary' :
                        'bg-accent'
                      }`}
                      style={{
                        top: '20%',
                        left: '15%',
                        animation: 'float 6s ease-in-out infinite'
                      }}></div>
                      <div className={`absolute w-1.5 h-1.5 rounded-full opacity-40 ${
                        consultant.color === 'primary' ? 'bg-primary' :
                        consultant.color === 'secondary' ? 'bg-secondary' :
                        'bg-accent'
                      }`}
                      style={{
                        top: '70%',
                        right: '20%',
                        animation: 'float 8s ease-in-out infinite reverse'
                      }}></div>
                      <div className={`absolute w-0.5 h-0.5 rounded-full opacity-80 ${
                        consultant.color === 'primary' ? 'bg-primary-light' :
                        consultant.color === 'secondary' ? 'bg-secondary-light' :
                        'bg-accent-light'
                      }`}
                      style={{
                        top: '40%',
                        right: '10%',
                        animation: 'float 4s ease-in-out infinite'
                      }}></div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 lg:p-10 relative z-10 flex flex-col flex-grow">
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

                    {/* Premium Investment & Duration - Bottom Aligned */}
                    <div className="mt-auto space-y-6 mb-0 p-8 bg-gradient-to-br from-white/[0.12] to-white/[0.04] rounded-2xl border border-white/[0.15] backdrop-blur-sm">
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-sm font-black text-white/70 uppercase tracking-[0.15em] mb-3">Investment Range</div>
                          <Badge className={`px-6 py-3 text-base font-black ${consultant.color === 'primary' ? 'bg-gradient-to-r from-primary via-primary-light to-primary text-black' : consultant.color === 'secondary' ? 'bg-gradient-to-r from-secondary via-secondary-light to-secondary text-black' : 'bg-gradient-to-r from-accent via-accent-light to-accent text-black'} border-0 shadow-xl whitespace-nowrap min-w-fit rounded-xl`}
                                 style={{
                                   boxShadow: consultant.color === 'primary' ? '0 8px 24px rgba(62, 183, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : consultant.color === 'secondary' ? '0 8px 24px rgba(54, 249, 151, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : '0 8px 24px rgba(197, 201, 214, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                 }}>
                            {consultant.investment}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-white/[0.1]">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-bold text-white/80 uppercase tracking-[0.1em]">Typical Timeline:</span>
                          <span className="text-lg text-white font-black">{consultant.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Premium CTA */}
                    <a 
                      href={getMailtoLink(consultant.title)}
                      className={`relative w-full py-3 text-sm font-black uppercase tracking-[0.1em] bg-gradient-to-r ${consultant.color === 'primary' ? 'from-primary via-primary-light to-primary' : consultant.color === 'secondary' ? 'from-secondary via-secondary-light to-secondary' : 'from-accent via-accent-light to-accent'} text-black transition-all duration-500 group border-0 rounded-2xl overflow-hidden inline-block text-center no-underline`}
                      style={{
                        boxShadow: consultant.color === 'primary' ? '0 8px 32px rgba(17, 100, 102, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : consultant.color === 'secondary' ? '0 8px 32px rgba(217, 128, 140, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)' : '0 8px 32px rgba(255, 203, 154, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {consultant.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </a>
                    
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

      </div>
    </section>
  );
}

